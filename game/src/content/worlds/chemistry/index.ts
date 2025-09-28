import type { LevelDefinition, LocalizedText, WorldDefinition } from "../../../types/app";

const lt = (en: string, hi: string, pa: string, gu: string): LocalizedText => ({ en, hi, pa, gu });

const matterMysteries: LevelDefinition = {
  id: "chemistry_kitchen_matter_mysteries",
  sequence: 1,
  worldId: "chemistry_kitchen",
  slug: "matter-mysteries",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Matter Mysteries", "पदार्थ रहस्य", "ਦ੍ਰਵ੍ਯ ਭੇਦ", "પદાર્થ રહસ્યો"),
  summary: lt(
    "Sort kitchen ingredients into states of matter and observe heating curves.",
    "रसोई सामग्री को पदार्थ की अवस्थाओं में वर्गीकृत करें और गर्माहट को देखें।",
    "ਰਸੋਈ ਸਮੱਗਰੀ ਨੂੰ ਦ੍ਰਵ੍ਯ ਦੀਆਂ ਅਵਸਥਾਵਾਂ ਵਿੱਚ ਵੰਡੋ ਅਤੇ ਤਾਪਮਾਨ ਵੇਖੋ।",
    "રસોઈ સામગ્રીને પદાર્થની અવસ્થાઓમાં ગોઠવો અને ગરમી વક્રો જુઓ."
  ),
  objectives: [
    {
      conceptKey: "states_of_matter",
      description: lt(
        "Identify solids, liquids, and gases by particle models.",
        "कण मॉडल से ठोस, द्रव और गैस की पहचान करें।",
        "ਕਣ ਮਾਡਲ ਨਾਲ ਠੋਸ, ਤਰਲ ਅਤੇ ਗੈਸ ਨੂੰ ਪਛਾਣੋ।",
        "કણ મોડલથી ઘન, પ્રવાહી અને વાયુ ઓળખો."
      ),
    },
  ],
  prerequisites: [],
  learnKey: "learn.chemistry.kitchen.matterMysteries",
  codexEntryId: "codex_states_of_matter",
  rewards: {
    coins: 55,
    badges: ["matter_master"],
  },
  hintCost: 2,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.6, time: 0.25, hintUsage: 0.15 },
    thresholds: { advance: 0.62, badge: 0.84 },
  },
  tasks: [
    {
      id: "matter_sort",
      type: "drag-drop",
      goal: lt(
        "Drag items like jaggery, milk, and steam to correct jars.",
        "गुड़, दूध और भाप को सही जार में रखें।",
        "ਗੁੜ, ਦੁੱਧ ਅਤੇ ਭਾਫ਼ ਨੂੰ ਸਹੀ ਬਰਤਨ ਵਿੱਚ ਰੱਖੋ।",
        "ગોળ, દૂધ અને વરાળને યોગ્ય જારમાં મુકાવો."
      ),
      successCriteria: lt(
        "All items classified correctly in 90 seconds.",
        "90 सेकंड में सभी वस्तुएँ सही वर्गीकृत हों।",
        "90 ਸਕਿੰਟ ਵਿੱਚ ਸਾਰੀਆਂ ਵਸਤਾਂ ਠੀਕ ਵਰਗੀਕ੍ਰਿਤ ਹੋਣ।",
        "90 સેકંડમાં બધી વસ્તુઓ યોગ્ય રીતે વર્ગીકૃત થાય."
      ),
      phaserScene: "MatterSortScene",
      hints: [],
    },
    {
      id: "matter_heating_curve",
      type: "simulation",
      goal: lt(
        "Heat ice cubes and identify plateau regions on the curve.",
        "बर्फ गरम करें और ग्राफ में समतल भाग पहचानें।",
        "ਬਰਫ਼ ਨੂੰ ਗਰਮ ਕਰੋ ਅਤੇ ਗ੍ਰਾਫ ਵਿੱਚ ਸਮਤਲ ਭਾਗ ਪਛਾਣੋ।",
        "બરફ ગરમ કરો અને વક્રમાં સપાટ ભાગોને ઓળખો."
      ),
      successCriteria: lt(
        "Mark both melting and boiling plateaus.",
        "गलन और क्वथन दोनों समतल चिन्हित करें।",
        "ਗਲਨ ਅਤੇ ਕਥਨ ਦੋਵੇਂ ਸਮਤਲ ਦਰਸਾਓ।",
        "ગલન અને કથન બંને સપાટ સ્થાનો ચિહ્નિત કરો."
      ),
      phaserScene: "HeatingCurveScene",
      hints: [],
    },
  ],
  quizId: "quiz_states_of_matter",
  estimatedDurationMinutes: 14,
};

