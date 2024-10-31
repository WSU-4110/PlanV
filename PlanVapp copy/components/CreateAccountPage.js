import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { auth } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; 
import { firestore } from '@react-native-firebase/firestore'; // Import Firestore

const CreateAccountPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateAccount = () => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Store user information in Firestore
                firestore()
                    .collection('users')
                    .doc(user.uid) // Store user data by their unique UID
                    .set({
                        email: user.email,
                        createdAt: new Date(),
                    })
                    .then(() => {
                        console.log('User data stored in Firestore!');
                    })
                    .catch((error) => {
                        console.error('Error storing user data:', error);
                    });

                // Send email verification
                sendEmailVerification(user)
                    .then(() => {
                        Alert.alert('Success', 'Account created! Please check your email to verify your account.');
                        navigation.navigate('Login');
                    })
                    .catch((verificationError) => {
                        console.error('Verification email error:', verificationError);
                        Alert.alert('Error', 'Failed to send verification email. Please try again.');
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error(error.message);
                Alert.alert('Error', errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Create Account</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity onPress={handleCreateAccount} disabled={loading} style={styles.createButton}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.createButtonText}>Create Account</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Already have an account? Login</Text>
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
    headerText: {
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
        elevation: 2, 
    },
    createButton: {
        backgroundColor: '#000000', 
        borderRadius: 5,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    loginLink: {
        color: '#4a90e2',
        textDecorationLine: 'underline',
    },
});

export default CreateAccountPage;
