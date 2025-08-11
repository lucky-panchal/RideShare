import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Animated, Dimensions, Alert, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Location from 'expo-location';

const { width: screenWidth } = Dimensions.get('window');

export default function LocationPopup({ visible, onLocationEnabled, showSkip = false, onSkip }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.3)).current;
  const iconOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
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
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
      iconScaleAnim.setValue(0.3);
      iconOpacityAnim.setValue(0);
    }
  }, [visible]);

  const handleLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        onLocationEnabled(location);
      } else {
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get location permission.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <Animated.View style={[
          styles.popupContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }
        ]}>
          <View style={styles.card}>
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
            
            <Text style={styles.instructionText}>
              Choose your location to start find the request around you
            </Text>
            
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.locationButton} onPress={handleLocationPermission}>
                <Text style={styles.locationButtonText}>Use my location</Text>
              </TouchableOpacity>
              
              {showSkip && (
                <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
                  <Text style={styles.skipButtonText}>Skip for now</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  locationButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipButtonText: {
    color: '#888',
    fontSize: 14,
  },
});