import React from 'react';
import { G, Line, Polygon, Ellipse, Circle } from 'react-native-svg';

export function Arrow({ x1, y1, x2, y2, color = '#a3e635', sw = 2, shorten = 12, hs = 5 }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;
  const ux = dx / len, uy = dy / len;
  const sx = x1 + ux * shorten, sy = y1 + uy * shorten;
  const ex = x2 - ux * shorten, ey = y2 - uy * shorten;
  const ax = ex - ux * hs * 2, ay = ey - uy * hs * 2;
  const px = -uy * hs, py = ux * hs;
  return (
    <G>
      <Line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <Polygon points={`${ex},${ey} ${ax + px},${ay + py} ${ax - px},${ay - py}`} fill={color} />
    </G>
  );
}

export function DArrow({ x1, y1, x2, y2, color = '#a3e635', sw = 1.5, shorten = 12, hs = 4 }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return null;
  const ux = dx / len, uy = dy / len;
  const sx = x1 + ux * shorten, sy = y1 + uy * shorten;
  const ex = x2 - ux * shorten, ey = y2 - uy * shorten;
  const ax = ex - ux * hs * 2, ay = ey - uy * hs * 2;
  const px = -uy * hs, py = ux * hs;
  return (
    <G>
      <Line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeDasharray="5,3" />
      <Polygon points={`${ex},${ey} ${ax + px},${ay + py} ${ax - px},${ay - py}`} fill={color} />
    </G>
  );
}

export function Cone({ x, y, color = '#fbbf24', size = 7, dim = false }) {
  const op = dim ? 0.35 : 0.92;
  return (
    <G opacity={op}>
      <Polygon
        points={`${x},${y - size} ${x - size * 0.75},${y + size * 0.55} ${x + size * 0.75},${y + size * 0.55}`}
        fill={color}
      />
      <Ellipse cx={x} cy={y + size * 0.55} rx={size * 0.75} ry={size * 0.22} fill={color} opacity={0.4} />
    </G>
  );
}

export function Player({ x, y, color = '#a3e635' }) {
  return (
    <G>
      <Circle cx={x} cy={y} r={10} fill={color} opacity={0.9} />
      <Circle cx={x} cy={y} r={13} fill="none" stroke={color} strokeWidth={1} opacity={0.22} />
    </G>
  );
}
