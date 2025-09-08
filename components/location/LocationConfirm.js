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

const LocationConfirm = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const translateY = useRef(new Animated.Value(0)).current;

  const mapRegion = {
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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

  const handleConfirmLocation = () => {
    navigation.navigate('LocationInput');
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

          {/* Location Options */}
          <View style={styles.locationList}>
            {/* Current Location */}
            <TouchableOpacity style={styles.locationItem}>
              <View style={styles.locationIcon}>
                <Ionicons name="location" size={20} color="#DB2899" />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationTitle}>Current location</Text>
                <Text style={styles.locationAddress}>
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </Text>
              </View>
            </TouchableOpacity>

            {/* Office Location */}
            <TouchableOpacity style={styles.locationItem}>
              <View style={[styles.locationIcon, styles.officeIcon]}>
                <MaterialIcons name="business" size={20} color="#DB2899" />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationTitle}>Office</Text>
                <Text style={styles.locationAddress}>
                  2464 Royal Ln. Mesa, New Jersey 45463
                </Text>
              </View>
              <Text style={styles.distance}>2.5 km</Text>
            </TouchableOpacity>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmLocation}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>Confirm Location</Text>
          </TouchableOpacity>
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
    minHeight: height * 0.4,
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
  locationList: {
    marginBottom: 24,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  officeIcon: {
    backgroundColor: '#FCE4EC',
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  distance: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LocationConfirm;