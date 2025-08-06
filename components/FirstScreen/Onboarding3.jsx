import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity, Text, Animated, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';

const { height: screenHeight } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Onboarding3() {
  const navigation = useNavigation();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('EnableLocation');
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.content}>
        <Image
          source={require('../../assets/Onboardings/Onboarding3.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>
            Multiple ride options available.{"\n"}Economy, premium, or shared.{"\n"}<Text style={styles.brandName}>Book now</Text> for seamless travel!
          </Text>
        </View>
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
            stroke="#DB2899"
            strokeWidth="4"
            fill="none"
            strokeDasharray={2 * Math.PI * 35}
            strokeDashoffset={progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: [2 * Math.PI * 35, 0],
            })}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </Svg>
        <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity 
            style={styles.buttonInner}
            onPress={handlePress}
          >
            <Text style={styles.arrow}>Go</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  paragraph: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  buttonContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenHeight * 0.05,
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
    backgroundColor: '#DB2899',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  arrow: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: 'bold',
  },
});