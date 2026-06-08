const categories = [
  { id: "matsukiyo", label: "松本清", description: "已排除藥品、液體、噴霧與易燃品的乾燥衛生用品。", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80" },
  { id: "muji", label: "無印良品", description: "適合國際寄送的文具、紙品與輕量生活用品。", image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80" },
  { id: "loft", label: "LOFT", description: "日本熱門文具、限定筆記本與輕量雜貨。", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80" },
];

const defaultProducts = [
  { id: "matsukiyo-01", name: "matsukiyo 天然純棉化妝棉 248枚", category: "matsukiyo", price: 62, weight: 180, status: "可代購", description: "官網參考價 283円。乾燥棉製品，適合國際寄送。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4973560041287_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4973560041287" },
  { id: "matsukiyo-02", name: "matsukiyo 大尺寸純棉化妝棉 130枚", category: "matsukiyo", price: 72, weight: 180, status: "可代購", description: "官網參考價 327円。乾燥棉製品，適合國際寄送。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4973202205060_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4973202205060" },
  { id: "matsukiyo-03", name: "うるふか化妝棉 100枚", category: "matsukiyo", price: 72, weight: 150, status: "可代購", description: "官網參考價 327円。100% 純棉乾燥用品。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4973202301045_01_008016d565441e4c8deed5aee3222fcd.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4973202301045" },
  { id: "matsukiyo-04", name: "KOSE 壓縮面膜紙 14入", category: "matsukiyo", price: 97, weight: 80, status: "可代購", description: "官網參考價 440円。未含化妝水的乾燥面膜紙。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4971710189032_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4971710189032" },
  { id: "matsukiyo-05", name: "三次元口罩 小尺寸 30枚", category: "matsukiyo", price: 310, weight: 220, status: "可代購", description: "官網參考價 1,408円。非藥品、非液態衛生用品。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987067325801_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987067325801" },
  { id: "matsukiyo-06", name: "RETINOTIME 柔膚化妝棉 80枚", category: "matsukiyo", price: 73, weight: 120, status: "可代購", description: "官網參考價 330円。乾燥化妝棉，不含液體。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4955814146719_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4955814146719" },
  { id: "matsukiyo-07", name: "matsukiyo 立體白色口罩 M 30枚", category: "matsukiyo", price: 193, weight: 220, status: "可代購", description: "官網參考價 877円。非藥品、非液態衛生用品。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4580312896301_01_f82d04c9b0ae8d9be96122feb28a18ea.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4580312896301" },
  { id: "matsukiyo-08", name: "超快適 SMART COLOR 口罩 7枚", category: "matsukiyo", price: 116, weight: 80, status: "可代購", description: "官網參考價 525円。輕量立體口罩。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4903111512805_01_55096f1680f3e36f3b4135fb06de7271.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4903111512805" },
  { id: "matsukiyo-09", name: "KOSE Daily Premium 化妝棉", category: "matsukiyo", price: 87, weight: 160, status: "可代購", description: "官網參考價 396円。天然棉乾燥用品。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4971710258417_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4971710258417" },
  { id: "matsukiyo-10", name: "Beauty Works Daily 化妝棉 110枚", category: "matsukiyo", price: 62, weight: 150, status: "可代購", description: "官網參考價 283円。天然棉乾燥用品。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4973167204733_01_47d590058d55ab5505812d1ac4c471e7.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4973167204733" },
  { id: "matsukiyo-11", name: "CICIBELLA 立體雙色口罩 10枚", category: "matsukiyo", price: 120, weight: 90, status: "可代購", description: "官網參考價 547円。非藥品、非液態衛生用品。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4580771743697_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4580771743697" },

  { id: "muji-01", name: "無印良品 月計畫便利貼 13枚", category: "muji", price: 22, weight: 35, status: "需查庫存", description: "官網參考價 100円。紙製文具，價格與庫存以購買日為準。", image: "https://img.muji.net/img/item/4550182603149_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550182603149" },
  { id: "muji-02", name: "無印良品 A5 活頁筆記本本體", category: "muji", price: 64, weight: 170, status: "可代購", description: "官網參考價 290円。聚丙烯封面、20孔。", image: "https://img.muji.net/img/item/4550182913804_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550182913804" },
  { id: "muji-03", name: "無印良品 雙面刻度尺 15cm", category: "muji", price: 33, weight: 30, status: "可代購", description: "官網參考價 150円。輕量文具，適合合併寄送。", image: "https://img.muji.net/img/item/4547315916153_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4547315916153" },
  { id: "muji-04", name: "無印良品 A5 Wide 收藏活頁夾", category: "muji", price: 152, weight: 260, status: "可代購", description: "官網參考價 690円。20孔收藏活頁夾。", image: "https://img.muji.net/img/item/4550583766696_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550583766696" },
  { id: "muji-05", name: "無印良品 文庫本筆記本 144頁", category: "muji", price: 42, weight: 150, status: "可代購", description: "官網參考價 190円。紙製筆記本。", image: "https://img.muji.net/img/item/4550182111262_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550182111262" },
  { id: "muji-06", name: "無印良品 紫色中性筆替芯 0.38mm", category: "muji", price: 7, weight: 10, status: "可代購", description: "官網參考價 30円。輕量文具，適合合併寄送。", image: "https://img.muji.net/img/item/4550002814373_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550002814373" },
  { id: "muji-07", name: "無印良品 PP 橫式筆盒 小", category: "muji", price: 18, weight: 80, status: "可代購", description: "官網參考價 80円。簡約輕量筆盒。", image: "https://img.muji.net/img/item/4550584554582_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550584554582" },
  { id: "muji-08", name: "無印良品 塑膠橡皮擦", category: "muji", price: 11, weight: 30, status: "可代購", description: "官網參考價 50円起。款式依官網庫存。", image: "https://img.muji.net/img/item/4945247421323_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4945247421323" },
  { id: "muji-09", name: "無印良品 按壓式中性筆 0.5mm 黑", category: "muji", price: 26, weight: 20, status: "可代購", description: "官網參考價 120円。輕量文具。", image: "https://img.muji.net/img/item/4550002794118_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550002794118" },
  { id: "muji-10", name: "無印良品 PP 橫式筆盒", category: "muji", price: 33, weight: 100, status: "可代購", description: "官網參考價 150円。簡約輕量筆盒。", image: "https://img.muji.net/img/item/4550344907504_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550344907504" },
  { id: "muji-11", name: "無印良品 中性筆替芯 0.3mm", category: "muji", price: 7, weight: 10, status: "可代購", description: "官網參考價 30円。顏色依官網庫存選擇。", image: "https://img.muji.net/img/item/4550344872659_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550344872659" },
  { id: "muji-12", name: "無印良品 中性筆替芯 0.5mm 黑", category: "muji", price: 7, weight: 10, status: "可代購", description: "官網參考價 30円。輕量文具，適合合併寄送。", image: "https://img.muji.net/img/item/4550002822873_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550002822873" },
  { id: "muji-13", name: "無印良品 中性筆替芯 0.5mm 綠", category: "muji", price: 7, weight: 10, status: "可代購", description: "官網參考價 30円。輕量文具，適合合併寄送。", image: "https://img.muji.net/img/item/4550002822927_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550002822927" },
  { id: "muji-14", name: "無印良品 敏感肌用高保濕化妝水", category: "muji", subcategory: "化妝保養", yenPrice: 990, price: 990, weight: 360, spec: "300mL", variants: ["清爽型 300mL", "滋潤型 300mL", "高保濕 300mL"], status: "需確認寄送", description: "官網參考價 990円。液態化妝品，寄送方式與數量需確認。", image: "https://img.muji.net/img/item/4550583434991_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550583434991" },
  { id: "muji-15", name: "無印良品 舒適複方精油", category: "muji", subcategory: "香氛香薰", yenPrice: 1790, price: 1790, weight: 60, spec: "10mL", variants: ["舒適複方 10mL", "花香複方 10mL"], status: "需確認寄送", description: "官網參考價 1,790円。精油屬液態香氛，寄送前需確認航空規定。", image: "https://img.muji.net/img/item/4550344294901_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550344294901" },
  { id: "muji-16", name: "無印良品 佛手柑精油", category: "muji", subcategory: "香氛香薰", yenPrice: 1790, price: 1790, weight: 60, spec: "10mL", variants: ["10mL"], status: "需確認寄送", description: "官網參考價約 1,790円。精油屬液態香氛，寄送前需確認航空規定。", image: "https://img.muji.net/img/item/4550583991760_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550583991760" },
  { id: "muji-17", name: "無印良品 不揃抹茶年輪蛋糕", category: "muji", subcategory: "零食", yenPrice: 180, price: 180, weight: 120, spec: "1個", variants: ["抹茶", "紅茶", "香蕉", "巧克力"], status: "可代購", description: "官網參考價 180円。食品寄送仍以台灣輸入規定及數量為準。", image: "https://img.muji.net/img/item/4550723634410_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/cmdty/detail/4550723634410" },

  { id: "loft-01", name: "LOFT 動物造型便條紙 日本犬", category: "loft", price: 109, weight: 70, status: "可代購", description: "官網參考價約 495円。紙製文具。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539159-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539159/" },
  { id: "loft-02", name: "LOFT 動物造型便條紙 柯基", category: "loft", price: 109, weight: 70, status: "可代購", description: "官網參考價約 495円。紙製文具。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539166-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539166/" },
  { id: "loft-03", name: "LOFT 動物造型便條紙 法鬥", category: "loft", price: 109, weight: 70, status: "可代購", description: "官網參考價約 495円。紙製文具。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539173-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539173/" },
  { id: "loft-04", name: "LOFT 動物造型便條紙 吉娃娃", category: "loft", price: 109, weight: 70, status: "可代購", description: "官網參考價約 495円。紙製文具。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539180-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539180/" },
  { id: "loft-05", name: "LOFT 動物造型便條紙 比熊犬", category: "loft", price: 109, weight: 70, status: "可代購", description: "官網參考價約 495円。紙製文具。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539197-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539197/" },
  { id: "loft-06", name: "LOFT 動物造型便條紙 貓咪", category: "loft", price: 109, weight: 70, status: "可代購", description: "官網參考價約 495円。紙製文具。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539203-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539203/" },
  { id: "loft-07", name: "LOFT 動物造型便條紙 慵懶貓", category: "loft", price: 109, weight: 70, status: "可代購", description: "官網參考價約 495円。紙製文具。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539210-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539210/" },
  { id: "loft-08", name: "LOFT 動物造型便條紙 鸚鵡", category: "loft", price: 109, weight: 70, status: "可代購", description: "官網參考價約 495円。紙製文具。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539227-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539227/" },
  { id: "loft-09", name: "Rollbahn 口袋筆記本 M 紅色", category: "loft", price: 157, weight: 180, status: "可代購", description: "官網參考價約 715円。經典方格筆記本。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4516085050831-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4516085050831/" },
  { id: "loft-10", name: "Rollbahn 口袋筆記本 M 黃色", category: "loft", price: 157, weight: 180, status: "可代購", description: "官網參考價約 715円。經典方格筆記本。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4516085050855-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4516085050855/" },
  { id: "loft-11", name: "Rollbahn 口袋筆記本 M 深藍色", category: "loft", price: 157, weight: 180, status: "可代購", description: "官網參考價約 715円。經典方格筆記本。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4516085050862-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4516085050862/" },
  { id: "loft-12", name: "Rollbahn 口袋筆記本 M 奶油色", category: "loft", price: 157, weight: 180, status: "可代購", description: "官網參考價約 715円。經典方格筆記本。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4516085095399-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4516085095399/" },
];

const shippingRates = {
  ems: { label: "EMS 國際快捷", limit: 30000, rows: [[500,1450],[600,1600],[700,1750],[800,1900],[900,2050],[1000,2200],[1250,2500],[1500,2800],[1750,3100],[2000,3400],[2500,3900],[3000,4400],[3500,4900],[4000,5400],[4500,5900],[5000,6400],[5500,6900],[6000,7400],[7000,8200],[8000,9000],[9000,9800],[10000,10600],[11000,11400],[12000,12200],[13000,13000],[14000,13800],[15000,14600],[16000,15400],[17000,16200],[18000,17000],[19000,17800],[20000,18600],[21000,19400],[22000,20200],[23000,21000],[24000,21800],[25000,22600],[26000,23400],[27000,24200],[28000,25000],[29000,25800],[30000,26600]] },
  smallPacketAir: { label: "小形包裝物 航空", limit: 2000, rows: [[100,350],[200,450],[300,550],[400,650],[500,750],[600,850],[700,950],[800,1050],[900,1150],[1000,1250],[1100,1350],[1200,1450],[1300,1550],[1400,1650],[1500,1750],[1600,1850],[1700,1950],[1800,2050],[1900,2150],[2000,2250]] },
};

const productStorageKey = "yaoguang-products-v8";
const orderStorageKey = "yaoguang-orders";
const quoteSequenceKey = "yaoguang-quote-sequence";
const feeSettingsKey = "yaoguang-fee-settings";
const couponStorageKey = "yaoguang-coupons";
const adminAuthKey = "yaoguang-admin-auth";
const adminPassword = "tophet1003";
const lineOfficialUrl = "https://lin.ee/NxJLmwO";
const contactEmail = "alkaidbuy@gmail.com";

const fixedServiceTiers = [
  { max: 500, fee: 30 },
  { max: 1000, fee: 50 },
  { max: 2000, fee: 80 },
  { max: 3000, fee: 120 },
  { max: 5000, fee: 180 },
  { max: 10000, fee: 300 },
];
const fixedProductRate = 0.205;

const $ = (id) => document.querySelector(id);
const els = {
  categoryGrid: $("#categoryGrid"), categoryView: $("#categoryView"), categoryTitle: $("#categoryTitle"), backToCategories: $("#backToCategories"),
  productSearch: $("#productSearch"), productSubcategory: $("#productSubcategory"), productSort: $("#productSort"), productGrid: $("#productGrid"),
  cartItems: $("#cartItems"), cartWeight: $("#cartWeight"), cartSubtotal: $("#cartSubtotal"), cartDiscount: $("#cartDiscount"), cartShipping: $("#cartShipping"), cartTotal: $("#cartTotal"), couponCode: $("#couponCode"), applyCoupon: $("#applyCoupon"), couponMessage: $("#couponMessage"),
  summaryPanel: $("#summaryPanel"), summaryText: $("#summaryText"), summaryLineButton: $("#summaryLineButton"), emailNotifyButton: $("#emailNotifyButton"), copyButton: $("#copyButton"),
  specialForm: $("#specialForm"), specialType: $("#specialType"), checkoutForm: $("#checkoutForm"), shippingForm: $("#shippingForm"),
  shippingMethod: $("#shippingMethod"), shippingWeight: $("#shippingWeight"), itemYen: $("#itemYen"), yenRate: $("#yenRate"), domesticYen: $("#domesticYen"), servicePercent: $("#servicePercent"), minimumFee: $("#minimumFee"), extraFee: $("#extraFee"),
  shippingYen: $("#shippingYen"), itemTwd: $("#itemTwd"), serviceFeeTwd: $("#serviceFeeTwd"), estimateTotal: $("#estimateTotal"), shippingNote: $("#shippingNote"),
  adminForm: $("#adminForm"), editingProductId: $("#editingProductId"), saveProductButton: $("#saveProductButton"), cancelEditProduct: $("#cancelEditProduct"), resetProducts: $("#resetProducts"),
  adminName: $("#adminName"), adminCategory: $("#adminCategory"), adminSubcategory: $("#adminSubcategory"), adminPrice: $("#adminPrice"), adminWeight: $("#adminWeight"), adminSpec: $("#adminSpec"), adminVariants: $("#adminVariants"), adminStatus: $("#adminStatus"), adminImage: $("#adminImage"), adminDescription: $("#adminDescription"), adminProductList: $("#adminProductList"),
  couponForm: $("#couponForm"), adminCouponCode: $("#adminCouponCode"), adminCouponType: $("#adminCouponType"), adminCouponValue: $("#adminCouponValue"), adminCouponMinimum: $("#adminCouponMinimum"), adminCouponExpiry: $("#adminCouponExpiry"), adminCouponActive: $("#adminCouponActive"), couponAdminList: $("#couponAdminList"),
  settingsForm: $("#settingsForm"), settingShippingMethod: $("#settingShippingMethod"), settingYenRate: $("#settingYenRate"), settingServicePercent: $("#settingServicePercent"), settingMinimumFee: $("#settingMinimumFee"), settingExtraFee: $("#settingExtraFee"), settingNotifyEmail: $("#settingNotifyEmail"), settingSheetUrl: $("#settingSheetUrl"),
  orderList: $("#orderList"), exportOrders: $("#exportOrders"), clearOrders: $("#clearOrders"),
  adminLoginForm: $("#adminLoginForm"), adminPassword: $("#adminPassword"), adminLoginMessage: $("#adminLoginMessage"), adminSection: $("#admin"), adminLogout: $("#adminLogout"),
  lookupForm: $("#lookupForm"), lookupQuoteId: $("#lookupQuoteId"), lookupResult: $("#lookupResult"),
};

let products = load(productStorageKey, defaultProducts);
let orders = load(orderStorageKey, []);
let coupons = load(couponStorageKey, []);
let cart = [];
let activeCategory = null;
let activeCoupon = null;

function load(key, fallback) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
  return `NT$${Math.round(value).toLocaleString("zh-TW")}`;
}

function yen(value) {
  return `¥${Math.round(value).toLocaleString("ja-JP")}`;
}

function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label || "商品";
}

function lineUrl(message) {
  return `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
}

function emailUrl(message) {
  const settings = load(feeSettingsKey, { notifyEmail: contactEmail });
  const email = settings.notifyEmail || contactEmail;
  const subject = message.split("\n")[0] || "瑤光代購通知";
  if (!email) return "#admin-login";
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

function quoteId() {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const seq = Number(localStorage.getItem(quoteSequenceKey) || "0") + 1;
  localStorage.setItem(quoteSequenceKey, String(seq));
  return `YG-${date}-${String(seq).padStart(3, "0")}`;
}

function feeSettings() {
  return {
    method: els.shippingMethod.value,
    rate: Number(els.yenRate.value) || 0,
    percent: Number(els.servicePercent.value) || 0,
    minFee: Number(els.minimumFee.value) || 0,
    extra: Number(els.extraFee.value) || 0,
    notifyEmail: els.settingNotifyEmail.value || "",
    sheetUrl: els.settingSheetUrl.value || "",
  };
}

function applyFeeSettings(settings) {
  els.shippingMethod.value = settings.method;
  els.yenRate.value = settings.rate;
  els.servicePercent.value = settings.percent;
  els.minimumFee.value = settings.minFee;
  els.extraFee.value = settings.extra;
  els.settingShippingMethod.value = settings.method;
  els.settingYenRate.value = settings.rate;
  els.settingServicePercent.value = settings.percent;
  els.settingMinimumFee.value = settings.minFee;
  els.settingExtraFee.value = settings.extra;
  els.settingNotifyEmail.value = settings.notifyEmail || contactEmail;
  els.settingSheetUrl.value = settings.sheetUrl || "";
}

function fixedServiceFeeByYen(yenAmount) {
  const tier = fixedServiceTiers.find((item) => yenAmount <= item.max);
  return tier ? tier.fee : null;
}

function productSubcategory(product) {
  if (product.subcategory) return product.subcategory;
  const text = `${product.name} ${product.description}`;
  if (product.category === "matsukiyo") {
    if (/口罩/.test(text)) return "口罩衛生";
    if (/化妝棉|面膜紙/.test(text)) return "美容工具";
    return "藥妝美妝";
  }
  if (product.category === "muji") {
    if (/筆|尺|橡皮擦|筆盒|筆記本|活頁|便利貼/.test(text)) return "文具";
    if (/香|精油|擴香/.test(text)) return "香氛香薰";
    if (/餅|糖|零食|蛋糕|巧克力/.test(text)) return "零食";
    return "化妝保養";
  }
  if (/Rollbahn|筆記本/.test(text)) return "筆記本";
  return "便條紙";
}

function productSpec(product) {
  if (product.spec) return product.spec;
  const match = product.name.match(/(\d+(?:\.\d+)?\s?(?:mL|ml|g|枚|入|mm|cm)|\b[MSL]\b)/i);
  return match ? match[1] : "標準款";
}

function productVariants(product) {
  if (Array.isArray(product.variants)) return product.variants;
  if (typeof product.variants === "string") return product.variants.split("|").filter(Boolean);
  return [productSpec(product)];
}

function couponDiscount(subtotal) {
  if (!activeCoupon || !activeCoupon.active || subtotal < activeCoupon.minimum) return 0;
  if (activeCoupon.expiry && new Date(`${activeCoupon.expiry}T23:59:59`) < new Date()) return 0;
  const amount = activeCoupon.type === "percent" ? Math.round(subtotal * activeCoupon.value / 100) : activeCoupon.value;
  return Math.min(subtotal, amount);
}

function productOfficialYen(product) {
  if (product.yenPrice) return Number(product.yenPrice);
  const match = product.description.match(/([0-9,]+)円/);
  if (match) return Number(match[1].replaceAll(",", ""));
  return 0;
}

function productListedPrice(product) {
  const yenAmount = productOfficialYen(product);
  if (!yenAmount) return Number(product.price) || 0;
  const fixedFee = fixedServiceFeeByYen(yenAmount);
  if (fixedFee === null) return null;
  return Math.round(yenAmount * fixedProductRate) + fixedFee;
}

function productDisplayPrice(product) {
  const price = productListedPrice(product);
  return price === null ? "另行報價" : money(price);
}

function serviceFeeFromTwd(twdAmount, rate) {
  if (!twdAmount) return 0;
  const estimatedYen = rate ? Math.round(twdAmount / rate) : 0;
  return fixedServiceFeeByYen(estimatedYen);
}

function shippingRate(method, grams) {
  return shippingRates[method].rows.find(([max]) => grams <= max)?.[1] || null;
}

function cartEstimate() {
  const settings = feeSettings();
  const weight = cart.reduce((sum, item) => sum + item.weight * item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingYen = weight ? shippingRate(settings.method, weight) : 0;
  const shippingTwd = shippingYen ? Math.round(shippingYen * settings.rate) : 0;
  const serviceFee = 0;
  const discount = couponDiscount(subtotal);
  const outOfRange = weight > shippingRates[settings.method].limit || (weight > 0 && !shippingYen);
  const quoteOnly = false;
  return { methodLabel: shippingRates[settings.method].label, weight, subtotal, discount, shippingYen, shippingTwd, serviceFee, extra: subtotal ? settings.extra : 0, total: subtotal - discount + shippingTwd + serviceFee + (subtotal ? settings.extra : 0), outOfRange, quoteOnly };
}

function showSummary(message) {
  els.summaryText.value = message;
  els.summaryLineButton.href = lineUrl(message);
  els.emailNotifyButton.href = emailUrl(message);
  els.summaryPanel.hidden = false;
  els.summaryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function saveOrder(record) {
  orders.unshift({ ...record, status: "待回覆", createdAt: new Date().toLocaleString("zh-TW") });
  save(orderStorageKey, orders);
  renderOrders();
  syncOrderToSheet(orders[0]);
}

function syncOrderToSheet(order) {
  const settings = load(feeSettingsKey, { sheetUrl: "" });
  if (!settings.sheetUrl) return;
  fetch(settings.sheetUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  }).catch(() => {});
}

function renderCategories() {
  els.categoryGrid.innerHTML = categories.map((category) => {
    const count = products.filter((product) => product.category === category.id).length;
    return `<button class="category-card" type="button" data-category="${category.id}">
      <img src="${category.image}" alt="${category.label}" />
      <span class="tag">${count} 件商品</span>
      <h3>${category.label}</h3>
      <p>${category.description}</p>
      <strong>進入分類</strong>
    </button>`;
  }).join("");
}

function openCategory(id) {
  activeCategory = id;
  els.categoryGrid.hidden = true;
  els.categoryView.hidden = false;
  els.categoryTitle.textContent = `${categoryLabel(id)}商品清單`;
  const subcategories = [...new Set(products.filter((product) => product.category === id).map(productSubcategory))];
  els.productSubcategory.innerHTML = '<option value="">全部細分類</option>' + subcategories.map((item) => `<option value="${item}">${item}</option>`).join("");
  renderProducts();
  els.categoryView.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderProducts() {
  let list = products.filter((product) => product.category === activeCategory);
  const keyword = els.productSearch.value.trim().toLowerCase();
  const subcategory = els.productSubcategory.value;
  if (subcategory) list = list.filter((product) => productSubcategory(product) === subcategory);
  if (keyword) list = list.filter((product) => `${product.name} ${product.description} ${productSubcategory(product)} ${productSpec(product)} ${productVariants(product).join(" ")}`.toLowerCase().includes(keyword));
  const sort = els.productSort.value;
  if (sort === "priceAsc") list.sort((a, b) => (productListedPrice(a) ?? Infinity) - (productListedPrice(b) ?? Infinity));
  if (sort === "priceDesc") list.sort((a, b) => (productListedPrice(b) ?? 0) - (productListedPrice(a) ?? 0));
  if (sort === "weightAsc") list.sort((a, b) => a.weight - b.weight);
  if (sort === "status") list.sort((a, b) => a.status.localeCompare(b.status, "zh-Hant"));

  els.productGrid.innerHTML = list.length ? list.map((product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-body">
        <span class="tag">${categoryLabel(product.category)}</span>
        <span class="status-pill" data-status="${product.status}">${product.status}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta"><span>${productSubcategory(product)}</span><span>${productSpec(product)}</span></div>
        ${productVariants(product).length > 1 ? `<label class="variant-picker">規格<select data-variant-for="${product.id}">${productVariants(product).map((variant) => `<option>${variant}</option>`).join("")}</select></label>` : ""}
        <div class="product-details"><span>${productOfficialYen(product) ? `官網 ${yen(productOfficialYen(product))} / ${product.weight.toLocaleString("zh-TW")}g / 含代購費` : `${product.weight.toLocaleString("zh-TW")}g`}</span><strong class="price">${productDisplayPrice(product)}</strong></div>
        <div class="product-actions">
          <button class="cart-button" type="button" data-id="${product.id}" ${product.status === "售完" ? "disabled" : ""}>${product.status === "售完" ? "已售完" : "加入購物車"}</button>
          ${product.sourceUrl ? `<a class="source-link" href="${product.sourceUrl}" target="_blank" rel="noopener noreferrer">查看日本官網</a>` : ""}
        </div>
      </div>
    </article>`).join("") : '<p class="empty-cart">這個分類目前沒有符合條件的商品。</p>';
}

