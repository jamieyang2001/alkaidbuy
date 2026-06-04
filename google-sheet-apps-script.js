const SHEET_NAME = "orders";

function doPost(e) {
  const sheet = getSheet();
  const data = JSON.parse(e.postData.contents || "{}");

  sheet.appendRow([
    new Date(),
    data.quoteId || "",
    data.type || "",
    data.customer || "",
    data.contact || "",
    data.status || "",
    data.createdAt || "",
    data.message || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(["同步時間", "報價編號", "類型", "客人", "聯絡方式", "狀態", "建立時間", "內容"]);
  }

  return sheet;
}
