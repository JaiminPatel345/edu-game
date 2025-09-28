import type { LevelDefinition, LocalizedText, WorldDefinition } from "../../../types/app";

const lt = (en: string, hi: string, pa: string, gu: string): LocalizedText => ({ en, hi, pa, gu });

const shapeScouts: LevelDefinition = {
  id: "geometry_garden_shape_scouts",
  sequence: 1,
  worldId: "geometry_garden",
  slug: "shape-scouts",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Shape Scouts", "आकृति खोजी", "ਆਕਾਰ ਖੋਜੀ", "આકાર શોધક"),
  summary: lt(
    "Classify polygons and measure angles while restoring the garden maze.",
    "बगीचे की भूलभुलैया सुधारते हुए बहुभुजों को वर्गीकृत करें और कोण मापें।",
    "ਬਾਗ ਦੀ ਭੁਲੇੱਖੜੀ ਠੀਕ ਕਰਦੇ ਸਮੇਂ ਬਹੁਭੁਜਾਂ ਦੀ ਵਰਗੀਕਰਨ ਕਰੋ ਅਤੇ ਕੋਣ ਮਾਪੋ।",
    "બગીચાની ભૂલભુલૈયા સુધારતા બહુભુજોને વર્ગીકૃત કરો અને કોણ માપો."
  ),
  objectives: [
    {
      conceptKey: "polygon_properties",
      description: lt(
        "Identify polygons by sides and angle properties.",
        "भुजाओं और कोण गुणों से बहुभुज पहचानें।",
        "ਭੁਜਾਂ ਅਤੇ ਕੋਣਾਂ ਦੇ ਗੁਣਾਂ ਨਾਲ ਬਹੁਭੁਜ ਪਛਾਣੋ।",
        "બાજુઓ અને કોણના લક્ષણો પરથી બહુભુજ ઓળખો."
      ),
    },
  ],
  prerequisites: [],
  learnKey: "learn.math.geometry.shapeScouts",
  codexEntryId: "codex_polygon_properties",
  rewards: {
    coins: 60,
    badges: ["shape_sherpa"],
  },
  hintCost: 2,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.6, time: 0.25, hintUsage: 0.15 },
    thresholds: { advance: 0.64, badge: 0.86 },
  },
  tasks: [
    {
      id: "shape_classify",
      type: "drag-drop",
      goal: lt(
        "Drag garden tiles to matching polygon beds.",
        "बगीचे की टाइल्स को मिलते बहुभुज बिस्तरों में रखें।",
        "ਬਾਗ ਟਾਈਲਾਂ ਨੂੰ ਮਿਲਦੇ ਬਹੁਭੁਜ ਬੈੱਡਾਂ ਵਿੱਚ ਰੱਖੋ।",
        "બગીચાની ટાઇલ્સને મેળ ખાતા બહુભુજ બેડમાં મુકાવો."
      ),
      successCriteria: lt(
        "All tiles placed correctly with under 3 mistakes.",
        "तीन से कम गलती में सभी टाइल सही लगें।",
        "ਤਿੰਨ ਤੋਂ ਘੱਟ ਗਲਤੀ ਨਾਲ ਸਾਰੀਆਂ ਟਾਈਲਾਂ ਸਹੀ ਲੱਗਣ।",
        "ત્રણથી ઓછી ભૂલ સાથે બધી ટાઇલ્સ સાચી ગોઠવાય."
      ),
      phaserScene: "PolygonGardenScene",
      hints: [],
    },
    {
      id: "shape_angles",
      type: "calculation",
      goal: lt(
        "Measure turning angles at maze junctions to guide water flow bots.",
        "पानी रोबोट को दिशा देने के लिए भूलभुलैया मोड़ों के कोण नापें।",
        "ਪਾਣੀ ਵਾਲੇ ਬੋਟ ਨੂੰ ਦਿਸ਼ਾ ਦੇਣ ਲਈ ਭੁਲੇਖੇ ਦੇ ਮੋੜਾਂ ਦੇ ਕੋਣ ਮਾਪੋ।",
        "પાણી બોટને દિશા આપવા માટે ભૂલભુલૈયા નાકામાંના કોણ માપો."
      ),
      successCriteria: lt(
        "Angles logged with ±2° accuracy.",
        "±2° शुद्धता से कोण दर्ज हों।",
        "±2° ਸ਼ੁੱਧਤਾ ਨਾਲ ਕੋਣ ਦਰਜ ਹੋਣ।",
        "±2° ચોકસાઈ સાથે કોણ નોંધાય."
      ),
      phaserScene: "AngleGuideScene",
      hints: [],
    },
  ],
  quizId: "quiz_polygon_properties",
  estimatedDurationMinutes: 13,
};

