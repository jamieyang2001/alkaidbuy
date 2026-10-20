const SPREADSHEET_ID = "1-Klx-aoddtkW9z9eTdUT4Yy_LOZ7fgHHK-ifWEkf3-8";
const ORDER_SHEET = "訂單";
const ITEM_SHEET = "訂單明細";
const MEMBER_SHEET = "會員";
const MEMBER_COUPON_SHEET = "會員折價券";
const MEMBER_SESSION_SHEET = "會員登入";
const MEMBER_DATA_SHEET = "會員資料";
const SUPPORT_SHEET = "售後申請";
const ADMIN_SESSION_SHEET = "後台登入";
const NOTIFY_EMAIL = "alkaidbuy@gmail.com";
const CATALOG_SHEET = "商品雲端資料";
const EMAIL_LOG_SHEET = "Email紀錄";
const ERROR_LOG_SHEET = "網站錯誤";
const AUDIT_LOG_SHEET = "後台操作紀錄";

function doGet(e) {
  const action = String((e.parameter && e.parameter.action) || "health");
  try {
    if (action === "lookup") return json_(lookupOrder_(e.parameter.quoteId));
    if (action === "memberProfile") return json_({ ok: true, profile: memberProfile_(e.parameter.token) });
    if (action === "catalog") return json_({ ok: true, products: catalogList_() });
    if (action === "orders") {
      requireAdminToken_(e.parameter.adminToken);
      return json_({ ok: true, orders: listOrders_() });
    }
    if (action === "dashboard") { requireAdminToken_(e.parameter.adminToken); return json_({ ok: true, dashboard: dashboard_() }); }
    if (action === "supportCases") { requireAdminToken_(e.parameter.adminToken); return json_({ ok: true, cases: listSupportCases_() }); }
    return json_({ ok: true, service: "瑤光代購訂單 API", time: new Date().toISOString() });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || "{}");
    const action = String(data.action || "create");
    if (action === "create") return json_(createOrder_(data.order || data));
    if (action === "memberRegister") return json_(memberRegister_(data));
    if (action === "memberLogin") return json_(memberLogin_(data));
    if (action === "memberLogout") return json_(memberLogout_(data.token));
    if (action === "memberDataSave") return json_(memberDataSave_(data));
    if (action === "supportCreate") return json_(supportCreate_(data));
    if (action === "adminLogin") return json_(adminLogin_(data.password));
    if (action === "adminLogout") return json_(adminLogout_(data.adminToken));
    if (action === "productNotify") { requireAdminToken_(data.adminToken); return json_(productNotify_(data)); }
    if (action === "catalogUpsert") { requireAdminToken_(data.adminToken); return json_(catalogUpsert_(data.product)); }
    if (action === "catalogDelete") { requireAdminToken_(data.adminToken); return json_(catalogDelete_(data.productId)); }
    if (action === "catalogSeed") { requireAdminToken_(data.adminToken); return json_(catalogSeed_(data.products || [])); }
    if (action === "installMaintenance") { requireAdminToken_(data.adminToken); return json_(installMaintenance_()); }
    if (action === "formatSpreadsheet") { requireAdminToken_(data.adminToken); return json_(formatSpreadsheet_()); }
    if (action === "logError") return json_(logError_(data));
    if (action === "updateStatus") {
      requireAdminToken_(data.adminToken);
      return json_(updateStatus_(data.quoteId, data.status, data.adminNote, data.trackingNumber));
    }
    if (action === "updateFulfillment") { requireAdminToken_(data.adminToken); return json_(updateFulfillment_(data)); }
    if (action === "supportUpdate") { requireAdminToken_(data.adminToken); return json_(supportUpdate_(data)); }
    throw new Error("不支援的操作");
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function createOrder_(order) {
  rateLimit_("order:" + String(order.contact || "anonymous"), 5, 3600);
  if (!order.quoteId || !order.customer || !order.contact) throw new Error("訂單資料不完整");
  const sheet = sheet_(ORDER_SHEET);
  if (findOrderRow_(order.quoteId)) return { ok: true, quoteId: order.quoteId, duplicate: true };
  const now = new Date();
  const member = order.memberToken ? memberFromToken_(order.memberToken, false) : null;
  sheet.appendRow([
    now, safe_(order.quoteId), safe_(order.type), safe_(order.customer), safe_(order.contact),
    safe_(order.payment), safe_(order.delivery), number_(order.subtotal), number_(order.discount),
    number_(order.shipping), number_(order.total), "待確認", safe_(order.note), safe_(order.message),
    now, "", "網站", member ? member.id : "", "", safe_(order.outOfStockPreference || "請先聯絡我再決定"), 0, 0, 0, "未付款"
  ]);
  const itemSheet = sheet_(ITEM_SHEET);
  (order.items || []).forEach(function(item) {
    itemSheet.appendRow([
      safe_(order.quoteId), safe_(item.id), safe_(item.name), safe_(item.variant), number_(item.quantity),
      number_(item.price), number_(item.price) * number_(item.quantity), number_(item.weight),
      safe_(item.category), safe_(item.status), safe_(item.sourceUrl), safe_(item.image)
    ]);
  });
  sendEmail_(NOTIFY_EMAIL, "瑤光代購新訂單：" + order.quoteId, order.message || ("新訂單 " + order.quoteId), "新訂單", order.quoteId);
  const customerEmail = String(order.contact || "").trim();
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customerEmail)) sendEmail_(customerEmail, "瑤光代購已收到訂單：" + order.quoteId, "我們已收到您的訂單，確認價格與庫存後會再通知您。\n\n訂單編號：" + order.quoteId + "\n查詢：https://alkaidbuy.vercel.app/#lookup", "下單確認", order.quoteId);
  return { ok: true, quoteId: order.quoteId, status: "待確認", createdAt: now.toISOString() };
}

