import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import axios from 'axios';

export default function EditJournalV2({ navigation, route }) {
  const { journalID } = route.params;
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [mood, setMood] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  useEffect(() => {
    fetchJournalEntry();
  }, []);

  const fetchJournalEntry = () => {
    axios
      .get(`https://welltalk-mobile-production.up.railway.app/journalGet/${journalID}`)
      .then(response => {
        const { title, type, date, mood, message } = response.data;
        setTitle(title);
        setType(type);
        setDate(date);
        setMood(mood);
        setMessage(message);
      })
      .catch(error => {
        console.log('Error retrieving journal entry:', error);
      });
  };

  const handleSaveChanges = () => {
    setShowSaveConfirmation(true);
  };

  const confirmSaveChanges = () => {
    axios
      .put(`https://welltalk-mobile-production.up.railway.app/journal/${journalID}`, {
        title,
        type,
        date,
        mood,
        message
      })
      .then(response => {
        console.log('Journal entry updated successfully:', response.data);
        setShowSaveConfirmation(false);
        navigation.goBack(); // Go back to JournalList
      })
      .catch(error => {
        console.log('Error updating journal entry:', error);
      });
  };

  const cancelSaveChanges = () => {
    setShowSaveConfirmation(false);
  };

  const handleDeleteEntry = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://welltalk-mobile-production.up.railway.app/journal/${journalID}`)
      .then(() => {
        console.log('Journal entry deleted successfully');
        setShowConfirmation(false);
        navigation.goBack(); // Go back to JournalList
        navigation.navigate('JournalList'); // Reload JournalList screen
      })
      .catch(error => {
        console.log('Error deleting journal entry:', error);
        setShowConfirmation(false);
      });
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <Text style={styles.label}>Type:</Text>
        <Switch
        value={type === 'Private'}
       onValueChange={(value) => setType(value ? 'Private' : 'Public')}
      trackColor={{ true: '#30d5c8',false: '#fc6467' }}
/>
<Text style={styles.switchText}>{type}</Text>
      </View>
      <Text style={styles.displayText}>Date: {date}</Text>
      <Text style={styles.displayText}>Mood: {mood}</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input2}
        textAlignVertical="top"

        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteEntry}>
        <Text style={styles.buttonText}>Delete Entry</Text>
      </TouchableOpacity>

      <Modal visible={showConfirmation} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this entry?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmDelete}>
                <Text style={styles.modalButtonText1}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={cancelDelete}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showSaveConfirmation} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to save these changes?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmSaveChanges}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={cancelSaveChanges}>
                <Text style={styles.modalButtonText1}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
  switchText: {
    marginLeft: 5,
  },
  displayText: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#30d5c8',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#fc6467',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input2: {
    height:'60%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#30d5c8',
  },
  modalButtonText1:{
    fontSize: 16,
    color: '#fc6467',
  }
});
