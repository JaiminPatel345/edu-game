import { useMemo, useState, type FC } from "react";
import type { Hint, LevelDefinition, LevelTask } from "../../types/app";
import "./play.css";

type BaseTaskProps = {
  onSolved: () => void;
};

const OrientationArrangeCellsTask = ({ onSolved }: BaseTaskProps) => {
  const [orientation, setOrientation] = useState(["North", "West", "South"]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const target = ["North", "East", "South"];

  const options = ["North", "East", "South", "West"];

  const check = () => {
    const success = orientation.every((value, index) => value === target[index]);
    setFeedback(success ? "Perfect alignment!" : "The compasses still wobble—adjust again.");
    if (success && !solved) {
      setSolved(true);
      onSolved();
    }
  };

  return (
    <div className="task-module">
      <p className="task-body">Set each cell orientation so that the magnetic field points due north.</p>
      <div className="grid grid-3">
        {orientation.map((value, index) => (
          <div key={index} className="grid-item">
            <div className="label">Cell {String.fromCharCode(65 + index)}</div>
            <select
              value={value}
              disabled={solved}
              onChange={(event) => {
                const next = [...orientation];
                next[index] = event.target.value;
                setOrientation(next);
              }}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button className="task-action" disabled={solved} onClick={check}>
        Check field direction
      </button>
      {feedback && <div className={`feedback ${solved ? "success" : "info"}`}>{feedback}</div>}
    </div>
  );
};

const OrientationSwitchLogicTask = ({ onSolved }: BaseTaskProps) => {
  const [switches, setSwitches] = useState({ A: false, B: true, C: false, D: true });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const target = { A: true, B: false, C: true, D: false } as const;

  const check = () => {
    const success = (Object.keys(target) as Array<keyof typeof target>).every(
      (key) => switches[key] === target[key],
    );
    setFeedback(success ? "Lamp is glowing with the correct polarity!" : "Try that combo again—polarity flipped.");
    if (success && !solved) {
      setSolved(true);
      onSolved();
    }
  };

  return (
    <div className="task-module">
      <p className="task-body">Toggle the switches so current flows clockwise and keeps the north field stable.</p>
      <div className="switch-matrix">
        {(Object.keys(switches) as Array<keyof typeof switches>).map((id) => (
          <label key={id} className="switch-toggle">
            <input
              type="checkbox"
              disabled={solved}
              checked={switches[id]}
              onChange={(event) => setSwitches((prev) => ({ ...prev, [id]: event.target.checked }))}
            />
            <span>
              Switch {id}
              <small>{switches[id] ? " ON" : " OFF"}</small>
            </span>
          </label>
        ))}
      </div>
      <button className="task-action" disabled={solved} onClick={check}>
        Validate circuit
      </button>
      {feedback && <div className={`feedback ${solved ? "success" : "info"}`}>{feedback}</div>}
    </div>
  );
};

const OrientationFieldMatchTask = ({ onSolved }: BaseTaskProps) => {
  const [fieldStrength, setFieldStrength] = useState(42);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const target = 68;

  const check = () => {
    const success = Math.abs(fieldStrength - target) <= 2;
    setFeedback(success ? "Tesla meter locked on target!" : "Need a tighter field—watch the gauge.");
    if (success && !solved) {
      setSolved(true);
      onSolved();
    }
  };

  return (
    <div className="task-module">
      <p className="task-body">Adjust the current until the simulated meter shows the mission requirement.</p>
      <div className="slider-row">
        <input
          type="range"
          min={20}
          max={90}
          step={1}
          disabled={solved}
          value={fieldStrength}
          onChange={(event) => setFieldStrength(Number(event.target.value))}
        />
        <span className="meter-reading">{(fieldStrength / 10).toFixed(1)} T</span>
      </div>
      <button className="task-action" disabled={solved} onClick={check}>
        Lock reading
      </button>
      {feedback && <div className={`feedback ${solved ? "success" : "info"}`}>{feedback}</div>}
    </div>
  );
};

const SolenoidLayoutTask = ({ onSolved }: BaseTaskProps) => {
  const [choice, setChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const target = "compact-dual";

  const options: Array<{ id: string; title: string; description: string }> = [
    {
      id: "single-long",
      title: "Single layer, 2.5 m wire",
      description: "Simple to wind but field leaks at the edges.",
    },
    {
      id: "compact-dual",
      title: "Dual layer, 1.8 m wire",
      description: "Best alignment with efficient wire usage.",
    },
    {
      id: "sparse-triple",
      title: "Triple layer, 3.6 m wire",
      description: "Exceeds wire budget and overheats quickly.",
    },
  ];

  const check = () => {
    if (!choice) {
      setFeedback("Pick a layout to simulate the flux.");
      return;
    }
    const success = choice === target;
    setFeedback(success ? "Flux meter stays in the green band!" : "Temperature spikes—rewind your coils.");
    if (success && !solved) {
      setSolved(true);
      onSolved();
    }
  };

  return (
    <div className="task-module">
      <p className="task-body">Choose a coil layout that fits the wire limit yet reaches the target field.</p>
      <div className="option-list">
        {options.map((option) => (
          <label key={option.id} className={`option-card ${choice === option.id ? "selected" : ""}`}>
            <input
              type="radio"
              name="solenoid-layout"
              value={option.id}
              disabled={solved}
              checked={choice === option.id}
              onChange={(event) => setChoice(event.target.value)}
            />
            <span>
              <strong>{option.title}</strong>
              <small>{option.description}</small>
            </span>
          </label>
        ))}
      </div>
      <button className="task-action" disabled={solved} onClick={check}>
        Simulate layout
      </button>
      {feedback && <div className={`feedback ${solved ? "success" : "info"}`}>{feedback}</div>}
    </div>
  );
};

const SolenoidCoreChoiceTask = ({ onSolved }: BaseTaskProps) => {
  const [selection, setSelection] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const target = "ferrite";

  const options = [
    {
      id: "air",
      title: "Air Core",
      description: "Budget friendly but delivers weak field strength.",
    },
    {
      id: "iron",
      title: "Iron Core",
      description: "Strong field yet heavy and rust-prone in humid clinics.",
    },
    {
      id: "ferrite",
      title: "Ferrite Core",
      description: "Balanced cost, light weight, and great flux density.",
    },
  ];

  const check = () => {
    if (!selection) {
      setFeedback("Select a core before validating.");
      return;
    }
    const success = selection === target;
    setFeedback(success ? "Decision matrix scores above 80%!" : "That choice slips under the 80% threshold.");
    if (success && !solved) {
      setSolved(true);
      onSolved();
    }
  };

  return (
    <div className="task-module">
      <p className="task-body">Pick the core that balances efficiency, price, and availability for rural clinics.</p>
      <div className="option-list">
        {options.map((option) => (
          <label key={option.id} className={`option-card ${selection === option.id ? "selected" : ""}`}>
            <input
              type="radio"
              name="solenoid-core"
              value={option.id}
              disabled={solved}
              checked={selection === option.id}
              onChange={(event) => setSelection(event.target.value)}
            />
            <span>
              <strong>{option.title}</strong>
              <small>{option.description}</small>
            </span>
          </label>
        ))}
      </div>
      <button className="task-action" disabled={solved} onClick={check}>
        Evaluate choice
      </button>
      {feedback && <div className={`feedback ${solved ? "success" : "info"}`}>{feedback}</div>}
    </div>
  );
};

const SolenoidCoolingTask = ({ onSolved }: BaseTaskProps) => {
  const [dutyCycle, setDutyCycle] = useState(70);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const temperature = useMemo(() => 28 + dutyCycle * 0.42, [dutyCycle]);

  const check = () => {
    const success = temperature <= 60 && dutyCycle >= 40 && dutyCycle <= 52;
    setFeedback(success ? "Temperature stays safe—mission sustained!" : "Coil heats up—trim the pulse duty.");
    if (success && !solved) {
      setSolved(true);
      onSolved();
    }
  };

  return (
    <div className="task-module">
      <p className="task-body">Tune current pulses so the coil stays below 60°C while delivering stable flux.</p>
      <div className="slider-row">
        <input
          type="range"
          min={20}
          max={90}
          step={1}
          disabled={solved}
          value={dutyCycle}
          onChange={(event) => setDutyCycle(Number(event.target.value))}
        />
        <div className="meter-reading">
          <div>{dutyCycle}% duty</div>
          <small className={temperature <= 60 ? "success-text" : "warning-text"}>{temperature.toFixed(1)} °C</small>
        </div>
      </div>
      <button className="task-action" disabled={solved} onClick={check}>
        Run thermal sim
      </button>
      {feedback && <div className={`feedback ${solved ? "success" : "info"}`}>{feedback}</div>}
    </div>
  );
};

const ComingSoonNotice: FC<BaseTaskProps> = ({ onSolved }) => (
  <div className="task-module">
    <p className="task-body">This activity is still downloading. Check back soon!</p>
    <button className="task-action" onClick={onSolved}>
      Skip for now
    </button>
  </div>
);

const taskComponentRegistry: Record<string, FC<BaseTaskProps>> = {
  orientation_arrange_cells: (props) => <OrientationArrangeCellsTask {...props} />,
  orientation_switch_logic: (props) => <OrientationSwitchLogicTask {...props} />,
  orientation_field_match: (props) => <OrientationFieldMatchTask {...props} />,
  solenoid_layout: (props) => <SolenoidLayoutTask {...props} />,
  solenoid_core_choice: (props) => <SolenoidCoreChoiceTask {...props} />,
  solenoid_cooling: (props) => <SolenoidCoolingTask {...props} />,
};

interface TaskRunnerProps {
  task: LevelTask;
  onSolved: () => void;
}

const TaskRunner = ({ task, onSolved }: TaskRunnerProps) => {
  const TaskComponent = taskComponentRegistry[task.id] ?? ComingSoonNotice;
  const [hasNotified, setHasNotified] = useState(false);

  const handleSolved = () => {
    if (!hasNotified) {
      setHasNotified(true);
      onSolved();
    }
  };

  return (
    <div className="task-runner">
      <header className="task-header">
        <h3>{task.goal.en}</h3>
        <p className="task-criteria">Success: {task.successCriteria.en}</p>
      </header>
      <TaskComponent onSolved={handleSolved} />
      {task.hints.length > 0 && (
        <details className="task-hints">
          <summary>Need a hint?</summary>
          <ul>
            {task.hints.map((hint: Hint) => (
              <li key={hint.id}>{hint.text.en}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
};

const LevelCompletePanel = ({ level, onExit }: { level: LevelDefinition; onExit: () => void }) => (
  <div className="level-complete">
    <h2>Level complete! 🎉</h2>
    <p>You unlocked rewards worth {level.rewards.coins} coins.</p>
    {level.rewards.badges.length > 0 && (
      <p>
        Badges earned: <strong>{level.rewards.badges.join(", ")}</strong>
      </p>
    )}
    <button className="task-action" onClick={onExit}>
      Return to chapter hub
    </button>
  </div>
);

export interface LevelPlayViewProps {
  level: LevelDefinition;
  onExit: () => void;
}

const LevelPlayView = ({ level, onExit }: LevelPlayViewProps) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskJustCompleted, setTaskJustCompleted] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);

  const totalTasks = level.tasks.length;
  const currentTask = level.tasks[currentTaskIndex];

  const progress = useMemo(() => ((currentTaskIndex + (taskJustCompleted ? 1 : 0)) / totalTasks) * 100, [
    currentTaskIndex,
    taskJustCompleted,
    totalTasks,
  ]);

  const handleTaskSolved = () => {
    setTaskJustCompleted(true);
  };

  const advance = () => {
    setTaskJustCompleted(false);
    if (currentTaskIndex >= totalTasks - 1) {
      setLevelComplete(true);
    } else {
      setCurrentTaskIndex((index) => index + 1);
    }
  };

  return (
    <div className="level-play-view">
      <header className="level-header">
        <div>
          <button className="back-button" onClick={onExit}>
            ← Chapters
          </button>
          <h1>{level.title.en}</h1>
          <p className="level-summary">{level.summary.en}</p>
        </div>
        <div className="progress">
          <span>Progress</span>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <small>
            Task {Math.min(currentTaskIndex + 1 + (taskJustCompleted ? 0 : 0), totalTasks)} of {totalTasks}
          </small>
        </div>
      </header>

      {levelComplete ? (
        <LevelCompletePanel level={level} onExit={onExit} />
      ) : (
        <>
          <TaskRunner key={currentTask.id} task={currentTask} onSolved={handleTaskSolved} />
          {taskJustCompleted && (
            <div className="task-complete-banner">
              <h3>Nice work! Task cleared.</h3>
              <p>Keep the streak alive—ready for the next activity?</p>
              <button className="task-action" onClick={advance}>
                {currentTaskIndex >= totalTasks - 1 ? "Finish level" : "Next task"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LevelPlayView;
