import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionIOSSpec } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Easing } from 'react-native';
import { smoothSlideTransition } from './components/shared/PageTransition';
import { registerRootComponent } from 'expo';
import OnboardingSwiper from './components/Onboardings/OnboardingSwiper';
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
import MainHomeContainer from './components/Home/MainHomeContainer';
import MapTest from './components/shared/MapTest';
import SimpleHome from './components/Home/SimpleHome';
import LocationStack from './components/location/LocationStack';
import SelectTransport from './components/transport/SelectTransport';
import Vehicle from './components/transport/Vehicle';
import AvailableVehicle from './components/transport/AvailableVehicle';
import RideMap from './components/transport/RideMap';
import VehicleDetails from './components/transport/VehicleDetails';
import RideBooking from './components/transport/RideBooking';
import BookingConfirmation from './components/transport/BookingConfirmation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: smoothSlideTransition,
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
        <Stack.Screen name="Onboarding1" component={OnboardingSwiper} />
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
        <Stack.Screen name="Home" component={MainHomeContainer} />
        <Stack.Screen name="MapTest" component={MapTest} />
        <Stack.Screen name="SimpleHome" component={SimpleHome} />
        <Stack.Screen name="LocationStack" component={LocationStack} />
        <Stack.Screen name="SelectTransport" component={SelectTransport} />
        <Stack.Screen name="Vehicle" component={Vehicle} />
        <Stack.Screen name="AvailableVehicle" component={AvailableVehicle} />
        <Stack.Screen name="RideBooking" component={RideBooking} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmation} />
        <Stack.Screen name="RideMap" component={RideMap} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;