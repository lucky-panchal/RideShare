import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RideBooking = ({ route }) => {
  const navigation = useNavigation();
  const { vehicle, transportType, pickupLocation, dropLocation } = route?.params || {};
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const paymentMethods = [
    { id: 'visa', type: 'card', name: 'Visa', number: '**** **** **** 8970', expires: '12/26', icon: 'card' },
    { id: 'mastercard', type: 'card', name: 'Mastercard', number: '**** **** **** 8970', expires: '12/26', icon: 'card' },
    { id: 'paypal', type: 'digital', name: 'PayPal', email: 'mailaddress@mail.com', expires: '12/26', icon: 'logo-paypal' },
    { id: 'cash', type: 'cash', name: 'Cash', expires: '12/26', icon: 'cash' },
    { id: 'upi', type: 'upi', name: 'UPI', expires: '', icon: 'phone-portrait' }
  ];

  const upiApps = [
    { name: 'PhonePe', icon: '📱' },
    { name: 'Google Pay', icon: '💳' },
    { name: 'Paytm', icon: '💰' },
    { name: 'BHIM', icon: '🏦' }
  ];

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleConfirmBooking = () => {
    navigation.navigate('BookingConfirmation', {
      vehicle,
      transportType,
      pickupLocation,
      dropLocation,
      paymentMethod: selectedPayment,
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
        <Text style={styles.headerTitle}>Request for ride</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Location Section */}
        <View style={styles.locationSection}>
          <View style={styles.locationItem}>
            <Ionicons name="location" size={16} color="#DB2899" />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Current location</Text>
              <Text style={styles.locationAddress}>{pickupLocation || '2972 Westheimer Rd. Santa Ana, Illinois 85486'}</Text>
            </View>
          </View>
          
          <View style={styles.locationItem}>
            <Ionicons name="location-outline" size={16} color="#4CAF50" />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Office</Text>
              <Text style={styles.locationAddress}>{dropLocation || '1901 Thornridge Cir. Shiloh, Hawaii 81063'}</Text>
            </View>
            <Text style={styles.distance}>1.1km</Text>
          </View>
        </View>

        {/* Vehicle Section */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{vehicle?.name || 'Mustang Shelby GT'}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>4.9 (531 reviews)</Text>
            </View>
          </View>
          <Image source={vehicle?.image} style={styles.vehicleImage} resizeMode="contain" />
        </View>

        {/* Date and Time Section */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={date}
            onChangeText={setDate}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={time}
            onChangeText={setTime}
            placeholderTextColor="#999"
          />
        </View>

        {/* Charge Section */}
        <View style={styles.chargeSection}>
          <Text style={styles.sectionTitle}>Charge</Text>
          <View style={styles.chargeItem}>
            <Text style={styles.chargeLabel}>{vehicle?.name || 'Mustang'}/per hours</Text>
            <Text style={styles.chargeAmount}>$200</Text>
          </View>
          <View style={styles.chargeItem}>
            <Text style={styles.chargeLabel}>Vat (5%)</Text>
            <Text style={styles.chargeAmount}>$20</Text>
          </View>
        </View>

        {/* Payment Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Select payment method</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard,
                selectedPayment?.id === method.id && styles.selectedPaymentCard
              ]}
              onPress={() => handlePaymentSelect(method)}
            >
              <View style={styles.paymentIcon}>
                {method.type === 'card' && method.id === 'visa' && (
                  <View style={[styles.cardIcon, { backgroundColor: '#1A1F71' }]}>
                    <Text style={styles.cardText}>VISA</Text>
                  </View>
                )}
                {method.type === 'card' && method.id === 'mastercard' && (
                  <View style={styles.mastercardIcon}>
                    <View style={[styles.circle, { backgroundColor: '#EB001B' }]} />
                    <View style={[styles.circle, { backgroundColor: '#F79E1B', marginLeft: -8 }]} />
                  </View>
                )}
                {method.type === 'digital' && (
                  <View style={[styles.cardIcon, { backgroundColor: '#0070BA' }]}>
                    <Text style={styles.cardText}>P</Text>
                  </View>
                )}
                {method.type === 'cash' && (
                  <View style={[styles.cardIcon, { backgroundColor: '#666' }]}>
                    <Text style={styles.cardText}>$</Text>
                  </View>
                )}
                {method.type === 'upi' && (
                  <View style={[styles.cardIcon, { backgroundColor: '#FF6B35' }]}>
                    <Text style={styles.cardText}>UPI</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.paymentInfo}>
                {method.type === 'card' && (
                  <>
                    <Text style={styles.paymentNumber}>{method.number}</Text>
                    <Text style={styles.paymentExpiry}>Expires: {method.expires}</Text>
                  </>
                )}
                {method.type === 'digital' && (
                  <>
                    <Text style={styles.paymentNumber}>{method.email}</Text>
                    <Text style={styles.paymentExpiry}>Expires: {method.expires}</Text>
                  </>
                )}
                {method.type === 'cash' && (
                  <>
                    <Text style={styles.paymentNumber}>Cash</Text>
                    <Text style={styles.paymentExpiry}>Pay on delivery</Text>
                  </>
                )}
                {method.type === 'upi' && (
                  <>
                    <Text style={styles.paymentNumber}>UPI Payment</Text>
                    <View style={styles.upiApps}>
                      {upiApps.map((app, index) => (
                        <Text key={index} style={styles.upiIcon}>{app.icon}</Text>
                      ))}
                    </View>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
          <Text style={styles.confirmText}>Confirm Booking</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  locationSection: {
    marginBottom: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  distance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  vehicleCard: {
    backgroundColor: '#f0f8f0',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DB2899',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  vehicleImage: {
    width: 80,
    height: 50,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
  },
  chargeSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  chargeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chargeLabel: {
    fontSize: 16,
    color: '#333',
  },
  chargeAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentSection: {
    marginBottom: 100,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentCard: {
    borderColor: '#DB2899',
    backgroundColor: '#fdf2f8',
  },
  paymentIcon: {
    marginRight: 15,
  },
  cardIcon: {
    width: 50,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mastercardIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    height: 32,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  paymentExpiry: {
    fontSize: 14,
    color: '#666',
  },
  upiApps: {
    flexDirection: 'row',
    marginTop: 5,
  },
  upiIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
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

export default RideBooking;