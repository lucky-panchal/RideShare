import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Dimensions, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [gender, setGender] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!validateName(name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!validatePhone(mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    if (!gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  };

  // Handle field blur
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  // Handle field change with validation
  const handleFieldChange = (field, value) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'mobile':
        setMobile(value);
        break;
      case 'gender':
        setGender(value);
        break;
    }
    
    if (touched[field]) {
      setTimeout(validateForm, 100);
    }
  };

  // Handle sign up
  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      // Simulate sign up process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Your account has been created successfully.',
        [{ text: 'Continue', onPress: () => navigation.navigate('WelcomePage') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+55', name: 'Brazil', flag: '🇧🇷' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
  ];

  // Google OAuth Configuration
  const googleAuthConfig = {
    clientId: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
    scopes: ['openid', 'profile', 'email'],
    additionalParameters: {},
    customParameters: {},
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setLoadingProvider('google');
      
      const request = new AuthSession.AuthRequest({
        clientId: googleAuthConfig.clientId,
        scopes: googleAuthConfig.scopes,
        responseType: AuthSession.ResponseType.Code,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      });
      
      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/oauth/authorize',
      });
      
      if (result.type === 'success') {
        // Exchange code for access token and get user info
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.params.access_token}`
        );
        const userInfo = await userInfoResponse.json();
        
        // Process user data
        await processOAuthUser({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture,
          provider: 'google'
        });
      } else {
        Alert.alert('Cancelled', 'Google sign-in was cancelled');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setLoading(false);
      setLoadingProvider(null);
    }
  };

  // Handle Facebook Sign In
  const handleFacebookSignIn = async () => {
    try {
      setLoading(true);
      setLoadingProvider('facebook');
      
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
      if (result.isCancelled) {
        Alert.alert('Cancelled', 'Facebook sign-in was cancelled');
        return;
      }
      
      const data = await AccessToken.getCurrentAccessToken();
      
      if (data) {
        // Get user info from Facebook Graph API
        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken: data.accessToken,
            parameters: {
              fields: {
                string: 'id,name,email,picture.type(large)'
              }
            }
          },
          async (error, result) => {
            if (error) {
              console.error('Facebook Graph Request Error:', error);
              Alert.alert('Error', 'Failed to get Facebook profile');
            } else {
              // Process user data
              await processOAuthUser({
                id: result.id,
                name: result.name,
                email: result.email,
                avatar: result.picture?.data?.url,
                provider: 'facebook'
              });
            }
          }
        );
        
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    } catch (error) {
      console.error('Facebook Sign-In Error:', error);
      Alert.alert('Error', 'Failed to sign in with Facebook');
    } finally {
      setLoading(false);
      setLoadingProvider(null);
    }
  };

  // Handle Apple Sign In
  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      setLoadingProvider('apple');
      
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      
      // Process user data
      await processOAuthUser({
        id: credential.user,
        name: credential.fullName ? `${credential.fullName.givenName} ${credential.fullName.familyName}` : 'Apple User',
        email: credential.email,
        avatar: null,
        provider: 'apple'
      });
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        Alert.alert('Cancelled', 'Apple sign-in was cancelled');
      } else {
        console.error('Apple Sign-In Error:', error);
        Alert.alert('Error', 'Failed to sign in with Apple');
      }
    } finally {
      setLoading(false);
      setLoadingProvider(null);
    }
  };

  // Process OAuth user data (Frontend only)
  const processOAuthUser = async (userData) => {
    try {
      console.log('OAuth User Data:', userData);
      
      // Store user data locally (you can use AsyncStorage for persistence)
      const userProfile = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        provider: userData.provider,
        signedInAt: new Date().toISOString()
      };
      
      // Update local state
      setName(userData.name || '');
      setEmail(userData.email || '');
      
      Alert.alert(
        'Success!',
        `Welcome ${userData.name}! You've successfully signed in with ${userData.provider}.`,
        [
          {
            text: 'Continue',
            onPress: () => {
              // Navigate to main app
              navigation.navigate('WelcomePage');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Process OAuth User Error:', error);
      Alert.alert('Error', 'Failed to process user authentication');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.content}>
        <View style={styles.titlePlaceholder} />
        <View style={styles.subtitlePlaceholder} />
        
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.name && touched.name && styles.inputError]}
            placeholder="Full Name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={(value) => handleFieldChange('name', value)}
            onBlur={() => handleBlur('name')}
            accessibilityLabel="Full Name"
            accessibilityHint="Enter your full name"
            autoCapitalize="words"
            autoComplete="name"
          />
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.email && touched.email && styles.inputError]}
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={(value) => handleFieldChange('email', value)}
            onBlur={() => handleBlur('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            accessibilityLabel="Email Address"
            accessibilityHint="Enter your email address"
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        {/* Mobile Number with Country Code */}
        <View style={styles.inputContainer}>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCodeContainer}>
              <Picker
                selectedValue={countryCode}
                style={styles.countryPicker}
                onValueChange={setCountryCode}
                accessibilityLabel="Country Code"
                accessibilityHint="Select your country code"
              >
                {countries.map((country) => (
                  <Picker.Item
                    key={country.code}
                    label={`${country.flag} ${country.code}`}
                    value={country.code}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.phoneInputContainer}>
              <TextInput
                style={[styles.phoneInput, errors.mobile && touched.mobile && styles.inputError]}
                placeholder="Mobile Number"
                placeholderTextColor="#9CA3AF"
                value={mobile}
                onChangeText={(value) => handleFieldChange('mobile', value)}
                onBlur={() => handleBlur('mobile')}
                keyboardType="phone-pad"
                autoComplete="tel"
                accessibilityLabel="Mobile Number"
                accessibilityHint="Enter your mobile number"
              />
            </View>
          </View>
          {errors.mobile && touched.mobile && (
            <Text style={styles.errorText}>{errors.mobile}</Text>
          )}
        </View>

        {/* Gender Dropdown */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={gender}
            style={[styles.genderPicker, errors.gender && touched.gender && styles.inputError]}
            onValueChange={(value) => handleFieldChange('gender', value)}
            accessibilityLabel="Gender"
            accessibilityHint="Select your gender"
          >
            <Picker.Item label="Select Gender" value="" color="#9CA3AF" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
          {errors.gender && touched.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
        </View>

        {/* Terms Agreement */}
        <View style={styles.agreementContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => {
              setAgreeTerms(!agreeTerms);
              setTouched({ ...touched, terms: true });
              setTimeout(validateForm, 100);
            }}
            accessibilityLabel={agreeTerms ? 'Terms agreed' : 'Agree to terms'}
            accessibilityHint="Tap to agree to terms and conditions"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreeTerms }}
          >
            <View style={[styles.checkboxInner, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
          <View style={styles.agreementText}>
            <Text style={styles.agreementTextNormal}>I agree to the </Text>
            <TouchableOpacity accessibilityRole="link">
              <Text style={styles.agreementTextLink}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.agreementTextNormal}> and </Text>
            <TouchableOpacity accessibilityRole="link">
              <Text style={styles.agreementTextLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
        {errors.terms && touched.terms && (
          <Text style={styles.errorText}>{errors.terms}</Text>
        )}

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.signUpButton, (!isFormValid || loading) && styles.signUpButtonDisabled]}
          onPress={handleSignUp}
          disabled={!isFormValid || loading}
          accessibilityLabel="Sign Up"
          accessibilityHint="Create your account"
          accessibilityRole="button"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>or continue with</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Social Sign Up Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={handleGoogleSignIn}
            disabled={loading}
          >
            {loading && loadingProvider === 'google' ? (
              <ActivityIndicator size="small" color="#374151" style={{ marginRight: 12 }} />
            ) : (
              <Image
                source={require('../../assets/AuthenticationsAssests/Gmail.png')}
                style={styles.socialButtonIcon}
                resizeMode="contain"
              />
            )}
            <Text style={styles.socialButtonText}>Gmail</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, styles.facebookButton]} 
            onPress={handleFacebookSignIn}
            disabled={loading}
          >
            {loading && loadingProvider === 'facebook' ? (
              <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 12 }} />
            ) : (
              <Image
                source={require('../../assets/AuthenticationsAssests/Facebook.png')}
                style={styles.socialButtonIcon}
                resizeMode="contain"
              />
            )}
            <Text style={[styles.socialButtonText, styles.facebookText]}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.socialButton, styles.appleButton]} 
            onPress={handleAppleSignIn}
            disabled={loading}
          >
            {loading && loadingProvider === 'apple' ? (
              <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 12 }} />
            ) : (
              <Image
                source={require('../../assets/AuthenticationsAssests/Apple.png')}
                style={styles.socialButtonIcon}
                resizeMode="contain"
              />
            )}
            <Text style={[styles.socialButtonText, styles.appleText]}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: screenHeight * 0.06,
    paddingBottom: 40,
  },
  titlePlaceholder: {
    height: 40,
    marginBottom: 8,
  },
  subtitlePlaceholder: {
    height: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '400',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
    height: 52,
  },
  phoneContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  countryCodeContainer: {
    width: 120,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginRight: 12,
    height: 52,
    justifyContent: 'center',
  },
  countryPicker: {
    height: 52,
    color: '#111827',
  },
  phoneInputContainer: {
    flex: 1,
  },
  phoneInput: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
    height: 52,
  },
  genderPicker: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    height: 52,
    color: '#111827',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 1,
    cursor: 'pointer',
  },
  checkboxInner: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: '#E943A0',
    borderColor: '#E943A0',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  agreementText: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  agreementTextNormal: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontWeight: '400',
  },
  agreementTextLink: {
    fontSize: 14,
    color: '#E943A0',
    fontWeight: '600',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  signUpButton: {
    backgroundColor: '#E943A0',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    height: 52,
    boxShadow: '0 2px 4px rgba(233, 67, 160, 0.2)',
    elevation: 3,
    cursor: 'pointer',
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  socialButtonsContainer: {
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
    marginBottom: 12,
    height: 52,
    cursor: 'pointer',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  appleButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  socialButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  facebookText: {
    color: '#ffffff',
  },
  appleText: {
    color: '#ffffff',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  signInText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  signInLink: {
    fontSize: 16,
    color: '#E943A0',
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  signUpButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
});