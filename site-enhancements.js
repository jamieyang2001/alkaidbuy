(function () {
  const LANGUAGE_KEY = "yaoguang-language";
  const ERROR_API = "https://script.google.com/macros/s/AKfycbzpjqqe6NV_xusYI0mkrV3W9HtXsgQg-b-9vwNm4YvJ7tZij-Us80JtAm4MgCalAKFy/exec";
  const translations = {
    en: {
      "商品": "Products", "代訂": "Requests", "運費": "Shipping", "購物車": "Cart", "會員": "Account", "查詢": "Order lookup", "後台": "Admin", "首頁": "Home", "代訂詢問": "Requests", "運費試算": "Shipping estimate", "訂單查詢": "Order lookup", "會員客服": "Member support", "客服對話": "Support messages", "更新對話": "Refresh messages", "建立新詢問": "New inquiry", "一般詢問": "General inquiry", "詢問內容": "Message", "送出詢問": "Send inquiry", "傳送": "Send",
      "商品分類": "Product categories", "返回分類": "Back to categories", "顯示更多商品": "Show more", "加入購物車": "Add to cart", "查看日本官網": "Official Japan site", "加入收藏": "Favorite", "取消收藏": "Remove favorite",
      "購物車與結帳": "Cart & checkout", "購物明細": "Cart items", "繼續選購": "Continue shopping", "商品重量": "Weight", "商品小計": "Subtotal", "優惠折抵": "Discount", "預估國際運費": "Estimated shipping", "預估合計": "Estimated total", "下一步": "Next", "上一步": "Back", "確認並送出訂單": "Place order",
      "會員中心": "Member center", "申請會員": "Create account", "會員登入": "Sign in", "姓名": "Name", "密碼": "Password", "訂單": "Orders", "收藏": "Favorites", "最近瀏覽": "Recently viewed", "折價券": "Coupons", "地址簿": "Address book", "售後申請": "Support", "登出": "Sign out",
      "我的折價券": "My coupons", "訂單與購物明細": "Orders & items", "會員等級": "Member tier", "累積消費": "Lifetime spend", "瑤光點數": "Points", "再次購買": "Buy again",
      "代訂位、代訂票與特殊商品詢問": "Reservations, tickets & special requests", "客人訂單查詢": "Order lookup", "常見問題": "FAQ", "儲存地址": "Save address", "送出售後申請": "Submit request",
      "登入會員中心": "Sign in", "註冊會員": "Create account", "忘記密碼": "Forgot password", "建立會員帳號": "Create account", "返回登入": "Back to sign in", "寄送驗證碼": "Send verification code", "設定新密碼": "Set a new password", "更新密碼": "Update password",
      "需求類型": "Request type", "聯絡方式": "Contact", "店家或場所名稱": "Store or venue", "活動或商品名稱": "Event or product", "網址": "URL", "日期": "Date", "時間": "Time", "人數": "Guests", "數量": "Quantity", "預算 NT$": "Budget NT$", "需求內容（選填）": "Request details (optional)", "產生詢問內容": "Create request", "直接送出詢問": "Send inquiry directly", "詢問對話": "Inquiry messages", "更新詢問": "Refresh inquiries",
      "寄送方式": "Shipping method", "包裝後重量 g": "Packed weight (g)", "商品日幣金額": "Product total (JPY)", "日本國內運費 日幣": "Japan domestic shipping (JPY)", "額外需求預算 台幣": "Extra request budget (TWD)", "產生運費報價": "Calculate estimate",
      "全部細分類": "All subcategories", "全部狀態": "All statuses", "可直接代購": "Available", "需確認": "Confirmation required", "只顯示可寄送": "Shippable only", "熱門排序": "Popular", "最新上架": "Newest", "價格由低到高": "Price: low to high", "價格由高到低": "Price: high to low", "重量由輕到重": "Weight: low to high",
      "繁體中文": "Traditional Chinese", "簡體中文": "Simplified Chinese", "英文": "English", "日文": "Japanese", "隱私權與服務條款": "Privacy & terms", "報表與稽核": "Reports & audit", "營運報表與系統稽核": "Operations reports & system audit", "更新報表": "Refresh reports", "檢查商品圖片與連結": "Check product images & links", "近 14 日營業額": "Revenue: last 14 days", "每月營業額": "Monthly revenue", "熱門商品": "Popular products", "商品品質": "Product quality", "Email 通知紀錄": "Email notification log", "後台操作紀錄": "Admin activity log"
    },
    ja: {
      "商品": "商品", "代訂": "予約代行", "運費": "送料", "購物車": "カート", "會員": "マイページ", "查詢": "注文照会", "後台": "管理", "首頁": "ホーム", "代訂詢問": "代行依頼", "運費試算": "送料計算", "訂單查詢": "注文照会", "會員客服": "会員サポート", "客服對話": "サポートメッセージ", "更新對話": "メッセージ更新", "建立新詢問": "新規お問い合わせ", "一般詢問": "一般のお問い合わせ", "詢問內容": "お問い合わせ内容", "送出詢問": "お問い合わせを送信", "傳送": "送信",
      "商品分類": "商品カテゴリー", "返回分類": "カテゴリーに戻る", "顯示更多商品": "さらに表示", "加入購物車": "カートに入れる", "查看日本官網": "日本公式サイト", "加入收藏": "お気に入り", "取消收藏": "お気に入り解除",
      "購物車與結帳": "カート・ご注文", "購物明細": "カート内容", "繼續選購": "買い物を続ける", "商品重量": "商品重量", "商品小計": "小計", "優惠折抵": "割引", "預估國際運費": "国際送料（概算）", "預估合計": "合計（概算）", "下一步": "次へ", "上一步": "戻る", "確認並送出訂單": "注文を送信",
      "會員中心": "マイページ", "申請會員": "会員登録", "會員登入": "ログイン", "姓名": "氏名", "密碼": "パスワード", "訂單": "注文", "收藏": "お気に入り", "最近瀏覽": "閲覧履歴", "折價券": "クーポン", "地址簿": "住所録", "售後申請": "お問い合わせ", "登出": "ログアウト",
      "我的折價券": "マイクーポン", "訂單與購物明細": "注文履歴", "會員等級": "会員ランク", "累積消費": "累計購入額", "瑤光點數": "ポイント", "再次購買": "再購入",
      "代訂位、代訂票與特殊商品詢問": "予約・チケット・特別商品の依頼", "客人訂單查詢": "注文照会", "常見問題": "よくある質問", "儲存地址": "住所を保存", "送出售後申請": "送信", "隱私權與服務條款": "プライバシー・利用規約",
      "登入會員中心": "ログイン", "註冊會員": "会員登録", "忘記密碼": "パスワードを忘れた方", "建立會員帳號": "会員登録する", "返回登入": "ログインに戻る", "寄送驗證碼": "確認コードを送信", "設定新密碼": "新しいパスワード", "更新密碼": "パスワードを更新",
      "需求類型": "依頼種類", "聯絡方式": "連絡先", "店家或場所名稱": "店舗・会場名", "活動或商品名稱": "イベント・商品名", "網址": "URL", "日期": "日付", "時間": "時間", "人數": "人数", "數量": "数量", "預算 NT$": "予算 NT$", "需求內容（選填）": "詳細（任意）", "產生詢問內容": "依頼内容を作成", "直接送出詢問": "お問い合わせを直接送信", "詢問對話": "お問い合わせ対応", "更新詢問": "お問い合わせを更新",
      "寄送方式": "配送方法", "包裝後重量 g": "梱包後重量 g", "商品日幣金額": "商品金額（円）", "日本國內運費 日幣": "日本国内送料（円）", "額外需求預算 台幣": "追加希望予算（台湾ドル）", "產生運費報價": "送料を計算", "報表與稽核": "レポート・監査", "營運報表與系統稽核": "運営レポート・システム監査", "更新報表": "レポート更新", "檢查商品圖片與連結": "商品画像・リンクを確認", "近 14 日營業額": "直近14日間の売上", "每月營業額": "月間売上", "熱門商品": "人気商品", "商品品質": "商品品質", "Email 通知紀錄": "メール通知履歴", "後台操作紀錄": "管理操作履歴"
    }
  };
  Object.assign(translations.en, {
    "固定商品顯示價為：日本官網參考價 × 0.205，再依級距加上固定代購費。一般商品固定加價：~500円 +30元、501~1000円 +50元、1001~2000円 +80元、2001~3000円 +120元、3001~5000円 +180元、5001~10000円 +300元；10000円以上另行報價。": "Displayed prices use the official Japan price × 0.205 plus a fixed service charge: up to ¥500 +NT$30, ¥501–1,000 +NT$50, ¥1,001–2,000 +NT$80, ¥2,001–3,000 +NT$120, ¥3,001–5,000 +NT$180, ¥5,001–10,000 +NT$300; prices above ¥10,000 require a quote.",
    "代抽選/代搶成功依商品價格另外計算，失敗只收 NT$50/次。一般票券 +NT$200 起，熱門活動/演唱會 +NT$500 起。日本餐廳/活動代訂位固定服務費 NT$150/次，訂位失敗不收費。": "Successful lottery or limited-release orders are priced separately; unsuccessful attempts cost NT$50 each. Standard tickets start at +NT$200, popular events and concerts at +NT$500. Japan restaurant or activity reservations cost NT$150 per successful booking, with no fee if unsuccessful.",
    "不是。網站會依商品重量先用日本郵局 EMS 或小形包裝物航空試算，實際仍以包裝後重量與郵局收費為準。": "No. The site estimates EMS or Small Packet Air shipping from product weight; the final charge uses packed weight and Japan Post rates.",
    "EMS 國際快捷 以 500g 內級距試算。實際費用以包裝後重量與日本郵局收費為準。": "EMS Express estimate for up to 500g. Final shipping is based on packed weight and Japan Post rates.",
    "代抽選、代購票、代訂位怎麼算？": "How are lottery entries, tickets and reservations charged?",
    "不是。網站會依重量先用日本郵局 EMS 或小形包裝物航空試算，實際仍以包裝後重量與郵局收費為準。": "No. The site estimates EMS or Small Packet Air shipping by weight; the final charge uses packed weight and Japan Post rates.",
    "高單價、多件或特殊品項可能產生進口稅費，實際以海關判定為準。": "High-value, multiple or special items may incur import duties determined by customs.",
    "無法保證。票券、餐廳與活動名額會受平台規則、庫存、時間與店家回覆影響。": "No. Availability depends on platform rules, inventory, timing and the venue's response.",
    "尚未代下單前可討論取消；已付款、已代下單、已訂位或票券成立後，需依店家或平台規則處理。": "Cancellation can be discussed before purchase. After payment, purchase, reservation or ticket confirmation, the retailer's rules apply.",
    "違禁品、危險物品、航空禁運品、需要特殊許可的商品，會視情況婉拒接單。": "Prohibited, dangerous, air-restricted or specially licensed items may be declined.",
    "日本代購・代訂票・代訂位・網拍網購": "Japan proxy shopping, tickets, reservations & online orders",
    "像夜空裡替你指路的星，幫你把日本商品、訂位、票券與網購需求整理到能下單。": "Your guide to buying products, booking restaurants and ordering tickets from Japan.",
    "看商品分類": "Browse categories", "填代訂需求": "Submit a request", "分類選購": "Shop by category", "先選分類，再進入商品清單": "Choose a store to browse its products", "自動估價": "Instant estimate", "重量、國際運費、服務費一次算": "Estimate weight, international shipping and fees", "LINE 送出": "Send via LINE", "報價單編號與內容一鍵帶入": "Send the quote number and details in one step",
    "請先選擇分類，進去後會看到該分類裡可選購的商品。": "Choose a store from the left to browse available products.",
    "選擇需求類型後，表單會顯示適合欄位。客人可以填店家、網址、日期、時間、人數與預算。": "Choose a request type and enter the venue, URL, date, time, party size and budget.",
    "代訂位": "Reservation", "餐廳、咖啡廳、體驗活動，填店家、日期、時間與人數。": "Restaurants, cafes and activities. Enter the venue, date, time and party size.", "代訂票": "Ticket booking", "演唱會、展覽、交通票券、活動入場券。": "Concerts, exhibitions, transport and event tickets.", "特殊商品": "Special products", "網拍、網購、二手平台、指定網站商品代下單。": "Orders from marketplaces, second-hand platforms and specified websites.",
    "日本郵局運費與代購費試算": "Japan Post shipping estimate", "目前內建日本寄台灣的 EMS 與小形包裝物航空費率。實際出貨仍以日本郵局現場與包裝後重量為準。": "Estimates use Japan Post EMS and Small Packet Air rates to Taiwan. Final charges depend on packed weight.", "日本郵局國際運費": "Japan Post international shipping", "商品 + 日本國內運費": "Products + Japan domestic shipping", "代購服務費": "Proxy service fee", "預估總額": "Estimated total", "日本郵局 EMS 費率表": "Japan Post EMS rates", "日本郵局小形包裝物費率表": "Japan Post Small Packet rates",
    "輸入訂單編號即可查詢報價、付款、採購與寄送進度。": "Enter an order number to check quotation, payment, purchasing and delivery progress.", "查詢狀態": "Check status", "常見問題與注意事項": "FAQ and important information", "讓客人在詢問前先知道代購費、運費、關稅與取消規則。": "Review fees, shipping, customs and cancellation rules before ordering.",
    "商品價格怎麼算？": "How are product prices calculated?", "運費是固定的嗎？": "Is shipping fixed?", "會不會產生關稅？": "Will customs duties apply?", "代訂票或訂位一定成功嗎？": "Are ticket and reservation requests guaranteed?", "下單後可以取消嗎？": "Can I cancel after ordering?", "哪些商品不能代購？": "Which products cannot be purchased?",
    "確認商品規格、數量與預估運費後送出訂單。": "Review product options, quantities and estimated shipping before placing your order.", "聯絡資料": "Contact details", "金額確認": "Review total", "完成": "Complete", "清空購物車": "Clear cart", "購物車目前是空的": "Your cart is empty", "從商品分類挑選商品後，內容會保留在這裡。": "Products added from the catalog will be saved here.", "前往選購": "Start shopping", "套用": "Apply", "收件與付款資料": "Delivery and payment", "登入會員": "Sign in", "確認左側商品與數量後繼續。": "Review the products and quantities before continuing.",
    "管理自己的訂單明細、歷史紀錄與會員折價券。": "Manage order details, purchase history and member coupons.", "最後更新：2026 年 10 月 20 日": "Last updated: October 20, 2026", "代購服務": "Proxy shopping service", "價格與運費": "Prices and shipping", "取消、缺貨與退款": "Cancellation, out-of-stock items and refunds", "售後與商品異常": "After-sales and product issues", "禁運與限制商品": "Restricted products", "個人資料與會員": "Personal data and accounts", "網站分析": "Website analytics"
  });
  Object.assign(translations.en, {
    "商品價格、庫存及到貨時間依日本店家實際狀況為準。送出訂單後由客服確認最終金額，完成付款才視為正式委託。": "Product prices, stock and arrival times depend on the Japanese retailer. Customer service confirms the final amount after submission; the order becomes official after payment.",
    "商品依日幣價格、網站公告匯率及固定加價計算。結帳顯示的國際運費為估算，商品抵達日本倉並完成包裝後，將依實重與適用寄送方式計算；如有差額，會員中心會顯示補款金額，完成補款後安排寄送。": "Prices use the JPY price, the published exchange rate and fixed service charges. International shipping at checkout is an estimate and is recalculated from packed weight. Any balance appears in the member center and must be paid before dispatch.",
    "尚未向日本店家採購前可提出取消申請；已採購、限定、預購、客製或不可退換商品，原則上無法取消。結帳時可選擇缺貨退款、接受相近規格替代或先聯絡確認；退款將依原付款方式或雙方確認方式辦理。": "Cancellation may be requested before purchasing in Japan. Purchased, limited, pre-order, customized or non-returnable goods generally cannot be cancelled. Out-of-stock handling can be selected at checkout, and refunds follow the original or agreed payment method.",
    "收到商品後如有缺件、破損或品項錯誤，請保留完整包裝並於會員中心提交售後申請及照片。代購服務依日本店家原售後條件協助處理，跨境退換所產生的運費與限制將另行說明。": "For missing, damaged or incorrect items, keep all packaging and submit a support request with photos in the member center. Assistance follows the Japanese retailer's policy; cross-border return costs and restrictions are explained separately.",
    "醫藥品、保健食品、食品、液體、噴霧、酒精、電池及其他受航空或台灣輸入規範限制的商品，須經確認後才接受委託；海關查驗、稅費或依法退運之風險由客服依個案說明。": "Medicines, supplements, food, liquids, aerosols, alcohol, batteries and other regulated products require confirmation. Customs inspections, duties and legally required returns are handled case by case.",
    "姓名、Email、電話、地址與訂單資料僅用於登入、訂單、配送、客服與必要通知。本站不會出售個人資料；使用者可聯絡客服申請更正或刪除。": "Names, email addresses, phone numbers, addresses and order data are used only for accounts, orders, delivery, support and required notices. Personal data is not sold and may be corrected or deleted on request.",
    "姓名、Email、電話、地址與訂單資料僅用於會員登入、訂單、配送、客服與必要通知。本站不會出售個人資料；使用者可聯絡客服申請更正或刪除。": "Names, email addresses, phone numbers, addresses and order data are used only for member sign-in, orders, delivery, support and required notices. Personal data is not sold and may be corrected or deleted on request.",
    "Email：alkaidbuy@gmail.com｜Instagram：@alkaidbuy｜LINE 官方帳號：瑤光代購": "Email: alkaidbuy@gmail.com | Instagram: @alkaidbuy | Official LINE: 瑤光代購",
    "本站可能蒐集不含直接身分識別的瀏覽、裝置及來源資訊，用於改善商品搜尋與購物流程。": "The site may collect non-identifying browsing, device and referral data to improve search and checkout."
  });
  Object.assign(translations.ja, {
    "固定商品顯示價為：日本官網參考價 × 0.205，再依級距加上固定代購費。一般商品固定加價：~500円 +30元、501~1000円 +50元、1001~2000円 +80元、2001~3000円 +120元、3001~5000円 +180元、5001~10000円 +300元；10000円以上另行報價。": "表示価格は日本公式価格×0.205に所定手数料を加算します。500円以下 +NT$30、501～1,000円 +NT$50、1,001～2,000円 +NT$80、2,001～3,000円 +NT$120、3,001～5,000円 +NT$180、5,001～10,000円 +NT$300、10,000円超は個別見積です。",
    "代抽選/代搶成功依商品價格另外計算，失敗只收 NT$50/次。一般票券 +NT$200 起，熱門活動/演唱會 +NT$500 起。日本餐廳/活動代訂位固定服務費 NT$150/次，訂位失敗不收費。": "抽選・限定販売の成立時は商品価格に応じて別途計算し、不成立時は1回NT$50です。一般チケットは+NT$200から、人気イベント・コンサートは+NT$500から。日本の飲食店・体験予約は成立1件につきNT$150で、不成立時は無料です。",
    "不是。網站會依商品重量先用日本郵局 EMS 或小形包裝物航空試算，實際仍以包裝後重量與郵局收費為準。": "固定ではありません。商品重量からEMSまたは小形包装物（航空）で概算し、梱包後重量と日本郵便料金で確定します。",
    "EMS 國際快捷 以 500g 內級距試算。實際費用以包裝後重量與日本郵局收費為準。": "EMSは500g以内の料金で試算しています。実際の送料は梱包後重量と日本郵便料金で確定します。",
    "代抽選、代購票、代訂位怎麼算？": "抽選・チケット・予約代行の料金は？",
    "不是。網站會依重量先用日本郵局 EMS 或小形包裝物航空試算，實際仍以包裝後重量與郵局收費為準。": "固定ではありません。EMSまたは小形包装物（航空）で概算し、梱包後重量と日本郵便料金で確定します。",
    "高單價、多件或特殊品項可能產生進口稅費，實際以海關判定為準。": "高額品、複数商品、特殊商品には輸入税が発生する場合があり、税関の判断に従います。",
    "無法保證。票券、餐廳與活動名額會受平台規則、庫存、時間與店家回覆影響。": "保証できません。プラットフォーム規則、在庫、時間、店舗の回答によります。",
    "尚未代下單前可討論取消；已付款、已代下單、已訂位或票券成立後，需依店家或平台規則處理。": "購入前はキャンセルを相談できます。支払い・購入・予約・発券後は店舗またはプラットフォームの規則に従います。",
    "違禁品、危險物品、航空禁運品、需要特殊許可的商品，會視情況婉拒接單。": "禁止品、危険物、航空輸送禁止品、許可が必要な商品はお断りする場合があります。",
    "日本代購・代訂票・代訂位・網拍網購": "日本商品の購入代行・チケット・予約・通販",
    "像夜空裡替你指路的星，幫你把日本商品、訂位、票券與網購需求整理到能下單。": "日本の商品購入、飲食店予約、チケット、通販のお申し込みを分かりやすくサポートします。",
    "看商品分類": "商品カテゴリーを見る", "填代訂需求": "依頼フォームへ", "分類選購": "カテゴリーから選ぶ", "先選分類，再進入商品清單": "店舗を選んで商品一覧へ", "自動估價": "料金を自動計算", "重量、國際運費、服務費一次算": "重量・国際送料・手数料をまとめて計算", "LINE 送出": "LINEで送信", "報價單編號與內容一鍵帶入": "見積番号と内容をまとめて送信",
    "請先選擇分類，進去後會看到該分類裡可選購的商品。": "左側の店舗を選ぶと、購入可能な商品が表示されます。",
    "選擇需求類型後，表單會顯示適合欄位。客人可以填店家、網址、日期、時間、人數與預算。": "依頼種類を選び、店舗、URL、日付、時間、人数、予算を入力してください。",
    "代訂位": "予約代行", "餐廳、咖啡廳、體驗活動，填店家、日期、時間與人數。": "レストラン、カフェ、体験施設の店舗名・日付・時間・人数を入力してください。", "代訂票": "チケット購入代行", "演唱會、展覽、交通票券、活動入場券。": "コンサート、展示会、交通、イベントのチケット。", "特殊商品": "特別商品", "網拍、網購、二手平台、指定網站商品代下單。": "通販、フリマ、中古販売サイトなどの指定商品を代理注文します。",
    "日本郵局運費與代購費試算": "日本郵便の送料見積", "目前內建日本寄台灣的 EMS 與小形包裝物航空費率。實際出貨仍以日本郵局現場與包裝後重量為準。": "日本から台湾へのEMS・小形包装物（航空）の概算です。実際の送料は梱包後重量で確定します。", "日本郵局國際運費": "日本郵便の国際送料", "商品 + 日本國內運費": "商品代金＋日本国内送料", "代購服務費": "購入代行手数料", "預估總額": "概算合計", "日本郵局 EMS 費率表": "EMS料金表", "日本郵局小形包裝物費率表": "小形包装物料金表",
    "輸入訂單編號即可查詢報價、付款、採購與寄送進度。": "注文番号を入力すると、見積・支払い・購入・発送状況を確認できます。", "查詢狀態": "状況を確認", "常見問題與注意事項": "よくある質問と注意事項", "讓客人在詢問前先知道代購費、運費、關稅與取消規則。": "手数料、送料、関税、キャンセル規定をご確認ください。",
    "商品價格怎麼算？": "商品価格はどのように計算しますか？", "運費是固定的嗎？": "送料は固定ですか？", "會不會產生關稅？": "関税はかかりますか？", "代訂票或訂位一定成功嗎？": "チケット・予約は必ず成立しますか？", "下單後可以取消嗎？": "注文後にキャンセルできますか？", "哪些商品不能代購？": "購入代行できない商品は？",
    "確認商品規格、數量與預估運費後送出訂單。": "商品仕様、数量、概算送料を確認して注文してください。", "聯絡資料": "連絡先", "金額確認": "金額確認", "完成": "完了", "清空購物車": "カートを空にする", "購物車目前是空的": "カートは空です", "從商品分類挑選商品後，內容會保留在這裡。": "商品一覧から追加した商品がここに保存されます。", "前往選購": "商品を見る", "套用": "適用", "收件與付款資料": "配送先・支払い情報", "登入會員": "ログイン", "確認左側商品與數量後繼續。": "商品と数量を確認して次へ進んでください。",
    "管理自己的訂單明細、歷史紀錄與會員折價券。": "注文内容、購入履歴、会員クーポンを管理できます。", "最後更新：2026 年 10 月 20 日": "最終更新：2026年10月20日", "代購服務": "購入代行サービス", "價格與運費": "価格と送料", "取消、缺貨與退款": "キャンセル・欠品・返金", "售後與商品異常": "アフターサービス・商品不良", "禁運與限制商品": "配送制限商品", "個人資料與會員": "個人情報と会員", "網站分析": "アクセス解析"
  });
  Object.assign(translations.ja, {
    "商品價格、庫存及到貨時間依日本店家實際狀況為準。送出訂單後由客服確認最終金額，完成付款才視為正式委託。": "商品価格、在庫、入荷時期は日本の販売店の状況によります。送信後に最終金額をご案内し、入金完了後に正式なご依頼となります。",
    "商品依日幣價格、網站公告匯率及固定加價計算。結帳顯示的國際運費為估算，商品抵達日本倉並完成包裝後，將依實重與適用寄送方式計算；如有差額，會員中心會顯示補款金額，完成補款後安排寄送。": "商品代金は円価格、掲載為替レート、所定手数料で計算します。国際送料は概算で、梱包後の実重量により確定します。差額はマイページに表示され、精算後に発送します。",
    "尚未向日本店家採購前可提出取消申請；已採購、限定、預購、客製或不可退換商品，原則上無法取消。結帳時可選擇缺貨退款、接受相近規格替代或先聯絡確認；退款將依原付款方式或雙方確認方式辦理。": "日本での購入前はキャンセルを申請できます。購入済み、限定、予約、受注生産、返品不可の商品は原則キャンセルできません。欠品時の対応は注文時に選択でき、返金は元の決済方法または合意した方法で行います。",
    "收到商品後如有缺件、破損或品項錯誤，請保留完整包裝並於會員中心提交售後申請及照片。代購服務依日本店家原售後條件協助處理，跨境退換所產生的運費與限制將另行說明。": "不足、破損、誤配送がある場合は梱包を保管し、マイページから写真付きでお問い合わせください。日本の販売店規定に沿って対応し、国際返品の送料や制限は別途ご案内します。",
    "醫藥品、保健食品、食品、液體、噴霧、酒精、電池及其他受航空或台灣輸入規範限制的商品，須經確認後才接受委託；海關查驗、稅費或依法退運之風險由客服依個案說明。": "医薬品、サプリメント、食品、液体、スプレー、アルコール、電池などの規制品は事前確認が必要です。税関検査、税金、返送リスクは個別にご案内します。",
    "姓名、Email、電話、地址與訂單資料僅用於登入、訂單、配送、客服與必要通知。本站不會出售個人資料；使用者可聯絡客服申請更正或刪除。": "氏名、メール、電話、住所、注文情報はログイン、注文、配送、サポート、必要な通知にのみ使用します。個人情報は販売せず、訂正・削除を申請できます。",
    "姓名、Email、電話、地址與訂單資料僅用於會員登入、訂單、配送、客服與必要通知。本站不會出售個人資料；使用者可聯絡客服申請更正或刪除。": "氏名、メール、電話、住所、注文情報は会員ログイン、注文、配送、サポート、必要な通知にのみ使用します。個人情報は販売せず、訂正・削除を申請できます。",
    "Email：alkaidbuy@gmail.com｜Instagram：@alkaidbuy｜LINE 官方帳號：瑤光代購": "メール：alkaidbuy@gmail.com｜Instagram：@alkaidbuy｜LINE公式アカウント：瑤光代購",
    "本站可能蒐集不含直接身分識別的瀏覽、裝置及來源資訊，用於改善商品搜尋與購物流程。": "商品検索と購入手続きの改善のため、個人を直接特定しない閲覧・端末・参照元情報を収集する場合があります。"
  });
  Object.assign(translations.en, {
    "件商品": " products", "進入分類": "Browse store", "商品清單": "Product list", "依商品狀態": "By availability", "熱門：": "Popular:", "特殊商品代購": "Special product request", "網拍網購": "Online marketplace", "可傳給客服的內容": "Message for customer service",
    "藥妝、美妝、保養、眼藥水、保健食品與生活用品。": "Pharmacy, beauty, skincare, eye drops, supplements and daily essentials.", "文具、紙品、保養、香氛、零食與輕量生活用品。": "Stationery, paper goods, skincare, fragrance, snacks and lightweight household items.", "日本熱門文具、限定筆記本與輕量雜貨。": "Popular Japanese stationery, limited notebooks and lightweight goods.", "熱門3C、相機周邊、行動電源與生活小家電。": "Popular electronics, camera accessories, power banks and small appliances.", "廚房收納、生活雜貨、人氣便利小物。": "Kitchen storage, household goods and convenient daily items.", "日本 7-Eleven 餅乾、糖果、巧克力與零食。": "Japanese 7-Eleven cookies, candy, chocolate and snacks.", "LAWSON 原創零食、健康點心與便利商店限定商品。": "LAWSON original snacks, healthier treats and convenience-store exclusives.",
    "購物車與付款": "Cart & payment", "固定商品會自動加總重量並套用運費設定，送出後會產生報價單編號與 LINE 訊息。": "Product weights and shipping settings are calculated automatically. Submission creates a quote number and LINE message.", "自行填寫": "Enter manually", "銀行轉帳": "Bank transfer", "到店付款": "Pay in store", "宅配": "Home delivery", "超商取貨": "Convenience-store pickup", "面交": "In-person pickup", "小形包裝物 航空": "Small Packet Air", "缺貨商品取消並退款": "Cancel and refund unavailable items", "接受同款相近規格替代": "Accept a similar variant", "請先聯絡我再決定": "Contact me before deciding", "訂單送出結果": "Order submission result", "複製內容": "Copy details", "寄 Email 通知": "Send email notification", "用 LINE 聯絡": "Contact via LINE",
    "輸入註冊 Email，我們會寄出 6 位數驗證碼。": "Enter your registered email to receive a six-digit verification code.", "會員您好": "Welcome", "登入只保留在目前瀏覽器；共用裝置使用完畢請按登出。": "Your session is stored only in this browser. Sign out after using a shared device.", "前往購物車": "Go to cart", "我的收藏與通知": "My favorites & alerts", "取消、退款與售後": "Cancellation, refunds & support", "取消訂單": "Cancel order", "缺貨退款": "Out-of-stock refund", "退換貨詢問": "Return or exchange", "商品異常": "Product issue", "其他": "Other",
    "可代購": "Available", "需確認寄送": "Shipping confirmation required", "需確認輸入": "Import eligibility confirmation required", "需查庫存": "Check stock", "需另報價": "Quote required", "需詢價": "Quote required", "預購": "Pre-order", "售完": "Sold out", "另行報價": "Request a quote", "標準款": "Standard", "未分類": "Uncategorized", "有貨通知": "Restock alert", "降價通知": "Price-drop alert", "目前沒有商品紀錄。": "No product history yet.",
    "松本清": "Matsumoto Kiyoshi", "無印良品": "MUJI", "友都八喜": "Yodobashi Camera", "7-11 餅乾糖果": "7-Eleven snacks", "眼藥水": "Eye drops", "面膜": "Face masks", "無印零食": "MUJI snacks", "化妝棉": "Cotton pads", "化妝水": "Toner", "護唇膏": "Lip balm", "洗面乳": "Facial cleanser", "睫毛膏": "Mascara", "防曬乳": "Sunscreen", "零食": "Snacks", "餅乾": "Cookies", "糖果": "Candy", "鹽味": "Salt flavor", "梅味": "Plum flavor", "起司": "Cheese", "黑胡椒": "Black pepper", "草莓": "Strawberry", "巧克力": "Chocolate", "筆記本": "Notebook", "便條紙": "Sticky notes", "香氛": "Fragrance", "精油": "Essential oil", "口罩": "Face mask", "現貨": "In stock",
    "營運後台": "Operations admin", "回到商店": "Back to store", "瑤光代購營運後台": "Yaoguang operations admin", "訂單、商品、售後與採購彙總集中管理。": "Manage orders, products, support and purchasing in one place.", "管理密碼": "Admin password", "登入後台": "Sign in to admin", "營運總覽": "Operations overview", "重新整理": "Refresh", "訂單管理": "Order management", "商品管理": "Product management", "總採購清單": "Purchase summary", "總採購清單與分配": "Purchase summary & allocation", "營運中心": "Operations center", "售後案件": "Support cases", "系統工具": "System tools", "全部店家": "All stores", "新增商品": "Add product", "匯出 CSV": "Export CSV", "已買齊": "Purchased in full", "缺貨": "Out of stock", "部分到貨": "Partially received", "需確認": "Needs confirmation", "批次套用": "Apply to selected", "重新彙總": "Rebuild summary", "異常提醒": "Alerts", "退款、補款與毛利": "Refunds, balances & profit", "台灣出貨與揀貨單": "Taiwan shipping & packing list", "列印揀貨單": "Print packing list", "日本包裹管理": "Japan package management", "日本集貨中": "Consolidating in Japan", "已封箱": "Packed", "台灣清關中": "Taiwan customs clearance", "已抵台": "Arrived in Taiwan", "儲存包裹": "Save package", "現貨庫存": "Ready-stock inventory", "儲存現貨": "Save stock", "全站收費設定": "Sitewide pricing settings", "日幣匯率": "JPY exchange rate", "日本國內運費（日幣）": "Japan domestic shipping (JPY)", "預設國際寄送": "Default international shipping", "儲存並套用全站": "Save and apply sitewide", "系統工具與備份": "System tools & backups", "整理試算表格式": "Format spreadsheet", "啟用每日備份": "Enable daily backup", "立即備份": "Back up now", "查看備份": "View backups", "點擊「查看備份」載入備份紀錄。": "Select View backups to load backup history.", "商品名稱": "Product name", "店家": "Store", "細分類": "Subcategory", "日幣價格": "Price in JPY", "庫存": "Stock", "規格": "Variant", "圖片網址": "Image URL", "狀態": "Status", "說明": "Description", "儲存商品": "Save product", "關閉": "Close",
    "目前沒有售後案件。": "No support cases.", "目前沒有訂單。": "No orders.", "目前沒有可彙總的採購商品。": "No products to purchase.", "目前沒有異常提醒。": "No alerts.", "尚未建立日本包裹。": "No Japan packages yet.", "目前沒有現貨庫存。": "No ready stock.", "目前沒有備份。": "No backups.", "備份紀錄載入中...": "Loading backup history...", "處理中...": "Processing...", "資料載入中...": "Loading data..."
  });
  Object.assign(translations.en, {
    "EMS 國際快捷": "EMS Express", "詢問": "Request", "申請": "Request", "已寄出": "Shipped", "已完成": "Completed", "已取消": "Cancelled", "待確認": "Pending confirmation", "已報價": "Quoted", "待付款": "Awaiting payment", "已付款": "Paid", "日本採購中": "Purchasing in Japan", "採購中": "Purchasing", "已到日本倉": "Arrived at Japan warehouse", "已到倉": "At warehouse", "未付款": "Unpaid", "待補款": "Balance due", "已退款": "Refunded", "一般會員": "Member", "常客": "Regular", "無期限": "No expiry",
    "日本官網價格": "Official Japan price", "依官網": "See official site", "代購單價": "Unit price", "預估重量": "Estimated weight", "規格／容量": "Variant / volume", "寄送狀態": "Shipping status", "價格計算": "Price calculation", "日幣 × 0.205 ＋ 固定加價": "JPY × 0.205 + fixed service charge", "選擇規格": "Choose variant", "藥品、液體、電池或航空限制商品會於接單後再次確認寄送方式。": "Shipping will be reconfirmed after ordering for medicines, liquids, batteries and air-restricted items.", "沒有符合的搜尋建議": "No matching suggestions", "這個分類目前沒有符合條件的商品。": "No products match these filters.", "已顯示": "Showing", "庫存需確認": "Stock confirmation required", "含代購費": "Service charge included", "官網": "Official", "更新": "Updated", "已售完": "Sold out", "需另詢": "Contact us", "規格：": "Variant: ", "單價": "Unit price", "數量": "Quantity", "小計": "Subtotal", "減少數量": "Decrease quantity", "增加數量": "Increase quantity", "刪除": "Delete", "查看": "View", "編輯": "Edit",
    "目前沒有可使用的會員折價券。": "No member coupons available.", "最後更新：": "Last updated: ", "物流單號：": "Tracking number: ", "包裝後實重：": "Packed weight: ", "實際國際運費：": "Actual international shipping: ", "付款狀態：": "Payment status: ", "待補款：": "Balance due: ", "查看購物明細": "View order items", "這筆詢問沒有固定商品明細。": "This request has no catalog items.", "店家備註：": "Store note: ", "目前還沒有會員訂單。": "No member orders yet.", "尚未建立常用地址。": "No saved addresses.", "正在載入會員資料...": "Loading member profile...", "登入已失效：": "Session expired: ", "正在建立會員帳號...": "Creating account...", "登入中...": "Signing in...", "正在寄送驗證碼...": "Sending verification code...", "正在更新密碼...": "Updating password...", "密碼已更新，請使用新密碼登入。": "Password updated. Sign in with your new password.", "已登出會員中心。": "Signed out.", "送出中...": "Submitting...",
    "找不到可使用的折價券。": "Coupon not found.", "此折價券已過期。": "This coupon has expired.", "購物車內容有變動": "Your cart has changed", "購物車已清空。": "Cart cleared.", "購物車目前是空的，請先加入商品。": "Your cart is empty. Add a product first.", "確定要清空購物車嗎？": "Clear the cart?", "訂單送出中...": "Submitting order...", "已複製": "Copied", "已複製，前往 LINE": "Copied. Open LINE", "預估應付": "Estimated amount due"
  });
  Object.assign(translations.ja, {
    "件商品": "点", "進入分類": "店舗を見る", "商品清單": "商品一覧", "依商品狀態": "販売状況", "熱門：": "人気検索：", "特殊商品代購": "特別商品の購入代行", "網拍網購": "通販・フリマ", "可傳給客服的內容": "カスタマーサービスへのメッセージ",
    "藥妝、美妝、保養、眼藥水、保健食品與生活用品。": "ドラッグストア商品、コスメ、スキンケア、目薬、サプリ、日用品。", "文具、紙品、保養、香氛、零食與輕量生活用品。": "文具、紙製品、スキンケア、香り、お菓子、軽量生活用品。", "日本熱門文具、限定筆記本與輕量雜貨。": "人気文具、限定ノート、軽量雑貨。", "熱門3C、相機周邊、行動電源與生活小家電。": "人気家電、カメラ用品、モバイルバッテリー、小型家電。", "廚房收納、生活雜貨、人氣便利小物。": "キッチン収納、生活雑貨、便利グッズ。", "日本 7-Eleven 餅乾、糖果、巧克力與零食。": "日本のセブン‐イレブンのクッキー、キャンディ、チョコ、お菓子。", "LAWSON 原創零食、健康點心與便利商店限定商品。": "ローソンオリジナルのお菓子、ヘルシースナック、コンビニ限定商品。",
    "購物車與付款": "カート・お支払い", "固定商品會自動加總重量並套用運費設定，送出後會產生報價單編號與 LINE 訊息。": "商品重量と送料設定を自動計算し、送信後に見積番号とLINEメッセージを作成します。", "自行填寫": "手動入力", "銀行轉帳": "銀行振込", "到店付款": "店頭支払い", "宅配": "宅配", "超商取貨": "コンビニ受取", "面交": "手渡し", "小形包裝物 航空": "小形包装物（航空）", "缺貨商品取消並退款": "欠品商品をキャンセル・返金", "接受同款相近規格替代": "同商品の近い仕様で代替", "請先聯絡我再決定": "事前に連絡して確認", "訂單送出結果": "注文送信結果", "複製內容": "内容をコピー", "寄 Email 通知": "メール通知を送信", "用 LINE 聯絡": "LINEで連絡",
    "輸入註冊 Email，我們會寄出 6 位數驗證碼。": "登録メールアドレスを入力すると、6桁の確認コードを送信します。", "會員您好": "会員ページ", "登入只保留在目前瀏覽器；共用裝置使用完畢請按登出。": "ログイン情報はこのブラウザにのみ保存されます。共有端末では利用後にログアウトしてください。", "前往購物車": "カートへ", "我的收藏與通知": "お気に入り・通知", "取消、退款與售後": "キャンセル・返金・お問い合わせ", "取消訂單": "注文キャンセル", "缺貨退款": "欠品返金", "退換貨詢問": "返品・交換", "商品異常": "商品不良", "其他": "その他",
    "可代購": "購入可能", "需確認寄送": "配送確認が必要", "需確認輸入": "輸入可否の確認が必要", "需查庫存": "在庫確認", "需另報價": "個別見積", "需詢價": "個別見積", "預購": "予約商品", "售完": "売り切れ", "另行報價": "要見積", "標準款": "標準", "未分類": "未分類", "有貨通知": "入荷通知", "降價通知": "値下げ通知", "目前沒有商品紀錄。": "商品履歴はありません。",
    "松本清": "マツモトキヨシ", "無印良品": "無印良品", "友都八喜": "ヨドバシカメラ", "7-11 餅乾糖果": "セブン‐イレブン菓子", "眼藥水": "目薬", "面膜": "フェイスマスク", "無印零食": "無印良品のお菓子", "化妝棉": "コットン", "化妝水": "化粧水", "護唇膏": "リップクリーム", "洗面乳": "洗顔料", "睫毛膏": "マスカラ", "防曬乳": "日焼け止め", "零食": "お菓子", "餅乾": "クッキー", "糖果": "キャンディ", "鹽味": "塩味", "梅味": "梅味", "起司": "チーズ", "黑胡椒": "黒こしょう", "草莓": "いちご", "巧克力": "チョコレート", "筆記本": "ノート", "便條紙": "付箋", "香氛": "フレグランス", "精油": "エッセンシャルオイル", "口罩": "マスク", "現貨": "在庫あり",
    "營運後台": "運営管理", "回到商店": "ショップに戻る", "瑤光代購營運後台": "瑤光代購 運営管理", "訂單、商品、售後與採購彙總集中管理。": "注文、商品、サポート、仕入れを一元管理します。", "管理密碼": "管理パスワード", "登入後台": "管理画面にログイン", "營運總覽": "運営概要", "重新整理": "更新", "訂單管理": "注文管理", "商品管理": "商品管理", "總採購清單": "仕入一覧", "總採購清單與分配": "仕入一覧・割当", "營運中心": "運営センター", "售後案件": "サポート案件", "系統工具": "システムツール", "全部店家": "全店舗", "新增商品": "商品追加", "匯出 CSV": "CSV出力", "已買齊": "購入完了", "缺貨": "欠品", "部分到貨": "一部入荷", "需確認": "要確認", "批次套用": "一括適用", "重新彙總": "再集計", "異常提醒": "アラート", "退款、補款與毛利": "返金・追加請求・利益", "台灣出貨與揀貨單": "台湾発送・ピッキングリスト", "列印揀貨單": "リスト印刷", "日本包裹管理": "日本側荷物管理", "日本集貨中": "日本で集荷中", "已封箱": "梱包済み", "台灣清關中": "台湾通関中", "已抵台": "台湾到着", "儲存包裹": "荷物を保存", "現貨庫存": "即納在庫", "儲存現貨": "在庫を保存", "全站收費設定": "サイト料金設定", "日幣匯率": "円レート", "日本國內運費（日幣）": "日本国内送料（円）", "預設國際寄送": "標準国際配送", "儲存並套用全站": "保存して全体に適用", "系統工具與備份": "システムツール・バックアップ", "整理試算表格式": "スプレッドシート整形", "啟用每日備份": "毎日バックアップを有効化", "立即備份": "今すぐバックアップ", "查看備份": "バックアップを見る", "點擊「查看備份」載入備份紀錄。": "「バックアップを見る」で履歴を読み込みます。", "商品名稱": "商品名", "店家": "店舗", "細分類": "サブカテゴリー", "日幣價格": "価格（円）", "庫存": "在庫", "規格": "仕様", "圖片網址": "画像URL", "狀態": "状態", "說明": "説明", "儲存商品": "商品を保存", "關閉": "閉じる",
    "目前沒有售後案件。": "サポート案件はありません。", "目前沒有訂單。": "注文はありません。", "目前沒有可彙總的採購商品。": "仕入対象商品はありません。", "目前沒有異常提醒。": "アラートはありません。", "尚未建立日本包裹。": "日本側荷物は未登録です。", "目前沒有現貨庫存。": "即納在庫はありません。", "目前沒有備份。": "バックアップはありません。", "備份紀錄載入中...": "バックアップ履歴を読み込み中...", "處理中...": "処理中...", "資料載入中...": "読み込み中..."
  });
  Object.assign(translations.ja, {
    "EMS 國際快捷": "EMS国際スピード郵便", "詢問": "依頼", "申請": "申請", "已寄出": "発送済み", "已完成": "完了", "已取消": "キャンセル済み", "待確認": "確認待ち", "已報價": "見積済み", "待付款": "支払い待ち", "已付款": "支払い済み", "日本採購中": "日本で購入中", "採購中": "購入中", "已到日本倉": "日本倉庫到着", "已到倉": "倉庫到着", "未付款": "未払い", "待補款": "追加支払い待ち", "已退款": "返金済み", "一般會員": "一般会員", "常客": "常連会員", "無期限": "期限なし",
    "日本官網價格": "日本公式価格", "依官網": "公式サイト参照", "代購單價": "購入代行単価", "預估重量": "概算重量", "規格／容量": "仕様・容量", "寄送狀態": "配送可否", "價格計算": "価格計算", "日幣 × 0.205 ＋ 固定加價": "円価格×0.205＋所定手数料", "選擇規格": "仕様を選択", "藥品、液體、電池或航空限制商品會於接單後再次確認寄送方式。": "医薬品、液体、電池、航空規制品はご注文後に配送方法を再確認します。", "沒有符合的搜尋建議": "一致する候補はありません", "這個分類目前沒有符合條件的商品。": "条件に一致する商品はありません。", "已顯示": "表示中", "庫存需確認": "在庫確認が必要", "含代購費": "代行手数料込", "官網": "公式", "更新": "更新", "已售完": "売り切れ", "需另詢": "要問い合わせ", "規格：": "仕様：", "單價": "単価", "數量": "数量", "小計": "小計", "減少數量": "数量を減らす", "增加數量": "数量を増やす", "刪除": "削除", "查看": "表示", "編輯": "編集",
    "目前沒有可使用的會員折價券。": "利用できる会員クーポンはありません。", "最後更新：": "最終更新：", "物流單號：": "追跡番号：", "包裝後實重：": "梱包後重量：", "實際國際運費：": "国際送料：", "付款狀態：": "支払い状況：", "待補款：": "追加支払い：", "查看購物明細": "購入明細を見る", "這筆詢問沒有固定商品明細。": "この依頼にカタログ商品はありません。", "店家備註：": "店舗メモ：", "目前還沒有會員訂單。": "会員注文はまだありません。", "尚未建立常用地址。": "保存済み住所はありません。", "正在載入會員資料...": "会員情報を読み込み中...", "登入已失效：": "ログイン期限切れ：", "正在建立會員帳號...": "会員登録中...", "登入中...": "ログイン中...", "正在寄送驗證碼...": "確認コードを送信中...", "正在更新密碼...": "パスワード更新中...", "密碼已更新，請使用新密碼登入。": "パスワードを更新しました。新しいパスワードでログインしてください。", "已登出會員中心。": "ログアウトしました。", "送出中...": "送信中...",
    "找不到可使用的折價券。": "利用できるクーポンが見つかりません。", "此折價券已過期。": "このクーポンは期限切れです。", "購物車內容有變動": "カート内容が変更されています", "購物車已清空。": "カートを空にしました。", "購物車目前是空的，請先加入商品。": "カートは空です。商品を追加してください。", "確定要清空購物車嗎？": "カートを空にしますか？", "訂單送出中...": "注文を送信中...", "已複製": "コピーしました", "已複製，前往 LINE": "コピーしました。LINEを開く", "預估應付": "お支払い概算"
  });
  const simplifiedMap = { "購":"购","單":"单","訂":"订","員":"员","與":"与","車":"车","價":"价","優":"优","惠":"惠","運":"运","費":"费","點":"点","歷":"历","錄":"录","發":"发","後":"后","臺":"台","體":"体","號":"号","詢":"询","貨":"货","應":"应","選":"选","顯":"显","儲":"储","賣":"卖","買":"买","總":"总","額":"额","聯":"联","絡":"络","務":"务","網":"网","據":"据","稱":"称","庫":"库","盡":"尽","覽":"览","權":"权","條":"条","關":"关","閉":"闭","無":"无","開":"开","碼":"码","驗":"验","證":"证","輸":"输","預":"预","間":"间","數":"数","種":"种","類":"类","細":"细","篩":"筛","圖":"图","內":"内","國":"国","際":"际","匯":"汇","頁":"页","現":"现","狀":"状","態":"态","別":"别","註":"注","冊":"册","設":"设","從":"从","這":"这","來":"来","處":"处","萬":"万","區":"区","門":"门","電":"电","話":"话","備":"备","確":"确","認":"认","滿":"满","減":"减","張":"张","將":"将","僅":"仅","啟":"启","異":"异","寫":"写","連":"连","線":"线","離":"离","刪":"删","檔":"档","藥":"药","妝":"妆","產":"产","業":"业","專":"专","屬":"属","華":"华","灣":"湾","戶":"户","為":"为","學":"学","術":"术","壓":"压","縮":"缩","紙":"纸","純":"纯","雙":"双","膠":"胶","膚":"肤","濕":"湿","護":"护","潔":"洁","劑":"剂","劃":"划","墊":"垫","墜":"坠","險":"险","隱":"隐","私":"私","項":"项","實":"实","際":"际","暫":"暂","啟":"启","佈":"布","達":"达","過":"过","還":"还","並":"并","時":"时","動":"动","資":"资","訊":"讯","況":"况","擇":"择","標":"标","題":"题","複":"复","製":"制","傳":"传","統":"统","計":"计","營":"营","帳":"账","戶":"户","歸":"归","檢":"检","測":"测","誤":"误","讀":"读","載":"载","權":"权","與":"与","後":"后","裡":"里","讓":"让","給":"给","個":"个","筆":"笔","該":"该","則":"则","暢":"畅","據":"据","軟":"软","邊":"边","側":"侧","寬":"宽","緩":"缓","彙":"汇","攬":"揽","攜":"携","帶":"带","擴":"扩","充":"充","對":"对","導":"导","寫":"写","據":"据","參":"参","發布":"发布" };
  const traditionalChars = "並乾佈併來倉個們側傘備傳傾僅價優儲內冊凍別刪則剛剝創劃劑動務勢匯區協參員問啟單嗎噴國圓圖堅報場塊墊墜壓夾妝學宮實寫寬將專尋對導屬岡島帳帶幣幫庫廚廳張強彙後從復愛態憑應懶戶捲掛採揀揚換損搶擇擊據擴攜攬敗數於時暢暫曬書會東査條業極榮樓標樹機橫檔檢欄權歷歸氣決沒沖況減測湊湯準溫滿潔潤濃濕瀏瀨灣災為無煉煙熱營狀現瑤產産畢畫異癒發盡確碼稅種稱積窯筆箇箋節範篩簡紀約紅納紐純紙級細終組結絕絡給統絶經綠維網綿線編緩緻縮總繩繼續纖翹聯腦膚膠臉臺與興舖華萬葉蒐蓋蔥薩藍藥處號蝦術衛裏補裝裡製複見規視親覺覽觸訂計訊討託記設許註証詢試詫話該詳認語誤說説調談請論謎證識議護讀變讓貓貝貨販買費貼資賣質購贅跡躍車軌軟較載輕輪輯輸轉辦農這連進遊運過達違適選還邊郵醫醬釣鈕鈣鈴鉛銀鋅鋰鋼錄錯録鍵鎂鏡鐘鐵長門閉開間閲關隊際隨險隱雙雜雞離雲電霧韓響頁項順須預頭頻題額顏顔類顯風飛飯飲飴飾餅養餡馬馴驗體鬆鬥魚鮮鳥鳴鵡鸚鹹鹽麵麼黃點齊龍";
  const simplifiedChars = "并干布并来仓个们侧伞备传倾仅价优储内册冻别删则刚剥创划剂动务势汇区协参员问启单吗喷国圆图坚报场块垫坠压夹妆学宫实写宽将专寻对导属冈岛帐带币帮库厨厅张强汇后从复爱态凭应懒户卷挂采拣扬换损抢择击据扩携揽败数于时畅暂晒书会东查条业极荣楼标树机横档检栏权历归气决没冲况减测凑汤准温满洁润浓湿浏濑湾灾为无炼烟热营状现瑶产产毕画异愈发尽确码税种称积窑笔个笺节范筛简纪约红纳纽纯纸级细终组结绝络给统绝经绿维网绵线编缓致缩总绳继续纤翘联脑肤胶脸台与兴铺华万叶搜盖葱萨蓝药处号虾术卫里补装里制复见规视亲觉览触订计讯讨托记设许注证询试诧话该详认语误说说调谈请论谜证识议护读变让猫贝货贩买费贴资卖质购赘迹跃车轨软较载轻轮辑输转办农这连进游运过达违适选还边邮医酱钓钮钙铃铅银锌锂钢录错录键镁镜钟铁长门闭开间阅关队际随险隐双杂鸡离云电雾韩响页项顺须预头频题额颜颜类显风飞饭饮饴饰饼养馅马驯验体松斗鱼鲜鸟鸣鹉鹦咸盐面么黄点齐龙";
  [...traditionalChars].forEach((character, index) => { simplifiedMap[character] = [...simplifiedChars][index]; });
  function simplify(value) {
    return [...value].map((char) => simplifiedMap[char] || char).join("")
      .replaceAll("结帐", "结账").replaceAll("帐户", "账户").replaceAll("帐号", "账号");
  }
  function translateValue(value, language) {
    const clean = value.trim();
    if (!clean) return value;
    if (language === "zh-TW") return value;
    if (language === "zh-CN") return value.replace(clean, simplify(clean));
    const dictionary = translations[language] || {};
    if (dictionary[clean]) return value.replace(clean, dictionary[clean]);
    let translated = clean;
    Object.keys(dictionary).sort((a, b) => b.length - a.length).forEach((source) => {
      if (source.length > 1 && translated.includes(source)) translated = translated.split(source).join(dictionary[source]);
    });
    return value.replace(clean, translated);
  }
  function applyLanguage(language) {
    document.documentElement.lang = language === "zh-CN" ? "zh-Hans" : language === "zh-TW" ? "zh-Hant" : language;
    document.__originalTitle = document.__originalTitle || document.title;
    document.title = translateValue(document.__originalTitle, language);
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.dataset.originalContent = description.dataset.originalContent || description.content;
      description.content = translateValue(description.dataset.originalContent, language);
    }
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
    document.querySelectorAll("[aria-label], [title]").forEach((element) => {
      ["aria-label", "title"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const key = `original${attribute.replace(/(^|-)([a-z])/g, (_, dash, letter) => letter.toUpperCase())}`;
        if (!element.dataset[key]) element.dataset[key] = element.getAttribute(attribute);
        element.setAttribute(attribute, translateValue(element.dataset[key], language));
      });
    });
    const languageSelect = document.querySelector("#siteLanguage");
    if (languageSelect) languageSelect.value = language;
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
  document.addEventListener("keydown", (event) => {
    const input = event.target.closest?.('input[type="number"]');
    if (input && ["e", "E", "+", "-"].includes(event.key)) event.preventDefault();
  });
  document.addEventListener("input", (event) => {
    const input = event.target.closest?.('input[type="number"]');
    if (!input || input.value === "") return;
    const allowsDecimal = String(input.step || "").includes(".");
    const sanitized = input.value.replace(allowsDecimal ? /[^0-9.]/g : /\D/g, "").replace(allowsDecimal ? /(\..*)\./g : /$^/, "$1");
    if (input.value !== sanitized) input.value = sanitized;
  });
  document.addEventListener("error", (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = "true";
    image.src = "assets/product-image-unavailable.svg";
    image.alt = image.alt ? `${image.alt}（圖片確認中）` : "商品圖片確認中";
  }, true);
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
