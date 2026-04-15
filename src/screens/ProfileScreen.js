import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import Svg, { G, Circle, Line, Ellipse, Path, Rect, Text as ST } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { T } from '../theme';
import { Storage } from '../storage';
import { CONE_DAYS, FITNESS_DAYS, getSets } from '../data';

// ── Footballer SVG illustration ── side view, running/acceleration pose
function FootballerIllustration() {
  return (
    <Svg width={200} height={180}>
      <Rect width={200} height={180} fill="transparent" />
      {/* Shadow */}
      <Ellipse cx={102} cy={172} rx={30} ry={6} fill="#0f1a0f" />
      {/* Back leg (push-off) */}
      <Line x1={100} y1={110} x2={82} y2={138} stroke={T.primary} strokeWidth={6} strokeLinecap="round" />
      <Line x1={82} y1={138} x2={75} y2={160} stroke={T.primary} strokeWidth={5} strokeLinecap="round" />
      {/* Forward leg (knee drive) */}
      <Line x1={102} y1={112} x2={120} y2={92} stroke={T.primary} strokeWidth={6} strokeLinecap="round" />
      <Line x1={120} y1={92} x2={132} y2={115} stroke={T.primary} strokeWidth={5} strokeLinecap="round" />
      {/* Body — forward lean */}
      <Line x1={98} y1={50} x2={100} y2={112} stroke={T.primary} strokeWidth={8} strokeLinecap="round" />
      {/* Back arm (driving back) */}
      <Line x1={98} y1={72} x2={80} y2={90} stroke={T.primary} strokeWidth={5} strokeLinecap="round" />
      <Line x1={80} y1={90} x2={72} y2={80} stroke={T.primary} strokeWidth={4} strokeLinecap="round" />
      {/* Forward arm (pumping forward) */}
      <Line x1={102} y1={70} x2={122} y2={56} stroke={T.primary} strokeWidth={5} strokeLinecap="round" />
      <Line x1={122} y1={56} x2={128} y2={66} stroke={T.primary} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <Circle cx={98} cy={36} r={14} fill={T.primary} />
      {/* Speed lines */}
      <Line x1={62} y1={60} x2={48} y2={60} stroke={T.primary} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <Line x1={60} y1={72} x2={44} y2={72} stroke={T.primary} strokeWidth={1.5} opacity={0.2} strokeLinecap="round" />
      <Line x1={64} y1={84} x2={52} y2={84} stroke={T.primary} strokeWidth={1} opacity={0.15} strokeLinecap="round" />
    </Svg>
  );
}

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState({ sessionsCompleted: 0, setsCompleted: 0, currentWeek: 1, currentPhase: 1, totalSets: 0, totalSessions: 32 });

  useFocusEffect(useCallback(() => {
    Promise.all([
      Storage.getPlayerName(),
      Storage.getProgress(),
      Storage.getStartDate(),
    ]).then(([n, progress, startDate]) => {
      setName(n || '');
      computeStats(progress, startDate);
    });
  }, []));

  const computeStats = (progress, startDate) => {
    let sessionsCompleted = 0, setsCompleted = 0, totalSets = 0;

    CONE_DAYS.forEach(cd => {
      const id = `cone-${cd.day}`;
      let done = 0, total = 0;
      cd.drills.forEach((drillId, di) => {
        const s = getSets(drillId, cd.phase);
        const count = s.timed ? s.count : s.sets.length;
        total += count;
        done += (progress[id]?.[di] || []).filter(Boolean).length;
      });
      totalSets += total;
      setsCompleted += done;
      if (total > 0 && done === total) sessionsCompleted++;
    });

    FITNESS_DAYS.forEach(fd => {
      const id = `fit-${fd.week}`;
      if (progress[id]?.done) sessionsCompleted++;
    });

    let currentWeek = 1, currentPhase = 1;
    if (startDate) {
      const daysSinceStart = Math.floor((Date.now() - new Date(startDate + 'T12:00:00').getTime()) / (1000 * 60 * 60 * 24));
      currentWeek = Math.max(1, Math.min(12, Math.floor(daysSinceStart / 7) + 1));
      currentPhase = currentWeek <= 3 ? 1 : currentWeek <= 6 ? 2 : currentWeek <= 9 ? 3 : 4;
    }

    setStats({ sessionsCompleted, setsCompleted, currentWeek, currentPhase, totalSets, totalSessions: 32 });
  };

  const saveName = async () => {
    await Storage.setPlayerName(name.trim() || 'Athlete');
    setEditing(false);
  };

  const phaseColor = T.phases[stats.currentPhase - 1];
  const programPct = stats.sessionsCompleted / stats.totalSessions;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back} activeOpacity={0.7}>
          <Text style={styles.backTxt}>← SCHEDULE</Text>
        </TouchableOpacity>
        <Text style={styles.h1}>PROFILE</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Player card */}
        <View style={styles.playerCard}>
          <View style={styles.illustrationWrap}>
            <FootballerIllustration />
          </View>
          <View style={styles.playerInfo}>
            {editing ? (
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TextInput
                  style={styles.nameInput}
                  value={name}
                  onChangeText={setName}
                  autoFocus
                  placeholder="Your name"
                  placeholderTextColor={T.muted}
                  returnKeyType="done"
                  onSubmitEditing={saveName}
                  maxLength={24}
                />
                <TouchableOpacity style={styles.saveBtn} onPress={saveName} activeOpacity={0.8}>
                  <Text style={styles.saveBtnTxt}>SAVE</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            ) : (
              <TouchableOpacity onPress={() => setEditing(true)} activeOpacity={0.8}>
                <Text style={styles.playerName}>{name || 'TAP TO SET NAME'}</Text>
                <Text style={styles.editHint}>{name ? 'Tap to edit' : ''}</Text>
              </TouchableOpacity>
            )}
            <View style={[styles.phasePill, { backgroundColor: phaseColor + '20', borderColor: phaseColor + '50' }]}>
              <Text style={[styles.phasePillTxt, { color: phaseColor }]}>
                WEEK {stats.currentWeek} · PHASE {stats.currentPhase}
              </Text>
            </View>
          </View>
        </View>

        {/* Program progress */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>PROGRAM PROGRESS</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressPct}>{Math.round(programPct * 100)}%</Text>
            <Text style={styles.progressFrac}>{stats.sessionsCompleted}/{stats.totalSessions} sessions</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${programPct * 100}%`, backgroundColor: programPct === 1 ? T.success : T.primary }]} />
          </View>
        </View>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {[
            { val: `${stats.currentWeek}/12`, label: 'CURRENT\nWEEK', color: T.primary },
            { val: `${stats.currentPhase}/4`, label: 'CURRENT\nPHASE', color: phaseColor },
            { val: `${stats.sessionsCompleted}`, label: 'SESSIONS\nDONE', color: T.success },
            { val: `${stats.setsCompleted}`, label: 'SETS\nCOMPLETED', color: T.amber },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Phase breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>PHASE BREAKDOWN</Text>
          {['Foundation', 'Build', 'Peak Load', 'Championship'].map((name, i) => {
            const pc = T.phases[i];
            const weeks = `Weeks ${i * 3 + 1}–${(i + 1) * 3}`;
            const isCurrent = stats.currentPhase === i + 1;
            return (
              <View key={i} style={[styles.phaseRow, i < 3 && styles.phaseBorder]}>
                <View style={[styles.phaseNum, { backgroundColor: pc + '20', borderColor: pc + '50' }]}>
                  <Text style={[styles.phaseNumTxt, { color: pc }]}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.phaseName, isCurrent && { color: T.text }]}>{name}</Text>
                  <Text style={styles.phaseWeeks}>{weeks}</Text>
                </View>
                {isCurrent && (
                  <View style={[styles.currentPill, { backgroundColor: pc + '20', borderColor: pc + '40' }]}>
                    <Text style={[styles.currentPillTxt, { color: pc }]}>NOW</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  header: { paddingHorizontal: T.pad, paddingTop: 8, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: T.border },
  back: { marginBottom: 8 },
  backTxt: { color: T.primary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  h1: { fontSize: 28, fontWeight: '900', color: T.text, letterSpacing: 1 },

  scroll: { padding: T.pad, gap: 12, paddingBottom: 40 },

  playerCard: { backgroundColor: T.card, borderRadius: T.radius, borderWidth: 1, borderColor: T.border, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', paddingRight: 16 },
  illustrationWrap: { backgroundColor: '#0f1a0f', paddingVertical: 8, paddingLeft: 8 },
  playerInfo: { flex: 1, paddingLeft: 16, gap: 8 },
  playerName: { fontSize: 20, fontWeight: '900', color: T.text, letterSpacing: 0.5 },
  editHint: { fontSize: 10, color: T.muted, marginTop: 2 },
  nameInput: { backgroundColor: T.card2, borderRadius: T.radiusSm, padding: 10, color: T.text, fontSize: 16, fontWeight: '700', borderWidth: 1, borderColor: T.primary + '60' },
  saveBtn: { backgroundColor: T.primary, borderRadius: T.radiusSm, paddingVertical: 8, alignItems: 'center', marginTop: 6 },
  saveBtnTxt: { color: '#0a0d0a', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  phasePill: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  phasePillTxt: { fontSize: 9, fontWeight: '700', letterSpacing: 1 },

  card: { backgroundColor: T.card, borderRadius: T.radius, padding: 14, borderWidth: 1, borderColor: T.border },
  cardLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: T.muted, marginBottom: 12, textTransform: 'uppercase' },

  progressRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginBottom: 8 },
  progressPct: { fontSize: 28, fontWeight: '900', color: T.primary },
  progressFrac: { fontSize: 12, color: T.muted },
  progressBar: { height: 4, backgroundColor: T.border, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },

  statsGrid: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  statCard: { backgroundColor: T.card, borderRadius: T.radius, borderWidth: 1, borderColor: T.border, padding: 14, flex: 1, minWidth: '44%', alignItems: 'center' },
  statVal: { fontSize: 28, fontWeight: '900', letterSpacing: 0.5 },
  statLabel: { fontSize: 9, fontWeight: '700', color: T.muted, letterSpacing: 1, marginTop: 4, textAlign: 'center' },

  phaseRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  phaseBorder: { borderBottomWidth: 1, borderBottomColor: T.border },
  phaseNum: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  phaseNumTxt: { fontSize: 12, fontWeight: '900' },
  phaseName: { fontSize: 13, fontWeight: '700', color: T.sub },
  phaseWeeks: { fontSize: 11, color: T.muted, marginTop: 1 },
  currentPill: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  currentPillTxt: { fontSize: 9, fontWeight: '700', letterSpacing: 1 },
});
