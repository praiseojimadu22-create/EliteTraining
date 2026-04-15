import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SetupScreen    from './src/screens/SetupScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import WeekScreen     from './src/screens/WeekScreen';
import SessionScreen  from './src/screens/SessionScreen';
import FitnessScreen  from './src/screens/FitnessScreen';
import DrillScreen    from './src/screens/DrillScreen';
import ProfileScreen  from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#0a0d0a" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Setup"
          screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        >
          <Stack.Screen name="Setup"    component={SetupScreen} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
          <Stack.Screen name="Week"     component={WeekScreen} />
          <Stack.Screen name="Session"  component={SessionScreen} />
          <Stack.Screen name="Fitness"  component={FitnessScreen} />
          <Stack.Screen name="Drill"    component={DrillScreen} />
          <Stack.Screen name="Profile"  component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
