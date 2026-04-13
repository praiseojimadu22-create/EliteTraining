import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { T } from '../theme';
import { DRILLS, getSets } from '../data';
import Timer from '../components/Timer';

export default function DrillScreen({ route, navigation }) {
  const { drillId, phase } = route.params;
  const drill = DRILLS[drillId];
  const sets = getSets(drillId, phase);
  const areaColor = T.areaColor[drill.area];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back} activeOpacity={0.7}>
          <Text style={styles.backTxt}>← BACK</Text>
        </TouchableOpacity>
        <View style={styles.metaRow}>
          <View style={[styles.chip, { backgroundColor: areaColor + '18', borderColor: areaColor + '50' }]}>
            <Text style={[styles.chipTxt, { color: areaColor }]}>{T.areaLabel[drill.area]}</Text>
          </View>
          <View style={styles.numBadge}>
            <Text style={styles.numTxt}>DRILL #{drillId}</Text>
          </View>
        </View>
        <Text style={styles.h1}>{drill.name.toUpperCase()}</Text>
        <Text style={styles.sub}>{drill.cones} cones · {drill.space}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Target */}
        <View style={[styles.targetCard, { borderLeftColor: areaColor }]}>
          <Text style={[styles.cardLabel, { color: areaColor }]}>TARGET</Text>
          <Text style={styles.targetTxt}>{drill.target}</Text>
        </View>

        {/* Steps */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>EXECUTION</Text>
          {drill.steps.map((step, i) => (
            <View key={i} style={[styles.stepRow, i < drill.steps.length - 1 && styles.stepBorder]}>
              <Text style={[styles.stepNum, { color: areaColor }]}>{i + 1}</Text>
              <Text style={styles.stepTxt}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Sets breakdown */}
        <View style={styles.card}>
          <View style={styles.setsHeader}>
            <Text style={styles.cardLabel}>
              {sets.timed ? `${sets.count} SETS · 5:00 ACTIVE EACH` : `${sets.sets.length} SETS`}
            </Text>
          </View>
          {sets.timed
            ? (
              <View style={styles.timedInfo}>
                <Text style={styles.timedTxt}>Each set is 5 continuous minutes of active work.</Text>
                <Text style={styles.timedTxt}>Rest between sets is separate — not included in active time.</Text>
              </View>
            )
            : (
              <View style={styles.repsRow}>
                {sets.sets.map((r, i) => (
                  <View key={i} style={styles.repBadge}>
                    <Text style={styles.repLabel}>S{i + 1}</Text>
                    <Text style={styles.repCount}>{r}</Text>
                  </View>
                ))}
              </View>
            )
          }
        </View>

        {/* Timers */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>TIMERS</Text>
          {sets.timed
            ? <Timer duration={300} label="5:00 ACTIVE SET" />
            : (
              <View style={styles.timerRow}>
                <View style={{ flex: 1 }}>
                  <Timer duration={90} label="REST · 1:30" />
                </View>
                <View style={{ flex: 1 }}>
                  <Timer duration={300} label="ACTIVE SET · 5:00" />
                </View>
              </View>
            )
          }
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  header: {
    paddingHorizontal: T.pad,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
  },
  back: { marginBottom: 10 },
  backTxt: { color: T.primary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  metaRow: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 6 },
  chip: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  chipTxt: { fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  numBadge: { backgroundColor: T.card2, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: T.border },
  numTxt: { fontSize: 9, fontWeight: '700', color: T.muted, letterSpacing: 1 },
  h1: { fontSize: 26, fontWeight: '900', color: T.text, letterSpacing: 0.5, lineHeight: 30 },
  sub: { fontSize: 12, color: T.muted, marginTop: 4 },

  scroll: { padding: T.pad, gap: 12, paddingBottom: 40 },

  targetCard: {
    backgroundColor: T.card,
    borderRadius: T.radius,
    padding: 14,
    borderWidth: 1,
    borderColor: T.border,
    borderLeftWidth: 4,
  },
  cardLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: T.muted, marginBottom: 8, textTransform: 'uppercase' },
  targetTxt: { fontSize: 13, color: T.text, fontWeight: '500', lineHeight: 20 },

  card: {
    backgroundColor: T.card,
    borderRadius: T.radius,
    padding: 14,
    borderWidth: 1,
    borderColor: T.border,
    gap: 2,
  },
  stepRow: { flexDirection: 'row', gap: 12, paddingVertical: 10, alignItems: 'flex-start' },
  stepBorder: { borderBottomWidth: 1, borderBottomColor: T.border },
  stepNum: { fontSize: 20, fontWeight: '900', lineHeight: 24, minWidth: 18, textAlign: 'center' },
  stepTxt: { flex: 1, fontSize: 13, color: T.sub, lineHeight: 20 },

  setsHeader: { marginBottom: 4 },
  timedInfo: { gap: 4, marginTop: 4 },
  timedTxt: { fontSize: 13, color: T.sub, lineHeight: 20 },
  repsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  repBadge: {
    backgroundColor: T.card2,
    borderRadius: T.radiusSm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: T.border,
    minWidth: 54,
  },
  repLabel: { fontSize: 9, fontWeight: '700', color: T.muted, letterSpacing: 1 },
  repCount: { fontSize: 18, fontWeight: '900', color: T.primary, marginTop: 2 },

  timerRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
});
