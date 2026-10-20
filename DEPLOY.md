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
2. 將 `google-sheet-apps-script-v4.js` 的全部內容貼到 `程式碼.gs`，取代舊內容並儲存。
3. 點右上角「部署」→「新增部署作業」。
4. 類型選「網頁應用程式」，執行身分選「我」，存取權選「任何人」。
5. 點「部署」，完成 Google 授權後複製結尾是 `/exec` 的網址。
6. 將網址寫入 `script.js` 的 `defaultOrderApiUrl`，重新部署網站。

完成後，網站會把正式商品訂單與代訂詢問寫入試算表，客人可跨裝置查詢狀態，後台狀態更新也會回寫試算表。

## 更新既有 Apps Script 部署

當 `google-sheet-apps-script-v4.js` 更新時：

1. 將最新檔案內容貼到 Apps Script 的 `程式碼.gs` 並儲存。
2. 點「部署」→「管理部署作業」。
3. 點鉛筆編輯，版本選「新版本」。
4. 點「部署」。原本的 `/exec` 網址不會改變。

會員資料使用「會員」、「會員登入」與「會員折價券」分頁。密碼只儲存加鹽雜湊，不保存明碼；會員登入權杖有效期為 30 天。

## 商品雲端與每日備份

部署 V4 後，登入網站後台：

- 第一次按「首次同步全部商品」，建立雲端商品資料。
- 後續新增、編輯與刪除商品會同步至 Google Sheet。
- 按「啟用每日備份」，授權 Google Drive 後每天備份試算表，保留最近 30 份。

## 通知方式

V4 會自動寄送訂單進度、售後案件、補貨與降價 Email，並將結果寫入「Email紀錄」分頁。

## 測試環境

功能修改請建立 GitHub 分支並推送，Vercel 會自動產生 Preview Deployment。確認 Preview 正常後再合併到 `main`，正式網站才會更新。

## Search Console

網站已提供 `/sitemap.xml` 與 `/robots.txt`。在 Google Search Console 新增網址前置字元資源後，使用 HTML 標記驗證，並提交 `https://alkaidbuy.vercel.app/sitemap.xml`。
