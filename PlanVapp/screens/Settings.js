import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView, Image } from 'react-native';

export default function SettingsScreen({ navigation }) {
    const handleContact = () => {
        Linking.openURL('mailto:planvapp@gmail.com');
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Account')}>
                <View style={styles.optionRow}>
                    <Image source={require('../assets/people.png')} style={styles.image} />
                    <Text style={styles.optionText}>Account and Security</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Notifications')}>
                <View style={styles.optionRow}>
                    <Image source={require('../assets/perspective-dice-six-faces-random.png')} style={styles.image} />
                    <Text style={styles.optionText}>Notifications</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Appearance')}>
                <View style={styles.optionRow}>
                    <Image source={require('../assets/lipstick.png')} style={styles.image} />
                    <Text style={styles.optionText}>Appearance</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Payment')}>
                <View style={styles.optionRow}>
                    <Image source={require('../assets/pay-money.png')} style={styles.image} />
                    <Text style={styles.optionText}>Payment Information</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Documents')}>
                <View style={styles.optionRow}>
                    <Image source={require('../assets/full-folder.png')} style={styles.image} />
                    <Text style={styles.optionText}>My Documents</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FAQ')}>
                <View style={styles.optionRow}>
                    <Image source={require('../assets/carillon.png')} style={styles.image} />
                    <Text style={styles.optionText}>FAQ</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option} onPress={handleContact}>
                <View style={styles.optionRow}>
                    <Image source={require('../assets/people.png')} style={styles.image} />
                    <Text style={styles.optionText}>Contact Us</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'Gotham-Light',
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
        fontFamily: 'Gotham-Light',
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});
