import fs from "node:fs";

const pageUrl = "https://www.lawson.co.jp/recommend/original/select/snack/";
const html = await (await fetch(pageUrl)).text();
const source = fs.readFileSync(new URL("../script.js", import.meta.url), "utf8");
const existing = new Set([...source.matchAll(/"sourceUrl":"([^"]+)"/g)].map((match) => match[1]));
const clean = (value) => value.replace(/<[^>]+>/g, "").replaceAll("&amp;", "&").replaceAll("&nbsp;", " ").replace(/\s+/g, " ").trim();
const products = [];
const itemPattern = /<li[^>]*>[\s\S]*?<p class="img"><a href="([^"]+)"><img src="([^"]+)"[^>]*>[\s\S]*?<p class="ttl">([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p class="price"><span>([0-9,]+)<\/span>/g;
let match;
while ((match = itemPattern.exec(html))) {
  const sourceUrl = new URL(match[1], pageUrl).href;
  if (existing.has(sourceUrl)) continue;
  const detailId = sourceUrl.match(/detail\/(\d+)_/)?.[1];
  if (!detailId) continue;
  const detail = clean(match[4]);
  const grams = detail.match(/([0-9.]+)g/i)?.[1];
  products.push({ id: `lawson-official-${detailId}`, name: `LAWSON ${clean(match[3])}`, category: "lawson", subcategory: /チョコ/.test(match[3]) ? "巧克力" : /ナッツ|アーモンド|くるみ/.test(match[3]) ? "堅果" : /せん|おかき|あられ/.test(match[3]) ? "米果仙貝" : "日本零食", yenPrice: Number(match[5].replaceAll(",", "")), weight: Math.max(30, Number(grams || 100) + 20), spec: grams ? `${grams}g` : detail, variants: ["1件"], status: "可代購", description: "LAWSON 日本官網商品。價格、販售地區與門市庫存以採購日為準。", image: new URL(match[2], pageUrl).href.replace(/\.jpg$/i, ".png"), sourceUrl });
}
fs.writeFileSync(new URL("../lawson-products-generated.js", import.meta.url), `window.LAWSON_OFFICIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};\n`);
console.log(`Generated ${products.length} verified LAWSON products.`);
