// Daily checklists / डेली चेकलिस्ट
// Add a new checklist by copying one block below and changing the id, title and items.
// नई चेकलिस्ट जोड़ने के लिए नीचे का एक ब्लॉक कॉपी करें और id, title, items बदलें।

window.CHECKLISTS = [
  {
    id: 'scaffolding', icon: '🏗️',
    title: { en: 'Scaffolding', hi: 'स्कैफ़ोल्डिंग' },
    items: [
      { en: 'Base plates and sole boards on firm, level ground', hi: 'बेस प्लेट और सोल बोर्ड मज़बूत, समतल ज़मीन पर हैं' },
      { en: 'Standards plumb; ledgers and transoms properly coupled', hi: 'स्टैंडर्ड सीधे (प्लंब); लेजर और ट्रांसम ठीक से कपल्ड हैं' },
      { en: 'Bracing provided and ties to the structure in place', hi: 'ब्रेसिंग लगी है और स्ट्रक्चर से टाई किया गया है' },
      { en: 'Working platform fully boarded, no gaps', hi: 'वर्किंग प्लेटफ़ॉर्म पूरी तरह बोर्डेड है, कोई गैप नहीं' },
      { en: 'Top rail, mid rail and toe boards fitted', hi: 'टॉप रेल, मिड रेल और टो बोर्ड लगे हैं' },
      { en: 'Safe access ladder fixed and secured', hi: 'सुरक्षित एक्सेस सीढ़ी लगी और बंधी है' },
      { en: 'Inspection tag (green) updated by competent person', hi: 'सक्षम व्यक्ति द्वारा इंस्पेक्शन टैग (हरा) अपडेट किया गया' },
      { en: 'No material overloading on platform', hi: 'प्लेटफ़ॉर्म पर सामग्री का ओवरलोड नहीं है' }
    ]
  },
  {
    id: 'shuttering', icon: '🧱',
    title: { en: 'Shuttering / Formwork', hi: 'शटरिंग / फ़ॉर्मवर्क' },
    items: [
      { en: 'Line, level and plumb checked against drawing', hi: 'ड्रॉइंग के अनुसार लाइन, लेवल और प्लंब जाँचा गया' },
      { en: 'Props at correct spacing, on firm base, braced', hi: 'प्रॉप्स सही दूरी पर, मज़बूत बेस पर, ब्रेस्ड हैं' },
      { en: 'Joints tight — no slurry leakage', hi: 'जोड़ टाइट हैं — स्लरी लीकेज नहीं' },
      { en: 'Release agent applied (not on reinforcement)', hi: 'रिलीज़ एजेंट लगाया (रीइन्फोर्समेंट पर नहीं)' },
      { en: 'Cover blocks of correct size placed', hi: 'सही साइज़ के कवर ब्लॉक लगाए गए' },
      { en: 'Openings, sleeves and inserts fixed as per drawing', hi: 'ओपनिंग, स्लीव और इंसर्ट ड्रॉइंग के अनुसार लगे हैं' },
      { en: 'Formwork checklist signed by engineer', hi: 'फ़ॉर्मवर्क चेकलिस्ट पर इंजीनियर के हस्ताक्षर' }
    ]
  },
  {
    id: 'concreting', icon: '🚛',
    title: { en: 'Concreting', hi: 'कंक्रीटिंग' },
    items: [
      { en: 'Pour card approved (steel, shuttering, MEP inserts)', hi: 'पोर कार्ड स्वीकृत (स्टील, शटरिंग, MEP इंसर्ट)' },
      { en: 'Grade / mix confirmed; RMC challans checked', hi: 'ग्रेड / मिक्स कन्फ़र्म; RMC चालान जाँचे गए' },
      { en: 'Slump test done and recorded', hi: 'स्लम्प टेस्ट किया और दर्ज किया' },
      { en: 'Cube samples taken and labelled', hi: 'क्यूब सैंपल लिए और लेबल किए' },
      { en: 'Vibrators working, plus a standby', hi: 'वाइब्रेटर चालू, एक स्टैंडबाय सहित' },
      { en: 'Construction joint location planned', hi: 'कंस्ट्रक्शन जॉइंट की जगह तय' },
      { en: 'Curing arrangement ready', hi: 'क्योरिंग की व्यवस्था तैयार' },
      { en: 'Lighting arranged for night pour', hi: 'रात के पोर के लिए लाइटिंग की व्यवस्था' }
    ]
  },
  {
    id: 'excavation', icon: '⛏️',
    title: { en: 'Excavation / Earthwork', hi: 'एक्सकेवेशन / अर्थवर्क' },
    items: [
      { en: 'Underground utilities identified before digging', hi: 'खुदाई से पहले अंडरग्राउंड यूटिलिटी की पहचान की गई' },
      { en: 'Excavation permit issued', hi: 'एक्सकेवेशन परमिट जारी' },
      { en: 'Shoring / sloping / benching for depth ≥ 1.5 m', hi: '1.5 m या ज़्यादा गहराई पर शोरिंग / स्लोपिंग / बेंचिंग' },
      { en: 'Spoil kept at least 0.6 m back from the edge', hi: 'स्पॉइल किनारे से कम से कम 0.6 m दूर' },
      { en: 'Hard barricade and signage around pit', hi: 'गड्ढे के चारों ओर हार्ड बैरिकेड और साइनेज' },
      { en: 'Safe access / exit ladder provided', hi: 'सुरक्षित आने-जाने की सीढ़ी लगी है' },
      { en: 'Dewatering arrangement if water present', hi: 'पानी हो तो डीवॉटरिंग की व्यवस्था' },
      { en: 'Daily inspection by competent person', hi: 'सक्षम व्यक्ति द्वारा रोज़ाना निरीक्षण' }
    ]
  },
  {
    id: 'confined', icon: '🕳️',
    title: { en: 'Confined Space (STP / Manhole)', hi: 'कन्फ़ाइंड स्पेस (STP / मैनहोल)' },
    items: [
      { en: 'Confined space entry permit issued', hi: 'कन्फ़ाइंड स्पेस एंट्री परमिट जारी' },
      { en: 'Pumps, valves and inflows isolated (LOTO)', hi: 'पंप, वाल्व और इनफ़्लो आइसोलेट (LOTO)' },
      { en: 'Forced ventilation running', hi: 'फ़ोर्स्ड वेंटिलेशन चालू' },
      { en: 'Gas test done: O₂, LEL, H₂S, CO — recorded', hi: 'गैस टेस्ट किया: O₂, LEL, H₂S, CO — दर्ज किया' },
      { en: 'Standby attendant posted at entry', hi: 'एंट्री पर स्टैंडबाय अटेंडेंट तैनात' },
      { en: 'Rescue tripod, winch and harness ready', hi: 'रेस्क्यू ट्राइपॉड, विंच और हार्नेस तैयार' },
      { en: 'Communication method agreed', hi: 'संचार का तरीका तय' },
      { en: 'Entrants trained and wearing correct PPE', hi: 'अंदर जाने वाले प्रशिक्षित और सही PPE पहने हैं' }
    ]
  }
];
