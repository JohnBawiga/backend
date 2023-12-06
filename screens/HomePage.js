import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomePage = ({ firstName }) => {
  const navigation = useNavigation();
  const [lastPost, setLastPost] = useState(null);
  const [latestMeeting, setLatestMeeting] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetailsString = await AsyncStorage.getItem('userDetails');
  
        if (userDetailsString) {
          const userDetails = JSON.parse(userDetailsString);
          const storedStudentID = userDetails.studentID;
  
          const response = await axios.get(`https://welltalk.onrender.com/appointments/student/${storedStudentID}`);
          const data = response.data;
  
          // Assuming meetings are sorted in descending order by start_date
          const sortedMeetings = Array.isArray(data)
  ? data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
  : [];

// Filter out meetings with isDone equal to 0
const filteredMeetings = sortedMeetings.filter(meeting => meeting.isDone === false);

// Pick the first meeting from the filtered array
const latestMeetingData = filteredMeetings[0];
setLatestMeeting(latestMeetingData);
        } else {
          console.error('User details not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching scheduled meetings:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch the latest post from your backend API
    fetch('https://welltalk-backend.onrender.com/posts')
      .then((response) => response.json())
      .then((data) => {
        // Assuming posts are sorted in descending order by id
        const sortedPosts = data.sort((a, b) => b.id - a.id);

        // Pick the first post from the sorted array
        const latestPost = sortedPosts[0];

        setLastPost(latestPost);
      })
      .catch((error) => console.error('Error fetching latest post:', error));
  }, []);

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications');
  };

  const handleViewProfilePress = () => {
    navigation.navigate('ViewProfile');
  };

  const handleProgressReportPress = () => {
    navigation.navigate('ProgressReport');
  };

  const handleReminderPress = () => {
    navigation.navigate('Reminder');
  };

  const handleScheduleMeetingsPress = () => {
    navigation.navigate('ScheduledMeetings');
  };

  const handleSignOut = () => {
    navigation.navigate('Login');
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>
          <Text style={styles.welcomeText}> Welcome back!</Text>
          {'\n'}
          <Text style={styles.userName}>{firstName}</Text>
        </Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
          <Image source={require('./Photos/menu.png')} style={styles.headerImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleScheduleMeetingsPress}>
  {latestMeeting ? (
    <View style={styles.squareContainer}>
      <View style={styles.square1}>
        <Text style={styles.containerTitle}>Upcoming Meeting</Text>
        <View style={styles.profileContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="face-man-profile" size={24} color="white" />
          </View>
          <Text style={styles.title1}> {latestMeeting.counselor.firstName} {latestMeeting.counselor.lastName}</Text>
        </View>
        <Text style={styles.date1}>
          <MaterialIcons name="date-range" size={20} color="white" />{'  '}
          {new Date(latestMeeting.start_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.time1}>
          <Ionicons name="time" size={24} color="white" />{' '}
          {new Date(latestMeeting.start_date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.squareContainer}>
      <View style={styles.square1}>
      <Text style={styles.containerTitle}>Upcoming Meeting</Text>

    <Text style={styles.noMeetingsText}>No Upcoming Appointments</Text>
    </View>
    </View>
  )}
</TouchableOpacity>

      <TouchableOpacity onPress={handleReminderPress}>
        {lastPost && (
          <View style={styles.squareContainer}>
            <View style={styles.square}>
              <Text style={styles.containerTitle}>Latest Post</Text>
              <Text style={styles.title}>{lastPost.title.length > 45 ? `${lastPost.title.substring(0, 45)}...` : lastPost.title}</Text>
              <Text style={styles.postTitle1}>
                {lastPost.counselor.firstName} {lastPost.counselor.lastName}
              </Text>
              <Text style={styles.userType}>{lastPost.counselor.userType}</Text>
              <Text style={styles.description}>{lastPost.content.length > 155 ? `${lastPost.content.substring(0, 155)}...` : lastPost.content}</Text>
              {lastPost.photoContent && (
                <View>
                  <Image source={{ uri: `data:image/jpeg;base64,${lastPost.photoContent}` }} style={styles.postImage} />
                </View>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>

      <Modal transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Image
                source={require('./Photos/Arrow.png')}
                style={styles.sidebarImage1}
              />
            </TouchableOpacity>


            <TouchableOpacity style={styles.sidebarItem} onPress={() => { handleViewProfilePress(); toggleModal(); }}>
              <Image source={require('./Photos/Profile.png')} style={styles.sidebarImage} />
              <Text>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarItem} onPress={() => { handleNotificationsPress(); toggleModal(); }}>
              <Image source={require('./Photos/Notifications.png')} style={styles.sidebarImage} />
              <Text>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarItem} onPress={() => { handleProgressReportPress(); toggleModal(); }}>
              <Image source={require('./Photos/progress.png')} style={styles.sidebarImage} />
              <Text>Progress Report</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { handleSignOut(); toggleModal(); }}>
              <Image source={require('./Photos/logout.png')} style={styles.sidebarImage} />
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: width * 0.04,
    paddingTop: height * 0.04,
  },
  header: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingBottom: 20,
  },
  headerImage: {
    width: 40,
    height: 40,
  },
  squareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  square: {
    width: 340,
    height: 260,
    backgroundColor: '#30d5c8',
    marginHorizontal: 8,
    borderRadius: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    left: 290,
    right: 0,
    padding: 18,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  modalContent: {
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sidebarImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  containerTitle: {
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 20,
    color: '#fff',
  },
  welcomeText: {
    fontSize: 20,
    color: '#30d5c8',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#30d5c8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    right: 8,
  },
  title1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    
    
  },
  date1: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 20,
    right: 8,
  },
  time1: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 20,
    right: 8,
  },
  description: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingTop: 10,
    right: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  postTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 17,
    color: 'white',
    paddingTop: 8,
  },
  userType: {
    color: 'white',
    paddingLeft: 17,
  },
  
  type1: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 16,
  },
  square1: {
    width: 340,
    height: 160,
    backgroundColor: '#30d5c8',
    marginHorizontal: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  noMeetingsText: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 16,
    fontWeight: 'bold',
    paddingTop: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8

  },
  iconContainer: {
    paddingLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  sidebarImage1: {
    width: 24,
    height: 24,
  },

});

export default HomePage;