function renderCart() {
  els.cartItems.innerHTML = cart.length ? cart.map((item) => `
    <div class="cart-row">
      <div><h3>${item.name}</h3><p>規格：${item.selectedVariant || productSpec(item)}・單價 ${money(item.price)}・數量 ${item.quantity}</p><strong>小計 ${money(item.price * item.quantity)}</strong></div>
      <div class="cart-controls">
        <button class="qty-button" type="button" data-action="decrease" data-id="${item.cartId}">-</button>
        <strong>${item.quantity}</strong>
        <button class="qty-button" type="button" data-action="increase" data-id="${item.cartId}">+</button>
        <button class="remove-button" type="button" data-action="remove" data-id="${item.cartId}">刪除</button>
      </div>
    </div>`).join("") : '<p class="empty-cart">購物車目前是空的。</p>';
  const estimate = cartEstimate();
  els.cartWeight.textContent = `${estimate.weight.toLocaleString("zh-TW")}g`;
  els.cartSubtotal.textContent = money(estimate.subtotal);
  els.cartDiscount.textContent = `-${money(estimate.discount)}`;
  els.cartShipping.textContent = estimate.outOfRange ? "需另詢" : money(estimate.shippingTwd);
  els.cartTotal.textContent = estimate.outOfRange || estimate.quoteOnly ? "需另詢" : money(estimate.total);
}

