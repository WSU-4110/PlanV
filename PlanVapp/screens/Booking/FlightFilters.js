// CarFilters.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlightFilters = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Filters</Text>
      {/* Add your filter options here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default FlightFilters;
