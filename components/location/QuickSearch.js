import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const QuickSearch = ({ visible, onClose, onLocationSelect, locationType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  const nearbyPlaces = [
    { id: 'n1', name: 'Starbucks Coffee', address: '0.2 km away', icon: 'local-cafe', distance: '0.2 km' },
    { id: 'n2', name: 'McDonald\'s', address: '0.5 km away', icon: 'restaurant', distance: '0.5 km' },
    { id: 'n3', name: 'City Mall', address: '0.8 km away', icon: 'local-mall', distance: '0.8 km' },
    { id: 'n4', name: 'Metro Station', address: '1.2 km away', icon: 'train', distance: '1.2 km' },
    { id: 'n5', name: 'Hospital', address: '1.5 km away', icon: 'local-hospital', distance: '1.5 km' },
    { id: 'n6', name: 'Gas Station', address: '0.3 km away', icon: 'local-gas-station', distance: '0.3 km' },
  ];

  const recentLocations = [
    { id: 'r1', name: 'Home', address: 'Saved location', icon: 'home', type: 'recent' },
    { id: 'r2', name: 'Office', address: 'Work location', icon: 'business', type: 'recent' },
    { id: 'r3', name: 'Airport Terminal 1', address: 'Recent trip', icon: 'flight', type: 'recent' },
    { id: 'r4', name: 'Central Park', address: 'Last visited', icon: 'park', type: 'recent' },
  ];

  useEffect(() => {
    if (visible && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [visible]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Filter from both nearby places and recent locations
      const allPlaces = [...nearbyPlaces, ...recentLocations];
      const filtered = allPlaces.filter(
        result =>
          result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const typedResult = {
        id: 'typed',
        name: searchQuery,
        address: `Search for "${searchQuery}"`,
        icon: 'search'
      };
      
      setSearchResults([typedResult, ...filtered]);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleLocationSelect = (location) => {
    onLocationSelect(location);
    setSearchQuery('');
    onClose();
  };

  const renderResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleLocationSelect(item)}
    >
      <View style={styles.resultIcon}>
        <MaterialIcons name={item.icon} size={20} color="#DB2899" />
      </View>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {locationType === 'pickup' ? 'Pickup Location' : 'Drop Location'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Type to search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            autoFocus={true}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {locationType === 'pickup' && (
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={() => handleLocationSelect({ name: 'Current Location', type: 'current' })}
          >
            <View style={styles.currentLocationIcon}>
              <Ionicons name="locate" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.currentLocationText}>Use Current Location</Text>
          </TouchableOpacity>
        )}

        {searchQuery.length > 0 ? (
          <FlatList
            data={searchResults}
            renderItem={renderResult}
            keyExtractor={(item) => item.id}
            style={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.defaultContent}>
            {/* Nearby Places */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nearby Places</Text>
              {nearbyPlaces.slice(0, 4).map((place) => (
                <TouchableOpacity
                  key={place.id}
                  style={styles.resultItem}
                  onPress={() => handleLocationSelect(place)}
                >
                  <View style={styles.resultIcon}>
                    <MaterialIcons name={place.icon} size={20} color="#DB2899" />
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName}>{place.name}</Text>
                    <Text style={styles.resultAddress}>{place.address}</Text>
                  </View>
                  <Text style={styles.distanceText}>{place.distance}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Recent Locations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Locations</Text>
              {recentLocations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  style={styles.resultItem}
                  onPress={() => handleLocationSelect(location)}
                >
                  <View style={[styles.resultIcon, styles.recentIcon]}>
                    <MaterialIcons name={location.icon} size={20} color="#666" />
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName}>{location.name}</Text>
                    <Text style={styles.resultAddress}>{location.address}</Text>
                  </View>
                  <Ionicons name="time" size={16} color="#999" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
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
  placeholder: {
    width: 24,
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
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  currentLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  resultAddress: {
    fontSize: 14,
    color: '#666',
  },
  defaultContent: {
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
  recentIcon: {
    backgroundColor: '#f8f8f8',
  },
  distanceText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default QuickSearch;