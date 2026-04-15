import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { T } from '../theme';
import { DRILLS, CONE_DAYS, getSets } from '../data';
import { Storage } from '../storage';
import { fmtDate } from '../schedule';

export default function SessionScreen({ route, navigation }) {
  const { sessionId } = route.params;
  const num = parseInt(sessionId.split('-')[1]);
  const coneData = CONE_DAYS.find(d => d.day === num);

  const [schedule, setSchedule] = useState({});
  const [progress, setProgress] = useState({});
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(useCallback(() => {
    Promise.all([Storage.getSchedule(), Storage.getProgress()]).then(([sc, pr]) => {
      setSchedule(sc);
      setProgress(pr);
      setLoaded(true);
    });
  }, []));

  const getSetChecks = (drillIndex) => {
    const saved = progress[sessionId]?.[drillIndex];
    if (saved) return saved;
    const drillId = coneData.drills[drillIndex];
    const sets = getSets(drillId, coneData.phase);
    return Array(sets.timed ? sets.count : sets.sets.length).fill(false);
  };

  const toggleSet = async (drillIndex, setIndex) => {
    const current = getSetChecks(drillIndex);
    const updated = current.map((v, i) => i === setIndex ? !v : v);
    const newProgress = {
      ...progress,
      [sessionId]: { ...(progress[sessionId] || {}), [drillIndex]: updated },
    };
    setProgress(newProgress);
    await Storage.setProgress(newProgress);
  };

  const totalSets = coneData.drills.reduce((acc, id) => {
    const s = getSets(id, coneData.phase);
    return acc + (s.timed ? s.count : s.sets.length);
  }, 0);

  const doneSets = coneData.drills.reduce((acc, _, i) =>
    acc + getSetChecks(i).filter(Boolean).length, 0
  );

  const pct = totalSets > 0 ? doneSets / totalSets : 0;
  const phaseColor = T.phases[coneData.phase - 1];
  const date = schedule[sessionId];

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={T.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back} activeOpacity={0.7}>
          <Text style={styles.backTxt}>← WEEK {coneData ? `— CONE DAY ${num}` : ''}</Text>
        </TouchableOpacity>
        <View style={styles.titleRow}>
          <Text style={styles.h1}>CONE DAY {num}</Text>
          <View style={[styles.phaseBadge, { backgroundColor: phaseColor + '20', borderColor: phaseColor + '60' }]}>
            <Text style={[styles.phaseTxt, { color: phaseColor }]}>PHASE {coneData.phase}</Text>
          </View>
        </View>
        <Text style={styles.dateTxt}>{fmtDate(date)}</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressLbl}>{doneSets}/{totalSets} sets</Text>
          <Text style={[styles.progressLbl, { color: pct === 1 ? T.success : T.muted }]}>
            {Math.round(pct * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {
            width: `${pct * 100}%`,
            backgroundColor: pct === 1 ? T.success : T.primary,
          }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {coneData.drills.map((drillId, di) => {
          const drill = DRILLS[drillId];
          const sets = getSets(drillId, coneData.phase);
          const checks = getSetChecks(di);
          const done = checks.filter(Boolean).length;
          const areaColor = T.areaColor[drill.area];

          return (
            <View key={di} style={styles.drillCard}>
              {/* Drill header */}
              <View style={styles.drillHeader}>
                <View style={styles.drillMeta}>
                  <View style={[styles.chip, { backgroundColor: areaColor + '18', borderColor: areaColor + '50' }]}>
                    <Text style={[styles.chipTxt, { color: areaColor }]}>{T.areaLabel[drill.area]}</Text>
                  </View>
                  <View style={styles.numBadge}>
                    <Text style={styles.numTxt}>#{drillId}</Text>
                  </View>
                </View>
                <View style={styles.drillTitleRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.drillName}>{drill.name}</Text>
                    <Text style={styles.drillSpace}>{drill.cones} cones · {drill.space}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() => navigation.navigate('Drill', { drillId, phase: coneData.phase })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.viewBtnTxt}>VIEW</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.targetBox, { borderLeftColor: areaColor }]}>
                  <Text style={styles.targetTxt}>{drill.target}</Text>
                </View>
              </View>

              {/* Set checklist */}
              <View style={styles.setSection}>
                <View style={styles.setHeaderRow}>
                  <Text style={styles.setLabel}>SETS</Text>
                  <Text style={[styles.setCount, { color: done === checks.length ? T.success : T.muted }]}>
                    {done}/{checks.length}
                  </Text>
                </View>
                {checks.map((checked, si) => {
                  const label = sets.timed
                    ? `Set ${si + 1}  —  5:00 active`
                    : `Set ${si + 1}  —  ${sets.sets[si]} reps`;
                  return (
                    <TouchableOpacity
                      key={si}
                      style={[styles.setRow, checked && styles.setRowDone]}
                      onPress={() => toggleSet(di, si)}
                      activeOpacity={0.75}
                    >
                      <View style={[styles.checkbox, checked && styles.checkboxDone]}>
                        {checked && <Text style={styles.checkmark}>✓</Text>}
                      </View>
                      <Text style={[styles.setTxt, checked && styles.setTxtDone]}>{label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  loading: { flex: 1, backgroundColor: T.bg, alignItems: 'center', justifyContent: 'center' },

  header: {
    paddingHorizontal: T.pad, paddingTop: 8, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: T.border,
  },
  back: { marginBottom: 8 },
  backTxt: { color: T.primary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  h1: { fontSize: 26, fontWeight: '900', color: T.text, letterSpacing: 0.5 },
  phaseBadge: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  phaseTxt: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  dateTxt: { fontSize: 12, color: T.muted, marginTop: 3 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 4 },
  progressLbl: { fontSize: 11, fontWeight: '600', color: T.muted },
  progressBar: { height: 3, backgroundColor: T.border, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },

  scroll: { padding: T.pad, gap: 12, paddingBottom: 40 },

  drillCard: {
    backgroundColor: T.card, borderRadius: T.radius,
    borderWidth: 1, borderColor: T.border, overflow: 'hidden',
  },
  drillHeader: { padding: 14, borderBottomWidth: 1, borderBottomColor: T.border, gap: 8 },
  drillMeta: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  chip: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  chipTxt: { fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  numBadge: { backgroundColor: T.card2, borderRadius: 4, paddingHorizontal: 7, paddingVertical: 3, borderWidth: 1, borderColor: T.border },
  numTxt: { fontSize: 9, fontWeight: '700', color: T.muted },
  drillTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  drillName: { fontSize: 15, fontWeight: '700', color: T.text },
  drillSpace: { fontSize: 11, color: T.muted, marginTop: 2 },
  viewBtn: {
    backgroundColor: T.card2, borderRadius: T.radiusSm,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: T.border,
  },
  viewBtnTxt: { fontSize: 11, fontWeight: '700', color: T.sub, letterSpacing: 0.5 },
  targetBox: { backgroundColor: T.card2, borderRadius: 6, padding: 8, borderLeftWidth: 3 },
  targetTxt: { fontSize: 11, color: T.sub, lineHeight: 16 },

  setSection: { padding: 14, gap: 7 },
  setHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  setLabel: { fontSize: 10, fontWeight: '700', color: T.muted, letterSpacing: 1.5 },
  setCount: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  setRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: T.card2, borderRadius: T.radiusSm,
    padding: 11, borderWidth: 1, borderColor: T.border,
  },
  setRowDone: { backgroundColor: T.success + '12', borderColor: T.success + '40' },
  checkbox: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: T.muted,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: T.success, borderColor: T.success },
  checkmark: { fontSize: 11, fontWeight: '900', color: '#0a0d0a' },
  setTxt: { fontSize: 12, fontWeight: '600', color: T.sub },
  setTxtDone: { color: T.success, textDecorationLine: 'line-through' },
});
