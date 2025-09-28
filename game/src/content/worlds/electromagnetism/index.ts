import type { LevelDefinition, LocalizedText, WorldDefinition } from "../../../types/app";

const lt = (en: string, hi: string, pa: string, gu: string): LocalizedText => ({
  en,
  hi,
  pa,
  gu,
});

const orientationOps: LevelDefinition = {
  id: "physics_electromagnetism_orientation_ops",
  sequence: 1,
  worldId: "physics_electromagnetism",
  slug: "orientation-ops",
  gradeBand: "11-12",
  stream: "science",
  branch: "math",
  title: lt("Orientation Ops", "दिशा अभियान", "ਦਿਸ਼ਾ ਕਾਰਵਾਈ", "દિશા અભિયાન"),
  summary: lt(
    "Arrange cells, switches, and compasses to steer magnetic fields in the correct direction.",
    "सेल, स्विच और कंपास को सही चुंबकीय दिशा के लिए व्यवस्थित करें।",
    "ਸੈਲ, ਸਵਿੱਚ ਅਤੇ ਕੰਪਾਸ ਨੂੰ ਠੀਕ ਚੁੰਬਕੀ ਦਿਸ਼ਾ ਲਈ ਸਜਾਓ।",
    "સેલ, સ્વીચ અને દિશાસૂચકને યોગ્ય ચુંબકીય દિશા માટે ગોઠવો."
  ),
  objectives: [
    {
      conceptKey: "magnetic_field_direction",
      description: lt(
        "Predict field direction using the right-hand thumb rule.",
        "राइट हैंड थम्ब नियम से चुंबकीय दिशा की भविष्यवाणी करें।",
        "ਰਾਈਟ ਹੈਂਡ ਥੰਬ ਨਿਯਮ ਨਾਲ ਚੁੰਬਕੀ ਦਿਸ਼ਾ ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਓ।",
        "રાઈટ હેન્ડ/thumb નિયમથી ચુંબકીય દિશાનો અંદાજ લગાવો."
      ),
    },
    {
      conceptKey: "series_parallel_cells",
      description: lt(
        "Combine cells in series or parallel to achieve target current.",
        "लक्ष्य धारा पाने के लिए सेल को श्रेणी या समानांतर में जोड़ें।",
        "ਹਦੇਫ਼ ਕਰੰਟ ਲਈ ਸੈੱਲਾਂ ਨੂੰ ਸਿਰੀਜ਼ ਜਾਂ ਪੈਰਲਲ ਵਿੱਚ ਜੋੜੋ।",
        "લક્ષિત કરંટ માટે સેલ્સને સીરીઝ અથવા પેરલલમાં જોડો."
      ),
    },
  ],
  prerequisites: [],
  learnKey: "learn.physics.electromagnetism.orientationOps",
  codexEntryId: "codex_magnetic_field_direction",
  rewards: {
    coins: 120,
    badges: ["field_maestro"],
    gear: ["nano_flux_goggles"],
  },
  hintCost: 3,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.6, time: 0.25, hintUsage: 0.15 },
    thresholds: { advance: 0.7, badge: 0.9 },
  },
  tasks: [
    {
      id: "orientation_arrange_cells",
      type: "drag-drop",
      goal: lt(
        "Drag and rotate cells to satisfy a target compass orientation.",
        "कंपास की लक्ष्य दिशा के लिए सेल को घसीटें और घुमाएँ।",
        "ਕੰਪਾਸ ਦੀ ਲਕਸ਼ ਦਿਸ਼ਾ ਲਈ ਸੈੱਲਾਂ ਨੂੰ ਘਸੀਟੋ ਤੇ ਘੁਮਾਓ।",
        "કમ્પાસની લક્ષિત દિશા માટે સેલ્સને ખેંચો અને ફેરવો."
      ),
      successCriteria: lt(
        "All compass needles align with the target field.",
        "सभी कंपास सुइयाँ लक्ष्य क्षेत्र से मेल खाएँ।",
        "ਸਾਰੇ ਕੰਪਾਸ ਦੀਆਂ ਸੂਇਆਂ ਲਕਸ਼ ਖੇਤਰ ਨਾਲ ਮੇਲ ਖਾਣ।",
        "બધી કમ્પાસ સોયો લક્ષિત ક્ષેત્ર સાથે ગોઠવાય."
      ),
      phaserScene: "OrientationOpsScene",
      hints: [
        {
          id: "orientation_hint_thumb",
          cost: 3,
          text: lt(
            "Wrap your right hand around the wire: thumb shows current, curl shows field.",
            "दाईं हथेली को तार के चारों ओर रखें: अंगूठा धारा, उंगलियाँ क्षेत्र दिखाती हैं।",
            "ਸੱਜੇ ਹੱਥ ਨੂੰ ਤਾਰ 'ਤੇ ਲਪੇਟੋ: ਅੰਗੂਠਾ ਕਰੰਟ, ਉਂਗਲਾਂ ਖੇਤਰ ਦਿਖਾਉਂਦੀਆਂ ਹਨ।",
            "જમણો હાથ તારની આસપાસ વાળો: અંગૂઠો કરંટ બતાવે છે અને વાંકી આંગળીઓ ક્ષેત્ર."
          ),
        },
      ],
    },
    {
      id: "orientation_switch_logic",
      type: "scenario",
      goal: lt(
        "Decide which switches to toggle for the lamp to glow while maintaining north field.",
        "दीपक जलाते हुए उत्तर दिशा बनाए रखने के लिए कौन सा स्विच ऑन करें।",
        "ਦੀਵਾ ਬਲਾਉਣ ਅਤੇ ਉੱਤਰੀ ਖੇਤਰ ਰੱਖਣ ਲਈ ਕਿਹੜੇ ਸਵਿੱਚ ਚਾਲੂ ਕਰਨੇ ਹਨ।",
        "દીવો પ્રગટાવો અને ઉત્તર દિશા જાળવવા કયા સ્વિચ ચાલુ કરશો."
      ),
      successCriteria: lt(
        "Selected switches keep current direction intact.",
        "चुने स्विच धारा की दिशा बनाए रखते हैं।",
        "ਚੁਣੇ ਸਵਿੱਚ ਕਰੰਟ ਦੀ ਦਿਸ਼ਾ ਬਰਕਰਾਰ ਰੱਖਦੇ ਹਨ।",
        "પસંદ કરેલા સ્વીચ કરંટની દિશા જાળવે છે."
      ),
      phaserScene: "SwitchMatrixScene",
      hints: [
        {
          id: "orientation_hint_switch",
          cost: 4,
          text: lt(
            "Opposite switches flip the battery orientation—keep track of polarity marks.",
            "विपरीत स्विच बैटरी की दिशा बदल देते हैं—ध्रुवीयता चिह्न देखें।",
            "ਉਲਟ ਸਵਿੱਚ ਬੈਟਰੀ ਦੀ ਦਿਸ਼ਾ ਬਦਲਦੇ ਹਨ—ਧਰੁਵੀ ਸੰਕੇਤ ਵੇਖੋ।",
            "વિપરીત સ્વિચ બેટરીની દિશા બદલે છે—ધ્રુવ સંકેતો ધ્યાનમાં લો."
          ),
        },
      ],
    },
    {
      id: "orientation_field_match",
      type: "simulation",
      goal: lt(
        "Slide the current slider until the simulated field matches the mission requirement.",
        "करंट स्लाइडर समायोजित करें जब तक क्षेत्र मिशन की आवश्यकता से मेल न खाए।",
        "ਕਰੰਟ ਸਲਾਈਡਰ ਨੂੰ ਸਮਰਪਿਤ ਕਰੋ ਜਦ ਤੱਕ ਖੇਤਰ ਮਿਸ਼ਨ ਦੀ ਲੋੜ ਨਹੀਂ ਮਿਲਦਾ।",
        "કરીંટ સ્લાઇડર એડજસ્ટ કરો જ્યાં સુધી ક્ષેત્ર મિશનની જરૂરિયાત સમાન ન થાય."
      ),
      successCriteria: lt(
        "Indicator shows the target Tesla reading.",
        "इंडिकेटर लक्ष्य टेस्ला रीडिंग दिखाए।",
        "ਸੂਚਕ ਲਕਸ਼ ਟੈਸਲਾ ਰੀਡਿੰਗ ਦਿਖਾਏ।",
        "સૂચક લક્ષ્ય ટેસ્લા રીડિંગ બતાવે."
      ),
      phaserScene: "FieldMeterScene",
      hints: [],
    },
  ],
  quizId: "quiz_magnetic_field_direction",
  estimatedDurationMinutes: 18,
};

