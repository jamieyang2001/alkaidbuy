const categories = [
  { id: "matsukiyo", label: "松本清", description: "已排除藥品、液體、噴霧與易燃品的乾燥衛生用品。", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80" },
  { id: "muji", label: "無印良品", description: "適合國際寄送的文具、紙品與輕量生活用品。", image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80" },
  { id: "loft", label: "LOFT", description: "日本熱門文具、限定筆記本與輕量雜貨。", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80" },
];

const defaultProducts = [
  { id: "matsukiyo-01", name: "matsukiyo 天然純棉化妝棉 248枚", category: "matsukiyo", price: 62, weight: 180, status: "可代購", description: "官網參考價 283円。乾燥棉製品，適合國際寄送。", image: "https://images.unsplash.com/photo-1607006483225-48a7c2ef3e10?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4973560041287" },
  { id: "matsukiyo-02", name: "matsukiyo 大尺寸純棉化妝棉 130枚", category: "matsukiyo", price: 72, weight: 180, status: "可代購", description: "官網參考價 327円。乾燥棉製品，適合國際寄送。", image: "https://images.unsplash.com/photo-1607006483225-48a7c2ef3e10?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4973202205060" },
  { id: "matsukiyo-03", name: "うるふか化妝棉 100枚", category: "matsukiyo", price: 72, weight: 150, status: "可代購", description: "官網參考價 327円。100% 純棉乾燥用品。", image: "https://images.unsplash.com/photo-1607006483225-48a7c2ef3e10?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4973202301045" },
  { id: "matsukiyo-04", name: "KOSE 壓縮面膜紙 14入", category: "matsukiyo", price: 97, weight: 80, status: "可代購", description: "官網參考價 440円。未含化妝水的乾燥面膜紙。", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4971710189032" },
  { id: "matsukiyo-05", name: "三次元口罩 小尺寸 30枚", category: "matsukiyo", price: 310, weight: 220, status: "可代購", description: "官網參考價 1,408円。非藥品、非液態衛生用品。", image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987067325801" },
  { id: "matsukiyo-06", name: "RETINOTIME 柔膚化妝棉 80枚", category: "matsukiyo", price: 73, weight: 120, status: "可代購", description: "官網參考價 330円。乾燥化妝棉，不含液體。", image: "https://images.unsplash.com/photo-1607006483225-48a7c2ef3e10?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4955814146719" },

  { id: "muji-01", name: "無印良品 月計畫便利貼 13枚", category: "muji", price: 22, weight: 35, status: "需查庫存", description: "官網參考價 100円。紙製文具，價格與庫存以購買日為準。", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550182603149" },
  { id: "muji-02", name: "無印良品 A5 活頁筆記本本體", category: "muji", price: 64, weight: 170, status: "可代購", description: "官網參考價 290円。聚丙烯封面、20孔。", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550182913804" },
  { id: "muji-03", name: "無印良品 雙面刻度尺 15cm", category: "muji", price: 33, weight: 30, status: "可代購", description: "官網參考價 150円。輕量文具，適合合併寄送。", image: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4547315916153" },
  { id: "muji-04", name: "無印良品 A5 Wide 收藏活頁夾", category: "muji", price: 152, weight: 260, status: "可代購", description: "官網參考價 690円。20孔收藏活頁夾。", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550583766696" },
  { id: "muji-05", name: "無印良品 文庫本筆記本 144頁", category: "muji", price: 42, weight: 150, status: "可代購", description: "官網參考價 190円。紙製筆記本。", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550182111262" },
  { id: "muji-06", name: "無印良品 A5 月計畫筆記本", category: "muji", price: 22, weight: 100, status: "可代購", description: "官網參考價 100円。32頁月計畫格式。", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.muji.com/jp/ja/store/search/cmdty/%E6%96%87%E5%85%B7" },

  { id: "loft-01", name: "LOFT限定 Rollbahn 迷你口袋筆記本 夜景", category: "loft", price: 169, weight: 110, status: "可代購", description: "官網參考價 770円。LOFT限定紙製筆記本。", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.loft.co.jp/store/c/cst300024_s-sales/" },
  { id: "loft-02", name: "Rollbahn 口袋筆記本 M 黑色", category: "loft", price: 157, weight: 180, status: "可代購", description: "官網參考價 715円。經典方格筆記本。", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.loft.co.jp/store/c/cst300024/" },
  { id: "loft-03", name: "Rollbahn 迷你口袋筆記本 藍色", category: "loft", price: 121, weight: 100, status: "可代購", description: "官網參考價 550円。輕量紙製文具。", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.loft.co.jp/store/c/cst300024/" },
  { id: "loft-04", name: "ZEBRA Mildliner Brush 深藍色", category: "loft", price: 36, weight: 20, status: "可代購", description: "官網參考價 165円。水性顏料筆，少量合併寄送。", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.loft.co.jp/store/g/g4901681108107/" },
  { id: "loft-05", name: "ZEBRA Mildliner 柔色螢光筆", category: "loft", price: 24, weight: 20, status: "可代購", description: "官網參考價 110円。顏色依官網庫存選擇。", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.loft.co.jp/store/goods/search.aspx?keyword=%E3%83%9E%E3%82%A4%E3%83%AB%E3%83%89%E3%83%A9%E3%82%A4%E3%83%8A%E3%83%BC&search=x" },
  { id: "loft-06", name: "Campus × Rollbahn 迷你筆記本", category: "loft", price: 145, weight: 100, status: "可代購", description: "官網參考價 660円。聯名紙製筆記本，款式依庫存。", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.loft.co.jp/store/c/cst300024_s-price/" },
];

const shippingRates = {
  ems: { label: "EMS 國際快捷", limit: 30000, rows: [[500,1450],[600,1600],[700,1750],[800,1900],[900,2050],[1000,2200],[1250,2500],[1500,2800],[1750,3100],[2000,3400],[2500,3900],[3000,4400],[3500,4900],[4000,5400],[4500,5900],[5000,6400],[5500,6900],[6000,7400],[7000,8200],[8000,9000],[9000,9800],[10000,10600],[11000,11400],[12000,12200],[13000,13000],[14000,13800],[15000,14600],[16000,15400],[17000,16200],[18000,17000],[19000,17800],[20000,18600],[21000,19400],[22000,20200],[23000,21000],[24000,21800],[25000,22600],[26000,23400],[27000,24200],[28000,25000],[29000,25800],[30000,26600]] },
  smallPacketAir: { label: "小形包裝物 航空", limit: 2000, rows: [[100,350],[200,450],[300,550],[400,650],[500,750],[600,850],[700,950],[800,1050],[900,1150],[1000,1250],[1100,1350],[1200,1450],[1300,1550],[1400,1650],[1500,1750],[1600,1850],[1700,1950],[1800,2050],[1900,2150],[2000,2250]] },
};

const productStorageKey = "yaoguang-products-v5";
const orderStorageKey = "yaoguang-orders";
const quoteSequenceKey = "yaoguang-quote-sequence";
const feeSettingsKey = "yaoguang-fee-settings";
const adminAuthKey = "yaoguang-admin-auth";
const adminPassword = "tophet1003";
const lineOfficialUrl = "https://lin.ee/NxJLmwO";
const contactEmail = "alkaidbuy@gmail.com";

const fixedServiceTiers = [
  { max: 500, fee: 30 },
  { max: 1000, fee: 50 },
  { max: 2000, fee: 80 },
  { max: 3000, fee: 120 },
  { max: 5000, fee: 180 },
  { max: 10000, fee: 300 },
];

const $ = (id) => document.querySelector(id);
const els = {
  categoryGrid: $("#categoryGrid"), categoryView: $("#categoryView"), categoryTitle: $("#categoryTitle"), backToCategories: $("#backToCategories"),
  productSearch: $("#productSearch"), productSort: $("#productSort"), productGrid: $("#productGrid"),
  cartItems: $("#cartItems"), cartWeight: $("#cartWeight"), cartSubtotal: $("#cartSubtotal"), cartShipping: $("#cartShipping"), cartServiceFee: $("#cartServiceFee"), cartTotal: $("#cartTotal"),
  summaryPanel: $("#summaryPanel"), summaryText: $("#summaryText"), summaryLineButton: $("#summaryLineButton"), emailNotifyButton: $("#emailNotifyButton"), copyButton: $("#copyButton"),
  specialForm: $("#specialForm"), specialType: $("#specialType"), checkoutForm: $("#checkoutForm"), shippingForm: $("#shippingForm"),
  shippingMethod: $("#shippingMethod"), shippingWeight: $("#shippingWeight"), itemYen: $("#itemYen"), yenRate: $("#yenRate"), domesticYen: $("#domesticYen"), servicePercent: $("#servicePercent"), minimumFee: $("#minimumFee"), extraFee: $("#extraFee"),
  shippingYen: $("#shippingYen"), itemTwd: $("#itemTwd"), serviceFeeTwd: $("#serviceFeeTwd"), estimateTotal: $("#estimateTotal"), shippingNote: $("#shippingNote"),
  adminForm: $("#adminForm"), editingProductId: $("#editingProductId"), saveProductButton: $("#saveProductButton"), cancelEditProduct: $("#cancelEditProduct"), resetProducts: $("#resetProducts"),
  adminName: $("#adminName"), adminCategory: $("#adminCategory"), adminPrice: $("#adminPrice"), adminWeight: $("#adminWeight"), adminStatus: $("#adminStatus"), adminImage: $("#adminImage"), adminDescription: $("#adminDescription"), adminProductList: $("#adminProductList"),
  settingsForm: $("#settingsForm"), settingShippingMethod: $("#settingShippingMethod"), settingYenRate: $("#settingYenRate"), settingServicePercent: $("#settingServicePercent"), settingMinimumFee: $("#settingMinimumFee"), settingExtraFee: $("#settingExtraFee"), settingNotifyEmail: $("#settingNotifyEmail"), settingSheetUrl: $("#settingSheetUrl"),
  orderList: $("#orderList"), exportOrders: $("#exportOrders"), clearOrders: $("#clearOrders"),
  adminLoginForm: $("#adminLoginForm"), adminPassword: $("#adminPassword"), adminLoginMessage: $("#adminLoginMessage"), adminSection: $("#admin"), adminLogout: $("#adminLogout"),
  lookupForm: $("#lookupForm"), lookupQuoteId: $("#lookupQuoteId"), lookupResult: $("#lookupResult"),
};

let products = load(productStorageKey, defaultProducts);
let orders = load(orderStorageKey, []);
let cart = [];
let activeCategory = null;

function load(key, fallback) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return `NT$${Math.round(value).toLocaleString("zh-TW")}`;
}

function yen(value) {
  return `¥${Math.round(value).toLocaleString("ja-JP")}`;
}

function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label || "商品";
}

function lineUrl(message) {
  return `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
}

function emailUrl(message) {
  const settings = load(feeSettingsKey, { notifyEmail: contactEmail });
  const email = settings.notifyEmail || contactEmail;
  const subject = message.split("\n")[0] || "瑤光代購通知";
  if (!email) return "#admin-login";
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

function quoteId() {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const seq = Number(localStorage.getItem(quoteSequenceKey) || "0") + 1;
  localStorage.setItem(quoteSequenceKey, String(seq));
  return `YG-${date}-${String(seq).padStart(3, "0")}`;
}

function feeSettings() {
  return {
    method: els.shippingMethod.value,
    rate: Number(els.yenRate.value) || 0,
    percent: Number(els.servicePercent.value) || 0,
    minFee: Number(els.minimumFee.value) || 0,
    extra: Number(els.extraFee.value) || 0,
    notifyEmail: els.settingNotifyEmail.value || "",
    sheetUrl: els.settingSheetUrl.value || "",
  };
}

function applyFeeSettings(settings) {
  els.shippingMethod.value = settings.method;
  els.yenRate.value = settings.rate;
  els.servicePercent.value = settings.percent;
  els.minimumFee.value = settings.minFee;
  els.extraFee.value = settings.extra;
  els.settingShippingMethod.value = settings.method;
  els.settingYenRate.value = settings.rate;
  els.settingServicePercent.value = settings.percent;
  els.settingMinimumFee.value = settings.minFee;
  els.settingExtraFee.value = settings.extra;
  els.settingNotifyEmail.value = settings.notifyEmail || contactEmail;
  els.settingSheetUrl.value = settings.sheetUrl || "";
}

function fixedServiceFeeByYen(yenAmount) {
  const tier = fixedServiceTiers.find((item) => yenAmount <= item.max);
  return tier ? tier.fee : null;
}

function serviceFeeFromTwd(twdAmount, rate) {
  if (!twdAmount) return 0;
  const estimatedYen = rate ? Math.round(twdAmount / rate) : 0;
  return fixedServiceFeeByYen(estimatedYen);
}

function shippingRate(method, grams) {
  return shippingRates[method].rows.find(([max]) => grams <= max)?.[1] || null;
}

function cartEstimate() {
  const settings = feeSettings();
  const weight = cart.reduce((sum, item) => sum + item.weight * item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingYen = weight ? shippingRate(settings.method, weight) : 0;
  const shippingTwd = shippingYen ? Math.round(shippingYen * settings.rate) : 0;
  const fixedFee = subtotal ? serviceFeeFromTwd(subtotal, settings.rate) : 0;
  const serviceFee = fixedFee || 0;
  const outOfRange = weight > shippingRates[settings.method].limit || (weight > 0 && !shippingYen);
  const quoteOnly = subtotal > 0 && fixedFee === null;
  return { methodLabel: shippingRates[settings.method].label, weight, subtotal, shippingYen, shippingTwd, serviceFee, extra: subtotal ? settings.extra : 0, total: subtotal + shippingTwd + serviceFee + (subtotal ? settings.extra : 0), outOfRange, quoteOnly };
}

function showSummary(message) {
  els.summaryText.value = message;
  els.summaryLineButton.href = lineUrl(message);
  els.emailNotifyButton.href = emailUrl(message);
  els.summaryPanel.hidden = false;
  els.summaryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function saveOrder(record) {
  orders.unshift({ ...record, status: "待回覆", createdAt: new Date().toLocaleString("zh-TW") });
  save(orderStorageKey, orders);
  renderOrders();
  syncOrderToSheet(orders[0]);
}

function syncOrderToSheet(order) {
  const settings = load(feeSettingsKey, { sheetUrl: "" });
  if (!settings.sheetUrl) return;
  fetch(settings.sheetUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  }).catch(() => {});
}

function renderCategories() {
  els.categoryGrid.innerHTML = categories.map((category) => {
    const count = products.filter((product) => product.category === category.id).length;
    return `<button class="category-card" type="button" data-category="${category.id}">
      <img src="${category.image}" alt="${category.label}" />
      <span class="tag">${count} 件商品</span>
      <h3>${category.label}</h3>
      <p>${category.description}</p>
      <strong>進入分類</strong>
    </button>`;
  }).join("");
}

function openCategory(id) {
  activeCategory = id;
  els.categoryGrid.hidden = true;
  els.categoryView.hidden = false;
  els.categoryTitle.textContent = `${categoryLabel(id)}商品清單`;
  renderProducts();
  els.categoryView.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderProducts() {
  let list = products.filter((product) => product.category === activeCategory);
  const keyword = els.productSearch.value.trim().toLowerCase();
  if (keyword) list = list.filter((product) => `${product.name} ${product.description}`.toLowerCase().includes(keyword));
  const sort = els.productSort.value;
  if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
  if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
  if (sort === "weightAsc") list.sort((a, b) => a.weight - b.weight);
  if (sort === "status") list.sort((a, b) => a.status.localeCompare(b.status, "zh-Hant"));

  els.productGrid.innerHTML = list.length ? list.map((product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-body">
        <span class="tag">${categoryLabel(product.category)}</span>
        <span class="status-pill" data-status="${product.status}">${product.status}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-details"><span>${product.weight.toLocaleString("zh-TW")}g</span><strong class="price">${money(product.price)}</strong></div>
        <div class="product-actions">
          <button class="cart-button" type="button" data-id="${product.id}" ${product.status === "售完" ? "disabled" : ""}>${product.status === "售完" ? "已售完" : "加入購物車"}</button>
          ${product.sourceUrl ? `<a class="source-link" href="${product.sourceUrl}" target="_blank" rel="noopener noreferrer">查看日本官網</a>` : ""}
        </div>
      </div>
    </article>`).join("") : '<p class="empty-cart">這個分類目前沒有符合條件的商品。</p>';
}

function renderCart() {
  els.cartItems.innerHTML = cart.length ? cart.map((item) => `
    <div class="cart-row">
      <div><h3>${item.name}</h3><p>${money(item.price)} x ${item.quantity} / ${item.weight * item.quantity}g</p></div>
      <div class="cart-controls">
        <button class="qty-button" type="button" data-action="decrease" data-id="${item.id}">-</button>
        <strong>${item.quantity}</strong>
        <button class="qty-button" type="button" data-action="increase" data-id="${item.id}">+</button>
        <button class="remove-button" type="button" data-action="remove" data-id="${item.id}">刪除</button>
      </div>
    </div>`).join("") : '<p class="empty-cart">購物車目前是空的。</p>';
  const estimate = cartEstimate();
  els.cartWeight.textContent = `${estimate.weight.toLocaleString("zh-TW")}g`;
  els.cartSubtotal.textContent = money(estimate.subtotal);
  els.cartShipping.textContent = estimate.outOfRange ? "需另詢" : money(estimate.shippingTwd);
  els.cartServiceFee.textContent = estimate.quoteOnly ? "另行報價" : money(estimate.serviceFee);
  els.cartTotal.textContent = estimate.outOfRange || estimate.quoteOnly ? "需另詢" : money(estimate.total);
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.quantity += 1;
  else if (product) cart.push({ ...product, quantity: 1 });
  renderCart();
}

function calculateShipping(showMessage = false) {
  const method = els.shippingMethod.value;
  const grams = Number(els.shippingWeight.value) || 0;
  const productYen = Number(els.itemYen.value) || 0;
  const rate = Number(els.yenRate.value) || 0;
  const domestic = Number(els.domesticYen.value) || 0;
  const extra = Number(els.extraFee.value) || 0;
  const table = shippingRates[method];
  const shipYen = shippingRate(method, grams);
  const itemCost = Math.round((productYen + domestic) * rate);
  if (!shipYen || grams > table.limit) {
    els.shippingYen.textContent = "需另詢";
    els.itemTwd.textContent = money(itemCost);
    els.serviceFeeTwd.textContent = money(0);
    els.estimateTotal.textContent = "需另詢";
    els.shippingNote.textContent = `${table.label} 的試算上限為 ${table.limit.toLocaleString("zh-TW")}g，超出請另外詢問。`;
    renderCart();
    return null;
  }
  const shipTwd = Math.round(shipYen * rate);
  const serviceFee = fixedServiceFeeByYen(productYen + domestic);
  if (serviceFee === null) {
    els.shippingYen.textContent = `${yen(shipYen)} / 約 ${money(shipTwd)}`;
    els.itemTwd.textContent = money(itemCost);
    els.serviceFeeTwd.textContent = "另行報價";
    els.estimateTotal.textContent = "需另詢";
    els.shippingNote.textContent = "商品金額超過 10000円，依收費表需另外報價。";
    renderCart();
    return null;
  }
  const total = itemCost + shipTwd + serviceFee + extra;
  els.shippingYen.textContent = `${yen(shipYen)} / 約 ${money(shipTwd)}`;
  els.itemTwd.textContent = money(itemCost);
  els.serviceFeeTwd.textContent = money(serviceFee);
  els.estimateTotal.textContent = money(total);
  els.shippingNote.textContent = `${table.label} 以 ${grams.toLocaleString("zh-TW")}g 內級距試算。實際費用以包裝後重量與日本郵局收費為準。`;
  renderCart();
  const result = { methodLabel: table.label, grams, productYen, domestic, shipYen, shipTwd, itemCost, serviceFee, extra, total };
  if (showMessage) {
    const id = quoteId();
    const message = ["瑤光代購 運費報價", `報價編號：${id}`, `寄送方式：${result.methodLabel}`, `包裝後重量：${result.grams}g`, `商品日幣金額：${yen(result.productYen)}`, `日本國內運費：${yen(result.domestic)}`, `日本郵局國際運費：${yen(result.shipYen)} / 約 ${money(result.shipTwd)}`, `代購服務費：${money(result.serviceFee)}`, `其他費用：${money(result.extra)}`, `預估總額：${money(result.total)}`, "實際費用以包裝後重量與日本郵局收費為準。"].join("\n");
    showSummary(message);
    saveOrder({ quoteId: id, type: "運費報價", customer: "運費試算", contact: "未填", message });
  }
  return result;
}

function buildCartMessage(formData, id) {
  const estimate = cartEstimate();
  const lines = cart.map((item) => `- ${item.name} / ${money(item.price)} x ${item.quantity} / ${item.weight * item.quantity}g`);
  return ["瑤光代購 固定商品報價單", `報價編號：${id}`, `姓名：${formData.name}`, `聯絡方式：${formData.contact}`, `付款方式：${formData.payment}`, `取貨方式：${formData.delivery}`, "商品：", ...lines, `商品小計：${money(estimate.subtotal)}`, `包裝後重量：${estimate.weight.toLocaleString("zh-TW")}g`, `寄送方式：${estimate.methodLabel}`, `預估國際運費：${estimate.outOfRange ? "需另詢" : `${yen(estimate.shippingYen)} / 約 ${money(estimate.shippingTwd)}`}`, `代購服務費：${money(estimate.serviceFee)}`, `其他費用：${money(estimate.extra)}`, `預估合計：${estimate.outOfRange ? "需另詢" : money(estimate.total)}`, `備註：${formData.note || "無"}`].join("\n");
}

function renderAdminProducts() {
  els.adminProductList.innerHTML = products.map((product) => `
    <article class="admin-product-card">
      <div><strong>${product.name}</strong><span>${categoryLabel(product.category)}・${product.status}・${money(product.price)}・${product.weight}g</span></div>
      <div class="panel-actions">
        <button class="secondary-button" type="button" data-action="edit-product" data-id="${product.id}">編輯</button>
        <button class="secondary-button danger-button" type="button" data-action="delete-product" data-id="${product.id}">刪除</button>
      </div>
    </article>`).join("");
}

function setProductForm(product) {
  els.editingProductId.value = product.id;
  els.adminName.value = product.name;
  els.adminCategory.value = product.category;
  els.adminPrice.value = product.price;
  els.adminWeight.value = product.weight;
  els.adminStatus.value = product.status;
  els.adminImage.value = product.image;
  els.adminDescription.value = product.description;
  els.saveProductButton.textContent = "儲存商品修改";
  els.cancelEditProduct.hidden = false;
}

function resetProductForm() {
  els.adminForm.reset();
  els.editingProductId.value = "";
  els.saveProductButton.textContent = "新增到分類商品";
  els.cancelEditProduct.hidden = true;
}

function renderOrders() {
  if (!orders.length) {
    els.orderList.innerHTML = '<p class="empty-cart">目前還沒有詢問紀錄。</p>';
    return;
  }
  const statuses = ["待回覆", "已報價", "已付款", "已下單", "已出貨", "已完成", "取消"];
  els.orderList.innerHTML = orders.map((order, index) => `
    <article class="order-card">
      <header>
        <div><h3>${order.quoteId} / ${order.type}</h3><p>${order.customer || "未填姓名"}・${order.contact || "未填聯絡方式"}・${order.createdAt}</p></div>
        <select data-index="${index}" aria-label="訂單狀態">${statuses.map((status) => `<option value="${status}" ${order.status === status ? "selected" : ""}>${status}</option>`).join("")}</select>
      </header>
      <textarea readonly>${order.message}</textarea>
    </article>`).join("");
}

function renderLookup(order) {
  if (!order) {
    els.lookupResult.hidden = false;
    els.lookupResult.innerHTML = "<strong>查無資料</strong><p>請確認報價編號是否正確，或直接用 LINE 聯絡客服。</p>";
    return;
  }

  els.lookupResult.hidden = false;
  els.lookupResult.innerHTML = `
    <strong>${order.quoteId}</strong>
    <div class="lookup-status">${order.status}</div>
    <p>類型：${order.type}</p>
    <p>建立時間：${order.createdAt}</p>
    <textarea readonly>${order.message}</textarea>
  `;
}

function exportOrdersCsv() {
  const header = ["報價編號", "類型", "客人", "聯絡方式", "狀態", "建立時間", "內容"];
  const rows = orders.map((order) => [order.quoteId, order.type, order.customer, order.contact, order.status, order.createdAt, order.message]);
  const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `yaoguang-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function updateAdminAccess() {
  const isAuthed = localStorage.getItem(adminAuthKey) === "true";
  els.adminSection.hidden = !isAuthed;
  if (isAuthed) {
    els.adminLoginMessage.textContent = "已登入後台。";
  }
}

els.categoryGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".category-card");
  if (card) openCategory(card.dataset.category);
});

els.backToCategories.addEventListener("click", () => {
  activeCategory = null;
  els.categoryGrid.hidden = false;
  els.categoryView.hidden = true;
});

els.productSearch.addEventListener("input", renderProducts);
els.productSort.addEventListener("change", renderProducts);

els.productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".cart-button");
  if (!button) return;
  addToCart(button.dataset.id);
  button.textContent = "已加入";
  setTimeout(() => { button.textContent = "加入購物車"; }, 1000);
});

els.cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const item = cart.find((cartItem) => cartItem.id === button.dataset.id);
  if (!item) return;
  if (button.dataset.action === "increase") item.quantity += 1;
  if (button.dataset.action === "decrease") item.quantity -= 1;
  if (button.dataset.action === "remove" || item.quantity <= 0) cart = cart.filter((cartItem) => cartItem.id !== item.id);
  renderCart();
});

els.checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) return showSummary("購物車目前是空的，請先加入固定商品。");
  const id = quoteId();
  const formData = { name: $("#orderName").value.trim(), contact: $("#orderContact").value.trim(), payment: $("#paymentMethod").value, delivery: $("#deliveryMethod").value, note: $("#orderNote").value.trim() };
  const message = buildCartMessage(formData, id);
  showSummary(message);
  saveOrder({ quoteId: id, type: "固定商品", customer: formData.name, contact: formData.contact, message });
});

els.specialType.addEventListener("change", () => { document.body.dataset.requestType = els.specialType.value; });

els.specialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = quoteId();
  const message = ["瑤光代購 代訂詢問", `報價編號：${id}`, `需求類型：${els.specialType.value}`, `姓名：${$("#specialName").value.trim()}`, `聯絡方式：${$("#specialContact").value.trim()}`, `店家或場所：${$("#venueName").value.trim() || "未填"}`, `活動或商品：${$("#requestName").value.trim() || "未填"}`, `網址：${$("#specialLink").value.trim() || "未提供"}`, `日期：${$("#specialDate").value || "未指定"}`, `時間：${$("#specialTime").value || "未指定"}`, `人數：${$("#peopleCount").value || "未指定"}`, `數量：${$("#itemQuantity").value || "未指定"}`, `預算：${$("#specialBudget").value.trim() || "未指定"}`, `需求內容：${$("#specialDetails").value.trim()}`].join("\n");
  showSummary(message);
  saveOrder({ quoteId: id, type: els.specialType.value, customer: $("#specialName").value.trim(), contact: $("#specialContact").value.trim(), message });
});

els.lookupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = els.lookupQuoteId.value.trim().toUpperCase();
  const order = orders.find((item) => item.quoteId.toUpperCase() === keyword);
  renderLookup(order);
});

els.shippingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateShipping(true);
});

[els.shippingMethod, els.shippingWeight, els.itemYen, els.yenRate, els.domesticYen, els.servicePercent, els.minimumFee, els.extraFee].forEach((field) => field.addEventListener("input", () => calculateShipping(false)));

els.settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const settings = { method: els.settingShippingMethod.value, rate: Number(els.settingYenRate.value), percent: Number(els.settingServicePercent.value), minFee: Number(els.settingMinimumFee.value), extra: Number(els.settingExtraFee.value), notifyEmail: els.settingNotifyEmail.value.trim() || contactEmail, sheetUrl: els.settingSheetUrl.value.trim() };
  save(feeSettingsKey, settings);
  applyFeeSettings(settings);
  calculateShipping(false);
  showSummary("收費設定已儲存，購物車與運費試算已更新。");
});

els.adminForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = els.editingProductId.value || `custom-${Date.now()}`;
  const product = { id, name: els.adminName.value.trim(), category: els.adminCategory.value, price: Number(els.adminPrice.value), weight: Number(els.adminWeight.value), status: els.adminStatus.value, image: els.adminImage.value.trim() || "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80", description: els.adminDescription.value.trim() };
  const index = products.findIndex((item) => item.id === id);
  if (index >= 0) products[index] = product;
  else products.push(product);
  save(productStorageKey, products);
  resetProductForm();
  renderCategories();
  if (activeCategory) renderProducts();
  renderAdminProducts();
  showSummary(index >= 0 ? "商品已更新。" : "商品已新增到指定分類。");
});

els.cancelEditProduct.addEventListener("click", resetProductForm);

els.adminProductList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.id);
  if (!product) return;
  if (button.dataset.action === "edit-product") {
    setProductForm(product);
    els.adminForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (button.dataset.action === "delete-product") {
    products = products.filter((item) => item.id !== product.id);
    cart = cart.filter((item) => item.id !== product.id);
    save(productStorageKey, products);
    renderCategories();
    if (activeCategory) renderProducts();
    renderAdminProducts();
    renderCart();
    showSummary("商品已刪除。");
  }
});

els.resetProducts.addEventListener("click", () => {
  products = [...defaultProducts];
  save(productStorageKey, products);
  resetProductForm();
  renderCategories();
  if (activeCategory) renderProducts();
  renderAdminProducts();
  renderCart();
  showSummary("已恢復預設商品清單。");
});

els.orderList.addEventListener("change", (event) => {
  const select = event.target.closest("select");
  if (!select) return;
  orders[Number(select.dataset.index)].status = select.value;
  save(orderStorageKey, orders);
});

els.exportOrders.addEventListener("click", exportOrdersCsv);
els.clearOrders.addEventListener("click", () => {
  orders = [];
  save(orderStorageKey, orders);
  renderOrders();
  showSummary("詢問紀錄已清空。");
});

els.adminLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (els.adminPassword.value === adminPassword) {
    localStorage.setItem(adminAuthKey, "true");
    els.adminPassword.value = "";
    updateAdminAccess();
    els.adminSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    els.adminLoginMessage.textContent = "密碼錯誤，請再試一次。";
  }
});

els.adminLogout.addEventListener("click", () => {
  localStorage.removeItem(adminAuthKey);
  updateAdminAccess();
  document.querySelector("#admin-login").scrollIntoView({ behavior: "smooth", block: "start" });
});

els.copyButton.addEventListener("click", async () => {
  els.summaryText.select();
  if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(els.summaryText.value);
  else document.execCommand("copy");
  els.copyButton.textContent = "已複製";
  setTimeout(() => { els.copyButton.textContent = "複製內容"; }, 1200);
});

applyFeeSettings(load(feeSettingsKey, { method: "ems", rate: 0.22, percent: 10, minFee: 100, extra: 0, notifyEmail: contactEmail, sheetUrl: "" }));
els.summaryLineButton.href = lineOfficialUrl;
renderCategories();
renderCart();
renderAdminProducts();
renderOrders();
calculateShipping(false);
updateAdminAccess();
