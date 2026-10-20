import fs from "node:fs";

const source = fs.readFileSync(new URL("../script.js", import.meta.url), "utf8");
const urls = [...new Set([...source.matchAll(/"image":"(https?:[^"]+)"/g)].map((match) => match[1]))];
const failures = [];
let cursor = 0;
let passed = 0;

async function check(url, method = "HEAD") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    return await fetch(url, { method, headers: method === "GET" ? { Range: "bytes=0-0" } : {}, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    try {
      let response = await check(url);
      if (!response.ok && [403, 405].includes(response.status)) response = await check(url, "GET");
      if (response.ok) passed++;
      else failures.push({ status: response.status, url });
    } catch {
      failures.push({ status: "ERR", url });
    }
  }
}

await Promise.all(Array.from({ length: 24 }, worker));
console.log(JSON.stringify({ uniqueImages: urls.length, passed, failed: failures.length, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
