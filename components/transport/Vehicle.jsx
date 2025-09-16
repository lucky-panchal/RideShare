import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Vehicle = ({ route }) => {
  const navigation = useNavigation();
  const { transportType, pickupLocation, dropLocation } = route?.params || {};
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  
  // Vehicle data based on transport type
  const vehicleData = {
    car: [
      {
        id: 'alto_car',
        name: 'Maruti Suzuki Alto',
        type: 'Manual',
        seats: '4 seats',
        fuel: 'Petrol',
        price: '₹120/hour',
        image: require('../../assets/Vehicles/Alto_car.png'),
        specifications: {
          engine: '0.8L F8D Petrol Engine',
          mileage: '22.05 kmpl',
          maxSpeed: '140 kmh',
          transmission: 'Manual 5-speed',
          safetyFeatures: 'Driver Airbag, ABS, Seatbelt reminder'
        },
        modifications: {
          gpsTracking: 'Real-time GPS tracking system',
          airConditioning: 'Manual AC with heater',
          musicSystem: 'Bluetooth enabled audio system',
          phoneCharging: 'USB charging port',
          comfortFeatures: 'Power steering, central locking'
        }
      },
      {
        id: 'swift_car',
        name: 'Maruti Suzuki Swift',
        type: 'Manual',
        seats: '4 seats',
        fuel: 'Petrol',
        price: '₹150/hour',
        image: require('../../assets/Vehicles/Swift_Car.png'),
        specifications: {
          engine: '1.2L K12M Petrol Engine',
          mileage: '23.20 kmpl',
          maxSpeed: '165 kmh',
          transmission: 'Manual 5-speed',
          safetyFeatures: 'Dual Airbags, ABS with EBD, ISOFIX'
        },
        modifications: {
          gpsTracking: 'Advanced GPS with navigation',
          airConditioning: 'Automatic climate control',
          musicSystem: 'SmartPlay touchscreen with Android Auto',
          phoneCharging: 'Fast charging USB ports',
          comfortFeatures: 'Keyless entry, push button start'
        }
      },
      {
        id: 'fortuner_car',
        name: 'Toyota Fortuner',
        type: 'Automatic',
        seats: '7 seats',
        fuel: 'Diesel',
        price: '₹300/hour',
        image: require('../../assets/Vehicles/Fortuner_Car.png'),
        specifications: {
          engine: '2.8L GD Diesel Engine',
          mileage: '14.2 kmpl',
          maxSpeed: '180 kmh',
          transmission: 'Automatic 6-speed',
          safetyFeatures: '7 Airbags, VSC, Hill Start Assist, TPMS'
        },
        modifications: {
          gpsTracking: 'Premium GPS with live traffic updates',
          airConditioning: 'Dual zone automatic climate control',
          musicSystem: 'Premium JBL sound system with wireless charging',
          phoneCharging: 'Wireless charging pad + multiple USB ports',
          luxuryFeatures: 'Leather seats, sunroof, LED headlights'
        }
      },
    ],
    bike: [
      {
        id: 'bike1',
        name: 'Honda Livo',
        type: 'Manual',
        seats: '2 seats',
        fuel: 'Petrol',
        price: '₹80/hour',
        image: require('../../assets/Vehicles/Bike1_img.png'),
        specifications: {
          engine: '109.51cc Single Cylinder',
          mileage: '65 kmpl',
          maxSpeed: '95 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED headlight, Digital speedometer, Disc brake'
        },
        modifications: {
          gpsTracking: 'Real-time GPS tracking device',
          safetyGear: 'ISI certified helmets provided',
          storageBox: 'Under-seat storage compartment',
          phoneHolder: 'Secure mobile mounting system',
          weatherProtection: 'Rain cover and protective gear'
        }
      },
      {
        id: 'bike2',
        name: 'TVS Victor',
        type: 'Manual',
        seats: '2 seats',
        fuel: 'Petrol',
        price: '₹100/hour',
        image: require('../../assets/Vehicles/Bike2_img.png'),
        specifications: {
          engine: '109.7cc Single Cylinder',
          mileage: '62 kmpl',
          maxSpeed: '100 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED DRL, Digital console, SBT (Sync Brake Technology)'
        },
        modifications: {
          gpsTracking: 'Advanced GPS with route optimization',
          safetyGear: 'Premium helmets and reflective jackets',
          storageBox: 'Lockable under-seat storage',
          phoneHolder: 'Anti-vibration phone mount',
          comfortFeatures: 'Cushioned seat with backrest'
        }
      },
      {
        id: 'bike3',
        name: 'Hero Passion Pro',
        type: 'Manual',
        seats: '2 seats',
        fuel: 'Petrol',
        price: '₹110/hour',
        image: require('../../assets/Vehicles/Bike3_img.png'),
        specifications: {
          engine: '113.2cc Single Cylinder',
          mileage: '68 kmpl',
          maxSpeed: '102 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED headlight, Digital meter, IBS (Integrated Braking System)'
        },
        modifications: {
          gpsTracking: 'GPS with live location sharing',
          safetyGear: 'DOT approved safety helmets',
          storageBox: 'Spacious under-seat storage',
          phoneHolder: 'Waterproof phone holder',
          additionalFeatures: 'USB charging port, LED indicators'
        }
      },
      {
        id: 'bike4',
        name: 'Hero Splendor Plus',
        type: 'Manual',
        seats: '2 seats',
        fuel: 'Petrol',
        price: '₹120/hour',
        image: require('../../assets/Vehicles/Bike4_img.png'),
        specifications: {
          engine: '97.2cc Single Cylinder',
          mileage: '70 kmpl',
          maxSpeed: '85 kmh',
          transmission: 'Manual 4-speed',
          safetyFeatures: 'LED headlight, Analog-digital meter, Drum brakes'
        },
        modifications: {
          gpsTracking: 'Basic GPS tracking system',
          safetyGear: 'Standard certified helmets',
          storageBox: 'Compact storage compartment',
          phoneHolder: 'Basic phone mounting bracket',
          economyFeatures: 'Fuel efficient engine, low maintenance cost'
        }
      },
    ],
    scooty: [
      {
        id: 'activa1',
        name: 'Honda Activa 6G',
        type: 'Automatic',
        seats: '2 seats',
        fuel: 'Petrol',
        price: '₹60/hour',
        image: require('../../assets/Vehicles/Activa1_img.png'),
        specifications: {
          engine: '109.51cc Single Cylinder',
          mileage: '60 kmpl',
          maxSpeed: '83 kmh',
          transmission: 'Automatic V-Matic',
          safetyFeatures: 'LED headlight, Fully digital meter, CBS'
        },
        modifications: {
          gpsTracking: 'Real-time GPS with route guidance',
          safetyGear: 'Lightweight ISI certified helmets',
          storageSpace: '18L under-seat storage with mobile charging',
          phoneCharging: 'USB charging socket',
          smartFeatures: 'Bluetooth connectivity, mobile app integration'
        }
      },
      {
        id: 'activa2',
        name: 'Honda Activa 125',
        type: 'Automatic',
        seats: '2 seats',
        fuel: 'Petrol',
        price: '₹70/hour',
        image: require('../../assets/Vehicles/Activa2_img.png'),
        specifications: {
          engine: '124cc Single Cylinder',
          mileage: '58 kmpl',
          maxSpeed: '87 kmh',
          transmission: 'Automatic V-Matic',
          safetyFeatures: 'LED headlight, Digital meter, CBS with Equalizer'
        },
        modifications: {
          gpsTracking: 'Advanced GPS navigation system',
          safetyGear: 'Premium lightweight helmets',
          storageSpace: '18L lockable under-seat storage',
          phoneCharging: '12V charging socket with USB adapter',
          comfortFeatures: 'Comfortable seat, telescopic suspension'
        }
      },
    ],
    taxi: [
      {
        id: 'taxi_img_1',
        name: 'Tata Indica',
        type: 'Manual',
        seats: '4 seats',
        fuel: 'Diesel',
        price: '₹200/hour',
        image: require('../../assets/Vehicles/Taxi_img.png'),
        specifications: {
          engine: '1.4L TDI Diesel Engine',
          mileage: '20 kmpl',
          maxSpeed: '150 kmh',
          transmission: 'Manual 5-speed',
          safetyFeatures: 'Driver Airbag, ABS, Central locking, Power steering'
        },
        modifications: {
          gpsTracking: 'Professional GPS tracking with panic button',
          airConditioning: 'Rear AC vents for passenger comfort',
          entertainmentSystem: 'FM radio with AUX input',
          phoneCharging: 'Multiple USB charging points',
          professionalService: 'Uniformed driver, sanitized interior, first aid kit'
        }
      },
      {
        id: 'taxi_img_2',
        name: 'Mahindra Logan',
        type: 'Manual',
        seats: '4 seats',
        fuel: 'Diesel',
        price: '₹250/hour',
        image: require('../../assets/Vehicles/Taxi_img.png'),
        specifications: {
          engine: '1.5L dCi Diesel Engine',
          mileage: '19 kmpl',
          maxSpeed: '160 kmh',
          transmission: 'Manual 5-speed',
          safetyFeatures: 'Dual Airbags, ABS with EBD, Central locking'
        },
        modifications: {
          gpsTracking: 'Advanced GPS with live tracking and SOS',
          airConditioning: 'Dual zone climate control system',
          entertainmentSystem: 'Premium audio system with Bluetooth',
          phoneCharging: 'Fast charging USB ports and wireless charging',
          luxuryFeatures: 'Spacious interior, reading lights, premium upholstery'
        }
      },
    ],
  };

  const currentVehicles = vehicleData[transportType] || [];
  const transportTitle = transportType === 'scooty' ? 'scooters' : `${transportType}s`;

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleBookVehicle = () => {
    if (selectedVehicle) {
      navigation.navigate('RideBooking', {
        pickupLocation,
        dropLocation,
        vehicle: selectedVehicle,
        transportType
      });
    }
  };

  const handleViewList = () => {
    navigation.navigate('AvailableVehicle', {
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
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Available {transportTitle} for ride</Text>
        <Text style={styles.subtitle}>{currentVehicles.length} {transportTitle} found</Text>
        <TouchableOpacity style={styles.viewListButton} onPress={handleViewList}>
          <Text style={styles.viewListText}>View List</Text>
          <Ionicons name="chevron-forward" size={16} color="#DB2899" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Vehicle List */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentVehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleCard,
              selectedVehicle?.id === vehicle.id && styles.selectedCard
            ]}
            onPress={() => handleVehicleSelect(vehicle)}
          >
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <View style={styles.vehicleDetails}>
                <Text style={styles.detailText}>{vehicle.type}</Text>
                <Text style={styles.separator}>|</Text>
                <Text style={styles.detailText}>{vehicle.seats}</Text>
                <Text style={styles.separator}>|</Text>
                <Text style={styles.detailText}>{vehicle.fuel}</Text>
              </View>
              <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
              

            </View>
            
            <TouchableOpacity 
              style={styles.vehicleImageContainer}
              onPress={() => handleVehicleImagePress(vehicle)}
            >
              <Image 
                source={vehicle.image} 
                style={styles.vehicleImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Book Button */}
      {selectedVehicle && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookVehicle}>
            <Text style={styles.bookButtonText}>Book {selectedVehicle.name}</Text>
          </TouchableOpacity>
        </View>
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
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  vehicleCard: {
    backgroundColor: '#f0f8f0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#DB2899',
    backgroundColor: '#fdf2f8',
    shadowColor: '#DB2899',
    shadowOpacity: 0.2,
    elevation: 6,
  },
  vehicleInfo: {
    flex: 1,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  vehicleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  separator: {
    fontSize: 13,
    color: '#999',
    marginHorizontal: 10,
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DB2899',
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#DB2899',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  selectedButton: {
    borderColor: '#DB2899',
    backgroundColor: '#DB2899',
  },
  viewButtonText: {
    color: '#DB2899',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedButtonText: {
    color: '#fff',
  },
  vehicleImageContainer: {
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 8,
    marginLeft: 10,
  },
  vehicleImage: {
    width: 100,
    height: 60,
    transform: [{ scaleX: 1 }],
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bookButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  viewListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#DB2899',
  },
  viewListText: {
    color: '#DB2899',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 5,
  },
});

export default Vehicle;