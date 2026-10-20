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

function doGet(e) {
  const action = String((e.parameter && e.parameter.action) || "health");
  try {
    if (action === "lookup") return json_(lookupOrder_(e.parameter.quoteId));
    if (action === "memberProfile") return json_({ ok: true, profile: memberProfile_(e.parameter.token) });
    if (action === "orders") {
      requireAdminToken_(e.parameter.adminToken);
      return json_({ ok: true, orders: listOrders_() });
    }
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
    if (action === "updateStatus") {
      requireAdminToken_(data.adminToken);
      return json_(updateStatus_(data.quoteId, data.status, data.adminNote, data.trackingNumber));
    }
    throw new Error("不支援的操作");
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function createOrder_(order) {
  if (!order.quoteId || !order.customer || !order.contact) throw new Error("訂單資料不完整");
  const sheet = sheet_(ORDER_SHEET);
  if (findOrderRow_(order.quoteId)) return { ok: true, quoteId: order.quoteId, duplicate: true };
  const now = new Date();
  const member = order.memberToken ? memberFromToken_(order.memberToken, false) : null;
  sheet.appendRow([
    now, safe_(order.quoteId), safe_(order.type), safe_(order.customer), safe_(order.contact),
    safe_(order.payment), safe_(order.delivery), number_(order.subtotal), number_(order.discount),
    number_(order.shipping), number_(order.total), "待確認", safe_(order.note), safe_(order.message),
    now, "", "網站", member ? member.id : ""
  ]);
  const itemSheet = sheet_(ITEM_SHEET);
  (order.items || []).forEach(function(item) {
    itemSheet.appendRow([
      safe_(order.quoteId), safe_(item.id), safe_(item.name), safe_(item.variant), number_(item.quantity),
      number_(item.price), number_(item.price) * number_(item.quantity), number_(item.weight),
      safe_(item.category), safe_(item.status), safe_(item.sourceUrl), safe_(item.image)
    ]);
  });
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
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 19).getValues().reverse().map(rowToOrder_);
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
  return { ok: true, quoteId: quoteId, status: status };
}

function supportCreate_(data) {
  const member = memberFromToken_(data.token, true);
  const type = String(data.type || "").trim();
  const details = String(data.details || "").trim();
  if (!type || !details) throw new Error("請完整填寫售後申請");
  const id = "S-" + Utilities.getUuid().replace(/-/g, "").slice(0, 10).toUpperCase();
  const sheet = ensureSheet_(SUPPORT_SHEET, ["申請時間", "案件編號", "會員ID", "會員Email", "訂單編號", "類型", "說明", "附件網址", "狀態", "更新時間"]);
  sheet.appendRow([new Date(), id, member.id, member.email, safe_(data.quoteId), safe_(type), safe_(details), safe_(data.attachment), "待處理", new Date()]);
  MailApp.sendEmail(NOTIFY_EMAIL, "瑤光代購售後申請 " + id, "會員：" + member.name + "\nEmail：" + member.email + "\n訂單：" + (data.quoteId || "未指定") + "\n類型：" + type + "\n說明：" + details + "\n附件：" + (data.attachment || "無"));
  return { ok: true, supportId: id };
}

function notifyOrderStatus_(row) {
  const email = String(row[4] || "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
  const subject = "瑤光代購訂單進度更新：" + row[1];
  const body = "您好，您的訂單進度已更新。\n\n訂單編號：" + row[1] + "\n目前狀態：" + row[11] + "\n物流單號：" + (row[18] || "尚未提供") + "\n店家備註：" + (row[15] || "無") + "\n\n會員中心：https://alkaidbuy.vercel.app/member.html";
  MailApp.sendEmail(email, subject, body);
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
    MailApp.sendEmail(member.email, "瑤光代購商品通知：" + product.name, product.name + " " + reason + "。\n\n目前價格：" + (product.yenPrice || product.price) + " 日圓\n前往網站：https://alkaidbuy.vercel.app/?product=" + encodeURIComponent(product.id));
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
  requireAdmin_(password);
  const token = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
  const expires = new Date(Date.now() + 6 * 60 * 60 * 1000);
  ensureSheet_(ADMIN_SESSION_SHEET, ["憑證", "建立時間", "到期時間", "狀態"]).appendRow([token, new Date(), expires, "啟用"]);
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
    adminNote: row[15], trackingNumber: row[18]
  };
}

function memberRegister_(data) {
  const name = String(data.name || "").trim();
  const email = normalizeEmail_(data.email);
  const password = String(data.password || "");
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
