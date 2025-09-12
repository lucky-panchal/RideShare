import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WebMap from '../shared/WebMap';

let NativeMapView;
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    NativeMapView = Maps.default;
  } catch (e) {
    console.log('react-native-maps not available');
  }
}


const RideMap = ({ route }) => {
  const navigation = useNavigation();
  const { pickupLocation, dropLocation, selectedVehicle, transportType } = route?.params || {};
  
  const [mapRegion, setMapRegion] = useState({
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  // Mock coordinates for locations
  const getLocationCoordinates = (locationName) => {
    const locationMap = {
      'Current Location': { latitude: 28.6139, longitude: 77.2090 },
      'Office': { latitude: 28.6200, longitude: 77.2100 },
      'Coffee Shop': { latitude: 28.6150, longitude: 77.2080 },
      'Shopping Center': { latitude: 28.6180, longitude: 77.2120 },
    };
    return locationMap[locationName] || { latitude: 28.6139, longitude: 77.2090 };
  };

  useEffect(() => {
    // Calculate center point between pickup and drop locations
    const pickupCoords = getLocationCoordinates(pickupLocation);
    const dropCoords = getLocationCoordinates(dropLocation);
    
    const centerLat = (pickupCoords.latitude + dropCoords.latitude) / 2;
    const centerLng = (pickupCoords.longitude + dropCoords.longitude) / 2;
    
    setMapRegion({
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  }, [pickupLocation, dropLocation]);

  const handleBookRide = () => {
    // Navigate to booking confirmation or driver tracking
    console.log('Ride booked:', { pickupLocation, dropLocation, selectedVehicle });
    // You can navigate to a tracking screen or confirmation screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Map Section */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <WebMap style={styles.map} region={mapRegion} />
        ) : (
          <NativeMapView
            style={styles.map}
            region={mapRegion}
            initialRegion={mapRegion}
            showsUserLocation={true}
            mapType="standard"
          />
        )}
        
        {/* Back Button Overlay */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Bottom Info Card */}
      <View style={styles.bottomCard}>
        {/* Route Info */}
        <View style={styles.routeSection}>
          <View style={styles.routeItem}>
            <Ionicons name="location" size={16} color="#DB2899" />
            <Text style={styles.routeText}>{pickupLocation}</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeItem}>
            <Ionicons name="location-outline" size={16} color="#DB2899" />
            <Text style={styles.routeText}>{dropLocation}</Text>
          </View>
        </View>

        {/* Vehicle Info */}
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleTitle}>Selected Vehicle</Text>
          <Text style={styles.vehicleName}>{selectedVehicle?.name} - {transportType}</Text>
          <Text style={styles.vehiclePrice}>{selectedVehicle?.price}</Text>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
          <Text style={styles.bookButtonText}>Book Ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  routeSection: {
    marginBottom: 20,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  routeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#DB2899',
    marginLeft: 7,
    marginVertical: 5,
  },
  vehicleInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  vehicleTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DB2899',
  },
  bookButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RideMap;