function addToCart(id, selectedVariant) {
  const product = products.find((item) => item.id === id);
  const variant = selectedVariant || productSpec(product);
  const cartId = `${id}::${variant}`;
  const existing = cart.find((item) => item.cartId === cartId);
  if (existing) existing.quantity += 1;
  else if (product) {
    const price = productListedPrice(product);
    if (price === null) return showSummary(`${product.name} 金額超過固定加價級距，請改用 LINE 詢問報價。`);
    cart.push({ ...product, cartId, selectedVariant: variant, price, yenPrice: productOfficialYen(product), quantity: 1 });
  }
  renderCart();
}

function calculateShipping(showMessage = false) {
  const method = els.shippingMethod.value;
  const grams = Number(els.shippingWeight.value) || 0;
  const productYen = Number(els.itemYen.value) || 0;
  const rate = Number(els.yenRate.value) || 0;
  const domestic = Number(els.domesticYen.value) || 0;
  const extra = Number(els.extraFee.value) || 0;
  const table = shippingRates[method];
  const shipYen = shippingRate(method, grams);
  const itemCost = Math.round((productYen + domestic) * rate);
  if (!shipYen || grams > table.limit) {
    els.shippingYen.textContent = "需另詢";
    els.itemTwd.textContent = money(itemCost);
    els.serviceFeeTwd.textContent = money(0);
    els.estimateTotal.textContent = "需另詢";
    els.shippingNote.textContent = `${table.label} 的試算上限為 ${table.limit.toLocaleString("zh-TW")}g，超出請另外詢問。`;
    renderCart();
    return null;
  }
  const shipTwd = Math.round(shipYen * rate);
  const serviceFee = fixedServiceFeeByYen(productYen + domestic);
  if (serviceFee === null) {
    els.shippingYen.textContent = `${yen(shipYen)} / 約 ${money(shipTwd)}`;
    els.itemTwd.textContent = money(itemCost);
    els.serviceFeeTwd.textContent = "另行報價";
    els.estimateTotal.textContent = "需另詢";
    els.shippingNote.textContent = "商品金額超過 10000円，依收費表需另外報價。";
    renderCart();
    return null;
  }
  const total = itemCost + shipTwd + serviceFee + extra;
  els.shippingYen.textContent = `${yen(shipYen)} / 約 ${money(shipTwd)}`;
  els.itemTwd.textContent = money(itemCost);
  els.serviceFeeTwd.textContent = money(serviceFee);
  els.estimateTotal.textContent = money(total);
  els.shippingNote.textContent = `${table.label} 以 ${grams.toLocaleString("zh-TW")}g 內級距試算。實際費用以包裝後重量與日本郵局收費為準。`;
  renderCart();
  const result = { methodLabel: table.label, grams, productYen, domestic, shipYen, shipTwd, itemCost, serviceFee, extra, total };
  if (showMessage) {
    const id = quoteId();
    const message = ["瑤光代購 運費報價", `報價編號：${id}`, `寄送方式：${result.methodLabel}`, `包裝後重量：${result.grams}g`, `商品日幣金額：${yen(result.productYen)}`, `日本國內運費：${yen(result.domestic)}`, `日本郵局國際運費：${yen(result.shipYen)} / 約 ${money(result.shipTwd)}`, `代購服務費：${money(result.serviceFee)}`, `其他費用：${money(result.extra)}`, `預估總額：${money(result.total)}`, "實際費用以包裝後重量與日本郵局收費為準。"].join("\n");
    showSummary(message);
    saveOrder({ quoteId: id, type: "運費報價", customer: "運費試算", contact: "未填", message });
  }
  return result;
}

