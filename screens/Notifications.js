import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native'; // Import Image component
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
      .get(`https://wanted-sweater-production.up.railway.app/getAppointmentsByUserAndDecision/${userid}`)
      .then((response) => {
        // Filter the notifications with decision === true
        const filteredNotifications = response.data.filter(notification => notification.decision === true);
        setNotifications(filteredNotifications);
      })
      .catch((error) => {
        console.log('Error retrieving notifications:', error);
      });
  };
 
  return (
    <View style={styles.container}>
      <ScrollView>  
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            style={styles.notificationContainer}
            onPress={() => {
              navigation.navigate('ScheduledMeetings');
            }}
          >
            <Image source={require('./Photos/notification.png')} style={styles.logo} /> 
            <Text style={styles.notificationText}>Appointment Approval - Confirmed</Text>
            <Image source={require('./Photos/history.png')} style={styles.logo} />
          </TouchableOpacity>
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
});
