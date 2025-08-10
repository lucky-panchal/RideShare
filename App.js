import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionIOSSpec } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Easing } from 'react-native';
import { registerRootComponent } from 'expo';
import Onboarding1 from './components/Onboardings/Onboarding1';
import Onboarding2 from './components/Onboardings/Onboarding2';
import Onboarding3 from './components/Onboardings/Onboarding3';
import EnableLocation from './components/Authentications/EnableLocation';
import Welcome from './components/Authentications/WelcomePage';
import SignUp from './components/Authentications/SignUp';
import OtpVerify from './components/Authentications/OtpVerify';
import SetPassword from './components/Authentications/SetPassword';
import CompleteProfile from './components/Authentications/CompleteProfile';
import SignIn from './components/Authentications/SignIn';
import SendVerification from './components/Authentications/SendVerification';
import SendVerification2 from './components/Authentications/SendVerification2';
import PhoneVerifyOtp from './components/Authentications/PhoneVerifyOtp';
import PhoneVerifyOtp2 from './components/Authentications/PhoneVerifyOtp2';
import SetNewPassword from './components/Authentications/SetNewPassword';
import Home from './components/Home/home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Home Screen
function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="HomeMain" component={Home} />
    </Tab.Navigator>
  );
}

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
        <Stack.Screen name="SendVerification" component={SendVerification} />
        <Stack.Screen name="SendVerification2" component={SendVerification2} />
        <Stack.Screen name="PhoneVerifyOtp" component={PhoneVerifyOtp} />
        <Stack.Screen name="PhoneVerifyOtp2" component={PhoneVerifyOtp2} />
        <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;