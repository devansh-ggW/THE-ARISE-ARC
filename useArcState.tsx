import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { questsForDay, days, type DayQuest, levels } from '../data/system';

const STORAGE_KEY = 'arise-arc-system-v1';
export type ParticipationKey = 'environment' | 'scrolling' | 'commitment' | 'reflection';
type XpEvent = { id: string; amount: number; at: string; label: string };
type QuestRecord = { floor: boolean; completedAt: string };
type FocusEntry = { id: string; minutes: number; at: string };
type Recovery = { sleep: number; mobility: number; rest: boolean; windDown: boolean; stress: number; energy: number; soreness: number };
type Checkpoint = Record<string, string>;
export type ArcState = {
  activeDay: number;
  questLog: Record<string, QuestRecord>;
  xpEvents: XpEvent[];
  dayDates: string[];
  comebacks: string[];
  missedSessions: number;
  defeatedBosses: string[];
  discipline: number;
  focusSessions: FocusEntry[];
  reflections: Record<string, Checkpoint>;
  checkpointWeeks: string[];
  recovery: Recovery;
  recoveryUpdatedOn: string;
  trainingDone: string[];
  trainingDates: string[];
  focusInterruptions: number;
  participation: Record<string, ParticipationKey[]>;
};

type StateContext = {
  state: ArcState;
  xpTotal: number;
  xpToday: number;
  currentLevel: (typeof levels)[number];
  levelProgress: number;
  currentStreak: number;
  bestStreak: number;
  activeness: number;
  isQuestDone: (id: string) => boolean;
  isDayDone: (day: number) => boolean;
  setActiveDay: (day: number) => void;
  completeQuest: (quest: DayQuest, floor: boolean) => void;
  completeFocusQuest: (day: number, minutes: number) => void;
  completeRecoveryQuest: (day: number) => void;
  logMissedSession: () => void;
  recordComeback: () => void;
  defeatBoss: (id: string) => void;
  updateRecovery: (patch: Partial<Recovery>) => void;
  toggleTraining: (id: string) => void;
  recordInterruption: () => void;
  toggleParticipation: (key: ParticipationKey) => void;
  saveCheckpoint: (week: string, answers: Checkpoint) => void;
};

const initialState: ArcState = {
  activeDay: 1,
  questLog: {},
  xpEvents: [],
  dayDates: [],
  comebacks: [],
  missedSessions: 0,
  defeatedBosses: [],
  discipline: 0,
  focusSessions: [],
  reflections: {},
  checkpointWeeks: [],
  recovery: { sleep: 7, mobility: 0, rest: false, windDown: false, stress: 3, energy: 6, soreness: 2 },
  recoveryUpdatedOn: '',
  trainingDone: [],
  trainingDates: [],
  focusInterruptions: 0,
  participation: {},
};

const StateContextObject = createContext<StateContext | null>(null);
const localDayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const localDateForIso = (value: string) => localDayKey(new Date(value));
const addDays = (key: string, amount: number) => {
  const [year, month, day] = key.split('-').map(Number);
  const date = new Date(year, month - 1, day + amount);
  return localDayKey(date);
};

function readState(): ArcState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const saved = JSON.parse(raw) as Partial<ArcState>;
    return {
      ...initialState,
      ...saved,
      recovery: { ...initialState.recovery, ...saved.recovery },
      questLog: saved.questLog ?? {},
      xpEvents: saved.xpEvents ?? [],
      dayDates: saved.dayDates ?? [],
      comebacks: saved.comebacks ?? [],
      defeatedBosses: saved.defeatedBosses ?? [],
      discipline: saved.discipline ?? 0,
      focusSessions: saved.focusSessions ?? [],
      reflections: saved.reflections ?? {},
      checkpointWeeks: saved.checkpointWeeks ?? [],
      trainingDone: saved.trainingDone ?? [],
      trainingDates: saved.trainingDates ?? [],
      participation: saved.participation ?? {},
      recoveryUpdatedOn: saved.recoveryUpdatedOn ?? '',
    };
  } catch {
    return initialState;
  }
}

function countStreak(dates: string[], from: string) {
  const set = new Set(dates);
  let cursor = from;
  if (!set.has(cursor)) cursor = addDays(cursor, -1);
  if (!set.has(cursor)) return 0;
  let total = 0;
  while (set.has(cursor)) {
    total += 1;
    cursor = addDays(cursor, -1);
  }
  return total;
}

function longestStreak(dates: string[]) {
  const set = new Set(dates);
  let longest = 0;
  for (const date of set) longest = Math.max(longest, countStreak([...set], date));
  return longest;
}

