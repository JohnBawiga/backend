import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SetAppointment = ({ firstName, userid }) => {
  const [date, setAppointmentDate] = useState('');
  const [time, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Set the default date and time to the current date and time
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MMMM dd, yyyy');
    const formattedTime = format(currentDate, 'hh:mm a'); // Use 'a' for AM/PM

    setAppointmentDate(formattedDate);
    setAppointmentTime(formattedTime);
  }, []);

  const handleAppointmentSubmit = async () => {
    // Validate the input (you can add more validation as needed)
    if (!date || !time || !message) {
      alert('Please fill in all fields.');
      return;
    }

    setShowModal(true);
  };

  const handleSetAppointment = async () => {
    // Create an appointment object with the collected data
    const appointment = {
      userid,
      date,
      time,
      message,
    };
    try {
      // Send a POST request to your server
    const response = await axios.post('https://welltalk-mobile-production.up.railway.app/requestAppointment?user=' + userid, appointment);

      if (response.status === 200) {
        // Appointment saved successfully
        setMessage("");
      } else {
        alert('Failed to save appointment.');
      }

      // Optionally, you can reset the form after submission
      setMessage('');
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Error saving appointment. Please try again later.');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    
      <View style={styles.container}>
        <View style={[styles.infoContainer, styles.nameContainer]}>
          <Text style={styles.boldText}> {firstName}</Text>
          <View style={styles.dateTimeContainer}>
            <MaterialIcons name="date-range" size={24} color="white" />
            <Text style={styles.dateTimeText}>{date}</Text>
            <AntDesign name="clockcircleo" size={24} color="white" />
            <Text style={styles.dateTimeText}>{time}</Text>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={message}
            onChangeText={(text) => setMessage(text)}
            textAlignVertical="top"

            multiline={true}
            placeholder="Enter a message"
          />
            
          <TouchableOpacity
            style={[
              styles.button,
              message ? styles.buttonEnabled : styles.buttonDisabled, // Apply different styles based on the message state
            ]}
            onPress={handleAppointmentSubmit}
            disabled={!message}
          >
            <Text style={styles.buttonText}>Set Appointment</Text>
          </TouchableOpacity>

        </View>

        <Modal
          visible={showModal}
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSetAppointment}
                >
                  <Text style={styles.modalButtonText}>Set</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton1, styles.modalButtonWithMargin]}
                  onPress={handleCancel}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    
  },
  infoContainer: {  
    marginBottom: 20,
    borderBottomEndRadius:15,
    borderBottomStartRadius:15
  },
  nameContainer: {
    backgroundColor: '#30d5c8',
    color: 'white',
    padding: 10,
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  },
  dateTimeContainer: {
    backgroundColor: '#30d5c8', // Background color for date and time container
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 10,
  },
  dateTimeText: {
    color: 'white', // Font color for date and time
    fontSize: 18,
  },
  messageContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    
  },
  textarea: {
    borderRadius: 15,
    height:'80%',
    
  },
  button: {
    backgroundColor: '#30d5c8',
    borderRadius: 10, // Customize border radius here
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: 'gray', // Change to the color you prefer for disabled state
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
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#30d5c8',
    borderRadius: 10,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  modalButton1: {
    backgroundColor: '#FAA0A0',
    borderRadius: 10,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 20, // You can adjust the size
    color: '#30d5c8',
    marginBottom: 10, // Add some spacing below the text
  },
  modalButtonText: {
    color: 'white',
    fontsSize: 15,
  },
  modalCancelText: {
    color: 'white',
    fontsSize: 15,
  },
  modalButtonWithMargin: {
    marginLeft: 10, // Add margin to the right of the "Cancel" button
  },
});




export default SetAppointment;
