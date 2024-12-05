import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import PlanVLogoTwo from '../assets/PlanVLogoTwo.png'; // PlanV logo image

const FirstScreen = ({ navigation }) => {
    const [isFlashing, setIsFlashing] = useState(false); // State for flash effect
    const [flavorIndex, setFlavorIndex] = useState(0); // Index for flavor text
    const fadeAnim = useRef(new Animated.Value(1)).current; // Animation state for fading

    // Flavor text related to planning a trip
    const flavorTexts = [
        "Plan your perfect getaway today!",
        "Find the best hotels and accommodations.",
        "Book flights, hotels, and more in one place.",
        "Your travel companion, PlanV, has you covered!",
        "All your travel needs in one app!"
    ];

    // Effect to cycle through the flavor texts every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true, // Use native driver for better performance
            }).start(() => {
                // Change flavor text index
                setFlavorIndex((prevIndex) => (prevIndex + 1) % flavorTexts.length);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true, // Use native driver for better performance
                }).start();
            });
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [fadeAnim]);

    // Define the navigation for login and create account buttons
    const handleCreateAccount = () => {
        navigation.navigate('CreateAccount'); // Navigate to create account screen
    };

    const handleLogin = () => {
        navigation.navigate('Login'); // Navigate to create account screen
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image 
                source={PlanVLogoTwo} 
                style={styles.logo} 
            />
            <Animated.View style={[styles.flavorTextContainer, { opacity: fadeAnim }]}>
                <Animated.Text 
                    style={styles.flavorText}
                    numberOfLines={2} // Limit to 2 lines
                    ellipsizeMode="tail" // Add ellipses if text overflows
                >
                    {flavorTexts[flavorIndex]}
                </Animated.Text>
            </Animated.View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.createAccountText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleCreateAccount}>
                <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f9fc',
        padding: 20,
    },
    logo: {
        width: 450,
        height: 300,
        
        marginBottom: 5,
    },
    flavorTextContainer: {
        height: 50, 
        justifyContent: 'center', 
        marginBottom: 20,
    },
    flavorText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        width: 200, 
    },
    loginButton: {
        backgroundColor: '#000000', 
        borderRadius: 25, 
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    flashButton: {
        backgroundColor: '#FFA500', // Nice orange color for flash effect
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    flashButtonText: {
        color: '#333333', 
    },
    createAccountText: {
        color: '#FFF',
        marginBottom: 0,
        fontSize: 15,
    },
    
    
    
});

export default FirstScreen;