function lookupOrder_(quoteId) {
  const key = String(quoteId || "").trim().toUpperCase();
  if (!key) return { ok: false, error: "請輸入訂單編號" };
  const row = findOrderRow_(key);
  if (!row) return { ok: false, error: "找不到這筆訂單，請確認編號或聯絡客服" };
  return { ok: true, order: rowToOrder_(row.values) };
}

function listOrders_() {
  const sheet = sheet_(ORDER_SHEET);
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.max(24, sheet.getLastColumn())).getValues().reverse().map(rowToOrder_);
}

function updateStatus_(quoteId, status, adminNote, trackingNumber) {
  const allowed = ["待確認", "已報價", "待付款", "已付款", "採購中", "已到日本倉", "已寄出", "已完成", "已取消"];
  if (allowed.indexOf(status) < 0) throw new Error("訂單狀態不正確");
  const found = findOrderRow_(quoteId);
  if (!found) throw new Error("找不到訂單");
  const sheet = sheet_(ORDER_SHEET);
  sheet.getRange(found.row, 12).setValue(status);
  sheet.getRange(found.row, 15).setValue(new Date());
  if (adminNote !== undefined) sheet.getRange(found.row, 16).setValue(safe_(adminNote));
  if (trackingNumber !== undefined) sheet.getRange(found.row, 19).setValue(safe_(trackingNumber));
  const updated = sheet.getRange(found.row, 1, 1, 19).getValues()[0];
  notifyOrderStatus_(updated);
  audit_("更新訂單狀態", quoteId, status);
  return { ok: true, quoteId: quoteId, status: status };
}

function updateFulfillment_(data) {
  const found = findOrderRow_(data.quoteId);
  if (!found) throw new Error("找不到訂單");
  const sheet = sheet_(ORDER_SHEET);
  const actualWeight = Math.max(0, number_(data.actualWeight));
  const actualShipping = Math.max(0, number_(data.actualShipping));
  const balanceDue = Math.max(0, number_(data.balanceDue));
  const paymentStatus = String(data.paymentStatus || "未付款");
  if (["未付款", "待補款", "已付款", "已退款"].indexOf(paymentStatus) < 0) throw new Error("付款狀態不正確");
  sheet.getRange(found.row, 21, 1, 4).setValues([[actualWeight, actualShipping, balanceDue, safe_(paymentStatus)]]);
  sheet.getRange(found.row, 15).setValue(new Date());
  const updated = sheet.getRange(found.row, 1, 1, 24).getValues()[0];
  notifyOrderStatus_(updated);
  audit_("更新運費補款", data.quoteId, actualWeight + "g / NT$" + actualShipping + " / 補款NT$" + balanceDue + " / " + paymentStatus);
  return { ok: true, order: rowToOrder_(updated) };
}

