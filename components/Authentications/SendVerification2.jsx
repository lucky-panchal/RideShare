import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SendVerification2 = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSendOTP = () => {
    // Navigate to PhoneVerifyOtp after sending OTP
    navigation.navigate('PhoneVerifyOtp');
  };

  const isEmail = (input) => {
    return input.includes('@');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          placeholderTextColor="#999"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType={isEmail(emailOrPhone) ? 'email-address' : 'phone-pad'}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.sendButton} onPress={handleSendOTP}>
        <Text style={styles.sendButtonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 30,
  },
  inputContainer: {
    height: '15%',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  spacer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
    minHeight: 50,
  },
  sendButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 30,
    minHeight: 56,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendVerification2;