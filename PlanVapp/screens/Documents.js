import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  Image, 
  Modal,
  SafeAreaView
} from 'react-native';
import { auth } from '../firebaseConfig'; 

export const DocumentsScreen = ({ navigation }) => {
  const [documents, setDocuments] = useState([
    {
      id: '1',
      type: 'Flight',
      title: 'Detroit to France',
      date: 'Dec 15, 2024',
      airline: 'Delta Airlines',
      flightNumber: 'DL1234',
      imageUri: null 
    },
    {
      id: '2',
      type: 'Hotel',
      title: 'Universal Studios Resort',
      date: 'Dec 20-24, 2024',
      confirmationNumber: 'HTL5678',
      imageUri: null 
    },
    {
      id: '3',
      type: 'Activity',
      title: 'Rainforest Trail Excursion',
      date: 'Dec 22, 2024',
      time: '2:00 PM',
      imageUri: null 
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddDocument = () => {
    // Navigate to document upload screen or open camera
    navigation.navigate('AddDocuments');
  };

  const renderDocumentItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.documentItem}
      onPress={() => {
        setSelectedDocument(item);
        setIsModalVisible(true);
      }}
    >
      {item.imageUri ? (
        <Image 
          source={{ uri: item.imageUri }} 
          style={styles.documentImage} 
        />
      ) : (
        <View style={styles.documentPlaceholder}>
          <Text style={styles.documentTypeIcon}>
            {item.type === 'Flight' ? '✈️' : 
             item.type === 'Hotel' ? '🏨' : 
             item.type === 'Activity' ? '🎫' : '📄'}
          </Text>
        </View>
      )}
      <View style={styles.documentDetails}>
        <Text style={styles.documentTitle}>{item.title}</Text>
        <Text style={styles.documentSubtitle}>{item.date}</Text>
        <Text style={styles.documentType}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDocumentModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {selectedDocument && (
            <>
              <Text style={styles.modalTitle}>{selectedDocument.title}</Text>
              <Text style={styles.modalSubtitle}>{selectedDocument.type} Details</Text>
              
              {selectedDocument.type === 'Flight' && (
                <View style={styles.detailSection}>
                  <Text>Airline: {selectedDocument.airline}</Text>
                  <Text>Flight Number: {selectedDocument.flightNumber}</Text>
                </View>
              )}
              
              {selectedDocument.type === 'Hotel' && (
                <View style={styles.detailSection}>
                  <Text>Confirmation Number: {selectedDocument.confirmationNumber}</Text>
                </View>
              )}
              
              {selectedDocument.type === 'Activity' && (
                <View style={styles.detailSection}>
                  <Text>Time: {selectedDocument.time}</Text>
                </View>
              )}
              
              <TouchableOpacity 
                style={styles.closeModalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddDocument}
        >
          <Text style={styles.addButtonText}>+ Add Document</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={documents}
        renderItem={renderDocumentItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No documents uploaded yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Tap "Add Document" to upload your first reservation
            </Text>
          </View>
        )}
      />


      {renderDocumentModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0eefe',
    padding: 20,
  },
  headerContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  documentItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 15,
  },
  documentTypeIcon: {
    fontSize: 40,
  },
  documentImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  documentDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  documentSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  documentType: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailSection: {
    width: '100%',
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DocumentsScreen;
