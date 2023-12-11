import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { initializeApp, getApps } from 'firebase/app';
import { auth, firebaseConfig } from './firebase';

import AddDailyScreen from './screens/AddDailySleepScreen';
import AffirmationsScreen from './screens/AffirmationsScreen';
import AddMoodScreen from './screens/AddMoodScreen';
import CalendarScreen from './screens/CalendarScreen';
import RoutineScreen from './screens/RoutineScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import AddDailySleepScreen from './screens/AddDailySleepScreen';

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export default function App() {
  const Drawer = createDrawerNavigator();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={isSignedIn ? 'Mood Tracker' : 'Login'}>
        {isSignedIn ? (
          <>
            <Drawer.Screen
              name="Mood Tracker"
              component={AddMoodScreen}
              options={{
                title: 'Mood Tracker',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="table-heart" size={24} color="black" />
                ),
              }}
            />
            <Drawer.Screen
              name="Affirmations"
              component={AffirmationsScreen}
              options={{
                title: 'Affirmation',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="hand-heart-outline" size={24} color="black" />
                ),
              }}
            />
            <Drawer.Screen
              name="Sleep Tracker"
              component={AddDailySleepScreen}
              options={{
                title: 'Sleep Tracker',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="sleep" size={24} color="black" />
                ),
              }}
            />
            <Drawer.Screen
              name="Routines"
              component={RoutineScreen}
              options={{
                title: 'Routines',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="notebook-outline" size={24} color="black" />
                ),
              }}
            />
            <Drawer.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{
                title: 'Calendar',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="home-outline" size={24} color="black" />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Login',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="login-variant" size={24} color="black" />
                ),
              }}
            />
            <Drawer.Screen
              name="Register"
              component={SignupScreen}
              options={{
                title: 'Register',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="file-sign" size={24} color="black" />
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
