import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  Platform,
  PanResponder,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
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

const LocationInput = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('1901 Thornridge Cir. Shiloh, Hawaii 81063');
  const [destinationLocation, setDestinationLocation] = useState('');
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
      name: 'Coffee Shop',
      address: '1234 Main St. Downtown, California 90210',
      distance: '1.2 km',
      icon: 'local-cafe',
    },
    {
      id: 3,
      name: 'Shopping Center',
      address: '5678 Oak Ave. Westside, Texas 75001',
      distance: '3.8 km',
      icon: 'local-mall',
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
    setDestinationLocation(place.address);
    navigation.navigate('LocationRecent');
  };

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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
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

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Input Fields */}
              <View style={styles.inputSection}>
                {/* Current Location Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="location" size={20} color="#DB2899" />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Current location</Text>
                    <TextInput
                      style={styles.textInput}
                      value={currentLocation}
                      onChangeText={setCurrentLocation}
                      placeholder="Enter current location"
                      placeholderTextColor="#999"
                    />
                  </View>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chevron-forward" size={20} color="#DB2899" />
                  </TouchableOpacity>
                </View>

                {/* Destination Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="location-outline" size={20} color="#999" />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Where to?</Text>
                    <TextInput
                      style={styles.textInput}
                      value={destinationLocation}
                      onChangeText={setDestinationLocation}
                      placeholder="Enter destination"
                      placeholderTextColor="#999"
                      autoFocus={true}
                    />
                  </View>
                </View>
              </View>

              {/* Recent Places */}
              <View style={styles.recentSection}>
                <Text style={styles.sectionTitle}>Recent places</Text>
                {recentPlaces.map((place) => (
                  <TouchableOpacity
                    key={place.id}
                    style={styles.placeItem}
                    onPress={() => handlePlaceSelect(place)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.placeIcon}>
                      <MaterialIcons name={place.icon} size={20} color="#DB2899" />
                    </View>
                    <View style={styles.placeInfo}>
                      <Text style={styles.placeName}>{place.name}</Text>
                      <Text style={styles.placeAddress}>{place.address}</Text>
                    </View>
                    <Text style={styles.placeDistance}>{place.distance}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContainer: {
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
    maxHeight: height * 0.7,
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
  inputSection: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  actionButton: {
    padding: 8,
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
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

export default LocationInput;