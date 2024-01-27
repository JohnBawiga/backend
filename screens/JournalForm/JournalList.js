import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {  useFocusEffect } from '@react-navigation/native';


export default function JournalList({ userid }) {
  const navigation = useNavigation();

  const [journalEntries, setJournalEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchJournalEntries();
  }, [userid]);

  useFocusEffect(
    React.useCallback(() => {
      fetchJournalEntries();
    }, [userid])
  );

  

  const fetchJournalEntries = () => {
  axios
    .get(`https://welltalk-mobile-production.up.railway.app/journal/${userid}`)
    .then(response => {
      // Set both journalEntries and filteredEntries to the response data
      setJournalEntries(response.data);
      setFilteredEntries(response.data); // Set filtered entries initially
    })
    .catch(error => {
      console.log('Error retrieving journal entries:', error);
    });
};

const handleEditEntry = (journalID) => {
  navigation.navigate('EditJournalV2', { journalID: journalID });
};
  const handleFilter = (value) => {
    setFilterType(value);
    if (value === '') {
      setFilteredEntries(journalEntries); // Reset filter, show all entries
    } else {
      const filtered = journalEntries.filter(entry => entry.type === value);
      setFilteredEntries(filtered);
    }
  };
  const handleCreateJournal = () => {
    navigation.navigate('CreateJournalV2', {
      userid: userid,
    });
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter:</Text>
        <Picker
          selectedValue={filterType}
          onValueChange={handleFilter}
          style={styles.filterDropdown}
        >
          <Picker.Item label="All" value="" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Public" value="Public" />
        </Picker>
      </View>

      <FlatList
        data={filteredEntries.reverse()} // Reverse the order of the entries
        renderItem={({ item }) => (
<TouchableOpacity onPress={() => handleEditEntry(item.journalID)}>            
<View style={styles.entryContainer}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryType}>{item.type}</Text>
              </View>
              <Text style={styles.entryMood}>Mood: {item.mood}</Text>
              <Text style={styles.entryDate}>Date: {item.date}</Text>
              <Text style={styles.entryMessage}>Message: {item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.journalID.toString()}
        contentContainerStyle={styles.listContent}
      />

  
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCreateJournal}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  filterDropdown: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff', // Background color of the dropdown
    borderRadius: 5, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: '#ddd', // Border color
    paddingHorizontal: 10, // Horizontal padding
    alignItems: 'center', // Center the dropdown content horizontally
    justifyContent: 'center', // Center the dropdown content vertically
  },
  entryContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#30d5c8',
  },
  entryType: {
    fontSize: 16,
    marginBottom: 5,
  },
  entryDate: {
    fontSize: 14,
    marginBottom: 5,
    color: 'gray',
  },
  entryMood: {
    fontSize: 14,
    marginBottom: 5,
    color: 'gray',
  },
  entryMessage: {
    fontSize: 14,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#30d5c8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
