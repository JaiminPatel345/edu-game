# Curriculum and Gameplay Blueprint

This document captures the initial playable curriculum for the Nano Chacha STEM adventure. Each world aligns to CBSE grade bands (66 and 1112 streams) and breaks chapters into multi-stage levels. Every level encapsulates:

- **Learn Arc**: Mentor-driven narrative, localized text + audio, interactive visuals.
- **Play Arc**: Phaser scene with puzzle loops, hint tokens, mastery calculations, streak integration.
- **Quiz Arc**: Auto-generated or curated MCQ + parameterized scenario items.
- **Codex Entry**: Unlockable recap cards for revision, always available in the `CodeX` library.

Rewards (coins, badges, lab gear) and telemetry hooks are defined per level. All text appears in four base languages (`en`, `hi`, `pa`, `gu`), expandable via JSON packs.

---

## Grade Bands and Streams

| Grade Band | Stream | Worlds | Notes |
|------------|--------|--------|-------|
| 66      | General Science & Maths | Fundamentals Lab, Algebra Arcade, Earth Explorer, Energy Quest | Broad STEM foundations; ideal for onboarding and core mechanics tutorials. |
| 78      | Science & Maths | Mechanics Meadow, Chemistry Kitchen, Geometry Garden, Data Detectives | Introduces branching prerequisites and multiplayer co-op puzzles (optional). |
| 910     | Science (Math/Bio), Commerce | Wave Workshop, Carbon Chronicles, Trig Trails, Financial Frontier | Streams diverge; Commerce learners see Financial Frontier + Data Detectives Advanced. |
| 1112    | Science: Math | Electromagnetism Nexus, Calculus Cascade, Quantum Quests | Puzzles emphasize vector manipulations and field simulations. |
| 1112    | Science: Biology | Genetics Grove, Human Systems Hub, Ecology Expedition | Glucose balance mini-games, animation-light diagrams. |
| 1112    | Commerce | Markets Matrix, Accounting Atrium, Business Analytics Bay | Scenario-based decision challenges; integrates spreadsheets-lite UI. |

Each world has 49 levels (chapters), with intra-level tasks mimicking textbook subtopics. Teacher overrides can unlock levels cross-world.

---

## Sample World Breakdown

### Electromagnetism Nexus (Grade 11 Science - Math)

1. **Orientation Ops** (CBSE: Magnetic Effects of Electric Current)
   - *Tasks*: Arrange cells to achieve target field direction, align compass needles, toggle switches to observe right-hand thumb rule.
   - *Play Loop*: Drag-and-drop components on a breadboard, dynamic field visuals using vector arrows, hint displays cost 3 coins.
   - *Quiz*: Parameterized item to compute direction using Fleming's rules.
   - *Codex*: Summarizes laws, formulas, mnemonics.

2. **Solenoid Secrets** (CBSE: Solenoids and Toroids)
   - *Tasks*: Design coil layering to meet flux goals, adjust core materials to minimize energy.
   - *Phaser Scene*: Tile-based coil builder with heat indicators; failure states include overheating.

3. **Transformer Trials**
   - *Tasks*: Choose turns ratio to power rural clinic; optimize for minimal loss.
   - *Analytics Hooks*: Capture time-per-task, hint usage, ratio accuracy.

4. **Induction Lab**
   - *Tasks*: Simulate Faraday's law; keep bulb lit under varying motions.
   - *Ask Nano*: Suggests motion patterns via Gemini when online.

### Mechanics Meadow (Grade 7 Science)

- **Force Fundamentals**: Identify balanced/unbalanced forces through tug-of-war mini-game.
- **Simple Machines Studio**: Build lever systems to move loads within torque limits.
- **Motion Metrics**: Graph distance-time relationships; learners plot points with touch gestures.
- **Projectile Playground**: Adjust angle & velocity in a drag-to-launch setup; analytics watch for repeated identical attempts.

### Financial Frontier (Grade 9 Commerce)

- **Budget Builder**: Balance weekly budgets with constraints; integrate inflation scenarios.
- **Interest Insights**: Compute simple vs compound interest with slider inputs.
- **Tax Tactics**: Sort expenses into categories; scenario-based quiz items with threshold scoring.
- **Entrepreneur Expo**: Choose marketing levers to maximize ROI; branching narrative.

