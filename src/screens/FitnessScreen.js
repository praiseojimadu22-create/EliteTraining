import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { T } from '../theme';
import { FITNESS_DAYS } from '../data';
import { Storage } from '../storage';
import { fmtDate } from '../schedule';
import Timer from '../components/Timer';

// Which fitness sessions need specific timers and what kind
const SESSION_TIMERS = {
  1:  null, // Long run — no specific timer needed
  2:  { type: 'fartlek_a', sets: [{ dur: 90, label: 'HARD EFFORT' }, { dur: 120, label: 'EASY JOG' }] },
  3:  { type: 'rep', dur: 60, label: 'REP WINDOW · 60s' },
  4:  { type: 'rep', dur: 60, label: 'JOHN TERRY WINDOW · 60s' },
  5:  null,
  6:  null,
  7:  { type: 'rep', dur: 60, label: 'REP WINDOW · 60s' },
  8:  { type: 'fartlek_b', sets: [
    { dur: 180, label: 'BLOCK 1 · HARD 3:00' },
    { dur: 90,  label: 'BLOCK 1 · EASY 1:30' },
    { dur: 45,  label: 'BLOCK 2 · SPRINT 0:45' },
    { dur: 90,  label: 'BLOCK 2 · EASY 1:30' },
    { dur: 120, label: 'BLOCK 3 · HARD 2:00' },
    { dur: 60,  label: 'BLOCK 3 · EASY 1:00' },
  ]},
  9:  { type: 'rep', dur: 60, label: 'JOHN TERRY WINDOW · 60s' },
  10: null,
  11: { type: 'rep', dur: 60, label: 'REP WINDOW · 60s' },
  12: { type: 'rep', dur: 60, label: 'JOHN TERRY WINDOW · 60s' },
};

