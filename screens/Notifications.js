import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Notifications({ userid }) {
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios
      .get(`https://abhorrent-soda-production.up.railway.app/getAppointmentsByUserAndDecision/${userid}`)
      .then((response) => {
        const filteredNotifications = response.data.filter(notification => notification.decision === true);
        setNotifications(filteredNotifications);
      })
      .catch((error) => {
        console.log('Error retrieving notifications:', error);
      });
  };

  const handleDeleteNotification = (notificationId) => {
    // Update the local state by filtering out the notification with the given ID
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationContainer}>
            <TouchableOpacity
              style={styles.notificationContent}
              onPress={() => {
                navigation.navigate('ScheduledMeetings');
              }}
            >
              <Image source={require('./Photos/notification.png')} style={styles.logo} />
              <Text style={styles.notificationText}>Appointment Approval - Confirmed</Text>
              <Image source={require('./Photos/history.png')} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNotification(notification.id)} // Replace 'id' with your actual notification ID property
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#ffffff',
    backgroundColor: '#ffffff',
  },
  notificationContainer: {
    backgroundColor: '#30d5c8',
    padding: 10,
    height: 70,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: '#ffffff',
  },
  logo: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: '#ff3333',
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#ffffff',
  },
});