const areaArchitects: LevelDefinition = {
  id: "geometry_garden_area_architects",
  sequence: 2,
  worldId: "geometry_garden",
  slug: "area-architects",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Area Architects", "क्षेत्रीय वास्तुकार", "ਖੇਤਰ ਆਰਕੀਟੈਕਟ", "વિસ્તાર આર્કિટેક્ટ"),
  summary: lt(
    "Design flower beds using area and perimeter constraints.",
    "क्षेत्रफल और परिमाप सीमा से फूलों की क्यारी डिजाइन करें।",
    "ਖੇਤਰਫਲ ਅਤੇ ਪਰਿਮਾਪ ਸੀਮਾਵਾਂ ਨਾਲ ਫੁੱਲਾਂ ਦੀਆਂ ਕਿਆਰੀਆਂ ਬਣਾਓ।",
    "વિસ્તાર અને ફરતેની મર્યાદા સાથે ફૂલ બેડ ડિઝાઇન કરો."
  ),
  objectives: [
    {
      conceptKey: "area_perimeter",
      description: lt(
        "Compute area and perimeter for composite shapes.",
        "संयुक्त आकृतियों का क्षेत्रफल और परिमाप निकालें।",
        "ਸੰਯੁਕਤ ਆਕਾਰਾਂ ਦਾ ਖੇਤਰਫਲ ਅਤੇ ਪਰਿਮਾਪ ਕੱਢੋ।",
        "સંકલિત આકારો માટે વિસ્તાર અને પરિમિતિ ગણો."
      ),
    },
  ],
  prerequisites: [shapeScouts.id],
  learnKey: "learn.math.geometry.areaArchitects",
  codexEntryId: "codex_area_perimeter",
  rewards: {
    coins: 85,
    badges: ["area_artist"],
  },
  hintCost: 3,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.58, time: 0.3, hintUsage: 0.12 },
    thresholds: { advance: 0.7, badge: 0.9 },
  },
  tasks: [
    {
      id: "area_plan",
      type: "arrangement",
      goal: lt(
        "Arrange shapes to fit within a given fence length.",
        "एक निश्चित बाड़ लंबाई में आकृतियों को फिट करें।",
        "ਇਕ ਨਿਰਧਾਰਤ ਬਾੜ ਦੀ ਲੰਬਾਈ ਵਿੱਚ ਆਕਾਰਾਂ ਨੂੰ ਫਿਟ ਕਰੋ।",
        "નક્કી કરેલી વાડ લંબાઈમાં આકારોને બંધ બેસાવો."
      ),
      successCriteria: lt(
        "Total perimeter equals fence length and area meets target.",
        "कुल परिमाप बाड़ के बराबर और क्षेत्र लक्ष्य पर हो।",
        "ਕੁੱਲ ਪਰਿਮਾਪ ਬਾੜ ਦੇ ਬਰਾਬਰ ਤੇ ਖੇਤਰ ਲਕਸ਼ ਤੇ ਹੋਵੇ।",
        "કુલ પરિમિતિ વાડ જેટલી અને વિસ્તાર લક્ષ્ય જેટલો રહે."
      ),
      phaserScene: "GardenPlannerScene",
      hints: [],
    },
    {
      id: "area_budget",
      type: "scenario",
      goal: lt(
        "Allocate budget blocks to maximize greenery in a courtyard.",
        "आंगन में हरियाली बढ़ाने हेतु बजट ब्लॉक बाँटें।",
        "ਅੰਗਨ ਵਿੱਚ ਹਰੇ-ਭਰੇ ਲਈ ਬਜਟ ਵੰਡੋ।",
        "આંગણમાં હરિયાળા વધારવા બજેટ ફાળવો."
      ),
      successCriteria: lt(
        "Reach 90% target greenery score.",
        "हरियाली स्कोर 90% तक पहुँचाएं।",
        "ਹਰੇ-ਭਰੇ ਦਾ 90% ਸਕੋਰ ਪ੍ਰਾਪਤ ਕਰੋ।",
        "હરિયાળીનો સ્કોર 90% સુધી પહોંચાડો."
      ),
      phaserScene: "BudgetBlocksScene",
      hints: [],
    },
  ],
  quizId: "quiz_area_perimeter",
  estimatedDurationMinutes: 17,
};

