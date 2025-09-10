import React, { useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import CustomSwiper from '../shared/CustomSwiper';
import SwiperNavigation from '../shared/SwiperNavigation';
import Home from './Home';
import Favorites from './Favorites';
import Wallet from './Wallet';
import Notifications from './Notifications';
import Profile from './Profile';

const MainHomeContainer = ({ navigation, route }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNotifications, setHasNotifications] = useState(true);
  const swiperRef = useRef(null);

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const handleTabPress = (index, tabName) => {
    setCurrentIndex(index);
    if (swiperRef.current) {
      swiperRef.current.scrollTo(index, true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.swiperContainer}>
        <CustomSwiper
          ref={swiperRef}
          onIndexChanged={handleIndexChanged}
          showsPagination={false}
          loop={false}
          scrollEnabled={true}
          index={currentIndex}
        >
          <Home navigation={navigation} route={route} />
          <Favorites navigation={navigation} route={route} />
          <Wallet navigation={navigation} route={route} />
          <Notifications navigation={navigation} route={route} />
          <Profile navigation={navigation} route={route} />
        </CustomSwiper>
      </View>
      
      <SwiperNavigation
        activeTab={currentIndex}
        onTabPress={handleTabPress}
        hasNotifications={hasNotifications}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  swiperContainer: {
    flex: 1,
    marginBottom: 80, // Space for bottom navigation
  },
});

export default MainHomeContainer;