function buildCartMessage(formData, id) {
  const estimate = cartEstimate();
  const lines = cart.map((item) => `- ${item.name} / 規格：${item.selectedVariant} / 單價 ${money(item.price)} x ${item.quantity} / 小計 ${money(item.price * item.quantity)}`);
  return ["瑤光代購 固定商品報價單", `報價編號：${id}`, `姓名：${formData.name}`, `聯絡方式：${formData.contact}`, `付款方式：${formData.payment}`, `取貨方式：${formData.delivery}`, "商品：", ...lines, `商品小計：${money(estimate.subtotal)}`, `優惠券：${activeCoupon?.code || "未使用"} / 折抵 ${money(estimate.discount)}`, `包裝後重量：${estimate.weight.toLocaleString("zh-TW")}g`, `寄送方式：${estimate.methodLabel}`, `預估國際運費：${estimate.outOfRange ? "需另詢" : `${yen(estimate.shippingYen)} / 約 ${money(estimate.shippingTwd)}`}`, `其他費用：${money(estimate.extra)}`, `預估合計：${estimate.outOfRange ? "需另詢" : money(estimate.total)}`, `備註：${formData.note || "無"}`].join("\n");
}

function renderAdminProducts() {
  els.adminProductList.innerHTML = products.map((product) => `
    <article class="admin-product-card">
      <div><strong>${product.name}</strong><span>${categoryLabel(product.category)}・${product.status}・${productDisplayPrice(product)}・${product.weight}g</span></div>
      <div class="panel-actions">
        <button class="secondary-button" type="button" data-action="edit-product" data-id="${product.id}">編輯</button>
        <button class="secondary-button danger-button" type="button" data-action="delete-product" data-id="${product.id}">刪除</button>
      </div>
    </article>`).join("");
}