function supportCreate_(data) {
  rateLimit_("support:" + String(data.token || "anonymous"), 3, 3600);
  const member = memberFromToken_(data.token, true);
  const type = String(data.type || "").trim();
  const details = String(data.details || "").trim();
  if (!type || !details) throw new Error("請完整填寫售後申請");
  const id = "S-" + Utilities.getUuid().replace(/-/g, "").slice(0, 10).toUpperCase();
  const sheet = ensureSheet_(SUPPORT_SHEET, ["申請時間", "案件編號", "會員ID", "會員Email", "訂單編號", "類型", "說明", "附件網址", "狀態", "更新時間"]);
  sheet.appendRow([new Date(), id, member.id, member.email, safe_(data.quoteId), safe_(type), safe_(details), safe_(data.attachment), "待處理", new Date()]);
  sendEmail_(NOTIFY_EMAIL, "瑤光代購售後申請 " + id, "會員：" + member.name + "\nEmail：" + member.email + "\n訂單：" + (data.quoteId || "未指定") + "\n類型：" + type + "\n說明：" + details + "\n附件：" + (data.attachment || "無"), "售後申請", id);
  return { ok: true, supportId: id };
}

function listSupportCases_() {
  const sheet = ensureSheet_(SUPPORT_SHEET, ["申請時間", "案件編號", "會員ID", "會員Email", "訂單編號", "類型", "說明", "附件網址", "狀態", "更新時間", "客服回覆"]);
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, Math.max(11, sheet.getLastColumn())).getValues().reverse().map(function(row) { return { createdAt: dateText_(row[0]), id: row[1], email: row[3], quoteId: row[4], type: row[5], details: row[6], attachment: row[7], status: row[8], updatedAt: dateText_(row[9]), reply: row[10] }; });
}

function supportUpdate_(data) {
  const sheet = ensureSheet_(SUPPORT_SHEET, ["申請時間", "案件編號", "會員ID", "會員Email", "訂單編號", "類型", "說明", "附件網址", "狀態", "更新時間", "客服回覆"]);
  if (sheet.getLastRow() < 2) throw new Error("找不到售後案件");
  const cell = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).createTextFinder(String(data.supportId)).matchEntireCell(true).findNext();
  if (!cell) throw new Error("找不到售後案件");
  const allowed = ["待處理", "處理中", "等待客人回覆", "已完成", "已拒絕"];
  if (allowed.indexOf(data.status) < 0) throw new Error("案件狀態不正確");
  sheet.getRange(cell.getRow(), 9, 1, 3).setValues([[data.status, new Date(), safe_(data.reply)]]);
  const email = String(sheet.getRange(cell.getRow(), 4).getValue() || "");
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) sendEmail_(email, "瑤光代購售後案件更新：" + data.supportId, "案件狀態：" + data.status + "\n客服回覆：" + (data.reply || "無") + "\n\n會員中心：https://alkaidbuy.vercel.app/member.html", "售後更新", data.supportId);
  audit_("更新售後案件", data.supportId, data.status);
  return { ok: true };
}