---

## Level Structure Template

```json
{
  "id": "physics_electromagnetism_orientation_ops",
  "worldId": "physics_electromagnetism",
  "gradeBand": "11-12",
  "stream": "science_math",
  "prerequisites": ["physics_electromagnetism_intro"],
  "objectives": [
    {"conceptKey": "magnetic_field_direction", "description": {"en": "Predict the direction of magnetic field...", "hi": "चुंबकीय क्षेत्र की दिशा...", "pa": "ਚੁੰਬਕੀ ਖੇਤਰ ਦੀ ਦਿਸ਼ਾ...", "gu": "ચુંબકીય ક્ષેત્રની દિશા..."}}
  ],
  "rewards": {"coins": 120, "badges": ["field_maestro"], "gear": ["nano_flux_goggles"]},
  "codexEntryId": "codex_magnetic_field_direction",
  "quizTemplateIds": ["quiz_magnetic_field_direction"],
  "scene": "OrientationOpsScene",
  "hintCost": 3,
  "masteryFormula": {
    "components": ["accuracy", "time", "hintUsage"],
    "weights": {"accuracy": 0.6, "time": 0.25, "hintUsage": 0.15},
    "thresholds": {"advance": 0.7, "badge": 0.9}
  }
}
```

---

## Localization Packs

- `game/lang/en.json`, `hi.json`, `pa.json`, `gu.json` store nested keys (`flows.intro.welcome`, `worlds.physics_electromagnetism.title`).
- Each pack mirrors structure; new language = new file.
- Use ICU message format where dynamic values exist.

Teacher panel pulls the same keys for consistent copy.

---

## Nano Chacha Dialog Flow

1. **Mentor Introduction**: `intro.nanoChacha.greeting` (multi-language) further parameterized by grade & stream.
2. **Contextual Hints**: Scenes request `mentor.hints[sceneId][step]`; offline fallback uses curated text/audio.
3. **Ask Nano**: When online, route learner question to backend Gemini proxy; offline use `mentor.ask.offlineFaqs`.

---

## Gamification System

- **Currency**: Coins earned per task; hint cost dynamic (base 3, +2 for repeated hints).
- **Badges**: Unique per world (`field_maestro`, `lever_legend`, `data_detective`). Displayed in profile & teacher panel.
- **Streaks**: Daily login streak tracked locally; teacher panel sees aggregated streak stats.
- **Lab Gear**: Cosmetic unlocks (HUD themes, avatar accessories) stored locally.

---

## Telemetry Events

| Event | Payload Highlights |
|-------|--------------------|
| `session_start` | profile id, device tier, language |
| `level_enter` | levelId, attemptNumber, contentVersion |
| `puzzle_interaction` | stepId, success, elapsedMs, hintsUsed |
| `quiz_submit` | levelId, itemId, result, attemptCount |
| `sync_complete` | batchesSent, batchesFailed |

Stored locally in IndexedDB, flushed when online.

---

## CodeX Entries

Each codex entry includes:

- `title`, `summary`, `keyFormulas`, `glossary`, `practicePrompts` (multi-language strings).
- Linked Level IDs for quick navigation.
- Printable/PDF export queued for future release.

Example entry snippet:

```json
{
  "id": "codex_magnetic_field_direction",
  "title": {
    "en": "Magnetic Field Directions",
    "hi": "चुंबकीय क्षेत्र की दिशाएँ",
    "pa": "ਚੁੰਬਕੀ ਖੇਤਰ ਦੀਆਂ ਦਿਸ਼ਾਵਾਂ",
    "gu": "ચુંબકીય ક્ષેત્રની દિશાઓ"
  },
  "summary": { "en": "Use the right-hand thumb rule..." },
  "keyFormulas": [
    {"label": {"en": "Magnetic force"}, "formula": "F = q(v \u00d7 B)"}
  ]
}
```

---

## Next Steps

- Convert this blueprint into JSON content packs stored under `game/src/content`.
- Mirror metadata in server-side schemas for syncing and analytics.
- Align teacher panel filters with `gradeBand`, `stream`, and `conceptKey` tags.
