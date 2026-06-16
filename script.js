const categories = [
  { id: "matsukiyo", label: "松本清", description: "藥妝、美妝、保養、眼藥水、保健食品與生活用品。", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80" },
  { id: "muji", label: "無印良品", description: "文具、紙品、保養、香氛、零食與輕量生活用品。", image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80" },
  { id: "loft", label: "LOFT", description: "日本熱門文具、限定筆記本與輕量雜貨。", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80" },
  { id: "bic", label: "BIC CAMERA", description: "Apple、Anker、遊戲周邊與輕量3C配件。", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" },
  { id: "yodobashi", label: "友都八喜", description: "熱門3C、相機周邊、行動電源與生活小家電。", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80" },
  { id: "donki", label: "唐吉軻德零食", description: "情熱價格、話題零食、餅乾糖果與下酒零嘴。", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80" },
  { id: "threecoins", label: "3COINS", description: "廚房收納、生活雜貨、人氣便利小物。", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80" },
  { id: "seven", label: "7-11 餅乾糖果", description: "日本 7-Eleven 餅乾、糖果、巧克力與零食。", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80" },
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
  { id: "matsukiyo-12", name: "matsukiyo 神經醯胺化妝水", category: "matsukiyo", subcategory: "保養化妝水", yenPrice: 547, price: 547, weight: 560, spec: "500mL", variants: ["500mL"], status: "需確認寄送", description: "官網參考價 547円。大容量液態化妝品，寄送方式需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4901061479933_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4901061479933" },
  { id: "matsukiyo-13", name: "資生堂 2e 防曬霜", category: "matsukiyo", subcategory: "防曬護唇", yenPrice: 2420, price: 2420, weight: 80, spec: "40g", variants: ["40g"], status: "需確認寄送", description: "官網參考價 2,420円。敏感肌用防曬霜，寄送前需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4909978203085_01_308a87cbc7c21a251d7cf83b0ab01c6d.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4909978203085" },
  { id: "matsukiyo-14", name: "DHC Extra Moisture 護唇膏", category: "matsukiyo", subcategory: "防曬護唇", yenPrice: 1257, price: 1257, weight: 30, spec: "1.5g", variants: ["1.5g"], status: "可代購", description: "官網參考價 1,257円。無香料保濕護唇膏。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413309926_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413309926" },
  { id: "matsukiyo-15", name: "DHC 藥用護唇膏", category: "matsukiyo", subcategory: "防曬護唇", yenPrice: 770, price: 770, weight: 30, spec: "1.5g", variants: ["1.5g"], status: "需確認輸入", description: "官網參考價 770円。醫藥部外品，購買及輸入規定需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413302163_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413302163" },
  { id: "matsukiyo-16", name: "Recipeo 藥用修護護唇膏", category: "matsukiyo", subcategory: "防曬護唇", yenPrice: 990, price: 990, weight: 35, spec: "2.8g", variants: ["2.8g"], status: "需確認輸入", description: "官網參考價 990円。醫藥部外品，購買及輸入規定需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4971710583779_01_2c699712a78f540074f4d4473c1b1630.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4971710583779" },
  { id: "matsukiyo-17", name: "男士薏仁化妝水", category: "matsukiyo", subcategory: "保養化妝水", yenPrice: 657, price: 657, weight: 560, spec: "500mL", variants: ["500mL"], status: "需確認寄送", description: "官網參考價 657円。大容量液態化妝品，寄送方式需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4573500873024_01_b8331d5172655e54c54a39de2591e962.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4573500873024" },
  { id: "matsukiyo-18", name: "菊正宗 日本酒高保濕化妝水", category: "matsukiyo", subcategory: "保養化妝水", yenPrice: 990, price: 990, weight: 560, spec: "500mL", variants: ["500mL"], status: "需確認寄送", description: "官網參考價 990円。大容量液態化妝品，寄送方式需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4971650800578_01_2463281dfccd84e595a535aa87d9dfa6.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4971650800578" },
  { id: "matsukiyo-19", name: "matsukiyo 高壓混合油乳霜化妝水", category: "matsukiyo", subcategory: "保養化妝水", yenPrice: 767, price: 767, weight: 560, spec: "500mL", variants: ["500mL"], status: "需確認寄送", description: "官網參考價 767円。大容量液態化妝品，寄送方式需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4573205373539_01_8a5d5fe5086add5a17da41766858a843.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4573205373539" },
  { id: "matsukiyo-20", name: "matsukiyo 藥用抗痘洗面乳", category: "matsukiyo", subcategory: "洗顏清潔", yenPrice: 492, price: 492, weight: 190, spec: "150g", variants: ["150g"], status: "需確認輸入", description: "官網參考價 492円。醫藥部外品洗面乳，寄送及輸入規定需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4901061479940_01_88dac39fd0fbf4f7d0f7c565467b84e2.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4901061479940" },
  { id: "matsukiyo-21", name: "ettusais 超纖長睫毛膏 01", category: "matsukiyo", subcategory: "彩妝", yenPrice: 1980, price: 1980, weight: 45, spec: "01 黑色", variants: ["01 黑色"], status: "可代購", description: "官網參考價 1,980円。纖長捲翹睫毛膏。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4932554255864_01_9f89b489af622af50e0aedd1e83ffbcf.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4932554255864" },
  { id: "matsukiyo-22", name: "INTEGRATE 纖長睫毛膏 BK999", category: "matsukiyo", subcategory: "彩妝", yenPrice: 1320, price: 1320, weight: 45, spec: "7g / BK999", variants: ["BK999"], status: "可代購", description: "官網參考價 1,320円。溫水可卸型睫毛膏。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4901872036929_01_44d37c9146ad2d58e9fee8184c3aaf72.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4901872036929" },
  { id: "matsukiyo-23", name: "Scalp D 纖長睫毛膏", category: "matsukiyo", subcategory: "彩妝", yenPrice: 1980, price: 1980, weight: 45, spec: "自然黑", variants: ["自然黑"], status: "可代購", description: "官網參考價 1,980円。自然黑纖長睫毛膏。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4580688636037_01_20aba6f0250dc54f1c1f124234d3b54f.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4580688636037" },
  { id: "matsukiyo-24", name: "ETUDE Curl Fix 睫毛膏", category: "matsukiyo", subcategory: "彩妝", yenPrice: 1650, price: 1650, weight: 45, spec: "黑色", variants: ["黑色"], status: "可代購", description: "官網參考價 1,650円。防水型睫毛膏。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/8/8/8809820697757_01_c80b1836cf1139f63718a0b4f805e1f2.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/8809820697757" },
  { id: "matsukiyo-25", name: "Pimel 束感睫毛膏 黑色", category: "matsukiyo", subcategory: "彩妝", yenPrice: 1430, price: 1430, weight: 45, spec: "黑色", variants: ["黑色"], status: "可代購", description: "官網參考價 1,430円。細緻束感睫毛膏。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4961989408101_01_67f354d580522bc5ec13737e77178513.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4961989408101" },
  { id: "matsukiyo-26", name: "PAIR ACNE 抗痘霜 W", category: "matsukiyo", subcategory: "一般藥品／需確認輸入", yenPrice: 1450, price: 1450, weight: 55, spec: "24g", variants: ["24g"], status: "需確認輸入", description: "第2類醫藥品。價格與購買資格需於官網確認，台灣輸入規定需另外確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4903301025726_01_1328f3f5a7ab93cadc39f9adc907e733.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4903301025726" },
  { id: "matsukiyo-27", name: "matsukiyo Vaseline PRO", category: "matsukiyo", subcategory: "一般藥品／需確認輸入", yenPrice: 1078, price: 1078, weight: 150, spec: "110g", variants: ["110g"], status: "需確認輸入", description: "官網參考價 1,078円，第3類醫藥品，台灣輸入規定需另外確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987286316710_01_c9582bde61d6c97516b1f2554885f931.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987286316710" },
  { id: "matsukiyo-28", name: "LOXONIN S 止痛凝膠", category: "matsukiyo", subcategory: "一般藥品／需確認輸入", yenPrice: 1298, price: 1298, weight: 60, spec: "25g", variants: ["25g"], status: "需確認輸入", description: "官網參考價 1,298円，第2類醫藥品，台灣輸入規定需另外確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987107617903_01_d728e111722dbac3dfe6147153684321.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987107617903" },
  { id: "matsukiyo-29", name: "LOXONIN S 止痛貼布", category: "matsukiyo", subcategory: "一般藥品／需確認輸入", yenPrice: 2728, price: 2728, weight: 180, spec: "21枚", variants: ["7枚", "21枚"], status: "需確認輸入", description: "官網參考價 21枚 2,728円，第2類醫藥品，台灣輸入規定需另外確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987107636973_01_a408e8d2bf943423fafe4caa937eaa2a.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987107636973" },
  { id: "matsukiyo-30", name: "Eyebon Cool 洗眼液", category: "matsukiyo", subcategory: "一般藥品／需確認輸入", yenPrice: 1100, price: 1100, weight: 560, spec: "500mL", variants: ["500mL"], status: "需確認輸入", description: "第3類醫藥品且為液態商品，價格、航空寄送與台灣輸入規定皆需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987072071267_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987072071267" },
  { id: "matsukiyo-31", name: "Sante FX Neo 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 456, price: 456, weight: 45, spec: "12mL", variants: ["12mL"], status: "需確認輸入", description: "官網參考價約 456円。第2類醫藥品，需確認台灣輸入規定與可寄送性。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987084416902_01_fc9fe881ba9d4485d8b421559955f5ae.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987084416902" },
  { id: "matsukiyo-32", name: "Rohto C Cube Premium Moist 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 602, price: 602, weight: 55, spec: "18mL", variants: ["18mL"], status: "需確認輸入", description: "官網參考價約 602円。隱形眼鏡用眼藥水，屬醫藥品，需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987241162024_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987241162024" },
  { id: "matsukiyo-33", name: "Rohto Lycee 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 698, price: 698, weight: 45, spec: "8mL", variants: ["8mL"], status: "需確認輸入", description: "官網參考價約 698円。眼藥水屬醫藥品，需確認購買資格與台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987241123193_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987241123193" },
  { id: "matsukiyo-34", name: "Soft Santear 隱形眼鏡眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 627, price: 627, weight: 80, spec: "5mL x 4本", variants: ["5mL x 4本"], status: "需確認輸入", description: "官網參考價約 627円。第3類醫藥品，需確認寄送與輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987084305930_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987084305930" },
  { id: "matsukiyo-35", name: "Sante Beauteye 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 1320, price: 1320, weight: 55, spec: "12mL", variants: ["12mL"], status: "需確認輸入", description: "官網參考價約 1,320円。眼藥水屬醫藥品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987084410443_01_237981c3a53d8c4f13cfac6eae7447fb.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4987084410443" },
  { id: "matsukiyo-36", name: "Smile Contact Cool Fresh 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 547, price: 547, weight: 45, spec: "12mL", variants: ["12mL"], status: "需確認輸入", description: "官網參考價約 547円。隱形眼鏡可用款，醫藥品需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4903301290377_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4903301290377" },
  { id: "matsukiyo-37", name: "Smile 40 EX 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 657, price: 657, weight: 55, spec: "15mL", variants: ["15mL"], status: "需確認輸入", description: "官網參考價約 657円。第2類醫藥品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4903301186502_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4903301186502" },
  { id: "matsukiyo-38", name: "Smile 40 Premium DX 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 877, price: 877, weight: 55, spec: "15mL", variants: ["15mL"], status: "需確認輸入", description: "官網參考價約 877円。第2類醫藥品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4903301339779_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4903301339779" },
  { id: "matsukiyo-39", name: "UHA グミサプリ マルチビタミン 20日分", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 1080, price: 1080, weight: 120, spec: "40粒", variants: ["40粒 / 20日分"], status: "需確認輸入", description: "官網參考價約 1,080円。保健食品類，需確認台灣輸入規定與數量。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4902750709652_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4902750709652" },
  { id: "matsukiyo-40", name: "UHA グミサプリ ビタミンC ボトル", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 1058, price: 1058, weight: 160, spec: "60粒", variants: ["60粒"], status: "需確認輸入", description: "官網參考價約 1,058円。維他命C含有食品，需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4902750651685_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4902750651685" },
  { id: "matsukiyo-41", name: "UHA 瞬間サプリ マルチビタミン 30日分", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 1296, price: 1296, weight: 110, spec: "60粒", variants: ["60粒 / 30日分"], status: "需確認輸入", description: "官網參考價約 1,296円。保健食品類，需確認輸入規定與數量。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4902750715554_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4902750715554" },
  { id: "matsukiyo-42", name: "UHA グミサプリ DHA&EPA 14日分", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 798, price: 798, weight: 100, spec: "28粒", variants: ["28粒 / 14日分"], status: "需確認輸入", description: "官網參考價約 798円。保健食品類，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4902750735927_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4902750776821" },
  { id: "matsukiyo-43", name: "UHA ぷにキャラグミ ディズニープリンセス", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 198, price: 198, weight: 65, spec: "50g", variants: ["50g"], status: "可代購", description: "官網參考價約 198円。糖果食品，輸入數量與成分仍需依規定確認。", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4902750794160" },
  { id: "matsukiyo-44", name: "UHA グミだま いちご", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 198, price: 198, weight: 70, spec: "55g", variants: ["55g"], status: "可代購", description: "官網參考價約 198円。草莓風味糖果食品，輸入數量與成分仍需確認。", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4902750837812" },
  { id: "matsukiyo-45", name: "UHA 特濃ミルク 8.2", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 238, price: 238, weight: 105, spec: "88g", variants: ["88g"], status: "可代購", description: "官網參考價約 238円。牛奶糖，含乳成分，需確認食品輸入規定。", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4902750910454" },
  { id: "matsukiyo-46", name: "UHA 純露 糖果", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 248, price: 248, weight: 140, spec: "120g", variants: ["120g"], status: "可代購", description: "官網參考價約 248円。經典糖果，輸入數量與成分仍需確認。", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4902750697874" },
  { id: "matsukiyo-47", name: "DHC マルチビタミン 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 861, price: 861, weight: 80, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 861円。營養機能食品，需確認台灣輸入規定與數量。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413407363_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413407363" },
  { id: "matsukiyo-48", name: "DHC ビタミンC 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 396, price: 396, weight: 80, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 396円。維他命C補充品，需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413408254_01_9ce50c0680c5a2ad9a59dca50b42dbe7.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413408254" },
  { id: "matsukiyo-49", name: "DHC ビタミンBミックス 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 498, price: 498, weight: 80, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 498円。維他命B群補充品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413405055_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413405055" },
  { id: "matsukiyo-50", name: "DHC 亜鉛 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 498, price: 498, weight: 80, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 498円。鋅補充品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413404133_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413404133" },
  { id: "matsukiyo-51", name: "DHC ヘム鉄 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 626, price: 626, weight: 80, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 626円。鐵補充品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413404126_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413404126" },
  { id: "matsukiyo-52", name: "DHC コラーゲン 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 648, price: 648, weight: 100, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 648円。膠原蛋白補充品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413404041_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413404041" },
  { id: "matsukiyo-53", name: "DHC ブルーベリーエキス 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 1058, price: 1058, weight: 90, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 1,058円。藍莓萃取補充品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413404119_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413404119" },
  { id: "matsukiyo-54", name: "DHC カルシウム／マグ 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 626, price: 626, weight: 110, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 626円。鈣鎂補充品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413403075_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalog/product/view/id/4511413403075" },
  { id: "matsukiyo-55", name: "Rohto V Active 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 1540, price: 1540, weight: 55, spec: "13mL", variants: ["13mL"], status: "需確認輸入", description: "官網參考價約 1,540円。眼藥水屬醫藥品，需確認購買資格、寄送與台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987241162024_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Rohto%20V%20Active%20%E7%9B%AE%E8%96%AC" },
  { id: "matsukiyo-56", name: "Rohto Gold 40 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 698, price: 698, weight: 55, spec: "20mL", variants: ["20mL"], status: "需確認輸入", description: "官網參考價約 698円。眼藥水屬醫藥品，需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4903301186502_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Rohto%20Gold%2040%20%E7%9B%AE%E8%96%AC" },
  { id: "matsukiyo-57", name: "Sante Medical 12 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 1628, price: 1628, weight: 55, spec: "12mL", variants: ["12mL"], status: "需確認輸入", description: "官網參考價約 1,628円。高機能眼藥水，醫藥品需確認購買與輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987084410443_01_237981c3a53d8c4f13cfac6eae7447fb.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Sante%20Medical%2012" },
  { id: "matsukiyo-58", name: "Sante PC 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 877, price: 877, weight: 55, spec: "12mL", variants: ["12mL"], status: "需確認輸入", description: "官網參考價約 877円。電腦手機族常見款，醫藥品需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987084416902_01_fc9fe881ba9d4485d8b421559955f5ae.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Sante%20PC%20%E7%9B%AE%E8%96%AC" },
  { id: "matsukiyo-59", name: "Smile Contact EX Drytect 眼藥水", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 657, price: 657, weight: 45, spec: "12mL", variants: ["12mL"], status: "需確認輸入", description: "官網參考價約 657円。隱形眼鏡用眼藥水，醫藥品需確認寄送與輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4903301290377_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Smile%20Contact%20EX%20Drytect" },
  { id: "matsukiyo-60", name: "Eyebon W Vitamin 洗眼液", category: "matsukiyo", subcategory: "眼藥水／洗眼液", yenPrice: 1210, price: 1210, weight: 560, spec: "500mL", variants: ["500mL"], status: "需確認輸入", description: "官網參考價約 1,210円。洗眼液為液態醫藥品，寄送和輸入皆需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4987072071267_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Eyebon%20W%20Vitamin" },
  { id: "matsukiyo-61", name: "UHA グミサプリ 鉄 20日分", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 798, price: 798, weight: 110, spec: "40粒", variants: ["40粒 / 20日分"], status: "需確認輸入", description: "官網參考價約 798円。鐵分軟糖補充食品，需確認食品與保健品輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4902750709652_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=UHA%20%E3%82%B0%E3%83%9F%E3%82%B5%E3%83%97%E3%83%AA%20%E9%89%84" },
  { id: "matsukiyo-62", name: "UHA グミサプリ ルテイン 20日分", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 861, price: 861, weight: 110, spec: "40粒", variants: ["40粒 / 20日分"], status: "需確認輸入", description: "官網參考價約 861円。葉黃素軟糖補充食品，需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4902750735927_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=UHA%20%E3%82%B0%E3%83%9F%E3%82%B5%E3%83%97%E3%83%AA%20%E3%83%AB%E3%83%86%E3%82%A4%E3%83%B3" },
  { id: "matsukiyo-63", name: "UHA グミサプリ ビタミンD3 20日分", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 698, price: 698, weight: 100, spec: "40粒", variants: ["40粒 / 20日分"], status: "需確認輸入", description: "官網參考價約 698円。維他命D軟糖補充食品，需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4902750651685_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=UHA%20%E3%82%B0%E3%83%9F%E3%82%B5%E3%83%97%E3%83%AA%20%E3%83%93%E3%82%BF%E3%83%9F%E3%83%B3D" },
  { id: "matsukiyo-64", name: "UHA グミサプリ 亜鉛 20日分", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 798, price: 798, weight: 100, spec: "40粒", variants: ["40粒 / 20日分"], status: "需確認輸入", description: "官網參考價約 798円。鋅軟糖補充食品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4902750715554_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=UHA%20%E3%82%B0%E3%83%9F%E3%82%B5%E3%83%97%E3%83%AA%20%E4%BA%9C%E9%89%9B" },
  { id: "matsukiyo-65", name: "UHA コロロ グレープ", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 188, price: 188, weight: 65, spec: "48g", variants: ["葡萄 48g"], status: "可代購", description: "官網參考價約 188円。軟糖食品，輸入數量與成分仍需確認。", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=UHA%20%E3%82%B3%E3%83%AD%E3%83%AD%20%E3%82%B0%E3%83%AC%E3%83%BC%E3%83%97" },
  { id: "matsukiyo-66", name: "UHA 忍者めし 巨峰", category: "matsukiyo", subcategory: "UHA 味覺糖", yenPrice: 158, price: 158, weight: 45, spec: "20g", variants: ["巨峰 20g"], status: "可代購", description: "官網參考價約 158円。咀嚼系軟糖，食品輸入數量與成分需確認。", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=UHA%20%E5%BF%8D%E8%80%85%E3%82%81%E3%81%97" },
  { id: "matsukiyo-67", name: "DHC ルテイン 光対策 60日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 1544, price: 1544, weight: 90, spec: "60日分", variants: ["60日分"], status: "需確認輸入", description: "官網參考價約 1,544円。葉黃素保健食品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413404119_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=DHC%20%E3%83%AB%E3%83%86%E3%82%A4%E3%83%B3" },
  { id: "matsukiyo-68", name: "DHC ビタミンD 30日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 324, price: 324, weight: 55, spec: "30日分", variants: ["30日分"], status: "需確認輸入", description: "官網參考價約 324円。維他命D補充品，需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413408254_01_9ce50c0680c5a2ad9a59dca50b42dbe7.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=DHC%20%E3%83%93%E3%82%BF%E3%83%9F%E3%83%B3D" },
  { id: "matsukiyo-69", name: "DHC はとむぎエキス 30日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 648, price: 648, weight: 70, spec: "30日分", variants: ["30日分"], status: "需確認輸入", description: "官網參考價約 648円。薏仁萃取保健食品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413404041_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=DHC%20%E3%81%AF%E3%81%A8%E3%82%80%E3%81%8E%E3%82%A8%E3%82%AD%E3%82%B9" },
  { id: "matsukiyo-70", name: "DHC オルニチン 30日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 1382, price: 1382, weight: 85, spec: "30日分", variants: ["30日分"], status: "需確認輸入", description: "官網參考價約 1,382円。保健食品，需確認台灣輸入規定與數量。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413403075_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=DHC%20%E3%82%AA%E3%83%AB%E3%83%8B%E3%83%81%E3%83%B3" },
  { id: "matsukiyo-71", name: "DHC ナットウキナーゼ 30日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 1296, price: 1296, weight: 75, spec: "30日分", variants: ["30日分"], status: "需確認輸入", description: "官網參考價約 1,296円。保健食品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413404126_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=DHC%20%E3%83%8A%E3%83%83%E3%83%88%E3%82%A6%E3%82%AD%E3%83%8A%E3%83%BC%E3%82%BC" },
  { id: "matsukiyo-72", name: "DHC 大豆イソフラボン 30日分", category: "matsukiyo", subcategory: "DHC 維他命／保健食品", yenPrice: 918, price: 918, weight: 70, spec: "30日分", variants: ["30日分"], status: "需確認輸入", description: "官網參考價約 918円。大豆異黃酮保健食品，需確認台灣輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4511413405055_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=DHC%20%E5%A4%A7%E8%B1%86%E3%82%A4%E3%82%BD%E3%83%95%E3%83%A9%E3%83%9C%E3%83%B3" },
  { id: "matsukiyo-73", name: "Bioré UV Aqua Rich 防曬乳", category: "matsukiyo", subcategory: "防曬護唇", yenPrice: 968, price: 968, weight: 120, spec: "70g", variants: ["70g"], status: "可代購", description: "官網參考價約 968円。防曬乳，液態/乳狀商品寄送數量需確認。", image: "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Bior%C3%A9%20UV%20Aqua%20Rich" },
  { id: "matsukiyo-74", name: "ANESSA Perfect UV 防曬乳", category: "matsukiyo", subcategory: "防曬護唇", yenPrice: 3058, price: 3058, weight: 130, spec: "60mL", variants: ["60mL"], status: "需確認寄送", description: "官網參考價約 3,058円。防曬乳屬液態商品，寄送方式與數量需確認。", image: "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?auto=format&fit=crop&w=900&q=80", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=ANESSA%20Perfect%20UV" },
  { id: "matsukiyo-75", name: "Curel 潤浸保濕面霜", category: "matsukiyo", subcategory: "保養乳霜", yenPrice: 2970, price: 2970, weight: 90, spec: "40g", variants: ["40g"], status: "可代購", description: "官網參考價約 2,970円。敏感肌保濕面霜，價格與庫存以官網為準。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4909978203085_01_308a87cbc7c21a251d7cf83b0ab01c6d.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Curel%20%E6%BD%A4%E6%B5%B8%E4%BF%9D%E6%B9%BF%E3%83%95%E3%82%A7%E3%82%A4%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%A0" },
  { id: "matsukiyo-76", name: "Hada Labo 極潤化妝水", category: "matsukiyo", subcategory: "保養化妝水", yenPrice: 990, price: 990, weight: 220, spec: "170mL", variants: ["170mL"], status: "需確認寄送", description: "官網參考價約 990円。液態化妝水，寄送方式與數量需確認。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/5/4573500873024_01_b8331d5172655e54c54a39de2591e962.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=%E8%82%8C%E3%83%A9%E3%83%9C%20%E6%A5%B5%E6%BD%A4%20%E5%8C%96%E7%B2%A7%E6%B0%B4" },
  { id: "matsukiyo-77", name: "MINON Amino Moist 面膜", category: "matsukiyo", subcategory: "面膜保養", yenPrice: 1320, price: 1320, weight: 180, spec: "4枚", variants: ["4枚"], status: "可代購", description: "官網參考價約 1,320円。保濕面膜，價格與庫存以購買日為準。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4971710258417_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=MINON%20Amino%20Moist%20%E3%83%91%E3%83%83%E3%82%AF" },
  { id: "matsukiyo-78", name: "Transino 美白面膜", category: "matsukiyo", subcategory: "面膜保養", yenPrice: 1980, price: 1980, weight: 160, spec: "4枚", variants: ["4枚"], status: "需確認輸入", description: "官網參考價約 1,980円。醫藥部外品面膜，需確認輸入規定。", image: "https://www.matsukiyococokara-online.com/store/media/catalog/product/4/9/4971710189032_01_f08d666c09654f607bd9ce50a85f8fab.jpg", sourceUrl: "https://www.matsukiyococokara-online.com/store/catalogsearch/result/?q=Transino%20%E3%83%91%E3%83%83%E3%82%AF" },

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
  { id: "loft-13", name: "Rollbahn 口袋筆記本 M 黑色", category: "loft", subcategory: "文具手帳", yenPrice: 715, price: 715, weight: 180, spec: "M", variants: ["黑色 M"], status: "可代購", description: "官網參考價約 715円。LOFT 熱門經典方格筆記本。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4516085050831-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4516085050831/" },
  { id: "loft-14", name: "Rollbahn 口袋筆記本 L 黃色", category: "loft", subcategory: "文具手帳", yenPrice: 935, price: 935, weight: 240, spec: "L", variants: ["黃色 L", "深藍 L", "紅色 L"], status: "可代購", description: "官網參考價約 935円。大尺寸方格筆記本，顏色依庫存確認。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4516085050855-L.jpg", sourceUrl: "https://www.loft.co.jp/store/" },
  { id: "loft-15", name: "LOFT 限定便條紙 動物系列", category: "loft", subcategory: "文具便條", yenPrice: 495, price: 495, weight: 70, spec: "1冊", variants: ["日本犬", "柯基", "貓咪", "鸚鵡"], status: "可代購", description: "官網參考價約 495円。LOFT 人氣動物造型便條紙。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539159-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539159/" },
  { id: "loft-16", name: "LOFT 限定便條紙 貓咪", category: "loft", subcategory: "文具便條", yenPrice: 495, price: 495, weight: 70, spec: "1冊", variants: ["貓咪"], status: "可代購", description: "官網參考價約 495円。輕量紙製文具，適合合併寄送。", image: "https://www.loft.co.jp/shop_assets/img/goods/L/4515968539203-L.jpg", sourceUrl: "https://www.loft.co.jp/store/g/g4515968539203/" },
  { id: "muji-18", name: "無印良品 不揃香蕉年輪蛋糕", category: "muji", subcategory: "零食", yenPrice: 180, price: 180, weight: 120, spec: "1個", variants: ["香蕉", "抹茶", "紅茶", "巧克力"], status: "可代購", description: "官網參考價約 180円。無印人氣不揃年輪蛋糕系列。", image: "https://img.muji.net/img/item/4550723634410_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/" },
  { id: "muji-19", name: "無印良品 紅茶年輪蛋糕", category: "muji", subcategory: "零食", yenPrice: 180, price: 180, weight: 120, spec: "1個", variants: ["紅茶"], status: "可代購", description: "官網參考價約 180円。食品寄送以台灣輸入規定及數量為準。", image: "https://img.muji.net/img/item/4550723634410_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/" },
  { id: "muji-20", name: "無印良品 敏感肌用乳液 高保濕", category: "muji", subcategory: "化妝保養", yenPrice: 990, price: 990, weight: 360, spec: "300mL", variants: ["300mL"], status: "需確認寄送", description: "官網參考價約 990円。液態保養品，寄送方式與數量需確認。", image: "https://img.muji.net/img/item/4550583434991_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/" },
  { id: "muji-21", name: "無印良品 攜帶用睫毛夾", category: "muji", subcategory: "化妝小物", yenPrice: 390, price: 390, weight: 50, spec: "1個", variants: ["1個"], status: "可代購", description: "官網參考價約 390円。無印熱門化妝小物。", image: "https://img.muji.net/img/item/4547315820740_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/" },
  { id: "muji-22", name: "無印良品 不揃巧克力年輪蛋糕", category: "muji", subcategory: "零食", yenPrice: 180, price: 180, weight: 120, spec: "1個", variants: ["巧克力"], status: "可代購", description: "官網參考價約 180円。無印不揃年輪蛋糕系列。", image: "https://img.muji.net/img/item/4550723634410_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/" },
  { id: "muji-23", name: "無印良品 泡立てネット", category: "muji", subcategory: "化妝小物", yenPrice: 99, price: 99, weight: 25, spec: "1個", variants: ["1個"], status: "可代購", description: "無印常見洗臉起泡網，輕量適合合併寄送。", image: "https://img.muji.net/img/item/4550182202946_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/" },
  { id: "muji-24", name: "無印良品 化妝水用噴頭", category: "muji", subcategory: "化妝小物", yenPrice: 190, price: 190, weight: 30, spec: "1個", variants: ["1個"], status: "可代購", description: "無印化妝水瓶用配件，價格與庫存以官網為準。", image: "https://img.muji.net/img/item/4548076448372_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/" },
  { id: "muji-25", name: "無印良品 攜帶用紙香皂", category: "muji", subcategory: "旅行小物", yenPrice: 290, price: 290, weight: 35, spec: "24枚", variants: ["24枚"], status: "可代購", description: "旅行用輕量清潔用品，適合小量代購。", image: "https://img.muji.net/img/item/4550344594032_1260.jpg", sourceUrl: "https://www.muji.com/jp/ja/store/" },
  { id: "bic-01", name: "Apple AirPods Pro 3", category: "bic", subcategory: "Apple 耳機", yenPrice: 39800, price: 39800, weight: 260, spec: "USB-C", variants: ["AirPods Pro 3"], status: "需另報價", description: "Apple 官方熱門耳機。高單價商品需確認匯率、保固與庫存後報價。", image: "https://www.apple.com/v/airpods-pro/s/images/meta/og__c0ceegchesom_overview.png?202606102041", sourceUrl: "https://www.biccamera.com/bc/c/apple/index.jsp" },
  { id: "bic-02", name: "Apple AirTag 1入", category: "bic", subcategory: "Apple 配件", yenPrice: 4980, price: 4980, weight: 80, spec: "1入", variants: ["1入", "4入"], status: "可代購", description: "Apple 官方追蹤器。價格以 BIC CAMERA 或 Apple 日本售價為準。", image: "https://www.apple.com/v/airtag/g/images/meta/og__ck3n0k1jl6j6.png?202603251025", sourceUrl: "https://www.biccamera.com/bc/c/apple/index.jsp" },
  { id: "bic-03", name: "Anker Nano Power Bank 10000mAh 30W", category: "bic", subcategory: "行動電源", yenPrice: 6490, price: 6490, weight: 330, spec: "10000mAh / 30W", variants: ["黑", "白", "藍"], status: "需確認寄送", description: "Anker 熱門行動電源。鋰電池商品寄送需確認航空規定。", image: "https://cdn.shopify.com/s/files/1/0493/9834/9974/files/5_a7a61bbb-8693-46f2-8d44-de814496fc62.png?v=1764230004", sourceUrl: "https://www.biccamera.com/bc/category/?q=Anker%20Nano" },
  { id: "bic-04", name: "Anker Nano Charger 30W USB-C", category: "bic", subcategory: "充電器", yenPrice: 2990, price: 2990, weight: 90, spec: "30W", variants: ["30W"], status: "可代購", description: "Anker 熱門小型 USB-C 充電器，適合手機與平板。", image: "https://cdn.shopify.com/s/files/1/0493/9834/9974/files/5_a7a61bbb-8693-46f2-8d44-de814496fc62.png?v=1764230004", sourceUrl: "https://www.biccamera.com/bc/category/?q=Anker%20Nano%2030W" },
  { id: "yodobashi-01", name: "Apple AirPods Pro 3", category: "yodobashi", subcategory: "Apple 耳機", yenPrice: 39800, price: 39800, weight: 260, spec: "USB-C", variants: ["AirPods Pro 3"], status: "需另報價", description: "友都八喜熱門 Apple 耳機。高單價商品需確認匯率、庫存與保固。", image: "https://www.apple.com/v/airpods-pro/s/images/meta/og__c0ceegchesom_overview.png?202606102041", sourceUrl: "https://www.yodobashi.com/maker/0000000373/" },
  { id: "yodobashi-02", name: "Apple AirTag 4入組", category: "yodobashi", subcategory: "Apple 配件", yenPrice: 16800, price: 16800, weight: 180, spec: "4入", variants: ["4入"], status: "需另報價", description: "Apple AirTag 多入組。價格超過固定級距時需另行報價。", image: "https://www.apple.com/v/airtag/g/images/meta/og__ck3n0k1jl6j6.png?202603251025", sourceUrl: "https://www.yodobashi.com/maker/0000000373/" },
  { id: "yodobashi-03", name: "Anker Nano Power Bank 10000mAh 30W", category: "yodobashi", subcategory: "行動電源", yenPrice: 6490, price: 6490, weight: 330, spec: "10000mAh / 30W", variants: ["黑", "白", "藍"], status: "需確認寄送", description: "行動電源含鋰電池，寄送前需確認可用物流。", image: "https://cdn.shopify.com/s/files/1/0493/9834/9974/files/5_a7a61bbb-8693-46f2-8d44-de814496fc62.png?v=1764230004", sourceUrl: "https://www.yodobashi.com/?word=Anker%20Nano%20Power%20Bank" },
  { id: "threecoins-01", name: "3COINS 食器洗剤ボトル 400ml", category: "threecoins", subcategory: "廚房用品", yenPrice: 330, price: 330, weight: 180, spec: "400mL", variants: ["400mL"], status: "可代購", description: "PAL CLOSET 官方人氣商品，按壓式洗碗精分裝瓶。", image: "https://contents.palcloset.jp/static/images/item/698502_2901888_1.jpg", sourceUrl: "https://www.palcloset.jp/display/item/2612-3C7P281-00/" },
  { id: "threecoins-02", name: "3COINS ごはん保存容器2個セット", category: "threecoins", subcategory: "廚房收納", yenPrice: 330, price: 330, weight: 180, spec: "330mL x 2", variants: ["330mL x 2"], status: "可代購", description: "PAL CLOSET 官方人氣冷凍/微波飯盒。", image: "https://contents.palcloset.jp/static/images/item/636408_2695414_1.jpg", sourceUrl: "https://www.palcloset.jp/display/item/2514-3C7P814-00/" },
  { id: "threecoins-03", name: "3COINS ゴミ袋ハンガー", category: "threecoins", subcategory: "廚房收納", yenPrice: 330, price: 330, weight: 180, spec: "1個", variants: ["1個"], status: "可代購", description: "PAL CLOSET 官方人氣垃圾袋掛架。", image: "https://contents.palcloset.jp/static/images/item/673175_2816618_1.jpg", sourceUrl: "https://www.palcloset.jp/display/item/2523-GBHANGER-0/" },
  { id: "threecoins-04", name: "3COINS ひも付きロール式ゴミ袋 10L", category: "threecoins", subcategory: "消耗品", yenPrice: 330, price: 330, weight: 220, spec: "10L / 50枚", variants: ["10L / 50枚"], status: "可代購", description: "PAL CLOSET 官方商品，抽繩式垃圾袋。", image: "https://contents.palcloset.jp/static/images/item/673154_2816597_1.jpg", sourceUrl: "https://www.palcloset.jp/display/item/2523-3C7C074-00/" },
  { id: "threecoins-05", name: "3COINS 伸縮収納ケース S／KITINTO", category: "threecoins", subcategory: "廚房收納", yenPrice: 550, price: 550, weight: 260, spec: "S", variants: ["S"], status: "可代購", description: "PAL CLOSET 官方商品，可伸縮收納盒。", image: "https://contents.palcloset.jp/static/images/item/630768_2676532_1.jpg", sourceUrl: "https://www.palcloset.jp/display/item/2513-3C7V738-00/" },
  { id: "threecoins-06", name: "3COINS PPラタン収納ボックス／KITINTO", category: "threecoins", subcategory: "廚房收納", yenPrice: 1870, price: 1870, weight: 520, spec: "1個", variants: ["ブラウン"], status: "可代購", description: "PAL CLOSET 官方商品，可水洗 PP 藤編收納盒。", image: "https://contents.palcloset.jp/static/images/item/676935_2829042_1.jpg", sourceUrl: "https://www.palcloset.jp/display/item/2425-3C7I565-1-/" },
  { id: "threecoins-07", name: "3COINS 冷蔵庫収納ボックストレー深型セット S", category: "threecoins", subcategory: "廚房收納", yenPrice: 660, price: 660, weight: 360, spec: "S", variants: ["S"], status: "需查庫存", description: "PAL CLOSET 官方商品，冷藏庫收納盒，庫存需確認。", image: "https://contents.palcloset.jp/static/images/item/704759_2922230_1.jpg", sourceUrl: "https://www.palcloset.jp/display/item/2613-RSSHUKA-00/" },
  { id: "threecoins-08", name: "3COINS 収納ボックス用伸縮レール2本セット", category: "threecoins", subcategory: "廚房收納", yenPrice: 330, price: 330, weight: 120, spec: "2本セット", variants: ["2本セット"], status: "需查庫存", description: "PAL CLOSET 官方商品，收納盒用伸縮軌道。", image: "https://contents.palcloset.jp/static/images/item/683602_2850118_1.jpg", sourceUrl: "https://www.palcloset.jp/display/item/2525-3C7U168-00/" },
  { id: "donki-01", name: "情熱価格 舌が青くなるポテトチップス", category: "donki", subcategory: "洋芋片", yenPrice: 298, price: 298, weight: 100, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格官方零食，價格與庫存依門市為準。", image: "https://www.donki.com/updata/products/1/jk1778653936-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5284" },
  { id: "donki-02", name: "情熱価格 2色のさつまいもチップス", category: "donki", subcategory: "薯片地瓜片", yenPrice: 298, price: 298, weight: 120, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格官方零食，食品輸入數量需確認。", image: "https://www.donki.com/updata/products/1/jk1770094942-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5180" },
  { id: "donki-03", name: "情熱価格 マンゴーグミ", category: "donki", subcategory: "糖果軟糖", yenPrice: 298, price: 298, weight: 100, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格芒果軟糖。", image: "https://www.donki.com/updata/products/1/jk1759303302-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5083" },
  { id: "donki-04", name: "情熱価格 ナッツ＆デザート", category: "donki", subcategory: "堅果甜點", yenPrice: 498, price: 498, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格堅果甜點零食。", image: "https://www.donki.com/updata/products/1/jk1756449263-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5040" },
  { id: "donki-05", name: "情熱価格 お徳用ミニドーナツ", category: "donki", subcategory: "餅乾甜點", yenPrice: 398, price: 398, weight: 220, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格大容量迷你甜甜圈。", image: "https://www.donki.com/updata/products/1/jk1730804272-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4727" },
  { id: "donki-06", name: "情熱価格 芋けんぴ", category: "donki", subcategory: "和風零食", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["條狀", "輪切り"], status: "可代購", description: "唐吉軻德情熱價格芋頭/地瓜系零食。", image: "https://www.donki.com/updata/products/1/jk1715665837-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4463" },
  { id: "donki-07", name: "情熱価格 ミックスクリームクラッカー", category: "donki", subcategory: "餅乾甜點", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格奶油夾心餅乾。", image: "https://www.donki.com/updata/products/1/jk1713322340-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4401" },
  { id: "donki-08", name: "情熱価格 えび満月", category: "donki", subcategory: "鹹食零嘴", yenPrice: 298, price: 298, weight: 120, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格蝦味仙貝零食。", image: "https://www.donki.com/updata/products/1/jk1706511313-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4295" },
  { id: "donki-09", name: "情熱価格 あたりめ", category: "donki", subcategory: "下酒零嘴", yenPrice: 498, price: 498, weight: 90, spec: "1袋", variants: ["1袋"], status: "需確認輸入", description: "魷魚乾類食品，需確認食品輸入規定與數量。", image: "https://www.donki.com/updata/products/1/jk1706580531-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3993" },
  { id: "donki-10", name: "情熱価格 ひとくちサイズミルクチョコレート", category: "donki", subcategory: "巧克力", yenPrice: 398, price: 398, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格一口尺寸牛奶巧克力。", image: "https://www.donki.com/updata/products/1/jk1711506608-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4375" },
  { id: "donki-11", name: "情熱価格 ベイクドドーナツ", category: "donki", subcategory: "餅乾甜點", yenPrice: 398, price: 398, weight: 200, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格烘烤甜甜圈。", image: "https://www.donki.com/updata/products/1/jk1716781933-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4488" },
  { id: "donki-12", name: "情熱価格 ミニチョコチップスコーン", category: "donki", subcategory: "餅乾甜點", yenPrice: 398, price: 398, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格迷你巧克力司康。", image: "https://www.donki.com/updata/products/1/jk1716782070-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4489" },
  { id: "donki-13", name: "情熱価格 茎わかめうす塩味", category: "donki", subcategory: "下酒零嘴", yenPrice: 298, price: 298, weight: 120, spec: "1袋", variants: ["1袋"], status: "需確認輸入", description: "海藻類食品，需確認台灣食品輸入規定。", image: "https://www.donki.com/updata/products/1/jk1756449291-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5041" },
  { id: "donki-14", name: "情熱価格 無限黒糖ピーナッツ", category: "donki", subcategory: "堅果甜點", yenPrice: 398, price: 398, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格黑糖花生零食。", image: "https://www.donki.com/updata/products/1/jk1703207111-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4237" },
  { id: "donki-15", name: "情熱価格 大玉ふーせんガム ピーチ", category: "donki", subcategory: "糖果軟糖", yenPrice: 198, price: 198, weight: 80, spec: "1袋", variants: ["ピーチ"], status: "可代購", description: "唐吉軻德情熱價格大顆泡泡糖。", image: "https://www.donki.com/updata/products/1/jk1694766785-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4067" },
  { id: "donki-16", name: "情熱価格 おしゃぶり昆布", category: "donki", subcategory: "下酒零嘴", yenPrice: 298, price: 298, weight: 90, spec: "1袋", variants: ["1袋"], status: "需確認輸入", description: "唐吉軻德情熱價格昆布零嘴，海藻類食品需確認輸入規定。", image: "https://www.donki.com/updata/products/1/jk1762753606-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5108" },
  { id: "donki-17", name: "情熱価格 さきいか", category: "donki", subcategory: "下酒零嘴", yenPrice: 498, price: 498, weight: 90, spec: "1袋", variants: ["1袋"], status: "需確認輸入", description: "唐吉軻德情熱價格魷魚絲，水產加工食品需確認輸入規定。", image: "https://www.donki.com/updata/products/1/jk1762753639-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5109" },
  { id: "donki-18", name: "情熱価格 白かりんとう", category: "donki", subcategory: "和風零食", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格白糖風味花林糖。", image: "https://www.donki.com/updata/products/1/jk1749180795-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4379" },
  { id: "donki-19", name: "情熱価格 芋けんぴ 輪切り", category: "donki", subcategory: "和風零食", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["輪切り"], status: "可代購", description: "唐吉軻德情熱價格輪切地瓜零食。", image: "https://www.donki.com/updata/products/1/jk1715665890-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4464" },
  { id: "donki-20", name: "情熱価格 オリーブオイルケトルチップス", category: "donki", subcategory: "洋芋片", yenPrice: 398, price: 398, weight: 150, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格厚切 kettle 洋芋片。", image: "https://www.donki.com/updata/products/1/jk1734682050-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3842" },
  { id: "donki-21", name: "情熱価格 アボカドオイルケトルチップス", category: "donki", subcategory: "洋芋片", yenPrice: 398, price: 398, weight: 150, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格酪梨油 kettle 洋芋片。", image: "https://www.donki.com/updata/products/1/jk1734682103-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4766" },
  { id: "donki-22", name: "情熱価格 パプリカガーリック ケトルチップス", category: "donki", subcategory: "洋芋片", yenPrice: 398, price: 398, weight: 150, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格甜椒蒜味 kettle 洋芋片。", image: "https://www.donki.com/updata/products/1/jk1766716009-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5155" },
  { id: "donki-23", name: "情熱価格 キャニスターポテトチップス うすしお", category: "donki", subcategory: "罐裝洋芋片", yenPrice: 198, price: 198, weight: 120, spec: "1筒", variants: ["うすしお"], status: "可代購", description: "唐吉軻德情熱價格罐裝洋芋片。", image: "https://www.donki.com/updata/products/1/jk1662689373-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3739" },
  { id: "donki-24", name: "情熱価格 キャニスターポテトチップス サワークリーム", category: "donki", subcategory: "罐裝洋芋片", yenPrice: 198, price: 198, weight: 120, spec: "1筒", variants: ["サワークリーム"], status: "可代購", description: "唐吉軻德情熱價格酸奶洋蔥風味罐裝洋芋片。", image: "https://www.donki.com/updata/products/1/jk1662689413-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3740" },
  { id: "donki-25", name: "情熱価格 キャニスターポテトチップス BBQ", category: "donki", subcategory: "罐裝洋芋片", yenPrice: 198, price: 198, weight: 120, spec: "1筒", variants: ["BBQ"], status: "可代購", description: "唐吉軻德情熱價格 BBQ 風味罐裝洋芋片。", image: "https://www.donki.com/updata/products/1/jk1662689451-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3741" },
  { id: "donki-26", name: "情熱価格 キャニスターポテトチップス ハニーチーズ", category: "donki", subcategory: "罐裝洋芋片", yenPrice: 198, price: 198, weight: 120, spec: "1筒", variants: ["ハニーチーズ"], status: "可代購", description: "唐吉軻德情熱價格蜂蜜起司風味罐裝洋芋片。", image: "https://www.donki.com/updata/products/1/jk1662689491-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3742" },
  { id: "donki-27", name: "情熱価格 キャニスターポテトチップス ピザ", category: "donki", subcategory: "罐裝洋芋片", yenPrice: 198, price: 198, weight: 120, spec: "1筒", variants: ["ピザ"], status: "可代購", description: "唐吉軻德情熱價格披薩風味罐裝洋芋片。", image: "https://www.donki.com/updata/products/1/jk1710468608-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4341" },
  { id: "donki-28", name: "情熱価格 キャニスターポテトチップス わさびのり", category: "donki", subcategory: "罐裝洋芋片", yenPrice: 198, price: 198, weight: 120, spec: "1筒", variants: ["わさびのり"], status: "可代購", description: "唐吉軻德情熱價格芥末海苔風味罐裝洋芋片。", image: "https://www.donki.com/updata/products/1/jk1757292664-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5047" },
  { id: "donki-29", name: "情熱価格 キャニスターポテトチップス カレー", category: "donki", subcategory: "罐裝洋芋片", yenPrice: 198, price: 198, weight: 120, spec: "1筒", variants: ["カレー"], status: "可代購", description: "唐吉軻德情熱價格咖哩風味罐裝洋芋片。", image: "https://www.donki.com/updata/products/1/jk1757292699-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=5048" },
  { id: "donki-30", name: "情熱価格 半熟カレーせんべい", category: "donki", subcategory: "米菓仙貝", yenPrice: 298, price: 298, weight: 150, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格半熟咖哩仙貝。", image: "https://www.donki.com/updata/products/1/jk1706582645-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3843" },
  { id: "donki-31", name: "情熱価格 理由ありせんべい", category: "donki", subcategory: "米菓仙貝", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格理由あり仙貝。", image: "https://www.donki.com/updata/products/1/jk1727857406-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4283" },
  { id: "donki-32", name: "情熱価格 きね餅 塩", category: "donki", subcategory: "米菓仙貝", yenPrice: 298, price: 298, weight: 150, spec: "1袋", variants: ["塩"], status: "可代購", description: "唐吉軻德情熱價格鹽味米菓。", image: "https://www.donki.com/updata/products/1/jk1673603776-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3207" },
  { id: "donki-33", name: "情熱価格 きね餅 醤油", category: "donki", subcategory: "米菓仙貝", yenPrice: 298, price: 298, weight: 150, spec: "1袋", variants: ["醤油"], status: "可代購", description: "唐吉軻德情熱價格醬油味米菓。", image: "https://www.donki.com/updata/products/1/jk1673603819-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3206" },
  { id: "donki-34", name: "情熱価格 海老スナック", category: "donki", subcategory: "鹹食零嘴", yenPrice: 298, price: 298, weight: 120, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格蝦味零食。", image: "https://www.donki.com/updata/products/1/jk1669953159-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=2615" },
  { id: "donki-35", name: "情熱価格 ひねり揚げ 明太マヨ味", category: "donki", subcategory: "鹹食零嘴", yenPrice: 298, price: 298, weight: 120, spec: "1袋", variants: ["明太マヨ"], status: "可代購", description: "唐吉軻德情熱價格明太美乃滋風味脆點。", image: "https://www.donki.com/updata/products/1/jk1673603693-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3349" },
  { id: "donki-36", name: "情熱価格 ひねり揚げ うすしお味", category: "donki", subcategory: "鹹食零嘴", yenPrice: 298, price: 298, weight: 120, spec: "1袋", variants: ["うすしお"], status: "可代購", description: "唐吉軻德情熱價格薄鹽風味脆點。", image: "https://www.donki.com/updata/products/1/jk1694766624-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3348" },
  { id: "donki-37", name: "情熱価格 最後まで美味しい紅生姜せん", category: "donki", subcategory: "米菓仙貝", yenPrice: 298, price: 298, weight: 120, spec: "1袋", variants: ["紅生姜"], status: "可代購", description: "唐吉軻德情熱價格紅薑風味仙貝。", image: "https://www.donki.com/updata/products/1/jk1738223295-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3589" },
  { id: "donki-38", name: "情熱価格 柿の種ピーナツ", category: "donki", subcategory: "米菓仙貝", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格柿種花生。", image: "https://www.donki.com/updata/products/1/jk1727857476-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4212" },
  { id: "donki-39", name: "情熱価格 柿の種＆ピーナッツ カレー風味", category: "donki", subcategory: "米菓仙貝", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["カレー"], status: "可代購", description: "唐吉軻德情熱價格咖哩風味柿種花生。", image: "https://www.donki.com/updata/products/1/jk1730804225-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=4726" },
  { id: "donki-40", name: "情熱価格 日本人が食べやすいように配合したオートミール", category: "donki", subcategory: "早餐穀物", yenPrice: 398, price: 398, weight: 500, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格燕麥片，重量較高建議合併估運費。", image: "https://www.donki.com/updata/products/1/jk1698031888-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3594" },
  { id: "donki-41", name: "情熱価格 甘納豆", category: "donki", subcategory: "和風零食", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格甘納豆。", image: "https://www.donki.com/updata/products/1/jk1649828460-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=2818" },
  { id: "donki-42", name: "情熱価格 ふんわりドーナツ", category: "donki", subcategory: "餅乾甜點", yenPrice: 398, price: 398, weight: 220, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格鬆軟甜甜圈。", image: "https://www.donki.com/updata/products/1/jk1702539547-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=2816" },
  { id: "donki-43", name: "情熱価格 かりんとう 職人の逸品", category: "donki", subcategory: "和風零食", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格花林糖職人系列。", image: "https://www.donki.com/updata/products/1/jk1701848972-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=1495" },
  { id: "donki-44", name: "情熱価格 白かりんとう", category: "donki", subcategory: "和風零食", yenPrice: 298, price: 298, weight: 180, spec: "1袋", variants: ["1袋"], status: "可代購", description: "唐吉軻德情熱價格白糖花林糖另一包裝款。", image: "https://www.donki.com/updata/products/1/jk1721812079-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3590" },
  { id: "donki-45", name: "情熱価格 蒟蒻ゼリー りんご", category: "donki", subcategory: "果凍蒟蒻", yenPrice: 298, price: 298, weight: 260, spec: "1袋", variants: ["りんご"], status: "需確認寄送", description: "蒟蒻果凍重量和水分較高，需確認寄送與食品輸入規定。", image: "https://www.donki.com/updata/products/1/jk1646623173-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3553" },
  { id: "donki-46", name: "情熱価格 蒟蒻ゼリー もも", category: "donki", subcategory: "果凍蒟蒻", yenPrice: 298, price: 298, weight: 260, spec: "1袋", variants: ["もも"], status: "需確認寄送", description: "唐吉軻德情熱價格桃子蒟蒻果凍。", image: "https://www.donki.com/updata/products/1/jk1646623234-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3554" },
  { id: "donki-47", name: "情熱価格 蒟蒻ゼリー ぶどう", category: "donki", subcategory: "果凍蒟蒻", yenPrice: 298, price: 298, weight: 260, spec: "1袋", variants: ["ぶどう"], status: "需確認寄送", description: "唐吉軻德情熱價格葡萄蒟蒻果凍。", image: "https://www.donki.com/updata/products/1/jk1646623297-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3555" },
  { id: "donki-48", name: "情熱価格 蒟蒻ゼリー ぶどう＆もも", category: "donki", subcategory: "果凍蒟蒻", yenPrice: 298, price: 298, weight: 260, spec: "1袋", variants: ["ぶどう＆もも"], status: "需確認寄送", description: "唐吉軻德情熱價格雙口味蒟蒻果凍。", image: "https://www.donki.com/updata/products/1/jk1646623367-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3556" },
  { id: "donki-49", name: "情熱価格 蒟蒻ゼリー ぶどう＆りんご", category: "donki", subcategory: "果凍蒟蒻", yenPrice: 298, price: 298, weight: 260, spec: "1袋", variants: ["ぶどう＆りんご"], status: "需確認寄送", description: "唐吉軻德情熱價格葡萄蘋果蒟蒻果凍。", image: "https://www.donki.com/updata/products/1/jk1646623462-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3557" },
  { id: "donki-50", name: "情熱価格 MEGA蒟蒻ゼリー", category: "donki", subcategory: "果凍蒟蒻", yenPrice: 498, price: 498, weight: 520, spec: "MEGA", variants: ["MEGA"], status: "需確認寄送", description: "MEGA 包裝蒟蒻果凍，重量較高需估運費。", image: "https://www.donki.com/updata/products/1/jk1705460827-1-sub.jpg", sourceUrl: "https://www.donki.com/j-kakaku/product/detail.php?item=3620" },
  { id: "seven-01", name: "7プレミアム 品川巻", category: "seven", subcategory: "和風菓子", yenPrice: 198, price: 198, weight: 100, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方商品，價格與販售地區依官方頁面為準。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/310241/0616E54DD7BFD68300C9EA22A4369E69.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/310241/" },
  { id: "seven-02", name: "7プレミアム ラムネわらび", category: "seven", subcategory: "和風菓子", yenPrice: 128, price: 128, weight: 120, spec: "1個", variants: ["1個"], status: "需確認寄送", description: "7-Eleven 官方商品，水分較高商品需確認寄送與保存。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/310278/07BF0B550A48C12DD3B5ECB7A08BE27F.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/310278/" },
  { id: "seven-03", name: "7プレミアム 塩ライチわらび", category: "seven", subcategory: "和風菓子", yenPrice: 138, price: 138, weight: 120, spec: "1個", variants: ["1個"], status: "需確認寄送", description: "7-Eleven 官方商品，水分較高商品需確認寄送與保存。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/310365/7FC1641CA1DEFF1F72B4BD642D6196BD.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/310365/" },
  { id: "seven-04", name: "セブンプレミアム ひとくち歌舞伎揚", category: "seven", subcategory: "米菓仙貝", yenPrice: 138, price: 138, weight: 90, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方人氣米菓零食。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/310524/861DC4E638F140B733372528AD31CF67.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/310524/" },
  { id: "seven-05", name: "セブンプレミアム ミニマロ ストロベリークリーム味", category: "seven", subcategory: "糖果棉花糖", yenPrice: 178, price: 178, weight: 70, spec: "1袋", variants: ["草莓奶油"], status: "可代購", description: "7-Eleven 官方商品，棉花糖類零食。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322148/F4E6F679DC238F8A70C7E2023AC12685.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322148/" },
  { id: "seven-06", name: "セブンプレミアム ミニマロ ミルククリーム味", category: "seven", subcategory: "糖果棉花糖", yenPrice: 178, price: 178, weight: 70, spec: "1袋", variants: ["牛奶奶油"], status: "可代購", description: "7-Eleven 官方商品，棉花糖類零食。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322126/0C5AB31343D31670CFF2E055F22094A0.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322126/" },
  { id: "seven-07", name: "セブンプレミアム 種抜きカリカリ梅", category: "seven", subcategory: "梅子果乾", yenPrice: 180, price: 180, weight: 80, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方商品，去籽脆梅零食。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/323391/9D67CEF8F3332F95287A97DE0FE07538.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/323391/" },
  { id: "seven-08", name: "セブンプレミアム 有機むき甘栗 小袋", category: "seven", subcategory: "栗子堅果", yenPrice: 148, price: 148, weight: 90, spec: "小袋", variants: ["小袋"], status: "可代購", description: "7-Eleven 官方商品，有機剝皮甘栗。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/320017/04161DC751E0B4A0DB2A6DE6A1205E90.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/320017/" },
  { id: "seven-09", name: "セブンプレミアム グミまる シャインマスカット味", category: "seven", subcategory: "糖果軟糖", yenPrice: 100, price: 100, weight: 60, spec: "1袋", variants: ["麝香葡萄"], status: "可代購", description: "7-Eleven 官方商品，葡萄風味軟糖。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/323863/57CCE2344165EDF3BB7CF9FDABF54652.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/323863/" },
  { id: "seven-10", name: "セブンプレミアム グミカク スパークリングピーチ", category: "seven", subcategory: "糖果軟糖", yenPrice: 100, price: 100, weight: 60, spec: "1袋", variants: ["水蜜桃"], status: "可代購", description: "7-Eleven 官方商品，氣泡桃子風味軟糖。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/321441/B364EBB2583F503FA207F54204C0F398.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/321441/" },
  { id: "seven-11", name: "7プレミアムゴールド 金の贅沢フィナンシェ", category: "seven", subcategory: "烘焙點心", yenPrice: 188, price: 188, weight: 80, spec: "1個", variants: ["1個"], status: "可代購", description: "7-Eleven 官方金系列點心。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322195/13E96A217825250A9AC7D238552E2D08.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322195/" },
  { id: "seven-12", name: "7カフェ 香ばしシリアル シュガーバターの木", category: "seven", subcategory: "餅乾甜點", yenPrice: 278, price: 278, weight: 90, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方 7 Café 餅乾點心。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/321505/EC5AD44754E865E94429AFBD00AFDF84.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/321505/" },
  { id: "seven-13", name: "7プレミアムゴールド 金のしっとりバウムクーヘン", category: "seven", subcategory: "烘焙點心", yenPrice: 258, price: 258, weight: 110, spec: "1個", variants: ["1個"], status: "可代購", description: "7-Eleven 官方金系列年輪蛋糕。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322785/E6DF37A798DDE2222D0421656937EA72.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322785/" },
  { id: "seven-14", name: "7カフェ バター香る ふわふわバウムクーヘン", category: "seven", subcategory: "烘焙點心", yenPrice: 178, price: 178, weight: 95, spec: "1個", variants: ["1個"], status: "可代購", description: "7-Eleven 官方 7 Café 年輪蛋糕。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/323393/257D57162A49FB2F5BC6C762923C6316.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/323393/" },
  { id: "seven-15", name: "7カフェ 発酵バター香るベルギーワッフル", category: "seven", subcategory: "烘焙點心", yenPrice: 148, price: 148, weight: 80, spec: "1個", variants: ["1個"], status: "可代購", description: "7-Eleven 官方比利時鬆餅。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322741/2497F312F7A3B0C295C2C1B42329D418.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322741/" },
  { id: "seven-16", name: "7カフェ しっとりフィナンシェ", category: "seven", subcategory: "烘焙點心", yenPrice: 148, price: 148, weight: 75, spec: "1個", variants: ["1個"], status: "可代購", description: "7-Eleven 官方 7 Café 費南雪。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/321084/D02B96B95AC1E1DDB0D4CDA8CC23F4C6.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/321084/" },
  { id: "seven-17", name: "7P ポテトチップス うすしお味 50g", category: "seven", subcategory: "洋芋片", yenPrice: 108, price: 108, weight: 65, spec: "50g", variants: ["うすしお 50g"], status: "可代購", description: "7-Eleven 官方洋芋片，價格與販售地區依官方頁面為準。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/330720/8542702936A12B5F7A2E9FF9EA171490.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/330720/" },
  { id: "seven-18", name: "7プレミアム ポテトチップス うすしお味", category: "seven", subcategory: "洋芋片", yenPrice: 148, price: 148, weight: 80, spec: "1袋", variants: ["うすしお"], status: "可代購", description: "7-Eleven 官方洋芋片。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/330039/21547CBCF5E564742426806C4270AF6B.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/330039/" },
  { id: "seven-19", name: "7プレミアム 厚切りポテト 石垣の塩味", category: "seven", subcategory: "洋芋片", yenPrice: 258, price: 258, weight: 100, spec: "1袋", variants: ["石垣の塩味"], status: "可代購", description: "7-Eleven 官方厚切洋芋片。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/330795/92ED81324AB1BDCE5812BFB3DB5552BF.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/330795/" },
  { id: "seven-20", name: "7P ポテトチップス 濃厚コンソメ味", category: "seven", subcategory: "洋芋片", yenPrice: 148, price: 148, weight: 80, spec: "1袋", variants: ["濃厚コンソメ"], status: "可代購", description: "7-Eleven 官方濃厚高湯風味洋芋片。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/330358/FE013DCC09FE5E2DC2DBC40C5D37B9B3.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/330358/" },
  { id: "seven-21", name: "7P ポテトチップス うま辛チリ味", category: "seven", subcategory: "洋芋片", yenPrice: 148, price: 148, weight: 80, spec: "1袋", variants: ["うま辛チリ"], status: "可代購", description: "7-Eleven 官方辣味洋芋片。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/330359/14451AD9E16B38033A42B7016237A12E.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/330359/" },
  { id: "seven-22", name: "7プレミアム 厚切りポテト 贅沢のりしお味", category: "seven", subcategory: "洋芋片", yenPrice: 258, price: 258, weight: 100, spec: "1袋", variants: ["贅沢のりしお"], status: "可代購", description: "7-Eleven 官方厚切海苔鹽味洋芋片。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/330797/B91DBF95FD86326687D996ABEA2A16D9.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/330797/" },
  { id: "seven-23", name: "7プレミアム ザクザククランチチョコ", category: "seven", subcategory: "巧克力", yenPrice: 228, price: 228, weight: 90, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方巧克力點心。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/323067/DDD4DFA81B8FC80C901EE666E1EC6007.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/323067/" },
  { id: "seven-24", name: "7カフェ チョコチップ＆クッキー", category: "seven", subcategory: "餅乾甜點", yenPrice: 178, price: 178, weight: 90, spec: "1枚", variants: ["1枚"], status: "可代購", description: "7-Eleven 官方 7 Café 巧克力豆餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/321625/97847C4CB5F22C5A9A80E3CAA3D117DE.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/321625/" },
  { id: "seven-25", name: "セブンプレミアム チョコっとグミ シャインマスカット", category: "seven", subcategory: "糖果軟糖", yenPrice: 158, price: 158, weight: 65, spec: "1袋", variants: ["シャインマスカット"], status: "可代購", description: "7-Eleven 官方巧克力包覆麝香葡萄軟糖。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/323080/A43949E0A078E76086689D28960F8ABE.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/323080/" },
  { id: "seven-26", name: "7プレミアム チョコチップクッキー", category: "seven", subcategory: "餅乾甜點", yenPrice: 198, price: 198, weight: 120, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方巧克力豆餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322835/9BDA869B0EB5A2D2D9BB451B8226EEFB.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322835/" },
  { id: "seven-27", name: "7カフェ マカダミアクッキー", category: "seven", subcategory: "餅乾甜點", yenPrice: 210, price: 210, weight: 100, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方夏威夷豆餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322770/48C0CED0DFC9652863E930A9DEE73AEE.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322770/" },
  { id: "seven-28", name: "7プレミアム チョコレートビスケット 45g", category: "seven", subcategory: "巧克力餅乾", yenPrice: 100, price: 100, weight: 55, spec: "45g", variants: ["45g"], status: "可代購", description: "7-Eleven 官方巧克力餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322875/8347A785B80ECEB7701F9EC00794450C.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322875/" },
  { id: "seven-29", name: "7カフェ バターステイツクッキー", category: "seven", subcategory: "餅乾甜點", yenPrice: 298, price: 298, weight: 100, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方奶油餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/323180/69F89D8EA61B52D73DD45415F8AA877D.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/323180/" },
  { id: "seven-30", name: "不二家 チョコミント味のグミってアリですか？", category: "seven", subcategory: "糖果軟糖", yenPrice: 195, price: 195, weight: 70, spec: "1袋", variants: ["チョコミント"], status: "可代購", description: "7-Eleven 官方販售不二家巧克力薄荷風味軟糖。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/321125/C5FEA97708729C9E9A43D071A2D3BDF1.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/321125/" },
  { id: "seven-31", name: "7プレミアム チョコシュー", category: "seven", subcategory: "巧克力餅乾", yenPrice: 178, price: 178, weight: 90, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方一口巧克力泡芙點心。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322150/AE93B9973E44830E4294FAB62B9FF5A3.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322150/" },
  { id: "seven-32", name: "7カフェ アーモンドボール", category: "seven", subcategory: "餅乾甜點", yenPrice: 168, price: 168, weight: 90, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方杏仁球餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322656/601AB96D10F13F2596D6932A57B25EC0.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322656/" },
  { id: "seven-33", name: "7プレミアム チョコラングドシャ", category: "seven", subcategory: "巧克力餅乾", yenPrice: 198, price: 198, weight: 100, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方巧克力 langue de chat 餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322495/0CAC86793F9949AECFBEF12C8BA3DBEA.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322495/" },
  { id: "seven-34", name: "7プレミアム チョコラスク", category: "seven", subcategory: "巧克力餅乾", yenPrice: 298, price: 298, weight: 120, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方巧克力脆片餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/321040/F4903F4E4D95CE94432B8C812693C2ED.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/321040/" },
  { id: "seven-35", name: "7プレミアム バタークッキー", category: "seven", subcategory: "餅乾甜點", yenPrice: 178, price: 178, weight: 100, spec: "1袋", variants: ["1袋"], status: "可代購", description: "7-Eleven 官方奶油餅乾。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/322538/F34632808F3300840F4EA3985E6EB1F0.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/322538/" },
  { id: "seven-36", name: "クリート BIG チョコバナナグミ", category: "seven", subcategory: "糖果軟糖", yenPrice: 98, price: 98, weight: 45, spec: "1個", variants: ["チョコバナナ"], status: "可代購", description: "7-Eleven 官方販售巧克力香蕉風味軟糖。", image: "https://img-afd.7api-01.dp1.sej.co.jp/item-image/320173/193DA6FCFEF7B6824C79A663CD154145.jpg", sourceUrl: "https://www.sej.co.jp/products/a/item/320173/" },
];

const shippingRates = {
  ems: { label: "EMS 國際快捷", limit: 30000, rows: [[500,1450],[600,1600],[700,1750],[800,1900],[900,2050],[1000,2200],[1250,2500],[1500,2800],[1750,3100],[2000,3400],[2500,3900],[3000,4400],[3500,4900],[4000,5400],[4500,5900],[5000,6400],[5500,6900],[6000,7400],[7000,8200],[8000,9000],[9000,9800],[10000,10600],[11000,11400],[12000,12200],[13000,13000],[14000,13800],[15000,14600],[16000,15400],[17000,16200],[18000,17000],[19000,17800],[20000,18600],[21000,19400],[22000,20200],[23000,21000],[24000,21800],[25000,22600],[26000,23400],[27000,24200],[28000,25000],[29000,25800],[30000,26600]] },
  smallPacketAir: { label: "小形包裝物 航空", limit: 2000, rows: [[100,350],[200,450],[300,550],[400,650],[500,750],[600,850],[700,950],[800,1050],[900,1150],[1000,1250],[1100,1350],[1200,1450],[1300,1550],[1400,1650],[1500,1750],[1600,1850],[1700,1950],[1800,2050],[1900,2150],[2000,2250]] },
};

const productStorageKey = "yaoguang-products-v16";
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
