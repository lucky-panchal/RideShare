import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SetNewPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const validatePassword = (pwd) => {
    const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return hasNumberOrSpecial;
  };

  const handleRegister = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must contain at least 1 number or special character');
      return;
    }

    // Navigate to next screen after successful password setup
    Alert.alert('Success', 'Password set successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('CompleteProfile') }
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Set your password</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            style={styles.eyeButton} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            style={styles.eyeButton} 
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons 
              name={showConfirmPassword ? "eye-off" : "eye"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.helperText}>At least 1 number or special character</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingRight: 50,
    fontSize: 16,
    backgroundColor: '#fafafa',
    minHeight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  helperText: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  registerButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    minHeight: 56,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SetNewPassword;