const solenoidSecrets: LevelDefinition = {
  id: "physics_electromagnetism_solenoid_secrets",
  sequence: 2,
  worldId: "physics_electromagnetism",
  slug: "solenoid-secrets",
  gradeBand: "11-12",
  stream: "science",
  branch: "math",
  title: lt("Solenoid Secrets", "सोलोनॉइड रहस्य", "ਸੋਲਨੋਇਡ ਭੇਦ", "સોલેનોડી રહસ્યો"),
  summary: lt(
    "Lay coils, choose cores, and optimise flux without overheating the system.",
    "कॉइल बिछाएँ, कोर चुनें और गर्मी बढ़ाए बिना फ्लक्स अनुकूल करें।",
    "ਕੌਇਲਾਂ ਵਿਛਾਓ, ਕੋਰ ਚੁਣੋ ਅਤੇ ਤਾਪ ਦੇ ਬਿਨਾ ਫਲਕਸ ਬੇਹਤਰ ਬਣਾਓ।",
    "કોઇલ ગોઠવો, કોર પસંદ કરો અને ગરમી વધાર્યા વગર ફ્લક્સ સુધારો."
  ),
  objectives: [
    {
      conceptKey: "solenoid_field_strength",
      description: lt(
        "Relate number of turns, current, and core to field strength inside a solenoid.",
        "सोलोनॉइड में टर्न, करंट और कोर को क्षेत्र की तीव्रता से जोड़ें।",
        "ਸੋਲਨੋਇਡ ਵਿੱਚ ਟਰਨ, ਕਰੰਟ ਅਤੇ ਕੋਰ ਨੂੰ ਖੇਤਰ ਦੀ ਤੀਵਰਤਾ ਨਾਲ ਜੋੜੋ।",
        "સોલેનોડમાં ટર્ન, કરંટ અને કોરને ક્ષેત્રની તીવ્રતા સાથે જોડો."
      ),
    },
  ],
  prerequisites: [orientationOps.id],
  learnKey: "learn.physics.electromagnetism.solenoidSecrets",
  codexEntryId: "codex_solenoid_design",
  rewards: {
    coins: 150,
    badges: ["coil_crafter"],
  },
  hintCost: 4,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.55, time: 0.3, hintUsage: 0.15 },
    thresholds: { advance: 0.72, badge: 0.9 },
  },
  tasks: [
    {
      id: "solenoid_layout",
      type: "arrangement",
      goal: lt(
        "Arrange coil layers to meet the target magnetic field within limited wire length.",
        "सीमित तार में लक्ष्य चुंबकीय क्षेत्र के लिए कॉइल परतें व्यवस्थित करें।",
        "ਸੀਮਿਤ ਤਾਰ ਵਿੱਚ ਲਕਸ਼ ਖੇਤਰ ਲਈ ਕੌਇਲ ਪਰਤਾਂ ਲਗਾਓ।",
        "મર્યાદિત વાયર સાથે લક્ષિત ક્ષેત્ર માટે કોઇલ સ્તરો ગોઠવો."
      ),
      successCriteria: lt(
        "Flux meter reading stays within the green band for 10 seconds.",
        "फ्लक्स मीटर 10 सेकंड तक हरे क्षेत्र में रहे।",
        "ਫਲਕਸ ਮੀਟਰ 10 ਸਕਿੰਟ ਲਈ ਹਰੇ ਖੇਤਰ ਵਿੱਚ ਰਹੇ।",
        "ફ્લક્સ મીટર 10 સેકંડ સુધી લીલા વિસ્તારમાં રહે."
      ),
      phaserScene: "SolenoidBuilderScene",
      hints: [
        {
          id: "solenoid_hint_turns",
          cost: 4,
          text: lt(
            "Turns per unit length matter more than total coil length.",
            "प्रति इकाई लंबाई के टर्न कुल लंबाई से अधिक मायने रखते हैं।",
            "ਇਕਾਈ ਲੰਬਾਈ ਪ੍ਰਤੀ ਟਰਨ ਕੁੱਲ ਲੰਬਾਈ ਤੋਂ ਵੱਧ ਮਹੱਤਵਪੂਰਣ ਹਨ।",
            "એકમ લંબાઈ દીઠ વળાંકો કુલ લંબાઈ કરતાં વધુ મહત્વના છે."
          ),
        },
      ],
    },
    {
      id: "solenoid_core_choice",
      type: "scenario",
      goal: lt(
        "Pick the right core to balance performance and cost for a rural clinic inverter.",
        "ग्राम क्लिनिक इन्वर्टर के लिए प्रदर्शन और लागत संतुलित कोर चुनें।",
        "ਦੇਹਾਤੀ ਕਲੀਨਿਕ ਇਨਵਰਟਰ ਲਈ ਪ੍ਰਦਰਸ਼ਨ ਅਤੇ ਲਾਗਤ ਸੰਤੁਲਿਤ ਕੋਰ ਚੁਣੋ।",
        "ગામડાની ક્લિનિક ઇનવર્ટર માટે પ્રદર્શન અને કિંમત સંતુલિત કોર પસંદ કરો."
      ),
      successCriteria: lt(
        "Decision matrix scores above 80%.",
        "निर्णय मैट्रिक्स 80% से ऊपर स्कोर करे।",
        "ਫ਼ੈਸਲਾ ਮੈਟ੍ਰਿਕਸ 80% ਤੋਂ ਉੱਪਰ ਸਕੋਰ ਕਰਦਾ ਹੈ।",
        "નિર્ણય મેટ્રિક્સ 80%થી વધુ સ્કોર કરે."
      ),
      phaserScene: "CorePickerScene",
      hints: [],
    },
    {
      id: "solenoid_cooling",
      type: "simulation",
      goal: lt(
        "Manage current pulses to keep coil temperature under 60°C.",
        "धारा पल्सों को संभालें ताकि तापमान 60°C से नीचे रहे।",
        "ਕਰੰਟ ਪਲਸਾਂ ਨੂੰ ਸੰਭਾਲੋ ਤਾਂ ਜੋ ਤਾਪਮਾਨ 60°C ਤੋਂ ਹੇਠਾਂ ਰਹੇ।",
        "કરીંટ પલ્સ મેનેજ કરો જેથી તાપમાન 60°Cથી નીચે રહે."
      ),
      successCriteria: lt(
        "Thermal gauge never turns red during the mission.",
        "मिशन के दौरान तापमान मीटर कभी लाल न हो।",
        "ਮਿਸ਼ਨ ਦੌਰਾਨ ਥਰਮਲ ਗੇਜ ਕਦੇ ਲਾਲ ਨਾ ਹੋਵੇ।",
        "મિશન દરમિયાન થર્મલ ગેજ કદી લાલ ન થાય."
      ),
      phaserScene: "CoolingControlScene",
      hints: [],
    },
  ],
  quizId: "quiz_solenoid_design",
  estimatedDurationMinutes: 20,
};

