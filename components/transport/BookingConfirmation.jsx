import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BookingConfirmation = ({ route }) => {
  const navigation = useNavigation();
  const { vehicle, transportType, pickupLocation, dropLocation, paymentMethod, date, time } = route?.params || {};
  
  const [driverName, setDriverName] = useState('');
  
  const indianDriverNames = [
    'Rajesh Kumar',
    'Amit Singh',
    'Suresh Sharma',
    'Vikash Gupta',
    'Ravi Patel',
    'Manoj Yadav',
    'Deepak Verma',
    'Sanjay Joshi',
    'Ashok Mishra',
    'Ramesh Agarwal'
  ];
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * indianDriverNames.length);
    setDriverName(indianDriverNames[randomIndex]);
  }, []);

  const handleConfirmRide = () => {
    navigation.navigate('RideMap', {
      vehicle,
      transportType,
      pickupLocation,
      dropLocation,
      paymentMethod,
      date,
      time
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

      <View style={styles.content}>
        <View style={styles.checkmarkContainer}>
          <View style={styles.checkmarkBadge}>
            <Ionicons name="checkmark" size={40} color="#DB2899" />
          </View>
        </View>

        <Text style={styles.title}>Thank you</Text>
        <Text style={styles.subtitle}>
          Your ride has been booked with{'\n'}
          {driverName}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmRide}>
          <Text style={styles.confirmText}>Confirm Ride</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  checkmarkContainer: {
    marginBottom: 40,
  },
  checkmarkBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#C8A2C8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  confirmButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingConfirmation;