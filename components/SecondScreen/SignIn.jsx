import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SignIn = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Sign in logic will be implemented later
    console.log('Sign In pressed');
  };

  const handleForgotPassword = () => {
    // Forgot password logic will be implemented later
    console.log('Forgot Password pressed');
  };

  const handleSocialLogin = (provider) => {
    // Social login logic will be implemented later
    console.log(`${provider} login pressed`);
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          placeholderTextColor="#999"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forget password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>

        <TouchableOpacity 
          style={[styles.socialButton, styles.gmailButton]} 
          onPress={() => handleSocialLogin('Gmail')}
        >
          <Image 
            source={require('../../assets/AuthenticationsAssests/Gmail.png')} 
            style={styles.socialIcon} 
          />
          <Text style={styles.socialButtonText}>Continue with Gmail</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, styles.facebookButton]} 
          onPress={() => handleSocialLogin('Facebook')}
        >
          <Image 
            source={require('../../assets/AuthenticationsAssests/Facebook.png')} 
            style={styles.socialIcon} 
          />
          <Text style={[styles.socialButtonText, styles.facebookText]}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialButton, styles.appleButton]} 
          onPress={() => handleSocialLogin('Apple')}
        >
          <Image 
            source={require('../../assets/AuthenticationsAssests/Apple.png')} 
            style={styles.socialIcon} 
          />
          <Text style={[styles.socialButtonText, styles.appleText]}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpPrompt}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpLink}>Sign Up</Text>
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
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#DB2899',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#DB2899',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  orText: {
    marginHorizontal: 15,
    color: '#999',
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  gmailButton: {
    backgroundColor: '#fff',
    borderColor: '#db4437',
  },
  facebookButton: {
    backgroundColor: '#1877f2',
    borderColor: '#1877f2',
  },
  appleButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#db4437',
    flex: 1,
    textAlign: 'center',
  },
  facebookText: {
    color: '#fff',
  },
  appleText: {
    color: '#fff',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  signUpPrompt: {
    color: '#666',
    fontSize: 16,
  },
  signUpLink: {
    color: '#DB2899',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignIn;