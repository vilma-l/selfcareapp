import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { initializeApp, getApps } from 'firebase/app';
import { auth, firebaseConfig } from './firebase';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import AddDailyScreen from './screens/AddDailyScreen';
import AffirmationsScreen from './screens/AffirmationsScreen';
import CalendarScreen from './screens/CalendarScreen';
import RoutineScreen from './screens/RoutineScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';

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
      <Drawer.Navigator initialRouteName={isSignedIn ? 'Affirmations' : 'Login'}>
        {isSignedIn ? (
          <>
            <Drawer.Screen
              name="Affirmations"
              component={AffirmationsScreen}
              options={{
                title: 'Affirmations',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="hand-heart-outline" size={24} color="black" />
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
            <Drawer.Screen
              name="Today"
              component={AddDailyScreen}
              options={{
                title: 'Today',
                drawerIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons name="calendar-today" size={24} color="black" />
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
