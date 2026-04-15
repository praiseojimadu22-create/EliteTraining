import React from 'react';
import Svg, { Rect, G, Line, Text as ST } from 'react-native-svg';
import { Arrow, DArrow, Cone, Player } from './shared';

const W = 300, H = 172;
// Scale: 0m=28, 8m=105, 12m=144, 16m=182, 21m=230, 25m=270 → 9.55px/m
const CONES = [
  { x: 28,  label: '0m',  zone: 'start'   },
  { x: 105, label: '8m',  zone: 'velocity' },
  { x: 144, label: '12m', zone: 'trigger'  },
  { x: 182, label: '16m', zone: 'stop'     },
  { x: 230, label: '21m', zone: 'stop'     },
  { x: 270, label: '25m', zone: 'stop'     },
];
const LY = 90; // lane y

const ZONE_COLOR = {
  start:    '#4ade80',
  velocity: '#4ade80',
  trigger:  '#fbbf24',
  stop:     '#ef4444',
};

export default function Drill5() {
  return (
    <Svg width={W} height={H}>
      <Rect width={W} height={H} fill="#0f1a0f" />
      {/* Zone backgrounds */}
      <Rect x={18} y={LY - 22} width={136} height={44} fill="#0a1f0a" rx={3} />
      <Rect x={134} y={LY - 22} width={20}  height={44} fill="#2a1a00" rx={2} />
      <Rect x={154} y={LY - 22} width={136} height={44} fill="#1f0a0a" rx={3} />
      {/* Zone labels */}
      <ST x={76}  y={LY - 26} fill="#4ade80" fontSize={7} textAnchor="middle" fontWeight="bold">SPRINT ZONE</ST>
      <ST x={144} y={LY - 26} fill="#fbbf24" fontSize={7} textAnchor="middle" fontWeight="bold">⚡</ST>
      <ST x={222} y={LY - 26} fill="#ef4444" fontSize={7} textAnchor="middle" fontWeight="bold">STOP ZONES</ST>
      {/* Sprint arrow (0→12m) */}
      <Arrow x1={28} y1={LY} x2={144} y2={LY} color="#4ade80" sw={2.5} shorten={8} hs={6} />
      {/* Decel dash arrows to each stop zone */}
      <DArrow x1={144} y1={LY} x2={182} y2={LY} color="#ef4444" sw={2} shorten={8} hs={5} />
      <DArrow x1={144} y1={LY + 8} x2={230} y2={LY + 8} color="#ef4444" sw={1.5} shorten={8} hs={4} />
      <DArrow x1={144} y1={LY + 16} x2={270} y2={LY + 16} color="#ef4444" sw={1} shorten={8} hs={4} />
      {/* Re-acceleration arrows */}
      <Arrow x1={182} y1={LY - 10} x2={230} y2={LY - 10} color="#f97316" sw={1.5} shorten={6} hs={4} />
      <ST x={206} y={LY - 14} fill="#f97316" fontSize={7} textAnchor="middle" fontWeight="bold">RE-ACCEL</ST>
      {/* Cones */}
      {CONES.map(cn => (
        <G key={cn.x}>
          <Cone x={cn.x} y={LY} color={ZONE_COLOR[cn.zone]} size={7} />
          <ST x={cn.x} y={LY + 18} fill={ZONE_COLOR[cn.zone]} fontSize={8} textAnchor="middle" fontWeight="bold">
            {cn.label}
          </ST>
        </G>
      ))}
      {/* Player */}
      <Player x={28} y={LY} />
      {/* 3-stride stop note */}
      <ST x={210} y={H - 6} fill="#ef4444" fontSize={7} textAnchor="middle">STOP IN 3 STRIDES · 1m ZONE</ST>
      {/* Coach call note */}
      <ST x={105} y={H - 6} fill="#fbbf24" fontSize={7} textAnchor="middle">← called here only</ST>
      <ST x={W - 5} y={H - 5} fill="#1c2b1c" fontSize={9} textAnchor="end" fontWeight="bold">25m lane</ST>
    </Svg>
  );
}
