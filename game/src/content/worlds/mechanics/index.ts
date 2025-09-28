import type { LevelDefinition, LocalizedText, WorldDefinition } from "../../../types/app";

const lt = (en: string, hi: string, pa: string, gu: string): LocalizedText => ({
  en,
  hi,
  pa,
  gu,
});

const forceFundamentals: LevelDefinition = {
  id: "mechanics_meadow_force_fundamentals",
  sequence: 1,
  worldId: "mechanics_meadow",
  slug: "force-fundamentals",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Force Fundamentals", "बल की बुनियाद", "ਬਲ ਦੀ ਬੁਨਿਆਦ", "બળની પાયો"),
  summary: lt(
    "Explore balanced and unbalanced forces through tug-of-war challenges.",
    "रस्साकशी से संतुलित और असंतुलित बल को समझें।",
    "ਰੱਸਾਕਸ਼ੀ ਨਾਲ ਸੰਤੁਲਿਤ ਅਤੇ ਅਸੰਤੁਲਿਤ ਬਲ ਸਮਝੋ।",
    "રશાકસીથી સંતુલિત અને અસંતુલિત બળ શીખો."
  ),
  objectives: [
    {
      conceptKey: "balanced_forces",
      description: lt(
        "Identify when forces cancel out and result in no motion.",
        "जब बल एक-दूसरे को निरस्त कर देते हैं और गति नहीं होती, पहचानें।",
        "ਜਦੋਂ ਬਲ ਇੱਕ-ਦੂਜੇ ਨੂੰ ਰੱਦ ਕਰਦੇ ਹਨ ਅਤੇ ਗਤੀ ਨਹੀਂ ਹੁੰਦੀ, ਪਛਾਣੋ।",
        "બળો જ્યારે એકબીજાને રદ્દ કરે અને ગતિ ન થાય તે ઓળખો."
      ),
    },
  ],
  prerequisites: [],
  learnKey: "learn.physics.mechanics.forceFundamentals",
  codexEntryId: "codex_balanced_forces",
  rewards: {
    coins: 60,
    badges: ["force_friend"],
  },
  hintCost: 2,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.6, time: 0.25, hintUsage: 0.15 },
    thresholds: { advance: 0.65, badge: 0.85 },
  },
  tasks: [
    {
      id: "force_balance",
      type: "drag-drop",
      goal: lt(
        "Place villagers on the tug-of-war rope to keep the flag centred.",
        "रस्साकशी रस्सी पर ग्रामीणों को रखें ताकि झंडा बीच में रहे।",
        "ਗਾਂਵ ਵਾਲਿਆਂ ਨੂੰ ਰੱਸਾਕਸ਼ੀ ਰੱਸੀ 'ਤੇ ਰੱਖੋ ਤਾਂ ਜੋ ਝੰਡਾ ਵਿਚਕਾਰ ਰਹੇ।",
        "ગામલોકોને રશાકસી દોરામાં ગોઠવો જેથી ધ્વજ મધ્યમાં રહે."
      ),
      successCriteria: lt(
        "Flag stays within the safe zone for 15 seconds.",
        "झंडा 15 सेकंड तक सुरक्षित क्षेत्र में रहे।",
        "ਝੰਡਾ 15 ਸਕਿੰਟ ਲਈ ਸੁਰੱਖਿਅਤ ਖੇਤਰ ਵਿੱਚ ਰਹੇ।",
        "ધ્વજ 15 સેકંડ સુધી સલામત વિસ્તારમાં રહે."
      ),
      phaserScene: "ForceBalanceScene",
      hints: [],
    },
    {
      id: "force_direction",
      type: "scenario",
      goal: lt(
        "Choose the correct direction of push to move a cart uphill.",
        "ऊपर की ओर गाड़ी ले जाने के लिए सही धक्का दिशा चुनें।",
        "ਢਲਾਣ ਉੱਤੇ ਗੱਡੀ ਚੜ੍ਹਾਉਣ ਲਈ ਠੀਕ ਧੱਕਾ ਦਿਸ਼ਾ ਚੁਣੋ।",
        "ગાડી ને ઢાળ ઉપર કાઢવા યોગ્ય દબાણ દિશા પસંદ કરો."
      ),
      successCriteria: lt(
        "Cart reaches the goal without rolling back.",
        "गाड़ी बिना पीछे लुढ़के लक्ष्य तक पहुँचे।",
        "ਗੱਡੀ ਪਿੱਛੇ ਲੁੱਡਕਣ ਬਿਨਾ ਮੰਜ਼ਿਲ 'ਤੇ ਪਹੁੰਚੇ।",
        "ગાડી પાછી સરકી જવાને વગર લક્ષ્ય સુધી જાય."
      ),
      phaserScene: "ForceDirectionScene",
      hints: [],
    },
  ],
  quizId: "quiz_force_fundamentals",
  estimatedDurationMinutes: 12,
};

