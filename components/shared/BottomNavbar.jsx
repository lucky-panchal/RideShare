import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const BottomNavbar = ({ activeTab, navigation, hasNotifications = true }) => {
  const handleTabPress = (tabName) => {
    if (tabName !== activeTab) {
      navigation.navigate(tabName);
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Home')}>
        <Ionicons 
          name="home" 
          size={24} 
          color={activeTab === 'Home' ? '#DB2899' : '#666'} 
        />
        <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Favorites')}>
        <Ionicons 
          name="heart" 
          size={24} 
          color={activeTab === 'Favorites' ? '#DB2899' : '#666'} 
        />
        <Text style={[styles.navText, activeTab === 'Favorites' && styles.activeNavText]}>Favorites</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.navItem, styles.walletNavItem]} onPress={() => handleTabPress('Wallet')}>
        <View style={styles.walletButton}>
          <Ionicons name="wallet" size={28} color="#fff" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Notifications')}>
        <View style={styles.notificationContainer}>
          <MaterialCommunityIcons 
            name="bell" 
            size={24} 
            color={activeTab === 'Notifications' ? '#DB2899' : '#666'} 
          />
          {hasNotifications && <View style={styles.notificationBadge} />}
        </View>
        <Text style={[styles.navText, activeTab === 'Notifications' && styles.activeNavText]}>Notifications</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Profile')}>
        <Ionicons 
          name="person" 
          size={24} 
          color={activeTab === 'Profile' ? '#DB2899' : '#666'} 
        />
        <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      cursor: 'pointer',
    },
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#DB2899',
    fontWeight: '600',
  },
  walletNavItem: {
    position: 'relative',
  },
  walletButton: {
    backgroundColor: '#DB2899',
    borderRadius: 30,
    padding: 15,
    elevation: 5,
    shadowColor: '#DB2899',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    position: 'absolute',
    top: -35,
    left: '50%',
    transform: [{ translateX: -30 }],
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DB2899',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default BottomNavbar;