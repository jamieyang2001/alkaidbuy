const ORDER_API = "https://script.google.com/macros/s/AKfycbzpjqqe6NV_xusYI0mkrV3W9HtXsgQg-b-9vwNm4YvJ7tZij-Us80JtAm4MgCalAKFy/exec";
const CART_KEY = "yaoguang-cart-v1";
const SESSION_KEY = "yaoguang-member-session";
const COUPON_KEY = "yaoguang-coupons";
const SETTINGS_KEY = "yaoguang-fee-settings";
const ORDER_KEY = "yaoguang-orders";
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
const lineUrl = (message) => `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;

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

function renderMemberProfile(profile) {
  $("#memberAuth").hidden = true;
  $("#memberDashboard").hidden = false;
  $("#memberWelcome").textContent = `${profile.member.name}，您好`;
  $("#memberEmail").textContent = profile.member.email;
  const coupons = profile.coupons || [];
  $("#memberCouponList").innerHTML = coupons.length ? coupons.map((coupon) => `
    <article class="member-coupon"><strong>${escapeHtml(coupon.code)}</strong><span>${coupon.type === "percent" ? `${coupon.value}%` : money(coupon.value)}・滿 ${money(coupon.minimum)}・${escapeHtml(coupon.expiry || "無期限")}</span></article>`).join("") : '<p class="empty-cart">目前沒有可使用的會員折價券。</p>';
  const orders = profile.orders || [];
  $("#memberOrderList").innerHTML = orders.length ? orders.map((order) => `
    <article class="member-order"><strong>${escapeHtml(order.quoteId)}・${escapeHtml(order.status)}</strong><span>${escapeHtml(order.createdAt)}・${money(order.total || 0)}</span>
      <details><summary>查看購物明細</summary>${(order.items || []).map((item) => `<div class="member-order-item"><span>${escapeHtml(item.name)}・${escapeHtml(item.variant)} × ${item.quantity}</span><strong>${money(item.subtotal)}</strong></div>`).join("") || "<p>這筆詢問沒有固定商品明細。</p>"}${order.adminNote ? `<p>店家備註：${escapeHtml(order.adminNote)}</p>` : ""}</details>
    </article>`).join("") : '<p class="empty-cart">目前還沒有會員訂單。</p>';
}

function showLoggedOut(message = "") {
  localStorage.removeItem(SESSION_KEY);
  $("#memberAuth").hidden = false;
  $("#memberDashboard").hidden = true;
  $("#memberMessage").textContent = message;
}

async function initMemberPage() {
  const session = currentSession();
  if (session?.token) {
    $("#memberMessage").textContent = "正在載入會員資料...";
    try {
      const result = await apiRequest("memberProfile", { token: session.token }, "GET");
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
      event.currentTarget.reset();
      const profile = await apiRequest("memberProfile", { token: result.token }, "GET");
      renderMemberProfile(profile.profile);
      $("#memberMessage").textContent = "會員申請完成，已自動登入。";
    } catch (error) { $("#memberMessage").textContent = error.message; }
  });

  $("#memberLoginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    $("#memberMessage").textContent = "登入中...";
    try {
      const result = await apiRequest("memberLogin", { email: $("#memberLoginEmail").value.trim(), password: $("#memberLoginPassword").value });
      save(SESSION_KEY, { token: result.token });
      event.currentTarget.reset();
      const profile = await apiRequest("memberProfile", { token: result.token }, "GET");
      renderMemberProfile(profile.profile);
      $("#memberMessage").textContent = "";
    } catch (error) { $("#memberMessage").textContent = error.message; }
  });

  $("#memberLogout").addEventListener("click", () => {
    const token = currentSession()?.token;
    if (token) apiRequest("memberLogout", { token }).catch(() => {});
    showLoggedOut("已登出會員中心。");
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
  const method = SHIPPING[settings.method] ? settings.method : "ems";
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
  return ["瑤光代購 固定商品訂單", `訂單編號：${id}`, `姓名：${form.name}`, `聯絡方式：${form.contact}`, "", "商品明細：", ...lines, "", `商品小計：${money(estimate.subtotal)}`, `優惠折抵：-${money(estimate.discount)}`, `預估國際運費：${estimate.outOfRange ? "需另詢" : money(estimate.shipping)}`, `預估合計：${estimate.outOfRange ? "需另詢" : money(estimate.total)}`, `付款方式：${form.payment}`, `取貨方式：${form.delivery}`, `備註：${form.note || "無"}`].join("\n");
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
      const result = await apiRequest("memberProfile", { token: session.token }, "GET");
      memberCoupons = result.profile.coupons || [];
      $("#orderName").value = result.profile.member.name || "";
      $("#orderContact").value = result.profile.member.email || "";
      $("#memberCheckoutHint").innerHTML = `已登入 <strong>${escapeHtml(result.profile.member.name)}</strong>，此訂單會存入會員紀錄。`;
    } catch { localStorage.removeItem(SESSION_KEY); }
  } else {
    $("#memberCheckoutHint").innerHTML = '尚未登入，<a href="member.html">登入會員</a>後下單可保留歷史紀錄。';
  }
  renderCart();
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
  $("#couponCode").addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); applyCoupon(); } });
  $("#checkoutForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!cart.length) return showSummary("購物車目前是空的，請先加入商品。");
    const button = $("#submitOrder");
    button.disabled = true;
    button.textContent = "訂單送出中...";
    const id = quoteId();
    const form = { name: $("#orderName").value.trim(), contact: $("#orderContact").value.trim(), payment: $("#paymentMethod").value, delivery: $("#deliveryMethod").value, note: $("#orderNote").value.trim() };
    const estimate = cartEstimate();
    const message = orderMessage(form, id, estimate);
    const order = { quoteId: id, type: "固定商品", customer: form.name, contact: form.contact, payment: form.payment, delivery: form.delivery, note: form.note, message, subtotal: estimate.subtotal, discount: estimate.discount, shipping: estimate.shipping, total: estimate.total, coupon: activeCoupon?.code || "", memberToken: currentSession()?.token || "", items: cart.map((item) => ({ id: item.id, name: item.name, variant: item.selectedVariant, quantity: item.quantity, price: item.price, weight: item.weight, category: item.category, status: item.status, sourceUrl: item.sourceUrl, image: item.image })) };
    try {
      await apiRequest("create", { order });
      const localOrders = load(ORDER_KEY, []);
      localOrders.unshift({ ...order, status: "待確認", createdAt: new Date().toLocaleString("zh-TW") });
      save(ORDER_KEY, localOrders);
      cart = [];
      save(CART_KEY, cart);
      renderCart();
      showSummary(`${message}\n\n已成功送出訂單。請保存訂單編號，可在網站查詢進度。`);
      event.currentTarget.reset();
    } catch (error) { showSummary(`${message}\n\n注意：${error.message}。請點下方 LINE 按鈕把訂單傳給客服。`); }
    button.disabled = false;
    button.textContent = "確認並送出訂單";
  });
  $("#copyButton").addEventListener("click", async () => {
    const text = $("#summaryText").value;
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text); else { $("#summaryText").select(); document.execCommand("copy"); }
    $("#copyButton").textContent = "已複製";
  });
}

if (document.body.dataset.page === "member") initMemberPage();
if (document.body.dataset.page === "cart") initCartPage();
