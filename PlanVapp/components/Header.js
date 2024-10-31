import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import icons from "../constants/icons"; // Ensure the correct path

const Header = () => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <View
      style={{
        backgroundColor: "#000000",
        height: 65,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("HotelFilters")} // Navigate to HotelFilters
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 25,
          padding: 8,
        }}
      >
        <Image source={icons.bed} style={{ width: 24, height: 24, tintColor: 'white' }} />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: "white",
            fontSize: 15,
          }}
        >
          Stays
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("FlightFilters")} // Navigate to FlightFilters
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={icons.airplane} style={{ width: 26, height: 26, tintColor: 'white' }} />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: "white",
            fontSize: 15,
          }}
        >
          Flights
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("CarFilters")} // Navigate to CarFilters
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={icons.car} style={{ width: 26, height: 26, tintColor: 'white' }} />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            color: "white",
            fontSize: 15,
          }}
        >
          Car Rental
        </Text>
      </Pressable>

      {/* Add more Pressables as needed for other filters */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
