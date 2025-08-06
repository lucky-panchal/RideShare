import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Location from 'expo-location';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function EnableLocation({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.3)).current;
  const iconOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Icon pop-out animation after card appears
      Animated.sequence([
        Animated.parallel([
          Animated.spring(iconScaleAnim, {
            toValue: 1.2,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(iconOpacityAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(iconScaleAnim, {
          toValue: 1,
          tension: 150,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const handleLocationPermission = async () => {
    try {
      console.log('Requesting location permission...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        console.log('Permission granted, getting location...');
        const location = await Location.getCurrentPositionAsync({});
        console.log('Location obtained:', location);
        
        Alert.alert(
          'Success', 
          'Location enabled successfully!', 
          [{ text: 'OK', onPress: () => {
            console.log('Navigating to WelcomePage...');
            navigation.navigate('WelcomePage');
          }}]
        );
      } else {
        console.log('Permission denied');
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'Failed to get location permission.');
    }
  };

  const handleSkip = () => {
    console.log('Skip pressed, navigating to WelcomePage...');
    navigation.navigate('WelcomePage');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Map Background */}
      <Image
        source={require('../../assets/AuthenticationsAssests/EnableLocationImg.png')}
        style={styles.mapBackground}
        resizeMode="cover"
      />
      
      {/* Animated Popup Card */}
      <Animated.View style={[
        styles.popupContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }
      ]}>
        <View style={styles.card}>
          {/* Location Logo with Blur Background */}
          <View style={styles.logoContainer}>
            <BlurView intensity={20} style={styles.blurBackground} />
            <Animated.View style={[
              styles.iconContainer,
              {
                transform: [{ scale: iconScaleAnim }],
                opacity: iconOpacityAnim,
              }
            ]}>
              <Image
                source={require('../../assets/AuthenticationsAssests/EnableLocationLOGO.png')}
                style={styles.locationLogo}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          
          {/* Instruction Text */}
          <Text style={styles.instructionText}>
            Choose your location to start find the request around you
          </Text>
          
          {/* Buttons Container */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.locationButton} onPress={handleLocationPermission}>
              <Text style={styles.locationButtonText}>Use my location</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBackground: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    top: 0,
    left: 0,
  },
  popupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: screenWidth * 0.85,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: 'rgba(219, 40, 153, 0.3)',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(219, 40, 153, 0.8)',
    borderRadius: 40,
  },
  locationLogo: {
    width: 50,
    height: 50,
  },
  instructionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  locationButton: {
    backgroundColor: '#DB2899',
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    cursor: 'pointer',
  },
  locationButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 10,
    cursor: 'pointer',
  },
  skipButtonText: {
    color: '#888',
    fontSize: 14,
  },
});