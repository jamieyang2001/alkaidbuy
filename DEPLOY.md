# 瑤光代購部署說明

這是一個靜態網站，可以部署到 Vercel、Netlify、GitHub Pages 或任何靜態主機。

## Vercel 部署

1. 到 https://vercel.com/new
2. 匯入這個專案資料夾或 GitHub repository
3. Framework Preset 選 `Other`
4. Build Command 留空
5. Output Directory 留空或填 `.`
6. Deploy

## Google Sheet 訂單同步

1. 建立一個 Google Sheet
2. 到「擴充功能」→「Apps Script」
3. 貼上 `google-sheet-apps-script.js` 的內容
4. 部署 → 新增部署作業 → 類型選「網頁應用程式」
5. 執行身分選「我」
6. 存取權選「任何人」
7. 複製 Web App URL
8. 回到網站後台，貼到「Google Sheet Web App URL」

之後產生報價或詢問紀錄時，網站會同步送到 Google Sheet。

## 目前資料限制

商品、詢問紀錄、後台設定目前存在瀏覽器 `localStorage`。這代表：

- 同一台電腦同一個瀏覽器可以查詢與管理
- 換裝置或換瀏覽器不會同步
- 正式營運建議改接資料庫，例如 Supabase、Firebase、Airtable 或 Google Sheet API

## 通知方式

目前通知使用前端可用的方式：

- LINE 按鈕會帶入訂單文字
- Email 按鈕會用後台設定的通知信箱開啟 mailto

如果要做到真正自動發送通知，需要後端 API 或第三方表單服務。
