import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
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

  const checkLocationPermission = async () => {
    try {
      console.log('Checking location permissions...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        console.log('Location permission granted');
        setHasLocationPermission(true);
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
        setHasLocationPermission(false);
        setIsMapLoading(false);
        setShowLocationPopup(true);
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
      setMapError('Failed to request location permission');
      setIsMapLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      console.log('Getting current location...');
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        maximumAge: 10000,
      });
      const { latitude, longitude } = currentLocation.coords;
      console.log('Location obtained:', { latitude, longitude });
      
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      setLocation({ latitude, longitude });
      setMapRegion(newRegion);
      
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      }, 500);
    } catch (error) {
      console.log('Error getting location:', error);
      Alert.alert('Error', 'Could not get your location');
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
    <View style={styles.container}>
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
            style={StyleSheet.absoluteFillObject}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            initialRegion={mapRegion}
            region={location ? {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            } : mapRegion}
            onMapReady={() => {
              console.log('✅ Map ready and loaded successfully');
              setIsMapLoading(false);
            }}
            onError={(error) => {
              console.log('❌ Map error:', error);
              setMapError('Failed to load map. Check your internet connection.');
              setIsMapLoading(false);
            }}
            showsUserLocation={hasLocationPermission && !!location}
            showsMyLocationButton={false}
            showsCompass={true}
            rotateEnabled={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            mapType="standard"
            loadingEnabled={true}
            loadingBackgroundColor="#f8f9fa"
            loadingIndicatorColor="#DB2899"
            moveOnMarkerPress={false}
            onRegionChangeComplete={onRegionChangeComplete}
          >
            {location && (
              <>
                <Marker
                  coordinate={location}
                  title="Your Location"
                  description="Current position"
                  pinColor="#DB2899"
                />
                <Circle
                  center={location}
                  radius={500}
                  strokeColor="#DB2899"
                  fillColor="rgba(219, 40, 153, 0.2)"
                  strokeWidth={2}
                />
              </>
            )}
          </MapView>
        )}
      </View>

      {/* Service Section */}
      <View style={styles.serviceSection}>
        {/* Search Container */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Where are you going?"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      </View>

      {/* Bottom Navigation - 5 Icons */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Home')}>
          <Ionicons 
            name="home" 
            size={24} 
            color={activeTab === 'Home' ? '#DB2899' : '#666'} 
          />
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Favorites')}>
          <Ionicons 
            name="heart" 
            size={24} 
            color={activeTab === 'Favorites' ? '#DB2899' : '#666'} 
          />
          <Text style={[styles.navText, activeTab === 'Favorites' && styles.activeNavText]}>Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.walletNavItem]} onPress={() => handleTabPress('Wallet')}>
          <View style={styles.walletButton}>
            <Ionicons name="wallet" size={28} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Notifications')}>
          <View style={styles.notificationContainer}>
            <MaterialCommunityIcons 
              name="bell" 
              size={24} 
              color={activeTab === 'Notifications' ? '#DB2899' : '#666'} 
            />
            {hasNotifications && <View style={styles.notificationBadge} />}
          </View>
          <Text style={[styles.navText, activeTab === 'Notifications' && styles.activeNavText]}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Profile')}>
          <Ionicons 
            name="person" 
            size={24} 
            color={activeTab === 'Profile' ? '#DB2899' : '#666'} 
          />
          <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Location Popup */}
      <LocationPopup
        visible={showLocationPopup}
        onLocationEnabled={handleLocationEnabled}
        showSkip={false}
      />
    </View>
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
    flex: 1,
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
  serviceSection: {
    flex: 0.3,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  searchContainer: {
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  searchIcon: {
    marginRight: 12,
    color: '#6c757d',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#DB2899',
    fontWeight: '600',
  },
  walletNavItem: {
    position: 'relative',
  },
  walletButton: {
    backgroundColor: '#DB2899',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
    shadowColor: '#DB2899',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    position: 'absolute',
    top: -35,
    left: '50%',
    transform: [{ translateX: -30 }],
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DB2899',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Home;