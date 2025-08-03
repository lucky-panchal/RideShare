import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Onboarding1 from './components/FirstScreen/Onboarding1';
import Onboarding2 from './components/FirstScreen/Onboarding2';
import Onboarding3 from './components/FirstScreen/Onboarding3';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 300,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 300,
              },
            },
          },
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding1} />
        <Stack.Screen name="Onboarding" component={Onboarding2} />
        <Stack.Screen name="Onboarding" component={Onboarding3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}