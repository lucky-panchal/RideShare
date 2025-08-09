import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionIOSSpec } from '@react-navigation/stack';
import { Easing } from 'react-native';
import { registerRootComponent } from 'expo';
import Onboarding1 from './components/FirstScreen/Onboarding1';
import Onboarding2 from './components/FirstScreen/Onboarding2';
import Onboarding3 from './components/FirstScreen/Onboarding3';
import EnableLocation from './components/SecondScreen/EnableLocation';
import Welcome from './components/SecondScreen/WelcomePage';
import SignUp from './components/SecondScreen/SignUp';
import OtpVerify from './components/SecondScreen/OtpVerify';
import SetPassword from './components/SecondScreen/SetPassword';
import CompleteProfile from './components/SecondScreen/CompleteProfile';
import SignIn from './components/SecondScreen/SignIn';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                  {
                    scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
                opacity: current.progress.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.8, 1],
                }),
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.1],
                }),
              },
            };
          },
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 400,
                easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 350,
                easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
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
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;