import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AvailableVehicle = ({ route }) => {
  const navigation = useNavigation();
  const { transportType, pickupLocation, dropLocation } = route?.params || {};

  const vehicleData = {
    car: [
      { id: 1, name: 'Alto', type: 'Automatic | 3 seats | Octane', price: '₹120', image: require('../../assets/Vehicles/Alto_car.png') },
      { id: 2, name: 'Swift', type: 'Automatic | 4 seats | Octane', price: '₹150', image: require('../../assets/Vehicles/Swift_Car.png') },
      { id: 3, name: 'Fortuner', type: 'Automatic | 7 seats | Diesel', price: '₹300', image: require('../../assets/Vehicles/Fortuner_Car.png') },
      { id: 4, name: 'Alto', type: 'Automatic | 3 seats | Octane', price: '₹120', image: require('../../assets/Vehicles/Alto_car.png') },
      { id: 5, name: 'Swift', type: 'Automatic | 4 seats | Octane', price: '₹150', image: require('../../assets/Vehicles/Swift_Car.png') },
    ],
    bike: [
      { id: 1, name: 'Sport Bike', type: 'Manual | 2 seats | Petrol', price: '₹60', image: require('../../assets/Vehicles/Bike1_img.png') },
      { id: 2, name: 'Classic Bike', type: 'Manual | 2 seats | Petrol', price: '₹65', image: require('../../assets/Vehicles/Bike2_img.png') },
      { id: 3, name: 'Racing Bike', type: 'Manual | 2 seats | Petrol', price: '₹70', image: require('../../assets/Vehicles/Bike3_img.png') },
      { id: 4, name: 'Cruiser Bike', type: 'Manual | 2 seats | Petrol', price: '₹75', image: require('../../assets/Vehicles/Bike4_img.png') },
      { id: 5, name: 'Sport Bike', type: 'Manual | 2 seats | Petrol', price: '₹60', image: require('../../assets/Vehicles/Bike1_img.png') },
    ],
    scooty: [
      { id: 1, name: 'Activa 125', type: 'Automatic | 2 seats | Petrol', price: '₹80', image: require('../../assets/Vehicles/Activa1_img.png') },
      { id: 2, name: 'Activa 6G', type: 'Automatic | 2 seats | Petrol', price: '₹85', image: require('../../assets/Vehicles/Activa2_img.png') },
      { id: 3, name: 'Activa 125', type: 'Automatic | 2 seats | Petrol', price: '₹80', image: require('../../assets/Vehicles/Activa1_img.png') },
      { id: 4, name: 'Activa 6G', type: 'Automatic | 2 seats | Petrol', price: '₹85', image: require('../../assets/Vehicles/Activa2_img.png') },
    ],
    taxi: [
      { id: 1, name: 'Premium Taxi', type: 'Automatic | 4 seats | Diesel', price: '₹200', image: require('../../assets/Vehicles/Taxi_img.png') },
      { id: 2, name: 'Luxury Taxi', type: 'Automatic | 4 seats | Diesel', price: '₹250', image: require('../../assets/Vehicles/Taxi_img.png') },
      { id: 3, name: 'Premium Taxi', type: 'Automatic | 4 seats | Diesel', price: '₹200', image: require('../../assets/Vehicles/Taxi_img.png') },
    ],
  };

  const vehicles = vehicleData[transportType] || [];
  const transportName = transportType?.charAt(0).toUpperCase() + transportType?.slice(1);

  const handleBookLater = (vehicle) => {
    console.log('Book later:', vehicle);
  };

  const handleRideNow = (vehicle) => {
    navigation.navigate('RideMap', {
      vehicle,
      transportType,
      pickupLocation,
      dropLocation
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Available {transportName}s for ride</Text>
      <Text style={styles.subtitle}>{vehicles.length} {transportName}s found</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <Text style={styles.vehicleType}>{vehicle.type}</Text>
              <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
            </View>
            <Image source={vehicle.image} style={styles.vehicleImage} resizeMode="contain" />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.bookLaterButton} 
                onPress={() => handleBookLater(vehicle)}
              >
                <Text style={styles.bookLaterText}>Book later</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.rideNowButton} 
                onPress={() => handleRideNow(vehicle)}
              >
                <Text style={styles.rideNowText}>Ride Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  vehicleCard: {
    backgroundColor: '#e8f5e8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#d0e7d0',
  },
  vehicleInfo: {
    marginBottom: 15,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DB2899',
  },
  vehicleImage: {
    width: 120,
    height: 80,
    alignSelf: 'flex-end',
    marginTop: -80,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  bookLaterButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#DB2899',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookLaterText: {
    color: '#DB2899',
    fontSize: 16,
    fontWeight: '600',
  },
  rideNowButton: {
    flex: 1,
    backgroundColor: '#DB2899',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  rideNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AvailableVehicle;