function notifyOrderStatus_(row) {
  const email = String(row[4] || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
  const subject = "瑤光代購訂單進度更新：" + row[1];
  const body = "您好，您的訂單進度已更新。\n\n訂單編號：" + row[1] + "\n目前狀態：" + row[11] + "\n物流單號：" + (row[18] || "尚未提供") + "\n店家備註：" + (row[15] || "無") + "\n\n會員中心：https://alkaidbuy.vercel.app/member.html";
  sendEmail_(email, subject, body, "訂單狀態", row[1]);
}

function productNotify_(data) {
  const product = data.product || {};
  const previous = data.previous || {};
  const stockChanged = Number(previous.stock || 0) <= 0 && Number(product.stock || 0) > 0;
  const priceChanged = Number(previous.yenPrice || previous.price || 0) > Number(product.yenPrice || product.price || 0);
  if (!stockChanged && !priceChanged) return { ok: true, sent: 0 };
  const dataSheet = ensureSheet_(MEMBER_DATA_SHEET, ["會員ID", "收藏", "最近瀏覽", "地址簿", "通知設定", "購物車", "更新時間", "商品快照"]);
  if (dataSheet.getLastRow() < 2) return { ok: true, sent: 0 };
  let sent = 0;
  dataSheet.getRange(2, 1, dataSheet.getLastRow() - 1, 8).getValues().forEach(function(row) {
    const notices = parseJson_(row[4], {});
    const setting = notices[product.id] || {};
    if (!(stockChanged && setting.stock) && !(priceChanged && setting.price)) return;
    const member = findMemberById_(row[0]);
    if (!member || !member.email) return;
    const reason = stockChanged ? "已恢復供貨" : "價格已調降";
    sendEmail_(member.email, "瑤光代購商品通知：" + product.name, product.name + " " + reason + "。\n\n目前價格：" + (product.yenPrice || product.price) + " 日圓\n前往網站：https://alkaidbuy.vercel.app/?product=" + encodeURIComponent(product.id), "商品通知", product.id);
    sent++;
  });
  return { ok: true, sent: sent };
}

function findMemberById_(id) {
  const sheet = sheet_(MEMBER_SHEET);
  if (sheet.getLastRow() < 2) return null;
  const cell = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(String(id)).matchEntireCell(true).findNext();
  if (!cell) return null;
  const row = sheet.getRange(cell.getRow(), 1, 1, 9).getValues()[0];
  return { id: row[0], name: row[1], email: normalizeEmail_(row[2]) };
}

function adminLogin_(password) {
  rateLimit_("admin-login", 8, 900);
  requireAdmin_(password);
  const token = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
  const expires = new Date(Date.now() + 6 * 60 * 60 * 1000);
  ensureSheet_(ADMIN_SESSION_SHEET, ["憑證", "建立時間", "到期時間", "狀態"]).appendRow([token, new Date(), expires, "啟用"]);
  audit_("後台登入", "admin", "登入成功，憑證有效 6 小時");
  return { ok: true, adminToken: token, expires: expires.toISOString() };
}

function adminLogout_(token) {
  const session = findAdminSession_(token);
  if (session) session.sheet.getRange(session.row, 4).setValue("已登出");
  return { ok: true };
}

function requireAdminToken_(token) {
  const session = findAdminSession_(token);
  if (!session || session.status !== "啟用" || new Date(session.expires) < new Date()) throw new Error("後台登入已失效，請重新登入");
}

function findAdminSession_(token) {
  if (!token) return null;
  const sheet = ensureSheet_(ADMIN_SESSION_SHEET, ["憑證", "建立時間", "到期時間", "狀態"]);
  if (sheet.getLastRow() < 2) return null;
  const cell = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(String(token)).matchEntireCell(true).findNext();
  if (!cell) return null;
  const values = sheet.getRange(cell.getRow(), 1, 1, 4).getValues()[0];
  return { sheet: sheet, row: cell.getRow(), expires: values[2], status: values[3] };
}

function findOrderRow_(quoteId) {
  const sheet = sheet_(ORDER_SHEET);
  if (sheet.getLastRow() < 2) return null;
  const finder = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1)
    .createTextFinder(String(quoteId || "").trim().toUpperCase()).matchEntireCell(true).findNext();
  if (!finder) return null;
  return { row: finder.getRow(), values: sheet.getRange(finder.getRow(), 1, 1, 19).getValues()[0] };
}

