const SPREADSHEET_ID = "1-Klx-aoddtkW9z9eTdUT4Yy_LOZ7fgHHK-ifWEkf3-8";
const ADMIN_PASSWORD = "tophet1003";
const ORDER_SHEET = "訂單";
const ITEM_SHEET = "訂單明細";

function doGet(e) {
  const action = String((e.parameter && e.parameter.action) || "health");
  try {
    if (action === "lookup") return json_(lookupOrder_(e.parameter.quoteId));
    if (action === "orders") {
      requireAdmin_(e.parameter.password);
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
    if (action === "updateStatus") {
      requireAdmin_(data.password);
      return json_(updateStatus_(data.quoteId, data.status, data.adminNote));
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
  sheet.appendRow([
    now, safe_(order.quoteId), safe_(order.type), safe_(order.customer), safe_(order.contact),
    safe_(order.payment), safe_(order.delivery), number_(order.subtotal), number_(order.discount),
    number_(order.shipping), number_(order.total), "待確認", safe_(order.note), safe_(order.message),
    now, "", "網站", safe_(order.lookupCode)
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
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 18).getValues().reverse().map(rowToOrder_);
}

function updateStatus_(quoteId, status, adminNote) {
  const allowed = ["待確認", "已報價", "待付款", "已付款", "採購中", "已到日本倉", "已寄出", "已完成", "已取消"];
  if (allowed.indexOf(status) < 0) throw new Error("訂單狀態不正確");
  const found = findOrderRow_(quoteId);
  if (!found) throw new Error("找不到訂單");
  const sheet = sheet_(ORDER_SHEET);
  sheet.getRange(found.row, 12).setValue(status);
  sheet.getRange(found.row, 15).setValue(new Date());
  if (adminNote !== undefined) sheet.getRange(found.row, 16).setValue(safe_(adminNote));
  return { ok: true, quoteId: quoteId, status: status };
}

function findOrderRow_(quoteId) {
  const sheet = sheet_(ORDER_SHEET);
  if (sheet.getLastRow() < 2) return null;
  const finder = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1)
    .createTextFinder(String(quoteId || "").trim().toUpperCase()).matchEntireCell(true).findNext();
  if (!finder) return null;
  return { row: finder.getRow(), values: sheet.getRange(finder.getRow(), 1, 1, 18).getValues()[0] };
}

function rowToOrder_(row) {
  return {
    createdAt: dateText_(row[0]), quoteId: row[1], type: row[2], customer: row[3], contact: row[4],
    payment: row[5], delivery: row[6], subtotal: row[7], discount: row[8], shipping: row[9],
    total: row[10], status: row[11], note: row[12], message: row[13], updatedAt: dateText_(row[14]),
    adminNote: row[15]
  };
}

function sheet_(name) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
  if (!sheet) throw new Error("找不到試算表分頁：" + name);
  return sheet;
}

function requireAdmin_(password) {
  if (String(password || "") !== ADMIN_PASSWORD) throw new Error("管理密碼錯誤");
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
