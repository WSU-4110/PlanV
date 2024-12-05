import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const FlightFilters = ({ route }) => {
    const { flightData } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Results</Text>
            {flightData.length > 0 ? (
                <FlatList
                    data={flightData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.flightContainer}>
                            <Text style={styles.flightInfo}>
                                Flight: {item.segments[0]?.legs[0]?.flightNumber || 'Unknown Flight'}
                            </Text>
                            <Text style={styles.details}>
                                Airline: {item.segments[0]?.legs[0]?.marketingCarrier?.displayName || 'Unknown Airline'}
                            </Text>
                            <Text style={styles.details}>
                                Departure: {item.segments[0]?.legs[0]?.departureDateTime || 'Unknown Time'}
                            </Text>
                            <Text style={styles.details}>
                                Arrival: {item.segments[0]?.legs[0]?.arrivalDateTime || 'Unknown Arrival'}
                            </Text>
                            <Text style={styles.details}>
                                Price: {item.purchaseLinks[0]?.totalPrice || 'Price Unavailable'}
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.error}>No flight data available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    flightContainer: { marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
    flightInfo: { fontSize: 16, fontWeight: 'bold' },
    details: { fontSize: 14, marginVertical: 2 },
    error: { color: 'red', marginVertical: 10 },
});

export default FlightFilters;
