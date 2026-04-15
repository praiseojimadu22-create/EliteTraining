import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { T } from '../theme';
import { CONE_DAYS, FITNESS_DAYS, getSets } from '../data';
import { Storage } from '../storage';
import { fmtDate } from '../schedule';

export default function WeekScreen({ route, navigation }) {
  const { weekNum, sessionIds } = route.params;
  const [schedule, setSchedule] = useState({});
  const [progress, setProgress] = useState({});

  useFocusEffect(useCallback(() => {
    Promise.all([Storage.getSchedule(), Storage.getProgress()]).then(([sc, pr]) => {
      setSchedule(sc);
      setProgress(pr);
    });
  }, []));

  const getSessionCompletion = (id) => {
    if (id.startsWith('fit-')) return { done: !!progress[id]?.done, total: 1, isDone: !!progress[id]?.done };
    const num = parseInt(id.split('-')[1]);
    const cd = CONE_DAYS.find(d => d.day === num);
    if (!cd) return { done: 0, total: 0, isDone: false };
    let done = 0, total = 0;
    cd.drills.forEach((drillId, di) => {
      const s = getSets(drillId, cd.phase);
      const count = s.timed ? s.count : s.sets.length;
      total += count;
      done += (progress[id]?.[di] || []).filter(Boolean).length;
    });
    return { done, total, isDone: total > 0 && done === total };
  };

  const phaseColor = p => T.phases[(p || 1) - 1];

  const getSessionData = (id) => {
    if (id.startsWith('cone-')) {
      const num = parseInt(id.split('-')[1]);
      const cd = CONE_DAYS.find(d => d.day === num);
      return { type: 'cone', label: `Cone Day ${num}`, phase: cd?.phase, drillCount: cd?.drills?.length, coneData: cd };
    } else {
      const num = parseInt(id.split('-')[1]);
      const fd = FITNESS_DAYS.find(f => f.week === num);
      return { type: 'fit', label: fd?.name || 'Fitness', badge: fd?.badge, icon: fd?.icon, fitData: fd };
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back} activeOpacity={0.7}>
          <Text style={styles.backTxt}>← SCHEDULE</Text>
        </TouchableOpacity>
        <Text style={styles.h1}>WEEK {weekNum}</Text>
        <Text style={styles.sub}>{sessionIds.length} session{sessionIds.length !== 1 ? 's' : ''}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {sessionIds.map(id => {
          const s = getSessionData(id);
          const comp = getSessionCompletion(id);
          const date = schedule[id];
          const pct = s.type === 'cone' && comp.total > 0 ? comp.done / comp.total : 0;
          const color = s.type === 'cone' ? phaseColor(s.phase) : T.amber;

          return (
            <TouchableOpacity
              key={id}
              style={styles.card}
              onPress={() => {
                if (s.type === 'cone') {
                  navigation.navigate('Session', { sessionId: id });
                } else {
                  navigation.navigate('Fitness', { fitWeek: parseInt(id.split('-')[1]) });
                }
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.colorBar, { backgroundColor: color }]} />
              <View style={styles.cardInner}>
                <View style={styles.cardTop}>
                  <View style={styles.cardLeft}>
                    {s.type === 'fit' && <Text style={styles.fitIcon}>{s.icon}</Text>}
                    <View>
                      <Text style={styles.cardTitle}>{s.label}</Text>
                      <Text style={styles.cardSub}>
                        {s.type === 'cone'
                          ? `Phase ${s.phase} · ${s.drillCount} drills`
                          : s.badge}
                      </Text>
                      <Text style={styles.cardDate}>{fmtDate(date)}</Text>
                    </View>
                  </View>
                  <View style={styles.cardRight}>
                    {comp.isDone ? (
                      <View style={styles.doneBadge}>
                        <Text style={styles.doneTxt}>✓</Text>
                      </View>
                    ) : (
                      <View style={styles.arrowWrap}>
                        <Text style={styles.arrow}>→</Text>
                      </View>
                    )}
                    {s.type === 'cone' && comp.total > 0 && (
                      <Text style={styles.setsTxt}>{comp.done}/{comp.total}</Text>
                    )}
                  </View>
                </View>
                {s.type === 'cone' && comp.total > 0 && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, {
                      width: `${pct * 100}%`,
                      backgroundColor: comp.isDone ? T.success : color,
                    }]} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  header: { paddingHorizontal: T.pad, paddingTop: 8, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: T.border },
  back: { marginBottom: 8 },
  backTxt: { color: T.primary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  h1: { fontSize: 32, fontWeight: '900', color: T.text, letterSpacing: 1 },
  sub: { fontSize: 12, color: T.muted, marginTop: 2 },

  scroll: { padding: T.pad, gap: 10, paddingBottom: 40 },

  card: {
    backgroundColor: T.card, borderRadius: T.radius,
    borderWidth: 1, borderColor: T.border,
    flexDirection: 'row', overflow: 'hidden',
  },
  colorBar: { width: 4 },
  cardInner: { flex: 1, padding: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  fitIcon: { fontSize: 28 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: T.text },
  cardSub: { fontSize: 11, color: T.muted, marginTop: 2 },
  cardDate: { fontSize: 11, color: T.sub, marginTop: 2 },
  cardRight: { alignItems: 'center', gap: 4 },
  doneBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: T.success + '20', borderWidth: 1, borderColor: T.success + '60', alignItems: 'center', justifyContent: 'center' },
  doneTxt: { color: T.success, fontSize: 16, fontWeight: '900' },
  arrowWrap: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  arrow: { color: T.muted, fontSize: 18 },
  setsTxt: { fontSize: 10, color: T.muted, fontWeight: '700' },
  progressBar: { height: 2, backgroundColor: T.border, borderRadius: 1, marginTop: 10, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 1 },
});