function renderCoupons() {
  els.couponAdminList.innerHTML = coupons.length ? coupons.map((coupon) => `
    <div class="coupon-row">
      <div><strong>${coupon.code}</strong><span>${coupon.type === "percent" ? `${coupon.value}%` : money(coupon.value)}・滿 ${money(coupon.minimum)}・${coupon.expiry || "無期限"}・${coupon.active ? "啟用" : "停用"}</span></div>
      <button class="secondary-button danger-button" type="button" data-code="${coupon.code}">刪除</button>
    </div>`).join("") : '<p class="empty-cart">尚未設定優惠券。</p>';
}

function applyCouponCode() {
  const code = els.couponCode.value.trim().toUpperCase();
  activeCoupon = coupons.find((coupon) => coupon.code === code) || null;
  const subtotal = cartEstimate().subtotal;
  if (!code) {
    activeCoupon = null;
    els.couponMessage.textContent = "";
  } else if (!activeCoupon) {
    els.couponMessage.textContent = "找不到這張優惠券。";
  } else if (!activeCoupon.active) {
    activeCoupon = null;
    els.couponMessage.textContent = "這張優惠券目前未啟用。";
  } else if (activeCoupon.expiry && new Date(`${activeCoupon.expiry}T23:59:59`) < new Date()) {
    activeCoupon = null;
    els.couponMessage.textContent = "這張優惠券已過期。";
  } else if (subtotal < activeCoupon.minimum) {
    const minimum = activeCoupon.minimum;
    activeCoupon = null;
    els.couponMessage.textContent = `商品小計需滿 ${money(minimum)} 才能使用。`;
  } else {
    els.couponMessage.textContent = `已套用 ${code}。`;
  }
  renderCart();
}