function rowToOrder_(row) {
  return {
    createdAt: dateText_(row[0]), quoteId: row[1], type: row[2], customer: row[3], contact: row[4],
    payment: row[5], delivery: row[6], subtotal: row[7], discount: row[8], shipping: row[9],
    total: row[10], status: row[11], note: row[12], message: row[13], updatedAt: dateText_(row[14]),
    adminNote: row[15], trackingNumber: row[18], outOfStockPreference: row[19], actualWeight: number_(row[20]), actualShipping: number_(row[21]), balanceDue: number_(row[22]), paymentStatus: row[23] || "未付款"
  };
}

function audit_(action, reference, details) {
  ensureSheet_(AUDIT_LOG_SHEET, ["時間", "操作", "關聯編號", "內容"]).appendRow([new Date(), safe_(action), safe_(reference), safe_(details)]);
}

function memberRegister_(data) {
  const name = String(data.name || "").trim();
  const email = normalizeEmail_(data.email);
  const password = String(data.password || "");
  rateLimit_("register:" + email, 3, 3600);
  if (name.length < 2) throw new Error("請輸入姓名");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Email格式不正確");
  if (password.length < 8) throw new Error("密碼至少需要8個字元");
  if (findMemberByEmail_(email)) throw new Error("這個Email已經註冊，請直接登入");
  const id = "M-" + Utilities.getUuid().replace(/-/g, "").slice(0, 12).toUpperCase();
  const salt = Utilities.getUuid();
  const now = new Date();
  sheet_(MEMBER_SHEET).appendRow([id, safe_(name), email, passwordHash_(password, salt), salt, now, now, "啟用", ""]);
  const token = createMemberSession_(id);
  return { ok: true, token: token, member: { id: id, name: name, email: email } };
}

function memberLogin_(data) {
  const email = normalizeEmail_(data.email);
  const password = String(data.password || "");
  const member = findMemberByEmail_(email);
  if (!member || member.status !== "啟用" || passwordHash_(password, member.salt) !== member.passwordHash) {
    throw new Error("Email或密碼錯誤");
  }
  sheet_(MEMBER_SHEET).getRange(member.row, 7).setValue(new Date());
  return { ok: true, token: createMemberSession_(member.id), member: { id: member.id, name: member.name, email: member.email } };
}

function memberLogout_(token) {
  const found = findSession_(token);
  if (found) sheet_(MEMBER_SESSION_SHEET).getRange(found.row, 5).setValue("已登出");
  return { ok: true };
}

function memberProfile_(token) {
  const member = memberFromToken_(token, true);
  const orderSheet = sheet_(ORDER_SHEET);
  const orders = orderSheet.getLastRow() < 2 ? [] : orderSheet.getRange(2, 1, orderSheet.getLastRow() - 1, 19).getValues()
    .filter(function(row) { return String(row[17]) === member.id; })
    .reverse().map(rowToOrder_);
  const orderIds = {};
  orders.forEach(function(order) { orderIds[order.quoteId] = order; order.items = []; });
  const itemSheet = sheet_(ITEM_SHEET);
  if (itemSheet.getLastRow() >= 2) {
    itemSheet.getRange(2, 1, itemSheet.getLastRow() - 1, 12).getValues().forEach(function(row) {
      if (!orderIds[row[0]]) return;
      orderIds[row[0]].items.push({ id: row[1], name: row[2], variant: row[3], quantity: number_(row[4]), price: number_(row[5]), subtotal: number_(row[6]), weight: number_(row[7]), category: row[8], status: row[9] });
    });
  }
  return { member: { id: member.id, name: member.name, email: member.email }, orders: orders, coupons: memberCoupons_(member), data: memberData_(member.id) };
}

function memberDataSave_(data) {
  const member = memberFromToken_(data.token, true);
  const sheet = ensureSheet_(MEMBER_DATA_SHEET, ["會員ID", "收藏", "最近瀏覽", "地址簿", "通知設定", "購物車", "更新時間", "商品快照"]);
  const values = [member.id, JSON.stringify(data.favorites || []), JSON.stringify(data.recent || []), JSON.stringify(data.addresses || []), JSON.stringify(data.notices || {}), JSON.stringify(data.cart || []), new Date(), JSON.stringify(data.snapshots || {})];
  const cell = sheet.getLastRow() < 2 ? null : sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(member.id).matchEntireCell(true).findNext();
  if (cell) sheet.getRange(cell.getRow(), 1, 1, values.length).setValues([values]);
  else sheet.appendRow(values);
  return { ok: true };
}

