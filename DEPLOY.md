# 瑤光代購部署說明

這是一個靜態網站，可以部署到 Vercel、Netlify、GitHub Pages 或任何靜態主機。

## Vercel 部署

1. 到 https://vercel.com/new
2. 匯入這個專案資料夾或 GitHub repository
3. Framework Preset 選 `Other`
4. Build Command 留空
5. Output Directory 留空或填 `.`
6. Deploy

## Google Sheet 正式訂單系統

正式試算表：[瑤光代購訂單](https://docs.google.com/spreadsheets/d/1-Klx-aoddtkW9z9eTdUT4Yy_LOZ7fgHHK-ifWEkf3-8/edit)

1. 開啟正式試算表，到「擴充功能」→「Apps Script」。
2. 將 `google-sheet-apps-script.js` 的全部內容貼到 `程式碼.gs`，取代舊內容並儲存。
3. 點右上角「部署」→「新增部署作業」。
4. 類型選「網頁應用程式」，執行身分選「我」，存取權選「任何人」。
5. 點「部署」，完成 Google 授權後複製結尾是 `/exec` 的網址。
6. 將網址寫入 `script.js` 的 `defaultOrderApiUrl`，重新部署網站。

完成後，網站會把正式商品訂單與代訂詢問寫入試算表，客人可跨裝置查詢狀態，後台狀態更新也會回寫試算表。

## 目前資料限制

商品與收費設定仍會在瀏覽器保留一份快取。正式訂單以 Google Sheet 為主，瀏覽器也保留備份：

- Google API 正常時，新增、查詢與狀態更新均跨裝置同步。
- API 暫時失敗時，網站會要求客人改用 LINE 送出，避免漏單。
- 商品後台修改目前只影響操作中的瀏覽器；正式商品清單更新後仍需提交至 GitHub。

## 通知方式

目前通知使用前端可用的方式：

- LINE 按鈕會帶入訂單文字
- Email 按鈕會用後台設定的通知信箱開啟 mailto

如果要做到真正自動發送通知，需要後端 API 或第三方表單服務。
