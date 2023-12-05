import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddDailyScreen from './screens/AddDailyScreen';
import AffirmationsScreen from './screens/AffirmationsScreen';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Affirmations'>
      <Drawer.Screen name='Calendar' component={CalendarScreen}
          options={{
            title: 'Calendar',
            drawerIcon: ({ focused, color, size }) =>
              <MaterialCommunityIcons name='home-outline' size={24} color='black' />
          }}
        />
        <Drawer.Screen name='Home' component={HomeScreen}
          options={{
            title: 'Home',
            drawerIcon: ({ focused, color, size }) =>
              <MaterialCommunityIcons name='home-outline' size={24} color='black' />
          }}
        />
        <Drawer.Screen name='Today' component={AddDailyScreen}
          options={{
            title: 'Today',
            drawerIcon: ({ focused, color, size }) =>
            <MaterialCommunityIcons name="calendar-today" size={24} color="black" />
          }}
        />
        <Drawer.Screen name='Affirmations' component={AffirmationsScreen} 
          options={{
            title: 'Affirmations',
            drawerIcon: ({ focused, color, size }) =>
              <MaterialCommunityIcons name='hand-heart-outline' size={24} color='black' />
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}