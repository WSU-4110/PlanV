
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function Payment({ navigation }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [showForm, setShowForm] = useState(false);
    
    // Ref to hold cards data
    const cardsRef = useRef([]);

    const handleAddCard = () => {
        setShowForm(true);
    };

    const handleSaveCard = () => {
        if (cardNumber.length === 16 && cvv.length === 3) {
            const lastFourDigits = cardNumber.slice(-4);
            const newCard = {
                lastFourDigits,
                expiryDate,
                cardName,
            };
            // Update ref and trigger re-render by using state
            cardsRef.current.push(newCard);
            setShowForm(false); // Close the form
            // Clear input fields
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
            setCardName('');
        } else {
            alert('Please enter valid card details.');
        }
    };

    const handleDeleteCard = (index) => {
        cardsRef.current.splice(index, 1); // Remove card from ref
        // Force a re-render by using an empty state update
        setShowForm((prev) => !prev);
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Back text */}
            <TouchableOpacity onPress={goBack}>
                <Text style={styles.textButton}>Back</Text>
            </TouchableOpacity>

            <ScrollView style={styles.scrollView}>
                {cardsRef.current.length > 0 ? (
                    cardsRef.current.map((card, index) => (
                        <View key={index} style={styles.cardDisplay}>
                            <Text>Card: **** **** **** {card.lastFourDigits}</Text>
                            <Text>Name: {card.cardName}</Text>
                            <Text>Expiry: {card.expiryDate}</Text>
                            <TouchableOpacity onPress={() => handleDeleteCard(index)}>
                                <Text style={styles.textButton}>Delete Card</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View style={styles.noCard}>
                        <Text>Currently no cards, add card?</Text>
                    </View>
                )}

                {showForm && (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Card Number"
                            keyboardType="numeric"
                            value={cardNumber}
                            onChangeText={setCardNumber}
                            maxLength={16}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Expiry Date (MM/YY)"
                            value={expiryDate}
                            onChangeText={setExpiryDate}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="CVV"
                            keyboardType="numeric"
                            value={cvv}
                            onChangeText={setCvv}
                            maxLength={3}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Card Name (optional)"
                            value={cardName}
                            onChangeText={setCardName}
                        />
                        <TouchableOpacity onPress={handleSaveCard}>
                            <Text style={styles.textButton}>Save Card</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* Add Card text */}
            {!showForm && (
                <TouchableOpacity onPress={handleAddCard}>
                    <Text style={styles.textButton}>Add Card</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    scrollView: {
        flex: 1,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    cardDisplay: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 12,
    },
    noCard: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    textButton: {
        color: 'blue', // Change color to indicate it's clickable
        textDecorationLine: 'underline', // Underline to look like a link
        marginVertical: 5,
    },
});