function setProductForm(product) {
  els.editingProductId.value = product.id;
  els.adminName.value = product.name;
  els.adminCategory.value = product.category;
  els.adminSubcategory.value = product.subcategory || productSubcategory(product);
  els.adminPrice.value = productOfficialYen(product) || product.price;
  els.adminWeight.value = product.weight;
  els.adminSpec.value = product.spec || productSpec(product);
  els.adminVariants.value = productVariants(product).join("|");
  els.adminStatus.value = product.status;
  els.adminImage.value = product.image;
  els.adminDescription.value = product.description;
  els.saveProductButton.textContent = "儲存商品修改";
  els.cancelEditProduct.hidden = false;
}

function resetProductForm() {
  els.adminForm.reset();
  els.editingProductId.value = "";
  els.saveProductButton.textContent = "新增到分類商品";
  els.cancelEditProduct.hidden = true;
}

function renderOrders() {
  if (!orders.length) {
    els.orderList.innerHTML = '<p class="empty-cart">目前還沒有詢問紀錄。</p>';
    return;
  }
  const statuses = ["待回覆", "已報價", "已付款", "已下單", "已出貨", "已完成", "取消"];
  els.orderList.innerHTML = orders.map((order, index) => `
    <article class="order-card">
      <header>
        <div><h3>${order.quoteId} / ${order.type}</h3><p>${order.customer || "未填姓名"}・${order.contact || "未填聯絡方式"}・${order.createdAt}</p></div>
        <select data-index="${index}" aria-label="訂單狀態">${statuses.map((status) => `<option value="${status}" ${order.status === status ? "selected" : ""}>${status}</option>`).join("")}</select>
      </header>
      <textarea readonly>${order.message}</textarea>
    </article>`).join("");
}

