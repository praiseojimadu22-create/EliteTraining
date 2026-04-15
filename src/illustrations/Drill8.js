import React from 'react';
import Svg, { Rect, G, Circle, Line, Text as ST } from 'react-native-svg';
import { Arrow, DArrow, Cone, Player } from './shared';

const W = 300, H = 292;
// Penalty area plan view
// Area: x=18→282, y=22→198 (264×176px ≈ 18×12m scaled)
// Goal: x=90→210, y=4→22
// 6yd box: x=82→218, y=22→68
// Penalty spot: (150, 120)

const AREA = { x: 18, y: 22, w: 264, h: 176 };
const GOAL = { x: 90, y: 4, w: 120, h: 18 };
const BOX6 = { x: 82, y: 22, w: 136, h: 46 };

// 15 cones — match-relevant positions
const CONES = [
  // Goal posts
  { id: 1,  x: 90,  y: 22,  label: 'NP-L',  color: '#ef4444' },
  { id: 2,  x: 210, y: 22,  label: 'NP-R',  color: '#ef4444' },
  // Near-post run positions
  { id: 3,  x: 100, y: 38,  label: '',       color: '#ef4444' },
  { id: 4,  x: 200, y: 38,  label: '',       color: '#ef4444' },
  // Far post positions
  { id: 5,  x: 75,  y: 50,  label: 'FP-L',  color: '#60a5fa' },
  { id: 6,  x: 225, y: 50,  label: 'FP-R',  color: '#60a5fa' },
  // Penalty spot
  { id: 7,  x: 150, y: 120, label: 'PEN',   color: '#fbbf24' },
  // Edge of area
  { id: 8,  x: 18,  y: 198, label: 'EL',    color: '#4ade80' },
  { id: 9,  x: 150, y: 198, label: 'EC',    color: '#4ade80' },
  { id: 10, x: 282, y: 198, label: 'ER',    color: '#4ade80' },
  // Wide channels
  { id: 11, x: 18,  y: 100, label: 'WL-1',  color: '#d946ef' },
  { id: 12, x: 18,  y: 160, label: 'WL-2',  color: '#d946ef' },
  { id: 13, x: 282, y: 100, label: 'WR-1',  color: '#d946ef' },
  { id: 14, x: 282, y: 160, label: 'WR-2',  color: '#d946ef' },
  // Checking run position
  { id: 15, x: 115, y: 158, label: 'CHK',   color: '#f97316' },
];

export default function Drill8() {
  return (
    <Svg width={W} height={H}>
      <Rect width={W} height={H} fill="#0f1a0f" />
      {/* Penalty area */}
      <Rect x={AREA.x} y={AREA.y} width={AREA.w} height={AREA.h} fill="#111f11" stroke="#2a3f2a" strokeWidth={1.5} rx={2} />
      {/* 6-yard box */}
      <Rect x={BOX6.x} y={BOX6.y} width={BOX6.w} height={BOX6.h} fill="none" stroke="#1c2b1c" strokeWidth={1} />
      {/* Goal */}
      <Rect x={GOAL.x} y={GOAL.y} width={GOAL.w} height={GOAL.h} fill="#0a1a0a" stroke="#2a3f2a" strokeWidth={1.5} />
      <ST x={150} y={16} fill="#4d6350" fontSize={8} textAnchor="middle">GOAL</ST>
      {/* Penalty spot */}
      <Circle cx={150} cy={120} r={3} fill="#2a3f2a" />
      {/* Example scenario — near post cut (cone 11 → cut → near post) */}
      <Arrow x1={18} y1={160} x2={18} y2={90} color="#d946ef" sw={1.5} shorten={12} hs={4} />
      <Arrow x1={18} y1={90} x2={100} y2={38} color="#d946ef" sw={2} shorten={12} hs={5} />
      <ST x={36} y={125} fill="#d946ef" fontSize={7} fontWeight="bold">OVERLAP</ST>
      {/* Example — checking run */}
      <DArrow x1={115} y1={158} x2={115} y2={195} color="#f97316" sw={1.5} shorten={8} hs={4} />
      <Arrow x1={115} y1={195} x2={115} y2={158} color="#f97316" sw={2} shorten={8} hs={5} />
      <ST x={118} y={175} fill="#f97316" fontSize={6} fontWeight="bold">CHECK</ST>
      {/* Example — diagonal through-ball */}
      <Arrow x1={18} y1={198} x2={150} y2={120} color="#4ade80" sw={1.5} shorten={12} hs={4} />
      <ST x={60} y={168} fill="#4ade80" fontSize={6} fontWeight="bold">DIAGONAL</ST>
      {/* Cones */}
      {CONES.map(cn => (
        <G key={cn.id}>
          <Cone x={cn.x} y={cn.y} color={cn.color} size={6} />
          {cn.label !== '' && (
            <ST x={cn.x + (cn.x > 150 ? 10 : -10)} y={cn.y + 3}
              fill={cn.color} fontSize={6}
              textAnchor={cn.x > 150 ? 'start' : 'end'}
              fontWeight="bold">
              {cn.label}
            </ST>
          )}
        </G>
      ))}
      {/* Dimension label */}
      <ST x={W - 5} y={H - 5} fill="#1c2b1c" fontSize={9} textAnchor="end" fontWeight="bold">18×18m</ST>
      {/* Legend row */}
      {[['#ef4444','POST'],['#60a5fa','FAR-POST'],['#4ade80','EDGE'],['#d946ef','WIDE'],['#f97316','RUN']].map(([c,l],i) => (
        <G key={l}>
          <Cone x={16 + i * 57} y={H - 12} color={c} size={4} />
          <ST x={26 + i * 57} y={H - 8} fill={c} fontSize={6} fontWeight="bold">{l}</ST>
        </G>
      ))}
    </Svg>
  );
}