const simpleMachines: LevelDefinition = {
  id: "mechanics_meadow_simple_machines",
  sequence: 2,
  worldId: "mechanics_meadow",
  slug: "simple-machines",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Simple Machines Studio", "सरल मशीन स्टूडियो", "ਸਰਲ ਮਸ਼ੀਨ ਸਟੂਡਿਓ", "સરળ મશીન સ્ટુડિયો"),
  summary: lt(
    "Build levers, pulleys, and wedges to solve farm day puzzles.",
    "लीवर, पुली और वेज बनाकर खेत की पहेलियाँ सुलझाएँ।",
    "ਲੀਵਰ, ਪੁੱਲੀ ਅਤੇ ਵੇਜ਼ ਨਾਲ ਖੇਤ ਦੀਆਂ ਪਹੇਲੀਆਂ ਹੱਲ ਕਰੋ।",
    "લીવર, પુલી અને વેજ બનાવી ખેતરની પઝલ્સ હલ કરો."
  ),
  objectives: [
    {
      conceptKey: "mechanical_advantage",
      description: lt(
        "Compute mechanical advantage for different simple machines.",
        "विभिन्न सरल मशीनों का यांत्रिक लाभ निकालें।",
        "ਵੱਖ-ਵੱਖ ਸਰਲ ਮਸ਼ੀਨਾਂ ਦਾ ਯਾਂਤ੍ਰਿਕ ਲਾਭ ਕੱਢੋ।",
        "વિવિધ સરળ મશીનોનું મિકેનિકલ એડવાન્ટેજ ગણો."
      ),
    },
  ],
  prerequisites: [forceFundamentals.id],
  learnKey: "learn.physics.mechanics.simpleMachines",
  codexEntryId: "codex_simple_machines",
  rewards: {
    coins: 80,
    badges: ["lever_legend"],
    gear: ["mech_toolkit"],
  },
  hintCost: 3,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.55, time: 0.3, hintUsage: 0.15 },
    thresholds: { advance: 0.7, badge: 0.88 },
  },
  tasks: [
    {
      id: "machines_lever",
      type: "arrangement",
      goal: lt(
        "Place fulcrum and effort to lift sacks with minimum force.",
        "फसल बोरी उठाने के लिए फुलक्रम और प्रयास सही जगह रखें।",
        "ਅਨਾਜ ਦੀ ਬੋਰੀ ਚੁੱਕਣ ਲਈ ਫੁਲਕਰਮ ਅਤੇ ਜ਼ੋਰ ਠੀਕ ਜਗ੍ਹਾ ਰੱਖੋ।",
        "અનાજની બોરી ઉપાડવા માટે ફુલક્રમ અને દબાણ યોગ્ય જગ્યાએ રાખો."
      ),
      successCriteria: lt(
        "Use less than 30 units of effort.",
        "30 इकाइयों से कम प्रयास करें।",
        "30 ਇਕਾਈਆਂ ਤੋਂ ਘੱਟ ਜ਼ੋਰ ਵਰਤੋ।",
        "30 એકમથી ઓછા પ્રયત્ન કરો."
      ),
      phaserScene: "LeverLabScene",
      hints: [],
    },
    {
      id: "machines_pulley",
      type: "simulation",
      goal: lt(
        "Configure pulley combinations to lift water buckets.",
        "पानी की बाल्टी उठाने हेतु पुली संयोजन बनाएं।",
        "ਪਾਣੀ ਦੀ ਬਾਲਟੀ ਚੁੱਕਣ ਲਈ ਪੁੱਲੀ ਜੋੜ ਬਣਾਓ।",
        "પાણીની બાલ્ટી ઉઠાવવા માટે પુલી સંયોજન બનાવો."
      ),
      successCriteria: lt(
        "Bucket reaches top platform in under 20 seconds.",
        "बाल्टी 20 सेकंड में ऊपर के मंच तक पहुँच जाए।",
        "ਬਾਲਟੀ 20 ਸਕਿੰਟ ਵਿੱਚ ਉੱਪਰਲੇ ਮੰਚ ਤੱਕ ਪਹੁੰਚੇ।",
        "બાલ્ટી 20 સેકંડમાં ઉપરના પ્લેટફોર્મ સુધી પહોંચે."
      ),
      phaserScene: "PulleyPlannerScene",
      hints: [],
    },
  ],
  quizId: "quiz_simple_machines",
  estimatedDurationMinutes: 15,
};