const symmetryShow: LevelDefinition = {
  id: "geometry_garden_symmetry_show",
  sequence: 3,
  worldId: "geometry_garden",
  slug: "symmetry-show",
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  title: lt("Symmetry Show", "समरूपता शो", "ਸਮਮਿਤੀ ਸ਼ੋ", "સમમિતિ શો"),
  summary: lt(
    "Restore broken mosaic patterns using symmetry transformations.",
    "समरूपता रूपांतरण से टूटी मोज़ेक को पुनः बनाएँ।",
    "ਸਮਮਿਤੀ ਬਦਲੇ ਨਾਲ ਟੁੱਟੇ ਮੋਜ਼ੇਕ ਬਣਾਓ।",
    "સમમિતિ રૂપાંતરણથી તૂટેલી મોઝેક સુધારો."
  ),
  objectives: [
    {
      conceptKey: "symmetry_transformations",
      description: lt(
        "Apply reflection, rotation, and translation to shapes.",
        "आकृतियों पर परावर्तन, घूर्णन और स्थानांतरण लागू करें।",
        "ਆਕਾਰਾਂ 'ਤੇ ਪ੍ਰਤਿਬਿੰਬ, ਘੁੰਮਾਅ ਅਤੇ ਸਥਾਨਾਂਤਰ ਲਾਗੂ ਕਰੋ।",
        "આકાર પર પ્રતિબિંબ, ફરવવું અને સ્થાનાંતરણ લાગુ કરો."
      ),
    },
  ],
  prerequisites: [areaArchitects.id],
  learnKey: "learn.math.geometry.symmetryShow",
  codexEntryId: "codex_symmetry",
  rewards: {
    coins: 95,
    badges: ["symmetry_star"],
  },
  hintCost: 3,
  masteryFormula: {
    components: ["accuracy", "time", "hintUsage"],
    weights: { accuracy: 0.6, time: 0.25, hintUsage: 0.15 },
    thresholds: { advance: 0.72, badge: 0.9 },
  },
  tasks: [
    {
      id: "symmetry_reflect",
      type: "drag-drop",
      goal: lt(
        "Reflect floral tiles across mirror ponds.",
        "फूल टाइल्स को दर्पण तालाबों के पार परावर्तित करें।",
        "ਫੁੱਲ ਟਾਈਲਾਂ ਨੂੰ ਦਰਪਣ ਤਾਲਾਬਾਂ 'ਤੇ ਪ੍ਰਤਿਬਿੰਬਤ ਕਰੋ।",
        "ફૂલ ટાઇલ્સને અરીસા સરોવરોમાં પ્રતિબિંબિત કરો."
      ),
      successCriteria: lt(
        "All reflections aligned to axis guides.",
        "सभी प्रतिबिंब अक्ष मार्गदर्शकों से मेल खाएँ।",
        "ਸਾਰੇ ਪ੍ਰਤਿਬਿੰਬ ਅਕਸ਼ ਗਾਈਡਾਂ ਨਾਲ ਮਿਲਣ।",
        "બધા પ્રતિબિંબ અક્ષ માર્ગદર્શિકાથી મેળ ખાતા હોય."
      ),
      phaserScene: "ReflectionScene",
      hints: [],
    },
    {
      id: "symmetry_rotate",
      type: "simulation",
      goal: lt(
        "Rotate mosaics to match rotational symmetry orders.",
        "मोज़ेक को घुमाएँ ताकि घूर्णी समरूपता क्रम मिले।",
        "ਮੋਜ਼ੇਕ ਨੂੰ ਘੁਮਾਓ ਤਾਂ ਜੋ ਘੁੰਮਣੀ ਸਮਮਿਤੀ ਕ੍ਰਮ ਮਿਲੇ।",
        "મોઝેકને ફેરવો જેથી રોટેશનલ સમમિતિ ક્રમ મળે."
      ),
      successCriteria: lt(
        "Match all symmetry orders before timer ends.",
        "टाइमर खत्म होने से पहले सभी समरूपता क्रम मिलाएँ।",
        "ਟਾਈਮਰ ਖਤਮ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਸਮਮਿਤੀ ਕ੍ਰਮ ਮਿਲਾਓ।",
        "ટાઇમર પૂરો થાય તે પહેલાં બધા સમમિતિ ક્રમ મેળવો."
      ),
      phaserScene: "RotationScene",
      hints: [],
    },
  ],
  quizId: "quiz_symmetry",
  estimatedDurationMinutes: 16,
};

export const geometryWorld: WorldDefinition = {
  id: "geometry_garden",
  slug: "geometry-garden",
  title: lt("Geometry Garden", "ज्यामिति उद्यान", "ਜਯਾਮਿਤੀ ਬਾਗ਼", "જ્યોમેટ્રી બગીચો"),
  gradeBand: "6-8",
  stream: "science",
  branch: "general",
  accentColor: "#16A34A",
  summary: lt(
    "Grow geometric thinking through puzzles set in a living garden.",
    "जीवंत बगीचे में पहेलियों से ज्यामितीय सोच विकसित करें।",
    "ਜੀਵੰਤ ਬਾਗ਼ ਵਿੱਚ ਪਹੇਲੀਆਂ ਰਾਹੀਂ ਜਯਾਮਿਤੀਕ ਸੋਚ ਵਿਕਸਤ ਕਰੋ।",
    "જીવંત બગીચામાં પઝલ્સથી જ્યોમેટ્રિક વિચાર વિકસાવો."
  ),
  icon: "ph-flower",
  offlineSizeMB: 58,
  mentorIntroKey: "mentor.intro.geometry",
  prerequisites: [],
  levels: [shapeScouts, areaArchitects, symmetryShow],
};
