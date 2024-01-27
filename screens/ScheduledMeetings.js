import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ScheduledMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetailsString = await AsyncStorage.getItem('userDetails');
  
        if (userDetailsString) {
          const userDetails = JSON.parse(userDetailsString);
          const storedStudentID = userDetails.studentID;
  
          const response = await axios.get(`https://welltalk.azurewebsites.net/appointments/student/${storedStudentID}`);
          const data = response.data;
  
          // Check if data is a string and parse it
          const meetingsArray = typeof data === 'string' ? JSON.parse(data) : data;
  
          // Ensure meetingsArray is an array before setting the state
          if (Array.isArray(meetingsArray)) {
            setMeetings(meetingsArray);
          } else {
           
          }
        } else {
          
        }
      } catch (error) {
        
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.meetingsContainer}>
          <Text style={styles.sectionHeader}>Upcoming Meetings</Text>
          {meetings
            .filter((meeting) => !meeting.isDone)
            .map((meeting) => (
              <View key={meeting.id} style={styles.meetingItemContainer}>
                <View style={styles.profileContainer}>
                  <MaterialCommunityIcons name="face-man-profile" size={24} color="#30d5c8" />
                  <Text style={styles.counselorName}> {meeting.counselor.firstName} {meeting.counselor.lastName}</Text>
                </View>
                <Text style={{ color: '#30d5c8' }}>
  <MaterialIcons name="date-range" size={20} color="#30d5c8" />{'  '}
  {new Date(meeting.start_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</Text>
<Text style={{ color: '#30d5c8' }}>
  <Ionicons name="time" size={24} color='#30d5c8' />{' '}
  {new Date(meeting.start_date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}
</Text>
              </View>
            ))}
           
            {meetings.filter((meeting) => meeting.isDone).length === 0 && (
          <Text style={styles.Noappoint}>No Upcoming Meetings</Text>
        )}
        
        </View>

        <View style={styles.meetingsContainer}>
          <Text style={styles.sectionHeader1}>Finished Meetings</Text>
          {meetings
            .filter((meeting) => meeting.isDone)
            .map((meeting) => (
              <View key={meeting.id} style={styles.meetingItemContainer}>
              <View style={styles.profileContainer}>
                  <MaterialCommunityIcons name="face-man-profile" size={24} color="#FAA0A0" />
                  <Text style={styles.counselorName1}> {meeting.counselor.firstName} {meeting.counselor.lastName}</Text>
                </View>
                <Text style={{ color: '#FAA0A0' }}>
  <MaterialIcons name="date-range" size={20} color="#FAA0A0" />{'  '}
  {new Date(meeting.start_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
  
</Text>
<Text style={{ color: '#FAA0A0' }}>
  <Ionicons name="time" size={24} color="#FAA0A0" />{' '}
  {new Date(meeting.start_date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}
</Text>
              </View>
            ))}
            
            {meetings.filter((meeting) => meeting.isDone).length === 0 && (
          <Text style={styles.Noappoint1}>No Finished Meetings</Text>
        )}
        
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  meetingsContainer: {
    marginBottom: 16,
  },
  meetingItemContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#30d5c8"
  },
  sectionHeader1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#FAA0A0"
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  counselorName:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#30d5c8"
  },
  counselorName1:{
    fontSize: 18,
    fontWeight: 'bold',
    color: "#FAA0A0"
  },
  Noappoint:{
    fontSize: 16,
    fontWeight: 'bold',
    color: "#30d5c8",
    textAlign: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    flex: 1, // Take up all available space
  }, 
  Noappoint1:{
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FAA0A0",
    textAlign: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    flex: 1, // Take up all available space
  }

});

export default ScheduledMeetings;