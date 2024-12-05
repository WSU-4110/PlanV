import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

const AddDocumentScreen = ({ navigation }) => {
  const [documentType, setDocumentType] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  

  const handleSaveDocument = () => {
    // Logic to save the document (e.g., send to backend or update local state)
    alert('Document added successfully!');
    navigation.goBack(); // Return to the Documents screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Add Document</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Document Type (e.g., Flight, Hotel, Activity)"
        value={documentType}
        onChangeText={setDocumentType}
      />

      <TextInput
        style={styles.input}
        placeholder="Title (e.g., Miami Boat Tour)"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (e.g., Dec 15, 2024)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Additional Info (optional)"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
      />

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSaveDocument}
      >
        <Text style={styles.saveButtonText}>Save Document</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0eefe',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#888',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddDocumentScreen;
