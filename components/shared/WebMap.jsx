import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WebMap = ({ style, region, children, ...props }) => {
  return (
    <View style={[styles.webMapContainer, style]}>
      <Text style={styles.webMapText}>Map View</Text>
      <Text style={styles.webMapSubtext}>
        Lat: {region?.latitude?.toFixed(4)}, Lng: {region?.longitude?.toFixed(4)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webMapContainer: {
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  webMapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5a2d',
  },
  webMapSubtext: {
    fontSize: 14,
    color: '#5a7a5a',
    marginTop: 5,
  },
});

export default WebMap;