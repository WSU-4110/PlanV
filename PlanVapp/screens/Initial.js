// Initial.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Initial = ({ selectedAnimal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.selectionText}>
        {selectedAnimal ? `You selected: ${selectedAnimal}` : 'Please select an animal'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default Initial;
