import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

// Platform-specific imports
let MapView, Marker;
if (Platform.OS === 'web') {
  MapView = require('../shared/WebMap').default;
  Marker = ({ children, ...props }) => children || null;
} else {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import LocationPopup from '../shared/LocationPopup';

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [searchText, setSearchText] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState(null);


  const [activeTab, setActiveTab] = useState('Home');
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (location && mapRef.current && hasLocationPermission) {
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  }, [location, hasLocationPermission]);

  const checkLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setShowLocationPopup(true);
        setHasLocationPermission(false);
        setIsMapLoading(false);
      } else {
        setHasLocationPermission(true);
        getCurrentLocation();
      }
    } catch (error) {
      console.log('Permission error:', error);
      setHasLocationPermission(false);
      setIsMapLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      console.log('Getting current location...');
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        maximumAge: 10000,
        timeout: 15000,
      });
      const { latitude, longitude } = currentLocation.coords;
      
      // Sanitize coordinates before logging
      const sanitizedCoords = {
        lat: parseFloat(latitude.toFixed(6)),
        lng: parseFloat(longitude.toFixed(6))
      };
      console.log('Location obtained:', sanitizedCoords);
      
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      setLocation({ latitude, longitude });
      setMapRegion(newRegion);
    } catch (error) {
      console.log('Location error:', error.code || 'Unknown error');
      
      // Better error handling with specific messages
      let errorMessage = 'Could not get your location';
      if (error.code === 'E_LOCATION_TIMEOUT') {
        errorMessage = 'Location request timed out. Please try again.';
      } else if (error.code === 'E_LOCATION_UNAVAILABLE') {
        errorMessage = 'Location services unavailable. Please check your GPS.';
      } else if (error.code === 'E_LOCATION_SETTINGS_UNSATISFIED') {
        errorMessage = 'Please enable high accuracy location in settings.';
      }
      
      Alert.alert('Location Error', errorMessage, [
        { text: 'Retry', onPress: getCurrentLocation },
        { text: 'Cancel', style: 'cancel' }
      ]);
    }
  };

  const handleLocationEnabled = (locationData) => {
    setHasLocationPermission(true);
    setShowLocationPopup(false);
    getCurrentLocation();
  };

  const onRegionChangeComplete = (region) => {
    setMapRegion(region);
  };

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    // Navigate to respective screens
    if (tabName !== 'Home') {
      navigation.navigate(tabName);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Map Section */}
      <View style={styles.mapContainer}>
        {mapError ? (
          <View style={styles.mapErrorContainer}>
            <Ionicons name="warning" size={50} color="#FF6B6B" />
            <Text style={styles.errorText}>Map Error</Text>
            <Text style={styles.errorSubtext}>{mapError}</Text>

            <TouchableOpacity style={styles.retryButton} onPress={() => {
              setMapError(null);
              setIsMapLoading(true);

              checkLocationPermission();
            }}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : !hasLocationPermission ? (
          <View style={styles.mapPlaceholder}>
            <Ionicons name="location-outline" size={50} color="#999" />
            <Text style={styles.placeholderText}>Location Permission Required</Text>
            <Text style={styles.placeholderSubtext}>Enable location to view map</Text>
          </View>
        ) : isMapLoading ? (
          <View style={styles.mapLoadingContainer}>
            <ActivityIndicator size="large" color="#DB2899" />
            <Text style={styles.loadingText}>Loading map...</Text>
          </View>
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={mapRegion}
            initialRegion={mapRegion}
            onRegionChangeComplete={onRegionChangeComplete}
            onMapReady={() => {
              console.log('✅ Google Maps loaded successfully!');
              setTimeout(() => {
                setIsMapLoading(false);
                setMapError(null);
              }, 100);
            }}
            onError={(error) => {
              console.log('❌ Map error:', error?.message || 'Unknown map error');
              setMapError('Map failed to load. Check your internet connection.');
              setIsMapLoading(false);
            }}
            showsUserLocation={hasLocationPermission}
            showsMyLocationButton={false}
            mapType="standard"
            zoomEnabled={true}
            scrollEnabled={true}
            rotateEnabled={false}
            pitchEnabled={false}
            loadingEnabled={true}
            loadingIndicatorColor="#DB2899"
          >
            {location && (
              <Marker
                coordinate={location}
                title="Your Location"
                pinColor="red"
              />
            )}
            <Marker
              coordinate={{
                latitude: 28.6139,
                longitude: 77.2090,
              }}
              title="Delhi"
              pinColor="blue"
            />
          </MapView>
        )}
      </View>

      {/* Search Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#B0B0B0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where are you going?"
            placeholderTextColor="#B0B0B0"
            value={searchText}
            onChangeText={setSearchText}
            fontSize={16}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={getCurrentLocation}
          disabled={isMapLoading}
        >
          <Ionicons name="location" size={20} color="#fff" />
          <Text style={styles.locationButtonText}>
            {isMapLoading ? 'Loading...' : 'Get My Location'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.debugButton} 
          onPress={() => navigation.navigate('SimpleHome')}
        >
          <Text style={styles.debugButtonText}>Test Simple Map</Text>
        </TouchableOpacity>
      </View>



      {/* Perfect Bottom Navigation */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => handleTabPress('Home')}>
          <Ionicons 
            name="home" 
            size={24} 
            color={activeTab === 'Home' ? '#DB2899' : '#666'} 
          />
          <Text style={[styles.navLabel, activeTab === 'Home' && styles.activeNavLabel]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={() => handleTabPress('Favorites')}>
          <Ionicons 
            name="heart" 
            size={24} 
            color={activeTab === 'Favorites' ? '#DB2899' : '#666'} 
          />
          <Text style={[styles.navLabel, activeTab === 'Favorites' && styles.activeNavLabel]}>Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.centerNavButton} onPress={() => handleTabPress('Wallet')}>
          <View style={styles.walletIcon}>
            <Ionicons name="wallet" size={28} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={() => handleTabPress('Notifications')}>
          <View style={styles.notificationWrapper}>
            <MaterialCommunityIcons 
              name="bell" 
              size={24} 
              color={activeTab === 'Notifications' ? '#DB2899' : '#666'} 
            />
            {hasNotifications && <View style={styles.notificationDot} />}
          </View>
          <Text style={[styles.navLabel, activeTab === 'Notifications' && styles.activeNavLabel]}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={() => handleTabPress('Profile')}>
          <Ionicons 
            name="person" 
            size={24} 
            color={activeTab === 'Profile' ? '#DB2899' : '#666'} 
          />
          <Text style={[styles.navLabel, activeTab === 'Profile' && styles.activeNavLabel]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Location Popup */}
      <LocationPopup
        visible={showLocationPopup}
        onLocationEnabled={handleLocationEnabled}
        showSkip={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mapContainer: {
    flex: 0.7,
    minHeight: 350,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginBottom: 5,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  mapErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 15,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#DB2899',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  // Input Section
  inputSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#DB2899',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  locationButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  debugButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  debugButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Perfect Bottom Navigation
  bottomNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 80,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
    paddingVertical: 8,
  },
  centerNavButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    minHeight: 60,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#DB2899',
    fontWeight: '600',
  },
  walletIcon: {
    backgroundColor: '#DB2899',
    borderRadius: 30,
    padding: 16,
    elevation: 8,
    shadowColor: '#DB2899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    transform: [{ translateY: -8 }],
  },
  notificationWrapper: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DB2899',
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default Home;