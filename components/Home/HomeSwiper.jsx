import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import CustomSwiper from '../shared/CustomSwiper';
import Home from './Home';
import Favorites from './Favorites';
import Wallet from './Wallet';
import Notifications from './Notifications';
import Profile from './Profile';

const HomeSwiper = ({ navigation, route }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <CustomSwiper
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default HomeSwiper;