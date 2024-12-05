import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import KeyIcon from '../assets/key.png'; // Key icon for password
import PadlockIcon from '../assets/padlock.png'; // Padlock icon for username
import ExitDoorIcon from '../assets/exit-door.png'; // Exit door icon
import { auth } from '../firebaseConfig'; // Import auth from your config
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import sign-in method

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password
    const [isFlashing, setIsFlashing] = useState(false); // State for flash effect

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Exit button at the top-right */}
            <TouchableOpacity
                style={styles.exitButton}
                onPress={() => navigation.navigate('FirstScreen')} // Navigate to FirstScreen
            >
                <Image source={ExitDoorIcon} style={styles.exitIcon} />
            </TouchableOpacity>

            {/* Title Section */}
            <Text style={styles.title}>Login</Text>

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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40, // Spacing between title and input fields
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
    forgotPasswordText: {
        color: '#4a90e2',
        textDecorationLine: 'underline',
    },
    exitButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    exitIcon: {
        width: 30,
        height: 30,
    },
});

export default LoginPage;
