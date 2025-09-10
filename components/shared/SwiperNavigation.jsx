import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const SwiperNavigation = ({ 
  activeTab, 
  onTabPress, 
  hasNotifications = false,
  style = {} 
}) => {
  const tabs = [
    { name: 'Home', icon: 'home', component: 'Home' },
    { name: 'Favorites', icon: 'heart', component: 'Favorites' },
    { name: 'Wallet', icon: 'wallet', component: 'Wallet', isCenter: true },
    { name: 'Notifications', icon: 'bell', component: 'Notifications', hasNotification: hasNotifications },
    { name: 'Profile', icon: 'person', component: 'Profile' },
  ];

  return (
    <View style={[styles.bottomNavbar, style]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab.name}
          style={tab.isCenter ? styles.centerNavButton : styles.navButton}
          onPress={() => onTabPress(index, tab.name)}
        >
          {tab.isCenter ? (
            <View style={styles.walletIcon}>
              <Ionicons name={tab.icon} size={28} color="#fff" />
            </View>
          ) : (
            <>
              <View style={tab.hasNotification ? styles.notificationWrapper : null}>
                {tab.name === 'Notifications' ? (
                  <MaterialCommunityIcons 
                    name={tab.icon} 
                    size={24} 
                    color={activeTab === index ? '#DB2899' : '#666'} 
                  />
                ) : (
                  <Ionicons 
                    name={tab.icon} 
                    size={24} 
                    color={activeTab === index ? '#DB2899' : '#666'} 
                  />
                )}
                {tab.hasNotification && <View style={styles.notificationDot} />}
              </View>
              <Text style={[styles.navLabel, activeTab === index && styles.activeNavLabel]}>
                {tab.name}
              </Text>
            </>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 80,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
    paddingVertical: 8,
  },
  centerNavButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    minHeight: 60,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#DB2899',
    fontWeight: '600',
  },
  walletIcon: {
    backgroundColor: '#DB2899',
    borderRadius: 30,
    padding: 16,
    elevation: 8,
    shadowColor: '#DB2899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    transform: [{ translateY: -8 }],
  },
  notificationWrapper: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DB2899',
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default SwiperNavigation;