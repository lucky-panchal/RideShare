import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VehicleDetails = ({ route }) => {
  const navigation = useNavigation();
  const { vehicle, transportType, pickupLocation, dropLocation } = route?.params || {};

  const vehicleSpecs = {
    // Cars
    alto_car: {
      name: 'Maruti Suzuki Alto',
      rating: 4.2,
      reviews: 1247,
      specifications: {
        maxPower: '68hp',
        fuel: '22km per litre',
        maxSpeed: '140kmh',
        acceleration: '0-60kmh 14sec'
      },
      features: {
        model: 'Alto 800',
        capacity: '68hp',
        color: 'White',
        fuelType: 'Petrol',
        gearType: 'Manual'
      }
    },
    swift_car: {
      name: 'Maruti Suzuki Swift',
      rating: 4.5,
      reviews: 2156,
      specifications: {
        maxPower: '90hp',
        fuel: '23km per litre',
        maxSpeed: '165kmh',
        acceleration: '0-60kmh 10sec'
      },
      features: {
        model: 'Swift VXI',
        capacity: '90hp',
        color: 'Silver',
        fuelType: 'Petrol',
        gearType: 'Manual'
      }
    },
    fortuner_car: {
      name: 'Toyota Fortuner',
      rating: 4.7,
      reviews: 892,
      specifications: {
        maxPower: '204hp',
        fuel: '14km per litre',
        maxSpeed: '180kmh',
        acceleration: '0-60kmh 8sec'
      },
      features: {
        model: 'Fortuner 4x4',
        capacity: '204hp',
        color: 'Black',
        fuelType: 'Diesel',
        gearType: 'Automatic'
      }
    },
    // Bikes
    bike1: {
      name: 'Honda Livo',
      rating: 4.3,
      reviews: 1834,
      specifications: {
        maxPower: '8.36hp',
        fuel: '65km per litre',
        maxSpeed: '95kmh',
        acceleration: '0-60kmh 6sec'
      },
      features: {
        model: 'Livo 110',
        capacity: '110cc',
        color: 'Red',
        fuelType: 'Petrol',
        gearType: 'Manual'
      }
    },
    bike2: {
      name: 'TVS Victor',
      rating: 4.4,
      reviews: 1567,
      specifications: {
        maxPower: '9.6hp',
        fuel: '62km per litre',
        maxSpeed: '100kmh',
        acceleration: '0-60kmh 5.5sec'
      },
      features: {
        model: 'Victor 110',
        capacity: '110cc',
        color: 'Blue',
        fuelType: 'Petrol',
        gearType: 'Manual'
      }
    },
    bike3: {
      name: 'Hero Passion Pro',
      rating: 4.2,
      reviews: 2103,
      specifications: {
        maxPower: '9.15hp',
        fuel: '68km per litre',
        maxSpeed: '102kmh',
        acceleration: '0-60kmh 5.8sec'
      },
      features: {
        model: 'Passion Pro TR',
        capacity: '113cc',
        color: 'Black',
        fuelType: 'Petrol',
        gearType: 'Manual'
      }
    },
    bike4: {
      name: 'Hero Splendor Plus',
      rating: 4.1,
      reviews: 3421,
      specifications: {
        maxPower: '8.02hp',
        fuel: '70km per litre',
        maxSpeed: '85kmh',
        acceleration: '0-60kmh 7sec'
      },
      features: {
        model: 'Splendor Plus',
        capacity: '97cc',
        color: 'Red',
        fuelType: 'Petrol',
        gearType: 'Manual'
      }
    },
    // Scooters
    activa1: {
      name: 'Honda Activa 6G',
      rating: 4.6,
      reviews: 2847,
      specifications: {
        maxPower: '7.68hp',
        fuel: '60km per litre',
        maxSpeed: '83kmh',
        acceleration: '0-60kmh 8sec'
      },
      features: {
        model: 'Activa 6G',
        capacity: '110cc',
        color: 'White',
        fuelType: 'Petrol',
        gearType: 'Automatic'
      }
    },
    activa2: {
      name: 'Honda Activa 125',
      rating: 4.5,
      reviews: 1923,
      specifications: {
        maxPower: '8.29hp',
        fuel: '58km per litre',
        maxSpeed: '87kmh',
        acceleration: '0-60kmh 7.5sec'
      },
      features: {
        model: 'Activa 125',
        capacity: '125cc',
        color: 'Grey',
        fuelType: 'Petrol',
        gearType: 'Automatic'
      }
    },
    // Taxi
    taxi_img_1: {
      name: 'Tata Indica',
      rating: 4.0,
      reviews: 756,
      specifications: {
        maxPower: '70hp',
        fuel: '20km per litre',
        maxSpeed: '150kmh',
        acceleration: '0-60kmh 12sec'
      },
      features: {
        model: 'Indica V2',
        capacity: '70hp',
        color: 'Yellow',
        fuelType: 'Diesel',
        gearType: 'Manual'
      }
    },
    taxi_img_2: {
      name: 'Mahindra Logan',
      rating: 4.1,
      reviews: 634,
      specifications: {
        maxPower: '90hp',
        fuel: '19km per litre',
        maxSpeed: '160kmh',
        acceleration: '0-60kmh 11sec'
      },
      features: {
        model: 'Logan GLE',
        capacity: '90hp',
        color: 'Yellow',
        fuelType: 'Diesel',
        gearType: 'Manual'
      }
    }
  };

  const currentVehicle = vehicleSpecs[vehicle?.id] || {
    name: vehicle?.name || 'Standard Vehicle',
    rating: 4.2,
    reviews: 150,
    specifications: {
      maxPower: '75hp',
      fuel: '20km per litre',
      maxSpeed: '120kmh',
      acceleration: '0-60kmh 10sec'
    },
    features: {
      model: 'Standard Model',
      capacity: '75hp',
      color: 'White',
      fuelType: 'Petrol',
      gearType: 'Manual',
      safetyFeatures: 'Basic safety features',
      comfortFeatures: 'Standard comfort package',
      technology: 'Basic infotainment system'
    }
  };

  const handleBookLater = () => {
    console.log('Book later:', vehicle);
  };

  const handleRideNow = () => {
    navigation.navigate('RideBooking', {
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.vehicleName}>{currentVehicle.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{currentVehicle.rating}</Text>
          <Text style={styles.reviews}>({currentVehicle.reviews} reviews)</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={vehicle?.image} style={styles.vehicleImage} resizeMode="contain" />
        </View>

        <Text style={styles.sectionTitle}>Specifications</Text>
        <View style={styles.specsContainer}>
          <View style={styles.specCard}>
            <Ionicons name="flash" size={20} color="#666" />
            <Text style={styles.specLabel}>Max. power</Text>
            <Text style={styles.specValue}>{currentVehicle.specifications.maxPower}</Text>
          </View>
          <View style={styles.specCard}>
            <Ionicons name="water" size={20} color="#666" />
            <Text style={styles.specLabel}>Fuel</Text>
            <Text style={styles.specValue}>{currentVehicle.specifications.fuel}</Text>
          </View>
          <View style={styles.specCard}>
            <Ionicons name="speedometer" size={20} color="#666" />
            <Text style={styles.specLabel}>Max. speed</Text>
            <Text style={styles.specValue}>{currentVehicle.specifications.maxSpeed}</Text>
          </View>
          <View style={styles.specCard}>
            <Ionicons name="timer" size={20} color="#666" />
            <Text style={styles.specLabel}>0-60mph</Text>
            <Text style={styles.specValue}>{currentVehicle.specifications.acceleration}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Car features</Text>
        <View style={styles.featuresContainer}>
          {Object.entries(currentVehicle.features).map(([key, value]) => (
            <View key={key} style={styles.featureRow}>
              <Text style={styles.featureLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Text style={styles.featureValue}>{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bookLaterButton} onPress={handleBookLater}>
          <Text style={styles.bookLaterText}>Book later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rideNowButton} onPress={handleRideNow}>
          <Text style={styles.rideNowText}>Ride Now</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  vehicleImage: {
    width: 250,
    height: 150,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  specCard: {
    width: '48%',
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  specLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  featuresContainer: {
    marginBottom: 100,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d0e7d0',
  },
  featureLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  featureValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
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

export default VehicleDetails;