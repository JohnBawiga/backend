import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ViewRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Make an API request to fetch all appointments
    axios.get('https://welltalk-mobile-production.up.railway.app/getAppointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  const handleDeleteAppointment = async (makeappointmentid) => {
    try {
      const response = await axios.delete(`https://welltalk-mobile-production.up.railway.app/deleteUserAppointment/${makeappointmentid}`);

      if (response.status === 200) {
        // Remove the deleted appointment from the state
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== makeappointmentid));
        setModalMessage('Appointment deleted successfully!');
        setModalVisible(true);
      } else {
        setModalMessage('Failed to delete appointment');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setModalMessage('Failed to delete appointment');
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Appointments</Text>
      {appointments.length === 0 ? (
        <Text style={styles.noAppointmentsText}>No appointments found.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={styles.appointmentItem}>
                <Text style={styles.counselorName}>{item.userid}</Text>
                <Text>Date: {item.date}</Text>
                <Text>Time: {item.time}</Text>
                <Text>Message: {item.message}</Text>
                <TouchableOpacity onPress={() => handleDeleteAppointment(item.id)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}    
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification</Text>
            <Text>{modalMessage}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noAppointmentsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  appointmentItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  counselorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ViewRequests;
