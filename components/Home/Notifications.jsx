import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavbar from '../shared/BottomNavbar';

const Notifications = ({ navigation }) => {
  const [hasUnreadNotifications] = useState(true);

  const notificationsData = {
    Today: [
      {
        id: 1,
        title: 'Payment confirm',
        body: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae',
        timestamp: '15 min ago',
        isHighlighted: true
      },
      {
        id: 2,
        title: 'Ride completed',
        body: 'Your ride to Downtown has been completed successfully. Thank you for choosing our service',
        timestamp: '25 min ago',
        isHighlighted: false
      }
    ],
    Yesterday: [
      {
        id: 3,
        title: 'Payment confirm',
        body: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae',
        timestamp: '1 day ago',
        isHighlighted: true
      },
      {
        id: 4,
        title: 'Driver assigned',
        body: 'Your driver John is on the way. Vehicle: Honda Civic, License: ABC-123',
        timestamp: '1 day ago',
        isHighlighted: false
      },
      {
        id: 5,
        title: 'Booking confirmed',
        body: 'Your ride booking has been confirmed. Please be ready at the pickup location',
        timestamp: '1 day ago',
        isHighlighted: false
      }
    ]
  };



  const handleNotificationPress = (notificationId) => {
    console.log('Notification pressed:', notificationId);
  };

  const renderNotificationCard = (notification) => (
    <TouchableOpacity 
      key={notification.id}
      style={[
        styles.notificationCard,
        notification.isHighlighted && styles.highlightedCard
      ]}
      onPress={() => handleNotificationPress(notification.id)}
    >
      <Text style={styles.notificationTitle}>{notification.title}</Text>
      <Text style={styles.notificationBody}>{notification.body}</Text>
      <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.screenTitle}>Notification</Text>
        
        <View style={styles.bellContainer}>
          <MaterialCommunityIcons name="bell" size={24} color="#DB2899" />
          {hasUnreadNotifications && <View style={styles.bellBadge} />}
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        decelerationRate="normal"
        contentInsetAdjustmentBehavior="automatic"
      >
        {Object.entries(notificationsData).map(([dayGroup, notifications]) => (
          <View key={dayGroup} style={styles.dayGroup}>
            <Text style={styles.dayHeader}>{dayGroup}</Text>
            {notifications.map(renderNotificationCard)}
          </View>
        ))}
      </ScrollView>

      <BottomNavbar activeTab="Notifications" navigation={navigation} hasNotifications={hasUnreadNotifications} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  bellContainer: {
    position: 'relative',
    padding: 10,
  },
  bellBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DB2899',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 90,
  },
  dayGroup: {
    marginBottom: 25,
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  highlightedCard: {
    backgroundColor: '#e8f5e8',
    elevation: 4,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },

});

export default Notifications;