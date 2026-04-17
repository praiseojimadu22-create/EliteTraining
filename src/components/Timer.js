import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { T } from '../theme';
import { fmtTime } from '../schedule';

const R = 44;
const CIRC = 2 * Math.PI * R;

export default function Timer({ duration, label, style }) {
  const [left, setLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const iv = useRef(null);

  useEffect(() => {
    if (running) {
      iv.current = setInterval(() => {
        setLeft(s => {
          if (s <= 1) {
            clearInterval(iv.current);
            setRunning(false);
            setDone(true);
            Vibration.vibrate([0, 300, 100, 300]);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(iv.current);
    }
    return () => clearInterval(iv.current);
  }, [running]);

  const reset = () => {
    clearInterval(iv.current);
    setRunning(false);
    setDone(false);
    setLeft(duration);
  };

  const pct = left / duration;
  const offset = CIRC * (1 - pct);
  const strokeColor = done ? T.success : running ? T.primary : T.muted;

  return (
    <View style={[styles.wrap, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.circle}>
        <Svg width={110} height={110} style={styles.svg}>
          <Circle cx={55} cy={55} r={R} fill="none" stroke={T.border} strokeWidth={6} />
          <Circle
            cx={55} cy={55} r={R}
            fill="none"
            stroke={strokeColor}
            strokeWidth={6}
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            strokeLinecap="round"
            rotation={-90}
            origin="55, 55"
          />
        </Svg>
        <Text style={[styles.time, { color: strokeColor }]}>
          {done ? '✓' : fmtTime(left)}
        </Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: done ? T.border : running ? '#3b0a0a' : '#0f2a0f' }]}
          onPress={() => !done && setRunning(r => !r)}
          activeOpacity={0.7}
        >
          <Text style={[styles.btnTxt, { color: done ? T.muted : running ? '#f87171' : T.success }]}>
            {done ? 'DONE' : running ? 'PAUSE' : 'START'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetBtn} onPress={reset} activeOpacity={0.7}>
          <Text style={styles.resetTxt}>↺</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: T.card2,
    borderRadius: T.radius,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: T.border,
  },
  label: {
    color: T.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  circle: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  svg: { position: 'absolute', top: 0, left: 0 },
  time: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  btns: { flexDirection: 'row', gap: 8, width: '100%' },
  btn: {
    flex: 1,
    height: 42,
    borderRadius: T.radiusSm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: { fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  resetBtn: {
    width: 42,
    height: 42,
    borderRadius: T.radiusSm,
    backgroundColor: T.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: T.border,
  },
  resetTxt: { fontSize: 20, color: T.sub },
});
