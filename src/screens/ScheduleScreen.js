import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { T } from '../theme';
import { Storage } from '../storage';
import { sortedSessions, fmtDate } from '../schedule';
import { CONE_DAYS, FITNESS_DAYS, getSets } from '../data';

export default function ScheduleScreen({ navigation }) {
  const [sections, setSections] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [progress, setProgress] = useState({});

  const load = async () => {
    const [sd, sc, pr] = await Promise.all([
      Storage.getStartDate(),
      Storage.getSchedule(),
      Storage.getProgress(),
    ]);
    setStartDate(sd || '');
    setProgress(pr);
    setSections(sortedSessions(sc, sd));
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  const getWeekStats = (sessions) => {
    let done = 0;
    sessions.forEach(s => {
      if (s.id.startsWith('cone-')) {
        const num = parseInt(s.id.split('-')[1]);
        const cd = CONE_DAYS.find(d => d.day === num);
        if (!cd) return;
        let total = 0, completed = 0;
        cd.drills.forEach((drillId, di) => {
          const sets = getSets(drillId, cd.phase);
          const count = sets.timed ? sets.count : sets.sets.length;
          total += count;
          completed += (progress[s.id]?.[di] || []).filter(Boolean).length;
        });
        if (total > 0 && completed === total) done++;
      } else {
        if (progress[s.id]?.done) done++;
      }
    });
    return done;
  };

  const getDateRange = (sessions) => {
    const dates = sessions.map(s => s.date).filter(Boolean).sort();
    if (!dates.length) return 'No dates set';
    if (dates.length === 1) return fmtDate(dates[0]);
    return `${fmtDate(dates[0])} – ${fmtDate(dates[dates.length - 1])}`;
  };

  const handleReset = () => {
    Alert.alert('Reset Program', 'This clears all progress and schedule. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: async () => {
        await Storage.resetAll();
        navigation.replace('Setup');
      }},
    ]);
  };

  const renderWeekCard = ({ item: section }) => {
    const sessionIds = section.data.map(s => s.id);
    const doneCount = getWeekStats(section.data);
    const total = section.data.length;
    const pct = doneCount / total;
    const isCurrentWeek = section.week > 0 && (() => {
      if (!startDate) return false;
      const today = new Date();
      const start = new Date(startDate + 'T12:00:00');
      const weekNum = Math.floor((today - start) / (7 * 24 * 3600 * 1000)) + 1;
      return weekNum === section.week;
    })();

    const conePhases = section.data
      .filter(s => s.type === 'cone')
      .map(s => CONE_DAYS.find(d => d.day === parseInt(s.id.split('-')[1]))?.phase)
      .filter(Boolean);
    const mainPhase = conePhases[0] || 1;
    const phaseColor = T.phases[mainPhase - 1];

    return (
      <TouchableOpacity
        style={[styles.weekCard, isCurrentWeek && styles.weekCardCurrent]}
        onPress={() => navigation.navigate('Week', { weekNum: section.week, sessionIds })}
        activeOpacity={0.8}
      >
        <View style={styles.weekCardLeft}>
          <View style={[styles.weekNumCircle, { borderColor: isCurrentWeek ? T.primary : phaseColor + '60', backgroundColor: isCurrentWeek ? T.primary + '20' : phaseColor + '12' }]}>
            <Text style={[styles.weekNum, { color: isCurrentWeek ? T.primary : phaseColor }]}>
              {section.week === 0 ? '?' : section.week}
            </Text>
          </View>
        </View>
        <View style={styles.weekCardMid}>
          <View style={styles.weekTitleRow}>
            <Text style={styles.weekTitle}>
              {section.week === 0 ? 'UNSCHEDULED' : `WEEK ${section.week}`}
            </Text>
            {isCurrentWeek && (
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeTxt}>NOW</Text>
              </View>
            )}
          </View>
          <Text style={styles.weekDates}>{getDateRange(section.data)}</Text>
          <Text style={styles.weekSessionCount}>{total} session{total !== 1 ? 's' : ''}</Text>
          {/* Session type icons */}
          <View style={styles.sessionTypes}>
            {section.data.map(s => (
              <View key={s.id} style={[styles.sessionDot, {
                backgroundColor: s.type === 'cone' ? phaseColor + '30' : T.amber + '30',
                borderColor: s.type === 'cone' ? phaseColor + '70' : T.amber + '70',
              }]}>
                <Text style={[styles.sessionDotTxt, { color: s.type === 'cone' ? phaseColor : T.amber }]}>
                  {s.type === 'cone' ? 'C' : 'F'}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.weekCardRight}>
          <Text style={[styles.weekPct, { color: pct === 1 ? T.success : T.muted }]}>
            {doneCount}/{total}
          </Text>
          {pct === 1 ? (
            <Text style={styles.doneCheck}>✓</Text>
          ) : (
            <Text style={styles.arrow}>›</Text>
          )}
        </View>
        {/* Bottom progress strip */}
        <View style={[styles.weekProgress, { width: `${pct * 100}%`, backgroundColor: pct === 1 ? T.success : phaseColor }]} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.h1}>SCHEDULE</Text>
          <Text style={styles.sub}>Tap a week to open sessions</Text>
        </View>
        <View style={styles.headerBtns}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
          >
            <Text style={styles.iconBtnTxt}>👤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={handleReset} activeOpacity={0.7}>
            <Text style={styles.iconBtnTxt}>⚙</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sections}
        keyExtractor={item => String(item.week)}
        renderItem={renderWeekCard}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: T.pad, paddingTop: 8, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: T.border,
  },
  h1: { fontSize: 28, fontWeight: '900', color: T.text, letterSpacing: 1 },
  sub: { fontSize: 11, color: T.muted, marginTop: 2 },
  headerBtns: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: T.card, borderWidth: 1, borderColor: T.border,
    alignItems: 'center', justifyContent: 'center',
  },
  iconBtnTxt: { fontSize: 18 },

  list: { paddingHorizontal: T.pad, paddingTop: 14, paddingBottom: 32, gap: 10 },

  weekCard: {
    backgroundColor: T.card,
    borderRadius: T.radius,
    borderWidth: 1,
    borderColor: T.border,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  weekCardCurrent: { borderColor: T.primary + '50' },
  weekCardLeft: { marginRight: 14 },
  weekNumCircle: {
    width: 44, height: 44, borderRadius: 22,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  weekNum: { fontSize: 18, fontWeight: '900' },

  weekCardMid: { flex: 1, gap: 3 },
  weekTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  weekTitle: { fontSize: 14, fontWeight: '900', color: T.text, letterSpacing: 0.5 },
  currentBadge: { backgroundColor: T.primary + '20', borderRadius: 3, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: T.primary + '50' },
  currentBadgeTxt: { fontSize: 8, fontWeight: '700', color: T.primary, letterSpacing: 1 },
  weekDates: { fontSize: 11, color: T.muted },
  weekSessionCount: { fontSize: 10, color: T.sub },
  sessionTypes: { flexDirection: 'row', gap: 4, marginTop: 4 },
  sessionDot: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  sessionDotTxt: { fontSize: 9, fontWeight: '900' },

  weekCardRight: { alignItems: 'center', gap: 2 },
  weekPct: { fontSize: 10, fontWeight: '700' },
  doneCheck: { fontSize: 18, color: T.success },
  arrow: { fontSize: 24, color: T.muted, lineHeight: 28 },

  weekProgress: {
    position: 'absolute', bottom: 0, left: 0,
    height: 2, borderRadius: 0,
  },
});
