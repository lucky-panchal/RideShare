import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import LocationPopup from '../shared/LocationPopup';

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [searchText, setSearchText] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [activeService, setActiveService] = useState('Transport');
  const [activeTab, setActiveTab] = useState('Home');
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        setHasLocationPermission(true);
        getCurrentLocation();
      } else {
        setHasLocationPermission(false);
        setShowLocationPopup(true);
        setIsMapLoading(false);
      }
    } catch (error) {
      console.log('Error checking permission:', error);
      setShowLocationPopup(true);
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
      setIsMapLoading(false);
      
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 500);
      }
    } catch (error) {
      console.log('Error getting location:', error);
      setIsMapLoading(false);
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

  const handleServiceToggle = (service) => {
    setActiveService(service);
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
        {!hasLocationPermission ? (
          <View style={styles.mapPlaceholder}>
            <Text style={styles.placeholderText}>Map requires location permission</Text>
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
            onRegionChangeComplete={onRegionChangeComplete}
            onMapReady={() => {
              console.log('Map ready');
              setIsMapLoading(false);
            }}
            onError={(error) => console.log('Map error:', error)}
            showsUserLocation={hasLocationPermission}
            showsMyLocationButton={false}
            showsCompass={false}
            rotateEnabled={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={false}
            mapType="standard"
            loadingEnabled={false}
            moveOnMarkerPress={false}
          >
            {location && (
              <>
                <Marker
                  coordinate={location}
                  title="Your Location"
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
        {/* Service Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, activeService === 'Delivery' && styles.activeToggle]}
            onPress={() => handleServiceToggle('Delivery')}
          >
            <Text style={[styles.toggleText, activeService === 'Delivery' && styles.activeToggleText]}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, activeService === 'Transport' && styles.activeToggle]}
            onPress={() => handleServiceToggle('Transport')}
          >
            <Text style={[styles.toggleText, activeService === 'Transport' && styles.activeToggleText]}>Transport</Text>
          </TouchableOpacity>
        </View>
        
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
          
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="options" size={20} color="#DB2899" />
          </TouchableOpacity>
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
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 0.6,
    minHeight: 300,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  serviceSection: {
    flex: 0.3,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeToggle: {
    backgroundColor: '#DB2899',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeToggleText: {
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DB2899',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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