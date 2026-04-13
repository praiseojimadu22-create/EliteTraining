import { CONE_DAYS, FITNESS_DAYS } from './data';

// Auto-assign: Tue = cone (odd index), Fri = cone (even index), Thu = fitness
export function autoAssign(startISO) {
  const start = new Date(startISO + 'T12:00:00');
  const out = {};

  CONE_DAYS.forEach((d, i) => {
    const dt = new Date(start);
    const week = Math.floor(i / 2);
    const offset = i % 2 === 0 ? 1 : 4; // Tue=+1, Fri=+4 from Monday
    dt.setDate(dt.getDate() + week * 7 + offset);
    out[`cone-${d.day}`] = dt.toISOString().split('T')[0];
  });

  FITNESS_DAYS.forEach((f) => {
    const dt = new Date(start);
    dt.setDate(dt.getDate() + (f.week - 1) * 7 + 3); // Thursday each week
    out[`fit-${f.week}`] = dt.toISOString().split('T')[0];
  });

  return out;
}

// Get week number relative to start date
export function weekNumber(dateISO, startISO) {
  const d = new Date(dateISO + 'T12:00:00');
  const s = new Date(startISO + 'T12:00:00');
  return Math.floor((d - s) / (7 * 24 * 3600 * 1000)) + 1;
}

// Format date for display
export function fmtDate(iso) {
  if (!iso) return 'Unscheduled';
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  });
}

// Format seconds as MM:SS
export function fmtTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Get all sessions sorted by date
export function sortedSessions(schedule, startDate) {
  const sessions = [];

  CONE_DAYS.forEach(d => {
    const id = `cone-${d.day}`;
    sessions.push({
      id,
      type: 'cone',
      label: `Cone Day ${d.day}`,
      sub: `Phase ${d.phase} · ${d.drills.length} drill${d.drills.length > 1 ? 's' : ''}`,
      phase: d.phase,
      date: schedule[id] || null,
    });
  });

  FITNESS_DAYS.forEach(f => {
    const id = `fit-${f.week}`;
    sessions.push({
      id,
      type: 'fit',
      label: f.name,
      sub: `Week ${f.week} Fitness · ${f.badge}`,
      icon: f.icon,
      badge: f.badge,
      date: schedule[id] || null,
    });
  });

  // Group by week number
  const groups = {};
  sessions.forEach(s => {
    const wk = s.date && startDate ? weekNumber(s.date, startDate) : 0;
    if (!groups[wk]) groups[wk] = [];
    groups[wk].push(s);
  });

  // Sort within groups by date
  Object.values(groups).forEach(g =>
    g.sort((a, b) => (a.date || '9999') > (b.date || '9999') ? 1 : -1)
  );

  return Object.keys(groups)
    .sort((a, b) => +a - +b)
    .map(wk => ({ week: +wk, data: groups[wk] }));
}
