import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import Onboarding1 from './components/FirstScreen/Onboarding1';
import Onboarding2 from './components/FirstScreen/Onboarding2';
import Onboarding3 from './components/FirstScreen/Onboarding3';
import EnableLocation from './components/SecondScreen/EnableLocation';
import Welcome from './components/SecondScreen/WelcomePage';
import SignUp from './components/SecondScreen/SignUp';
import OtpVerify from './components/SecondScreen/OtpVerify';
import SetPassword from './components/SecondScreen/SetPassword';

const Stack = createStackNavigator();

function App() {
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
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="EnableLocation" component={EnableLocation} />
        <Stack.Screen name="WelcomePage" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="SetPassword" component={SetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;