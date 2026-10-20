const { chromium } = require(process.env.PLAYWRIGHT_CORE);
const assert = require("node:assert/strict");

(async () => {
  const browser = await chromium.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:8765/index.html", { waitUntil: "networkidle" });
  assert.equal(await page.locator('a[href="admin.html"]').count(), 0, "public admin link must be removed");
  assert.equal(await page.locator("#yenRate").isEditable(), false, "exchange rate must be locked");
  assert.equal(await page.locator("#domesticYen").isEditable(), false, "domestic shipping must be locked");
  await page.getByRole("button", { name: /LAWSON/ }).click();
  await page.waitForSelector("#productGrid .product-card");
  assert.ok(await page.locator("#productGrid .product-card").count() >= 20, "Lawson products should render");
  await page.locator("#productGrid .cart-button").first().click();
  assert.ok(await page.locator("#cartToast.show").isVisible(), "cart toast should appear");
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("yaoguang-cart-v1") || "[]").length), 1);
  await page.goto("http://127.0.0.1:8765/cart.html", { waitUntil: "networkidle" });
  page.once("dialog", (dialog) => dialog.accept());
  await page.locator("#clearCart").click();
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("yaoguang-cart-v1") || "[]").length), 0);
  await page.goBack({ waitUntil: "networkidle" });
  if (!(await page.locator("#productGrid .cart-button").count())) await page.getByRole("button", { name: /LAWSON/ }).click();
  await page.locator("#productGrid .cart-button").nth(1).click();
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem("yaoguang-cart-v1") || "[]").length), 1, "cleared cart must not restore old items");
  await page.selectOption("#siteLanguage", "en");
  assert.match(await page.locator("#products h2").first().innerText(), /Product categories/i);
  await page.goto("http://127.0.0.1:8765/member.html", { waitUntil: "networkidle" });
  assert.ok(await page.locator("#memberLoginForm").isVisible());
  assert.equal(await page.locator("#memberRegisterForm").isVisible(), false);
  await page.getByRole("button", { name: "Create account" }).click();
  assert.ok(await page.locator("#memberRegisterForm").isVisible());
  assert.equal(errors.length, 0, `page errors: ${errors.join(" | ")}`);
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto("http://127.0.0.1:8765/index.html", { waitUntil: "networkidle" });
  for (const selector of [".site-header .brand", ".site-header .account-button", ".site-header .language-select", ".site-header .line-button"]) {
    const box = await mobile.locator(selector).boundingBox();
    assert.ok(box && box.x >= 0 && box.x + box.width <= 390, `${selector} must fit mobile viewport`);
  }
  await mobile.close();
  await browser.close();
  console.log("E2E checks passed");
})().catch((error) => { console.error(error); process.exit(1); });
