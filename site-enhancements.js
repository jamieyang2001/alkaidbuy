(function () {
  const LANGUAGE_KEY = "yaoguang-language";
  const ERROR_API = "https://script.google.com/macros/s/AKfycbzpjqqe6NV_xusYI0mkrV3W9HtXsgQg-b-9vwNm4YvJ7tZij-Us80JtAm4MgCalAKFy/exec";
  const translations = {
    en: {
      "商品": "Products", "代訂": "Requests", "運費": "Shipping", "購物車": "Cart", "會員": "Account", "查詢": "Order lookup", "後台": "Admin",
      "商品分類": "Product categories", "返回分類": "Back to categories", "顯示更多商品": "Show more", "加入購物車": "Add to cart", "查看日本官網": "Official Japan site", "加入收藏": "Favorite", "取消收藏": "Remove favorite",
      "購物車與結帳": "Cart & checkout", "購物明細": "Cart items", "繼續選購": "Continue shopping", "商品重量": "Weight", "商品小計": "Subtotal", "優惠折抵": "Discount", "預估國際運費": "Estimated shipping", "預估合計": "Estimated total", "下一步": "Next", "上一步": "Back", "確認並送出訂單": "Place order",
      "會員中心": "Member center", "申請會員": "Create account", "會員登入": "Sign in", "姓名": "Name", "密碼": "Password", "訂單": "Orders", "收藏": "Favorites", "最近瀏覽": "Recently viewed", "折價券": "Coupons", "地址簿": "Address book", "售後申請": "Support", "登出": "Sign out",
      "我的折價券": "My coupons", "訂單與購物明細": "Orders & items", "會員等級": "Member tier", "累積消費": "Lifetime spend", "瑤光點數": "Points", "再次購買": "Buy again",
      "代訂位、代訂票與特殊商品詢問": "Reservations, tickets & special requests", "客人訂單查詢": "Order lookup", "常見問題": "FAQ", "儲存地址": "Save address", "送出售後申請": "Submit request",
      "登入會員中心": "Sign in", "註冊會員": "Create account", "忘記密碼": "Forgot password", "建立會員帳號": "Create account", "返回登入": "Back to sign in", "寄送驗證碼": "Send verification code", "設定新密碼": "Set a new password", "更新密碼": "Update password",
      "需求類型": "Request type", "聯絡方式": "Contact", "店家或場所名稱": "Store or venue", "活動或商品名稱": "Event or product", "網址": "URL", "日期": "Date", "時間": "Time", "人數": "Guests", "數量": "Quantity", "預算 NT$": "Budget NT$", "需求內容（選填）": "Request details (optional)", "產生詢問內容": "Create request",
      "寄送方式": "Shipping method", "包裝後重量 g": "Packed weight (g)", "商品日幣金額": "Product total (JPY)", "日本國內運費 日幣": "Japan domestic shipping (JPY)", "額外需求預算 台幣": "Extra request budget (TWD)", "產生運費報價": "Calculate estimate",
      "全部細分類": "All subcategories", "全部狀態": "All statuses", "可直接代購": "Available", "需確認": "Confirmation required", "只顯示可寄送": "Shippable only", "熱門排序": "Popular", "最新上架": "Newest", "價格由低到高": "Price: low to high", "價格由高到低": "Price: high to low", "重量由輕到重": "Weight: low to high",
      "繁體中文": "Traditional Chinese", "簡體中文": "Simplified Chinese", "英文": "English", "日文": "Japanese", "隱私權與服務條款": "Privacy & terms"
    },
    ja: {
      "商品": "商品", "代訂": "予約代行", "運費": "送料", "購物車": "カート", "會員": "マイページ", "查詢": "注文照会", "後台": "管理",
      "商品分類": "商品カテゴリー", "返回分類": "カテゴリーに戻る", "顯示更多商品": "さらに表示", "加入購物車": "カートに入れる", "查看日本官網": "日本公式サイト", "加入收藏": "お気に入り", "取消收藏": "お気に入り解除",
      "購物車與結帳": "カート・ご注文", "購物明細": "カート内容", "繼續選購": "買い物を続ける", "商品重量": "商品重量", "商品小計": "小計", "優惠折抵": "割引", "預估國際運費": "国際送料（概算）", "預估合計": "合計（概算）", "下一步": "次へ", "上一步": "戻る", "確認並送出訂單": "注文を送信",
      "會員中心": "マイページ", "申請會員": "会員登録", "會員登入": "ログイン", "姓名": "氏名", "密碼": "パスワード", "訂單": "注文", "收藏": "お気に入り", "最近瀏覽": "閲覧履歴", "折價券": "クーポン", "地址簿": "住所録", "售後申請": "お問い合わせ", "登出": "ログアウト",
      "我的折價券": "マイクーポン", "訂單與購物明細": "注文履歴", "會員等級": "会員ランク", "累積消費": "累計購入額", "瑤光點數": "ポイント", "再次購買": "再購入",
      "代訂位、代訂票與特殊商品詢問": "予約・チケット・特別商品の依頼", "客人訂單查詢": "注文照会", "常見問題": "よくある質問", "儲存地址": "住所を保存", "送出售後申請": "送信", "隱私權與服務條款": "プライバシー・利用規約",
      "登入會員中心": "ログイン", "註冊會員": "会員登録", "忘記密碼": "パスワードを忘れた方", "建立會員帳號": "会員登録する", "返回登入": "ログインに戻る", "寄送驗證碼": "確認コードを送信", "設定新密碼": "新しいパスワード", "更新密碼": "パスワードを更新",
      "需求類型": "依頼種類", "聯絡方式": "連絡先", "店家或場所名稱": "店舗・会場名", "活動或商品名稱": "イベント・商品名", "網址": "URL", "日期": "日付", "時間": "時間", "人數": "人数", "數量": "数量", "預算 NT$": "予算 NT$", "需求內容（選填）": "詳細（任意）", "產生詢問內容": "依頼内容を作成",
      "寄送方式": "配送方法", "包裝後重量 g": "梱包後重量 g", "商品日幣金額": "商品金額（円）", "日本國內運費 日幣": "日本国内送料（円）", "額外需求預算 台幣": "追加希望予算（台湾ドル）", "產生運費報價": "送料を計算"
    }
  };
  const simplifiedMap = { "購":"购","單":"单","訂":"订","員":"员","與":"与","車":"车","價":"价","優":"优","惠":"惠","運":"运","費":"费","點":"点","歷":"历","錄":"录","發":"发","後":"后","臺":"台","體":"体","號":"号","詢":"询","貨":"货","應":"应","選":"选","顯":"显","儲":"储","賣":"卖","買":"买","總":"总","額":"额","聯":"联","絡":"络","務":"务","網":"网","據":"据","稱":"称","庫":"库","盡":"尽","覽":"览","權":"权","條":"条","關":"关","閉":"闭","無":"无","開":"开","碼":"码","驗":"验","證":"证","輸":"输","預":"预","間":"间","數":"数","種":"种","類":"类","細":"细","篩":"筛","圖":"图","內":"内","國":"国","際":"际","匯":"汇","率":"率","頁":"页","現":"现","狀":"状","態":"态","別":"别","註":"注","冊":"册","忘":"忘","設":"设","從":"从","這":"这","來":"来","處":"处","萬":"万","區":"区","門":"门","電":"电","話":"话","備":"备","註":"注","確":"确","認":"认","滿":"满","減":"减","張":"张","將":"将","僅":"仅","啟":"启","異":"异","常":"常","寫":"写","連":"连","線":"线","離":"离","刪":"删","除":"除","檔":"档","案":"案" };
  function simplify(value) { return [...value].map((char) => simplifiedMap[char] || char).join(""); }
  function translateValue(value, language) {
    const clean = value.trim();
    if (!clean) return value;
    if (language === "zh-TW") return value;
    if (language === "zh-CN") return value.replace(clean, simplify(clean));
    return translations[language]?.[clean] ? value.replace(clean, translations[language][clean]) : value;
  }
  function applyLanguage(language) {
    document.documentElement.lang = language === "zh-CN" ? "zh-Hans" : language === "zh-TW" ? "zh-Hant" : language;
    document.querySelectorAll("body *:not(script):not(style)").forEach((element) => {
      [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => {
        if (!node.__originalText) node.__originalText = node.nodeValue;
        const translated = translateValue(node.__originalText, language);
        if (node.nodeValue !== translated) node.nodeValue = translated;
      });
    });
    document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
      if (!element.dataset.originalPlaceholder) element.dataset.originalPlaceholder = element.placeholder;
      const translated = translateValue(element.dataset.originalPlaceholder, language);
      if (element.placeholder !== translated) element.placeholder = translated;
    });
    document.querySelector("#siteLanguage").value = language;
    localStorage.setItem(LANGUAGE_KEY, language);
  }
  const header = document.querySelector(".site-header");
  if (header) {
    const select = document.createElement("select");
    select.id = "siteLanguage";
    select.className = "language-select";
    select.setAttribute("aria-label", "Language");
    select.innerHTML = '<option value="zh-TW">繁體中文</option><option value="zh-CN">简体中文</option><option value="en">English</option><option value="ja">日本語</option>';
    header.insertBefore(select, header.lastElementChild);
    select.addEventListener("change", () => applyLanguage(select.value));
  }
  document.querySelectorAll(".site-footer").forEach((footer) => {
    const link = document.createElement("a");
    link.href = "policies.html";
    link.textContent = "隱私權與服務條款";
    footer.appendChild(link);
  });
  document.querySelectorAll("form").forEach((form) => {
    const field = document.createElement("label");
    field.className = "website-check";
    field.setAttribute("aria-hidden", "true");
    field.innerHTML = '<span>Website</span><input name="website" tabindex="-1" autocomplete="off" />';
    form.appendChild(field);
    form.addEventListener("submit", (event) => { if (field.querySelector("input").value) { event.preventDefault(); event.stopImmediatePropagation(); } }, true);
  });
  const analytics = document.createElement("script");
  analytics.defer = true;
  analytics.src = "/_vercel/insights/script.js";
  document.head.appendChild(analytics);
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "瑤光代購", url: "https://alkaidbuy.vercel.app", email: "alkaidbuy@gmail.com", sameAs: ["https://www.instagram.com/alkaidbuy/"] };
  const structured = document.createElement("script");
  structured.type = "application/ld+json";
  structured.textContent = JSON.stringify(organization);
  document.head.appendChild(structured);
  applyLanguage(localStorage.getItem(LANGUAGE_KEY) || "zh-TW");
  let translationTimer;
  new MutationObserver((mutations) => {
    if (!mutations.some((mutation) => mutation.addedNodes.length)) return;
    clearTimeout(translationTimer);
    translationTimer = setTimeout(() => applyLanguage(localStorage.getItem(LANGUAGE_KEY) || "zh-TW"), 30);
  }).observe(document.body, { childList: true, subtree: true });
  const errorSession = sessionStorage.getItem("yaoguang-error-session") || crypto.randomUUID();
  sessionStorage.setItem("yaoguang-error-session", errorSession);
  function reportError(message, source, line) {
    fetch(ERROR_API, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "logError", session: errorSession, page: location.href, message: String(message).slice(0, 500), source: String(source || "").slice(0, 300), line: Number(line || 0), userAgent: navigator.userAgent.slice(0, 500) }) }).catch(() => {});
  }
  window.addEventListener("error", (event) => reportError(event.message, event.filename, event.lineno));
  window.addEventListener("unhandledrejection", (event) => reportError(event.reason?.message || event.reason || "Unhandled promise rejection", "promise", 0));
})();
