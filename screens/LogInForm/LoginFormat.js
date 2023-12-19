import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginFormat() {
  const navigation = useNavigation();
  const [studentID, setStudentID] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false); // State to track login failure
  const [inputError, setInputError] = useState(''); // State for input error message
  const clearFields = () => {
    setStudentID('');
    setPassword('');
  };

  const handleLogin = async () => {
    if (!studentID || !password) {
      setInputError('Input all fields!');
      return;
    }
  
    try {
      setInputError(''); // Clear input error message
      const response = await axios.get('https://abhorrent-soda-production.up.railway.app/getByUserid', {
        params: {
          studentID: studentID,
          password: password,
        },
      });
  
      console.log('Response Data:', response.data);
  
      if (response.status === 200) {
        console.log('Login successful');
        const {userid, firstName, studentID: responseStudentID } = response.data;
  
        console.log('firstName:', firstName);
        console.log('Student ID:', responseStudentID);
        console.log('UserID', userid);
  
        // Store the login details in AsyncStorage
        await AsyncStorage.setItem('userDetails', JSON.stringify({
          firstName: firstName,
          studentID: responseStudentID,
        }));
  
        navigation.navigate('MainStack', { studentID: responseStudentID, firstName: firstName, userid:userid });
      } else {
        setLoginFailed(true); // Set loginFailed to true on failure
        console.error('Login failed');
      }
    } catch (error) {
      setLoginFailed(true); // Set loginFailed to true on error
      console.error('Error:', error);
    }
  };

  const handleLoginButtonPress = () => {
    handleLogin();
  };

  const { width, height } = Dimensions.get('window');
  const inputWidth = width * 0.8;
  const inputHeight = height * 0.06;
  const buttonWidth = width * 0.8;
  const buttonHeight = height * 0.06;
  const headingMarginBottom = height * 0.1;
  const logoSize = Math.min(width * 0.6, height * 0.4);

  return (
    <View style={styles.container}>
      <Image style={[styles.logo, { width: logoSize, height: logoSize }]} source={require('./logo.png')} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { width: inputWidth, height: inputHeight }]}
          onChangeText={(text) => setStudentID(text)}
          value={studentID}
          placeholder="00-0000-0000"
          placeholderTextColor="rgba(0, 0, 0, 0.5"
        />
        <TextInput
          style={[styles.input, { width: inputWidth, height: inputHeight }]}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="********"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          secureTextEntry={true}
        />
      </View>
      {inputError ? <Text style={styles.inputErrorText}>{inputError}</Text> : null}
      {loginFailed && (
        <Text style={styles.loginFailedText}>Login failed</Text>
      )}
      <TouchableOpacity style={[styles.loginButton, { width: buttonWidth, height: buttonHeight }]}onPress={() => {
          handleLoginButtonPress();
          clearFields(); // Call clearFields when navigating
        }}
      >
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignupForm')}>
        <Text style={styles.signup}>
          Don't have an account yet? <Text style={styles.signupLink}>Signup</Text>
        </Text>
      </TouchableOpacity>
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
  heading: {
    fontSize: 50, // Use a fixed font size
    color: 'turquoise',
    fontWeight: 'bold'
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'turquoise',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: 'turquoise',
    padding: 10,
    borderRadius: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18, // Use a fixed font size
    textAlign: 'center',
  },
  forgotPassword: {
    color: 'turquoise',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  signup: {
    color: 'turquoise',
    marginTop: 10,
  },
  signupLink: {
    color: 'turquoise',
    fontWeight: 'bold',
  },
  logo: {
    resizeMode: 'contain',
    marginBottom: 13,
    marginRight: 17,
  },
  loginFailedText: {
    color: '#FAA0A0',
    fontSize: 20,
    marginBottom: 10
  },
  inputErrorText: {
    color: '#FAA0A0',
    fontSize: 20,
    marginBottom: 10


  },
});