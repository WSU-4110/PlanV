import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView, Image } from 'react-native';
import icons from '../constants/icons';

export default function SettingsScreen({ navigation }) {
    const handleContact = () => {
        Linking.openURL('mailto:planvapp@gmail.com');
    };
    
    return (
        <ScrollView style={styles.container}>
            {/* Account */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Account')}>
                <View style={styles.optionRow}>
                    <Image source={icons.account} style={styles.icon} />
                    <Text style={styles.optionText}>Account and Security</Text>
                </View>
            </TouchableOpacity>

            {/* Notifications */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Notifications')}>
                <View style={styles.optionRow}>
                    <Image source={icons.notification} style={styles.icon} />
                    <Text style={styles.optionText}>Notifications</Text>
                </View>
            </TouchableOpacity>

            {/* Appearance */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Appearance')}>
                <View style={styles.optionRow}>
                    <Image source={icons.appearance} style={styles.icon} />
                    <Text style={styles.optionText}>Appearance</Text>
                </View>
            </TouchableOpacity>

            {/* Payment Info */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Payment')}>
            <View style={styles.optionRow}>
                    <Image source={icons.pay} style={styles.icon} />
                    <Text style={styles.optionText}>Payment Information</Text>
                </View>
            </TouchableOpacity>

            {/* My Documents */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Documents')}>
            <View style={styles.optionRow}>
                    <Image source={icons.docs} style={styles.icon} />
                    <Text style={styles.optionText}>My Documents</Text>
                </View>
            </TouchableOpacity>

            {/* FAQ */}
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FAQ')}>
            <View style={styles.optionRow}>
                    <Image source={icons.faq} style={styles.icon} />
                    <Text style={styles.optionText}>FAQ</Text>
                </View>
            </TouchableOpacity>
            

            {/* Contact Us */}
            <TouchableOpacity style={styles.option} onPress={handleContact}>
            <View style={styles.optionRow}>
                    <Image source={icons.contact} style={styles.icon} />
                    <Text style={styles.optionText}>Contact Us</Text>
                </View>
            </TouchableOpacity>

            {/* Log Out */}
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
        marginLeft: 10, // Add space between the icon and text
        fontSize: 16,
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
    icon: {
        width: 30,
        height: 50,
        tintColor: 'black',
    },
});
