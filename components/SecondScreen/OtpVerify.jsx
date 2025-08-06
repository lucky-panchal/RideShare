import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Dimensions, Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function OtpVerify({ navigation, route }) {
  const { mobile, countryCode } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      Alert.alert('Success', 'OTP verified successfully!');
    } else {
      Alert.alert('Error', 'Please enter complete OTP');
    }
  };

  const handleResend = () => {
    Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={[styles.content, keyboardVisible && styles.contentKeyboardActive]}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>Please enter the 6-digit code sent to {countryCode} {mobile}</Text>
        
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={[styles.otpInput, digit && styles.otpInputFilled]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>
        
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend again</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.verifyButton, keyboardVisible && styles.verifyButtonKeyboardActive]} 
        onPress={handleVerify}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: screenHeight * 0.15,
    alignItems: 'center',
  },
  contentKeyboardActive: {
    paddingTop: screenHeight * 0.08,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  otpInputFilled: {
    borderColor: '#DB2899',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: '#6B7280',
  },
  resendLink: {
    fontSize: 14,
    color: '#DB2899',
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: '#DB2899',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonKeyboardActive: {
    marginBottom: 10,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});