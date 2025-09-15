import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AvailableVehicle = ({ route }) => {
  const navigation = useNavigation();
  const { transportType, pickupLocation, dropLocation } = route?.params || {};

  const vehicleData = {
    car: [
      { 
        id: 1, 
        name: 'Maruti Suzuki Alto', 
        type: 'Manual | 4 seats | Petrol | AC | GPS', 
        price: '₹120', 
        image: require('../../assets/Vehicles/Alto_car.png'),
        specifications: {
          engine: '0.8L Petrol',
          mileage: '22 kmpl',
          maxSpeed: '140 kmh',
          transmission: 'Manual',
          safetyFeatures: 'ABS, Airbags, Seatbelts'
        },
        modifications: {
          gpsTracking: 'Real-time GPS enabled',
          airConditioning: 'Climate control AC',
          musicSystem: 'Bluetooth audio system',
          phoneCharging: 'USB charging ports',
          sanitization: 'Sanitized after each ride'
        }
      },
      { 
        id: 2, 
        name: 'Maruti Suzuki Swift', 
        type: 'Manual | 4 seats | Petrol | AC | GPS', 
        price: '₹150', 
        image: require('../../assets/Vehicles/Swift_Car.png'),
        specifications: {
          engine: '1.2L Petrol',
          mileage: '23 kmpl',
          maxSpeed: '165 kmh',
          transmission: 'Manual',
          safetyFeatures: 'ABS, EBD, Airbags, Central locking'
        },
        modifications: {
          gpsTracking: 'Advanced GPS navigation',
          airConditioning: 'Dual zone AC',
          musicSystem: 'Premium sound system',
          phoneCharging: 'Fast charging ports',
          comfortFeatures: 'Premium seats, armrest'
        }
      },
      { 
        id: 3, 
        name: 'Toyota Fortuner', 
        type: 'Automatic | 7 seats | Diesel | AC | GPS', 
        price: '₹300', 
        image: require('../../assets/Vehicles/Fortuner_Car.png'),
        specifications: {
          engine: '2.7L Diesel',
          mileage: '14 kmpl',
          maxSpeed: '180 kmh',
          transmission: 'Automatic',
          safetyFeatures: 'ABS, EBD, VSC, Hill assist, 7 Airbags'
        },
        modifications: {
          gpsTracking: 'Premium GPS with live traffic',
          airConditioning: 'Automatic climate control',
          musicSystem: 'Premium JBL sound system',
          phoneCharging: 'Wireless charging pad',
          luxuryFeatures: 'Leather seats, sunroof, LED lights'
        }
      },
      { 
        id: 4, 
        name: 'Maruti Suzuki Alto', 
        type: 'Manual | 4 seats | Petrol | AC | GPS', 
        price: '₹120', 
        image: require('../../assets/Vehicles/Alto_car.png'),
        specifications: {
          engine: '0.8L Petrol',
          mileage: '22 kmpl',
          maxSpeed: '140 kmh',
          transmission: 'Manual',
          safetyFeatures: 'ABS, Airbags, Seatbelts'
        },
        modifications: {
          gpsTracking: 'Real-time GPS enabled',
          airConditioning: 'Climate control AC',
          musicSystem: 'Bluetooth audio system',
          phoneCharging: 'USB charging ports',
          sanitization: 'Sanitized after each ride'
        }
      },
      { 
        id: 5, 
        name: 'Maruti Suzuki Swift', 
        type: 'Manual | 4 seats | Petrol | AC | GPS', 
        price: '₹150', 
        image: require('../../assets/Vehicles/Swift_Car.png'),
        specifications: {
          engine: '1.2L Petrol',
          mileage: '23 kmpl',
          maxSpeed: '165 kmh',
          transmission: 'Manual',
          safetyFeatures: 'ABS, EBD, Airbags, Central locking'
        },
        modifications: {
          gpsTracking: 'Advanced GPS navigation',
          airConditioning: 'Dual zone AC',
          musicSystem: 'Premium sound system',
          phoneCharging: 'Fast charging ports',
          comfortFeatures: 'Premium seats, armrest'
        }
      },
    ],
    bike: [
      { 
        id: 1, 
        name: 'Honda Livo', 
        type: 'Manual | 2 seats | Petrol | GPS | Helmet', 
        price: '₹60', 
        image: require('../../assets/Vehicles/Bike1_img.png'),
        specifications: {
          engine: '110cc Single Cylinder',
          mileage: '65 kmpl',
          maxSpeed: '95 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED headlight, Digital meter, Disc brake'
        },
        modifications: {
          gpsTracking: 'Real-time GPS tracking',
          safetyGear: 'ISI certified helmets provided',
          storageBox: 'Under-seat storage compartment',
          phoneHolder: 'Secure mobile mount',
          weatherProtection: 'Rain cover and knee guards'
        }
      },
      { 
        id: 2, 
        name: 'TVS Victor', 
        type: 'Manual | 2 seats | Petrol | GPS | Helmet', 
        price: '₹65', 
        image: require('../../assets/Vehicles/Bike2_img.png'),
        specifications: {
          engine: '110cc Single Cylinder',
          mileage: '62 kmpl',
          maxSpeed: '100 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED DRL, Digital console, Sync brake'
        },
        modifications: {
          gpsTracking: 'Advanced GPS with route optimization',
          safetyGear: 'Premium helmets and reflective jackets',
          storageBox: 'Lockable storage compartment',
          phoneHolder: 'Anti-vibration phone mount',
          comfortFeatures: 'Cushioned seat, backrest'
        }
      },
      { 
        id: 3, 
        name: 'Hero Passion Pro', 
        type: 'Manual | 2 seats | Petrol | GPS | Helmet', 
        price: '₹70', 
        image: require('../../assets/Vehicles/Bike3_img.png'),
        specifications: {
          engine: '113cc Single Cylinder',
          mileage: '68 kmpl',
          maxSpeed: '102 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED headlight, Digital meter, IBS'
        },
        modifications: {
          gpsTracking: 'GPS with live location sharing',
          safetyGear: 'DOT approved helmets',
          storageBox: 'Spacious under-seat storage',
          phoneHolder: 'Waterproof phone holder',
          additionalFeatures: 'USB charging, LED indicators'
        }
      },
      { 
        id: 4, 
        name: 'Hero Splendor Plus', 
        type: 'Manual | 2 seats | Petrol | GPS | Helmet', 
        price: '₹75', 
        image: require('../../assets/Vehicles/Bike4_img.png'),
        specifications: {
          engine: '97cc Single Cylinder',
          mileage: '70 kmpl',
          maxSpeed: '85 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED headlight, Analog meter, Drum brake'
        },
        modifications: {
          gpsTracking: 'Basic GPS tracking system',
          safetyGear: 'Standard helmets and safety gear',
          storageBox: 'Compact storage space',
          phoneHolder: 'Basic phone mounting system',
          economyFeatures: 'Fuel efficient, low maintenance'
        }
      },
      { 
        id: 5, 
        name: 'Honda Livo', 
        type: 'Manual | 2 seats | Petrol | GPS | Helmet', 
        price: '₹60', 
        image: require('../../assets/Vehicles/Bike1_img.png'),
        specifications: {
          engine: '110cc Single Cylinder',
          mileage: '65 kmpl',
          maxSpeed: '95 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED headlight, Digital meter, Disc brake'
        },
        modifications: {
          gpsTracking: 'Real-time GPS tracking',
          safetyGear: 'ISI certified helmets provided',
          storageBox: 'Under-seat storage compartment',
          phoneHolder: 'Secure mobile mount',
          weatherProtection: 'Rain cover and knee guards'
        }
      },
    ],
    scooty: [
      { 
        id: 1, 
        name: 'Honda Activa 125', 
        type: 'Automatic | 2 seats | Petrol | GPS | Helmet', 
        price: '₹80', 
        image: require('../../assets/Vehicles/Activa1_img.png'),
        specifications: {
          engine: '125cc Single Cylinder',
          mileage: '58 kmpl',
          maxSpeed: '87 kmh',
          transmission: 'Automatic CVT',
          safetyFeatures: 'LED headlight, Digital meter, CBS'
        },
        modifications: {
          gpsTracking: 'Real-time GPS with route guidance',
          safetyGear: 'Premium ISI helmets provided',
          storageSpace: '18L under-seat storage',
          phoneCharging: '12V charging socket',
          comfortFeatures: 'Comfortable seat, smooth suspension'
        }
      },
      { 
        id: 2, 
        name: 'Honda Activa 6G', 
        type: 'Automatic | 2 seats | Petrol | GPS | Helmet', 
        price: '₹85', 
        image: require('../../assets/Vehicles/Activa2_img.png'),
        specifications: {
          engine: '110cc Single Cylinder',
          mileage: '60 kmpl',
          maxSpeed: '83 kmh',
          transmission: 'Automatic CVT',
          safetyFeatures: 'LED headlight, Fully digital meter, CBS'
        },
        modifications: {
          gpsTracking: 'Advanced GPS navigation system',
          safetyGear: 'Lightweight certified helmets',
          storageSpace: '18L lockable under-seat storage',
          phoneCharging: 'USB charging port',
          smartFeatures: 'Bluetooth connectivity, mobile app'
        }
      },
      { 
        id: 3, 
        name: 'Honda Activa 125', 
        type: 'Automatic | 2 seats | Petrol | GPS | Helmet', 
        price: '₹80', 
        image: require('../../assets/Vehicles/Activa1_img.png'),
        specifications: {
          engine: '125cc Single Cylinder',
          mileage: '58 kmpl',
          maxSpeed: '87 kmh',
          transmission: 'Automatic CVT',
          safetyFeatures: 'LED headlight, Digital meter, CBS'
        },
        modifications: {
          gpsTracking: 'Real-time GPS with route guidance',
          safetyGear: 'Premium ISI helmets provided',
          storageSpace: '18L under-seat storage',
          phoneCharging: '12V charging socket',
          comfortFeatures: 'Comfortable seat, smooth suspension'
        }
      },
      { 
        id: 4, 
        name: 'Honda Activa 6G', 
        type: 'Automatic | 2 seats | Petrol | GPS | Helmet', 
        price: '₹85', 
        image: require('../../assets/Vehicles/Activa2_img.png'),
        specifications: {
          engine: '110cc Single Cylinder',
          mileage: '60 kmpl',
          maxSpeed: '83 kmh',
          transmission: 'Automatic CVT',
          safetyFeatures: 'LED headlight, Fully digital meter, CBS'
        },
        modifications: {
          gpsTracking: 'Advanced GPS navigation system',
          safetyGear: 'Lightweight certified helmets',
          storageSpace: '18L lockable under-seat storage',
          phoneCharging: 'USB charging port',
          smartFeatures: 'Bluetooth connectivity, mobile app'
        }
      },
    ],
    taxi: [
      { 
        id: 1, 
        name: 'Tata Indica', 
        type: 'Manual | 4 seats | Diesel | AC | GPS', 
        price: '₹200', 
        image: require('../../assets/Vehicles/Taxi_img.png'),
        specifications: {
          engine: '1.4L Diesel',
          mileage: '20 kmpl',
          maxSpeed: '150 kmh',
          transmission: 'Manual 5-speed',
          safetyFeatures: 'ABS, Airbags, Central locking, Power steering'
        },
        modifications: {
          gpsTracking: 'Professional GPS tracking system',
          airConditioning: 'Rear AC vents for passenger comfort',
          entertainmentSystem: 'Music system with AUX input',
          phoneCharging: 'Multiple USB charging points',
          professionalService: 'Uniformed driver, clean interior'
        }
      },
      { 
        id: 2, 
        name: 'Mahindra Logan', 
        type: 'Manual | 4 seats | Diesel | AC | GPS', 
        price: '₹250', 
        image: require('../../assets/Vehicles/Taxi_img.png'),
        specifications: {
          engine: '1.5L Diesel',
          mileage: '19 kmpl',
          maxSpeed: '160 kmh',
          transmission: 'Manual 5-speed',
          safetyFeatures: 'ABS, EBD, Airbags, Central locking'
        },
        modifications: {
          gpsTracking: 'Advanced GPS with live tracking',
          airConditioning: 'Dual zone climate control',
          entertainmentSystem: 'Premium audio with Bluetooth',
          phoneCharging: 'Fast charging USB ports',
          luxuryFeatures: 'Spacious interior, reading lights'
        }
      },
      { 
        id: 3, 
        name: 'Tata Indica', 
        type: 'Manual | 4 seats | Diesel | AC | GPS', 
        price: '₹200', 
        image: require('../../assets/Vehicles/Taxi_img.png'),
        specifications: {
          engine: '1.4L Diesel',
          mileage: '20 kmpl',
          maxSpeed: '150 kmh',
          transmission: 'Manual 5-speed',
          safetyFeatures: 'ABS, Airbags, Central locking, Power steering'
        },
        modifications: {
          gpsTracking: 'Professional GPS tracking system',
          airConditioning: 'Rear AC vents for passenger comfort',
          entertainmentSystem: 'Music system with AUX input',
          phoneCharging: 'Multiple USB charging points',
          professionalService: 'Uniformed driver, clean interior'
        }
      },
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

  const handleVehicleImagePress = (vehicle) => {
    navigation.navigate('VehicleDetails', {
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
            <TouchableOpacity onPress={() => handleVehicleImagePress(vehicle)}>
              <Image source={vehicle.image} style={styles.vehicleImage} resizeMode="contain" />
            </TouchableOpacity>
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