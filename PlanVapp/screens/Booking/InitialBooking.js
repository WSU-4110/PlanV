// screens/Booking/InitialBooking.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const InitialBooking = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Booking Type</Text>
      <Button title="Flight" onPress={() => navigation.navigate('FlightFilters')} />
      <Button title="Hotel" onPress={() => navigation.navigate('HotelFilters')} />
      <Button title="Car" onPress={() => navigation.navigate('CarFilters')} />
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
    marginBottom: 20,
  },
});

export default InitialBooking;
