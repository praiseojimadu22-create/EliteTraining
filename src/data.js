// ─── DRILLS ────────────────────────────────────────────────────────────────

export const DRILLS = {
  1: {
    name: 'Reaction Matrix',
    area: 'agility',
    cones: 16,
    space: '9×9m',
    timed: false,
    target: 'Sub-2s reaction | 85%+ HR throughout',
    steps: [
      'Setup: 16 cones in a 4×4 grid with 1.5m spacing. Number all cones 1–16. Colour-code in 4 groups of 4 (red, blue, yellow, green) distributed evenly across the grid.',
      'Coach calls multi-cone sequences — e.g. "Red-3 → Blue-7 → Yellow-12". The next cone is called within 2 seconds of your arrival at the previous cone.',
      'Use a different movement pattern to reach each cone, rotating through: Burst sprint | Lateral shuffle (hips remain square to the front) | Backpedal run (eyes forward, push off toes, controlled backward drive) | Lateral crossover run (lead leg crosses in front of the trailing leg then behind it, alternating each stride — continuous side-to-side momentum).',
      'Reaction window: 2 seconds from call to first step. Wrong cone or missed window = rep nullified and restarted immediately. Does not count toward set total.',
      'Heart rate must hold at 85%+ maximum throughout each set.',
    ],
  },
  2: {
    name: 'Multi-Plane Chaos',
    area: 'agility',
    cones: 20,
    space: '12×12m',
    timed: true,
    timedDuration: 300,
    target: '0.5s transition | Perfect form under fatigue',
    steps: [
      'Scatter 20 cones randomly across the 12×12m zone — no two cones within 1.5m of each other.',
      '6 movements called randomly via whistle + verbal cue: Forward burst sprint | Lateral shuffle (hips square forward) | Backward run (eyes forward, weight on toes) | Lateral crossover run (lead crosses in front then behind — unbroken lateral momentum) | High-knee sprint (drive each knee to hip height, full opposing arm drive, maximum cadence) | Heel-drive sprint (aggressively cycle heels toward glutes on each stride while maintaining forward lean and high step frequency — full sprint turnover, not a jog).',
      'On each whistle: sprint to nearest cone, tag it, immediately transition. New movement called simultaneously with every whistle — no coasting between calls.',
      'Transition window: 0.5 seconds from whistle to change of movement.',
      'Form breakdown under fatigue = flagged by coach and corrected before the next call.',
    ],
  },
  3: {
    name: 'Professional Ladder',
    area: 'agility',
    cones: 12,
    space: '3 lanes × 4m',
    timed: false,
    target: 'Sub-8s per 3-lane run',
    steps: [
      '3 parallel lanes running in the same direction. Each lane: 4 cones at 1m spacing = 4m per lane. Lanes 1m apart laterally.',
      'Lane 1 — Two-In One-Out: both feet land between each cone gate; one foot exits laterally outside the lane on every third gate. Maximum foot speed, no hesitation.',
      'Lane 2 — Alternating single-leg bounds: one explosive bound per gate, alternating lead leg each time. Drive knee to hip height, land and immediately load for the next bound.',
      'Lane 3 — Lateral crossover: sidestep through the lane end-to-end without feet making contact between gates. Lead foot crosses, trail foot follows — unbroken lateral momentum.',
      'Complete all 3 lanes continuously — zero pause between lanes. Walk back to Lane 1 start after each run (counts as active time). Target: sub-8 seconds per full 3-lane run.',
    ],
  },
  4: {
    name: 'Elite Start Variations',
    area: 'accel',
    cones: 8,
    space: '2 lanes × 25m',
    timed: false,
    target: 'Standing/3-pt <1.55s · Kneeling/Seated <1.70s · Prone/Supine <1.85s · All <3.2s (25m)',
    steps: [
      '2 parallel sprint lanes, 2m apart. Cones at 0m, 10m, 15m, and 25m per lane = 8 cones total.',
      'Rotate through 6 starting positions, minimum 2 reps each per set: Prone (face down) | Supine (face up) | Seated | Kneeling | Three-point stance | Standing.',
      'On signal: explode from position to maximum velocity immediately — no slow build.',
      'Drive phase (0–10m): 45° forward body lean, aggressive knee drive, arms pumping through full range. Do not rise to upright posture before the 10m mark.',
      'Top-end phase (10–25m): full stride extension, maintain mechanics at maximum effort. Do not decelerate before the 25m cone.',
      'Time targets — Standing/3-point: under 1.55s (10m) | Kneeling/Seated: under 1.70s (10m) | Prone/Supine: under 1.85s (10m) | All starts: under 3.2s (25m). Walk back — no jogging, preserve explosive quality.',
    ],
  },
  5: {
    name: 'Deceleration Mastery',
    area: 'accel',
    cones: 6,
    space: '25m lane',
    timed: false,
    target: 'Stop in 3 strides | Within 1m zone | Immediate re-acceleration',
    steps: [
      'Single sprint lane. Cones at: 0m (start) | 8m (velocity marker) | 12m (deceleration trigger) | 16m, 21m, 25m (stop zones — rotate each rep).',
      'Sprint from 0m — reach maximum speed by the 8m marker.',
      'Coach calls the stop zone at the 8m marker only — react in real time, never anticipate early.',
      'On passing the 12m cone: controlled deceleration — drop hips, shorten stride progressively, shift weight toward heels. Not a crash stop or stumble.',
      'Complete stop in 3 strides or fewer. More than 3 strides = failed rep. Both feet must land within the 1m target zone.',
      'Immediately re-accelerate at 95%+ toward the next zone. Stop zones rotate: 16m, 21m, or 25m.',
    ],
  },
  6: {
    name: 'Cut Sequence',
    area: 'cut',
    cones: 24,
    space: '18×18m',
    timed: false,
    target: '120°+ direction change | Ground contact <0.2s | Immediate re-acceleration',
    steps: [
      '24 cones forming 4 overlapping approach-cut-exit channels across the 18×18m area. Each channel: 6m approach lane → 1 cut point → 4m exit lane.',
      'Approach (6m): run at 90% speed — genuinely fast, not a build-up jog.',
      'Plant and cut: direction change of 120° minimum. Anything less = failed rep, does not count toward set total.',
      'Cut mechanics: cutting foot lands outside the body\'s centre line, knee bent to 90°, drive off the outside edge of the foot. Ground contact time target: under 0.2 seconds — no pause or weight-shift hesitation.',
      'Exit (4m): re-accelerate to 95% immediately off the cut — full sprint effort out of the plant.',
      'Rotate cut types within each set, minimum 4 reps per direction: inside cut left | inside cut right | outside cut left | outside cut right.',
    ],
  },
  7: {
    name: 'Professional Evasion',
    area: 'cut',
    cones: 30,
    space: 'Penalty area',
    timed: false,
    target: 'Under 10s per course | No cone contact | Different move every cone',
    steps: [
      '30 cones in 3 staggered rows — 10 cones per row, 1.5m between cones within each row, 3m between rows.',
      '3 prescribed evasion moves — know all three before starting: Inside cut (plant outside foot firmly, drive sharply to the inside) | Outside cut (shoulder drop or head fake to sell inside, then plant and drive outside) | Double-step fake (2 rapid short steps at the cone to break defensive timing, then accelerate past).',
      'Navigate the full 30-cone course at match speed. Every cone must be beaten using one of the 3 prescribed moves.',
      'No two consecutive cones may use the same move — plan and adapt the sequence as you go.',
      'Maintain ball-carrier posture throughout: chest up, arms active, low centre of gravity, no hunching. Target: under 10 seconds per course.',
      'Cone contact = failed rep, restart immediately. Phase 3 onwards: coach calls the required move at each cone in real time — no pre-planning allowed.',
    ],
  },
  8: {
    name: 'Match Simulation Cuts',
    area: 'cut',
    cones: 15,
    space: '18×18m',
    timed: true,
    timedDuration: 300,
    target: '5s max from call to cut | 90%+ effort | Three-phase movement',
    steps: [
      '15 cones marking match-relevant positions: near post, far post, penalty spot, edge of area, and wide channels on both sides.',
      'Coach calls a scenario — execute the correct movement at 90%+ effort. 5-second maximum from call to completion of the cut.',
      'Scenarios: Overlap run (wide channel to byline, sprint pace) | Through-ball diagonal (accelerate on a diagonal angle, timed off the call) | 1v1 receive (check away from the cone to create separation, burst back) | Near-post cut (sharp late-angle run, driven off back foot) | Far-post run (sustained diagonal sprint, maintain full speed to the far cone) | Checking run (drive deep to pin the defender, cut sharply back toward the ball).',
      'Every movement must contain three phases: approach run → directional cut → finish acceleration.',
      'Phase 2 onwards: two scenarios called back-to-back with no pause — chain movements without breaking stride.',
    ],
  },
};

