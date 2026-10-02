export type QuestType = 'main' | 'side' | 'focus' | 'recovery' | 'bonus';

export type DayQuest = {
  id: string;
  type: QuestType;
  label: string;
  title: string;
  detail: string;
  minutes: number;
  xp: number;
  floor: string;
};

export type DaySpec = {
  day: number;
  arc: number;
  objective: string;
};

export const arcs = [
  { id: 1, numeral: 'I', name: 'WAKE', start: 1, end: 7, aim: 'See the real baseline and start moving.', feeling: 'Quiet intensity. Honest eyes.' },
  { id: 2, numeral: 'II', name: 'BUILD', start: 8, end: 21, aim: 'Stabilize sleep, schedule and training.', feeling: 'Structure over mood.' },
  { id: 3, numeral: 'III', name: 'FORGE', start: 22, end: 35, aim: 'Practice discipline when things become inconvenient.', feeling: 'Pressure. Friction. Respect for discomfort.' },
  { id: 4, numeral: 'IV', name: 'RISE', start: 36, end: 49, aim: 'Use consistency to raise ambition.', feeling: 'Earned confidence.' },
  { id: 5, numeral: 'V', name: 'ASCEND', start: 50, end: 60, aim: 'Turn the challenge into a way of living.', feeling: 'Calm authority.' },
] as const;

export const attributeProfiles = [
  { name: 'Strength', code: '01', line: 'Capability, earned gradually.', detail: 'Safe, consistent resistance work. Technique and recovery lead; progression follows.' },
  { name: 'Discipline', code: '02', line: 'Keep one promise at a time.', detail: 'Act on the decision after the mood changes. Make the next useful action small enough to keep.' },
  { name: 'Focus', code: '03', line: 'Give the important thing a clear window.', detail: 'Distraction-free work, cleaner technology habits and an environment prepared in advance.' },
  { name: 'Energy', code: '04', line: 'Support the day you have.', detail: 'Consistent sleep, movement, hydration, simple meals and a calmer schedule.' },
  { name: 'Recovery', code: '05', line: 'Rest is part of the work.', detail: 'Intentional rest, sleep, mobility, planning and stress management.' },
] as const;

export const objectives: string[] = [
  'Write down your current baseline without editing it into a success story.',
  'Take an easy 10-minute walk and notice how you feel before and after.',
  'Choose a realistic minimum for movement that you could keep on a difficult day.',
  'Set one repeatable time window for movement this week.',
  'Clear one small surface where the next useful action will happen.',
  'Try the Floor once on purpose; learn that the smaller action still counts.',
  'Review the first week. Keep what felt workable and release what did not.',
  'Choose a consistent wake-up anchor that fits your real schedule.',
  'Place the shoes, water or equipment for tomorrow where you can see them.',
  'Complete the next planned session at an easy, repeatable effort.',
  'Add a short wind-down cue before bed; keep it simple enough to repeat.',
  'Protect one 25-minute focus window and name the single task first.',
  'Prepare one uncomplicated meal or snack before the day gets busy.',
  'Take a rest day without trying to compensate for it.',
  'Use the same movement window twice; notice what made the second start easier.',
  'Remove one friction point from your morning routine.',
  'Log your sleep and energy before choosing today’s training demand.',
  'Complete a focus session with your phone out of reach.',
  'Choose a recovery action before adding another demand.',
  'Write a three-line note about the routine you are beginning to trust.',
  'Review the schedule honestly and move one action to a more realistic time.',
  'Begin the session at the planned time, even if you begin with the Floor.',
  'Use steady technique and leave a little capacity in reserve.',
  'When friction appears, name it and take the first two-minute step.',
  'Do the next useful task before checking an optional notification.',
  'Keep the planned training size; do not add volume to prove a point.',
  'Practice a brief reset between work blocks instead of reaching for a screen.',
  'Use a prepared environment to make the good choice the easy one.',
  'If the plan feels too large, take the Floor without bargaining with yourself.',
  'Complete one session with attention on technique rather than speed.',
  'Leave a deliberate gap for recovery in a busy day.',
  'Return to a task after an interruption and finish one focused block.',
  'Record what made the most inconvenient action harder than expected.',
  'Keep the routine but reduce its size if your recovery signals ask for it.',
  'Close the arc with an honest review; identify one friction point to remove.',
  'Choose one small standard you can keep through an ordinary week.',
  'Raise one ambition only after the existing routine is steady.',
  'Use your planned movement session to practice calm, controlled progress.',
  'Protect a morning or evening anchor when the schedule changes.',
  'Take a full recovery action and notice whether it improves readiness.',
  'Give one important task a protected window before adding more tasks.',
  'Complete one promise you made to yourself at the time you chose.',
  'Prepare for a predictable distraction before it arrives.',
  'Repeat a routine that worked instead of redesigning it for novelty.',
  'Review what you can reliably do on a low-energy day.',
  'Choose consistency over extra effort when the day is already full.',
  'Set tomorrow’s first action in a place you will encounter it.',
  'Use the Floor early instead of waiting until the day becomes impossible.',
  'Record one change in your approach to setbacks, not just outcomes.',
  'Complete the next session with the same patient technique you started with.',
  'Define the difference between a challenge and unnecessary strain.',
  'Plan a rest day as deliberately as a training day.',
  'Use a distraction-free block to finish one meaningful piece of work.',
  'Identify which routines should remain after the 60 days.',
  'Check the system against your current life; edit the plan to fit reality.',
  'Choose a useful next action when motivation is not available.',
  'Protect sleep and recovery before choosing a bigger training target.',
  'Write the standard you want to carry into the next month.',
  'Review the 60 days with honesty: what changed, what stayed hard, what helped.',
  'Decide which routines to keep, adjust or let go, then choose one clear next step. Day 60 is a continuation, not a finish line.',
];

