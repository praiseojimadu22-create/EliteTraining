import React from 'react';
import Svg, { Rect, G, Circle, Line, Text as ST, Path } from 'react-native-svg';
import { Arrow, Cone, Player } from './shared';

const W = 300, H = 295;
// 4 channels in 18×18m area — each shows 6m approach + cut + 4m exit
// Area boundary: x=15→285, y=15→280
// Channel colours
const CC = ['#60a5fa', '#f97316', '#d946ef', '#4ade80'];

// Each channel: { start, cut, exit, color, label }
const CHANNELS = [
  {
    // Channel 1: enter from left, go right, cut down-right 120°+
    approach: [{ x: 20, y: 90 }, { x: 60, y: 90 }, { x: 100, y: 90 }, { x: 140, y: 90 }],
    cut: { x: 140, y: 90 },
    exit: [{ x: 175, y: 130 }, { x: 208, y: 168 }],
    color: CC[0], label: 'INSIDE CUT →',
  },
  {
    // Channel 2: enter from top, go down, cut right 120°+
    approach: [{ x: 220, y: 20 }, { x: 220, y: 60 }, { x: 220, y: 100 }, { x: 220, y: 140 }],
    cut: { x: 220, y: 140 },
    exit: [{ x: 258, y: 162 }, { x: 275, y: 185 }],
    color: CC[1], label: 'OUTSIDE CUT ↓',
  },
  {
    // Channel 3: enter from right, go left, cut up-left 120°+
    approach: [{ x: 282, y: 220 }, { x: 245, y: 220 }, { x: 205, y: 220 }, { x: 165, y: 220 }],
    cut: { x: 165, y: 220 },
    exit: [{ x: 128, y: 188 }, { x: 100, y: 160 }],
    color: CC[2], label: '← INSIDE CUT',
  },
  {
    // Channel 4: enter from bottom-left, go up-right, cut sharp right
    approach: [{ x: 32, y: 278 }, { x: 55, y: 245 }, { x: 80, y: 212 }, { x: 105, y: 178 }],
    cut: { x: 105, y: 178 },
    exit: [{ x: 140, y: 195 }, { x: 165, y: 215 }],
    color: CC[3], label: 'DIRECTION CUT',
  },
];

export default function Drill6() {
  return (
    <Svg width={W} height={H}>
      <Rect width={W} height={H} fill="#0f1a0f" />
      {/* Area border */}
      <Rect x={15} y={15} width={270} height={265} fill="none" stroke="#1c2b1c" strokeWidth={1} strokeDasharray="5,4" rx={3} />
      <ST x={150} y={12} fill="#4d6350" fontSize={8} textAnchor="middle" fontWeight="bold">18×18m</ST>

      {CHANNELS.map((ch, ci) => (
        <G key={ci}>
          {/* Approach arrows */}
          {ch.approach.slice(0, -1).map((pt, pi) => (
            <Arrow key={pi}
              x1={pt.x} y1={pt.y}
              x2={ch.approach[pi + 1].x} y2={ch.approach[pi + 1].y}
              color={ch.color} sw={1.5} shorten={10} hs={4}
            />
          ))}
          {/* Cut point glow */}
          <Circle cx={ch.cut.x} cy={ch.cut.y} r={16} fill={ch.color} opacity={0.12} />
          {/* Exit arrows */}
          {ch.exit.slice(0, -1).map((pt, pi) => (
            <Arrow key={`e${pi}`}
              x1={ch.exit[pi].x} y1={ch.exit[pi].y}
              x2={ch.exit[pi + 1].x} y2={ch.exit[pi + 1].y}
              color={ch.color} sw={2} shorten={8} hs={5}
            />
          ))}
          {/* Arrow from cut to first exit */}
          <Arrow
            x1={ch.cut.x} y1={ch.cut.y}
            x2={ch.exit[0].x} y2={ch.exit[0].y}
            color={ch.color} sw={2.5} shorten={10} hs={6}
          />
          {/* Cones on approach */}
          {ch.approach.map((pt, pi) => (
            <Cone key={`ca${pi}`} x={pt.x} y={pt.y} color={ch.color} size={pi === ch.approach.length - 1 ? 9 : 6} />
          ))}
          {/* Cones on exit */}
          {ch.exit.map((pt, pi) => (
            <Cone key={`ce${pi}`} x={pt.x} y={pt.y} color={ch.color} size={6} dim={true} />
          ))}
        </G>
      ))}

      {/* Cut angle label on channel 1 */}
      <ST x={148} y={75} fill="#ffffff" fontSize={8} textAnchor="middle" fontWeight="bold">120°+</ST>
      <Line x1={140} y1={90} x2={148} y2={82} stroke="#ffffff" strokeWidth={0.8} opacity={0.5} />

      {/* Legend */}
      <ST x={W / 2} y={H - 6} fill="#4d6350" fontSize={7} textAnchor="middle">▲ CUT POINT  → APPROACH  → EXIT (95%)</ST>
    </Svg>
  );
}
