import React from 'react';
import Svg, { Rect, G, Line, Text as ST, Path } from 'react-native-svg';
import { Arrow, Cone, Player } from './shared';

const W = 300, H = 272;
// 3 staggered rows, 10 cones each, 1.5m between cones, 3m between rows
// Scale: 1.5m = 28px → 9.5px/m
// Row y: 55, 138, 220  (83px = ~3m between rows)
// Cones per row: x = 18 + i*28, i=0..9 → x = 18,46,74,102,130,158,186,214,242,270
// Row 2 staggered: x = 18+14 + i*28 = 32 + i*28

const ROW_Y = [55, 138, 220];
const ROW_OFFSET = [0, 14, 0]; // stagger

function rowCones(rowIdx) {
  return Array.from({ length: 10 }, (_, i) => ({
    x: 18 + ROW_OFFSET[rowIdx] + i * 28,
    y: ROW_Y[rowIdx],
  }));
}

// Weaving path through all 3 rows
// Player enters from bottom, weaves through row 3 L→R, then row 2 R→L, then row 1 L→R
const row3 = rowCones(2);
const row2 = rowCones(1);
const row1 = rowCones(0);

// Path waypoints: weave between each cone (cut left/right of each)
function weavePath(cones, dir) {
  // dir: 1 = L→R, -1 = R→L
  const ordered = dir === 1 ? cones : [...cones].reverse();
  return ordered.map((cn, i) => ({
    x: cn.x + (i % 2 === 0 ? -10 : 10),
    y: cn.y,
  }));
}

const pathPoints = [
  { x: 150, y: 255 }, // player start
  ...weavePath(row3, 1),
  { x: row3[row3.length - 1].x + 20, y: ROW_Y[2] - 25 }, // turn
  { x: row2[row2.length - 1].x + 20, y: ROW_Y[1] + 15  }, // connect
  ...weavePath(row2, -1),
  { x: row2[0].x - 20, y: ROW_Y[1] - 25 }, // turn
  { x: row1[0].x - 20, y: ROW_Y[0] + 15  }, // connect
  ...weavePath(row1, 1),
];

// Build SVG path string
const pathD = pathPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

export default function Drill7() {
  return (
    <Svg width={W} height={H}>
      <Rect width={W} height={H} fill="#0f1a0f" />

      {/* Row labels */}
      {['ROW 1', 'ROW 2', 'ROW 3'].map((lbl, i) => (
        <ST key={i} x={8} y={ROW_Y[i] + 4} fill="#1c2b1c" fontSize={8} fontWeight="bold">{lbl}</ST>
      ))}

      {/* Spacing labels */}
      <ST x={18} y={ROW_Y[0] - 12} fill="#4d6350" fontSize={7} textAnchor="middle">1.5m</ST>
      <Line x1={18} y1={ROW_Y[0] - 8} x2={46} y2={ROW_Y[0] - 8} stroke="#1c2b1c" strokeWidth={1} />
      <ST x={8} y={(ROW_Y[0] + ROW_Y[1]) / 2 + 3} fill="#4d6350" fontSize={7} textAnchor="middle">3m</ST>

      {/* Weave path */}
      <Path d={pathD} fill="none" stroke="#a3e635" strokeWidth={1.5} strokeDasharray="4,3" opacity={0.55} />

      {/* Evasion move labels along path */}
      <ST x={130} y={ROW_Y[2] - 12} fill="#f97316" fontSize={7} fontWeight="bold">INSIDE CUT</ST>
      <ST x={155} y={ROW_Y[1] + 28} fill="#d946ef" fontSize={7} fontWeight="bold">OUTSIDE CUT</ST>
      <ST x={105} y={ROW_Y[0] - 12} fill="#60a5fa" fontSize={7} fontWeight="bold">DOUBLE-STEP</ST>

      {/* Cones — all 3 rows */}
      {[row1, row2, row3].map((row, ri) =>
        row.map((cn, ci) => (
          <Cone key={`${ri}${ci}`} x={cn.x} y={cn.y} color="#fbbf24" size={6} />
        ))
      )}

      {/* Player */}
      <Player x={150} y={252} />
      <ST x={150} y={265} fill="#a3e635" fontSize={8} textAnchor="middle" fontWeight="bold">ENTER</ST>

      {/* Cone contact note */}
      <ST x={W / 2} y={H - 5} fill="#ef4444" fontSize={7} textAnchor="middle">CONE CONTACT = FAILED REP · NO TWO CONSECUTIVE MOVES SAME</ST>
      <ST x={W - 5} y={30} fill="#1c2b1c" fontSize={9} textAnchor="end" fontWeight="bold">30 cones</ST>
    </Svg>
  );
}