// ─── SET CALCULATION ───────────────────────────────────────────────────────

const BASE_REPS = {
  1: [20, 22, 22, 18],
  3: [20, 22, 22, 18],
  4: [16, 18, 18, 14],
  5: [16, 18, 18, 14],
  6: [20, 22, 22, 18],
  7: [8, 10, 10, 6],
};

export function getSets(drillId, phase) {
  if (DRILLS[drillId].timed) {
    return { timed: true, count: [4, 5, 5, 6][phase - 1], duration: 300 };
  }
  const base = BASE_REPS[drillId] || [12, 14, 14, 12];
  const addReps = [0, 2, 4, 4][phase - 1];
  const numSets = [4, 5, 5, 6][phase - 1];
  const sets = [];
  for (let i = 0; i < numSets; i++) {
    const baseRep = base[Math.min(i, base.length - 1)];
    sets.push(i < base.length ? baseRep + addReps : baseRep + addReps - 2);
  }
  return { timed: false, sets };
}

// ─── CONE DAYS ─────────────────────────────────────────────────────────────

export const CONE_DAYS = [
  { day: 1,  phase: 1, drills: [1,4,7,3] },
  { day: 2,  phase: 1, drills: [6,5,2,8] },
  { day: 3,  phase: 1, drills: [3,7,4,1] },
  { day: 4,  phase: 1, drills: [2,8,6,5] },
  { day: 5,  phase: 2, drills: [6,2,3,4] },
  { day: 6,  phase: 2, drills: [5,1,8,7] },
  { day: 7,  phase: 2, drills: [8,2,6,1] },
  { day: 8,  phase: 2, drills: [5,3,7]   },
  { day: 9,  phase: 3, drills: [7,8,4,2,6] },
  { day: 10, phase: 3, drills: [3,1,5]   },
  { day: 11, phase: 3, drills: [4,7,3,2] },
  { day: 12, phase: 3, drills: [1,6,8,5] },
  { day: 13, phase: 4, drills: [2,1,7]   },
  { day: 14, phase: 4, drills: [3,4,8,2,6] },
  { day: 15, phase: 4, drills: [5,1,7]   },
  { day: 16, phase: 4, drills: [6,3,4,8] },
  { day: 17, phase: 4, drills: [6,2,3,5] },
  { day: 18, phase: 4, drills: [7,1,4,8] },
  { day: 19, phase: 4, drills: [5,6,1,2] },
  { day: 20, phase: 4, drills: [4,3,7,8] },
];

