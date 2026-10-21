const ORDER_API = "https://script.google.com/macros/s/AKfycbzpjqqe6NV_xusYI0mkrV3W9HtXsgQg-b-9vwNm4YvJ7tZij-Us80JtAm4MgCalAKFy/exec";
const CART_KEY = "yaoguang-cart-v1";
const CART_CLEARED_KEY = "yaoguang-cart-cleared-at";
const SESSION_KEY = "yaoguang-member-session";
const COUPON_KEY = "yaoguang-coupons";
const SETTINGS_KEY = "yaoguang-fee-settings";
const ORDER_KEY = "yaoguang-orders";
const FAVORITE_KEY = "yaoguang-favorites";
const RECENT_KEY = "yaoguang-recent";
const SNAPSHOT_KEY = "yaoguang-product-snapshots";
const ADDRESS_KEY = "yaoguang-addresses";
const NOTICE_KEY = "yaoguang-product-notices";
const PRODUCT_KEY = "yaoguang-products-v23";
const CONTACT_EMAIL = "alkaidbuy@gmail.com";
const LINE_URL = "https://lin.ee/NxJLmwO";
const SHIPPING = {
  ems: { label: "EMS 國際快捷", limit: 30000, rows: [[500,1450],[600,1600],[700,1750],[800,1900],[900,2050],[1000,2200],[1250,2500],[1500,2800],[1750,3100],[2000,3400],[2500,3900],[3000,4400],[3500,4900],[4000,5400],[4500,5900],[5000,6400],[5500,6900],[6000,7400],[7000,8200],[8000,9000],[9000,9800],[10000,10600],[11000,11400],[12000,12200],[13000,13000],[14000,13800],[15000,14600],[16000,15400],[17000,16200],[18000,17000],[19000,17800],[20000,18600],[21000,19400],[22000,20200],[23000,21000],[24000,21800],[25000,22600],[26000,23400],[27000,24200],[28000,25000],[29000,25800],[30000,26600]] },
  smallPacketAir: { label: "小形包裝物 航空", limit: 2000, rows: [[100,350],[200,450],[300,550],[400,650],[500,750],[600,850],[700,950],[800,1050],[900,1150],[1000,1250],[1100,1350],[1200,1450],[1300,1550],[1400,1650],[1500,1750],[1600,1850],[1700,1950],[1800,2050],[1900,2150],[2000,2250]] },
};

const $ = (selector) => document.querySelector(selector);
const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const money = (value) => `NT$${Math.round(Number(value) || 0).toLocaleString("zh-TW")}`;
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
const lineUrl = () => LINE_URL;

function quoteId() {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(-5).toUpperCase().padStart(5, "0");
  return `YG-${date}-${random}`;
}

function apiRequest(action, payload = {}, method = "POST") {
  const url = method === "GET" ? `${ORDER_API}?${new URLSearchParams({ action, ...payload })}` : ORDER_API;
  const options = method === "POST" ? { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action, ...payload }) } : {};
  return fetch(url, options).then(async (response) => {
    if (!response.ok) throw new Error("訂單系統暫時無法連線");
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "訂單系統處理失敗");
    return result;
  });
}

function currentSession() { return load(SESSION_KEY, null); }

async function loadPublicSettings() {
  try {
    const result = await apiRequest("publicSettings", {}, "GET");
    const current = load(SETTINGS_KEY, {});
    save(SETTINGS_KEY, { ...current, method: result.settings?.shippingMethod || "ems", rate: Number(result.settings?.yenRate || 0.205), domesticYen: Number(result.settings?.domesticYen || 0) });
    if (document.body.dataset.page === "cart") renderCart();
  } catch {}
}

function productSnapshots() { return load(SNAPSHOT_KEY, {}); }
function productList(ids) { const snapshots = productSnapshots(); return (ids || []).map((id) => snapshots[id]).filter(Boolean); }
function addProductsToCart(items) {
  localStorage.removeItem(CART_CLEARED_KEY);
  items.forEach((product) => {
    const variant = product.selectedVariant || product.variant || product.spec || "標準款";
    const cartId = `${product.id}::${variant}`;
    const existing = cart.find((item) => item.cartId === cartId);
    if (existing) existing.quantity += Number(product.quantity || 1);
    else cart.push({ ...product, cartId, selectedVariant: variant, quantity: Number(product.quantity || 1) });
  });
  save(CART_KEY, cart);
}

