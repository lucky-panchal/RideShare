import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const CustomSwiper = ({ 
  children, 
  showsPagination = true, 
  autoplay = false, 
  loop = false,
  onIndexChanged,
  index = 0,
  scrollEnabled = true,
  showsButtons = false,
  paginationStyle = {},
  dotStyle = {},
  activeDotStyle = {},
  ...props 
}) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsPagination={showsPagination}
      autoplay={autoplay}
      loop={loop}
      onIndexChanged={onIndexChanged}
      index={index}
      scrollEnabled={scrollEnabled}
      showsButtons={showsButtons}
      paginationStyle={[styles.pagination, paginationStyle]}
      dotStyle={[styles.dot, dotStyle]}
      activeDotStyle={[styles.activeDot, activeDotStyle]}
      removeClippedSubviews={false}
      {...props}
    >
      {children}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  pagination: {
    bottom: 50,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#DB2899',
    width: 24,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default CustomSwiper;