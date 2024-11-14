import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreditCard from 'react-native-credit-card';

export default function Payment({ navigation }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [savedCard, setSavedCard] = useState(null);

    const handleAddCard = () => {
        setShowForm(true);
    };

    const handleSaveCard = async () => {
        if (cardNumber.length === 16 && cvv.length === 3) {
            const lastFourDigits = cardNumber.slice(-4); // Last 4 digits
            const maskedCardNumber = `**** **** **** ${lastFourDigits}`; // Proper card format
            const maskedCVV = cvv[0] + '**'; // Masked CVV
            const newCard = {
                number: maskedCardNumber,
                expiry: expiryDate,
                name: cardName || "Cardholder",
                cvc: maskedCVV,
            };
            setSavedCard(newCard);
            setShowForm(false);
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
            setCardName('');
            await AsyncStorage.setItem('savedCard', JSON.stringify(newCard));
        } else {
            alert('Please enter valid card details.');
        }
    };

    const handleDeleteCard = async () => {
        setSavedCard(null);
        await AsyncStorage.removeItem('savedCard');
        setShowForm(false);
    };

    // Navigate to Settings screen
    const goBack = () => {
        navigation.navigate('Settings'); // Takes you to the Settings screen
    };

    const handleExpiryChange = (text) => {
        if (text.length === 2 && !text.includes('/')) {
            setExpiryDate(text + '/');
        } else {
            setExpiryDate(text);
        }
    };

    useEffect(() => {
        const fetchSavedCard = async () => {
            const storedCard = await AsyncStorage.getItem('savedCard');
            if (storedCard) {
                setSavedCard(JSON.parse(storedCard));
            }
        };
        fetchSavedCard();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.transparentButton} onPress={goBack}>
                <Image source={require('../assets/exit-door.png')} style={styles.exitIcon} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {savedCard ? (
                    <View style={styles.cardContainerTop}>
                        <CreditCard
                            type="visa"
                            imageFront={require('../assets/card-front.png')}
                            imageBack={require('../assets/card-back.png')}
                            shiny={false}
                            bar={false}
                            focused="number"
                            number={savedCard.number}
                            name={savedCard.name}
                            expiry={savedCard.expiry}
                            cvc={savedCard.cvc}
                            style={styles.creditCard}
                        />
                        <TouchableOpacity onPress={handleDeleteCard} style={styles.removeCardButton}>
                            <Image
                                source={require('../assets/credit-card-destruction.png')}
                                style={styles.removeCardIcon}
                            />
                            <Text style={styles.removeCardText}>Remove Card</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleAddCard} style={styles.noCardTop}>
                        <Text style={styles.noCardText}>Currently no cards, add card?</Text>
                    </TouchableOpacity>
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
                            onChangeText={handleExpiryChange}
                            maxLength={5}
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
                        <TouchableOpacity style={styles.fancyButton} onPress={handleSaveCard}>
                            <Text style={styles.buttonText}>Save Card</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    scrollView: {
        flexGrow: 1,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20, // Keeping your original value here
        paddingHorizontal: 10,
        borderRadius: 5,
        fontFamily: 'Gotham',
    },
    cardContainerTop: {
        alignItems: 'center',
        marginBottom: 720, // Keeping your original value here as well
        marginTop: 15,
    },
    creditCard: {
        width: 300,
        height: 135,
    },
    noCardTop: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noCardText: {
        fontSize: 15,
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    fancyButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    removeCardIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    removeCardText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Gotham',
    },
    transparentButton: {
        backgroundColor: 'transparent',
        padding: 10,
    },
    exitIcon: {
        width: 30,
        height: 30,
    },
});
