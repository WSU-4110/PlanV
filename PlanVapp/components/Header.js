// Header.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Make sure this is imported
import icons from '../constants/icons';

const Header = ({ handleSelection }) => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("Flight");

  const handlePress = (option) => {
    // Update selected filter state
    setSelectedFilter(option);
    
    // Trigger handleSelection to update message in InitialBooking
    handleSelection(option);

    // You could add any additional logic here, e.g., specific navigation if needed
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        style={[
          styles.button,
          selectedFilter === 'Flight' && styles.selectedButton,
        ]}
        onPress={() => handlePress('Flight')}
      >
        <Image source={icons.airplane} style={styles.icon} />
        <Text style={styles.buttonText}>Flight</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.button,
          selectedFilter === 'Hotel' && styles.selectedButton,
        ]}
        onPress={() => handlePress('Hotel')}
      >
        <Image source={icons.bed} style={styles.icon} />
        <Text style={styles.buttonText}>Hotel</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000000",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 25,
    padding: 8,
  },
  selectedButton: {
    borderColor: "white",
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: "white",
  },
  buttonText: {
    marginLeft: 8,
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
});

export default Header;
