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
const PURCHASE_ALLOCATION_SHEET = "採購分配";
const PACKAGE_SHEET = "日本包裹";
const COST_SHEET = "成本紀錄";
const STOCK_SHEET = "現貨庫存";

function doGet(e) {
  const action = String((e.parameter && e.parameter.action) || "health");
  try {
    if (action === "lookup") return json_(lookupOrder_(e.parameter.quoteId));
    if (action === "memberProfile") return json_({ ok: true, profile: memberProfile_(e.parameter.token) });
    if (action === "catalog") return json_({ ok: true, products: catalogList_() });
    if (action === "orders") {
      requireAdminToken_(e.parameter.adminToken);
      return json_({ ok: true, orders: listOrdersWithItems_() });
    }
    if (action === "dashboard") { requireAdminToken_(e.parameter.adminToken); return json_({ ok: true, dashboard: dashboard_() }); }
    if (action === "supportCases") { requireAdminToken_(e.parameter.adminToken); return json_({ ok: true, cases: listSupportCases_() }); }
    if (action === "purchaseSummary") { requireAdminToken_(e.parameter.adminToken); return json_({ ok: true, summary: purchaseSummary_(false) }); }
    if (action === "operationsCenter") { requireAdminToken_(e.parameter.adminToken); return json_({ ok: true, data: operationsCenter_() }); }
    if (action === "backupList") { requireAdminToken_(e.parameter.adminToken); return json_({ ok: true, backups: backupList_() }); }
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
    if (action === "refreshPurchaseSummary") { requireAdminToken_(data.adminToken); return json_({ ok: true, summary: purchaseSummary_(true), message: "總採購清單已更新" }); }
    if (action === "updatePurchaseAllocation") { requireAdminToken_(data.adminToken); return json_(updatePurchaseAllocation_(data)); }
    if (action === "batchPurchaseStatus") { requireAdminToken_(data.adminToken); return json_(batchPurchaseStatus_(data)); }
    if (action === "packageSave") { requireAdminToken_(data.adminToken); return json_(packageSave_(data)); }
    if (action === "costSave") { requireAdminToken_(data.adminToken); return json_(costSave_(data)); }
    if (action === "stockSave") { requireAdminToken_(data.adminToken); return json_(stockSave_(data)); }
    if (action === "sendPurchaseNotice") { requireAdminToken_(data.adminToken); return json_(sendPurchaseNotice_(data.quoteId)); }
    if (action === "createBackup") { requireAdminToken_(data.adminToken); dailyBackup_(); return json_({ ok: true, message: "備份已建立" }); }
    if (action === "restoreBackup") { requireAdminToken_(data.adminToken); return json_(restoreBackup_(data)); }
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

function listOrdersWithItems_() {
  const orders = listOrders_(), byId = {};
  orders.forEach(function(order) { order.items = []; byId[String(order.quoteId)] = order; });
  const allocations = purchaseAllocationMap_();
  const itemSheet = sheet_(ITEM_SHEET);
  if (itemSheet.getLastRow() >= 2) itemSheet.getRange(2, 1, itemSheet.getLastRow() - 1, 12).getValues().forEach(function(row) {
    const order = byId[String(row[0])]; if (!order) return;
    const key = String(row[1]) + "|" + String(row[3] || "標準款");
    const allocation = allocations[key], line = allocation && allocation.allocations[String(row[0])] || {};
    order.items.push({ id: row[1], name: row[2], variant: row[3], quantity: number_(row[4]), price: number_(row[5]), subtotal: number_(row[6]), weight: number_(row[7]), category: row[8], status: row[9], sourceUrl: row[10], image: row[11], allocated: number_(line.allocated), purchaseStatus: line.status || (allocation && allocation.status) || "待採購", purchaseNote: allocation && allocation.note || "" });
  });
  return orders;
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
  rateLimit_("admin-login", 30, 900);
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
  return { row: finder.getRow(), values: sheet.getRange(finder.getRow(), 1, 1, Math.max(24, sheet.getLastColumn())).getValues()[0] };
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
  const orders = orderSheet.getLastRow() < 2 ? [] : orderSheet.getRange(2, 1, orderSheet.getLastRow() - 1, Math.max(24, orderSheet.getLastColumn())).getValues()
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

function purchaseSummary_(writeSheet) {
  const catalog = {};
  catalogList_().forEach(function(product) { catalog[String(product.id)] = product; });
  const orders = {};
  const orderSheet = sheet_(ORDER_SHEET);
  if (orderSheet.getLastRow() >= 2) {
    orderSheet.getRange(2, 1, orderSheet.getLastRow() - 1, Math.max(24, orderSheet.getLastColumn())).getValues().forEach(function(row) {
      orders[String(row[1])] = { customer: String(row[3] || "未填姓名"), contact: String(row[4] || ""), status: String(row[11] || "") };
    });
  }
  const grouped = {}, savedAllocations = purchaseAllocationMap_();
  const itemSheet = sheet_(ITEM_SHEET);
  if (itemSheet.getLastRow() >= 2) {
    itemSheet.getRange(2, 1, itemSheet.getLastRow() - 1, 12).getValues().forEach(function(row) {
      const order = orders[String(row[0])];
      if (!order || order.status === "已取消") return;
      const product = catalog[String(row[1])] || {};
      const key = String(row[1]) + "|" + String(row[3] || "標準款");
      if (!grouped[key]) grouped[key] = { store: String(row[8] || product.category || "其他"), category: String(product.subcategory || row[9] || "未分類"), image: String(row[11] || product.image || ""), name: String(row[2] || product.name || row[1]), variant: String(row[3] || "標準款"), quantity: 0, orderIds: {}, customers: {}, demandLines: [], productId: String(row[1] || "") };
      const item = grouped[key];
      const quantity = number_(row[4]);
      item.quantity += quantity;
      item.orderIds[String(row[0])] = true;
      const customerKey = order.customer + (order.contact ? "（" + order.contact + "）" : "");
      item.customers[customerKey] = (item.customers[customerKey] || 0) + quantity;
      item.demandLines.push({ quoteId: String(row[0]), customer: order.customer, contact: order.contact, quantity: quantity });
    });
  }
  const result = Object.keys(grouped).map(function(key) {
    const item = grouped[key];
    const saved = savedAllocations[item.productId + "|" + item.variant] || { purchasedQuantity: 0, status: "待採購", note: "", allocations: {} };
    const lines = item.demandLines.map(function(line) { const allocation = saved.allocations[line.quoteId] || {}; return { quoteId: line.quoteId, customer: line.customer, contact: line.contact, quantity: line.quantity, allocated: number_(allocation.allocated), status: allocation.status || "待分配" }; });
    return { store: item.store, category: item.category, image: item.image, name: item.name, variant: item.variant, quantity: item.quantity, purchasedQuantity: number_(saved.purchasedQuantity), purchaseStatus: saved.status || "待採購", note: saved.note || "", orderCount: Object.keys(item.orderIds).length, customerCount: Object.keys(item.customers).length, customers: Object.keys(item.customers).map(function(name) { return { name: name, quantity: item.customers[name] }; }), demandLines: lines, productId: item.productId };
  }).sort(function(a, b) { return a.store.localeCompare(b.store) || a.category.localeCompare(b.category) || a.name.localeCompare(b.name); });
  if (writeSheet) {
    const sheet = ensureSheet_("總採購清單", ["店家", "類別", "商品圖片", "商品名稱", "規格", "需求總數", "已採購數", "採購狀態", "訂單數", "購買客人數", "購買客人與分配", "備註", "商品ID", "更新時間"]);
    if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
    if (result.length) {
      const now = new Date();
      const rows = result.map(function(item) { return [item.store, item.category, item.image, item.name, item.variant, item.quantity, item.purchasedQuantity, item.purchaseStatus, item.orderCount, item.customerCount, item.demandLines.map(function(line) { return line.customer + " 需求" + line.quantity + "／分配" + line.allocated + "（" + line.status + "）"; }).join("\n"), item.note, item.productId, now]; });
      sheet.getRange(2, 1, rows.length, 14).setValues(rows);
      result.forEach(function(item, index) { if (item.image) sheet.getRange(index + 2, 3).setFormula('=IMAGE("' + item.image.replace(/"/g, '""') + '",4,80,80)'); });
      sheet.setColumnWidth(3, 100); sheet.setColumnWidth(4, 280); sheet.setColumnWidth(11, 420); sheet.setRowHeights(2, rows.length, 88);
    }
    audit_("更新總採購清單", "all", "共 " + result.length + " 個商品規格");
  }
  return result;
}

function purchaseAllocationMap_() {
  const sheet = ensureSheet_(PURCHASE_ALLOCATION_SHEET, ["商品ID", "規格", "已採購數", "採購狀態", "備註", "分配JSON", "更新時間"]), result = {};
  if (sheet.getLastRow() < 2) return result;
  sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues().forEach(function(row) { result[String(row[0]) + "|" + String(row[1])] = { row: row, purchasedQuantity: number_(row[2]), status: String(row[3] || "待採購"), note: String(row[4] || ""), allocations: parseJson_(row[5], {}) }; });
  return result;
}

function updatePurchaseAllocation_(data) {
  const productId = String(data.productId || ""), variant = String(data.variant || "標準款"), purchasedQuantity = Math.max(0, number_(data.purchasedQuantity));
  const allowed = ["待採購", "部分到貨", "已買齊", "缺貨", "停售", "需確認"];
  if (!productId || allowed.indexOf(data.purchaseStatus) < 0) throw new Error("採購資料不完整");
  const allocations = {}, lines = Array.isArray(data.allocations) ? data.allocations : [], totalAllocated = lines.reduce(function(sum, line) {
    const allocated = Math.max(0, number_(line.allocated)); if (allocated > number_(line.quantity)) throw new Error("分配數量不可超過客人需求");
    allocations[String(line.quoteId)] = { allocated: allocated, status: String(line.status || (allocated ? "已分配" : "待分配")) }; return sum + allocated;
  }, 0);
  if (totalAllocated > purchasedQuantity) throw new Error("分配總數不可超過實際採購數量");
  const sheet = ensureSheet_(PURCHASE_ALLOCATION_SHEET, ["商品ID", "規格", "已採購數", "採購狀態", "備註", "分配JSON", "更新時間"]);
  const cell = sheet.getLastRow() < 2 ? null : sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(productId).matchEntireCell(true).findAll().filter(function(found) { return String(sheet.getRange(found.getRow(), 2).getValue()) === variant; })[0];
  const values = [productId, variant, purchasedQuantity, data.purchaseStatus, safe_(data.note), JSON.stringify(allocations), new Date()];
  if (cell) sheet.getRange(cell.getRow(), 1, 1, 7).setValues([values]); else sheet.appendRow(values);
  purchaseSummary_(true); audit_("更新採購分配", productId, variant + " / 採購" + purchasedQuantity + " / 分配" + totalAllocated);
  return { ok: true, purchasedQuantity: purchasedQuantity, allocatedQuantity: totalAllocated };
}

function operationsCenter_() {
  const orders = listOrdersWithItems_(), costs = costMap_(), alerts = [], settlements = [], packing = [];
  orders.filter(function(order) { return order.status !== "已取消"; }).forEach(function(order) {
    const shortages = (order.items || []).reduce(function(sum, item) { return ["缺貨", "取消", "停售"].indexOf(String(item.purchaseStatus)) >= 0 ? sum + Math.max(0, number_(item.quantity) - number_(item.allocated)) * number_(item.price) : sum; }, 0);
    const allocatedItems = (order.items || []).filter(function(item) { return number_(item.allocated) > 0; });
    const cost = costs[order.quoteId] || {};
    const revenue = number_(order.total) + number_(order.balanceDue) - shortages;
    const totalCost = number_(cost.productCostTwd) + number_(cost.domesticShipping) + number_(cost.internationalShipping) + number_(cost.otherCost);
    settlements.push({ quoteId: order.quoteId, customer: order.customer, contact: order.contact, shortageRefund: shortages, balanceDue: number_(order.balanceDue), paymentStatus: order.paymentStatus, revenue: revenue, cost: totalCost, profit: revenue - totalCost });
    packing.push({ quoteId: order.quoteId, customer: order.customer, contact: order.contact, delivery: order.delivery, trackingNumber: order.trackingNumber, items: allocatedItems });
    if (shortages > 0) alerts.push({ level: "warning", quoteId: order.quoteId, message: "有缺貨商品，預估應退款 " + shortages + " 元" });
    if (number_(order.balanceDue) > 0 && order.paymentStatus !== "已付款") alerts.push({ level: "warning", quoteId: order.quoteId, message: "待補款 " + order.balanceDue + " 元" });
    if (!order.delivery || String(order.delivery).indexOf("未填") >= 0) alerts.push({ level: "danger", quoteId: order.quoteId, message: "尚未填寫完整收件資料" });
    (order.items || []).forEach(function(item) { if (!item.allocated && item.purchaseStatus === "待採購") alerts.push({ level: "info", quoteId: order.quoteId, message: item.name + " 尚未採購分配" }); });
  });
  return { settlements: settlements, packing: packing, alerts: alerts, packages: packageList_(), stock: stockList_(), costs: costs };
}

function batchPurchaseStatus_(data) {
  const keys = Array.isArray(data.keys) ? data.keys : [], allowed = ["待採購", "部分到貨", "已買齊", "缺貨", "停售", "需確認"];
  if (!keys.length || allowed.indexOf(data.status) < 0) throw new Error("請選擇商品與批次狀態");
  const sheet = ensureSheet_(PURCHASE_ALLOCATION_SHEET, ["商品ID", "規格", "已採購數", "採購狀態", "備註", "分配JSON", "更新時間"]), saved = purchaseAllocationMap_();
  keys.forEach(function(key) { const parts = String(key).split("|"), productId = parts.shift(), variant = parts.join("|"), current = saved[key] || { purchasedQuantity: 0, allocations: {} }; const values = [productId, variant, number_(current.purchasedQuantity), data.status, safe_(data.note), JSON.stringify(current.allocations || {}), new Date()]; const matches = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(productId).matchEntireCell(true).findAll(); const cell = matches.filter(function(found) { return String(sheet.getRange(found.getRow(), 2).getValue()) === variant; })[0]; if (cell) sheet.getRange(cell.getRow(), 1, 1, 7).setValues([values]); else sheet.appendRow(values); });
  purchaseSummary_(true); audit_("批次採購狀態", "商品" + keys.length + "件", data.status); return { ok: true, count: keys.length };
}

function packageSave_(data) {
  const id = String(data.packageId || "JP-" + Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyyMMdd-HHmm"));
  const sheet = ensureSheet_(PACKAGE_SHEET, ["箱號", "狀態", "寄送方式", "實重g", "物流單號", "訂單編號", "內容", "更新時間"]);
  const values = [id, safe_(data.status || "日本集貨中"), safe_(data.shippingMethod), number_(data.weight), safe_(data.trackingNumber), safe_((data.quoteIds || []).join(",")), JSON.stringify(data.items || []), new Date()];
  const cell = sheet.getLastRow() < 2 ? null : sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext(); if (cell) sheet.getRange(cell.getRow(), 1, 1, 8).setValues([values]); else sheet.appendRow(values);
  audit_("儲存日本包裹", id, data.status); return { ok: true, packageId: id };
}
function packageList_() { const sheet = ensureSheet_(PACKAGE_SHEET, ["箱號", "狀態", "寄送方式", "實重g", "物流單號", "訂單編號", "內容", "更新時間"]); if (sheet.getLastRow() < 2) return []; return sheet.getRange(2,1,sheet.getLastRow()-1,8).getValues().reverse().map(function(r){return {packageId:r[0],status:r[1],shippingMethod:r[2],weight:number_(r[3]),trackingNumber:r[4],quoteIds:String(r[5]||"").split(",").filter(Boolean),items:parseJson_(r[6],[]),updatedAt:dateText_(r[7])};}); }
function costMap_() { const sheet=ensureSheet_(COST_SHEET,["訂單編號","商品成本台幣","日本國內運費","國際運費","其他成本","日幣匯率","更新時間"]),result={}; if(sheet.getLastRow()<2)return result; sheet.getRange(2,1,sheet.getLastRow()-1,7).getValues().forEach(function(r){result[String(r[0])]={productCostTwd:number_(r[1]),domesticShipping:number_(r[2]),internationalShipping:number_(r[3]),otherCost:number_(r[4]),yenRate:number_(r[5])};});return result; }
function costSave_(data) { const sheet=ensureSheet_(COST_SHEET,["訂單編號","商品成本台幣","日本國內運費","國際運費","其他成本","日幣匯率","更新時間"]),id=String(data.quoteId),values=[id,number_(data.productCostTwd),number_(data.domesticShipping),number_(data.internationalShipping),number_(data.otherCost),number_(data.yenRate),new Date()],cell=sheet.getLastRow()<2?null:sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(id).matchEntireCell(true).findNext();if(cell)sheet.getRange(cell.getRow(),1,1,7).setValues([values]);else sheet.appendRow(values);return {ok:true}; }
function stockSave_(data) { const sheet=ensureSheet_(STOCK_SHEET,["商品ID","商品名稱","圖片","規格","現貨數量","售價","狀態","更新時間"]),id=String(data.productId),values=[id,safe_(data.name),safe_(data.image),safe_(data.variant),number_(data.quantity),number_(data.price),safe_(data.status||"販售中"),new Date()],cell=sheet.getLastRow()<2?null:sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(id).matchEntireCell(true).findNext();if(cell)sheet.getRange(cell.getRow(),1,1,8).setValues([values]);else sheet.appendRow(values);return {ok:true}; }
function stockList_(){const sheet=ensureSheet_(STOCK_SHEET,["商品ID","商品名稱","圖片","規格","現貨數量","售價","狀態","更新時間"]);if(sheet.getLastRow()<2)return[];return sheet.getRange(2,1,sheet.getLastRow()-1,8).getValues().map(function(r){return{productId:r[0],name:r[1],image:r[2],variant:r[3],quantity:number_(r[4]),price:number_(r[5]),status:r[6],updatedAt:dateText_(r[7])};});}
function sendPurchaseNotice_(quoteId){const order=listOrdersWithItems_().filter(function(item){return item.quoteId===quoteId;})[0];if(!order)throw new Error("找不到訂單");const email=String(order.contact||"");if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))throw new Error("客人聯絡方式不是Email");const lines=(order.items||[]).map(function(item){return item.name+"：分配 "+item.allocated+"/"+item.quantity+"（"+item.purchaseStatus+"）";}).join("\n");sendEmail_(email,"瑤光代購採購進度："+quoteId,"訂單編號："+quoteId+"\n\n"+lines+"\n\n會員中心：https://alkaidbuy.vercel.app/member.html","採購進度",quoteId);return{ok:true};}

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
  DriveApp.getFoldersByName("瑤光代購每日備份").hasNext();
  MailApp.sendEmail(NOTIFY_EMAIL, "瑤光代購寄信權限測試", "寄信權限已完成授權，網站通知可以正常寄送。");
  return "寄信與Google Drive備份權限已完成授權，測試信已寄出";
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

function backupList_() {
  const folders = DriveApp.getFoldersByName("瑤光代購每日備份"); if (!folders.hasNext()) return [];
  const files = [], iterator = folders.next().getFiles(); while (iterator.hasNext()) { const file = iterator.next(); files.push({ id: file.getId(), name: file.getName(), createdAt: dateText_(file.getDateCreated()) }); }
  return files.sort(function(a,b){return b.createdAt.localeCompare(a.createdAt);}).slice(0,30);
}
function restoreBackup_(data) {
  if (String(data.confirmation) !== "RESTORE") throw new Error("還原確認文字不正確");
  const source = SpreadsheetApp.openById(String(data.fileId)), target = SpreadsheetApp.openById(SPREADSHEET_ID);
  dailyBackup_();
  source.getSheets().forEach(function(sourceSheet){ let targetSheet=target.getSheetByName(sourceSheet.getName()); if(!targetSheet)targetSheet=target.insertSheet(sourceSheet.getName()); targetSheet.clear(); const range=sourceSheet.getDataRange(); if(range.getNumRows()&&range.getNumColumns())targetSheet.getRange(1,1,range.getNumRows(),range.getNumColumns()).setValues(range.getValues()); });
  audit_("還原備份", data.fileId, source.getName()); return {ok:true,message:"已還原「"+source.getName()+"」，還原前資料也已自動備份"};
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
