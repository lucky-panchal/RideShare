import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  PanResponder,
  Animated,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import WebMap from '../shared/WebMap';

// Conditional imports for maps
let NativeMapView;
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    NativeMapView = Maps.default;
  } catch (e) {
    console.log('react-native-maps not available');
  }
}

const { width, height } = Dimensions.get('window');

const LocationRecent = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const translateY = useRef(new Animated.Value(0)).current;

  const mapRegion = {
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const recentPlaces = [
    {
      id: 1,
      name: 'Office',
      address: '2464 Royal Ln. Mesa, New Jersey 45463',
      distance: '2.5 km',
      icon: 'business',
    },
    {
      id: 2,
      name: 'Coffee shop',
      address: '1234 Brew St. Downtown, California 90210',
      distance: '1.2 km',
      icon: 'local-cafe',
    },
    {
      id: 3,
      name: 'Shopping center',
      address: '5678 Oak Ave. Westside, Texas 75001',
      distance: '3.8 km',
      icon: 'local-mall',
    },
    {
      id: 4,
      name: 'Shopping mall',
      address: '9012 Pine Blvd. Eastside, Florida 33101',
      distance: '4.2 km',
      icon: 'local-mall',
    },
    {
      id: 5,
      name: 'Restaurant',
      address: '3456 Elm St. Midtown, New York 10001',
      distance: '2.8 km',
      icon: 'restaurant',
    },
    {
      id: 6,
      name: 'Gym',
      address: '7890 Maple Dr. Uptown, Illinois 60601',
      distance: '1.9 km',
      icon: 'fitness-center',
    },
    {
      id: 7,
      name: 'Hospital',
      address: '2468 Cedar Ln. Southside, Georgia 30301',
      distance: '5.1 km',
      icon: 'local-hospital',
    },
    {
      id: 8,
      name: 'Park',
      address: '1357 Birch Ave. Northside, Oregon 97201',
      distance: '3.3 km',
      icon: 'park',
    },
  ];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dy) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        closeModal();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const handlePlaceSelect = (place) => {
    // Handle place selection logic here
    console.log('Selected place:', place.name);
    navigation.navigate('LocationConfirm');
  };

  const renderPlaceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={() => handlePlaceSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.placeIcon}>
        <MaterialIcons name={item.icon} size={20} color="#DB2899" />
      </View>
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeAddress}>{item.address}</Text>
      </View>
      <Text style={styles.placeDistance}>{item.distance}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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
      </View>

      {/* Bottom Modal */}
      {modalVisible && (
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Drag Bar */}
          <View style={styles.dragBar} />

          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select address</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Route Fields */}
          <View style={styles.routeSection}>
            {/* From Field */}
            <View style={styles.routeField}>
              <View style={styles.routeIcon}>
                <Ionicons name="location" size={20} color="#DB2899" />
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeLabel}>From</Text>
                <Text style={styles.routeAddress}>
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </Text>
              </View>
            </View>

            {/* To Field */}
            <View style={styles.routeField}>
              <View style={styles.routeIcon}>
                <Ionicons name="location-outline" size={20} color="#999" />
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeLabel}>To</Text>
                <Text style={styles.routeAddress}>
                  Select destination
                </Text>
              </View>
            </View>
          </View>

          {/* Recent Places */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent places</Text>
            <FlatList
              data={recentPlaces}
              renderItem={renderPlaceItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.placesList}
            />
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    height: height * 0.75,
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  routeSection: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  routeField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  routeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  routeAddress: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  recentSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  placesList: {
    flex: 1,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  placeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  placeDistance: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
});

export default LocationRecent;