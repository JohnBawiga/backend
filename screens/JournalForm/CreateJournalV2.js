import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import axios from 'axios';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
export default function CreateJournalV2({ userid }) {
  const navigation = useNavigation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [DatePickerShow, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD');
  const [moodModalVisible, setMoodModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('Private');
  const [showErrorModal, setShowErrorModal] = useState(false);


  const handleSendButtonPress = () => {
    if (!title || !message || !mood) {
      setShowErrorModal(true); // Show error modal

      return;
    }

    const requestBody = {
      userid:userid,
      type: type,
      date: date, 
      mood: mood,
      title: title,
      message: message,
    };

    axios
      .post('https://welltalk-mobile-production.up.railway.app/journal', requestBody)
      .then((response) => {
        console.log('Journal entry saved successfully!');
        setShowSuccessModal(true);
        setTitle('');
        setDate(new Date().toISOString().split('T')[0]);
        setMood('');
        setMessage('');
        setType('Private');
      })
      .catch((error) => {
        console.log('Error saving journal entry:', error);
      });
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleMoodPress = () => {
    setMoodModalVisible(true);
  };

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
  };

  const openDatePicker = () => {
    setOpenDatePicker(true);
  };

  const closeDatePicker = () => {
    setOpenDatePicker(false);
  };

  const closeMood = () => {
    setMoodModalVisible(false);
  };

  const handleDatePress = () => {
    setOpenDatePicker(!DatePickerShow);
  };

  const handleChange = (propDate) => {
    const formattedDate = getFormatedDate(propDate, 'YYYY-MM-DD');
    setDate(formattedDate);
  };
  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Type:</Text>
        <View style={styles.rowContent}>
          <Text style={styles.value}>{type}</Text>
          <Switch
            value={type === 'Private'}
            onValueChange={() => setType(type === 'Private' ? 'Public' : 'Private')}
            color="#30d5c8"
          />
        </View>
      </View>
      <Modal transparent={true} visible={showErrorModal} onRequestClose={handleErrorModalClose}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Image source={require('../Photos/error.png')} style={styles.errorImage} />
      <Text style={styles.errormodalText}>Please fill in all required fields.</Text>
      <TouchableOpacity style={styles.okButton} onPress={handleErrorModalClose}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity onPress={handleDatePress}>
          <Text>{date}</Text>
        </TouchableOpacity>
        <Modal animationType="fade" transparent={true} visible={DatePickerShow} onRequestClose={closeDatePicker}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                selected={date}
                minimumDate={startDate}
                onDateChange={handleChange}
              />
              <TouchableOpacity onPress={closeDatePicker}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>Mood:</Text>
        <TouchableOpacity onPress={handleMoodPress}>
          <Text>{mood || 'Select Mood'}</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={moodModalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>How are you feeling today?</Text>
            <View style={styles.moodContainer}>
              <TouchableOpacity onPress={() => handleMoodSelection('Terrible')}>
                <View style={styles.moodItem}>
                  <Image style={styles.mood} source={require('../Photos/1.png')} />
                  <Text style={styles.moodOption}>Terrible</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelection('Sad')}>
                <View style={styles.moodItem}>
                  <Image style={styles.mood} source={require('../Photos/2.png')} />
                  <Text style={styles.moodOption}>Sad</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelection('Neutral')}>
                <View style={styles.moodItem}>
                  <Image style={styles.mood} source={require('../Photos/3.png')} />
                  <Text style={styles.moodOption}>Neutral</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelection('Happy')}>
                <View style={styles.moodItem}>
                  <Image style={styles.mood} source={require('../Photos/4.png')} />
                  <Text style={styles.moodOption}>Happy</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelection('Great')}>
                <View style={styles.moodItem}>
                  <Image style={styles.mood} source={require('../Photos/5.png')} />
                  <Text style={styles.moodOption}>Great</Text>
                </View>
              </TouchableOpacity>

            </View>
            <Button color="#30d5c8" title="Set Mood" onPress={closeMood} />
          </View>
        </View>
      </Modal>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.inputMessage}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        placeholder="Type your message..."
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Save Entry" onPress={handleSendButtonPress} color="#30d5c8" />
      <Modal transparent={true} visible={showSuccessModal} onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../Photos/check.png')} style={styles.successImage} />
            <Text style={styles.modalText}>Journal entry saved successfully!</Text>
            <TouchableOpacity style={styles.okButton} onPress={handleModalClose}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 80,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    marginRight: 10,
  },
  date: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  moodOption: {
    fontSize: 16,
    marginVertical: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  inputMessage: {
    height: '55%',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mood: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  successImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#30d5c8',
  },
  okButton: {
    backgroundColor: '#30d5c8',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  errormodalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',
  },
});

