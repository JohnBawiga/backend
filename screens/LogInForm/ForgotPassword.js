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

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('https://welltalk-mobile-production.up.railway.app/forgotpassword', {
        email: email,
      });

      if (response.status === 200) {
        setModalMessage('Password reset email sent successfully');
        setModalVisible(true);
        navigation.navigate('ResetPasswordConfirmation', { email });
      } else {
        setModalMessage('Invalid email or an error occurred.');
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

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#50d3c8'}}>{modalMessage}</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation:5
    
  },
  closeButtonText: {
    color: 'turquoise',
    fontSize: 16,
    marginTop: 10,
  },
});