export const questXP: Record<QuestType, number> = {
  main: 100,
  side: 50,
  focus: 40,
  recovery: 30,
  bonus: 25,
};

export const questLabels: Record<QuestType, string> = {
  main: 'MAIN QUEST',
  side: 'SIDE QUEST',
  focus: 'FOCUS QUEST',
  recovery: 'RECOVERY QUEST',
  bonus: 'BONUS QUEST',
};

export const days: DaySpec[] = objectives.map((objective, index) => ({
  day: index + 1,
  arc: arcs.findIndex((arc) => index + 1 >= arc.start && index + 1 <= arc.end) + 1,
  objective,
}));

const supportingActions = [
  ['Set out what you need for tomorrow.', 'Put one item back where it belongs.'],
  ['Fill a water bottle and place it in sight.', 'Clear one distraction from your workspace.'],
  ['Write down the first step of tomorrow’s task.', 'Set a realistic stop time for the evening.'],
  ['Take a short outdoor walk without a performance target.', 'Prepare a simple meal or snack for later.'],
  ['Remove one unnecessary notification for today.', 'Tidy the space where your routine begins.'],
  ['Tell someone the time you plan to begin.', 'Choose tomorrow’s movement window.'],
  ['Record what made today easier to start.', 'Move your phone away for one block.'],
];

export function questsForDay(day: DaySpec): DayQuest[] {
  const supporting = supportingActions[(day.day - 1) % supportingActions.length];
  const restDay = day.day === 14;
  return [
    {
      id: `d${day.day}-main`, type: 'main', label: questLabels.main,
      title: restDay ? 'Protect a recovery day' : 'Move with intention', detail: day.objective, minutes: 20, xp: questXP.main,
      floor: restDay ? 'Five quiet minutes. No make-up training.' : 'Five minutes of easy movement. Stop while it still feels manageable.',
    },
    {
      id: `d${day.day}-side`, type: 'side', label: questLabels.side,
      title: 'Support the next start', detail: supporting[0], minutes: 8, xp: questXP.side, floor: 'Two minutes: prepare one thing for the next action.',
    },
    {
      id: `d${day.day}-focus`, type: 'focus', label: questLabels.focus,
      title: 'One task, one window', detail: 'Choose one meaningful task and work with notifications out of view.', minutes: 25, xp: questXP.focus, floor: 'Ten focused minutes on the first useful step.',
    },
    {
      id: `d${day.day}-recovery`, type: 'recovery', label: questLabels.recovery,
      title: 'Make room to recover', detail: 'Choose a short wind-down, mobility or quiet rest action that fits today.', minutes: 15, xp: questXP.recovery, floor: 'Five quiet minutes, away from the next demand.',
    },
    {
      id: `d${day.day}-bonus`, type: 'bonus', label: questLabels.bonus,
      title: 'Leave a useful note', detail: supporting[1], minutes: 5, xp: questXP.bonus, floor: 'Write one honest sentence. Optional means optional.',
    },
  ];
}

export const levels = [
  { level: 1, name: 'AWAKEN', threshold: 0 },
  { level: 2, name: 'STABILIZE', threshold: 500 },
  { level: 3, name: 'BUILD', threshold: 1300 },
  { level: 4, name: 'FORGE', threshold: 2500 },
  { level: 5, name: 'DISCIPLINE', threshold: 4100 },
  { level: 6, name: 'MOMENTUM', threshold: 6200 },
  { level: 7, name: 'RISE', threshold: 9000 },
  { level: 8, name: 'ASCEND', threshold: 12500 },
] as const;

