// LoginPage.js

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import PlanVLogo from '../assets/PlanVLogo.png';
import { auth } from '../firebaseConfig'; // Import auth from your config
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import sign-in method

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('Login Success', `Welcome back, ${user.email}!`);
                // Navigate to another page or perform actions on successful login
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert('Login Failed', errorMessage);
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
            <Text style={styles.loginText}>Login</Text>
            <TextInput
                placeholder="Username (Email)"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none" // Prevent auto-capitalization
                keyboardType="email-address" // Email keyboard
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
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
    loginText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 15,
        backgroundColor: '#fff',
        elevation: 2, // Add elevation for shadow effect
    },
    loginButton: {
        backgroundColor: '#000000',
        borderRadius: 5,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
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
