const { chromium } = require(process.env.PLAYWRIGHT_CORE);

(async () => {
  const browser = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const base = process.env.SITE_BASE || "http://127.0.0.1:8765";
  for (const path of ["index.html", "cart.html", "member.html", "policies.html", "admin.html"]) {
    await page.goto(`${base}/${path}`, { waitUntil: "networkidle" });
    if (path === "admin.html") await page.evaluate(() => { document.querySelector("#adminApp").hidden = false; document.querySelectorAll("[data-panel]").forEach((panel) => { panel.hidden = false; }); });
    for (const language of ["en", "ja"]) {
      await page.selectOption("#siteLanguage", language);
      await page.waitForTimeout(150);
      const texts = await page.evaluate(() => [...document.querySelectorAll("body *")]
        .filter((element) => element.offsetParent !== null && !element.closest("#productGrid, #adminProductGrid, script, style") && element.childNodes.length === 1 && element.firstChild?.nodeType === Node.TEXT_NODE)
        .map((element) => element.textContent.trim()).filter((text) => /[\u3400-\u9fff]/.test(text)));
      console.log(`\n[${path} / ${language}]\n${[...new Set(texts)].join("\n")}`);
    }
  }
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
