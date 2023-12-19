import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation} from '@react-navigation/native';
import {  useFocusEffect } from '@react-navigation/native';

export default function ViewProfile({ userid }) {
    const navigation = useNavigation();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course: '',
    phoneNumber: '',
    password: '',
    studentID: '',

  });
  
  useEffect(() => {
    fetchUserEntry();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserEntry();
    }, [userid])
  );

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  const fetchUserEntry = () => {
    axios
      .get(`https://abhorrent-soda-production.up.railway.app/userGet/${userid}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.log('Error retrieving user:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./usericon.png')} style={styles.tinyLogo} />
      </View>
      <Text style={styles.label1}>Name</Text>
      <TextInput
        placeholder="Name"
        disabled
        style={styles.input}
        value={user.firstName + " " + user.lastName}
      />
      <Text style={styles.label2}>Email</Text>
      <TextInput
        placeholder="Email"
        disabled
        style={styles.input}
        value={user.email}
      />
      <Text style={styles.label3}>Program/Course</Text>
      <TextInput
        placeholder="Program/Course"
        disabled
        style={styles.input}
        value={user.course}
      />
      <Text style={styles.label4}>Contact Number</Text>
      <TextInput
        placeholder="Contact Number"
        disabled
        style={styles.input}
        value={user.phoneNumber}
      />
      <Text style={styles.label5}>ID Number</Text>
      <TextInput
        placeholder="ID Number"
        disabled
        style={styles.input}
        value={user.studentID}
      />
     
     <View style={styles.containerButton}>
  <TouchableOpacity
    style={styles.editProfileButton}
    onPress={navigateToEditProfile}
  >
    <Text style={styles.editProfileButtonText}>Edit Profile</Text>
  </TouchableOpacity>
</View>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      color: '#ffffff',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    input: {
      width: 300,
      height: 44,
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#ffffff',
      borderColor: '#30D5C8',
      borderWidth: 1,
      borderRadius: 10,
      activeUnderlineColor: 'red',
    },
    tinyLogo: {
      backgroundColor: '#ffffff',
      position: 'relative',
      top: 0,
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
    },
    label1: {
      position: 'relative',
      right: 130,
    },
    label2: {
      position: 'relative',
      right: 130,
    },
    label3: {
      position: 'relative',
      right: 98,
    },
    label4: {
      position: 'relative',
      right: 98,
    },
    label5: {
      position: 'relative',
      right: 115,
    },
    label6: {
      position: 'relative',
      right: 120,
    },
    editProfileButton: {
      backgroundColor: '#30d5c8',
      borderRadius: 10,
      padding: 10,
      marginTop: 20,
    },
    editProfileButtonText: {
      color: '#ffffff',
      fontSize: 16,
      textAlign: 'center',
    },
  });

