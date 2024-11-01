// Header.js
import { Pressable, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import icons from "../constants/icons";

// State classes defined within Header.js
class BookingState {
  select(navigation) {
    throw new Error("Method 'select()' must be implemented.");
  }
}

class HotelState extends BookingState {
  select(navigation) {
    navigation.navigate("HotelFilters");
  }
}

class FlightState extends BookingState {
  select(navigation) {
    navigation.navigate("FlightFilters");
  }
}

class CarState extends BookingState {
  select(navigation) {
    navigation.navigate("CarFilters");
  }
}

const Header = () => {
  const navigation = useNavigation();
  const [currentState, setCurrentState] = useState(new HotelState()); // Default state
  const [selectedFilter, setSelectedFilter] = useState("Hotel");

  const handlePress = (option) => {
    // Switch current state based on selection
    switch (option) {
      case "Hotel":
        setCurrentState(new HotelState());
        break;
      case "Flight":
        setCurrentState(new FlightState());
        break;
      case "Car":
        setCurrentState(new CarState());
        break;
      default:
        setCurrentState(new HotelState());
    }
    setSelectedFilter(option);
    currentState.select(navigation); // Delegate behavior to the current state
  };

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
        onPress={() => handlePress("Hotel")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: selectedFilter === "Hotel" ? "white" : "transparent",
          borderWidth: selectedFilter === "Hotel" ? 1 : 0,
          borderRadius: 25,
          padding: 8,
        }}
      >
        <Image source={icons.bed} style={{ width: 24, height: 24, tintColor: "white" }} />
        <Text style={{ marginLeft: 8, fontWeight: "bold", color: "white", fontSize: 15 }}>Stays</Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress("Flight")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: selectedFilter === "Flight" ? "white" : "transparent",
          borderWidth: selectedFilter === "Flight" ? 1 : 0,
          borderRadius: 25,
          padding: 8,
        }}
      >
        <Image source={icons.airplane} style={{ width: 26, height: 26, tintColor: "white" }} />
        <Text style={{ marginLeft: 8, fontWeight: "bold", color: "white", fontSize: 15 }}>Flights</Text>
      </Pressable>

      <Pressable
        onPress={() => handlePress("Car")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: selectedFilter === "Car" ? "white" : "transparent",
          borderWidth: selectedFilter === "Car" ? 1 : 0,
          borderRadius: 25,
          padding: 8,
        }}
      >
        <Image source={icons.car} style={{ width: 26, height: 26, tintColor: "white" }} />
        <Text style={{ marginLeft: 8, fontWeight: "bold", color: "white", fontSize: 15 }}>Car Rental</Text>
      </Pressable>
    </View>
  );
};

export default Header;
