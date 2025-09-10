import React, { useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomSwiper from '../shared/CustomSwiper';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import Onboarding3 from './Onboarding3';

const OnboardingSwiper = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < 2) {
      swiperRef.current?.scrollBy(1);
    } else {
      navigation.navigate('EnableLocation');
    }
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <CustomSwiper
        ref={swiperRef}
        onIndexChanged={handleIndexChanged}
        showsPagination={true}
        loop={false}
        scrollEnabled={false}
        index={0}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        <Onboarding1 onNext={handleNext} />
        <Onboarding2 onNext={handleNext} />
        <Onboarding3 onNext={handleNext} />
      </CustomSwiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  pagination: {
    bottom: 160,
  },
  dot: {
    backgroundColor: '#F3F4F6',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#DB2899',
    width: 24,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default OnboardingSwiper;