function memberData_(memberId) {
  const sheet = ensureSheet_(MEMBER_DATA_SHEET, ["會員ID", "收藏", "最近瀏覽", "地址簿", "通知設定", "購物車", "更新時間", "商品快照"]);
  if (sheet.getLastRow() < 2) return {};
  const cell = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(memberId).matchEntireCell(true).findNext();
  if (!cell) return {};
  const row = sheet.getRange(cell.getRow(), 1, 1, 8).getValues()[0];
  return { favorites: parseJson_(row[1], []), recent: parseJson_(row[2], []), addresses: parseJson_(row[3], []), notices: parseJson_(row[4], {}), cart: parseJson_(row[5], []), snapshots: parseJson_(row[7], {}) };
}

function parseJson_(value, fallback) {
  try { return value ? JSON.parse(String(value)) : fallback; } catch (error) { return fallback; }
}

function ensureSheet_(name, headers) {
  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = book.getSheetByName(name);
  if (!sheet) { sheet = book.insertSheet(name); sheet.appendRow(headers); sheet.setFrozenRows(1); }
  return sheet;
}

function memberCoupons_(member) {
  const sheet = sheet_(MEMBER_COUPON_SHEET);
  if (sheet.getLastRow() < 2) return [];
  const now = new Date();
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 10).getValues().filter(function(row) {
    const ownerMatch = String(row[0]) === member.id || normalizeEmail_(row[1]) === member.email;
    const validDate = !row[6] || new Date(row[6]) >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return ownerMatch && String(row[7] || "啟用") === "啟用" && validDate;
  }).map(function(row) {
    return { code: row[2], type: row[3] || "fixed", value: number_(row[4]), minimum: number_(row[5]), expiry: row[6] ? Utilities.formatDate(new Date(row[6]), "Asia/Taipei", "yyyy-MM-dd") : "", active: true };
  });
}

function findMemberByEmail_(email) {
  const sheet = sheet_(MEMBER_SHEET);
  if (sheet.getLastRow() < 2) return null;
  const cell = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).createTextFinder(normalizeEmail_(email)).matchEntireCell(true).findNext();
  if (!cell) return null;
  const row = sheet.getRange(cell.getRow(), 1, 1, 9).getValues()[0];
  return { row: cell.getRow(), id: row[0], name: row[1], email: normalizeEmail_(row[2]), passwordHash: row[3], salt: row[4], status: row[7] };
}

function createMemberSession_(memberId) {
  const token = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
  const now = new Date();
  const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  sheet_(MEMBER_SESSION_SHEET).appendRow([token, memberId, now, expires, "啟用"]);
  return token;
}

function findSession_(token) {
  if (!token) return null;
  const sheet = sheet_(MEMBER_SESSION_SHEET);
  if (sheet.getLastRow() < 2) return null;
  const cell = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(String(token)).matchEntireCell(true).findNext();
  if (!cell) return null;
  const row = sheet.getRange(cell.getRow(), 1, 1, 5).getValues()[0];
  return { row: cell.getRow(), token: row[0], memberId: row[1], expires: row[3], status: row[4] };
}

function memberFromToken_(token, required) {
  const session = findSession_(token);
  if (!session || session.status !== "啟用" || new Date(session.expires) < new Date()) {
    if (required) throw new Error("會員登入已失效，請重新登入");
    return null;
  }
  const sheet = sheet_(MEMBER_SHEET);
  const cell = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1).createTextFinder(session.memberId).matchEntireCell(true).findNext();
  if (!cell) {
    if (required) throw new Error("找不到會員資料");
    return null;
  }
  const row = sheet.getRange(cell.getRow(), 1, 1, 9).getValues()[0];
  if (String(row[7]) !== "啟用") throw new Error("會員帳號目前無法使用");
  return { id: row[0], name: row[1], email: normalizeEmail_(row[2]) };
}

