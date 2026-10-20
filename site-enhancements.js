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
  const simplifiedMap = { "購":"购","單":"单","訂":"订","員":"员","與":"与","車":"车","價":"价","優":"优","惠":"惠","運":"运","費":"费","點":"点","歷":"历","錄":"录","發":"发","後":"后","臺":"台","體":"体","號":"号","詢":"询","貨":"货","應":"应","選":"选","顯":"显","儲":"储","賣":"卖","買":"买","總":"总","額":"额","聯":"联","絡":"络","務":"务","網":"网","據":"据","稱":"称","庫":"库","盡":"尽","覽":"览","權":"权","條":"条","關":"关","閉":"闭","無":"无","開":"开","碼":"码","驗":"验","證":"证","輸":"输","預":"预","間":"间","數":"数","種":"种","類":"类","細":"细","篩":"筛","圖":"图","內":"内","國":"国","際":"际","匯":"汇","率":"率","頁":"页","現":"现","狀":"状","態":"态","別":"别","註":"注","冊":"册","忘":"忘","設":"设","從":"从","這":"这","來":"来","處":"处","萬":"万","區":"区","門":"门","電":"电","話":"话","備":"备","註":"注","確":"确","認":"认","滿":"满","減":"减","張":"张","將":"将","僅":"仅","啟":"启","異":"异","常":"常","寫":"写","連":"连","線":"线","離":"离","刪":"删","除":"除","檔":"档","案":"案" };
  function simplify(value) { return [...value].map((char) => simplifiedMap[char] || char).join(""); }
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