function statusTimeline(status) {
  const statuses = ["待確認", "已報價", "待付款", "已付款", "日本採購中", "已到倉", "已寄出", "已完成"];
  const normalized = status === "採購中" ? "日本採購中" : status === "已到日本倉" ? "已到倉" : status;
  const active = statuses.indexOf(normalized);
  return `<ol class="order-timeline">${statuses.map((item, index) => `<li class="${index <= active ? "done" : ""} ${index === active ? "current" : ""}"><span></span>${item}</li>`).join("")}</ol>`;
}

function savedProductCards(items, favoriteMode) {
  const notices = load(NOTICE_KEY, {});
  return items.length ? items.map((product) => `<article class="saved-product"><img src="${escapeHtml(product.image || "")}" alt="" /><div><strong>${escapeHtml(product.name)}</strong><span>${money(product.price)}・${escapeHtml(product.spec || "標準款")}</span>${favoriteMode ? `<div class="notice-options"><label><input type="checkbox" data-notice="stock" data-id="${product.id}" ${notices[product.id]?.stock ? "checked" : ""} /> 有貨通知</label><label><input type="checkbox" data-notice="price" data-id="${product.id}" ${notices[product.id]?.price ? "checked" : ""} /> 降價通知</label></div>` : ""}</div><div class="saved-product-actions"><a class="secondary-button" href="index.html?product=${encodeURIComponent(product.id)}#products">查看</a><button class="primary-button" type="button" data-buy-id="${product.id}">加入購物車</button></div></article>`).join("") : '<p class="empty-cart">目前沒有商品紀錄。</p>';
}

function renderSupportThreads(cases) {
  const list = $("#memberSupportList");
  if (!list) return;
  list.innerHTML = cases.length ? cases.map((item) => `
    <article class="support-thread" data-support-id="${escapeHtml(item.id)}">
      <header><div><strong>${escapeHtml(item.id)}・${escapeHtml(item.type)}</strong><span>${escapeHtml(item.quoteId || "未指定訂單")}・更新 ${escapeHtml(item.updatedAt || item.createdAt)}</span></div><span class="lookup-status">${escapeHtml(item.status)}</span></header>
      <div class="support-messages">${(item.messages || []).map((message) => `<div class="support-message ${message.sender === "會員" ? "customer" : "staff"}"><strong>${escapeHtml(message.sender)}</strong><p>${escapeHtml(message.message)}</p>${message.attachment ? `<a href="${escapeHtml(message.attachment)}" target="_blank" rel="noreferrer">查看附件</a>` : ""}<time>${escapeHtml(message.createdAt)}</time></div>`).join("")}</div>
      ${item.status === "已完成" || item.status === "已拒絕" ? "" : `<form class="support-reply-form" data-support-reply="${escapeHtml(item.id)}"><input name="message" required placeholder="輸入要回覆客服的內容" /><button class="primary-button" type="submit">傳送</button></form>`}
    </article>`).join("") : '<p class="empty-cart">目前沒有客服對話，可以在下方建立新詢問。</p>';
}

