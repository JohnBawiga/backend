import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

const ExerciseModal = ({ exercise, closeModal }) => {
  return (
    <Modal transparent={true} visible={exercise !== null}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Exercise Details</Text>
        {exercise && (
          <View style={styles.modalContent}>
            <Text style={styles.modalExercisenameText}>{exercise.exercisename}</Text>
            <Text style={styles.modalExercisedifficultyText}>{exercise.difficulty}</Text>
            <Text style={styles.modalExerciseinstructionText}>Instructions: {exercise.instructions}</Text>
            <Text style={styles.modalText}>Equipments: {exercise.equipments}</Text>
            <Text style={styles.modalText}>Video Demo: {exercise.videodemo}</Text>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'white',
    borderWidth: 10,
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#30D5C8',
    borderColor: 'white',
    borderRadius: 8,
    padding: 3,
    borderColor: '#30D5C8',
    borderWidth: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalExercisenameText: {
    color: 'white',
    marginLeft:5,
    marginRight: 5,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 30,
  },
  modalExercisedifficultyText: {
    color: 'white',
    marginLeft:5,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 15,
    fontStyle: 'italic',
  },
  modalExerciseinstructionText: {
    color: 'white',
    marginLeft:5,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 20,
    fontStyle: 'bold',
  },
  modalText: {
    color: 'white',
    marginLeft:5,
    marginRight: 5,
    marginBottom: 10,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'black',
    borderColor: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExerciseModal;
