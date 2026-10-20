const { chromium } = require(process.env.PLAYWRIGHT_CORE);

(async () => {
  const browser = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const path of ["index.html", "cart.html", "member.html", "policies.html"]) {
    await page.goto(`http://127.0.0.1:8765/${path}`, { waitUntil: "networkidle" });
    await page.selectOption("#siteLanguage", "en");
    await page.waitForTimeout(100);
    const texts = await page.evaluate(() => [...document.querySelectorAll("body *")]
      .filter((element) => !element.closest("#productGrid, #categoryGrid, script, style") && element.childNodes.length === 1 && element.firstChild?.nodeType === Node.TEXT_NODE && element.offsetParent !== null)
      .map((element) => element.textContent.trim()).filter((text) => /[\u3400-\u9fff]/.test(text)));
    console.log(`\n[${path}]\n${[...new Set(texts)].join("\n")}`);
  }
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