function renderMemberProfile(profile) {
  $("#memberAuth").hidden = true;
  $("#memberDashboard").hidden = false;
  $("#memberWelcome").textContent = `${profile.member.name}，您好`;
  $("#memberEmail").textContent = profile.member.email;
  const cloudData = profile.data || {};
  if (cloudData.favorites?.length) save(FAVORITE_KEY, cloudData.favorites);
  if (cloudData.recent?.length) save(RECENT_KEY, cloudData.recent);
  if (cloudData.addresses?.length) save(ADDRESS_KEY, cloudData.addresses);
  if (cloudData.cart?.length && !load(CART_KEY, []).length && !localStorage.getItem(CART_CLEARED_KEY)) save(CART_KEY, cloudData.cart);
  if (cloudData.snapshots && Object.keys(cloudData.snapshots).length) save(SNAPSHOT_KEY, { ...load(SNAPSHOT_KEY, {}), ...cloudData.snapshots });
  const coupons = profile.coupons || [];
  $("#memberCouponList").innerHTML = coupons.length ? coupons.map((coupon) => `
    <article class="member-coupon"><strong>${escapeHtml(coupon.code)}</strong><span>${coupon.type === "percent" ? `${coupon.value}%` : money(coupon.value)}・滿 ${money(coupon.minimum)}・${escapeHtml(coupon.expiry || "無期限")}</span></article>`).join("") : '<p class="empty-cart">目前沒有可使用的會員折價券。</p>';
  const orders = profile.orders || [];
  const refundsByOrder = (profile.refunds || []).reduce((result, refund) => { (result[refund.quoteId] ||= []).push(refund); return result; }, {});
  const spent = orders.filter((order) => order.status !== "已取消").reduce((sum, order) => sum + Number(order.total || 0), 0);
  const tier = spent >= 20000 ? "VIP" : spent >= 5000 ? "常客" : "一般會員";
  const points = Math.floor(spent / 100);
  $("#memberStats").innerHTML = `<div><span>會員等級</span><strong>${tier}</strong></div><div><span>累積消費</span><strong>${money(spent)}</strong></div><div><span>瑤光點數</span><strong>${points.toLocaleString("zh-TW")} 點</strong></div>`;
  $("#memberOrderList").innerHTML = orders.length ? orders.map((order, orderIndex) => `
    <article class="member-order"><header><div><strong>${escapeHtml(order.quoteId)}</strong><span>${escapeHtml(order.createdAt)}・${money(order.total || 0)}</span></div><span class="lookup-status">${escapeHtml(order.status)}</span></header>${statusTimeline(order.status)}<p class="order-updated">最後更新：${escapeHtml(order.updatedAt || order.createdAt)}${order.trackingNumber ? `・物流單號：${escapeHtml(order.trackingNumber)}` : ""}</p>${order.actualWeight ? `<p>包裝後實重：${Number(order.actualWeight).toLocaleString("zh-TW")}g・實際國際運費：${money(order.actualShipping || 0)}・付款狀態：${escapeHtml(order.paymentStatus || "未付款")}${order.balanceDue ? `・待補款：${money(order.balanceDue)}` : ""}</p>` : ""}
      <details><summary>查看購物明細</summary>${(order.items || []).map((item) => `<div class="member-order-item"><span>${escapeHtml(item.name)}・${escapeHtml(item.variant)} × ${item.quantity}</span><strong>${money(item.subtotal)}</strong></div>`).join("") || "<p>這筆詢問沒有固定商品明細。</p>"}${order.adminNote ? `<p>店家備註：${escapeHtml(order.adminNote)}</p>` : ""}</details>${(refundsByOrder[order.quoteId] || []).map((refund) => `<p class="refund-status"><strong>退款 ${money(refund.amount)}</strong>・${escapeHtml(refund.status)}・${escapeHtml(refund.reason)}${refund.refundedAt ? `・${escapeHtml(refund.refundedAt)}` : ""}</p>`).join("")}${order.items?.length ? `<button class="secondary-button reorder-button" type="button" data-order-index="${orderIndex}">再次購買</button>` : ""}
    </article>`).join("") : '<p class="empty-cart">目前還沒有會員訂單。</p>';
  $("#memberFavoriteList").innerHTML = savedProductCards(productList(load(FAVORITE_KEY, [])), true);
  $("#memberRecentList").innerHTML = savedProductCards(productList(load(RECENT_KEY, [])), false);
  renderSupportThreads(profile.support || []);
  renderAddresses();
  window.memberOrders = orders;
  syncMemberData();
}

function renderAddresses() {
  const addresses = load(ADDRESS_KEY, []);
  $("#memberAddressList").innerHTML = addresses.length ? addresses.map((address) => `<article class="address-card"><div><strong>${escapeHtml(address.name)}</strong><span>${escapeHtml(address.phone)}</span><p>${escapeHtml(address.address || address.store)}</p></div><button class="secondary-button" type="button" data-delete-address="${address.id}">刪除</button></article>`).join("") : '<p class="empty-cart">尚未建立常用地址。</p>';
}

function syncMemberData() {
  const token = currentSession()?.token;
  if (!token) return Promise.resolve();
  return apiRequest("memberDataSave", { token, favorites: load(FAVORITE_KEY, []), recent: load(RECENT_KEY, []), addresses: load(ADDRESS_KEY, []), notices: load(NOTICE_KEY, {}), cart: load(CART_KEY, []), snapshots: load(SNAPSHOT_KEY, {}) }).catch(() => {});
}

