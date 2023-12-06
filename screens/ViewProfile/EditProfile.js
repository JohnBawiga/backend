import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

export default function EditProfile({ userid }) {
  const [user, setUser] = useState({
    phoneNumber: '', // Set default value for phoneNumber
    password: '',
    email: '',
    firstName: '', // Add other fields with default values if needed
    lastName: '',
    course: '',
  });
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const showConfirmationModal = () => {
    setConfirmationModalVisible(true);
  };

  const hideConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const showSuccessModal = () => {
    setSuccessModalVisible(true);
  };

  const hideSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  useEffect(() => {
    fetchUserEntry();
  }, []);

  const handleSaveChanges = () => {
    // Prepare the data to send in the request body
    showConfirmationModal();
  };

  const handleSave = () => {
    // Prepare the data to send in the request body
    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      course: user.course,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    };

    axios
      .put(`https://wanted-sweater-production.up.railway.app/user/${userid}`, updatedUser)
      .then((response) => {
        console.log('User data updated successfully:', response.data);
        showSuccessModal(); // Show the success modal
      })
      .catch((error) => {
        console.log('Error updating user data:', error);
      });
  };

  const fetchUserEntry = () => {
    axios
      .get(`https://wanted-sweater-production.up.railway.app/userGet/${userid}`)
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
      <Text style={styles.label6}>Name</Text>
      <TextInput
        placeholder="Name"
        disabled
        style={styles.input}
        value={user.firstName + ' ' + user.lastName}
      />
      <Text style={styles.label7}>Program/Course</Text>
      <TextInput
        placeholder="Program/Course"
        disabled
        style={styles.input}
        value={user.course}
      />

      <Text style={styles.label7}>Contact Number</Text>
      <TextInput
        placeholder="Contact Number"
        style={styles.input1}
        value={user.phoneNumber}
        onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
      />
      <Text style={styles.label6}>Password</Text>
      <TextInput
        placeholder="Password"
        style={styles.input1}
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
      />
      <Text style={styles.label6}>Email</Text>
      <TextInput
        placeholder="Email"
        style={styles.input1}
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.editProfileButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isConfirmationModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to save changes?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  hideConfirmationModal();
                  // Perform the actual save operation here
                  handleSave();
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonNo}
                onPress={() => {
                  hideConfirmationModal();
                }}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={isSuccessModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Success! User data updated.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                hideSuccessModal();
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  input1: {
    width: 300,
    height: 44,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderColor: '#FAA0A0',
    borderWidth: 1,
    borderRadius: 10,
  },

  label6: {
    position: 'relative',
    right: 120,
  },
  label7: {
    position: 'relative',
    right: 92,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#30d5c8",
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButton: {
    flex: 1,

    backgroundColor: '#30d5c8',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtonNo: {
    flex: 1,
    backgroundColor: '#FAA0A0',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