export function ArcStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ArcState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Private browsing may block storage. */ }
  }, [state, ready]);

  const isQuestDone = useCallback((id: string) => Boolean(state.questLog[id]), [state.questLog]);
  const isDayDone = useCallback((day: number) => {
    const spec = days[day - 1];
    if (!spec) return false;
    return questsForDay(spec).filter((quest) => quest.type !== 'bonus').every((quest) => Boolean(state.questLog[quest.id]));
  }, [state.questLog]);

  const addXp = (draft: ArcState, id: string, amount: number, label: string) => {
    if (draft.xpEvents.some((event) => event.id === id)) return draft;
    return { ...draft, xpEvents: [...draft.xpEvents, { id, amount, at: new Date().toISOString(), label }].slice(-1200) };
  };

  const finishQuest = useCallback((quest: DayQuest, floor: boolean) => {
    setState((previous) => {
      if (previous.questLog[quest.id]) return previous;
      const now = new Date();
      const completedAt = now.toISOString();
      let next: ArcState = { ...previous, questLog: { ...previous.questLog, [quest.id]: { floor, completedAt } } };
      next = addXp(next, `quest:${quest.id}`, quest.xp, quest.label);
      const day = Number(quest.id.match(/^d(\d+)-/)?.[1] ?? 1);
      const core = questsForDay(days[day - 1]).filter((item) => item.type !== 'bonus');
      const allCoreDone = core.every((item) => Boolean(next.questLog[item.id]));
      if (allCoreDone) {
        const dayKey = localDayKey(now);
        next = addXp(next, `challenge:${day}`, 150, 'Daily challenge completed');
        next = { ...next, dayDates: [...new Set([...next.dayDates, dayKey])] };
      }
      return next;
    });
  }, []);

  const completeFocusQuest = useCallback((day: number, minutes: number) => {
    const spec = days[day - 1];
    if (!spec) return;
    const quest = questsForDay(spec).find((item) => item.type === 'focus');
    if (!quest) return;
    setState((previous) => {
      const now = new Date();
      const completedAt = now.toISOString();
      let next: ArcState = {
        ...previous,
        focusSessions: [{ id: `${now.getTime()}`, minutes, at: completedAt }, ...previous.focusSessions].slice(0, 100),
        focusInterruptions: 0,
      };
      if (!next.questLog[quest.id]) {
        next = { ...next, questLog: { ...next.questLog, [quest.id]: { floor: minutes < quest.minutes, completedAt } } };
        next = addXp(next, `quest:${quest.id}`, quest.xp, quest.label);
        const core = questsForDay(spec).filter((item) => item.type !== 'bonus');
        if (core.every((item) => Boolean(next.questLog[item.id]))) {
          next = addXp(next, `challenge:${day}`, 150, 'Daily challenge completed');
          next = { ...next, dayDates: [...new Set([...next.dayDates, localDayKey(now)])] };
        }
      }
      return next;
    });
  }, []);

  const completeRecoveryQuest = useCallback((day: number) => {
    const spec = days[day - 1];
    const quest = spec && questsForDay(spec).find((item) => item.type === 'recovery');
    if (quest) finishQuest(quest, false);
  }, [finishQuest]);

  const recordComeback = useCallback(() => {
    setState((previous) => {
      const now = new Date();
      let next: ArcState = { ...previous, comebacks: [...previous.comebacks, now.toISOString()], missedSessions: 0 };
      next = addXp(next, `comeback:${now.getTime()}`, 75, 'Comeback recorded');
      return next;
    });
  }, []);

  const defeatBoss = useCallback((id: string) => {
    setState((previous) => {
      if (previous.defeatedBosses.includes(id)) return previous;
      let next: ArcState = { ...previous, defeatedBosses: [...previous.defeatedBosses, id], discipline: previous.discipline + (id === 'bed' ? 1 : 0) };
      next = addXp(next, `boss:${id}`, 300, 'Boss battle defeated');
      return next;
    });
  }, []);

  const updateRecovery = useCallback((patch: Partial<Recovery>) => {
    setState((previous) => ({ ...previous, recovery: { ...previous.recovery, ...patch }, recoveryUpdatedOn: localDayKey() }));
  }, []);

  const toggleTraining = useCallback((id: string) => {
    setState((previous) => {
      const wasDone = previous.trainingDone.includes(id);
      return {
        ...previous,
        trainingDone: wasDone ? previous.trainingDone.filter((item) => item !== id) : [...previous.trainingDone, id],
        trainingDates: wasDone ? previous.trainingDates : [...new Set([...previous.trainingDates, localDayKey()])],
      };
    });
  }, []);

  const recordInterruption = useCallback(() => {
    setState((previous) => ({ ...previous, focusInterruptions: previous.focusInterruptions + 1 }));
  }, []);

  const logMissedSession = useCallback(() => {
    setState((previous) => ({ ...previous, missedSessions: previous.missedSessions + 1 }));
  }, []);

  const toggleParticipation = useCallback((key: ParticipationKey) => {
    const today = localDayKey();
    setState((previous) => {
      const current = previous.participation[today] ?? [];
      const next = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
      return { ...previous, participation: { ...previous.participation, [today]: next } };
    });
  }, []);

  const saveCheckpoint = useCallback((week: string, answers: Checkpoint) => {
    setState((previous) => {
      const alreadySaved = previous.checkpointWeeks.includes(week);
      let next: ArcState = {
        ...previous,
        reflections: { ...previous.reflections, [week]: answers },
        checkpointWeeks: alreadySaved ? previous.checkpointWeeks : [...previous.checkpointWeeks, week],
      };
      if (!alreadySaved) next = addXp(next, `checkpoint:${week}`, 100, 'Weekly checkpoint');
      return next;
    });
  }, []);

  const xpTotal = state.xpEvents.reduce((sum, event) => sum + event.amount, 0);
  const today = localDayKey();
  const xpToday = state.xpEvents.filter((event) => localDateForIso(event.at) === today).reduce((sum, event) => sum + event.amount, 0);
  const levelIndex = Math.max(0, levels.findIndex((level, index) => {
    const next = levels[index + 1];
    return xpTotal >= level.threshold && (!next || xpTotal < next.threshold);
  }));
  const currentLevel = levels[levelIndex];
  const nextThreshold = levels[levelIndex + 1]?.threshold ?? currentLevel.threshold + 1;
  const levelProgress = levelIndex === levels.length - 1 ? 100 : Math.round(((xpTotal - currentLevel.threshold) / (nextThreshold - currentLevel.threshold)) * 100);
  const currentStreak = countStreak(state.dayDates, today);
  const bestStreak = Math.max(currentStreak, longestStreak(state.dayDates));
  const questEntriesToday = Object.entries(state.questLog).filter(([, entry]) => localDateForIso(entry.completedAt) === today);
  const movementToday = questEntriesToday.some(([id]) => id.endsWith('-main')) ? 1 : 0;
  const questToday = questEntriesToday.length > 0 ? 1 : 0;
  const focusToday = state.focusSessions.some((session) => localDateForIso(session.at) === today) || questEntriesToday.some(([id]) => id.endsWith('-focus')) ? 1 : 0;
  const trainingToday = state.trainingDates.includes(today) ? 1 : 0;
  const recoveryToday = state.recoveryUpdatedOn === today || questEntriesToday.some(([id]) => id.endsWith('-recovery')) ? 1 : 0;
  const sleepToday = state.recoveryUpdatedOn === today && state.recovery.sleep > 0 ? 1 : 0;
  const selfManagementToday = state.participation[today]?.length ?? 0;
  const activeness = Math.min(10, movementToday + questToday + focusToday + trainingToday + recoveryToday + sleepToday + selfManagementToday);

  const value = useMemo<StateContext>(() => ({
    state, xpTotal, xpToday, currentLevel, levelProgress, currentStreak, bestStreak, activeness,
    isQuestDone,
    isDayDone,
    setActiveDay: (day) => setState((previous) => ({ ...previous, activeDay: Math.min(60, Math.max(1, day)) })),
    completeQuest: finishQuest,
    completeFocusQuest,
    completeRecoveryQuest,
    logMissedSession,
    recordComeback,
    defeatBoss,
    updateRecovery,
    toggleTraining,
    recordInterruption,
    toggleParticipation,
    saveCheckpoint,
  }), [state, xpTotal, xpToday, currentLevel, levelProgress, currentStreak, bestStreak, activeness, isQuestDone, isDayDone, finishQuest, completeFocusQuest, completeRecoveryQuest, logMissedSession, recordComeback, defeatBoss, updateRecovery, toggleTraining, recordInterruption, toggleParticipation, saveCheckpoint]);

  return <StateContextObject.Provider value={value}>{children}</StateContextObject.Provider>;
}

export function useArcState() {
  const context = useContext(StateContextObject);
  if (!context) throw new Error('useArcState must be used inside ArcStateProvider');
  return context;
}

export function weekKey(date = new Date()) {
  const target = new Date(date);
  const day = (target.getDay() + 6) % 7;
  target.setDate(target.getDate() - day + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDay = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDay + 3);
  const week = 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `${target.getFullYear()}-W${String(week).padStart(2, '0')}`;
}
