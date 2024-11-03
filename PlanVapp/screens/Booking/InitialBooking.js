// InitialBooking.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-ranges';

const InitialBooking = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDates, setSelectedDates] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [editable, setEditable] = useState(false);

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  const searchPlaces = (input) => {
    // Implement your search logic here
    console.log('Searching for:', input);
  };

  const customButton = (onConfirm) => (
    <Text style={styles.confirmButton} onPress={onConfirm}>
      Confirm
    </Text>
  );

  return (
    <ScrollView style={styles.container}>
      <Header handleSelection={handleSelection} />

      <View style={styles.messageContainer}>
        {selectedOption === 'Flight' && (
          <View style={styles.flightContainer}>
            <Text style={styles.messageText}>You selected Flight</Text>
            <View style={styles.searchContainer}>
              <Icon name="search" size={24} color="black" />
              <TextInput
                placeholder="Enter Your Destination"
                placeholderTextColor="black"
                style={styles.searchInput}
              />
            </View>

            {/* Date Picker Section */}
            <View style={styles.dateContainer}>
              <Icon name="calendar" size={24} color="black" />
              <DatePicker
                style={styles.datePicker}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerStyle: {
                    backgroundColor: "#003580",
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#0047AB"
                customButton={customButton}
                onConfirm={(startDate, endDate) =>
                  setSelectedDates(startDate, endDate)
                }
                allowFontScaling={false}
                placeholder={"Select Your Dates"}
                mode={"range"}
              />
            </View>
            <TouchableOpacity
        onPress={() => setEditable(!editable)} // Toggle edit mode on press
        style={styles.inputContainer}
      >
        <Ionicons name="person-outline" size={24} color="black" />
        <TextInput
          editable={false} // Make input non-editable
          placeholderTextColor="red"
          placeholder={` ${rooms} room • ${adults} adults • ${children} children`}
          style={styles.input}
        />
      </TouchableOpacity>

      {/* Show selectors only if editable is true */}
      {editable && (
        <View style={styles.selectorsContainer}>
          {[
            { label: 'Rooms', count: rooms, setCount: setRooms },
            { label: 'Adults', count: adults, setCount: setAdults },
            { label: 'Children', count: children, setCount: setChildren },
          ].map(({ label, count, setCount }, index) => (
            <View key={index} style={styles.selector}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() => setCount(Math.max(0, count - 1))}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{count}</Text>
                <TouchableOpacity
                  onPress={() => setCount(count + 1)}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Search Button */}
      <TouchableOpacity
        onPress={() => searchPlaces(route?.params.input)}
        style={styles.searchButton}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
          </View>
        )}
        {selectedOption === 'Hotel' && (
          <Text style={styles.messageText}>You selected Hotel</Text>
        )}
        {selectedOption === 'Car Rental' && (
          <Text style={styles.messageText}>You selected Car Rental</Text>
        )}
        {!selectedOption && (
          <Text style={styles.messageText}>Please select an option</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  messageContainer: {
    margin: 20,
    borderColor: '#FFC72C',
    borderWidth: 3,
    borderRadius: 6,
    padding: 15,
  },
  messageText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  flightContainer: {
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFC72C',
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFC72C',
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    width: '100%',       // Ensures container fills available space
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
  datePicker: {
    flex: 1,              // Ensures picker takes available space
    flexShrink: 1,        // Prevents overflow
    marginLeft: 10,       // Space between icon and picker
  },
  confirmButton: {
    color: '#0047AB',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    borderColor: "#FFC72C",
    borderWidth: 2,
    paddingVertical: 15,
  },
  input: { flex: 1 },
  selectorsContainer: { marginVertical: 20 },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: { fontSize: 16, fontWeight: "500" },
  counterContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  counterButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: { fontSize: 20, fontWeight: "600" },
  countText: { fontSize: 18, fontWeight: "500", paddingHorizontal: 6 },
  searchButton: {
    paddingHorizontal: 10,
    borderColor: "#FFC72C",
    borderWidth: 2,
    paddingVertical: 15,
    backgroundColor: "#2a52be",
  },
  searchButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
});

export default InitialBooking;