// ─── FITNESS DAYS ──────────────────────────────────────────────────────────

export const FITNESS_DAYS = [
  {
    week: 1, name: 'Long Run', badge: 'RUN', icon: '🏃',
    detail: '10km · 10min rest at 5km · Target sub-60min',
    steps: [
      'Mark a 10km route or use a measured track.',
      'Run the first 5km at a controlled, sustainable pace — target under 30min for the first split.',
      'Take exactly 10 minutes rest at the 5km mark. Sit or walk slowly — full recovery.',
      'Complete the second 5km. Total run time target: under 60 minutes (rest excluded).',
      'Approximate pace: 5:45–6:00 per km.',
    ],
  },
  {
    week: 2, name: 'Fartlek A', badge: 'FARTLEK', icon: '⚡',
    detail: '40min · 9 hard intervals · 80–85% HR',
    steps: [
      '5 min easy warm-up jog — genuine easy pace, not a fast jog.',
      'Cycle 9 times: 90 seconds hard effort (80–85% HR) → 2 min easy jog.',
      'Hard effort = sustained controlled running you can hold for 90s, not a sprint. If you cannot hold form, you are going too hard.',
      'Easy jog = active recovery. Keep moving, let HR drop slightly before the next hard interval.',
      '5 min cool-down jog. Total session: ~40 minutes.',
    ],
  },
  {
    week: 3, name: 'Manchester United Run', badge: 'SPRINT', icon: '💥',
    detail: '22 reps · 22 minutes · 91.4m sprint lane',
    steps: [
      'Mark a 91.4m (100-yard) sprint lane. 1 rep per minute — sprint 100 yards then jog back. Whatever time remains in that minute is your rest.',
      'Rounds 1–10 (one rep each): sprint in 25s / jog back in 35s.',
      'Rounds 11–20 (one rep each, getting faster): 24s/36s → 23s/37s → 22s/38s → 21s/39s → 20s/40s → 19s/41s → 18s/42s → 17s/43s → 16s/44s.',
      'Round 21–22 (final round at 15s/45s): the test is maxed if you complete all 3 possible sets at this pace.',
      'If you fail a sprint time, the session ends at that point — record your exit round for Week 7 comparison.',
    ],
  },
  {
    week: 4, name: 'John Terry Run', badge: 'INTERVAL', icon: '🔥',
    detail: '15 sets · 100m out-and-back · 60s windows',
    steps: [
      'Mark a 50m out-and-back lane — cone at 0m, cone at 50m.',
      'Sprint 50m to the far cone and back (100m total). Whatever time remains inside 60 seconds is your rest.',
      'Pace target: cover 100m in 18–20 seconds, leaving 40–42 seconds rest. If you finish in 22+ seconds, rest shrinks — that is the penalty for fading.',
      '15 sets total. By set 10, holding sub-20s is the real test.',
      'Heart rate must not drop below 80% during rest windows. If it drops, you went too slow.',
    ],
  },
  {
    week: 5, name: 'Long Run', badge: 'RUN', icon: '🏃',
    detail: '10km · No rest break · Target sub-57min',
    steps: [
      'Mark a 10km route.',
      'Run the full 10km without stopping — no rest break.',
      'Target: sub-57 minutes. Approximate pace: 5:30–5:45 per km.',
      'Maintain even splits — do not go out too fast in the first 3km or the second half will suffer.',
    ],
  },
  {
    week: 6, name: 'Bleep Test', badge: 'BENCHMARK', icon: '📡',
    detail: 'Run to failure · Record level + shuttle number',
    steps: [
      'Mark two lines exactly 20m apart. Use a bleep test audio track (free on YouTube or app).',
      'Each level increases pace by 0.5 km/h, starting at 8.5 km/h. You must reach the opposite line before the beep.',
      'One warning for being late to the line — second late arrival = test over. Run until you genuinely fail.',
      'Record the exact level and shuttle number where you stop.',
      'Benchmarks: Level 10 = solid base | Level 12 = good | Level 13+ = elite footballing range. This score is your Week 6 baseline — compare it against Week 9 and Week 12.',
    ],
  },
  {
    week: 7, name: 'Manchester United Run', badge: 'SPRINT', icon: '💥',
    detail: 'Full 22 reps · Target: beat Week 3 exit round',
    steps: [
      'Same setup as Week 3 — 91.4m sprint lane, 1 rep per minute, 22 minutes total.',
      'Same rep structure: start at 25s/35s and get progressively faster each round.',
      'Your target is to reach a higher exit round than Week 3, or complete all 22 reps.',
      'Record completion status and compare directly to Week 3 result.',
    ],
  },
  {
    week: 8, name: 'Fartlek B', badge: 'FARTLEK', icon: '⚡',
    detail: '55min · 3 blocks · ~26min hard work',
    steps: [
      '5 min easy warm-up jog.',
      'Block 1 — 4 rounds: 3 min hard effort (85–90% HR) → 90s easy jog.',
      'Block 2 — 6 rounds: 45s maximum sprint effort → 90s easy jog.',
      'Block 3 — 3 rounds: 2 min hard effort → 60s easy jog.',
      '5 min cool-down jog. Total hard work embedded: ~26 minutes. Total session: ~55 minutes continuous movement.',
    ],
  },
  {
    week: 9, name: 'John Terry + Bleep Test', badge: 'COMBO', icon: '🔥',
    detail: 'John Terry (15 sets) → 10min rest → Bleep Test',
    steps: [
      'Part 1 — John Terry Field Run: 15 sets, pace target sub-20s per 100m, 60-second windows (same as Week 4).',
      'Take exactly 10 minutes rest after completing all 15 sets.',
      'Part 2 — Bleep Test: run to failure, record level and shuttle number.',
      'Compare this Bleep Test score against your Week 6 baseline. The delta shows your aerobic development over 3 weeks under training load.',
    ],
  },
  {
    week: 10, name: 'Long Run', badge: 'RUN', icon: '🏃',
    detail: '10km · No rest · Target sub-55min',
    steps: [
      'Mark a 10km route.',
      'Run the full 10km without stopping.',
      'Target: sub-55 minutes. Approximate pace: 5:15–5:30 per km.',
      'This is the peak long run target. Compare your km splits against Week 5.',
    ],
  },
  {
    week: 11, name: 'Manchester United Run', badge: 'SPRINT', icon: '💥',
    detail: 'Full 22 reps + 3 maxed sets at Round 11',
    steps: [
      'Same setup — 91.4m sprint lane, 1 rep per minute.',
      'Target: complete all 22 reps, including all 3 possible sets of the final 15s/45s round.',
      'Full completion at Round 11 = the test is maxed. This is the peak sprint endurance target.',
      'Record total completion status vs Week 7 result.',
    ],
  },
  {
    week: 12, name: 'John Terry + Bleep Test', badge: 'COMBO', icon: '🔥',
    detail: 'John Terry (18 sets, sub-17s) → 10min rest → Bleep Test',
    steps: [
      'Part 1 — John Terry (upgraded): 18 sets, pace target tightened to sub-17 seconds per 100m, 60-second windows.',
      'Take exactly 10 minutes rest.',
      'Part 2 — Bleep Test: run to failure. Record level and shuttle number.',
      'Compare against Week 6 and Week 9 scores. The Week 12 Bleep Test result vs Week 6 is your 12-week fitness development marker.',
    ],
  },
];
