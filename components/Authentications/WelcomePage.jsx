import React from 'react';
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Section with Image */}
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/Welcome/Welcome Screen.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      
      {/* Middle Section with Text */}
      <View style={styles.middleSection}>
        <Text style={styles.welcomeText}>Have a better sharing experience</Text>
      </View>
      
      {/* Bottom Section with Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.08,
    paddingBottom: screenHeight * 0.05,
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    width: screenWidth * 0.75,
    height: screenHeight * 0.35,
    maxHeight: 300,
  },
  middleSection: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
  },
  welcomeText: {
    fontSize: screenWidth * 0.045,
    color: '#888',
    textAlign: 'center',
    lineHeight: screenWidth * 0.06,
  },
  bottomSection: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingBottom: screenHeight * 0.02,
  },
  createAccountButton: {
    backgroundColor: '#DB2899',
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    cursor: 'pointer',
  },
  createAccountText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#DB2899',
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    cursor: 'pointer',
  },
  loginText: {
    color: '#DB2899',
    fontSize: 16,
    fontWeight: '600',
  },
});