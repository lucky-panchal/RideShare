import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocationConfirm from './LocationConfirm';
import LocationInput from './LocationInput';
import LocationRecent from './LocationRecent';

const Stack = createStackNavigator();

const LocationStack = () => {
  return (
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
              ],
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          };
        },
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
      <Stack.Screen 
        name="LocationConfirm" 
        component={LocationConfirm}
        options={{
          title: 'Select Location',
        }}
      />
      <Stack.Screen 
        name="LocationInput" 
        component={LocationInput}
        options={{
          title: 'Enter Address',
        }}
      />
      <Stack.Screen 
        name="LocationRecent" 
        component={LocationRecent}
        options={{
          title: 'Recent Places',
        }}
      />
    </Stack.Navigator>
  );
};

export default LocationStack;