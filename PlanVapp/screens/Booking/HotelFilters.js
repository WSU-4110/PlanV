import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const HotelFilters = ({ route }) => {
    const { hotels } = route.params; // Retrieve hotels from params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Results</Text>

            {hotels.length > 0 ? (
                <FlatList
                    data={hotels}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const hotelName = item.title || 'No Name Available';
                        const cardPhotos = item.cardPhotos;
                        const imageUrl = cardPhotos && cardPhotos.length > 0
                            ? cardPhotos[0]?.sizes?.urlTemplate
                            : null;

                        const finalImageUrl = imageUrl ? imageUrl.replace("{width}", 300).replace("{height}", 300) : null;

                        return (
                            <View style={styles.HotelContainer}>
                                <Text style={styles.HotelInfo}>{hotelName}</Text>
                                <Text style={styles.details}>Rating: {item.bubbleRating?.rating || 'N/A'}</Text>
                                <Text style={styles.details}>Price: {item.priceForDisplay || 'Price Unavailable'}</Text>
                                <Text style={styles.details}>Provider: {item.provider || 'Unknown'}</Text>

                                {finalImageUrl ? (
                                    <Image source={{ uri: finalImageUrl }} style={styles.HotelImage} />
                                ) : (
                                    <Text>No Image Available</Text>
                                )}
                            </View>
                        );
                    }}
                />
            ) : (
                <Text>No hotels found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    HotelContainer: {
        marginBottom: 20,
    },
    HotelInfo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 16,
        marginVertical: 5,
    },
    HotelImage: {
        width: 300,
        height: 200,
        marginTop: 10,
    },
});

export default HotelFilters;
