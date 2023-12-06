import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { AntDesign } from '@expo/vector-icons';

export default function ResetPasswordConfirmation({ route }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { email } = route.params;
  const navigation = useNavigation(); // Initialize navigation

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const updatePasswordResponse = await axios.put('https://wanted-sweater-production.up.railway.app/updatepassword', {
        email: email,
        newPassword: newPassword,
      });

      if (updatePasswordResponse.status === 200) {
        // Password updated successfully
        alert('Password updated successfully');
      } else {
        // Handle any error or invalid request while updating the password
        alert('An error occurred while updating the password.');
      }
    } catch (error) {
      // Handle network or server-related errors
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./logo.png')} />
      <View style={styles.formContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <AntDesign name="back" size={34} color="#30d5c8" />
        </TouchableOpacity>
        <Text style={styles.heading}>Reset Password</Text>

        <Text style={styles.subtitle}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />

        <Text style={styles.subtitle}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <TouchableOpacity style={styles.codeButton} onPress={changePassword}>
          <Text style={styles.codeButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: 'turquoise',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formContainer: {
    width: '80%',
    marginBottom: 50, // Add some margin to separate form elements
  },
  input: {
    width: '100%', // Take up the full width of the form container
    height: 50,
    borderWidth: 1,
    borderColor: 'turquoise',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  codeButton: {
    backgroundColor: 'turquoise',
    padding: 10,
    borderRadius: 10,
    width: '50%', // Take up 50% of the form container width
    height: 40,
    alignSelf: 'center', // Center the button horizontally
    marginTop: 20, // Add margin to the top of the button
  },
  codeButtonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 170, // Adjusted margin
    color: 'turquoise',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    
    marginBottom: 10, // Adjusted margin
    color: 'turquoise',
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 13,
    marginRight: 17,
  },
});