const transformerTrials: LevelDefinition = {
  id: "physics_electromagnetism_transformer_trials",
  sequence: 3,
  worldId: "physics_electromagnetism",
  slug: "transformer-trials",
  gradeBand: "11-12",
  stream: "science",
  branch: "math",
  title: lt("Transformer Trials", "ट्रांसफॉर्मर परीक्षण", "ਟ੍ਰਾਂਸਫਾਰਮਰ ਟ੍ਰਾਇਲ", "ટ્રાન્સફોર્મર ટ્રાયલ્સ"),
  summary: lt(
    "Design rural power transformers with minimum loss while meeting voltage needs.",
    "ग्रामीण ऊर्जा ट्रांसफॉर्मर न्यून हानि के साथ डिजाइन करें।",
    "ਪਿੰਡ ਦੇ ਟ੍ਰਾਂਸਫਾਰਮਰ ਨੂੰ ਘੱਟ ਤੋਂ ਘੱਟ ਘਾਟ ਨਾਲ ਡਿਜ਼ਾਇਨ ਕਰੋ।",
    "ગામડાં માટે ઓછા નુકસાન સાથે ટ્રાન્સફોર્મર ડિઝાઇન કરો."
  ),
  objectives: [
    {
      conceptKey: "transformer_ratio",
      description: lt(
        "Compute primary-secondary turns ratio for desired voltage.",
        "वांछित वोल्टेज के लिए प्राथमिक-द्वितीयक टर्न अनुपात निकालें।",
        "ਚਾਹੀਦੇ ਵੋਲਟੇਜ ਲਈ ਪ੍ਰਾਇਮਰੀ-ਸੈਕੰਡਰੀ ਟਰਨ ਅਨੁਪਾਤ ਕੱਢੋ।",
        "ઇચ્છિત વોલ્ટેજ માટે પ્રાઇમરી-સેકન્ડરી વળાંક અનુપાત ગણો."
      ),
    },
  ],
  prerequisites: [solenoidSecrets.id],
  learnKey: "learn.physics.electromagnetism.transformerTrials",
  codexEntryId: "codex_transformer_efficiency",
  rewards: {
    coins: 180,
    badges: ["transformer_tactician"],
  },
  hintCost: 5,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.6, time: 0.3, hintUsage: 0.1 },
    thresholds: { advance: 0.75, badge: 0.92 },
  },
  tasks: [
    {
      id: "transformer_ratio_calc",
      type: "calculation",
      goal: lt(
        "Choose the correct turns ratio to power a rural clinic fridge.",
        "ग्रामीण क्लिनिक फ्रिज चालू रखने के लिए सही टर्न अनुपात चुनें।",
        "ਪਿੰਡ ਕਲੀਨਿਕ ਫ੍ਰਿਜ ਚਲਾਉਣ ਲਈ ਠੀਕ ਟਰਨ ਅਨੁਪਾਤ ਚੁਣੋ।",
        "ગામડાની ક્લિનિક ફ્રિજ માટે યોગ્ય ટર્ન અનુપાત પસંદ કરો."
      ),
      successCriteria: lt(
        "Voltage output stays within ±5% of the target.",
        "आउटपुट वोल्टेज लक्ष्य से ±5% के भीतर रहे।",
        "ਆਉਟਪੁੱਟ ਵੋਲਟੇਜ ਲਕਸ਼ ਤੋਂ ±5% ਦੇ ਅੰਦਰ ਰਹੇ।",
        "આઉટપુટ વોલ્ટેજ લક્ષ્યથી ±5% અંદર રહે."
      ),
      phaserScene: "TransformerCalcScene",
      hints: [],
    },
    {
      id: "transformer_loss_min",
      type: "simulation",
      goal: lt(
        "Adjust laminations and cooling to keep loss under 8%.",
        "लैमिनेशन और ठंडक समायोजित करें ताकि हानि 8% से कम रहे।",
        "ਲੈਮੀਨੇਸ਼ਨ ਅਤੇ ਠੰਡਕ ਇਸ ਤਰ੍ਹਾਂ ਕਰੋ ਕਿ ਘਾਟ 8% ਤੋਂ ਘੱਟ ਰਹੇ।",
        "લેમિનેશન અને ઠંડક એડજસ્ટ કરો જેથી નુકસાન 8%થી ઓછું રહે."
      ),
      successCriteria: lt(
        "Efficiency meter stays in green for 15 seconds.",
        "15 सेकंड तक दक्षता मीटर हरे क्षेत्र में रहे।",
        "15 ਸਕਿੰਟ ਲਈ ਦੱਖਲ ਮੀਟਰ ਹਰੇ ਖੇਤਰ ਵਿੱਚ ਰਹੇ।",
        "15 સેકંડ સુધી કાર્યક્ષમતા મીટર લીલા વિસ્તારમાં રહે."
      ),
      phaserScene: "LossManagerScene",
      hints: [
        {
          id: "transformer_hint_core",
          cost: 5,
          text: lt(
            "Thin laminations reduce eddy currents significantly.",
            "पतली परतें एडी धारा को कम करती हैं।",
            "ਪਤਲੀਆਂ ਪਰਤਾਂ ਵਰਟੀਸੀ ਕਰੰਟ ਨੂੰ ਘਟਾਉਂਦੀਆਂ ਹਨ।",
            "પાતળી લેમિનેશન એડી કરંટ ઘટાડે છે."
          ),
        },
      ],
    },
    {
      id: "transformer_distribution",
      type: "scenario",
      goal: lt(
        "Plan distribution for a lab gear workshop with varied loads.",
        "विभिन्न लोड वाली लैब कार्यशाला के लिए वितरण योजना बनाएं।",
        "ਭਿੰਨ ਭਾਰ ਵਾਲੀ ਲੈਬ ਵਰਕਸ਼ਾਪ ਲਈ ਵੰਡ ਯੋਜਨਾ ਬਣਾਓ।",
        "વિવિધ લોડ ધરાવતી લેબ વર્કશોપ માટે વિતરણ યોજના બનાવો."
      ),
      successCriteria: lt(
        "All loads receive safe voltage and the system stays stable.",
        "सभी लोड सुरक्षित वोल्टेज पाएं और प्रणाली स्थिर रहे।",
        "ਸਾਰੇ ਲੋਡ ਸੁਰੱਖਿਅਤ ਵੋਲਟੇਜ ਲੈਣ ਅਤੇ ਪ੍ਰਣਾਲੀ ਸਥਿਰ ਰਹੇ।",
        "બધા લોડને સલામત વોલ્ટેજ મળે અને સિસ્ટમ સ્થિર રહે."
      ),
      phaserScene: "DistributionPlannerScene",
      hints: [],
    },
  ],
  quizId: "quiz_transformer_efficiency",
  estimatedDurationMinutes: 22,
};