function catalogList_() {
  const sheet = ensureSheet_(CATALOG_SHEET, ["商品ID", "商品JSON", "更新時間", "啟用"]);
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues().filter(function(row) { return String(row[3] || "啟用") === "啟用"; }).map(function(row) { return parseJson_(row[1], null); }).filter(Boolean);
}

function catalogUpsert_(product) {
  if (!product || !product.id || !product.name) throw new Error("商品資料不完整");
  const sheet = ensureSheet_(CATALOG_SHEET, ["商品ID", "商品JSON", "更新時間", "啟用"]);
  const finder = sheet.getLastRow() < 2 ? null : sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(String(product.id)).matchEntireCell(true).findNext();
  const values = [safe_(product.id), JSON.stringify(product), new Date(), "啟用"];
  if (finder) sheet.getRange(finder.getRow(), 1, 1, 4).setValues([values]); else sheet.appendRow(values);
  return { ok: true, id: product.id };
}

function catalogSeed_(products) {
  if (!Array.isArray(products) || !products.length) throw new Error("沒有可同步的商品");
  const sheet = ensureSheet_(CATALOG_SHEET, ["商品ID", "商品JSON", "更新時間", "啟用"]);
  if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  const now = new Date();
  const rows = products.map(function(product) { return [safe_(product.id), JSON.stringify(product), now, "啟用"]; });
  for (let start = 0; start < rows.length; start += 200) sheet.getRange(start + 2, 1, Math.min(200, rows.length - start), 4).setValues(rows.slice(start, start + 200));
  return { ok: true, count: rows.length };
}

function catalogDelete_(productId) {
  const sheet = ensureSheet_(CATALOG_SHEET, ["商品ID", "商品JSON", "更新時間", "啟用"]);
  if (sheet.getLastRow() < 2) return { ok: true };
  const finder = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(String(productId)).matchEntireCell(true).findNext();
  if (finder) { sheet.getRange(finder.getRow(), 4).setValue("停用"); sheet.getRange(finder.getRow(), 3).setValue(new Date()); }
  return { ok: true };
}

function dashboard_() {
  const orders = listOrders_();
  const today = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd");
  const active = orders.filter(function(order) { return order.status !== "已取消"; });
  const statusCounts = {};
  orders.forEach(function(order) { statusCounts[order.status] = (statusCounts[order.status] || 0) + 1; });
  const catalog = catalogList_();
  const support = ensureSheet_(SUPPORT_SHEET, ["申請時間", "案件編號", "會員ID", "會員Email", "訂單編號", "類型", "說明", "附件網址", "狀態", "更新時間"]);
  const pendingSupport = support.getLastRow() < 2 ? 0 : support.getRange(2, 9, support.getLastRow() - 1, 1).getValues().filter(function(row) { return String(row[0]) !== "已完成"; }).length;
  return { todayOrders: orders.filter(function(order) { return String(order.createdAt).indexOf(today) === 0; }).length, revenue: active.reduce(function(sum, order) { return sum + number_(order.total); }, 0), statusCounts: statusCounts, products: catalog.length, outOfStock: catalog.filter(function(product) { return product.status === "售完" || Number(product.stock) === 0; }).length, pendingSupport: pendingSupport };
}

function sendEmail_(to, subject, body, type, reference) {
  const sheet = ensureSheet_(EMAIL_LOG_SHEET, ["時間", "類型", "關聯編號", "收件者", "主旨", "狀態", "錯誤"]);
  try { MailApp.sendEmail(to, subject, body); sheet.appendRow([new Date(), type, reference, to, subject, "成功", ""]); }
  catch (error) { sheet.appendRow([new Date(), type, reference, to, subject, "失敗", safe_(error.message)]); return false; }
  return true;
}

function logError_(data) {
  rateLimit_("error:" + String(data.session || "anonymous"), 20, 3600);
  ensureSheet_(ERROR_LOG_SHEET, ["時間", "頁面", "訊息", "來源", "行號", "裝置"]).appendRow([new Date(), safe_(data.page), safe_(data.message), safe_(data.source), number_(data.line), safe_(data.userAgent)]);
  return { ok: true };
}

