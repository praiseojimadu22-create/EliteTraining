import React from 'react';
import Svg, { Rect, G, Line, Text as ST } from 'react-native-svg';
import { Arrow, Cone, Player } from './shared';

const W = 300, H = 295;

// 20 pre-positioned cones that look naturally scattered across 12×12m area
// Area bounds: x=22→278, y=22→272
const CONES = [
  { id:1,  x:38,  y:35  }, { id:2,  x:118, y:28  }, { id:3,  x:195, y:42  },
  { id:4,  x:262, y:38  }, { id:5,  x:272, y:98  }, { id:6,  x:255, y:158 },
  { id:7,  x:265, y:222 }, { id:8,  x:232, y:262 }, { id:9,  x:165, y:270 },
  { id:10, x:100, y:268 }, { id:11, x:40,  y:258 }, { id:12, x:28,  y:195 },
  { id:13, x:32,  y:135 }, { id:14, x:30,  y:72  }, { id:15, x:95,  y:98  },
  { id:16, x:178, y:88  }, { id:17, x:218, y:158 }, { id:18, x:172, y:198 },
  { id:19, x:105, y:178 }, { id:20, x:148, y:140 },
];

// Player roughly in centre
const PX = 148, PY = 147;

// 6 movement arrows from player centre, each in a different direction
const MOVES = [
  { dx: 0,   dy:-55, color:'#a3e635', label:'BURST',     lx: 8,  ly:-60 },
  { dx: 50,  dy:-25, color:'#60a5fa', label:'SHUFFLE',   lx: 52, ly:-28 },
  { dx: 52,  dy: 32, color:'#f97316', label:'BACKWARD',  lx: 54, ly: 40 },
  { dx: 0,   dy: 55, color:'#d946ef', label:'CROSSOVER', lx: 4,  ly: 68 },
  { dx:-50,  dy: 25, color:'#fbbf24', label:'HI-KNEE',   lx:-82, ly: 30 },
  { dx:-52,  dy:-32, color:'#4ade80', label:'HEEL-DRV',  lx:-90, ly:-28 },
];

export default function Drill2() {
  return (
    <Svg width={W} height={H}>
      <Rect width={W} height={H} fill="#0f1a0f" />
      {/* Area boundary */}
      <Rect x={22} y={22} width={256} height={250} fill="none" stroke="#1c2b1c" strokeWidth={1.5} strokeDasharray="6,4" rx={3} />
      {/* Area label */}
      <ST x={150} y={18} fill="#4d6350" fontSize={8} textAnchor="middle" fontWeight="bold">12×12m</ST>
      {/* Movement arrows */}
      {MOVES.map((m, i) => (
        <G key={i}>
          <Arrow
            x1={PX} y1={PY}
            x2={PX + m.dx} y2={PY + m.dy}
            color={m.color} sw={2} shorten={12} hs={5}
          />
          <ST x={PX + m.lx} y={PY + m.ly} fill={m.color} fontSize={7} textAnchor="middle" fontWeight="bold">
            {m.label}
          </ST>
        </G>
      ))}
      {/* Cones */}
      {CONES.map(cn => (
        <G key={cn.id}>
          <Cone x={cn.x} y={cn.y} color="#fbbf24" size={6} />
          <ST x={cn.x + 9} y={cn.y - 4} fill="#4d6350" fontSize={7} fontWeight="bold">{`${cn.id}`}</ST>
        </G>
      ))}
      {/* Player */}
      <Player x={PX} y={PY} />
      <ST x={PX} y={PY + 22} fill="#a3e635" fontSize={8} textAnchor="middle" fontWeight="bold">PLAYER</ST>
      {/* Whistle note */}
      <ST x={W / 2} y={H - 6} fill="#4d6350" fontSize={8} textAnchor="middle">◼ each whistle = new movement + nearest cone</ST>
    </Svg>
  );
}
