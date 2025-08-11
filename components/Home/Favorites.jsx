import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavbar from '../shared/BottomNavbar';

const Favorites = ({ navigation }) => {
  const [favorites] = useState([
    {
      id: 1,
      label: 'Home',
      address: '123 Main St, Springfield, IL 62704'
    },
    {
      id: 2,
      label: 'Work',
      address: '456 Business Ave, Downtown, IL 62701'
    },
    {
      id: 3,
      label: 'Gym',
      address: '789 Fitness Blvd, Health District, IL 62702'
    }
  ]);
  const handleDelete = (id) => {
    // Mock delete functionality - disabled for now
    console.log('Delete favorite with id:', id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <Text style={styles.screenTitle}>Favourite</Text>
      
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        decelerationRate="normal"
        contentInsetAdjustmentBehavior="automatic"
      >
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No favourites yet</Text>
            <Text style={styles.emptySubtext}>Add places you visit frequently</Text>
          </View>
        ) : (
          favorites.map((favorite) => (
            <View key={favorite.id} style={styles.favoriteCard}>
              <View style={styles.cardContent}>
                <View style={styles.locationInfo}>
                  <Text style={styles.labelText}>{favorite.label}</Text>
                  <Text style={styles.addressText}>{favorite.address}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDelete(favorite.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <BottomNavbar activeTab="Favorites" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 15,
    marginLeft: 5,
    ':hover': {
      cursor: 'pointer',
    },
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 90,
  },
  favoriteCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  locationInfo: {
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    ':hover': {
      cursor: 'pointer',
    },
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 15,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },

});

export default Favorites;