function rateLimit_(key, limit, seconds) {
  const cache = CacheService.getScriptCache();
  const cacheKey = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, key)).slice(0, 80);
  const count = number_(cache.get(cacheKey));
  if (count >= limit) throw new Error("操作過於頻繁，請稍後再試");
  cache.put(cacheKey, String(count + 1), seconds);
}

function installMaintenance_() {
  ScriptApp.getProjectTriggers().filter(function(trigger) { return trigger.getHandlerFunction() === "dailyBackup_"; }).forEach(function(trigger) { ScriptApp.deleteTrigger(trigger); });
  ScriptApp.newTrigger("dailyBackup_").timeBased().everyDays(1).atHour(3).create();
  formatSpreadsheet_();
  return { ok: true, message: "每日備份已啟用，試算表格式已整理" };
}

function formatSpreadsheet_() {
  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  book.getSheets().forEach(function(sheet) {
    const rows = Math.max(1, sheet.getLastRow());
    const columns = Math.max(1, sheet.getLastColumn());
    const range = sheet.getRange(1, 1, rows, columns);
    range.setFontFamily("Arial").setFontSize(11).setVerticalAlignment("middle").setWrap(true);
    sheet.getRange(1, 1, 1, columns).setFontWeight("bold").setFontColor("#ffffff").setBackground("#1f6f68").setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 34);
    if (rows > 1) sheet.setRowHeights(2, rows - 1, 30);
    sheet.autoResizeColumns(1, columns);
    for (let column = 1; column <= columns; column++) sheet.setColumnWidth(column, Math.min(320, Math.max(90, sheet.getColumnWidth(column))));
    sheet.getBandings().forEach(function(banding) { banding.remove(); });
    if (rows > 1) sheet.getRange(2, 1, rows - 1, columns).applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  });
  audit_("整理試算表", "all", "已統一字體、欄寬、列高與標題格式");
  return { ok: true, message: "試算表字體、欄寬、列高與標題已整理完成。" };
}

function authorizeServices() {
  MailApp.sendEmail(NOTIFY_EMAIL, "瑤光代購寄信權限測試", "寄信權限已完成授權，網站通知可以正常寄送。");
  return "授權完成，測試信已寄出";
}

function dailyBackup_() {
  const file = DriveApp.getFileById(SPREADSHEET_ID);
  const folders = DriveApp.getFoldersByName("瑤光代購每日備份");
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder("瑤光代購每日備份");
  file.makeCopy("瑤光代購備份-" + Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd-HHmm"), folder);
  const files = [], iterator = folder.getFiles();
  while (iterator.hasNext()) files.push(iterator.next());
  files.sort(function(a, b) { return b.getDateCreated() - a.getDateCreated(); });
  files.slice(30).forEach(function(oldFile) { oldFile.setTrashed(true); });
}

function passwordHash_(password, salt) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + "|" + password, Utilities.Charset.UTF_8);
  return Utilities.base64EncodeWebSafe(bytes);
}

function normalizeEmail_(email) {
  return String(email || "").trim().toLowerCase();
}

function sheet_(name) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
  if (!sheet) throw new Error("找不到試算表分頁：" + name);
  return sheet;
}

function requireAdmin_(password) {
  const configured = PropertiesService.getScriptProperties().getProperty("ADMIN_PASSWORD");
  if (!configured) throw new Error("尚未設定後台密碼，請在指令碼屬性加入 ADMIN_PASSWORD");
  if (String(password || "") !== configured) throw new Error("管理密碼錯誤");
}

function safe_(value) {
  const text = String(value == null ? "" : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function number_(value) {
  const parsed = Number(value);
  return isFinite(parsed) ? parsed : 0;
}

function dateText_(value) {
  if (!value) return "";
  return Utilities.formatDate(new Date(value), "Asia/Taipei", "yyyy/MM/dd HH:mm:ss");
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
