import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function ResetPasswordConfirmation({ route }) {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { email } = route.params;
  const navigation = useNavigation();

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setModalVisible(true);
      return;
    }

    try {
      const updatePasswordResponse = await axios.put('https://welltalk-mobile-production.up.railway.app/updatepassword', {
        email: email,
        newPassword: newPassword,
      });

      if (updatePasswordResponse.status === 200) {
        setModalMessage('Password updated successfully');
        setModalVisible(true);
      } else {
        setModalMessage('An error occurred while updating the password.');
        setModalVisible(true);
      }
    } catch (error) {
      console.error(error);
      setModalMessage('An error occurred. Please try again later.');
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Login');
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

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color:'#50d3c8' }}>{modalMessage}</Text>
            <Pressable onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'turquoise',
    fontSize: 16,
    marginTop: 10,
  },
});
