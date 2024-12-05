import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import COLORS from '../constants/colors'; // Ensure COLORS is correctly imported

const { width } = Dimensions.get('screen');

const placesInfo = {
  Dubai: {
    description: "Dubai is a city of incredible modern architecture, a thriving economy, and a mix of cultures. From the world's tallest building to luxury shopping, Dubai offers something for everyone.",
    pointsOfInterest: [
      "Burj Khalifa - The world's tallest building.",
      "Dubai Mall - A massive shopping center with attractions like an aquarium and ice rink.",
      "Palm Jumeirah - An artificial island with luxury hotels and beach resorts.",
      "Dubai Fountain - A stunning water and light show.",
      "Desert Safari - A thrilling adventure through the Dubai Desert."
    ]
  },
  Tokyo: {
    description: "Tokyo, a bustling metropolis, blends the ultra-modern with traditional culture. It's a city of neon lights, delicious food, and historic temples.",
    pointsOfInterest: [
      "Tokyo Tower - A symbol of Tokyo's skyline.",
      "Shibuya Crossing - One of the busiest pedestrian crossings in the world.",
      "Senso-ji Temple - Tokyo's oldest and most famous temple.",
      "Meiji Shrine - A tranquil oasis dedicated to Emperor Meiji.",
      "Tsukiji Fish Market - One of the largest fish markets in the world."
    ]
  },
  Paris: {
    description: "Paris, the city of love and lights, is famous for its art, fashion, and historic landmarks. It's a perfect destination for those who appreciate culture and romance.",
    pointsOfInterest: [
      "Eiffel Tower - The iconic symbol of Paris.",
      "Louvre Museum - The world's largest art museum, home to the Mona Lisa.",
      "Notre-Dame Cathedral - A masterpiece of Gothic architecture.",
      "Montmartre - A charming hilltop district with stunning views of the city.",
      "Champs-Élysées - A grand avenue lined with shops and theaters."
    ]
  },
  Pisa: {
    description: "Pisa is home to one of the world's most iconic landmarks, the Leaning Tower. Beyond that, it's a city steeped in history and charming Italian architecture.",
    pointsOfInterest: [
      "Leaning Tower of Pisa - A world-famous architectural wonder.",
      "Pisa Cathedral - A stunning example of Romanesque architecture.",
      "Piazza dei Miracoli - A UNESCO World Heritage Site with historic buildings.",
      "Baptistery of St. John - A beautiful religious building with remarkable acoustics.",
      "Pisa's Historic Center - A charming area with cafes, shops, and historic landmarks."
    ]
  }
};

const CityInfoModal = ({ visible, city, onClose }) => {
  const cityInfo = placesInfo[city];

  if (!cityInfo) {
    return null; // Handle if city is not found in placesInfo
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.cityName}>{city}</Text>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.cityDescription}>{cityInfo.description}</Text>
            <Text style={styles.pointsTitle}>Points of Interest:</Text>
            {cityInfo.pointsOfInterest.map((point, index) => (
              <Text key={index} style={styles.pointOfInterest}>- {point}</Text>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: width - 40,
    maxHeight: 400,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
    fontFamily: 'Gotham-Light', // Apply the Gotham font
  },
  cityDescription: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Gotham-Light', // Apply the Gotham font
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
    fontFamily: 'Gotham-Light', // Apply the Gotham font
  },
  pointOfInterest: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
    fontFamily: 'Gotham-Light', // Apply the Gotham font
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Gotham-Light', // Apply the Gotham font
  },
  scrollContainer: {
    maxHeight: 250, // Allow scrolling within the modal
  },
});

export default CityInfoModal;