const chemicalReactions: LevelDefinition = {
  id: "chemistry_kitchen_reactions",
  sequence: 2,
  worldId: "chemistry_kitchen",
  slug: "reaction-lab",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Reaction Recipes", "प्रतिक्रिया रेसिपी", "ਪ੍ਰਤਿਕਿਰਿਆ ਵਿਧੀਆਂ", "પ્રતિક્રિયા રેસિપિ"),
  summary: lt(
    "Balance equations and match observations with reaction types.",
    "समीकरण संतुलित करें और प्रतिक्रिया प्रकार से अवलोकन मिलाएँ।",
    "ਸਮੀਕਰਨ ਸੰਤੁਲਿਤ ਕਰੋ ਅਤੇ ਪ੍ਰਤਿਕਿਰਿਆ ਦੀ ਕਿਸਮ ਨਾਲ ਨਿਰੀਖਣ ਮਿਲਾਓ।",
    "સમીકરણ સંતુલિત કરો અને પ્રતિક્રિયા પ્રકાર સાથે અવલોકન મેળવો."
  ),
  objectives: [
    {
      conceptKey: "balancing_equations",
      description: lt(
        "Use coefficients to balance simple chemical equations.",
        "सरल रासायनिक समीकरणों को गुणांक से संतुलित करें।",
        "ਸਧਾਰਨ ਰਸਾਇਣਕ ਸਮੀਕਰਨ ਨੂੰ ਗੁਣਾਕਾਂਕ ਨਾਲ ਸੰਤੁਲਿਤ ਕਰੋ।",
        "સરળ રાસાયણિક સમીકરણોને ગુણાંકથી સંતુલિત કરો."
      ),
    },
  ],
  prerequisites: [matterMysteries.id],
  learnKey: "learn.chemistry.kitchen.reactionRecipes",
  codexEntryId: "codex_chemical_reactions",
  rewards: {
    coins: 75,
    badges: ["reaction_chef"],
  },
  hintCost: 3,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.58, time: 0.28, hintUsage: 0.14 },
    thresholds: { advance: 0.68, badge: 0.88 },
  },
  tasks: [
    {
      id: "reaction_balance",
      type: "calculation",
      goal: lt(
        "Balance the reaction for making soap at home.",
        "घर पर साबुन बनाने की प्रतिक्रिया संतुलित करें।",
        "ਘਰ ਵਿੱਚ ਸਾਬਣ ਬਣਾਉਣ ਦੀ ਪ੍ਰਤਿਕਿਰਿਆ ਸੰਤੁਲਿਤ ਕਰੋ।",
        "ઘરે સાબુ બનાવવાની પ્રતિક્રિયા સંતુલિત કરો."
      ),
      successCriteria: lt(
        "Equation balanced with minimal attempts.",
        "कम प्रयास में समीकरण संतुलित हो।",
        "ਘੱਟ ਕੋਸ਼ਿਸ਼ ਵਿਚ ਸਮੀਕਰਨ ਸੰਤੁਲਿਤ ਹੋਵੇ।",
        "ઓછી કોશિશમાં સમીકરણ સંતુલિત થાય."
      ),
      phaserScene: "BalanceBoardScene",
      hints: [],
    },
    {
      id: "reaction_type_match",
      type: "drag-drop",
      goal: lt(
        "Match kitchen observations to synthesis, decomposition, or displacement.",
        "रसोई अवलोकन को संश्लेषण, अपघटन या विस्थापन से मिलाएँ।",
        "ਰਸੋਈ ਨਿਰੀਖਣ ਨੂੰ ਸੰਸਲੇਸ਼ਣ, ਵਿਘਟਨ ਜਾਂ ਵਿਸਥਾਪਨ ਨਾਲ ਜੋੜੋ।",
        "રસોઈ અવલોકનોને સંશ્લેષણ, વિઘટન અથવા વિસ્થાપન સાથે મેળવો."
      ),
      successCriteria: lt(
        "All matches correct on the first try.",
        "पहले प्रयास में सभी मिलान सही हों।",
        "ਪਹਿਲੇ ਯਤਨ ਵਿੱਚ ਸਾਰੇ ਮਿਲਾਪ ਠੀਕ ਹੋਣ।",
        "પ્રથમ પ્રયત્નમાં બધા મેળ ખાતા હોય."
      ),
      phaserScene: "ReactionMatchScene",
      hints: [],
    },
  ],
  quizId: "quiz_chemical_reactions",
  estimatedDurationMinutes: 15,
};

