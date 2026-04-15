import AsyncStorage from '@react-native-async-storage/async-storage';

const K = {
  SETUP_DONE:  'ep_setup_done',
  START_DATE:  'ep_start_date',
  SCHEDULE:    'ep_schedule',
  PROGRESS:    'ep_progress',
  PLAYER_NAME: 'ep_player_name',
};

export const Storage = {
  async isSetupDone() {
    try { return !!(await AsyncStorage.getItem(K.SETUP_DONE)); }
    catch { return false; }
  },
  async setSetupDone() {
    await AsyncStorage.setItem(K.SETUP_DONE, '1');
  },
  async getStartDate() {
    try { return await AsyncStorage.getItem(K.START_DATE); }
    catch { return null; }
  },
  async setStartDate(date) {
    await AsyncStorage.setItem(K.START_DATE, date);
  },
  async getSchedule() {
    try {
      const raw = await AsyncStorage.getItem(K.SCHEDULE);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  },
  async setSchedule(schedule) {
    await AsyncStorage.setItem(K.SCHEDULE, JSON.stringify(schedule));
  },
  async getProgress() {
    try {
      const raw = await AsyncStorage.getItem(K.PROGRESS);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  },
  async setProgress(progress) {
    await AsyncStorage.setItem(K.PROGRESS, JSON.stringify(progress));
  },
  async getPlayerName() {
    try { return await AsyncStorage.getItem(K.PLAYER_NAME); }
    catch { return null; }
  },
  async setPlayerName(name) {
    await AsyncStorage.setItem(K.PLAYER_NAME, name);
  },
  async resetAll() {
    await AsyncStorage.multiRemove(Object.values(K));
  },
};
