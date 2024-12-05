import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Checkout({ navigation }) {
    const [savedCard, setSavedCard] = useState(null);
    const itemName = "PlanVreium";
    const itemPrice = "$1.00";

    useEffect(() => {
        const fetchSavedCard = async () => {
            const storedCard = await AsyncStorage.getItem('savedCard');
            if (storedCard) {
                setSavedCard(JSON.parse(storedCard));
            } else {
                Alert.alert(
                    "No Card Found",
                    "Please add a payment method first.",
                    [{ text: "OK", onPress: () => navigation.navigate('Payment') }]
                );
            }
        };
        fetchSavedCard();
    }, []);

    const handlePurchase = () => {
        Alert.alert(
            "Purchase Successful",
            `You have purchased ${itemName} for ${itemPrice}.`,
            [{ text: "OK", onPress: () => navigation.navigate('HomePage') }]
        );
    };

    const goBack = () => {
        navigation.navigate('HomePage');
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.transparentButton} onPress={goBack}>
                <Image source={require('../assets/exit-door.png')} style={styles.exitIcon} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Checkout</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemLabel}>Item:</Text>
                    <Text style={styles.itemValue}>{itemName}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemLabel}>Price:</Text>
                    <Text style={styles.itemValue}>{itemPrice}</Text>
                </View>
                {savedCard ? (
                    <View style={styles.cardContainer}>
                        <Text style={styles.cardLabel}>Using card ending in:</Text>
                        <Text style={styles.cardValue}>{savedCard.number.slice(-4)}</Text>
                    </View>
                ) : (
                    <Text style={styles.cardInfo}>No card information available.</Text>
                )}
                <TouchableOpacity
                    style={[styles.purchaseButton, !savedCard && styles.disabledButton]}
                    onPress={handlePurchase}
                    disabled={!savedCard}
                >
                    <Text style={styles.buttonText}>Confirm Purchase</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f9f9f9',
    },
    content: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Gotham-Light',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    itemLabel: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Gotham-Light',
    },
    itemValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        fontFamily: 'Gotham-Light',
    },
    cardContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    cardLabel: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Gotham-Light',
    },
    cardValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        fontFamily: 'Gotham-Light',
    },
    cardInfo: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'Gotham-Light',
        color: '#999',
    },
    purchaseButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    transparentButton: {
        backgroundColor: 'transparent',
        padding: 10,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    exitIcon: {
        width: 30,
        height: 30,
    },
});
