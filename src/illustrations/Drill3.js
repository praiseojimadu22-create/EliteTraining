import React from 'react';
import Svg, { Rect, G, Line, Text as ST } from 'react-native-svg';
import { Arrow, Cone, Player } from './shared';

const W = 300, H = 275;
// 3 lanes at x=75,150,225. 4 cones per lane at y=48,108,168,228 (60px = 1m)
const LANES = [
  { x: 75,  label: 'TWO-IN\nONE-OUT',  color: '#60a5fa', desc: 'LANE 1' },
  { x: 150, label: 'SINGLE-LEG\nBOUNDS', color: '#a3e635', desc: 'LANE 2' },
  { x: 225, label: 'LATERAL\nCROSSOVER', color: '#f97316', desc: 'LANE 3' },
];
const ROWS = [48, 108, 168, 228];

export default function Drill3() {
  return (
    <Svg width={W} height={H}>
      <Rect width={W} height={H} fill="#0f1a0f" />
      {/* Lane backgrounds */}
      {LANES.map((lane, li) => (
        <Rect key={li} x={lane.x - 22} y={ROWS[0] - 18} width={44}
          height={ROWS[ROWS.length - 1] - ROWS[0] + 36}
          fill={lane.color} opacity={0.05} rx={4} />
      ))}
      {/* Lane direction arrows */}
      {LANES.map((lane, li) => (
        <Arrow key={`arr${li}`}
          x1={lane.x} y1={ROWS[ROWS.length - 1] + 18}
          x2={lane.x} y2={ROWS[0] - 18}
          color={lane.color} sw={1.5} shorten={4} hs={4} />
      ))}
      {/* Cones */}
      {LANES.map((lane, li) =>
        ROWS.map((y, ri) => (
          <Cone key={`${li}${ri}`} x={lane.x} y={y} color={lane.color} size={7} />
        ))
      )}
      {/* 1m spacing annotation on lane 1 */}
      <Line x1={52} y1={ROWS[0]} x2={52} y2={ROWS[1]} stroke="#1c2b1c" strokeWidth={1} />
      <Line x1={48} y1={ROWS[0]} x2={56} y2={ROWS[0]} stroke="#1c2b1c" strokeWidth={1} />
      <Line x1={48} y1={ROWS[1]} x2={56} y2={ROWS[1]} stroke="#1c2b1c" strokeWidth={1} />
      <ST x={44} y={(ROWS[0] + ROWS[1]) / 2 + 3} fill="#4d6350" fontSize={8} textAnchor="middle">1m</ST>
      {/* Lane separation annotation */}
      <Line x1={LANES[0].x} y1={ROWS[0] - 28} x2={LANES[1].x} y2={ROWS[0] - 28} stroke="#1c2b1c" strokeWidth={1} />
      <ST x={(LANES[0].x + LANES[1].x) / 2} y={ROWS[0] - 30} fill="#4d6350" fontSize={8} textAnchor="middle">1m</ST>
      {/* Movement pattern labels per lane */}
      {LANES.map((lane, li) => {
        const lines = lane.label.split('\n');
        return lines.map((line, lni) => (
          <ST key={`lbl${li}${lni}`}
            x={lane.x} y={ROWS[ROWS.length - 1] + 38 + lni * 12}
            fill={lane.color} fontSize={8} textAnchor="middle" fontWeight="bold">
            {line}
          </ST>
        ));
      })}
      {/* Player at entry (bottom) */}
      <Player x={LANES[0].x} y={ROWS[ROWS.length - 1] + 20} color={LANES[0].color} />
      {/* Completion arrow: lane 1 top → lane 2 → lane 3 */}
      <Arrow x1={LANES[0].x} y1={ROWS[0] - 8} x2={LANES[1].x} y2={ROWS[0] - 8} color="#ffffff" sw={1} shorten={5} hs={4} />
      <Arrow x1={LANES[1].x} y1={ROWS[0] - 8} x2={LANES[2].x} y2={ROWS[0] - 8} color="#ffffff" sw={1} shorten={5} hs={4} />
      <ST x={150} y={ROWS[0] - 10} fill="#3f3f3f" fontSize={7} textAnchor="middle">continuous run →</ST>
      {/* Heading */}
      <ST x={W - 6} y={H - 6} fill="#1c2b1c" fontSize={9} textAnchor="end" fontWeight="bold">4m per lane</ST>
    </Svg>
  );
}
