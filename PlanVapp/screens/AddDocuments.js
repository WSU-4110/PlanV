import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';

const AddDocumentScreen = ({ navigation, route }) => {
  const { addDocument } = route.params;  // This function will be passed from DocumentsScreen
  const [documentType, setDocumentType] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [documentDetails, setDocumentDetails] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleSaveDocument = () => {
    const newDocument = {
      id: (Math.random() * 10000).toString(),
      type: documentType,
      title: documentTitle,
      date: documentDate,
      imageUri: imageUri,
    };
    addDocument(newDocument);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add New Document</Text>

      <TextInput
        style={styles.input}
        placeholder="Document Type (e.g., Flight, Hotel)"
        value={documentType}
        onChangeText={setDocumentType}
      />

      <TextInput
        style={styles.input}
        placeholder="Document Title"
        value={documentTitle}
        onChangeText={setDocumentTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Date"
        value={documentDate}
        onChangeText={setDocumentDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Details (e.g., Flight number)"
        value={documentDetails}
        onChangeText={setDocumentDetails}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddDocumentScreen;
