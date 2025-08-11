import React, { useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Dimensions, Alert } from 'react-native';
import LocationPopup from '../shared/LocationPopup';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function EnableLocation({ navigation }) {
  const [showPopup, setShowPopup] = useState(true);

  const handleLocationEnabled = (locationData) => {
    Alert.alert(
      'Success', 
      'Location enabled successfully!', 
      [{ text: 'OK', onPress: () => navigation.navigate('WelcomePage') }]
    );
  };

  const handleSkip = () => {
    navigation.navigate('WelcomePage');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <Image
        source={require('../../assets/AuthenticationsAssests/EnableLocationImg.png')}
        style={styles.mapBackground}
        resizeMode="cover"
      />
      
      <LocationPopup
        visible={showPopup}
        onLocationEnabled={handleLocationEnabled}
        showSkip={true}
        onSkip={handleSkip}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  mapBackground: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    top: 0,
    left: 0,
  },
});