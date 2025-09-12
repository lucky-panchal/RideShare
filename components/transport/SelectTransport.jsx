import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SelectTransport = ({ route }) => {
  const navigation = useNavigation();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const { pickupLocation, dropLocation } = route?.params || {};

  
  const transportOptions = [
    { id: 'car', name: 'Car', icon: 'car', price: '₹120', time: '5 min' },
    { id: 'bike', name: 'Bike', icon: 'bicycle', price: '₹60', time: '3 min' },
    { id: 'scooty', name: 'Activa', icon: 'bicycle', price: '₹80', time: '4 min' },
    { id: 'taxi', name: 'Taxi', icon: 'car-sport', price: '₹200', time: '4 min' },
  ];

  const handleTransportSelect = (transport) => {
    setSelectedTransport(transport);
  };

  const handleConfirmRide = () => {
    if (selectedTransport) {
      navigation.navigate('Vehicle', {
        transportType: selectedTransport.id,
        pickupLocation,
        dropLocation
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>

      {/* Route Info */}
      <View style={styles.routeInfo}>
        <View style={styles.routeItem}>
          <Ionicons name="location" size={16} color="#DB2899" />
          <Text style={styles.routeText}>{pickupLocation || 'Pickup Location'}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeItem}>
          <Ionicons name="location-outline" size={16} color="#DB2899" />
          <Text style={styles.routeText}>{dropLocation || 'Drop Location'}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Select your transport</Text>

      {/* Transport Options */}
      <View style={styles.transportGrid}>
        {transportOptions.map((transport) => (
          <TouchableOpacity
            key={transport.id}
            style={[
              styles.transportCard,
              selectedTransport?.id === transport.id && styles.selectedCard
            ]}
            onPress={() => handleTransportSelect(transport)}
          >
            <View style={styles.transportIcon}>
              <Ionicons 
                name={transport.icon} 
                size={40} 
                color={selectedTransport?.id === transport.id ? '#DB2899' : '#666'} 
              />
            </View>
            <Text style={[
              styles.transportName,
              selectedTransport?.id === transport.id && styles.selectedText
            ]}>
              {transport.name}
            </Text>
            <Text style={styles.transportPrice}>{transport.price}</Text>
            <Text style={styles.transportTime}>{transport.time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirm Button */}
      {selectedTransport && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmRide}>
          <Text style={styles.confirmText}>Confirm Ride</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  routeInfo: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  routeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#DB2899',
    marginLeft: 7,
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  transportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  transportCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#DB2899',
    backgroundColor: '#fdf2f8',
  },
  transportIcon: {
    marginBottom: 10,
  },
  transportName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  selectedText: {
    color: '#DB2899',
  },
  transportPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DB2899',
    marginBottom: 2,
  },
  transportTime: {
    fontSize: 12,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#DB2899',
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SelectTransport;