const separationLab: LevelDefinition = {
  id: "chemistry_kitchen_separation_lab",
  sequence: 3,
  worldId: "chemistry_kitchen",
  slug: "separation-lab",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Separation Squad", "विभाजन दस्ता", "ਵਿਛੋੜਾ ਟੀਮ", "વિભાજન ટીમ"),
  summary: lt(
    "Use filtration, evaporation, and chromatography to purify ingredients.",
    "छानना, वाष्पीकरण और क्रोमैटोग्राफी से सामग्री शुद्ध करें।",
    "ਛਾਣ, ਵਾਸਪੀਕਰਨ ਅਤੇ ਕਰੋਮੈਟੋਗ੍ਰਾਫੀ ਨਾਲ ਸਮੱਗਰੀ ਸ਼ੁੱਧ ਕਰੋ।",
    "છાણણી, બાષ્પીભવન અને ક્રોમેટોગ્રાફીથી સામગ્રી શુદ્ધ કરો."
  ),
  objectives: [
    {
      conceptKey: "separation_methods",
      description: lt(
        "Choose appropriate separation techniques for mixtures.",
        "मिश्रणों के लिए सही अलगाव विधियाँ चुनें।",
        "ਮਿਸ਼ਰਣਾਂ ਲਈ ਠੀਕ ਵਿਛੋੜਾ ਵਿਧੀਆਂ ਚੁਣੋ।",
        "મિશ્રણ માટે યોગ્ય વિભાજન પદ્ધતિઓ પસંદ કરો."
      ),
    },
  ],
  prerequisites: [chemicalReactions.id],
  learnKey: "learn.chemistry.kitchen.separationSquad",
  codexEntryId: "codex_separation_methods",
  rewards: {
    coins: 85,
    badges: ["lab_librarian"],
  },
  hintCost: 3,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.6, time: 0.25, hintUsage: 0.15 },
    thresholds: { advance: 0.7, badge: 0.9 },
  },
  tasks: [
    {
      id: "separation_filter",
      type: "simulation",
      goal: lt(
        "Operate the filtration setup without clogging the filter.",
        "छानने की व्यवस्था चलाएँ और फिल्टर को बंद न होने दें।",
        "ਛਾਣ ਪ੍ਰਬੰਧ ਚਲਾਓ ਅਤੇ ਫਿਲਟਰ ਜਾਮ ਨਾ ਹੋਣ ਦਿਓ।",
        "છાણણી ગોઠવણ ચલાવો અને ફિલ્ટર જામ ન થાય તેની ખાતરી કરો."
      ),
      successCriteria: lt(
        "Filtrate collected without overflow.",
        "फिल्ट्रेट बिना छलके इकट्ठा हो।",
        "ਫਿਲਟਰੇਟ ਬਿਨਾਂ ਉੱਪਰ ਆਏ ਇਕੱਠਾ ਹੋਵੇ।",
        "ફિલ્ટ્રેટ છલકાયા વિના એકત્ર થાય."
      ),
      phaserScene: "FiltrationScene",
      hints: [],
    },
    {
      id: "separation_chromatography",
      type: "arrangement",
      goal: lt(
        "Place solvent front and samples to separate natural colours.",
        "प्राकृतिक रंग अलग करने के लिए विलायक फ्रंट और नमूने रखें।",
        "ਕੁਦਰਤੀ ਰੰਗ ਅਲੱਗ ਕਰਨ ਲਈ ਦ੍ਰਾਵਕ ਅਤੇ ਨਮੂਨੇ ਰੱਖੋ।",
        "પ્રાકૃતિક રંગોને અલગ કરવા માટે દ્રાવક અને નમૂનાઓ ગોઠવો."
      ),
      successCriteria: lt(
        "Bands are visible and evenly spaced.",
        "पट्टियाँ साफ़ और समान दूरी पर दिखें।",
        "ਪੱਟੀਆਂ ਸਾਫ਼ ਅਤੇ ਬਰਾਬਰ ਦੂਰੀ 'ਤੇ ਦਿਖਣ।",
        "પટ્ટીઓ સ્પષ્ટ અને સમાન અંતર પર દેખાય."
      ),
      phaserScene: "ChromatographyScene",
      hints: [],
    },
  ],
  quizId: "quiz_separation_methods",
  estimatedDurationMinutes: 16,
};

export const chemistryWorld: WorldDefinition = {
  id: "chemistry_kitchen",
  slug: "chemistry-kitchen",
  title: lt("Chemistry Kitchen", "रसायनशाला रसोई", "ਰਸਾਇਣ ਵਿਗਿਆਨ ਰਸੋਈ", "રાસાયણિક રસોઈ"),
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  accentColor: "#F97316",
  summary: lt(
    "Cook up reactions and separation tricks using everyday ingredients.",
    "रोज़मर्रा की सामग्री से प्रतिक्रियाएँ और अलगाव तकनीक सीखें।",
    "ਰੋਜ਼ਾਨਾ ਸਮੱਗਰੀ ਨਾਲ ਪ੍ਰਤਿਕਿਰਿਆ ਅਤੇ ਵਿਛੋੜਾ ਤਕਨਿਕਾਂ ਸਿੱਖੋ।",
    "રોજિંદી સામગ્રીથી પ્રતિક્રિયા અને વિભાજન તકનીકો શીખો."
  ),
  icon: "ph-beaker",
  offlineSizeMB: 72,
  mentorIntroKey: "mentor.intro.chemistry",
  prerequisites: [],
  levels: [matterMysteries, chemicalReactions, separationLab],
};
