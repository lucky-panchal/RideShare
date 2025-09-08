import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


const LocationFavorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFavorite, setNewFavorite] = useState({
    name: '',
    address: '',
    icon: 'location-on'
  });

  const iconOptions = [
    { name: 'home', label: 'Home' },
    { name: 'business', label: 'Work' },
    { name: 'local-cafe', label: 'Cafe' },
    { name: 'local-mall', label: 'Mall' },
    { name: 'restaurant', label: 'Restaurant' },
    { name: 'fitness-center', label: 'Gym' },
    { name: 'local-hospital', label: 'Hospital' },
    { name: 'school', label: 'School' },
    { name: 'park', label: 'Park' },
    { name: 'location-on', label: 'General' }
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favoriteLocations');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = () => {
    if (!newFavorite.name.trim() || !newFavorite.address.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const favorite = {
      id: Date.now().toString(),
      ...newFavorite,
      createdAt: new Date().toISOString()
    };

    const updatedFavorites = [...favorites, favorite];
    saveFavorites(updatedFavorites);
    
    setNewFavorite({ name: '', address: '', icon: 'location-on' });
    setShowAddModal(false);
    Alert.alert('Success', 'Favorite location added!');
  };

  const removeFavorite = (favoriteId) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this favorite location?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
            saveFavorites(updatedFavorites);
          }
        }
      ]
    );
  };

  const handleLocationSelect = (location) => {
    navigation.navigate('LocationConfirm', { selectedLocation: location });
  };

  const renderFavoriteItem = (favorite) => (
    <TouchableOpacity
      key={favorite.id}
      style={styles.favoriteItem}
      onPress={() => handleLocationSelect(favorite)}
    >
      <View style={styles.favoriteIcon}>
        <MaterialIcons name={favorite.icon} size={24} color="#DB2899" />
      </View>
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{favorite.name}</Text>
        <Text style={styles.favoriteAddress}>{favorite.address}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFavorite(favorite.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#ff4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorite Locations</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Ionicons name="add" size={24} color="#DB2899" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.length > 0 ? (
          <View style={styles.favoritesContainer}>
            {favorites.map(renderFavoriteItem)}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No Favorite Locations</Text>
            <Text style={styles.emptySubtitle}>
              Add your frequently visited places for quick access
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.addButtonText}>Add Favorite Location</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Add Favorite Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Favorite</Text>
            <TouchableOpacity onPress={addFavorite}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Home, Office, Gym"
                value={newFavorite.name}
                onChangeText={(text) => setNewFavorite({...newFavorite, name: text})}
              />
            </View>

            {/* Address Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.textInput, styles.addressInput]}
                placeholder="Enter full address"
                value={newFavorite.address}
                onChangeText={(text) => setNewFavorite({...newFavorite, address: text})}
                multiline
              />
            </View>

            {/* Icon Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Icon</Text>
              <View style={styles.iconGrid}>
                {iconOptions.map((option) => (
                  <TouchableOpacity
                    key={option.name}
                    style={[
                      styles.iconOption,
                      newFavorite.icon === option.name && styles.selectedIcon
                    ]}
                    onPress={() => setNewFavorite({...newFavorite, icon: option.name})}
                  >
                    <MaterialIcons 
                      name={option.name} 
                      size={24} 
                      color={newFavorite.icon === option.name ? '#DB2899' : '#666'} 
                    />
                    <Text style={[
                      styles.iconLabel,
                      newFavorite.icon === option.name && styles.selectedIconLabel
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  favoritesContainer: {
    padding: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  favoriteIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  favoriteAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  addButton: {
    backgroundColor: '#DB2899',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    color: '#DB2899',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  addressInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  iconOption: {
    width: '20%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedIcon: {
    backgroundColor: '#FCE4EC',
  },
  iconLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  selectedIconLabel: {
    color: '#DB2899',
    fontWeight: '600',
  },
});

export default LocationFavorites;