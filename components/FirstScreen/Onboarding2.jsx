import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Onboarding2() {
  const navigation = useNavigation();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 66,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Image
        source={require('../../assets/Onboardings/Onboarding2.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.paragraph}>
          Track your ride in real-time.{"\n"}Share trips with friends.{"\n"}<Text style={styles.brandName}>Verified drivers</Text> and 24/7 support.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Svg width="80" height="80" style={styles.progressRing}>
          <Circle
            cx="40"
            cy="40"
            r="35"
            stroke="#F3F4F6"
            strokeWidth="4"
            fill="none"
          />
          <AnimatedCircle
            cx="40"
            cy="40"
            r="35"
            stroke="#EA4C89"
            strokeWidth="4"
            fill="none"
            strokeDasharray={2 * Math.PI * 35}
            strokeDashoffset={progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: [2 * Math.PI * 35, 2 * Math.PI * 35 * (1 - 0.66)],
            })}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </Svg>
        <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity 
            style={styles.buttonInner}
            onPress={() => navigation.navigate('Onboarding3')}
          >
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 100,
  },
  buttonContainer: {
    position: 'absolute',
    top: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    position: 'absolute',
  },
  button: {
    position: 'absolute',
  },
  buttonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EA4C89',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 30,
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  paragraph: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: 280,
    height: 57,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  arrow: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: 'bold',
  },
});