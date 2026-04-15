import React from 'react';
import Svg, { Rect, G, Circle, Line, Text as ST } from 'react-native-svg';
import { Arrow, Cone, Player } from './shared';

const W = 300, H = 272, PAD = 30, SP = 80;
const cx = col => PAD + col * SP;
const cy = row => PAD + row * SP;

// 4×4 grid, 4 colour groups
const CONES = [
  { id:1,  col:0, row:0, c:'#ef4444' }, { id:2,  col:1, row:0, c:'#60a5fa' },
  { id:3,  col:2, row:0, c:'#fbbf24' }, { id:4,  col:3, row:0, c:'#4ade80' },
  { id:5,  col:0, row:1, c:'#60a5fa' }, { id:6,  col:1, row:1, c:'#4ade80' },
  { id:7,  col:2, row:1, c:'#ef4444' }, { id:8,  col:3, row:1, c:'#fbbf24' },
  { id:9,  col:0, row:2, c:'#fbbf24' }, { id:10, col:1, row:2, c:'#ef4444' },
  { id:11, col:2, row:2, c:'#4ade80' }, { id:12, col:3, row:2, c:'#60a5fa' },
  { id:13, col:0, row:3, c:'#4ade80' }, { id:14, col:1, row:3, c:'#fbbf24' },
  { id:15, col:2, row:3, c:'#60a5fa' }, { id:16, col:3, row:3, c:'#ef4444' },
];

// Example sequence: player → 3 (yellow) → 7 (red) → 12 (blue)
const SEQ = [3, 7, 12];
const PX = PAD - 22, PY = H - PAD + 8;

export default function Drill1() {
  const p3  = { x: cx(2), y: cy(0) };
  const p7  = { x: cx(2), y: cy(1) };
  const p12 = { x: cx(3), y: cy(2) };
  return (
    <Svg width={W} height={H}>
      {/* Background */}
      <Rect width={W} height={H} fill="#0f1a0f" />
      {[0,1,2,3].map(r => [0,1,2,3].map(c => (
        <Rect key={`bg${r}${c}`}
          x={PAD + c * SP - SP / 2} y={PAD + r * SP - SP / 2}
          width={SP} height={SP}
          fill={(r + c) % 2 === 0 ? '#111f11' : '#0f1a0f'} rx={1} />
      )))}
      {/* 1.5m spacing annotation */}
      <Line x1={PAD} y1={PAD - 18} x2={PAD + SP} y2={PAD - 18} stroke="#1c2b1c" strokeWidth={1} />
      <Line x1={PAD} y1={PAD - 22} x2={PAD} y2={PAD - 14} stroke="#1c2b1c" strokeWidth={1} />
      <Line x1={PAD + SP} y1={PAD - 22} x2={PAD + SP} y2={PAD - 14} stroke="#1c2b1c" strokeWidth={1} />
      <ST x={PAD + SP / 2} y={PAD - 21} fill="#4d6350" fontSize={8} textAnchor="middle" fontWeight="bold">1.5m</ST>
      {/* Movement arrows */}
      <Arrow x1={PX} y1={PY} x2={p3.x} y2={p3.y} color="#a3e635" sw={2} />
      <Arrow x1={p3.x} y1={p3.y} x2={p7.x} y2={p7.y} color="#f97316" sw={2} />
      <Arrow x1={p7.x} y1={p7.y} x2={p12.x} y2={p12.y} color="#d946ef" sw={2} />
      {/* Move type labels */}
      <ST x={(PX + p3.x) / 2 + 12} y={(PY + p3.y) / 2 + 2} fill="#a3e635" fontSize={7} fontWeight="bold">SPRINT</ST>
      <ST x={cx(2) + 10} y={(cy(0) + cy(1)) / 2 - 3} fill="#f97316" fontSize={7} fontWeight="bold">SHUFFLE</ST>
      <ST x={(cx(2) + cx(3)) / 2 + 6} y={(cy(1) + cy(2)) / 2 - 4} fill="#d946ef" fontSize={7} fontWeight="bold">BACKPEDAL</ST>
      {/* Cones */}
      {CONES.map(cn => {
        const inSeq = SEQ.includes(cn.id);
        const x = cx(cn.col), y = cy(cn.row);
        return (
          <G key={cn.id}>
            {inSeq && <Circle cx={x} cy={y} r={15} fill={cn.c} opacity={0.14} />}
            <Cone x={x} y={y} color={cn.c} size={7} dim={!inSeq} />
            <ST x={x} y={y + 18} fill={inSeq ? cn.c : '#4d6350'} fontSize={inSeq ? 9 : 7}
              textAnchor="middle" fontWeight="bold">{`${cn.id}`}</ST>
            {inSeq && (
              <G>
                <Circle cx={x + 11} cy={y - 11} r={7} fill="#0f1a0f" stroke={cn.c} strokeWidth={1.5} />
                <ST x={x + 11} y={y - 8} fill={cn.c} fontSize={7} textAnchor="middle" fontWeight="bold">
                  {`${SEQ.indexOf(cn.id) + 1}`}
                </ST>
              </G>
            )}
          </G>
        );
      })}
      {/* Player */}
      <Player x={PX} y={PY} />
      <ST x={PX} y={PY + 20} fill="#a3e635" fontSize={8} textAnchor="middle" fontWeight="bold">START</ST>
      {/* Area label */}
      <ST x={W - 6} y={H - 5} fill="#1c2b1c" fontSize={9} textAnchor="end" fontWeight="bold">9×9m</ST>
      {/* Colour legend */}
      {[['#ef4444','RED'],['#60a5fa','BLUE'],['#fbbf24','YLW'],['#4ade80','GRN']].map(([c,l],i) => (
        <G key={l}>
          <Cone x={10 + i * 68} y={H - 10} color={c} size={5} />
          <ST x={22 + i * 68} y={H - 6} fill={c} fontSize={7} fontWeight="bold">{l}</ST>
        </G>
      ))}
    </Svg>
  );
}