function showLoggedOut(message = "") {
  localStorage.removeItem(SESSION_KEY);
  $("#memberAuth").hidden = false;
  $("#memberDashboard").hidden = true;
  $("#memberMessage").textContent = message;
}

async function initMemberPage() {
  const panels = {
    login: $("#memberLoginForm"),
    register: $("#memberRegisterForm"),
    forgot: $("#passwordResetRequestForm"),
    confirm: $("#passwordResetConfirmForm"),
  };
  const showAuthPanel = (name) => Object.entries(panels).forEach(([key, form]) => { if (form) form.hidden = key !== name; });
  $("#memberAuth").addEventListener("click", (event) => {
    const button = event.target.closest("[data-auth-panel]");
    if (button) showAuthPanel(button.dataset.authPanel);
  });
  const session = currentSession();
  if (session?.token) {
    $("#memberMessage").textContent = "正在載入會員資料...";
    try {
      const result = await apiRequest("memberProfile", { token: session.token });
      renderMemberProfile(result.profile);
      $("#memberMessage").textContent = "";
    } catch (error) { showLoggedOut(`登入已失效：${error.message}`); }
  }

  $("#memberRegisterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    $("#memberMessage").textContent = "正在建立會員帳號...";
    try {
      const result = await apiRequest("memberRegister", { name: $("#memberRegisterName").value.trim(), email: $("#memberRegisterEmail").value.trim(), password: $("#memberRegisterPassword").value });
      save(SESSION_KEY, { token: result.token });
      location.replace("member.html");
    } catch (error) { $("#memberMessage").textContent = error.message; }
  });

  $("#memberLoginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    $("#memberMessage").textContent = "登入中...";
    try {
      const result = await apiRequest("memberLogin", { email: $("#memberLoginEmail").value.trim(), password: $("#memberLoginPassword").value });
      if (result.admin) {
        sessionStorage.setItem("yaoguang-admin-token", result.adminToken);
        location.replace("admin.html");
        return;
      }
      save(SESSION_KEY, { token: result.token });
      form.reset();
      const profile = await apiRequest("memberProfile", { token: result.token });
      renderMemberProfile(profile.profile);
      $("#memberMessage").textContent = "";
    } catch (error) { $("#memberMessage").textContent = error.message; }
  });

  $("#passwordResetRequestForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = $("#resetEmail").value.trim();
    $("#memberMessage").textContent = "正在寄送驗證碼...";
    try {
      await apiRequest("passwordResetRequest", { email });
      $("#resetConfirmEmail").value = email;
      showAuthPanel("confirm");
      $("#memberMessage").textContent = "如果此 Email 已註冊，驗證碼已寄出，15 分鐘內有效。";
    } catch (error) { $("#memberMessage").textContent = error.message; }
  });

  $("#passwordResetConfirmForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    $("#memberMessage").textContent = "正在更新密碼...";
    try {
      await apiRequest("passwordResetConfirm", { email: $("#resetConfirmEmail").value.trim(), code: $("#resetCode").value.trim(), password: $("#resetNewPassword").value });
      form.reset();
      showAuthPanel("login");
      $("#memberMessage").textContent = "密碼已更新，請使用新密碼登入。";
    } catch (error) { $("#memberMessage").textContent = error.message; }
  });

  $("#memberLogout").addEventListener("click", () => {
    const token = currentSession()?.token;
    if (token) apiRequest("memberLogout", { token }).catch(() => {});
    showLoggedOut("已登出會員中心。");
  });
  document.querySelector(".member-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-member-tab]");
    if (!button) return;
    document.querySelectorAll("[data-member-tab]").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll("[data-member-panel]").forEach((panel) => { panel.hidden = panel.dataset.memberPanel !== button.dataset.memberTab; });
  });
  $("#addressForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const addresses = load(ADDRESS_KEY, []);
    addresses.push({ id: crypto.randomUUID(), name: $("#addressName").value.trim(), phone: $("#addressPhone").value.trim(), address: $("#addressText").value.trim(), store: $("#addressStore").value.trim() });
    save(ADDRESS_KEY, addresses);
    event.currentTarget.reset();
    renderAddresses();
    syncMemberData();
  });
  $("#supportForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    $("#supportMessage").textContent = "送出中...";
    try {
      const result = await apiRequest("supportCreate", { token: currentSession()?.token, quoteId: $("#supportQuoteId").value.trim(), type: $("#supportType").value, details: $("#supportDetails").value.trim(), attachment: $("#supportAttachment").value.trim() });
      $("#supportMessage").textContent = `已送出，案件編號：${result.supportId}`;
      form.reset();
      const profile = await apiRequest("memberProfile", { token: currentSession()?.token });
      renderSupportThreads(profile.profile.support || []);
    } catch (error) { $("#supportMessage").textContent = error.message; }
  });
  $("#refreshSupportThreads").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      const result = await apiRequest("memberProfile", { token: currentSession()?.token });
      renderSupportThreads(result.profile.support || []);
    } catch (error) { $("#supportMessage").textContent = error.message; }
    finally { button.disabled = false; }
  });
  $("#memberSupportList").addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-support-reply]");
    if (!form) return;
    event.preventDefault();
    const button = form.querySelector("button");
    button.disabled = true;
    try {
      await apiRequest("supportReply", { token: currentSession()?.token, supportId: form.dataset.supportReply, message: new FormData(form).get("message") });
      const result = await apiRequest("memberProfile", { token: currentSession()?.token });
      renderSupportThreads(result.profile.support || []);
      $("#supportMessage").textContent = "訊息已送出，客服也會收到 Email 通知。";
    } catch (error) { $("#supportMessage").textContent = error.message; }
    finally { button.disabled = false; }
  });
  $("#memberDashboard").addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-address]");
    if (deleteButton) { save(ADDRESS_KEY, load(ADDRESS_KEY, []).filter((item) => item.id !== deleteButton.dataset.deleteAddress)); renderAddresses(); syncMemberData(); return; }
    const buyButton = event.target.closest("[data-buy-id]");
    if (buyButton) { const product = productSnapshots()[buyButton.dataset.buyId]; if (product) { addProductsToCart([product]); location.href = "cart.html"; } return; }
    const reorder = event.target.closest("[data-order-index]");
    if (reorder) { addProductsToCart(window.memberOrders[Number(reorder.dataset.orderIndex)].items || []); location.href = "cart.html"; }
  });
  $("#memberDashboard").addEventListener("change", (event) => {
    const input = event.target.closest("[data-notice]");
    if (!input) return;
    const notices = load(NOTICE_KEY, {});
    notices[input.dataset.id] = { ...(notices[input.dataset.id] || {}), [input.dataset.notice]: input.checked };
    save(NOTICE_KEY, notices);
    syncMemberData();
  });
}

