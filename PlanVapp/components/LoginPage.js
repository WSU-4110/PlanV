import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Animated } from 'react-native';
import PlanVLogo from '../assets/PlanVLogo.png'; // PlanV logo image
import KeyIcon from '../assets/key.png'; // Key icon for password
import PadlockIcon from '../assets/padlock.png'; // Padlock icon for username
import { auth } from '../firebaseConfig'; // Import auth from your config
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import sign-in method

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password
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

    // Define the login function
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Login Success:', user);
                Alert.alert('Login Success', `Welcome back, ${user.email}!`);
                navigation.navigate('Home'); // Navigate to Home after login
            })
            .catch((error) => {
                const errorMessage = error.message;
                // User-friendly error handling
                Alert.alert('Login Failed', errorMessage.includes('auth/wrong-password') || errorMessage.includes('auth/user-not-found')
                    ? 'Incorrect username/password.'
                    : errorMessage);
            });
    };

    const handleCreateAccount = () => {
        navigation.navigate('CreateAccount');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image 
                source={PlanVLogo} 
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
            <View style={styles.inputContainer}>
                <Image source={PadlockIcon} style={styles.icon} />
                <TextInput
                    placeholder="Username (Email)"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none" // Prevent auto-capitalization
                    keyboardType="email-address" // Email keyboard
                />
            </View>
            <View style={styles.inputContainer}>
                <Image source={KeyIcon} style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity
                style={[styles.loginButton, isFlashing && styles.flashButton]}
                onPressIn={() => setIsFlashing(true)} // Start flash effect on press
                onPressOut={() => setIsFlashing(false)} // Stop flash effect on release
                onPress={handleLogin}
            >
                <Text style={[styles.loginButtonText, isFlashing && styles.flashButtonText]}>
                    {isFlashing ? 'Happy travels!' : 'Login'} {/* Change button text */}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount}>
                <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
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
        width: 250,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    flavorTextContainer: {
        height: 50, 
        justifyContent: 'center', 
        marginBottom: 20,
    },
    flavorText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        width: 300, 
    },
    inputContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25, 
        marginBottom: 15,
        paddingLeft: 10,
        backgroundColor: '#fff',
        elevation: 2,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10, 
    },
    input: {
        flex: 1, 
        height: '100%',
        paddingLeft: 10,
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
        color: '#4a90e2',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: '#4a90e2',
        textDecorationLine: 'underline',
    },
});

export default LoginPage;
