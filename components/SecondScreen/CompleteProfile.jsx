import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

// Mock database
const mockDB = {
  profile: {
    avatar: null,
    fullName: '',
    mobile: '',
    email: '',
    street: '',
    city: '',
    district: ''
  }
};

const CompleteProfile = ({ navigation }) => {
  const [profileData, setProfileData] = useState(mockDB.profile);
  const [avatar, setAvatar] = useState(null);
  const fullNameRef = useRef(null);

  const pickImage = async () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera access is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setProfileData(prev => ({ ...prev, avatar: result.assets[0].uri }));
    }
  };

  const openGallery = async () => {
    try {
      if (Platform.OS === 'web') {
        // For laptop/web - opens file manager
        const result = await DocumentPicker.getDocumentAsync({
          type: 'image/*',
          copyToCacheDirectory: false,
        });
        
        if (result.type === 'success') {
          setAvatar(result.uri);
          setProfileData(prev => ({ ...prev, avatar: result.uri }));
        }
      } else {
        // For mobile devices - opens gallery
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permission.status !== 'granted') {
          Alert.alert('Permission Required', 'Please enable gallery access in settings.');
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          setAvatar(result.assets[0].uri);
          setProfileData(prev => ({ ...prev, avatar: result.assets[0].uri }));
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image.');
    }
  };

  const handleSave = () => {
    mockDB.profile = { ...profileData, avatar };
    Alert.alert('Success', 'Profile saved successfully!');
  };

  const handleCancel = () => {
    setProfileData(mockDB.profile);
    setAvatar(mockDB.profile.avatar);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image
          source={avatar ? { uri: avatar } : { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' }}
          style={styles.avatar}
        />
        <View style={styles.cameraIcon}>
          <Text style={styles.cameraText}>📷</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <TextInput
          ref={fullNameRef}
          style={styles.input}
          placeholder="Full Name"
          value={profileData.fullName}
          onChangeText={(text) => setProfileData(prev => ({ ...prev, fullName: text }))}
          autoFocus
        />

        <View style={styles.phoneContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder="Mobile Number"
            value={profileData.mobile}
            onChangeText={(text) => setProfileData(prev => ({ ...prev, mobile: text }))}
            keyboardType="phone-pad"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={profileData.email}
          onChangeText={(text) => setProfileData(prev => ({ ...prev, email: text }))}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Street"
          value={profileData.street}
          onChangeText={(text) => setProfileData(prev => ({ ...prev, street: text }))}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={profileData.city}
          onChangeText={(text) => setProfileData(prev => ({ ...prev, city: text }))}
        />

        <TextInput
          style={styles.input}
          placeholder="District"
          value={profileData.district}
          onChangeText={(text) => setProfileData(prev => ({ ...prev, district: text }))}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
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
    paddingTop: 40,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cameraText: {
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    marginBottom: 20,
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
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCode: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    minWidth: 60,
    textAlign: 'center',
  },
  phoneInput: {
    flex: 1,
    marginBottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#e91e63',
    borderRadius: 8,
    paddingVertical: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CompleteProfile;