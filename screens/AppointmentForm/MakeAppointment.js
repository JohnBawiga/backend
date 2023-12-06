import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Modal } from 'react-native-web';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-web';
import { Ionicons } from '@expo/vector-icons';

const MakeAppointment = ({ userid }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [message, setMessage] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [messageData, setMessageData] = useState(null); // Declare messageData state

  const closeModal = () => {
    setIsConfirmationModalOpen(false);
  };

  useEffect(() => {
    if (route.params && route.params.appointmentData) {
      setSelectedAppointment(route.params.appointmentData);
    }
  }, [route.params]);

  const handleSendMessage = async () => {
    try {
      if (!selectedAppointment) {
        console.error('No appointment selected.');
        return;
      }
      const newMessageData = {
        counselorsName: selectedAppointment.counselorsName,
        date: selectedAppointment.date,
        time: selectedAppointment.time,
        message: message,
        userid: userid,
      };
      setMessageData(newMessageData); // Set messageData state

      // Open the confirmation modal when sending the message
      setIsConfirmationModalOpen(true);

      // Do not proceed with saving in the database here

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSaveMessage = async () => {
    try {
      // Save the message in the database
      const response = await axios.post('http://localhost:8080/createAppointment', messageData);

      if (response.status === 200) {
        setSentMessage(message);
        setMessage('');
        setIsConfirmationModalOpen(false); // Close the confirmation modal
        navigation.navigate('AppointmentList'); // Navigate back to AppointmentList

      } else {
        console.error('Error sending message:', response.data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleCancelMessage = () => {
    setIsConfirmationModalOpen(false); // Close the confirmation modal
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <AntDesign name="back" size={30} color="white" />
      </TouchableOpacity>
      {selectedAppointment ? (
        <View style={[styles.appointmentInfo, { backgroundColor: '#30d5c8' }]}>
          <View style={styles.appointmentInfoTitle}>
            <Text style={styles.appointmentInfoTitleText}>Appointment Information</Text>
          </View>
          <View style={styles.dateAndTime}>
            <Text style={styles.counselorName}>
              <Ionicons name="person" size={24} color="white" /> {selectedAppointment.counselorsName}
            </Text>
            <Text style={styles.counselorName}>
              <AntDesign name="message1" size={24} color="white" /> {selectedAppointment.type}
            </Text>
          </View>
          <View style={styles.dateAndTime}>
            <Text style={styles.infoText}>
              <AntDesign name="calendar" size={24} color="white" /> {selectedAppointment.date}
            </Text>
            <Text style={styles.infoText}>
              <Ionicons name="time-outline" size={24} color="white" /> {selectedAppointment.time}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noAppointmentText}>No appointment selected.</Text>
      )}

      <TextInput
        style={[styles.input, { textAlignVertical: 'top' }]}
        placeholder="Enter your message"
        multiline={true}
        numberOfLines={4}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      <TouchableOpacity style={[styles.button, !message && styles.disabledButton]} onPress={handleSendMessage}   disabled={!message}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>

      <Modal animationType="none" transparent={true} visible={isConfirmationModalOpen}>
    <View style={styles.modalView}>
    <Text style={styles.modalTitle}>Confirmation</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.modalButton, { marginRight: 8 }]} onPress={handleSaveMessage}>
          <Text style={styles.modalButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={handleCancelMessage}>
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
  
    </View>
</Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  appointmentInfo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  counselorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white'
  },
  dateAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white'
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  infoText: {
    fontSize: 16,
    color: 'white'
  },
  noAppointmentText: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 550,
  },
  button: {
    backgroundColor: '#30d5c8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'transparent',
    zIndex: 1, // Ensure it's above other elements

  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#30d5c8',
  },
  appointmentInfoTitle: { 
    backgroundColor: '#30d5c8',
    paddingBottom: 16,
    
    
  },
  appointmentInfoTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    
  },
  modalButton: {
    backgroundColor: '#30d5c8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'space-evenly',
    marginVertical: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer:{
    flexDirection: 'row'
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20, // Adjust the left margin as needed
    marginTop: 20, // Adjust the top margin as needed
    marginBottom: 20, // Optional, adjust as needed
    color: '#333', // You can adjust the color to your preference
    alignSelf: 'flex-start', // Align the title to the left
  },
  
});

export default MakeAppointment;