let cart = load(CART_KEY, []);
let activeCoupon = null;
let memberCoupons = [];

function shippingRate(method, grams) { return SHIPPING[method].rows.find(([max]) => grams <= max)?.[1] || null; }
function couponDiscount(subtotal) {
  if (!activeCoupon || !activeCoupon.active || subtotal < Number(activeCoupon.minimum || 0)) return 0;
  if (activeCoupon.expiry && new Date(`${activeCoupon.expiry}T23:59:59`) < new Date()) return 0;
  const discount = activeCoupon.type === "percent" ? Math.round(subtotal * Number(activeCoupon.value) / 100) : Number(activeCoupon.value);
  return Math.min(subtotal, discount);
}
function cartEstimate() {
  const settings = load(SETTINGS_KEY, { method: "ems", rate: 0.205, extra: 0 });
  const selectedMethod = $("#checkoutShippingMethod")?.value;
  const method = SHIPPING[selectedMethod] ? selectedMethod : SHIPPING[settings.method] ? settings.method : "ems";
  const weight = cart.reduce((sum, item) => sum + Number(item.weight || 0) * Number(item.quantity || 0), 0);
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
  const yen = weight ? shippingRate(method, weight) : 0;
  const outOfRange = weight > SHIPPING[method].limit || (weight > 0 && !yen);
  const shipping = yen ? Math.round(yen * Number(settings.rate || 0.205)) : 0;
  const discount = couponDiscount(subtotal);
  const extra = subtotal ? Number(settings.extra || 0) : 0;
  return { methodLabel: SHIPPING[method].label, weight, subtotal, discount, shipping, extra, total: subtotal - discount + shipping + extra, outOfRange };
}

