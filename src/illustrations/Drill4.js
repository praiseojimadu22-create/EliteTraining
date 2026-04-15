import React from 'react';
import Svg, { Rect, G, Line, Text as ST } from 'react-native-svg';
import { Arrow, Cone, Player } from './shared';

const W = 300, H = 235;
// 2 sprint lanes: y=80, y=155
// Scale: 0m=30, 10m=126, 15m=174, 25m=270  (9.6px per metre)
const LANES = [80, 155];
const MARKS = [
  { x: 30,  label: '0m'  },
  { x: 126, label: '10m' },
  { x: 174, label: '15m' },
  { x: 270, label: '25m' },
];
const START_POSITIONS = ['PRONE','SUPINE','SEATED','KNEELING','3-POINT','STANDING'];

export default function Drill4() {
  return (
    <Svg width={W} height={H}>
      <Rect width={W} height={H} fill="#0f1a0f" />
      {/* Lane backgrounds */}
      {LANES.map((ly, i) => (
        <Rect key={i} x={20} y={ly - 22} width={260} height={44} fill="#111f11" rx={3} />
      ))}
      {/* Distance zone backgrounds */}
      <Rect x={20} y={20} width={106} height={195} fill="#0f2a0f" opacity={0.6} rx={2} />
      <Rect x={126} y={20} width={48} height={195} fill="#2a1f0f" opacity={0.3} rx={2} />
      <Rect x={174} y={20} width={96} height={195} fill="#1f0f0f" opacity={0.2} rx={2} />
      {/* Zone labels */}
      <ST x={73} y={15} fill="#4ade80" fontSize={7} textAnchor="middle" fontWeight="bold">DRIVE PHASE</ST>
      <ST x={150} y={15} fill="#fbbf24" fontSize={7} textAnchor="middle" fontWeight="bold">95%</ST>
      <ST x={222} y={15} fill="#f97316" fontSize={7} textAnchor="middle" fontWeight="bold">TOP END</ST>
      {/* Vertical distance lines */}
      {MARKS.map(m => (
        <G key={m.x}>
          <Line x1={m.x} y1={22} x2={m.x} y2={213} stroke="#1c2b1c" strokeWidth={1} strokeDasharray="3,4" />
          <ST x={m.x} y={222} fill="#4d6350" fontSize={9} textAnchor="middle" fontWeight="bold">{m.label}</ST>
        </G>
      ))}
      {/* Sprint arrows */}
      {LANES.map((ly, i) => (
        <Arrow key={i} x1={30} y1={ly} x2={270} y2={ly} color={i === 0 ? '#a3e635' : '#60a5fa'} sw={2.5} shorten={8} hs={6} />
      ))}
      {/* Cones */}
      {LANES.map((ly, li) =>
        MARKS.map((m, mi) => (
          <Cone key={`${li}${mi}`} x={m.x} y={ly} color={li === 0 ? '#a3e635' : '#60a5fa'} size={7} />
        ))
      )}
      {/* Starting position list */}
      <Rect x={20} y={56} width={64} height={108} fill="#0a0d0a" rx={4} opacity={0.8} />
      {START_POSITIONS.map((pos, i) => (
        <ST key={pos} x={52} y={68 + i * 16} fill="#4d6350" fontSize={7} textAnchor="middle">{pos}</ST>
      ))}
      <ST x={52} y={58} fill="#71717a" fontSize={7} textAnchor="middle" fontWeight="bold">STARTS</ST>
      {/* Time targets */}
      <ST x={126} y={H - 8} fill="#4ade80" fontSize={7} textAnchor="middle" fontWeight="bold">{"<1.55s"}</ST>
      <ST x={222} y={H - 8} fill="#f97316" fontSize={7} textAnchor="middle">{"<3.2s (25m)"}</ST>
      <ST x={W - 5} y={H - 5} fill="#1c2b1c" fontSize={9} textAnchor="end" fontWeight="bold">25m sprint</ST>
    </Svg>
  );
}