export const electromagnetismWorld: WorldDefinition = {
  id: "physics_electromagnetism",
  slug: "electromagnetism",
  title: lt(
    "Electromagnetism Nexus",
    "विद्युतचुंबकत्व केंद्र",
    "ਚੁੰਬਕਤਾ ਕੈਂਦਰ",
    "વિદ્યુત્ચુંબકતાનું કેન્દ્ર"
  ),
  gradeBand: "11-12",
  stream: "science",
  branch: "math",
  accentColor: "#4F46E5",
  summary: lt(
    "Master magnetic fields, coils, and transformers to energise future labs.",
    "चुंबकीय क्षेत्र, कॉइल और ट्रांसफॉर्मर में महारत हासिल करें।",
    "ਚੁੰਬਕੀ ਖੇਤਰ, ਕੌਇਲ ਅਤੇ ਟ੍ਰਾਂਸਫਾਰਮਰ ਤੇ ਕੰਟਰੋਲ ਕਰੋ।",
    "ચુંબકીય ક્ષેત્ર, કોઇલ અને ટ્રાન્સફોર્મરને માસ્ટર કરો."
  ),
  icon: "ph-bolt",
  offlineSizeMB: 120,
  mentorIntroKey: "mentor.intro.electromagnetism",
  prerequisites: [],
  levels: [orientationOps, solenoidSecrets, transformerTrials],
};