export default function FitnessScreen({ route, navigation }) {
  const { fitWeek } = route.params;
  const data = FITNESS_DAYS.find(f => f.week === fitWeek);
  const timerConfig = SESSION_TIMERS[fitWeek];
  const [schedule, setSchedule] = React.useState({});

  useFocusEffect(useCallback(() => {
    Storage.getSchedule().then(setSchedule);
  }, []));

  if (!data) return null;
  const sessionId = `fit-${fitWeek}`;
  const date = schedule[sessionId];

  const isCombo = data.badge === 'COMBO';

  // Split combo sessions into parts
  const parts = isCombo
    ? [
        { title: 'PART 1', steps: data.steps.slice(0, 1) },
        { title: 'REST', steps: [data.steps[1]] },
        { title: 'PART 2', steps: data.steps.slice(2) },
      ]
    : null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back} activeOpacity={0.7}>
          <Text style={styles.backTxt}>← BACK</Text>
        </TouchableOpacity>
        <View style={styles.topRow}>
          <Text style={styles.icon}>{data.icon}</Text>
          <View style={[styles.badge, { backgroundColor: T.amber + '20', borderColor: T.amber + '50' }]}>
            <Text style={[styles.badgeTxt, { color: T.amber }]}>{data.badge}</Text>
          </View>
          {fitWeek === 6 || fitWeek === 9 || fitWeek === 12 ? (
            <View style={[styles.badge, { backgroundColor: T.primary + '20', borderColor: T.primary + '50' }]}>
              <Text style={[styles.badgeTxt, { color: T.primary }]}>BENCHMARK</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.h1}>{data.name.toUpperCase()}</Text>
        <Text style={styles.weekLabel}>WEEK {fitWeek} FITNESS</Text>
        <Text style={styles.date}>{fmtDate(date)}</Text>
        <View style={[styles.detailBox, { borderLeftColor: T.amber }]}>
          <Text style={styles.detailTxt}>{data.detail}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Steps — standard or split for combo */}
        {isCombo ? (
          parts.map((part, pi) => (
            <View key={pi} style={styles.partCard}>
              <View style={styles.partHeaderRow}>
                <View style={[styles.partBadge, {
                  backgroundColor: part.title === 'REST' ? T.muted + '20' : T.amber + '20',
                  borderColor: part.title === 'REST' ? T.muted + '40' : T.amber + '40',
                }]}>
                  <Text style={[styles.partBadgeTxt, { color: part.title === 'REST' ? T.muted : T.amber }]}>{part.title}</Text>
                </View>
              </View>
              {part.steps.map((step, si) => (
                <View key={si} style={styles.stepRow}>
                  <Text style={styles.stepNum}>{si + 1}</Text>
                  <Text style={styles.stepTxt}>{step}</Text>
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.stepsCard}>
            <Text style={styles.cardLabel}>SESSION GUIDE</Text>
            {data.steps.map((step, i) => (
              <View key={i} style={[styles.stepRow, i < data.steps.length - 1 && styles.stepBorder]}>
                <Text style={styles.stepNum}>{i + 1}</Text>
                <Text style={styles.stepTxt}>{step}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Timers */}
        {timerConfig && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>TIMERS</Text>
            {timerConfig.type === 'rep' && (
              <Timer duration={timerConfig.dur} label={timerConfig.label} />
            )}
            {(timerConfig.type === 'fartlek_a' || timerConfig.type === 'fartlek_b') && (
              <View style={styles.fartlekTimers}>
                {timerConfig.sets.map((s, i) => (
                  <Timer key={i} duration={s.dur} label={s.label} style={{ marginBottom: 8 }} />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Benchmark note */}
        {(fitWeek === 6 || fitWeek === 9 || fitWeek === 12) && (
          <View style={[styles.benchCard, { borderColor: T.primary + '40' }]}>
            <Text style={[styles.benchTitle, { color: T.primary }]}>BENCHMARK SESSION</Text>
            <Text style={styles.benchTxt}>
              {fitWeek === 6 && 'Record your Bleep Test level and shuttle number. This is your Week 6 baseline — all future test scores are compared against this.'}
              {fitWeek === 9 && 'Compare your Bleep Test score to Week 6. This shows aerobic development under training load.'}
              {fitWeek === 12 && 'Final benchmark. Your Week 12 Bleep Test vs Week 6 is your 12-week fitness development marker. John Terry sets increase to 18 at sub-17s pace.'}
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  header: { paddingHorizontal: T.pad, paddingTop: 8, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: T.border },
  back: { marginBottom: 10 },
  backTxt: { color: T.primary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  icon: { fontSize: 28 },
  badge: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  badgeTxt: { fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  h1: { fontSize: 26, fontWeight: '900', color: T.text, letterSpacing: 0.5 },
  weekLabel: { fontSize: 11, color: T.muted, marginTop: 2, letterSpacing: 1 },
  date: { fontSize: 11, color: T.sub, marginTop: 2 },
  detailBox: { marginTop: 10, backgroundColor: T.card2, borderRadius: 8, padding: '10px 12px', borderLeftWidth: 3, paddingHorizontal: 12, paddingVertical: 10 },
  detailTxt: { fontSize: 13, color: T.sub, lineHeight: 20, fontWeight: '500' },

  scroll: { padding: T.pad, gap: 12, paddingBottom: 40 },

  stepsCard: { backgroundColor: T.card, borderRadius: T.radius, padding: 14, borderWidth: 1, borderColor: T.border },
  cardLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: T.muted, marginBottom: 12, textTransform: 'uppercase' },
  stepRow: { flexDirection: 'row', gap: 14, paddingVertical: 10, alignItems: 'flex-start' },
  stepBorder: { borderBottomWidth: 1, borderBottomColor: T.border },
  stepNum: { fontSize: 22, fontWeight: '900', color: T.amber, lineHeight: 26, minWidth: 20, textAlign: 'center' },
  stepTxt: { flex: 1, fontSize: 13, color: T.sub, lineHeight: 20 },

  partCard: { backgroundColor: T.card, borderRadius: T.radius, borderWidth: 1, borderColor: T.border, padding: 14, gap: 2 },
  partHeaderRow: { marginBottom: 8 },
  partBadge: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  partBadgeTxt: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },

  card: { backgroundColor: T.card, borderRadius: T.radius, padding: 14, borderWidth: 1, borderColor: T.border },
  fartlekTimers: { gap: 8 },

  benchCard: { backgroundColor: T.card, borderRadius: T.radius, padding: 14, borderWidth: 1 },
  benchTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  benchTxt: { fontSize: 13, color: T.sub, lineHeight: 20 },
});
