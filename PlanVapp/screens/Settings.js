import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
export default function SettingsScreen({ navigation }) {
    const handleContact = () => {
        Linking.openURL('mailto:planvapp@gmail.com');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            {/* Payment Info */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Payment')}>
                <Text>Payment Info</Text>
            </TouchableOpacity>
            {/* My Documents */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Documents')}>
                <Text>My Documents</Text>
            </TouchableOpacity>
            {/* Contact Us */}
            <TouchableOpacity style={styles.option} onPress={handleContact}>
                <Text>Contact Us</Text>
            </TouchableOpacity>
            {/* Log Out */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
    },
});