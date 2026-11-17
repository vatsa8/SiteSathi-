// Question bank / प्रश्न बैंक
// Every question has `verified: false` until an expert checks the answer and the
// reference against the actual code copy. Set it to `true` after checking.
// हर प्रश्न में `verified: false` है। कोड की असली कॉपी से जाँचने के बाद `true` करें।
//
// Fields:
//   id          unique id
//   discipline  'civil' | 'safety'
//   topic       short topic tag
//   q           question text {en, hi}
//   options     4 options, each {en, hi}
//   answer      index of the correct option (0-3)
//   explain     explanation {en, hi}
//   ref         code / source reference
//   verified    true once checked by an expert
//
// Question types:
//   (normal)    multiple choice: `options` + `answer` as above. Use 2 options for True/False.
//   type:'order' "put the steps in order": list `items` in the CORRECT order (no options/answer);
//               the app shuffles them and the user taps them back into sequence.

window.QUESTIONS = [
  // ───────────── CIVIL ─────────────
  {
    id: 'c01', discipline: 'civil', topic: 'Concrete',
    q: {
      en: 'As per IS 456:2000, what is the minimum grade of concrete for RCC work under "mild" exposure?',
      hi: 'IS 456:2000 के अनुसार "माइल्ड" एक्सपोज़र में RCC के लिए कंक्रीट का न्यूनतम ग्रेड क्या है?'
    },
    options: [
      { en: 'M15', hi: 'M15' }, { en: 'M20', hi: 'M20' },
      { en: 'M25', hi: 'M25' }, { en: 'M30', hi: 'M30' }
    ],
    answer: 1,
    explain: {
      en: 'For reinforced concrete under mild exposure the minimum grade is M20. M15 is allowed only for PCC. Higher exposure classes need higher grades.',
      hi: 'माइल्ड एक्सपोज़र में RCC के लिए न्यूनतम ग्रेड M20 है। M15 केवल PCC के लिए है। ज़्यादा कठोर एक्सपोज़र में ऊँचा ग्रेड चाहिए।'
    },
    ref: 'IS 456:2000, Table 5', verified: false
  },
  {
    id: 'c02', discipline: 'civil', topic: 'Concrete',
    q: {
      en: 'As per IS 456:2000, what is the nominal cover for "mild" exposure?',
      hi: 'IS 456:2000 के अनुसार "माइल्ड" एक्सपोज़र के लिए नॉमिनल कवर कितना है?'
    },
    options: [
      { en: '15 mm', hi: '15 mm' }, { en: '20 mm', hi: '20 mm' },
      { en: '30 mm', hi: '30 mm' }, { en: '45 mm', hi: '45 mm' }
    ],
    answer: 1,
    explain: {
      en: 'Nominal cover for mild exposure is 20 mm (it may be reduced by 5 mm for main bars up to 12 mm). Cover protects steel from corrosion and fire.',
      hi: 'माइल्ड एक्सपोज़र में नॉमिनल कवर 20 mm है (12 mm तक की मेन बार के लिए 5 mm कम किया जा सकता है)। कवर स्टील को जंग और आग से बचाता है।'
    },
    ref: 'IS 456:2000, Cl. 26.4.2, Table 16', verified: false
  },
  {
    id: 'c03', discipline: 'civil', topic: 'Testing',
    q: {
      en: 'What is the standard cube size for the concrete compressive strength test?',
      hi: 'कंक्रीट कम्प्रेसिव स्ट्रेंथ टेस्ट के लिए स्टैंडर्ड क्यूब का साइज़ क्या है?'
    },
    options: [
      { en: '75 mm', hi: '75 mm' }, { en: '100 mm', hi: '100 mm' },
      { en: '150 mm', hi: '150 mm' }, { en: '200 mm', hi: '200 mm' }
    ],
    answer: 2,
    explain: {
      en: '150 mm cubes are standard (100 mm is allowed when the maximum aggregate size is 20 mm or less). Cubes are usually tested at 7 and 28 days.',
      hi: '150 mm क्यूब स्टैंडर्ड है (एग्रीगेट 20 mm या कम हो तो 100 mm भी चलता है)। आमतौर पर 7 और 28 दिन पर टेस्ट होता है।'
    },
    ref: 'IS 516', verified: false
  },
  {
    id: 'c04', discipline: 'civil', topic: 'Curing',
    q: {
      en: 'Minimum moist curing period for concrete made with OPC (normal conditions) as per IS 456?',
      hi: 'IS 456 के अनुसार OPC वाले कंक्रीट की न्यूनतम मॉइस्ट क्योरिंग अवधि (सामान्य स्थिति) कितनी है?'
    },
    options: [
      { en: '3 days', hi: '3 दिन' }, { en: '7 days', hi: '7 दिन' },
      { en: '10 days', hi: '10 दिन' }, { en: '28 days', hi: '28 दिन' }
    ],
    answer: 1,
    explain: {
      en: 'At least 7 days for OPC. At least 10 days when mineral admixtures or blended cements are used, or in hot and dry weather.',
      hi: 'OPC के लिए कम से कम 7 दिन। मिनरल एडमिक्सचर/ब्लेंडेड सीमेंट हो या गर्म-सूखा मौसम हो तो कम से कम 10 दिन।'
    },
    ref: 'IS 456:2000, Cl. 13.5.1', verified: false
  },
  {
    id: 'c05', discipline: 'civil', topic: 'Formwork',
    q: {
      en: 'Minimum time before removing props under slabs spanning up to 4.5 m (OPC concrete) as per IS 456?',
      hi: 'IS 456 के अनुसार 4.5 m तक स्पैन वाले स्लैब के नीचे से प्रॉप्स हटाने का न्यूनतम समय (OPC कंक्रीट)?'
    },
    options: [
      { en: '3 days', hi: '3 दिन' }, { en: '7 days', hi: '7 दिन' },
      { en: '14 days', hi: '14 दिन' }, { en: '21 days', hi: '21 दिन' }
    ],
    answer: 1,
    explain: {
      en: 'Props under slabs up to 4.5 m span: 7 days; over 4.5 m: 14 days. Slab soffit formwork (props refixed): 3 days.',
      hi: '4.5 m तक स्पैन वाले स्लैब के प्रॉप्स: 7 दिन; 4.5 m से ज़्यादा: 14 दिन। स्लैब सॉफिट फॉर्मवर्क (प्रॉप्स दोबारा लगाकर): 3 दिन।'
    },
    ref: 'IS 456:2000, Cl. 11.3.1', verified: false
  },
  {
    id: 'c06', discipline: 'civil', topic: 'Formwork',
    q: {
      en: 'When can vertical formwork of columns, walls and beam sides normally be removed (OPC)?',
      hi: 'कॉलम, दीवार और बीम साइड की वर्टिकल शटरिंग सामान्यतः कब हटाई जा सकती है (OPC)?'
    },
    options: [
      { en: '16–24 hours', hi: '16–24 घंटे' }, { en: '3 days', hi: '3 दिन' },
      { en: '7 days', hi: '7 दिन' }, { en: '14 days', hi: '14 दिन' }
    ],
    answer: 0,
    explain: {
      en: 'Vertical formwork that carries no load can be struck after 16–24 hours, as the engineer-in-charge decides.',
      hi: 'जो वर्टिकल शटरिंग लोड नहीं उठाती, उसे इंजीनियर-इन-चार्ज के निर्णय से 16–24 घंटे बाद हटाया जा सकता है।'
    },
    ref: 'IS 456:2000, Cl. 11.3.1', verified: false
  },
  {
    id: 'c07', discipline: 'civil', topic: 'Materials',
    q: {
      en: 'The pH of water used for mixing concrete should not be less than:',
      hi: 'कंक्रीट मिक्सिंग के पानी का pH कितने से कम नहीं होना चाहिए?'
    },
    options: [
      { en: '5', hi: '5' }, { en: '6', hi: '6' },
      { en: '7', hi: '7' }, { en: '8', hi: '8' }
    ],
    answer: 1,
    explain: {
      en: 'Mixing water pH should not be less than 6. Acidic water can affect setting and durability.',
      hi: 'मिक्सिंग पानी का pH 6 से कम नहीं होना चाहिए। अम्लीय पानी सेटिंग और ड्यूरेबिलिटी पर असर डालता है।'
    },
    ref: 'IS 456:2000, Cl. 5.4', verified: false
  },
  {
    id: 'c08', discipline: 'civil', topic: 'Reinforcement',
    q: {
      en: 'What does "Fe 500" mean for a reinforcement bar?',
      hi: 'रीइन्फोर्समेंट बार में "Fe 500" का क्या अर्थ है?'
    },
    options: [
      { en: 'Ultimate tensile strength 500 N/mm²', hi: 'अल्टीमेट टेन्साइल स्ट्रेंथ 500 N/mm²' },
      { en: 'Characteristic yield strength 500 N/mm²', hi: 'कैरेक्टरिस्टिक यील्ड स्ट्रेंथ 500 N/mm²' },
      { en: '500 kg per bundle', hi: 'प्रति बंडल 500 kg' },
      { en: '500 mm bend radius', hi: '500 mm बेंड रेडियस' }
    ],
    answer: 1,
    explain: {
      en: 'Fe 500 means a characteristic yield (or 0.2% proof) strength of 500 N/mm². Requirements for HSD bars are in IS 1786.',
      hi: 'Fe 500 का अर्थ है 500 N/mm² की कैरेक्टरिस्टिक यील्ड (या 0.2% प्रूफ) स्ट्रेंथ। HSD बार की आवश्यकताएँ IS 1786 में हैं।'
    },
    ref: 'IS 1786', verified: false
  },
  {
    id: 'c09', discipline: 'civil', topic: 'Testing',
    q: {
      en: 'Which IS code covers methods of sampling and testing fresh concrete (e.g. slump test)?',
      hi: 'फ्रेश कंक्रीट की सैंपलिंग और टेस्टिंग (जैसे स्लम्प टेस्ट) के तरीके किस IS कोड में हैं?'
    },
    options: [
      { en: 'IS 456', hi: 'IS 456' }, { en: 'IS 1199', hi: 'IS 1199' },
      { en: 'IS 383', hi: 'IS 383' }, { en: 'IS 2502', hi: 'IS 2502' }
    ],
    answer: 1,
    explain: {
      en: 'IS 1199 covers sampling and testing of fresh concrete. IS 383 is for aggregates and IS 2502 is for bending and fixing of bars.',
      hi: 'IS 1199 फ्रेश कंक्रीट की सैंपलिंग और टेस्टिंग के लिए है। IS 383 एग्रीगेट के लिए और IS 2502 बार बेंडिंग और फिक्सिंग के लिए है।'
    },
    ref: 'IS 1199', verified: false
  },
  {
    id: 'c10', discipline: 'civil', topic: 'Materials',
    q: {
      en: 'Which IS code specifies coarse and fine aggregates for concrete?',
      hi: 'कंक्रीट के कोर्स और फाइन एग्रीगेट किस IS कोड में स्पेसिफ़ाई हैं?'
    },
    options: [
      { en: 'IS 383', hi: 'IS 383' }, { en: 'IS 269', hi: 'IS 269' },
      { en: 'IS 1786', hi: 'IS 1786' }, { en: 'IS 800', hi: 'IS 800' }
    ],
    answer: 0,
    explain: {
      en: 'IS 383 covers aggregates. IS 269 is OPC, IS 1786 is HSD reinforcement and IS 800 is structural steel design.',
      hi: 'IS 383 एग्रीगेट के लिए है। IS 269 OPC, IS 1786 HSD रीइन्फोर्समेंट और IS 800 स्ट्रक्चरल स्टील डिज़ाइन के लिए है।'
    },
    ref: 'IS 383', verified: false
  },
  {
    id: 'c11', discipline: 'civil', topic: 'Reinforcement',
    q: {
      en: 'Which IS code covers bending and fixing of bars for concrete reinforcement?',
      hi: 'कंक्रीट रीइन्फोर्समेंट के लिए बार बेंडिंग और फिक्सिंग किस IS कोड में है?'
    },
    options: [
      { en: 'IS 2502', hi: 'IS 2502' }, { en: 'IS 516', hi: 'IS 516' },
      { en: 'IS 3696', hi: 'IS 3696' }, { en: 'IS 10262', hi: 'IS 10262' }
    ],
    answer: 0,
    explain: {
      en: 'IS 2502 covers bending and fixing of bars (useful for BBS). IS 10262 is the concrete mix design guideline.',
      hi: 'IS 2502 बार बेंडिंग और फिक्सिंग के लिए है (BBS में काम आता है)। IS 10262 कंक्रीट मिक्स डिज़ाइन की गाइडलाइन है।'
    },
    ref: 'IS 2502', verified: false
  },
  {
    id: 'c12', discipline: 'civil', topic: 'Excavation',
    q: {
      en: 'Excavated soil (spoil) should be kept at least how far back from the edge of a trench?',
      hi: 'खुदाई की मिट्टी (स्पॉइल) ट्रेंच के किनारे से कम से कम कितनी दूर रखनी चाहिए?'
    },
    options: [
      { en: '0.3 m', hi: '0.3 m' }, { en: '0.6 m (2 ft)', hi: '0.6 m (2 फ़ीट)' },
      { en: '1.5 m', hi: '1.5 m' }, { en: 'No limit', hi: 'कोई सीमा नहीं' }
    ],
    answer: 1,
    explain: {
      en: 'OSHA requires spoil and materials at least 0.6 m (2 ft) from the edge. This stops material falling in and reduces surcharge on the trench wall.',
      hi: 'OSHA के अनुसार स्पॉइल और सामग्री किनारे से कम से कम 0.6 m (2 फ़ीट) दूर हो। इससे सामग्री अंदर नहीं गिरती और दीवार पर सरचार्ज कम रहता है।'
    },
    ref: 'OSHA 29 CFR 1926.651(j)(2)', verified: false
  },
  {
    id: 'c13', discipline: 'civil', topic: 'Case study',
    q: {
      en: 'Burj Khalifa (Dubai, 828 m) uses which main structural system?',
      hi: 'बुर्ज खलीफा (दुबई, 828 m) में मुख्य स्ट्रक्चरल सिस्टम कौन सा है?'
    },
    options: [
      { en: 'Steel diagrid', hi: 'स्टील डायग्रिड' },
      { en: 'Y-shaped buttressed core', hi: 'Y-आकार का बट्रेस्ड कोर' },
      { en: 'Load-bearing masonry', hi: 'लोड-बेयरिंग मेसनरी' },
      { en: 'Flat slab only', hi: 'केवल फ्लैट स्लैब' }
    ],
    answer: 1,
    explain: {
      en: 'A hexagonal central core is buttressed by three wings in a Y-shape. This gives high stiffness against wind and reduces wind vortex effects.',
      hi: 'षट्कोणीय सेंट्रल कोर को तीन विंग्स Y-आकार में सहारा देते हैं। इससे हवा के खिलाफ़ ज़्यादा स्टिफ़नेस मिलती है और विंड वोर्टेक्स का असर कम होता है।'
    },
    ref: 'Case study: Burj Khalifa (SOM)', verified: false
  },
  {
    id: 'c14', discipline: 'civil', topic: 'Case study',
    q: {
      en: 'Delhi Metro (DMRC) underground tunnels between stations are mainly built using:',
      hi: 'दिल्ली मेट्रो (DMRC) में स्टेशनों के बीच अंडरग्राउंड टनल मुख्यतः किससे बनाई जाती हैं?'
    },
    options: [
      { en: 'Tunnel Boring Machine (TBM)', hi: 'टनल बोरिंग मशीन (TBM)' },
      { en: 'Drill and blast', hi: 'ड्रिल एंड ब्लास्ट' },
      { en: 'Immersed tube', hi: 'इमर्स्ड ट्यूब' },
      { en: 'Open caisson', hi: 'ओपन कैसन' }
    ],
    answer: 0,
    explain: {
      en: 'TBMs bore through the soft urban ground with little surface disruption. Stations are usually built by cut-and-cover.',
      hi: 'TBM शहरी नरम ज़मीन में सतह पर कम रुकावट के साथ खुदाई करती है। स्टेशन आमतौर पर कट-एंड-कवर से बनते हैं।'
    },
    ref: 'Case study: DMRC', verified: false
  },

  // ───────────── SAFETY ─────────────
  {
    id: 's01', discipline: 'safety', topic: 'Work at height',
    q: {
      en: 'Under OSHA construction rules, fall protection is required at heights of:',
      hi: 'OSHA कंस्ट्रक्शन नियमों के अनुसार फ़ॉल प्रोटेक्शन कितनी ऊँचाई पर ज़रूरी है?'
    },
    options: [
      { en: '1 m (3 ft) or more', hi: '1 m (3 फ़ीट) या ज़्यादा' },
      { en: '1.8 m (6 ft) or more', hi: '1.8 m (6 फ़ीट) या ज़्यादा' },
      { en: '3 m (10 ft) or more', hi: '3 m (10 फ़ीट) या ज़्यादा' },
      { en: '6 m (20 ft) or more', hi: '6 m (20 फ़ीट) या ज़्यादा' }
    ],
    answer: 1,
    explain: {
      en: 'OSHA construction requires fall protection at 6 ft (1.8 m) or more. Many Indian sites apply a stricter project rule, so always follow the project HSE plan.',
      hi: 'OSHA कंस्ट्रक्शन में 6 फ़ीट (1.8 m) या ज़्यादा पर फ़ॉल प्रोटेक्शन ज़रूरी है। कई भारतीय साइट्स पर प्रोजेक्ट नियम और सख़्त होते हैं, इसलिए हमेशा प्रोजेक्ट HSE प्लान मानें।'
    },
    ref: 'OSHA 29 CFR 1926.501(b)(1)', verified: false
  },
  {
    id: 's02', discipline: 'safety', topic: 'Work at height',
    q: {
      en: 'Top rail height of a guardrail system (OSHA) is about:',
      hi: 'गार्डरेल सिस्टम में टॉप रेल की ऊँचाई (OSHA) लगभग कितनी होती है?'
    },
    options: [
      { en: '0.6 m', hi: '0.6 m' }, { en: '0.9 m', hi: '0.9 m' },
      { en: '1.07 m (42 in ± 3 in)', hi: '1.07 m (42 इंच ± 3 इंच)' }, { en: '1.5 m', hi: '1.5 m' }
    ],
    answer: 2,
    explain: {
      en: 'The top rail is 42 in ± 3 in (about 1.07 m) above the walking level. A mid-rail and toe board are also required.',
      hi: 'टॉप रेल वॉकिंग लेवल से 42 इंच ± 3 इंच (लगभग 1.07 m) ऊपर होती है। साथ में मिड-रेल और टो बोर्ड भी ज़रूरी हैं।'
    },
    ref: 'OSHA 29 CFR 1926.502(b)(1)', verified: false
  },
  {
    id: 's03', discipline: 'safety', topic: 'Ladders',
    q: {
      en: 'The "4:1 rule" for a leaning ladder gives an angle of about:',
      hi: 'झुकी हुई सीढ़ी के लिए "4:1 नियम" से लगभग कितना कोण बनता है?'
    },
    options: [
      { en: '45°', hi: '45°' }, { en: '60°', hi: '60°' },
      { en: '75°', hi: '75°' }, { en: '85°', hi: '85°' }
    ],
    answer: 2,
    explain: {
      en: 'For every 4 units of height, the base is 1 unit out from the wall. That is about 75° to the ground.',
      hi: 'हर 4 यूनिट ऊँचाई पर सीढ़ी का बेस दीवार से 1 यूनिट दूर होता है। यह ज़मीन से लगभग 75° होता है।'
    },
    ref: 'OSHA 29 CFR 1926.1053(b)(5)(i)', verified: false
  },
  {
    id: 's04', discipline: 'safety', topic: 'Ladders',
    q: {
      en: 'A ladder used for access should extend above the landing by at least:',
      hi: 'एक्सेस के लिए लगी सीढ़ी लैंडिंग से कम से कम कितनी ऊपर निकलनी चाहिए?'
    },
    options: [
      { en: '0.3 m', hi: '0.3 m' }, { en: '0.5 m', hi: '0.5 m' },
      { en: 'About 1 m (3 ft)', hi: 'लगभग 1 m (3 फ़ीट)' }, { en: '2 m', hi: '2 m' }
    ],
    answer: 2,
    explain: {
      en: 'Side rails should extend at least 3 ft (about 0.9–1 m) above the landing, so the worker has a handhold when getting on and off.',
      hi: 'साइड रेल लैंडिंग से कम से कम 3 फ़ीट (लगभग 0.9–1 m) ऊपर हो, ताकि चढ़ते-उतरते समय पकड़ने की जगह मिले।'
    },
    ref: 'OSHA 29 CFR 1926.1053(b)(1)', verified: false
  },
  {
    id: 's05', discipline: 'safety', topic: 'Confined space',
    q: {
      en: 'Safe oxygen range for entry into a confined space (e.g. STP wet well, manhole):',
      hi: 'कन्फ़ाइंड स्पेस (जैसे STP वेट वेल, मैनहोल) में प्रवेश के लिए सुरक्षित ऑक्सीजन रेंज:'
    },
    options: [
      { en: '16% – 19%', hi: '16% – 19%' }, { en: '19.5% – 23.5%', hi: '19.5% – 23.5%' },
      { en: '23.5% – 28%', hi: '23.5% – 28%' }, { en: 'Anything above 15%', hi: '15% से ऊपर कुछ भी' }
    ],
    answer: 1,
    explain: {
      en: 'Below 19.5% is oxygen-deficient and above 23.5% is oxygen-enriched (fire risk). Test before entry and monitor continuously.',
      hi: '19.5% से कम ऑक्सीजन की कमी है और 23.5% से ज़्यादा ऑक्सीजन-एनरिच्ड (आग का ख़तरा)। प्रवेश से पहले जाँचें और लगातार मॉनिटर करें।'
    },
    ref: 'OSHA 29 CFR 1910.146', verified: false
  },
  {
    id: 's06', discipline: 'safety', topic: 'Confined space',
    q: {
      en: 'In sewers and STPs, why is the "rotten egg" smell of H₂S NOT a reliable warning?',
      hi: 'सीवर और STP में H₂S की "सड़े अंडे" जैसी गंध भरोसेमंद चेतावनी क्यों नहीं है?'
    },
    options: [
      { en: 'H₂S has no smell', hi: 'H₂S में कोई गंध नहीं होती' },
      { en: 'At high concentration it deadens the sense of smell', hi: 'ज़्यादा सांद्रता पर यह सूंघने की क्षमता ख़त्म कर देती है' },
      { en: 'It smells only in winter', hi: 'गंध केवल सर्दियों में आती है' },
      { en: 'It is lighter than air and escapes', hi: 'यह हवा से हल्की है और निकल जाती है' }
    ],
    answer: 1,
    explain: {
      en: 'High H₂S levels paralyse the sense of smell, so a worker may think the gas is gone. H₂S is heavier than air and collects in low points. Always use a calibrated gas detector.',
      hi: 'ज़्यादा H₂S सूंघने की क्षमता को सुन्न कर देती है, इसलिए वर्कर को लगता है गैस चली गई। H₂S हवा से भारी है और निचले हिस्सों में जमा होती है। हमेशा कैलिब्रेटेड गैस डिटेक्टर का उपयोग करें।'
    },
    ref: 'General industrial hygiene (NIOSH/OSHA H₂S guidance)', verified: false
  },
  {
    id: 's07', discipline: 'safety', topic: 'Confined space',
    q: {
      en: 'During confined space entry, who must stay outside at the entry point the whole time?',
      hi: 'कन्फ़ाइंड स्पेस एंट्री के दौरान पूरे समय एंट्री पॉइंट पर बाहर किसे रहना चाहिए?'
    },
    options: [
      { en: 'Site manager', hi: 'साइट मैनेजर' },
      { en: 'Standby attendant (hole watch)', hi: 'स्टैंडबाय अटेंडेंट (होल वॉच)' },
      { en: 'Nobody, if gas test is OK', hi: 'कोई नहीं, अगर गैस टेस्ट ठीक है' },
      { en: 'Security guard', hi: 'सिक्योरिटी गार्ड' }
    ],
    answer: 1,
    explain: {
      en: 'A trained attendant stays outside, keeps contact with entrants and calls rescue. The attendant must NOT enter to rescue unless trained and equipped.',
      hi: 'एक प्रशिक्षित अटेंडेंट बाहर रहकर अंदर गए लोगों से संपर्क रखता है और रेस्क्यू बुलाता है। बिना ट्रेनिंग और उपकरण के अटेंडेंट ख़ुद अंदर नहीं जाता।'
    },
    ref: 'OSHA 29 CFR 1910.146(i)', verified: false
  },
  {
    id: 's08', discipline: 'safety', topic: 'Excavation',
    q: {
      en: 'Under OSHA, a protective system (shoring/sloping/shield) is required for trenches of depth:',
      hi: 'OSHA के अनुसार कितनी गहराई की ट्रेंच में प्रोटेक्टिव सिस्टम (शोरिंग/स्लोपिंग/शील्ड) ज़रूरी है?'
    },
    options: [
      { en: '0.5 m or more', hi: '0.5 m या ज़्यादा' }, { en: '1.0 m or more', hi: '1.0 m या ज़्यादा' },
      { en: '1.5 m (5 ft) or more', hi: '1.5 m (5 फ़ीट) या ज़्यादा' }, { en: '3.0 m or more', hi: '3.0 m या ज़्यादा' }
    ],
    answer: 2,
    explain: {
      en: 'Trenches 1.5 m (5 ft) or deeper need a protective system unless they are in stable rock. A shallower trench can also need one if a competent person sees a cave-in risk.',
      hi: '1.5 m (5 फ़ीट) या ज़्यादा गहरी ट्रेंच में प्रोटेक्टिव सिस्टम ज़रूरी है, जब तक वह स्टेबल रॉक में न हो। सक्षम व्यक्ति धंसने का ख़तरा देखे तो कम गहराई पर भी ज़रूरी है।'
    },
    ref: 'OSHA 29 CFR 1926.652(a)(1)', verified: false
  },
  {
    id: 's09', discipline: 'safety', topic: 'Work at height',
    q: {
      en: 'An anchorage for a personal fall arrest system should support per worker at least:',
      hi: 'पर्सनल फ़ॉल अरेस्ट सिस्टम का एंकरेज प्रति वर्कर कम से कम कितना लोड सहे?'
    },
    options: [
      { en: '5 kN', hi: '5 kN' }, { en: '10 kN', hi: '10 kN' },
      { en: '22.2 kN (5,000 lb)', hi: '22.2 kN (5,000 lb)' }, { en: '50 kN', hi: '50 kN' }
    ],
    answer: 2,
    explain: {
      en: 'The OSHA requirement is 5,000 lb (about 22.2 kN) per attached worker, unless a qualified person designs it with a safety factor of 2.',
      hi: 'OSHA की आवश्यकता प्रति जुड़े वर्कर 5,000 lb (लगभग 22.2 kN) है, जब तक क्वालिफ़ाइड व्यक्ति सेफ़्टी फ़ैक्टर 2 के साथ डिज़ाइन न करे।'
    },
    ref: 'OSHA 29 CFR 1926.502(d)(15)', verified: false
  },
  {
    id: 's10', discipline: 'safety', topic: 'Scaffolding',
    q: {
      en: 'Which Indian Standard is the safety code for scaffolds?',
      hi: 'स्कैफ़ोल्ड की सेफ़्टी के लिए कौन सा भारतीय मानक (IS) है?'
    },
    options: [
      { en: 'IS 3696 (Part 1)', hi: 'IS 3696 (भाग 1)' }, { en: 'IS 456', hi: 'IS 456' },
      { en: 'IS 800', hi: 'IS 800' }, { en: 'IS 1786', hi: 'IS 1786' }
    ],
    answer: 0,
    explain: {
      en: 'IS 3696 Part 1 is the safety code for scaffolds and Part 2 covers ladders.',
      hi: 'IS 3696 भाग 1 स्कैफ़ोल्ड का सेफ़्टी कोड है और भाग 2 सीढ़ियों के लिए है।'
    },
    ref: 'IS 3696 (Part 1)', verified: false
  },
  {
    id: 's11', discipline: 'safety', topic: 'Law',
    q: {
      en: 'Which Indian Act specifically covers safety and welfare of building and construction workers?',
      hi: 'भवन और निर्माण श्रमिकों की सुरक्षा और कल्याण के लिए विशेष रूप से कौन सा अधिनियम है?'
    },
    options: [
      { en: 'Mines Act, 1952', hi: 'खान अधिनियम, 1952' },
      { en: 'BOCW Act, 1996', hi: 'BOCW अधिनियम, 1996' },
      { en: 'Motor Vehicles Act, 1988', hi: 'मोटर वाहन अधिनियम, 1988' },
      { en: 'Indian Contract Act, 1872', hi: 'भारतीय संविदा अधिनियम, 1872' }
    ],
    answer: 1,
    explain: {
      en: 'The Building and Other Construction Workers Act, 1996 and its Central Rules (1998) cover construction safety. Many of its provisions are now being merged into the OSH Code, 2020.',
      hi: 'भवन और अन्य निर्माण श्रमिक अधिनियम, 1996 और उसके केंद्रीय नियम (1998) निर्माण सुरक्षा को कवर करते हैं। इसके कई प्रावधान अब OSH कोड, 2020 में शामिल किए जा रहे हैं।'
    },
    ref: 'BOCW Act 1996; OSH Code 2020', verified: false
  },
  {
    id: 's12', discipline: 'safety', topic: 'Fire',
    q: {
      en: 'Best extinguisher for a fire in a live electrical panel:',
      hi: 'चालू इलेक्ट्रिकल पैनल में आग के लिए सबसे अच्छा एक्सटिंग्विशर:'
    },
    options: [
      { en: 'Water', hi: 'पानी' }, { en: 'CO₂', hi: 'CO₂' },
      { en: 'Foam', hi: 'फ़ोम' }, { en: 'Wet sand', hi: 'गीली रेत' }
    ],
    answer: 1,
    explain: {
      en: 'CO₂ does not conduct electricity and leaves no residue. Water and foam conduct electricity. Isolate the power supply first if you can do it safely.',
      hi: 'CO₂ बिजली का संचालन नहीं करता और कोई अवशेष नहीं छोड़ता। पानी और फ़ोम बिजली का संचालन करते हैं। सुरक्षित हो तो पहले बिजली सप्लाई काटें।'
    },
    ref: 'IS 2190 (selection of extinguishers)', verified: false
  },
  {
    id: 's13', discipline: 'safety', topic: 'Scaffolding',
    q: {
      en: 'On most sites, a GREEN scaffold tag means:',
      hi: 'ज़्यादातर साइट्स पर हरे (GREEN) स्कैफ़ोल्ड टैग का अर्थ है:'
    },
    options: [
      { en: 'Under construction, do not use', hi: 'निर्माणाधीन, उपयोग न करें' },
      { en: 'Inspected and safe to use', hi: 'जाँचा गया, उपयोग के लिए सुरक्षित' },
      { en: 'Use only with harness, restricted', hi: 'केवल हार्नेस के साथ, प्रतिबंधित' },
      { en: 'Scheduled for dismantling', hi: 'हटाने के लिए निर्धारित' }
    ],
    answer: 1,
    explain: {
      en: 'Common practice: green means safe to use, yellow means restricted use with conditions, and red means do not use. Always follow your site tagging procedure.',
      hi: 'सामान्य प्रथा: हरा मतलब उपयोग के लिए सुरक्षित, पीला मतलब शर्तों के साथ प्रतिबंधित उपयोग, लाल मतलब उपयोग न करें। हमेशा अपनी साइट की टैगिंग प्रक्रिया मानें।'
    },
    ref: 'Common site practice (scaffold tagging)', verified: false
  },

  // ───────────── CIVIL (batch 2, English only) ─────────────
  {
    id: 'c15', discipline: 'civil', topic: 'Concrete',
    q: { en: 'As per IS 456:2000, what is the maximum free water-cement ratio for RCC under "mild" exposure?' },
    options: [ { en: '0.45' }, { en: '0.50' }, { en: '0.55' }, { en: '0.60' } ],
    answer: 2,
    explain: { en: 'For RCC under mild exposure the maximum w/c ratio is 0.55. It drops to 0.50 for moderate, 0.45 for severe and 0.40 for extreme exposure. Extra water weakens concrete and makes it more permeable.' },
    ref: 'IS 456:2000, Table 5', verified: false
  },
  {
    id: 'c16', discipline: 'civil', topic: 'Concrete',
    q: { en: 'As per IS 456:2000, what is the minimum cement content for RCC under "mild" exposure?' },
    options: [ { en: '250 kg/m³' }, { en: '300 kg/m³' }, { en: '320 kg/m³' }, { en: '360 kg/m³' } ],
    answer: 1,
    explain: { en: 'Minimum cement content for RCC under mild exposure is 300 kg/m³. It increases with exposure: 300 (moderate), 320 (severe), 340 (very severe) and 360 (extreme).' },
    ref: 'IS 456:2000, Table 5', verified: false
  },
  {
    id: 'c17', discipline: 'civil', topic: 'Concrete',
    q: { en: 'As per IS 456:2000, what is the nominal cover for "moderate" exposure?' },
    options: [ { en: '20 mm' }, { en: '30 mm' }, { en: '45 mm' }, { en: '75 mm' } ],
    answer: 1,
    explain: { en: 'Nominal cover: mild 20 mm, moderate 30 mm, severe 45 mm, very severe 50 mm, extreme 75 mm. Sewage and STP structures are usually treated as severe or worse.' },
    ref: 'IS 456:2000, Cl. 26.4.2, Table 16', verified: false
  },
  {
    id: 'c18', discipline: 'civil', topic: 'Testing',
    q: { en: 'As per IS 456, how many test specimens (cubes) make up one sample for compressive strength?' },
    options: [ { en: '1' }, { en: '2' }, { en: '3' }, { en: '6' } ],
    answer: 2,
    explain: { en: 'Three specimens are made for each sample. The average of the three is the test result, provided no individual value differs from the average by more than ±15%.' },
    ref: 'IS 456:2000, Cl. 15.2.2 and 15.4', verified: false
  },
  {
    id: 'c19', discipline: 'civil', topic: 'Testing',
    q: { en: 'On a day you pour 20 m³ of concrete, what is the minimum number of samples to take as per IS 456?' },
    options: [ { en: '1' }, { en: '2' }, { en: '3' }, { en: '4' } ],
    answer: 2,
    explain: { en: 'Sampling frequency: 1–5 m³ → 1 sample; 6–15 m³ → 2; 16–30 m³ → 3; 31–50 m³ → 4; above 50 m³ → 4 plus 1 for each extra 50 m³ or part of it.' },
    ref: 'IS 456:2000, Cl. 15.2.2', verified: false
  },
  {
    id: 'c20', discipline: 'civil', topic: 'Concrete',
    q: { en: 'In the target mean strength formula f\'ck = fck + 1.65 s, what does the factor 1.65 mean?' },
    options: [
      { en: 'Factor of safety for steel' },
      { en: 'Only 5% of test results are expected to fall below fck' },
      { en: 'Ratio of cube to cylinder strength' },
      { en: '65% extra cement is added' }
    ],
    answer: 1,
    explain: { en: 'fck is the "characteristic" strength: the value below which not more than 5% of results are expected to fall. For a normal distribution, 5% corresponds to 1.65 standard deviations below the mean.' },
    ref: 'IS 10262:2019; IS 456:2000, Cl. 6.1.1', verified: false
  },
  {
    id: 'c21', discipline: 'civil', topic: 'Testing',
    q: { en: 'For M25 concrete, an individual test result must not be less than (IS 456 acceptance criteria):' },
    options: [ { en: '20 N/mm²' }, { en: '21 N/mm²' }, { en: '22.5 N/mm²' }, { en: '25 N/mm²' } ],
    answer: 1,
    explain: { en: 'For M20 and above, each individual test result must be at least fck − 4 N/mm², so 25 − 4 = 21 N/mm². The mean of 4 consecutive results must also meet its own limit.' },
    ref: 'IS 456:2000, Cl. 16, Table 11', verified: false
  },
  {
    id: 'c22', discipline: 'civil', topic: 'Materials',
    q: { en: 'As per IS 269, the initial setting time of OPC must be not less than:' },
    options: [ { en: '10 minutes' }, { en: '30 minutes' }, { en: '60 minutes' }, { en: '600 minutes' } ],
    answer: 1,
    explain: { en: 'Initial setting time: not less than 30 minutes, so there is time to mix, transport and place. Final setting time: not more than 600 minutes.' },
    ref: 'IS 269', verified: false
  },
  {
    id: 'c23', discipline: 'civil', topic: 'Materials',
    q: { en: 'Cement bags in a site store should normally be stacked no higher than:' },
    options: [ { en: '5 bags' }, { en: '10 bags' }, { en: '15 bags' }, { en: '20 bags' } ],
    answer: 1,
    explain: { en: 'Stack up to about 10 bags high to avoid lumping under pressure. Keep stacks on a raised platform, away from walls, and use cement first-in first-out.' },
    ref: 'IS 4082 (storage of materials)', verified: false
  },
  {
    id: 'c24', discipline: 'civil', topic: 'Reinforcement',
    q: { en: 'As per IS 456, the lap length for bars in flexural tension should be at least:' },
    options: [
      { en: '20φ' },
      { en: 'Ld or 30φ, whichever is greater' },
      { en: '2Ld or 30φ, whichever is greater' },
      { en: '15φ or 200 mm' }
    ],
    answer: 1,
    explain: { en: 'Flexural tension: Ld or 30φ, whichever is greater. Direct tension: 2Ld or 30φ, whichever is greater. Straight lap length should not be less than 15φ or 200 mm.' },
    ref: 'IS 456:2000, Cl. 26.2.5.1', verified: false
  },
  {
    id: 'c25', discipline: 'civil', topic: 'Reinforcement',
    q: { en: 'Maximum spacing of main bars in a solid slab (IS 456) is the smaller of:' },
    options: [ { en: '2d or 200 mm' }, { en: '3d or 300 mm' }, { en: '5d or 450 mm' }, { en: '4d or 400 mm' } ],
    answer: 1,
    explain: { en: 'Main bars: 3 × effective depth or 300 mm, whichever is smaller. Distribution bars: 5d or 450 mm, whichever is smaller.' },
    ref: 'IS 456:2000, Cl. 26.3.3(b)', verified: false
  },
  {
    id: 'c26', discipline: 'civil', topic: 'Reinforcement',
    q: { en: 'Minimum reinforcement in each direction of a slab using HYSD (Fe 415/500) bars:' },
    options: [ { en: '0.08% of gross area' }, { en: '0.12% of gross area' }, { en: '0.15% of gross area' }, { en: '0.8% of gross area' } ],
    answer: 1,
    explain: { en: '0.12% of the gross cross-section for HYSD bars and 0.15% for mild steel. This controls shrinkage and temperature cracking.' },
    ref: 'IS 456:2000, Cl. 26.5.2.1', verified: false
  },
  {
    id: 'c27', discipline: 'civil', topic: 'Reinforcement',
    q: { en: 'Minimum longitudinal reinforcement in an RCC column as per IS 456:' },
    options: [ { en: '0.4%' }, { en: '0.8%' }, { en: '2%' }, { en: '6%' } ],
    answer: 1,
    explain: { en: 'Minimum 0.8% and maximum 6% of the gross area (4% is the practical limit because of congestion at laps).' },
    ref: 'IS 456:2000, Cl. 26.5.3.1', verified: false
  },
  {
    id: 'c28', discipline: 'civil', topic: 'Reinforcement',
    q: { en: 'Minimum diameter of longitudinal bars in an RCC column (IS 456):' },
    options: [ { en: '8 mm' }, { en: '10 mm' }, { en: '12 mm' }, { en: '16 mm' } ],
    answer: 2,
    explain: { en: 'Longitudinal bars must be at least 12 mm. A rectangular column needs at least 4 bars and a circular column at least 6.' },
    ref: 'IS 456:2000, Cl. 26.5.3.1', verified: false
  },
  {
    id: 'c29', discipline: 'civil', topic: 'Materials',
    q: { en: 'IS 383 divides fine aggregate (sand) into grading zones. Which zone is the coarsest?' },
    options: [ { en: 'Zone I' }, { en: 'Zone II' }, { en: 'Zone III' }, { en: 'Zone IV' } ],
    answer: 0,
    explain: { en: 'Zone I is the coarsest and Zone IV the finest. Zone II is most commonly preferred for structural concrete. Very fine sand needs more water and cement.' },
    ref: 'IS 383', verified: false
  },
  {
    id: 'c30', discipline: 'civil', topic: 'Testing',
    q: { en: 'Dimensions of the standard slump cone (bottom dia × top dia × height):' },
    options: [ { en: '100 × 50 × 150 mm' }, { en: '200 × 100 × 300 mm' }, { en: '300 × 150 × 450 mm' }, { en: '150 × 150 × 150 mm' } ],
    answer: 1,
    explain: { en: 'Bottom 200 mm, top 100 mm, height 300 mm. Fill in 4 layers, rod each layer 25 times with a 16 mm rod, lift the cone vertically and measure the drop.' },
    ref: 'IS 1199; IS 7320', verified: false
  },
  {
    id: 'c31', discipline: 'civil', topic: 'Materials',
    q: { en: 'Water absorption of common burnt clay bricks (class up to 12.5) should not exceed:' },
    options: [ { en: '10% by weight' }, { en: '15% by weight' }, { en: '20% by weight' }, { en: '30% by weight' } ],
    answer: 2,
    explain: { en: 'After 24 hours immersion in cold water, absorption should not be more than 20% by weight for classes up to 12.5 (15% for higher classes).' },
    ref: 'IS 1077; test per IS 3495', verified: false
  },
  {
    id: 'c32', discipline: 'civil', topic: 'Sewerage',
    q: { en: 'As per the CPHEEO Manual, the minimum self-cleansing velocity in a sanitary sewer is about:' },
    options: [ { en: '0.3 m/s' }, { en: '0.6 m/s' }, { en: '1.5 m/s' }, { en: '3.0 m/s' } ],
    answer: 1,
    explain: { en: 'About 0.6 m/s keeps solids from settling. Velocities above about 3 m/s can erode the sewer, so the maximum is also limited.' },
    ref: 'CPHEEO Manual on Sewerage and Sewage Treatment (2013)', verified: false
  },
  {
    id: 'c33', discipline: 'civil', topic: 'Sewerage',
    q: { en: 'Which IS code covers concrete structures for storing liquids (tanks, STP units)?' },
    options: [ { en: 'IS 456' }, { en: 'IS 3370' }, { en: 'IS 1893' }, { en: 'IS 875' } ],
    answer: 1,
    explain: { en: 'IS 3370 covers liquid-retaining structures, with tighter crack-width limits than normal RCC. IS 1893 is seismic design and IS 875 is design loads.' },
    ref: 'IS 3370 (Parts 1–4)', verified: false
  },
  {
    id: 'c34', discipline: 'civil', topic: 'Case study',
    q: { en: 'The Chenab Rail Bridge in Jammu & Kashmir is known as the world\'s highest railway bridge of which type?' },
    options: [ { en: 'Suspension' }, { en: 'Cable-stayed' }, { en: 'Arch' }, { en: 'Truss girder' } ],
    answer: 2,
    explain: { en: 'It is a steel arch bridge about 359 m above the Chenab river bed, built for the USBRL project with high wind and blast resistance.' },
    ref: 'Case study: Chenab Bridge (USBRL, Indian Railways)', verified: false
  },
  {
    id: 'c35', discipline: 'civil', topic: 'Case study',
    q: { en: 'The Atal Tunnel (Rohtang, Himachal Pradesh) was excavated mainly using:' },
    options: [ { en: 'Tunnel Boring Machine' }, { en: 'New Austrian Tunnelling Method (NATM)' }, { en: 'Cut and cover' }, { en: 'Immersed tube' } ],
    answer: 1,
    explain: { en: 'NATM (drill and blast with shotcrete and rock bolts) suits variable Himalayan rock. Compare with DMRC, where TBMs are used in soft urban ground.' },
    ref: 'Case study: Atal Tunnel (BRO)', verified: false
  },

  // ───────────── SAFETY (batch 2, English only) ─────────────
  {
    id: 's14', discipline: 'safety', topic: 'PPE',
    q: { en: 'Which Indian Standard covers industrial safety helmets?' },
    options: [ { en: 'IS 2925' }, { en: 'IS 3521' }, { en: 'IS 15298' }, { en: 'IS 3696' } ],
    answer: 0,
    explain: { en: 'IS 2925 is for industrial safety helmets. IS 3521 is safety belts and harnesses, IS 15298 is safety footwear and IS 3696 is scaffolds and ladders.' },
    ref: 'IS 2925', verified: false
  },
  {
    id: 's15', discipline: 'safety', topic: 'PPE',
    q: { en: 'Which Indian Standard covers industrial safety belts and full body harnesses?' },
    options: [ { en: 'IS 2925' }, { en: 'IS 3521' }, { en: 'IS 2190' }, { en: 'IS 1786' } ],
    answer: 1,
    explain: { en: 'IS 3521 covers safety belts and harnesses. For fall arrest, a full body harness is used, never a waist belt.' },
    ref: 'IS 3521', verified: false
  },
  {
    id: 's16', discipline: 'safety', topic: 'Electrical',
    q: { en: 'For protection of people against electric shock, an RCCB/ELCB should trip at a residual current of:' },
    options: [ { en: '10 A' }, { en: '300 mA' }, { en: '100 mA' }, { en: '30 mA' } ],
    answer: 3,
    explain: { en: '30 mA RCCBs are used for personal protection. 100–300 mA devices protect against fire, not shock. Test the RCCB with its test button regularly.' },
    ref: 'General electrical safety practice (IS 12640 RCCBs)', verified: false
  },
  {
    id: 's17', discipline: 'safety', topic: 'Electrical',
    q: { en: 'What is the main purpose of Lockout/Tagout (LOTO)?' },
    options: [
      { en: 'To lock the site store at night' },
      { en: 'To isolate energy sources and stop machines being switched on during maintenance' },
      { en: 'To record attendance' },
      { en: 'To tag defective PPE' }
    ],
    answer: 1,
    explain: { en: 'Each worker puts their own lock and tag on the isolation point, then checks for zero energy before starting. Only the person who applied a lock removes it.' },
    ref: 'OSHA 29 CFR 1910.147', verified: false
  },
  {
    id: 's18', discipline: 'safety', topic: 'Fire',
    q: { en: 'A fire involving diesel or other flammable liquids is classified as:' },
    options: [ { en: 'Class A' }, { en: 'Class B' }, { en: 'Class C' }, { en: 'Class D' } ],
    answer: 1,
    explain: { en: 'Class A: ordinary solids (wood, paper). Class B: flammable liquids. Class C: flammable gases. Class D: metals. Use foam, DCP or CO₂ on Class B, never a water jet.' },
    ref: 'IS 2190 / IS 15683', verified: false
  },
  {
    id: 's19', discipline: 'safety', topic: 'Fire',
    q: { en: 'When using a fire extinguisher (PASS method), where should you aim?' },
    options: [ { en: 'At the top of the flames' }, { en: 'At the base of the fire' }, { en: 'At the smoke' }, { en: 'Above the fire' } ],
    answer: 1,
    explain: { en: 'PASS: Pull the pin, Aim at the base of the fire, Squeeze the handle, Sweep side to side. Keep your exit behind you.' },
    ref: 'General fire safety practice', verified: false
  },
  {
    id: 's20', discipline: 'safety', topic: 'Lifting',
    q: { en: 'What does SWL marked on lifting gear mean?' },
    options: [
      { en: 'Breaking load of the gear' },
      { en: 'Safe Working Load: maximum load it may lift in normal service' },
      { en: 'Self weight of the gear' },
      { en: 'Standard wire length' }
    ],
    answer: 1,
    explain: { en: 'SWL is well below the breaking load because of a safety factor. Never exceed it, and remember the sling angle reduces the capacity of multi-leg slings.' },
    ref: 'General lifting practice; BOCW Central Rules 1998', verified: false
  },
  {
    id: 's21', discipline: 'safety', topic: 'Lifting',
    q: { en: 'During a crane lift, what is used to control the swing of a suspended load from a safe distance?' },
    options: [ { en: 'Hands on the load' }, { en: 'Tag lines' }, { en: 'Extra sling' }, { en: 'Nothing is needed' } ],
    answer: 1,
    explain: { en: 'Tag lines let workers guide the load without standing under it or touching it. Nobody should stand under a suspended load, and only one trained signaller directs the operator.' },
    ref: 'General lifting practice', verified: false
  },
  {
    id: 's22', discipline: 'safety', topic: 'Hot work',
    q: { en: 'After welding or gas cutting is finished, a fire watch should continue for at least:' },
    options: [ { en: '5 minutes' }, { en: '10 minutes' }, { en: '30 minutes' }, { en: 'No fire watch is needed' } ],
    answer: 2,
    explain: { en: 'Sparks and slag can smoulder unseen, so the fire watch stays at least 30 minutes after hot work ends, with an extinguisher ready.' },
    ref: 'OSHA 29 CFR 1910.252(a)(2)(iii)', verified: false
  },
  {
    id: 's23', discipline: 'safety', topic: 'Hot work',
    q: { en: 'Stored oxygen cylinders must be kept away from fuel-gas (e.g. acetylene) cylinders by at least:' },
    options: [ { en: '1 m' }, { en: '3 m' }, { en: '6 m (20 ft), or a fire-resistant barrier' }, { en: 'They can be stored together' } ],
    answer: 2,
    explain: { en: 'Separate them by 20 ft (6.1 m), or by a non-combustible barrier at least 5 ft (1.5 m) high with a half-hour fire rating. Store cylinders upright and chained.' },
    ref: 'OSHA 29 CFR 1926.350(a)(10)', verified: false
  },
  {
    id: 's24', discipline: 'safety', topic: 'Hot work',
    q: { en: 'What is the purpose of a flashback arrestor on a gas cutting set?' },
    options: [
      { en: 'To increase gas pressure' },
      { en: 'To stop a flame travelling back into the hose and cylinder' },
      { en: 'To measure gas content' },
      { en: 'To cool the torch' }
    ],
    answer: 1,
    explain: { en: 'A flashback arrestor stops a reverse flame and gas flow from reaching the regulator and cylinder, where it could cause an explosion. Fit one on both oxygen and fuel lines.' },
    ref: 'General hot work practice (IS 8433 / ISO 5175)', verified: false
  },
  {
    id: 's25', discipline: 'safety', topic: 'Excavation',
    q: { en: 'In trenches 1.2 m (4 ft) or deeper, a ladder or other exit must be within how much lateral travel of every worker?' },
    options: [ { en: '3 m (10 ft)' }, { en: '7.6 m (25 ft)' }, { en: '15 m (50 ft)' }, { en: '30 m (100 ft)' } ],
    answer: 1,
    explain: { en: 'A safe means of exit is required within 25 ft (7.6 m) of lateral travel, so workers can get out fast if the trench starts to collapse or flood.' },
    ref: 'OSHA 29 CFR 1926.651(c)(2)', verified: false
  },
  {
    id: 's26', discipline: 'safety', topic: 'Scaffolding',
    q: { en: 'A scaffold must be able to support its own weight plus how many times its maximum intended load?' },
    options: [ { en: '1.5 times' }, { en: '2 times' }, { en: '4 times' }, { en: '10 times' } ],
    answer: 2,
    explain: { en: 'Each scaffold and component must support its own weight and at least 4 times the maximum intended load without failure.' },
    ref: 'OSHA 29 CFR 1926.451(a)(1)', verified: false
  },
  {
    id: 's27', discipline: 'safety', topic: 'Scaffolding',
    q: { en: 'Under OSHA, fall protection (e.g. guardrails) is required on scaffolds more than:' },
    options: [ { en: '1.8 m (6 ft)' }, { en: '3.1 m (10 ft)' }, { en: '4.5 m (15 ft)' }, { en: '6 m (20 ft)' } ],
    answer: 1,
    explain: { en: 'OSHA requires fall protection on scaffolds above 10 ft (3.1 m), compared with 6 ft for general construction work. Many Indian sites require guardrails at lower heights.' },
    ref: 'OSHA 29 CFR 1926.451(g)(1)', verified: false
  },
  {
    id: 's28', discipline: 'safety', topic: 'Confined space',
    q: { en: 'What H₂S concentration is considered Immediately Dangerous to Life or Health (IDLH)?' },
    options: [ { en: '1 ppm' }, { en: '10 ppm' }, { en: '100 ppm' }, { en: '1000 ppm' } ],
    answer: 2,
    explain: { en: 'NIOSH sets the IDLH for H₂S at 100 ppm. Gas detectors in sewers and STPs usually alarm at about 10 ppm, long before that level.' },
    ref: 'NIOSH Pocket Guide (H₂S)', verified: false
  },
  {
    id: 's29', discipline: 'safety', topic: 'Confined space',
    q: { en: 'A confined space atmosphere is hazardous if flammable gas is at or above what share of its LEL?' },
    options: [ { en: '1%' }, { en: '10%' }, { en: '50%' }, { en: '100%' } ],
    answer: 1,
    explain: { en: 'At 10% of the Lower Explosive Limit or more, the atmosphere is hazardous and entry is not allowed until it is ventilated. Methane from sewage is the common source.' },
    ref: 'OSHA 29 CFR 1910.146(b)', verified: false
  },
  {
    id: 's30', discipline: 'safety', topic: 'Site practice',
    q: { en: 'A "toolbox talk" is best described as:' },
    options: [
      { en: 'A training course on using hand tools' },
      { en: 'A short safety briefing before work on that day\'s tasks and hazards' },
      { en: 'A monthly management meeting' },
      { en: 'An inventory check of tools' }
    ],
    answer: 1,
    explain: { en: 'A 5–15 minute talk at the work spot before the shift. It covers today\'s job, its hazards and controls, and lets workers raise concerns.' },
    ref: 'General site safety practice', verified: false
  },
  {
    id: 's31', discipline: 'safety', topic: 'First aid',
    q: { en: 'For adult CPR, the recommended chest compression rate is:' },
    options: [ { en: '40–60 per minute' }, { en: '60–80 per minute' }, { en: '100–120 per minute' }, { en: '150–180 per minute' } ],
    answer: 2,
    explain: { en: 'Push hard and fast at 100–120 compressions per minute, about 5–6 cm deep, and let the chest fully recoil. Call for an AED as early as possible.' },
    ref: 'AHA / ERC resuscitation guidelines', verified: false
  },
  {
    id: 's32', discipline: 'safety', topic: 'Health',
    q: { en: 'Which sign points to heat STROKE (a medical emergency) rather than heat exhaustion?' },
    options: [
      { en: 'Heavy sweating and thirst' },
      { en: 'Confusion or collapse with very high body temperature' },
      { en: 'Mild headache' },
      { en: 'Tiredness after work' }
    ],
    answer: 1,
    explain: { en: 'Confusion, fits or collapse with high body temperature (sweating may stop) means heat stroke. Call emergency help and cool the person immediately with water and shade.' },
    ref: 'NDMA Heat Wave Guidelines; general first aid', verified: false
  },
  {
    id: 's33', discipline: 'safety', topic: 'Site practice',
    q: { en: 'A "near miss" is:' },
    options: [
      { en: 'An accident with minor injury' },
      { en: 'An event that could have caused injury or damage but did not' },
      { en: 'A missed safety meeting' },
      { en: 'A fatal accident' }
    ],
    answer: 1,
    explain: { en: 'Near misses are warnings. Reporting and investigating them fixes hazards before someone gets hurt, because for every serious injury there are many near misses.' },
    ref: 'General safety management (ISO 45001)', verified: false
  },
  {
    id: 's34', discipline: 'safety', topic: 'Health',
    q: { en: 'Under OSHA, a hearing conservation programme is required when 8-hour average noise reaches:' },
    options: [ { en: '70 dB(A)' }, { en: '85 dB(A)' }, { en: '100 dB(A)' }, { en: '120 dB(A)' } ],
    answer: 1,
    explain: { en: 'The action level is 85 dB(A) as an 8-hour time-weighted average. Breakers, DG sets and blowers at STPs often exceed this, so hearing protection is needed.' },
    ref: 'OSHA 29 CFR 1910.95(c)', verified: false
  },
  {
    id: 's35', discipline: 'safety', topic: 'Law',
    q: { en: 'Under the BOCW Central Rules, a safety officer must be appointed when the number of building workers ordinarily employed is:' },
    options: [ { en: '50 or more' }, { en: '100 or more' }, { en: '500 or more' }, { en: '1000 or more' } ],
    answer: 2,
    explain: { en: 'Employers with 500 or more building workers must appoint qualified safety officers, and also set up a safety committee. Check the latest OSH Code rules too.' },
    ref: 'BOCW (RE&CS) Central Rules, 1998', verified: false
  },

  // ───────────── CIVIL (batch 3) ─────────────
  // type: 'order' questions list `items` in the CORRECT order; the app shuffles them.
  {
    id: 'c36', discipline: 'civil', topic: 'Testing', type: 'order',
    q: { en: 'Put the steps of a slump test in the correct order.' },
    items: [
      { en: 'Clean and moisten the cone; place it on a flat, non-absorbent base' },
      { en: 'Fill in 4 layers, rodding each layer 25 times' },
      { en: 'Strike off the top level with the rod' },
      { en: 'Lift the cone vertically and slowly' },
      { en: 'Measure the drop from the top of the cone' }
    ],
    explain: { en: 'Lift the cone straight up in 5–10 seconds without twisting. A shear or collapse slump means the test should be repeated or the mix is unsuitable.' },
    ref: 'IS 1199', verified: false
  },
  {
    id: 'c37', discipline: 'civil', topic: 'Concrete', type: 'order',
    q: { en: 'Put these steps for an RCC slab pour in the correct order.' },
    items: [
      { en: 'Check shuttering, props, line and level' },
      { en: 'Check reinforcement, cover blocks and get the pour card signed' },
      { en: 'Place and compact concrete with a needle vibrator' },
      { en: 'Finish the surface' },
      { en: 'Start curing once the surface has set' }
    ],
    explain: { en: 'Never pour before the formwork and reinforcement are checked and signed off. Curing starts as soon as the surface can take it without damage.' },
    ref: 'IS 456:2000, Cl. 11–13 (general practice)', verified: false
  },
  {
    id: 'c38', discipline: 'civil', topic: 'Concrete',
    q: { en: 'True or false: Concrete that has started to stiffen can be re-tempered by adding water at site.' },
    options: [ { en: 'True' }, { en: 'False' } ],
    answer: 1,
    explain: { en: 'False. Adding water raises the w/c ratio and lowers strength and durability. Stiffened concrete should be rejected, or an approved admixture used per the mix design.' },
    ref: 'IS 456:2000, Cl. 13 (general practice)', verified: false
  },
  {
    id: 'c39', discipline: 'civil', topic: 'Materials',
    q: { en: 'Nominal maximum size of coarse aggregate should not exceed what fraction of the minimum thickness of the member?' },
    options: [ { en: '1/2' }, { en: '1/3' }, { en: '1/4' }, { en: '1/8' } ],
    answer: 2,
    explain: { en: 'One-quarter of the minimum thickness, and it must also pass between bars and around cover. 20 mm is usual for most RCC work.' },
    ref: 'IS 456:2000, Cl. 5.3.3', verified: false
  },
  {
    id: 'c40', discipline: 'civil', topic: 'Reinforcement',
    q: { en: 'Diameter of column lateral ties must be at least 6 mm and not less than what fraction of the largest longitudinal bar?' },
    options: [ { en: '1/2' }, { en: '1/3' }, { en: '1/4' }, { en: '1/6' } ],
    answer: 2,
    explain: { en: 'Tie diameter ≥ 1/4 of the largest longitudinal bar diameter, and never less than 6 mm. For 25 mm main bars, ties of at least 8 mm are used.' },
    ref: 'IS 456:2000, Cl. 26.5.3.2(c)', verified: false
  },
  {
    id: 'c41', discipline: 'civil', topic: 'Reinforcement',
    q: { en: 'Pitch of column ties must not exceed the least of: the least lateral dimension, 300 mm, and:' },
    options: [ { en: '8 × smallest longitudinal bar dia' }, { en: '12 × smallest longitudinal bar dia' }, { en: '16 × smallest longitudinal bar dia' }, { en: '48 × tie dia' } ],
    answer: 2,
    explain: { en: 'Pitch ≤ least of (least lateral dimension, 16 × smallest longitudinal bar diameter, 300 mm). With 12 mm bars that gives 192 mm maximum.' },
    ref: 'IS 456:2000, Cl. 26.5.3.2(c)', verified: false
  },
  {
    id: 'c42', discipline: 'civil', topic: 'Reinforcement',
    q: { en: 'For deformed (HYSD) bars in tension, the design bond stress values in IS 456 are increased by:' },
    options: [ { en: '25%' }, { en: '40%' }, { en: '60%' }, { en: '100%' } ],
    answer: 2,
    explain: { en: 'The ribs give better grip, so bond stress is increased by 60% for deformed bars. For bars in compression it is increased by a further 25%.' },
    ref: 'IS 456:2000, Cl. 26.2.1.1', verified: false
  },
  {
    id: 'c43', discipline: 'civil', topic: 'Design basics',
    q: { en: 'As per IS 456, a column is treated as "short" when its effective length to least lateral dimension ratio is less than:' },
    options: [ { en: '8' }, { en: '12' }, { en: '20' }, { en: '60' } ],
    answer: 1,
    explain: { en: 'lex/D and ley/b both less than 12 → short column. Otherwise it is slender, and extra moments from buckling must be considered.' },
    ref: 'IS 456:2000, Cl. 25.1.2', verified: false
  },
  {
    id: 'c44', discipline: 'civil', topic: 'Design basics',
    q: { en: 'Basic span/effective depth ratio for a simply supported beam (span up to 10 m) to control deflection:' },
    options: [ { en: '7' }, { en: '20' }, { en: '26' }, { en: '35' } ],
    answer: 1,
    explain: { en: 'Basic ratios: cantilever 7, simply supported 20, continuous 26. They are then modified for steel stress and compression steel.' },
    ref: 'IS 456:2000, Cl. 23.2.1', verified: false
  },
  {
    id: 'c45', discipline: 'civil', topic: 'Sewerage',
    q: { en: 'BOD of sewage measures:' },
    options: [
      { en: 'Total dissolved salts' },
      { en: 'Oxygen used by microbes to break down organic matter' },
      { en: 'Oxygen needed to chemically oxidise everything' },
      { en: 'Suspended solids' }
    ],
    answer: 1,
    explain: { en: 'Biochemical Oxygen Demand shows how much biodegradable organic load is present. In India it is commonly measured over 3 days at 27 °C. COD (chemical oxygen demand) is always higher than BOD.' },
    ref: 'IS 3025 (Part 44)', verified: false
  },
  {
    id: 'c46', discipline: 'civil', topic: 'Sewerage',
    q: { en: 'In STP technology, what does SBR stand for?' },
    options: [ { en: 'Sludge Bed Reactor' }, { en: 'Sequencing Batch Reactor' }, { en: 'Settled Biological Reactor' }, { en: 'Sand Bed Recharge' } ],
    answer: 1,
    explain: { en: 'In an SBR, fill, aeration, settling and decanting all happen in the same tank in timed cycles, so no separate secondary clarifier is needed.' },
    ref: 'CPHEEO Manual (2013), Part A', verified: false
  },
  {
    id: 'c47', discipline: 'civil', topic: 'Sewerage',
    q: { en: 'As per CPHEEO, the maximum manhole spacing on sewers up to 0.3 m diameter is about:' },
    options: [ { en: '10 m' }, { en: '30 m' }, { en: '100 m' }, { en: '300 m' } ],
    answer: 1,
    explain: { en: 'Small sewers need manholes closer together for cleaning and inspection (about 30 m). Spacing increases for larger diameters. Manholes are also needed at every change of direction, gradient or size.' },
    ref: 'CPHEEO Manual on Sewerage (2013)', verified: false
  },
  {
    id: 'c48', discipline: 'civil', topic: 'Case study',
    q: { en: 'The Statue of Unity in Gujarat, the world\'s tallest statue, is about how tall?' },
    options: [ { en: '93 m' }, { en: '128 m' }, { en: '182 m' }, { en: '240 m' } ],
    answer: 2,
    explain: { en: 'It is about 182 m tall, with an RCC core wall structure, a steel frame and bronze cladding panels. It was designed for high winds and earthquakes.' },
    ref: 'Case study: Statue of Unity (L&T)', verified: false
  },
  {
    id: 'c49', discipline: 'civil', topic: 'Case study',
    q: { en: 'The Bandra–Worli Sea Link in Mumbai is mainly what type of bridge?' },
    options: [ { en: 'Suspension' }, { en: 'Cable-stayed' }, { en: 'Arch' }, { en: 'Bascule' } ],
    answer: 1,
    explain: { en: 'The main spans are cable-stayed, with concrete towers supporting the deck through stay cables. The approach spans are precast segmental.' },
    ref: 'Case study: Bandra–Worli Sea Link', verified: false
  },
  {
    id: 'c50', discipline: 'civil', topic: 'Case study',
    q: { en: 'What is special about the new Pamban railway bridge (Tamil Nadu)?' },
    options: [
      { en: 'India\'s first vertical-lift railway sea bridge' },
      { en: 'India\'s longest suspension bridge' },
      { en: 'World\'s highest railway bridge' },
      { en: 'India\'s first floating bridge' }
    ],
    answer: 0,
    explain: { en: 'A central span lifts vertically to let ships pass. It replaced the old 1914 Scherzer rolling-lift bridge.' },
    ref: 'Case study: New Pamban Bridge (RVNL)', verified: false
  },
  {
    id: 'c51', discipline: 'civil', topic: 'Concrete',
    q: { en: 'True or false: Cover blocks should be at least as strong and durable as the surrounding concrete.' },
    options: [ { en: 'True' }, { en: 'False' } ],
    answer: 0,
    explain: { en: 'True. Weak or porous cover blocks become the path for water and chlorides to reach the steel. Use concrete or approved PVC spacers of the correct size.' },
    ref: 'General practice (IS 456:2000, Cl. 26.4)', verified: false
  },

  // ───────────── SAFETY (batch 3) ─────────────
  {
    id: 's36', discipline: 'safety', topic: 'Confined space', type: 'order',
    q: { en: 'Put these steps for entering a wet well or manhole in the correct order.' },
    items: [
      { en: 'Get the confined space permit issued' },
      { en: 'Isolate and lock out pumps and incoming flows' },
      { en: 'Ventilate the space' },
      { en: 'Test the atmosphere (O₂, LEL, H₂S, CO)' },
      { en: 'Enter with attendant posted and rescue kit ready' }
    ],
    explain: { en: 'Keep monitoring gas continuously while inside. If any alarm sounds, everyone leaves immediately.' },
    ref: 'OSHA 29 CFR 1910.146', verified: false
  },
  {
    id: 's37', discipline: 'safety', topic: 'Fire', type: 'order',
    q: { en: 'Put the steps for using a fire extinguisher (PASS) in order.' },
    items: [
      { en: 'Pull the safety pin' },
      { en: 'Aim the nozzle at the base of the fire' },
      { en: 'Squeeze the handle' },
      { en: 'Sweep side to side' }
    ],
    explain: { en: 'Stand 2–3 m away with your exit behind you. If the fire is not going out quickly, leave and raise the alarm.' },
    ref: 'General fire safety practice', verified: false
  },
  {
    id: 's38', discipline: 'safety', topic: 'Work at height', type: 'order',
    q: { en: 'Put the steps for wearing a full body harness in order.' },
    items: [
      { en: 'Inspect the harness, then hold it by the back D-ring and shake out the straps' },
      { en: 'Slip on the shoulder straps' },
      { en: 'Fasten the chest strap' },
      { en: 'Fasten and tighten the leg straps (flat hand fits under)' },
      { en: 'Connect the lanyard to the back D-ring and anchor above' }
    ],
    explain: { en: 'A loose leg strap is the most common mistake and can cause serious injury in a fall. Anchor overhead where possible to reduce the fall distance.' },
    ref: 'IS 3521; manufacturer instructions', verified: false
  },
  {
    id: 's39', discipline: 'safety', topic: 'Work at height',
    q: { en: 'True or false: A harness that has stopped a fall can be used again after a quick visual check by the worker.' },
    options: [ { en: 'True' }, { en: 'False' } ],
    answer: 1,
    explain: { en: 'False. Any fall arrest equipment that has taken a fall load must be removed from service until a competent person inspects it. Usually it is discarded.' },
    ref: 'OSHA 29 CFR 1926.502(d)(19)', verified: false
  },
  {
    id: 's40', discipline: 'safety', topic: 'Confined space',
    q: { en: 'True or false: If a co-worker collapses in a manhole, you can go in quickly to pull them out if you hold your breath.' },
    options: [ { en: 'True' }, { en: 'False' } ],
    answer: 1,
    explain: { en: 'False. Most confined space deaths are would-be rescuers. Raise the alarm, rescue from outside using the tripod and lifeline, and enter only with breathing apparatus and training.' },
    ref: 'NIOSH confined space fatality findings; OSHA 1910.146(k)', verified: false
  },
  {
    id: 's41', discipline: 'safety', topic: 'Signs',
    q: { en: 'A round sign with a white symbol on a BLUE background means:' },
    options: [ { en: 'Prohibited action' }, { en: 'Warning of a hazard' }, { en: 'Mandatory action (e.g. wear helmet)' }, { en: 'Emergency exit' } ],
    answer: 2,
    explain: { en: 'Blue circle: mandatory. Red circle with slash: prohibition. Yellow triangle: warning. Green rectangle: safe condition or exit. Red: fire equipment.' },
    ref: 'IS 9457; ISO 7010', verified: false
  },
  {
    id: 's42', discipline: 'safety', topic: 'Excavation',
    q: { en: 'Before mechanical excavation near existing services, what should be done first?' },
    options: [
      { en: 'Start with the excavator and watch carefully' },
      { en: 'Check utility drawings, scan with a cable locator and hand-dig trial pits' },
      { en: 'Only inform the client' },
      { en: 'Nothing if drawings show no services' }
    ],
    answer: 1,
    explain: { en: 'Drawings are often wrong. Locate services with a detector and expose them by hand digging before machines work nearby. Hitting a live cable or gas line can be fatal.' },
    ref: 'General excavation practice (HSG47)', verified: false
  },
  {
    id: 's43', discipline: 'safety', topic: 'Ladders',
    q: { en: 'When climbing a ladder, how many points of contact should you keep?' },
    options: [ { en: '1' }, { en: '2' }, { en: '3' }, { en: '4' } ],
    answer: 2,
    explain: { en: 'Keep three points of contact: two hands and a foot, or two feet and a hand. Face the ladder and carry tools in a belt or haul them up with a rope.' },
    ref: 'OSHA 29 CFR 1926.1053(b)(22); IS 3696 (Part 2)', verified: false
  },
  {
    id: 's44', discipline: 'safety', topic: 'Scaffolding',
    q: { en: 'Why are sole boards placed under scaffold base plates?' },
    options: [ { en: 'For decoration' }, { en: 'To spread the load on soft ground' }, { en: 'To make the scaffold taller' }, { en: 'To stop rust' } ],
    answer: 1,
    explain: { en: 'Sole boards spread the point load from each standard so it doesn\'t sink into soil or fill. Never use bricks or loose blocks to pack under base plates.' },
    ref: 'IS 4014 (Part 2); OSHA 1926.451(c)(2)', verified: false
  },
  {
    id: 's45', discipline: 'safety', topic: 'Electrical',
    q: { en: 'Minimum clearance for a crane from overhead power lines up to 50 kV (OSHA):' },
    options: [ { en: '1 m (3 ft)' }, { en: '3 m (10 ft)' }, { en: '6 m (20 ft)' }, { en: 'No limit if insulated' } ],
    answer: 1,
    explain: { en: 'Keep 10 ft (3 m) for lines up to 50 kV, and more for higher voltages. Use a dedicated spotter and treat every line as live.' },
    ref: 'OSHA 29 CFR 1926.1408', verified: false
  },
  {
    id: 's46', discipline: 'safety', topic: 'Confined space',
    q: { en: 'A petrol generator running near a manhole opening can fill it with which colourless, odourless gas?' },
    options: [ { en: 'Oxygen' }, { en: 'Carbon monoxide (CO)' }, { en: 'Nitrogen' }, { en: 'Chlorine' } ],
    answer: 1,
    explain: { en: 'Engine exhaust contains CO, which you cannot see or smell. Keep generators and pumps well downwind and away from openings, and include CO in gas testing.' },
    ref: 'NIOSH CO guidance', verified: false
  },
  {
    id: 's47', discipline: 'safety', topic: 'Site practice',
    q: { en: 'In the hierarchy of controls, which is the LEAST effective?' },
    options: [ { en: 'Elimination' }, { en: 'Engineering controls' }, { en: 'Administrative controls' }, { en: 'PPE' } ],
    answer: 3,
    explain: { en: 'Order: Elimination → Substitution → Engineering → Administrative → PPE. PPE is the last line of defence, not the first.' },
    ref: 'ISO 45001, Cl. 8.1.2', verified: false
  },
  {
    id: 's48', discipline: 'safety', topic: 'Chemicals',
    q: { en: 'At an STP chlorination room, a common field method to find a small chlorine leak is:' },
    options: [ { en: 'Smell close to the valve' }, { en: 'Hold an ammonia-soaked swab near it: white fumes show the leak' }, { en: 'Use a lighter' }, { en: 'Spray water on it' } ],
    answer: 1,
    explain: { en: 'Ammonia vapour reacts with chlorine to form visible white fumes (ammonium chloride). Never spray water on a chlorine leak because it makes the leak worse. Wear breathing apparatus.' },
    ref: 'Chlorine Institute guidance', verified: false
  },
  {
    id: 's49', discipline: 'safety', topic: 'Site practice',
    q: { en: 'Why are caps fitted on exposed vertical rebar ends (starter bars)?' },
    options: [ { en: 'To stop rust' }, { en: 'To prevent impalement and cuts if someone falls on them' }, { en: 'To mark bar size' }, { en: 'To save steel' } ],
    answer: 1,
    explain: { en: 'Protruding bars can impale a worker who trips or falls. Use rebar caps, or bend or cover the bars, wherever people work nearby or above.' },
    ref: 'OSHA 29 CFR 1926.701(b)', verified: false
  },
  {
    id: 's50', discipline: 'safety', topic: 'Health',
    q: { en: 'In hot weather, how should workers drink water?' },
    options: [ { en: 'Only at lunch' }, { en: 'About a cup every 15–20 minutes, even if not thirsty' }, { en: 'Only when thirsty' }, { en: 'Large amounts at the end of the shift' } ],
    answer: 1,
    explain: { en: 'Thirst comes late, so drink small amounts often. Add shaded rest breaks and gradual acclimatisation for new workers.' },
    ref: 'OSHA heat illness guidance; NDMA Heat Wave Guidelines', verified: false
  },
  {
    id: 's51', discipline: 'safety', topic: 'Electrical',
    q: { en: 'Insulated hand tools for live electrical work are typically rated for:' },
    options: [ { en: '230 V' }, { en: '440 V' }, { en: '1000 V AC' }, { en: '11 kV' } ],
    answer: 2,
    explain: { en: 'Insulated tools to IEC 60900 are rated 1000 V AC and marked with a double triangle. Live work still needs a permit, and isolation is always preferred.' },
    ref: 'IEC 60900', verified: false
  }
];
