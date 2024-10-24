import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ensure this import is correct

const HotelFilters = () => {
  const bookings = useSelector((state) => state.booking.booking);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Bookings",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {bookings.length > 0 ? (
        bookings.map((item) => (
          <Pressable
            key={item.id} // Ensure this id is unique for each booking item
            style={styles.bookingContainer}
          >
            <View>
              <Text style={styles.bookingName}>
                {item.name} {/* Correctly wrapped in <Text> */}
              </Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="stars" size={24} color="green" />
                <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>
                  {item.rating} {/* Correctly wrapped in <Text> */}
                </Text>
                <Text style={{ marginLeft: 3 }}>•</Text>
                <View style={styles.geniusLevel}>
                  <Text style={styles.geniusLevelText}>
                    Genius Level {/* Correctly wrapped in <Text> */}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))
      ) : (
        <Text>No bookings available.</Text> // Handle the case when no bookings exist
      )}
    </SafeAreaView>
  );
};

export default HotelFilters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookingContainer: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    padding: 14,
    borderRadius: 6,
  },
  bookingName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  geniusLevel: {
    padding: 6,
    borderRadius: 4,
    width: 100,
    backgroundColor: "#0039a6",
    marginLeft: 4,
  },
  geniusLevelText: {
    textAlign: "center",
    color: "white",
    fontSize: 13,
    fontWeight: "400",
  },
});