const motionMetrics: LevelDefinition = {
  id: "mechanics_meadow_motion_metrics",
  sequence: 3,
  worldId: "mechanics_meadow",
  slug: "motion-metrics",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Motion Metrics", "गतिशीलता माप", "ਗਤੀ ਮਾਪ", "ગતિ માપ"),
  summary: lt(
    "Plot distance-time graphs and predict motion stories.",
    "दूरी-समय ग्राफ बनाकर गति की कहानी समझें।",
    "ਦੂਰੀ-ਸਮਾਂ ਗ੍ਰਾਫ ਬਣਾਕੇ ਗਤੀ ਸਮਝੋ।",
    "અંતર-સમય ગ્રાફ બનાવી ગતિની સમજૂતી લો."
  ),
  objectives: [
    {
      conceptKey: "distance_time_graphs",
      description: lt(
        "Interpret slopes and regions of distance-time graphs.",
        "दूरी-समय ग्राफ की ढालें और क्षेत्रों को पढ़ें।",
        "ਦੂਰੀ-ਸਮਾਂ ਗ੍ਰਾਫ ਦੀਆਂ ਢਾਲਾਂ ਅਤੇ ਖੇਤਰਾਂ ਨੂੰ ਪੜ੍ਹੋ।",
        "અંતર-સમય ગ્રાફની ઢાળો અને ક્ષેત્રોને વાંચો."
      ),
    },
  ],
  prerequisites: [simpleMachines.id],
  learnKey: "learn.physics.mechanics.motionMetrics",
  codexEntryId: "codex_motion_graphs",
  rewards: {
    coins: 90,
    badges: ["graph_guru"],
  },
  hintCost: 3,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.6, time: 0.25, hintUsage: 0.15 },
    thresholds: { advance: 0.72, badge: 0.9 },
  },
  tasks: [
    {
      id: "motion_plot",
      type: "drag-drop",
      goal: lt(
        "Plot the farmer's scooter journey on the distance-time grid.",
        "किसान की स्कूटी यात्रा दूरी-समय ग्रिड पर दर्शाएँ।",
        "ਕਿਸਾਨ ਦੀ ਸਕੂਟੀ ਯਾਤਰਾ ਦੂਰੀ-ਸਮਾਂ ਗ੍ਰਿਡ 'ਤੇ ਦਰਸਾਓ।",
        "ખેડૂતની સ્કૂટર મુસાફરી અંતર-સમય ગ્રિડ પર દર્શાવો."
      ),
      successCriteria: lt(
        "Graph matches narration checkpoints.",
        "ग्राफ कहानी के सभी बिंदु मिलाए।",
        "ਗ੍ਰਾਫ ਕਹਾਣੀ ਦੇ ਸਾਰੇ ਬਿੰਦੂ ਮਿਲੇ।",
        "ગ્રાફ વાર્તાના તમામ મુદ્દા સાથે મેળ ખાય."
      ),
      phaserScene: "MotionGraphScene",
      hints: [],
    },
    {
      id: "motion_predict",
      type: "scenario",
      goal: lt(
        "Predict when two friends on bicycles will meet.",
        "अनुमान लगाएँ कि दो दोस्त साइकिल पर कब मिलेंगे।",
        "ਅੰਦਾਜ਼ਾ ਲਗਾਓ ਕਿ ਦੋ ਸਾਈਕਲ ਵਾਲੇ ਦੋਸਤ ਕਦੋਂ ਮਿਲਣਗੇ।",
        "અંદાજો લગાવો કે બે સાયકલ સવારો મિત્રો ક્યારે મળશે."
      ),
      successCriteria: lt(
        "Meeting time within 1-minute tolerance.",
        "मिलने का समय 1 मिनट की सीमा में हो।",
        "ਮਿਲਣ ਦਾ ਸਮਾਂ 1 ਮਿੰਟ ਸੀਮਾ ਵਿੱਚ ਹੋਵੇ।",
        "ભેટવાનો સમય 1 મિનિટની મર્યાદા અંદર રહે."
      ),
      phaserScene: "MotionPredictScene",
      hints: [],
    },
  ],
  quizId: "quiz_motion_metrics",
  estimatedDurationMinutes: 16,
};

export const mechanicsWorld: WorldDefinition = {
  id: "mechanics_meadow",
  slug: "mechanics-meadow",
  title: lt("Mechanics Meadow", "यांत्रिकी मैदान", "ਯਾਂਤ੍ਰਿਕ ਮੈਦਾਨ", "મેકેનિક્સ મેદાન"),
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  accentColor: "#0EA5E9",
  summary: lt(
    "Experiment with day-to-day forces and motion in a playful farm setting.",
    "मज़ेदार खेत में दैनिक बल और गति का अनुभव करें।",
    "ਖੇਡ ਵਾਲੇ ਖੇਤ ਵਿੱਚ ਰੋਜ਼ਾਨਾ ਬਲ ਅਤੇ ਗਤੀ ਦਾ ਅਨੁਭਵ ਕਰੋ।",
    "મોજભર્યા ખેતરમાં દૈનિક બળ અને ગતિનો અનુભવ કરો."
  ),
  icon: "ph-tractor",
  offlineSizeMB: 65,
  mentorIntroKey: "mentor.intro.mechanics",
  prerequisites: [],
  levels: [forceFundamentals, simpleMachines, motionMetrics],
};
