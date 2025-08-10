import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SendVerification = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSendOTP = () => {
    // OTP sending logic will be implemented later
    console.log('Send OTP pressed');
  };

  const isEmail = (input) => {
    return input.includes('@');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  sendButton: {
    backgroundColor: '#DB2899',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendVerification;