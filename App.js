import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AffirmationsScreen from './components/AffirmationsScreen';
import HomeScreen from './components/HomeScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Affirmations') {
              iconName = 'hand-heart-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={24} color='black' />
          },
        })}>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Affirmations' component={AffirmationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