function renderCart() {
  save(CART_KEY, cart);
  $("#cartItems").innerHTML = cart.length ? cart.map((item) => `
    <article class="cart-row"><div class="cart-product"><img src="${escapeHtml(item.image || "")}" alt="" /><div><h3>${escapeHtml(item.name)}</h3><p>規格：${escapeHtml(item.selectedVariant || item.spec || "標準款")}</p><p>單價 ${money(item.price)}・數量 ${item.quantity}</p><strong>小計 ${money(item.price * item.quantity)}</strong></div></div><div class="cart-controls"><button class="qty-button" type="button" data-action="decrease" data-id="${escapeHtml(item.cartId)}" aria-label="減少數量">−</button><strong>${item.quantity}</strong><button class="qty-button" type="button" data-action="increase" data-id="${escapeHtml(item.cartId)}" aria-label="增加數量">＋</button><button class="remove-button" type="button" data-action="remove" data-id="${escapeHtml(item.cartId)}">刪除</button></div></article>`).join("") : '<div class="empty-cart cart-empty-state"><h2>購物車目前是空的</h2><p>從商品分類挑選商品後，內容會保留在這裡。</p><a class="primary-button" href="index.html#products">前往選購</a></div>';
  const estimate = cartEstimate();
  $("#cartWeight").textContent = `${estimate.weight.toLocaleString("zh-TW")}g`;
  $("#cartSubtotal").textContent = money(estimate.subtotal);
  $("#cartDiscount").textContent = `-${money(estimate.discount)}`;
  $("#cartShipping").textContent = estimate.outOfRange ? "需另詢" : money(estimate.shipping);
  $("#cartTotal").textContent = estimate.outOfRange ? "需另詢" : money(estimate.total);
  if (currentSession()?.token) syncMemberData();
}

function validateCart() {
  const catalog = load(PRODUCT_KEY, []);
  const changes = [];
  cart.forEach((item) => {
    const current = catalog.find((product) => product.id === item.id);
    if (!current) return;
    if (current.status === "售完" || Number(current.stock) === 0) changes.push(`${item.name} 已售完或暫時缺貨`);
    if (current.updatedAt && item.updatedAt && current.updatedAt !== item.updatedAt) changes.push(`${item.name} 的價格或商品資料曾更新，送單前將由客服再次確認`);
  });
  $("#cartValidation").hidden = !changes.length;
  $("#cartValidation").innerHTML = changes.length ? `<strong>購物車內容有變動</strong>${changes.map((message) => `<p>${escapeHtml(message)}</p>`).join("")}` : "";
  return !changes.some((message) => message.includes("售完"));
}

function applyCoupon() {
  const code = $("#couponCode").value.trim().toUpperCase();
  const publicCoupons = load(COUPON_KEY, []);
  const coupon = [...memberCoupons, ...publicCoupons].find((item) => String(item.code).toUpperCase() === code);
  if (!coupon || coupon.active === false) {
    activeCoupon = null;
    $("#couponMessage").textContent = "找不到可使用的折價券。";
  } else if (coupon.expiry && new Date(`${coupon.expiry}T23:59:59`) < new Date()) {
    activeCoupon = null;
    $("#couponMessage").textContent = "此折價券已過期。";
  } else if (cartEstimate().subtotal < Number(coupon.minimum || 0)) {
    activeCoupon = null;
    $("#couponMessage").textContent = `商品小計需滿 ${money(coupon.minimum)}。`;
  } else {
    activeCoupon = { ...coupon, active: true };
    $("#couponMessage").textContent = `已套用 ${code}。`;
  }
  renderCart();
}

function orderMessage(form, id, estimate) {
  const lines = cart.map((item) => `・${item.name}／${item.selectedVariant || item.spec || "標準款"} × ${item.quantity}，${money(item.price * item.quantity)}`);
  return ["瑤光代購 固定商品訂單", `訂單編號：${id}`, `姓名：${form.name}`, `聯絡方式：${form.contact}`, "", "商品明細：", ...lines, "", `商品小計：${money(estimate.subtotal)}`, `優惠折抵：-${money(estimate.discount)}`, `預估國際運費：${estimate.outOfRange ? "需另詢" : money(estimate.shipping)}`, `預估合計：${estimate.outOfRange ? "需另詢" : money(estimate.total)}`, `付款方式：${form.payment}`, `取貨方式：${form.delivery}`, `缺貨處理：${form.outOfStockPreference}`, `備註：${form.note || "無"}`].join("\n");
}

