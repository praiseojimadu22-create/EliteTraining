import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, SectionList,
  StyleSheet, Alert, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { T } from '../theme';
import { Storage } from '../storage';
import { autoAssign, sortedSessions, fmtDate, weekNumber } from '../schedule';

export default function ScheduleScreen({ navigation }) {
  const [schedule, setSchedule] = useState({});
  const [startDate, setStartDate] = useState('');
  const [sections, setSections] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const load = async () => {
    const sd = await Storage.getStartDate();
    const sc = await Storage.getSchedule();
    setStartDate(sd || '');
    setSchedule(sc);
    setSections(sortedSessions(sc, sd));
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  const openDateEdit = (sessionId, currentDateISO) => {
    setEditingId(sessionId);
    setPickerDate(currentDateISO ? new Date(currentDateISO + 'T12:00:00') : new Date());
    setShowPicker(true);
  };

  const handlePickerChange = async (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (!date || !editingId) return;
    const iso = date.toISOString().split('T')[0];
    const newSchedule = { ...schedule, [editingId]: iso };
    setSchedule(newSchedule);
    await Storage.setSchedule(newSchedule);
    setSections(sortedSessions(newSchedule, startDate));
    setEditingId(null);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Schedule',
      'This will clear all progress and regenerate the schedule from today. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await Storage.resetAll();
            navigation.replace('Setup');
          },
        },
      ]
    );
  };

  const phaseColor = p => T.phases[p - 1] || T.muted;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Session', { sessionId: item.id })}
      activeOpacity={0.8}
    >
      <View style={[styles.phaseBar, { backgroundColor: item.type === 'cone' ? phaseColor(item.phase) : T.amber }]} />
      <View style={styles.cardBody}>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.label}</Text>
          <Text style={styles.cardSub}>{item.sub}</Text>
        </View>
        <TouchableOpacity
          style={styles.datePill}
          onPress={() => openDateEdit(item.id, item.date)}
          activeOpacity={0.7}
        >
          <Text style={styles.datePillTxt}>{item.date ? fmtDate(item.date) : 'SET DATE'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTxt}>
        {section.week === 0 ? 'UNSCHEDULED' : `WEEK ${section.week}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.h1}>SCHEDULE</Text>
          <Text style={styles.headerSub}>Tap date to reassign · Tap session to open</Text>
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.7}>
          <Text style={styles.resetTxt}>⚙</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />

      {showPicker && (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display="default"
          onChange={handlePickerChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: T.pad,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: T.border,
  },
  h1: { fontSize: 28, fontWeight: '900', color: T.text, letterSpacing: 1 },
  headerSub: { fontSize: 11, color: T.muted, marginTop: 2 },
  resetBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: T.card,
    borderWidth: 1, borderColor: T.border,
    alignItems: 'center', justifyContent: 'center',
  },
  resetTxt: { fontSize: 20, color: T.sub },

  list: { paddingHorizontal: T.pad, paddingBottom: 32 },

  sectionHead: { paddingTop: 20, paddingBottom: 8 },
  sectionTxt: { color: T.muted, fontSize: 10, fontWeight: '700', letterSpacing: 2 },

  card: {
    backgroundColor: T.card,
    borderRadius: T.radius,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: T.border,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  phaseBar: { width: 4 },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: T.text },
  cardSub: { fontSize: 11, color: T.muted, marginTop: 2 },
  datePill: {
    backgroundColor: T.card2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: T.border,
  },
  datePillTxt: { fontSize: 11, color: T.sub, fontWeight: '600', fontVariant: ['tabular-nums'] },
});
