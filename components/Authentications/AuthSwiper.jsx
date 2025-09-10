import React, { useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import CustomSwiper from '../shared/CustomSwiper';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SetPassword from './SetPassword';
import CompleteProfile from './CompleteProfile';

const AuthSwiper = ({ navigation, route }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const navigateToNext = () => {
    if (currentIndex < 3) {
      swiperRef.current?.scrollBy(1);
    }
  };

  const navigateToPrevious = () => {
    if (currentIndex > 0) {
      swiperRef.current?.scrollBy(-1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <CustomSwiper
        ref={swiperRef}
        onIndexChanged={handleIndexChanged}
        showsPagination={false}
        loop={false}
        scrollEnabled={false} // Disable manual scrolling for auth flow
      >
        <SignIn 
          navigation={navigation} 
          route={route}
          onNext={navigateToNext}
        />
        <SignUp 
          navigation={navigation} 
          route={route}
          onNext={navigateToNext}
          onPrevious={navigateToPrevious}
        />
        <SetPassword 
          navigation={navigation} 
          route={route}
          onNext={navigateToNext}
          onPrevious={navigateToPrevious}
        />
        <CompleteProfile 
          navigation={navigation} 
          route={route}
          onPrevious={navigateToPrevious}
        />
      </CustomSwiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default AuthSwiper;