function showSummary(message) {
  $("#summaryText").value = message;
  $("#summaryLineButton").href = lineUrl(message);
  $("#emailNotifyButton").href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(message.split("\n")[0])}&body=${encodeURIComponent(message)}`;
  $("#summaryPanel").hidden = false;
  $("#summaryPanel").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function initCartPage() {
  const session = currentSession();
  if (session?.token) {
    try {
      const result = await apiRequest("memberProfile", { token: session.token });
      memberCoupons = result.profile.coupons || [];
      if (result.profile.data?.addresses?.length) save(ADDRESS_KEY, result.profile.data.addresses);
      $("#orderName").value = result.profile.member.name || "";
      $("#orderContact").value = result.profile.member.email || "";
      $("#memberCheckoutHint").innerHTML = `已登入 <strong>${escapeHtml(result.profile.member.name)}</strong>，此訂單會存入會員紀錄。`;
    } catch { localStorage.removeItem(SESSION_KEY); }
  } else {
    $("#memberCheckoutHint").innerHTML = '尚未登入，<a href="member.html">登入會員</a>後下單可保留歷史紀錄。';
  }
  const addresses = load(ADDRESS_KEY, []);
  $("#savedAddress").innerHTML = '<option value="">自行填寫</option>' + addresses.map((address) => `<option value="${address.id}">${escapeHtml(address.name)}・${escapeHtml(address.address || address.store)}</option>`).join("");
  $("#savedAddress").addEventListener("change", () => {
    const address = addresses.find((item) => item.id === $("#savedAddress").value);
    if (!address) return;
    $("#orderName").value = address.name;
    $("#orderContact").value = address.phone;
    $("#deliveryAddress").value = address.address || address.store;
  });
  let checkoutStage = 1;
  function showCheckoutStage(stage) {
    checkoutStage = stage;
    document.querySelectorAll("[data-checkout-stage]").forEach((panel) => { panel.hidden = Number(panel.dataset.checkoutStage) !== stage; });
    document.querySelectorAll("#checkoutSteps li").forEach((item, index) => { item.classList.toggle("active", index < stage); item.classList.toggle("current", index === stage - 1); });
    $("#checkoutBack").hidden = stage === 1;
    $("#checkoutNext").hidden = stage === 4;
    $("#submitOrder").hidden = stage !== 4;
    if (stage === 4) {
      const estimate = cartEstimate();
      $("#checkoutReview").innerHTML = `<div class="review-summary"><div><span>商品小計</span><strong>${money(estimate.subtotal)}</strong></div><div><span>折價券</span><strong>-${money(estimate.discount)}</strong></div><div><span>${estimate.methodLabel}</span><strong>${estimate.outOfRange ? "需另詢" : money(estimate.shipping)}</strong></div><div class="total"><span>預估應付</span><strong>${estimate.outOfRange ? "需另詢" : money(estimate.total)}</strong></div></div>`;
    }
  }
  $("#checkoutNext").addEventListener("click", () => {
    if (!cart.length) return showSummary("購物車目前是空的，請先加入商品。");
    if (checkoutStage === 2 && (!$("#orderName").value.trim() || !$("#orderContact").value.trim())) { $("#orderName").reportValidity(); return; }
    showCheckoutStage(Math.min(4, checkoutStage + 1));
  });
  $("#checkoutBack").addEventListener("click", () => showCheckoutStage(Math.max(1, checkoutStage - 1)));
  $("#checkoutShippingMethod").addEventListener("change", renderCart);
  showCheckoutStage(1);
  renderCart();
  validateCart();
  $("#cartItems").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = cart.find((entry) => entry.cartId === button.dataset.id);
    if (!item) return;
    if (button.dataset.action === "increase") item.quantity += 1;
    if (button.dataset.action === "decrease") item.quantity -= 1;
    if (button.dataset.action === "remove" || item.quantity <= 0) cart = cart.filter((entry) => entry.cartId !== item.cartId);
    renderCart();
  });
  $("#applyCoupon").addEventListener("click", applyCoupon);
  $("#clearCart").addEventListener("click", async () => {
    if (cart.length && !confirm("確定要清空購物車嗎？")) return;
    cart = [];
    localStorage.setItem(CART_CLEARED_KEY, new Date().toISOString());
    activeCoupon = null;
    save(CART_KEY, cart);
    await syncMemberData();
    renderCart();
    $("#couponMessage").textContent = "購物車已清空。";
  });
  $("#couponCode").addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); applyCoupon(); } });
  $("#checkoutForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    if (!cart.length) return showSummary("購物車目前是空的，請先加入商品。");
    if (!validateCart()) return showSummary("購物車內有已售完商品，請先移除後再送出訂單。");
    const button = $("#submitOrder");
    button.disabled = true;
    button.textContent = "正在確認庫存...";
    try {
      const validation = await apiRequest("validateCart", { items: cart.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity })) });
      if (!validation.valid) { showSummary(`送出前庫存檢查未通過：\n${validation.errors.join("\n")}`); button.disabled = false; button.textContent = "確認並送出訂單"; return; }
      if (validation.warnings?.length && !confirm(`${validation.warnings.join("\n")}\n\n仍要送出並由客服重新報價嗎？`)) { button.disabled = false; button.textContent = "確認並送出訂單"; return; }
    } catch (error) {
      if (!/不支援的操作/.test(error.message)) { showSummary(`無法完成即時庫存檢查：${error.message}`); button.disabled = false; button.textContent = "確認並送出訂單"; return; }
    }
    button.textContent = "訂單送出中...";
    const id = quoteId();
    const form = { name: $("#orderName").value.trim(), contact: $("#orderContact").value.trim(), payment: $("#paymentMethod").value, delivery: `${$("#deliveryMethod").value}／${$("#deliveryAddress").value.trim() || "未填地址"}`, outOfStockPreference: $("#outOfStockPreference").value, note: $("#orderNote").value.trim() };
    const estimate = cartEstimate();
    const message = orderMessage(form, id, estimate);
    const order = { quoteId: id, type: "固定商品", customer: form.name, contact: form.contact, payment: form.payment, delivery: form.delivery, outOfStockPreference: form.outOfStockPreference, note: form.note, message, subtotal: estimate.subtotal, discount: estimate.discount, shipping: estimate.shipping, total: estimate.total, coupon: activeCoupon?.code || "", memberToken: currentSession()?.token || "", items: cart.map((item) => ({ id: item.id, name: item.name, variant: item.selectedVariant, quantity: item.quantity, price: item.price, weight: item.weight, category: item.category, status: item.status, sourceUrl: item.sourceUrl, image: item.image })) };
    try {
      await apiRequest("create", { order });
      const localOrders = load(ORDER_KEY, []);
      localOrders.unshift({ ...order, status: "待確認", createdAt: new Date().toLocaleString("zh-TW") });
      save(ORDER_KEY, localOrders);
      cart = [];
      localStorage.setItem(CART_CLEARED_KEY, new Date().toISOString());
      save(CART_KEY, cart);
      await syncMemberData();
      renderCart();
      showCheckoutStage(4);
      document.querySelectorAll("#checkoutSteps li").forEach((item) => item.classList.add("active"));
      showSummary(`${message}\n\n已成功送出訂單。請保存訂單編號，可在網站查詢進度。`);
      formElement.reset();
    } catch (error) { showSummary(`${message}\n\n注意：${error.message}。請點下方 LINE 按鈕把訂單傳給客服。`); }
    button.disabled = false;
    button.textContent = "確認並送出訂單";
  });
  $("#copyButton").addEventListener("click", async () => {
    const text = $("#summaryText").value;
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text); else { $("#summaryText").select(); document.execCommand("copy"); }
    $("#copyButton").textContent = "已複製";
  });
  $("#summaryLineButton").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText($("#summaryText").value); $("#summaryLineButton").textContent = "已複製，前往 LINE"; } catch {}
  });
}

if (document.body.dataset.page === "member") initMemberPage();
if (document.body.dataset.page === "cart") { initCartPage(); loadPublicSettings(); }
window.addEventListener("pageshow", () => {
  cart = load(CART_KEY, []);
  if (document.body.dataset.page === "cart") renderCart();
});
document.querySelectorAll('input[type="number"]').forEach((input) => input.addEventListener("keydown", (event) => {
  if (["e", "E", "+", "-"].includes(event.key)) event.preventDefault();
}));
