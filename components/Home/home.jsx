import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import WebMap from '../shared/WebMap';

// Conditional imports
let NativeMapView, NativeMarker;
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    NativeMapView = Maps.default;
    NativeMarker = Maps.Marker;
  } catch (e) {
    console.log('react-native-maps not available');
  }
}
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import LocationPopup from '../shared/LocationPopup';
import QuickSearch from '../location/QuickSearch';

const Home = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [pickupLocation, setPickupLocation] = useState('Current Location');
  const [dropLocation, setDropLocation] = useState('');
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [searchType, setSearchType] = useState('pickup');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState(null);


  const [activeTab, setActiveTab] = useState('Home');
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [hasAskedPermission, setHasAskedPermission] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    checkInitialPermission();
  }, []);

  useEffect(() => {
    if (!mapRegion && location) {
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setMapRegion(newRegion);
    }
  }, [location]);

  useEffect(() => {
    // Handle location selection from search
    if (route.params?.selectedLocation) {
      const { selectedLocation, locationType } = route.params;
      
      if (locationType === 'pickup') {
        setPickupLocation(selectedLocation.name || selectedLocation.address);
      } else if (locationType === 'drop') {
        setDropLocation(selectedLocation.name || selectedLocation.address);
      }
      
      // Clear the params to prevent re-triggering
      navigation.setParams({ selectedLocation: null, locationType: null });
    }
  }, [route.params]);

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

  const checkInitialPermission = async () => {
    try {
      // Only check existing permission, don't request
      let { status } = await Location.getForegroundPermissionsAsync();
      
      if (status === 'granted') {
        console.log('✅ Location permission already granted');
        setHasLocationPermission(true);
        setHasAskedPermission(true);
        // Don't auto-get location, wait for user tap
        setIsMapLoading(false);
      } else if (!hasAskedPermission) {
        // Ask permission only once on first launch
        console.log('🔐 Requesting location permission...');
        const result = await Location.requestForegroundPermissionsAsync();
        setHasAskedPermission(true);
        
        if (result.status === 'granted') {
          setHasLocationPermission(true);
          console.log('✅ Permission granted');
        } else {
          console.log('❌ Permission denied');
          setShowLocationPopup(true);
        }
        setIsMapLoading(false);
      } else {
        setIsMapLoading(false);
      }
    } catch (error) {
      console.log('Permission error:', error);
      setIsMapLoading(false);
    }
  };

  const getRealTimeLocation = async () => {
    try {
      console.log('🌍 Getting real-time location...');
      
      // Primary: ipapi.co - more accurate, real-time IP geolocation
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.latitude && data.longitude && !data.error) {
        console.log('✅ Real-time location:', {
          lat: data.latitude,
          lng: data.longitude,
          city: data.city,
          region: data.region,
          country: data.country_name,
          accuracy: 'City-level'
        });
        
        return {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          city: data.city,
          state: data.region,
          country: data.country_name,
          accuracy: 'high'
        };
      }
    } catch (error) {
      console.log('Primary API failed, trying backup...');
    }
    
    // Backup: ip-api.com - free, no key required
    try {
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json();
      
      if (data.status === 'success' && data.lat && data.lon) {
        console.log('✅ Backup location:', {
          lat: data.lat,
          lng: data.lon,
          city: data.city,
          region: data.regionName,
          country: data.country
        });
        
        return {
          latitude: parseFloat(data.lat),
          longitude: parseFloat(data.lon),
          city: data.city,
          state: data.regionName,
          country: data.country,
          accuracy: 'medium'
        };
      }
    } catch (backupError) {
      console.log('Backup API also failed');
    }
    
    // Final fallback: Default location (Delhi, India)
    console.log('🏙️ Using default location (Delhi)');
    return {
      latitude: 28.6139,
      longitude: 77.2090,
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      accuracy: 'default'
    };
  };

  const getCurrentLocation = async () => {
    setIsMapLoading(true);
    
    try {
      console.log('🔍 Getting location...');
      
      // Use real-time IP geolocation API
      const locationData = await getRealTimeLocation();
      
      if (locationData) {
        const newRegion = {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        
        setLocation({ 
          latitude: locationData.latitude, 
          longitude: locationData.longitude 
        });
        setMapRegion(newRegion);
        
        // Create readable location name
        let locationName = 'Current Location';
        if (locationData.city && locationData.state) {
          locationName = `${locationData.city}, ${locationData.state}`;
        } else if (locationData.city) {
          locationName = `${locationData.city}, ${locationData.country}`;
        } else if (locationData.country) {
          locationName = locationData.country;
        }
        
        setPickupLocation(locationName);
        setIsMapLoading(false);
        
        console.log('✅ Location set:', locationName);
        return;
      }
      
      // Fallback
      setPickupLocation('Current Location');
      setIsMapLoading(false);
      
    } catch (error) {
      console.log('❌ Location failed:', error.message);
      setIsMapLoading(false);
      setPickupLocation('Current Location');
    }
  };

  const handleLocationEnabled = (locationData) => {
    setHasLocationPermission(true);
    setShowLocationPopup(false);
    // Don't auto-get location, wait for user tap
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
        ) : Platform.OS === 'web' ? (
          <WebMap
            style={styles.map}
            region={mapRegion}
          />
        ) : mapRegion ? (
          <NativeMapView
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
                <NativeMarker
                  coordinate={location}
                  title="Your Location"
                  pinColor="red"
                />
              )}

            </NativeMapView>
        ) : (
          <View style={styles.mapPlaceholder}>
            <Ionicons name="location-outline" size={50} color="#999" />
            <Text style={styles.placeholderText}>Tap current location to view map</Text>
            <Text style={styles.placeholderSubtext}>Location permission granted</Text>
          </View>
        )}
      </View>

      {/* Location Input Section */}
      <View style={styles.inputSection}>
        {/* Pickup Location */}
        <View style={styles.locationInputContainer}>
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={20} color="#4CAF50" />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Pickup Location</Text>
            <Text style={styles.locationText} numberOfLines={1}>{pickupLocation}</Text>
          </View>
          <View style={styles.pickupOptions}>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={getCurrentLocation}
            >
              <Ionicons name="locate" size={16} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => {
                setSearchType('pickup');
                setShowQuickSearch(true);
              }}
            >
              <Ionicons name="search" size={16} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Drop Location */}
        <TouchableOpacity 
          style={styles.locationInputContainer}
          onPress={() => {
            setSearchType('drop');
            setShowQuickSearch(true);
          }}
        >
          <View style={styles.locationIcon}>
            <Ionicons name="location-outline" size={20} color="#DB2899" />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Drop Location</Text>
            <Text style={[styles.locationText, !dropLocation && styles.placeholderText]} numberOfLines={1}>
              {dropLocation || 'Where to?'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Book Ride Button */}
        {dropLocation && (
          <TouchableOpacity style={styles.bookRideButton}>
            <Text style={styles.bookRideText}>Book Ride</Text>
          </TouchableOpacity>
        )}
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

      {/* Quick Search Modal */}
      <QuickSearch
        visible={showQuickSearch}
        onClose={() => setShowQuickSearch(false)}
        locationType={searchType}
        onLocationSelect={async (location) => {
          if (location.type === 'current') {
            await getCurrentLocation();
          } else {
            if (searchType === 'pickup') {
              setPickupLocation(location.name);
            } else {
              setDropLocation(location.name);
            }
          }
        }}
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#999',
    fontWeight: '400',
  },
  pickupOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f8f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  bookRideButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  bookRideText: {
    color: '#fff',
    fontSize: 16,
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