export const trainingSessions = [
  {
    id: 'A', name: 'FOUNDATION', note: 'Move through a comfortable range. Leave room to repeat the session.',
    exercises: [
      { id: 'sit-to-stand', name: 'Sit-to-stand', dose: '2 × 8 repetitions', technique: 'Sit toward a stable chair, then stand with feet grounded and a steady breath.', progression: 'When easy and comfortable, pause briefly above the chair or add a repetition.', safety: 'Use a secure chair and a range that feels controlled.' },
      { id: 'incline-push-up', name: 'Incline push-up', dose: '2 × 6–10 repetitions', technique: 'Hands on a stable elevated surface; keep your body in one comfortable line.', progression: 'Lower the hand support only when the current angle feels steady.', safety: 'Choose a surface that will not move; stop for sharp pain.' },
      { id: 'hip-bridge', name: 'Hip bridge', dose: '2 × 10 repetitions', technique: 'Lie on your back, feet grounded; raise hips gently without arching your back.', progression: 'Add a brief pause at the top before increasing repetitions.', safety: 'Keep the movement comfortable and controlled.' },
      { id: 'bird-dog', name: 'Bird-dog', dose: '2 × 6 each side', technique: 'From hands and knees, extend opposite arm and leg without twisting the trunk.', progression: 'Lengthen the pause only when you can keep the hips level.', safety: 'Use a smaller range if balance or back comfort changes.' },
      { id: 'plank', name: 'Plank', dose: '3 × 15–25 seconds', technique: 'Hold a comfortable incline or floor position, breathing steadily without sagging.', progression: 'Build a few seconds at a time; stop before your form breaks.', safety: 'Use an incline variation or skip if your shoulders or back feel uncomfortable.' },
    ],
  },
  {
    id: 'B', name: 'BALANCE', note: 'Control comes before range. A stable backpack is optional.',
    exercises: [
      { id: 'step-back-lunge', name: 'Step-back lunge', dose: '2 × 6 each side', technique: 'Step back to a comfortable stance and lower only as far as you can control.', progression: 'Increase depth or repetitions gradually, not both at once.', safety: 'Use a wall or chair for balance; reduce depth as needed.' },
      { id: 'wall-push-up', name: 'Wall / incline push-up', dose: '2 × 8 repetitions', technique: 'Keep hands on a secure wall or elevated support; move through a steady range.', progression: 'Use a slightly lower stable support when the current variation is comfortable.', safety: 'Check the support before leaning into it.' },
      { id: 'bridge-march', name: 'Bridge march', dose: '2 × 6 each side', technique: 'Start in a hip bridge; lift one foot slightly while keeping the pelvis level.', progression: 'Add a small pause only when the base bridge feels steady.', safety: 'Return to a regular bridge if the back or hips feel strained.' },
      { id: 'dead-bug', name: 'Dead bug', dose: '2 × 6 each side', technique: 'Move one arm and opposite leg slowly while keeping the trunk comfortably braced.', progression: 'Extend the range gradually while maintaining steady breathing.', safety: 'Shorten the lever or range if your back arches.' },
      { id: 'backpack-row', name: 'Backpack row', dose: '2 × 8–10 repetitions', technique: 'Use a light, securely closed backpack; hinge comfortably and draw elbows back.', progression: 'Add a small amount of weight only if the movement stays controlled.', safety: 'Inspect the bag and straps; do not use a damaged or unstable load.' },
    ],
  },
] as const;

export const faqItems = [
  { q: 'What is ARISE ARC?', a: 'A structured 60-day guide and interactive system for building steadier routines around movement, focus, discipline and recovery.' },
  { q: 'Who is it for?', a: 'For people who want a practical reset with room for real schedules, low-energy days and imperfect weeks.' },
  { q: 'Is this a workout program?', a: 'Training is one part of it. The system also includes focus, recovery, reflection and a way to return after a missed day.' },
  { q: 'How does the 60-day system work?', a: 'Five arcs organize the days into a gradual path. Daily quests offer a clear action, a smaller Floor option and a place to record progress.' },
  { q: 'What happens if I miss a day?', a: 'Your logged progress stays. The Comeback Protocol helps you choose the next reasonable action; there is no restart.' },
  { q: 'What is the Floor Rule?', a: 'Every quest has a smaller minimum for difficult days. A smaller completed action can be better than abandoning a perfect plan.' },
  { q: 'Does the system require equipment?', a: 'The initial movement sessions are mostly bodyweight. A stable incline or light backpack can be useful but is not required for every action.' },
  { q: 'Is this medical advice?', a: 'No. ARISE ARC offers general educational guidance, not diagnosis or treatment. Consider your own circumstances and seek qualified advice when appropriate.' },
  { q: 'How do I access the digital guide?', a: 'The interactive preview is available here. Purchase pricing and checkout are not configured on this site yet; contact support for availability.' },
] as const;
