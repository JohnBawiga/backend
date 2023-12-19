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
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    try {
      // Step 1: Send a request to your backend to initiate the reset process
      const response = await axios.post('https://abhorrent-soda-production.up.railway.app/forgotpassword', {
        email: email,
      });
      
      // Step 2: Check for a successful response from the server
      if (response.status === 200) {
        // Password reset email sent successfully
        alert('Password reset email sent successfully');
        navigation.navigate('ResetPasswordConfirmation', { email }); // Navigate to confirmation screen
      } else {
        // Handle any error or invalid email
        alert('Invalid email or an error occurred.');
      }
    } catch (error) {
      // Handle network or server-related errors
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="back" size={34} color="#30d5c8" />
        </TouchableOpacity>
      <Image style={styles.logo} source={require('./logo.png')} />
      <View>
        <Text style={styles.heading}>Password Reset</Text>
        <Text style={styles.subtitle}>Enter your email address</Text>
        <TextInput 
          style={styles.email}
          placeholder="Johndoe@gmail.com"
          value={email}
          placeholderTextColor="rgba(0, 0, 0, 0.5)" 
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={styles.codeButton} onPress={handleForgotPassword}>
          <Text style={styles.codeButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  email: {
    width: 275,
    height: 50,
    borderWidth: 1,
    borderColor: 'turquoise',
    marginBottom: 100,
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  codeButton: {
    backgroundColor: 'turquoise',
    padding: 10,
    borderRadius: 10,
    width: 100,
    height: 40,
    marginBottom: 55,
  },
  codeButtonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 100,
    color: 'turquoise',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 70,
    color: 'turquoise',
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 40,
    marginRight: 17,
  },
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
});
