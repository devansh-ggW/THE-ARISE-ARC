import { Moon, Wind } from 'lucide-react';
import { Eyebrow } from '../components/Primitives';
import { useArcState } from '../hooks/useArcState';

function ScaleControl({ label, value, onChange, left, right }: { label: string; value: number; onChange: (value: number) => void; left: string; right: string }) {
  return <label className="recovery-scale"><span className="recovery-scale__heading"><b>{label}</b><strong>{value}<i> / 10</i></strong></span><input type="range" min="0" max="10" value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={label} /><span className="recovery-scale__ends"><small>{left}</small><small>{right}</small></span></label>;
}

export function RecoveryPanel() {
  const { state, updateRecovery, completeRecoveryQuest } = useArcState();
  const recovery = state.recovery;
  const hasDeficit = recovery.sleep < 6 || recovery.stress >= 8 || recovery.soreness >= 8;
  return <section className="system-panel recovery-panel" id="recovery" aria-labelledby="recovery-heading">
    <div className="system-panel__heading"><div><Eyebrow number="13">RECOVERY / PART OF THE WORK</Eyebrow><h2 id="recovery-heading">Readiness before demand.</h2></div><div className="recovery-emblem"><Moon size={22} /><Wind size={15} /></div></div>
    <p className="system-panel__intro">Recovery is not a reward for finishing. Use the signals to set a reasonable size for today. This log stays in your browser.</p>
    {hasDeficit && <div className="recovery-prompt" role="status"><span>READINESS NOTE</span><p>Consider lowering today's demand and choosing recovery or the Floor. You do not need to make anything up tomorrow.</p></div>}
    <div className="recovery-fields">
      <label className="recovery-hours"><span><b>SLEEP</b><small>HOURS LAST NIGHT</small></span><input aria-label="Hours of sleep last night" type="number" min="0" max="24" step="0.5" value={recovery.sleep} onChange={(event) => updateRecovery({ sleep: Math.max(0, Math.min(24, Number(event.target.value))) })} /><i>hrs</i></label>
      <label className="recovery-hours"><span><b>MOBILITY</b><small>MINUTES TODAY</small></span><input aria-label="Minutes of mobility today" type="number" min="0" max="180" step="1" value={recovery.mobility} onChange={(event) => updateRecovery({ mobility: Math.max(0, Math.min(180, Number(event.target.value))) })} /><i>min</i></label>
    </div>
    <div className="recovery-scales"><ScaleControl label="STRESS" value={recovery.stress} onChange={(value) => updateRecovery({ stress: value })} left="CALMER" right="HIGHER" /><ScaleControl label="ENERGY" value={recovery.energy} onChange={(value) => updateRecovery({ energy: value })} left="LOW" right="READY" /><ScaleControl label="SORENESS" value={recovery.soreness} onChange={(value) => updateRecovery({ soreness: value })} left="EASY" right="ACCUMULATING" /></div>
    <div className="recovery-checks"><label><input type="checkbox" checked={recovery.rest} onChange={(event) => updateRecovery({ rest: event.target.checked })} /><span><b>REST DAY</b><small>Planned with intention</small></span></label><label><input type="checkbox" checked={recovery.windDown} onChange={(event) => updateRecovery({ windDown: event.target.checked })} /><span><b>WIND-DOWN</b><small>Made room to settle</small></span></label></div>
    <div className="recovery-footer"><span>Saved automatically on this device.</span><button className="system-action" type="button" onClick={() => completeRecoveryQuest(state.activeDay)}>Log today's recovery quest <span>+30 XP</span></button></div>
  </section>;
}
