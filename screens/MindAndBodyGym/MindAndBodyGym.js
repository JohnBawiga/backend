import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import ExerciseModal from "./ExerciseModal";
import { Picker } from "@react-native-picker/picker";

class MindAndBodyGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      exercises: [],
      showTidbits: true,
      selectedDifficulty: 'All',
      selectedExercise: null,
    };
  }

  handleCategoryToggle = async (category) => {
    const newCategory = this.state.selectedCategory === category ? null : category;
    this.setState({ selectedCategory: newCategory, showTidbits: true, selectedDifficulty: 'All', exercises: [] });

    if (newCategory !== null) {
      await this.getExercises(newCategory, this.state.selectedDifficulty);
    }
  };

  handleDifficultyChange = async (difficulty) => {
    await this.setState({ selectedDifficulty: difficulty });
    this.getExercises(this.state.selectedCategory, difficulty);
  };
  closeExerciseModal = () => {
    this.setState({ selectedExercise: null });
  };
  

  handleExerciseSelect = (exercise) => {
    this.setState({ selectedExercise: exercise });
  };

  getExercises = async (category, difficulty) => {
    try {
      let apiUrl = `https://wanted-sweater-production.up.railway.app/exercises/getByExerciseType?exercisetype=${category}`;

      if (difficulty !== 'All') {
        apiUrl = `https://wanted-sweater-production.up.railway.app/exercises/getByExerciseTypeAndDifficulty?exercisetype=${category}&difficulty=${difficulty}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      this.setState({ exercises: data, showTidbits: false });
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  render() {
    const { selectedCategory, exercises, showTidbits, selectedDifficulty, selectedExercise } = this.state;

    return (
      <View style={styles.container}>
        

        
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedCategory === 'cognitive' ? styles.selectedButton : null,
            ]}
            onPress={() => this.handleCategoryToggle('cognitive')}
          >
            <Text style={styles.buttonText}>Cognitive Workouts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedCategory === 'physical' ? styles.selectedButton : null,
            ]}
            onPress={() => this.handleCategoryToggle('physical')}
          >
            <Text style={styles.buttonText}>Physical Workouts</Text>
          </TouchableOpacity>
        </View>

 
        {selectedCategory && (
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Filter by Difficulty:</Text>
            <Picker
              selectedValue={selectedDifficulty}
              style={styles.difficultyPicker}
              onValueChange={(itemValue) => this.handleDifficultyChange(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Advanced" value="Advanced" />
            </Picker>
          </View>
        )}

       
        {selectedCategory === null && (
          <View style={styles.tidbitContainer}>
            <View style={styles.tidbitBox}>
              <Text style={styles.tidbitTitle}>Clear and Detailed Instructions</Text>
              <Text style={styles.tidbitDescription}>Our exercises come with clear and detailed instructions making it easy for you to follow along and get the most out of your wellness journey</Text>
            </View>

            <View style={styles.tidbitBox}>
              <Text style={styles.tidbitTitle}>Beginner Friendly Workouts</Text>
              <Text style={styles.tidbitDescription}>Our exercises are beginner-friendly, ensuring that even if you're new to wellness, you'll feel comfortable and confident</Text>
            </View>

            <View style={styles.tidbitBox}>
              <Text style={styles.tidbitTitle}>Step by Step Guidance</Text>
              <Text style={styles.tidbitDescription}>No matter your fitness level, our step-by-step guidance ensures that you can dive right in, whether you're a seasoned pro or just starting</Text>
            </View>
          </View>
        )}


        {selectedCategory !== null && exercises.length === 0 && (
          <View style={styles.noExercisesContainer}>
            <Text style={styles.noExercisesText}>No exercises available for the selected category and difficulty.</Text>
          </View>
        )}

       {exercises.length > 0 && (
  <View style={styles.exerciseContainer}>
    <ScrollView style={{ height: 500 }}>
      {exercises.map((item) => (
        <TouchableOpacity
          key={item.exerciseid} // Use a unique identifier as the key
          style={styles.exerciseItem}
          onPress={() => this.handleExerciseSelect(item)}
        >
          <Text style={styles.exerciseName}>{item.exercisename}</Text>
          <Text style={styles.exerciseDifficulty}>Difficulty: {item.difficulty}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)}



        <ExerciseModal exercise={selectedExercise} closeModal={this.closeExerciseModal} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  navBar: {
    height: 60,
    backgroundColor: '#30D5C8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  toggleButton: {
    backgroundColor: 'white',
    borderColor: '#30D5C8',
    borderWidth: 2, 
    padding: 10,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#30D5C8', // Highlight color for the selected button
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tidbitContainer: {
    marginTop: 20,
  },
  tidbitBox: {
    backgroundColor: '#30D5C8',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#30D5C8',
    marginTop: 10, // Adjusted margin
    marginBottom: 10, // Adjusted margin
    marginLeft: 10,
    marginRight: 10,
  },
  tidbitTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20,
    color: 'white',
  },
  tidbitDescription: {
    color: 'white',
  },
  exerciseItem: {
    backgroundColor: '#30D5C8',
    padding: 10,
    marginVertical: 15,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#30D5C8',
  },
  exerciseName: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
  },
  exerciseDifficulty: {
    color: '#ffffff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10,
  },
  filterLabel: {
    marginRight: 5,
  },
  difficultyPicker: {
    height: 30,
    width: 120,
    borderColor: '#30D5C8',
  },
});

export default MindAndBodyGym;
