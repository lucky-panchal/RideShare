import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

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
  const mapRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      console.log('Requesting location permission...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to show your position on the map');
        return;
      }

      console.log('Permission granted, getting location...');
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
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
      
      // Animate to user location smoothly
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    } catch (error) {
      console.log('Error getting location:', error);
      setIsMapLoading(false);
      Alert.alert('Error', 'Could not get your location');
    }
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
        {isMapLoading && (
          <View style={styles.mapLoadingContainer}>
            <View style={styles.mapSkeleton}>
              <ActivityIndicator size="large" color="#DB2899" />
              <Text style={styles.loadingText}>Loading map...</Text>
            </View>
          </View>
        )}
        <MapView
          ref={mapRef}
          style={[styles.map, isMapLoading && styles.hiddenMap]}
          region={mapRegion}
          onRegionChangeComplete={onRegionChangeComplete}
          onMapReady={() => setIsMapLoading(false)}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          mapType="standard"
          loadingEnabled={true}
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
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Wallet')}>
          <View style={styles.walletButton}>
            <Ionicons name="wallet" size={28} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Settings')}>
          <MaterialIcons 
            name="settings" 
            size={24} 
            color={activeTab === 'Settings' ? '#DB2899' : '#666'} 
          />
          <Text style={[styles.navText, activeTab === 'Settings' && styles.activeNavText]}>Settings</Text>
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
      </View>
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
  },
  mapLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    zIndex: 1,
  },
  mapSkeleton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  hiddenMap: {
    opacity: 0,
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
  walletButton: {
    backgroundColor: '#DB2899',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
    shadowColor: '#DB2899',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    transform: [{ scale: 1.1 }],
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