import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


const LocationManager = ({ navigation }) => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  const defaultLocations = [
    {
      id: 'home',
      name: 'Home',
      address: 'Current Location',
      icon: 'home',
      type: 'saved',
      coordinates: null
    },
    {
      id: 'work',
      name: 'Work',
      address: 'Office Location',
      icon: 'business',
      type: 'saved',
      coordinates: null
    }
  ];

  const recentLocations = [
    {
      id: 'recent1',
      name: 'Coffee Shop',
      address: 'Coffee Shop',
      icon: 'local-cafe',
      type: 'recent',
      timestamp: Date.now() - 3600000
    },
    {
      id: 'recent2',
      name: 'Shopping Center',
      address: 'Shopping Center',
      icon: 'local-mall',
      type: 'recent',
      timestamp: Date.now() - 7200000
    }
  ];

  useEffect(() => {
    setSavedLocations(defaultLocations);
  }, []);

  useEffect(() => {
    filterLocations();
  }, [searchQuery, savedLocations]);



  const filterLocations = () => {
    if (!searchQuery.trim()) {
      setFilteredLocations([]);
      return;
    }

    const allLocations = [...savedLocations, ...recentLocations];
    const filtered = allLocations.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const saveLocation = (location) => {
    const updatedLocations = [...savedLocations, location];
    setSavedLocations(updatedLocations);
    Alert.alert('Success', 'Location saved successfully!');
  };

  const removeLocation = (locationId) => {
    const updatedLocations = savedLocations.filter(loc => loc.id !== locationId);
    setSavedLocations(updatedLocations);
  };

  const handleLocationSelect = (location) => {
    navigation.navigate('LocationConfirm', { selectedLocation: location });
  };

  const renderLocationItem = (location) => (
    <TouchableOpacity
      key={location.id}
      style={styles.locationItem}
      onPress={() => handleLocationSelect(location)}
    >
      <View style={[styles.locationIcon, location.type === 'saved' && styles.savedIcon]}>
        <MaterialIcons name={location.icon} size={20} color="#DB2899" />
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text style={styles.locationAddress}>{location.address}</Text>
      </View>
      {location.type === 'saved' && location.id !== 'home' && location.id !== 'work' && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeLocation(location.id)}
        >
          <Ionicons name="close" size={16} color="#999" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Locations</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LocationInput')}>
          <Ionicons name="add" size={24} color="#DB2899" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Results */}
        {searchQuery.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {filteredLocations.length > 0 ? (
              filteredLocations.map(renderLocationItem)
            ) : (
              <Text style={styles.noResults}>No locations found</Text>
            )}
          </View>
        )}

        {/* Saved Locations */}
        {searchQuery.length === 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Saved Locations</Text>
              {savedLocations.map(renderLocationItem)}
            </View>

            {/* Recent Locations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Locations</Text>
              {recentLocations.map(renderLocationItem)}
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => navigation.navigate('LocationInput')}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="add-circle" size={20} color="#DB2899" />
                </View>
                <Text style={styles.actionText}>Add New Location</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => navigation.navigate('LocationFavorites')}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="heart" size={20} color="#DB2899" />
                </View>
                <Text style={styles.actionText}>Manage Favorites</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => navigation.navigate('LocationRecent')}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="time" size={20} color="#DB2899" />
                </View>
                <Text style={styles.actionText}>View All Recent</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => navigation.navigate('LocationSearch')}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name="search" size={20} color="#DB2899" />
                </View>
                <Text style={styles.actionText}>Search Locations</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  savedIcon: {
    backgroundColor: '#FCE4EC',
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  removeButton: {
    padding: 8,
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginVertical: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default LocationManager;