function renderLookup(order) {
  if (!order) {
    els.lookupResult.hidden = false;
    els.lookupResult.innerHTML = "<strong>查無資料</strong><p>請確認報價編號是否正確，或直接用 LINE 聯絡客服。</p>";
    return;
  }

  els.lookupResult.hidden = false;
  els.lookupResult.innerHTML = `
    <strong>${order.quoteId}</strong>
    <div class="lookup-status">${order.status}</div>
    <p>類型：${order.type}</p>
    <p>建立時間：${order.createdAt}</p>
    <textarea readonly>${order.message}</textarea>
  `;
}

function exportOrdersCsv() {
  const header = ["報價編號", "類型", "客人", "聯絡方式", "狀態", "建立時間", "內容"];
  const rows = orders.map((order) => [order.quoteId, order.type, order.customer, order.contact, order.status, order.createdAt, order.message]);
  const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `yaoguang-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function updateAdminAccess() {
  const isAuthed = localStorage.getItem(adminAuthKey) === "true";
  els.adminSection.hidden = !isAuthed;
  if (isAuthed) {
    els.adminLoginMessage.textContent = "已登入後台。";
  }
}

els.categoryGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".category-card");
  if (card) openCategory(card.dataset.category);
});

els.backToCategories.addEventListener("click", () => {
  activeCategory = null;
  els.categoryGrid.hidden = false;
  els.categoryView.hidden = true;
});

els.productSearch.addEventListener("input", renderProducts);
els.productSubcategory.addEventListener("change", renderProducts);
els.productSort.addEventListener("change", renderProducts);

els.productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".cart-button");
  if (!button) return;
  const selected = els.productGrid.querySelector(`[data-variant-for="${button.dataset.id}"]`)?.value;
  addToCart(button.dataset.id, selected);
  button.textContent = "已加入";
  setTimeout(() => { button.textContent = "加入購物車"; }, 1000);
});

els.cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const item = cart.find((cartItem) => cartItem.cartId === button.dataset.id);
  if (!item) return;
  if (button.dataset.action === "increase") item.quantity += 1;
  if (button.dataset.action === "decrease") item.quantity -= 1;
  if (button.dataset.action === "remove" || item.quantity <= 0) cart = cart.filter((cartItem) => cartItem.cartId !== item.cartId);
  renderCart();
});

els.applyCoupon.addEventListener("click", applyCouponCode);
els.couponCode.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyCouponCode();
  }
});

els.checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) return showSummary("購物車目前是空的，請先加入固定商品。");
  const id = quoteId();
  const formData = { name: $("#orderName").value.trim(), contact: $("#orderContact").value.trim(), payment: $("#paymentMethod").value, delivery: $("#deliveryMethod").value, note: $("#orderNote").value.trim() };
  const message = buildCartMessage(formData, id);
  showSummary(message);
  saveOrder({ quoteId: id, type: "固定商品", customer: formData.name, contact: formData.contact, message });
});

els.specialType.addEventListener("change", () => { document.body.dataset.requestType = els.specialType.value; });

els.specialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = quoteId();
  const message = ["瑤光代購 代訂詢問", `報價編號：${id}`, `需求類型：${els.specialType.value}`, `姓名：${$("#specialName").value.trim()}`, `聯絡方式：${$("#specialContact").value.trim()}`, `店家或場所：${$("#venueName").value.trim() || "未填"}`, `活動或商品：${$("#requestName").value.trim() || "未填"}`, `網址：${$("#specialLink").value.trim() || "未提供"}`, `日期：${$("#specialDate").value || "未指定"}`, `時間：${$("#specialTime").value || "未指定"}`, `人數：${$("#peopleCount").value || "未指定"}`, `數量：${$("#itemQuantity").value || "未指定"}`, `預算：${$("#specialBudget").value.trim() || "未指定"}`, `需求內容：${$("#specialDetails").value.trim()}`].join("\n");
  showSummary(message);
  saveOrder({ quoteId: id, type: els.specialType.value, customer: $("#specialName").value.trim(), contact: $("#specialContact").value.trim(), message });
});

els.lookupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = els.lookupQuoteId.value.trim().toUpperCase();
  const order = orders.find((item) => item.quoteId.toUpperCase() === keyword);
  renderLookup(order);
});

els.shippingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateShipping(true);
});

[els.shippingMethod, els.shippingWeight, els.itemYen, els.yenRate, els.domesticYen, els.servicePercent, els.minimumFee, els.extraFee].forEach((field) => field.addEventListener("input", () => calculateShipping(false)));

els.settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const settings = { method: els.settingShippingMethod.value, rate: Number(els.settingYenRate.value), percent: Number(els.settingServicePercent.value), minFee: Number(els.settingMinimumFee.value), extra: Number(els.settingExtraFee.value), notifyEmail: els.settingNotifyEmail.value.trim() || contactEmail, sheetUrl: els.settingSheetUrl.value.trim() };
  save(feeSettingsKey, settings);
  applyFeeSettings(settings);
  calculateShipping(false);
  showSummary("收費設定已儲存，購物車與運費試算已更新。");
});

els.adminForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = els.editingProductId.value || `custom-${Date.now()}`;
  const product = { id, name: els.adminName.value.trim(), category: els.adminCategory.value, subcategory: els.adminSubcategory.value.trim(), yenPrice: Number(els.adminPrice.value), price: Number(els.adminPrice.value), weight: Number(els.adminWeight.value), spec: els.adminSpec.value.trim(), variants: els.adminVariants.value.trim().split("|").filter(Boolean), status: els.adminStatus.value, image: els.adminImage.value.trim() || "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80", description: els.adminDescription.value.trim() };
  const index = products.findIndex((item) => item.id === id);
  if (index >= 0) products[index] = product;
  else products.push(product);
  save(productStorageKey, products);
  resetProductForm();
  renderCategories();
  if (activeCategory) renderProducts();
  renderAdminProducts();
  showSummary(index >= 0 ? "商品已更新。" : "商品已新增到指定分類。");
});

els.couponForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const coupon = {
    code: els.adminCouponCode.value.trim().toUpperCase(),
    type: els.adminCouponType.value,
    value: Number(els.adminCouponValue.value),
    minimum: Number(els.adminCouponMinimum.value) || 0,
    expiry: els.adminCouponExpiry.value,
    active: els.adminCouponActive.checked,
  };
  coupons = coupons.filter((item) => item.code !== coupon.code);
  coupons.push(coupon);
  save(couponStorageKey, coupons);
  els.couponForm.reset();
  els.adminCouponActive.checked = true;
  renderCoupons();
  renderCart();
  showSummary(`優惠券 ${coupon.code} 已儲存。`);
});

els.couponAdminList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  coupons = coupons.filter((coupon) => coupon.code !== button.dataset.code);
  if (activeCoupon?.code === button.dataset.code) activeCoupon = null;
  save(couponStorageKey, coupons);
  renderCoupons();
  renderCart();
});

els.cancelEditProduct.addEventListener("click", resetProductForm);

els.adminProductList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.id);
  if (!product) return;
  if (button.dataset.action === "edit-product") {
    setProductForm(product);
    els.adminForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (button.dataset.action === "delete-product") {
    products = products.filter((item) => item.id !== product.id);
    cart = cart.filter((item) => item.id !== product.id);
    save(productStorageKey, products);
    renderCategories();
    if (activeCategory) renderProducts();
    renderAdminProducts();
    renderCart();
    showSummary("商品已刪除。");
  }
});

els.resetProducts.addEventListener("click", () => {
  products = [...defaultProducts];
  save(productStorageKey, products);
  resetProductForm();
  renderCategories();
  if (activeCategory) renderProducts();
  renderAdminProducts();
  renderCart();
  showSummary("已恢復預設商品清單。");
});

els.orderList.addEventListener("change", (event) => {
  const select = event.target.closest("select");
  if (!select) return;
  orders[Number(select.dataset.index)].status = select.value;
  save(orderStorageKey, orders);
});

els.exportOrders.addEventListener("click", exportOrdersCsv);
els.clearOrders.addEventListener("click", () => {
  orders = [];
  save(orderStorageKey, orders);
  renderOrders();
  showSummary("詢問紀錄已清空。");
});

els.adminLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (els.adminPassword.value === adminPassword) {
    localStorage.setItem(adminAuthKey, "true");
    els.adminPassword.value = "";
    updateAdminAccess();
    els.adminSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    els.adminLoginMessage.textContent = "密碼錯誤，請再試一次。";
  }
});

els.adminLogout.addEventListener("click", () => {
  localStorage.removeItem(adminAuthKey);
  updateAdminAccess();
  document.querySelector("#admin-login").scrollIntoView({ behavior: "smooth", block: "start" });
});

els.copyButton.addEventListener("click", async () => {
  els.summaryText.select();
  if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(els.summaryText.value);
  else document.execCommand("copy");
  els.copyButton.textContent = "已複製";
  setTimeout(() => { els.copyButton.textContent = "複製內容"; }, 1200);
});

applyFeeSettings(load(feeSettingsKey, { method: "ems", rate: 0.205, percent: 10, minFee: 100, extra: 0, notifyEmail: contactEmail, sheetUrl: "" }));
els.summaryLineButton.href = lineOfficialUrl;
renderCategories();
renderCart();
renderAdminProducts();
renderCoupons();
renderOrders();
calculateShipping(false);
updateAdminAccess();
