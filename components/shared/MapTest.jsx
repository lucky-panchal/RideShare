import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

// Platform-specific imports
let MapView;
if (Platform.OS === 'web') {
  MapView = require('./WebMap').default;
} else {
  MapView = require('react-native-maps').default;
}

const { width, height } = Dimensions.get('window');

const MapTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map Test</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.2090,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onMapReady={() => console.log('✅ Test Map Ready')}
        onError={(error) => console.log('❌ Test Map Error:', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  map: {
    width: width,
    height: height - 100,
  },
});

export default MapTest;