import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { T } from '../theme';
import { Storage } from '../storage';
import { autoAssign, fmtDate } from '../schedule';

export default function SetupScreen({ navigation }) {
  const [checking, setChecking] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    Storage.isSetupDone().then(done => {
      if (done) navigation.replace('Schedule');
      else setChecking(false);
    });
  }, []);

  const handleGenerate = async () => {
    const iso = selectedDate.toISOString().split('T')[0];
    const schedule = autoAssign(iso);
    await Storage.setStartDate(iso);
    await Storage.setSchedule(schedule);
    await Storage.setProgress({});
    await Storage.setSetupDone();
    navigation.replace('Schedule');
  };

  if (checking) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={T.primary} size="large" />
      </View>
    );
  }

  const today = new Date();
  const iso = selectedDate.toISOString().split('T')[0];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeTxt}>ELITE PERFORMANCE</Text>
          </View>
          <Text style={styles.h1}>12 WEEK</Text>
          <Text style={[styles.h1, { color: T.primary }]}>TRAINING</Text>
          <Text style={[styles.h1, { color: T.primary }]}>PROGRAM</Text>
          <View style={styles.chips}>
            <View style={[styles.chip, { borderColor: T.agility + '55', backgroundColor: T.agility + '15' }]}>
              <Text style={[styles.chipTxt, { color: T.agility }]}>AGILITY</Text>
            </View>
            <View style={[styles.chip, { borderColor: T.accel + '55', backgroundColor: T.accel + '15' }]}>
              <Text style={[styles.chipTxt, { color: T.accel }]}>ACCELERATION</Text>
            </View>
            <View style={[styles.chip, { borderColor: T.cut + '55', backgroundColor: T.cut + '15' }]}>
              <Text style={[styles.chipTxt, { color: T.cut }]}>CUTTING</Text>
            </View>
          </View>
        </View>

        {/* Date card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>PROGRAM START DATE</Text>
          <Text style={styles.cardSub}>Monday recommended. Sessions auto-assign Tue · Thu · Fri.</Text>

          <TouchableOpacity style={styles.dateBtn} onPress={() => setShowPicker(true)} activeOpacity={0.8}>
            <Text style={styles.dateTxt}>{fmtDate(iso)}</Text>
            <Text style={styles.dateIcon}>▾</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              minimumDate={today}
              onChange={(event, date) => {
                setShowPicker(Platform.OS === 'ios');
                if (date) setSelectedDate(date);
              }}
            />
          )}

          <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate} activeOpacity={0.85}>
            <Text style={styles.generateTxt}>GENERATE SCHEDULE</Text>
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[['20', 'CONE\nSESSIONS'], ['12', 'FITNESS\nDAYS'], ['8', 'DRILLS']].map(([n, l]) => (
            <View key={l} style={styles.stat}>
              <Text style={styles.statNum}>{n}</Text>
              <Text style={styles.statLbl}>{l}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  loading: { flex: 1, backgroundColor: T.bg, alignItems: 'center', justifyContent: 'center' },
  container: { flex: 1, paddingHorizontal: T.pad, paddingTop: 24, justifyContent: 'center', gap: 24 },
  header: { alignItems: 'center', gap: 0 },
  badge: {
    borderWidth: 1, borderColor: T.primary + '55', backgroundColor: T.primary + '15',
    borderRadius: 4, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 14,
  },
  badgeTxt: { color: T.primary, fontSize: 10, fontWeight: '700', letterSpacing: 2 },
  h1: { fontSize: 44, fontWeight: '900', color: T.text, letterSpacing: 1, lineHeight: 48 },
  chips: { flexDirection: 'row', gap: 8, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  chip: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 10, paddingVertical: 4 },
  chipTxt: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },

  card: {
    backgroundColor: T.card,
    borderRadius: T.radius,
    padding: 20,
    borderWidth: 1,
    borderColor: T.border,
    gap: 10,
  },
  cardLabel: { color: T.muted, fontSize: 10, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' },
  cardSub: { color: T.sub, fontSize: 12, lineHeight: 18 },
  dateBtn: {
    backgroundColor: T.card2,
    borderRadius: T.radiusSm,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: T.border,
    marginTop: 4,
  },
  dateTxt: { color: T.text, fontSize: 16, fontWeight: '700' },
  dateIcon: { color: T.primary, fontSize: 18, fontWeight: '700' },
  generateBtn: {
    backgroundColor: T.primary,
    borderRadius: T.radiusSm,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  generateTxt: { color: '#0a0d0a', fontSize: 14, fontWeight: '900', letterSpacing: 1 },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: T.card,
    borderRadius: T.radius,
    padding: 16,
    borderWidth: 1,
    borderColor: T.border,
  },
  stat: { alignItems: 'center', gap: 4 },
  statNum: { fontSize: 28, fontWeight: '900', color: T.primary },
  statLbl: { fontSize: 9, fontWeight: '700', color: T.muted, letterSpacing: 1, textAlign: 'center' },
});
