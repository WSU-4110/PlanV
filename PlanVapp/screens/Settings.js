import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Linking, 
  SafeAreaView 
} from 'react-native';
import { auth } from '../firebaseConfig'; 

export const SettingsScreen = ({ navigation }) => {
    const handleContact = () => {
        Linking.openURL('mailto:planvapp@gmail.com');
    };

    const handleLogout = () => {
        auth.signOut();
        navigation.navigate('Login');
    };

    const SettingsOption = ({ icon, text, onPress, testID }) => (
        <TouchableOpacity 
            style={styles.option} 
            onPress={onPress}
            testID={testID}
        >
            <Text style={styles.optionIcon}>{icon}</Text>
            <Text style={styles.optionText}>{text}</Text>
            <Text style={styles.chevron}>➡️</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settingsSection}>
                <SettingsOption 
                    icon="👤"
                    text="Account" 
                    onPress={() => navigation.navigate('Account')}
                    testID="account-button"
                />

                <SettingsOption 
                    icon="🔔"
                    text="Notifications" 
                    onPress={() => navigation.navigate('Notifications')}
                    testID="notifications-button"
                />

                <SettingsOption 
                    icon="📄"
                    text="Documents" 
                    onPress={() => navigation.navigate('Documents')}
                    testID="Documents-button"
                />  

                <SettingsOption 
                    icon="💳"
                    text="Payment Information" 
                    onPress={() => navigation.navigate('Payment')}
                    testID="payment-button"
                />

                <SettingsOption 
                    icon="❓"
                    text="FAQ" 
                    onPress={() => navigation.navigate('Faq')}
                    testID="FAQ-button"
                />

                <SettingsOption 
                    icon="✉️"
                    text="Contact Us" 
                    onPress={() => navigation.navigate('Contact')}
                    testID="contact-button"
                />
            </View>

            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
                testID="logout-button"
            >
                <Text style={styles.logoutText}>🚪 Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingVertical: 20,
        backgroundColor: '#d0eefe',
        paddingHorizontal: 20,
        paddingBottom: 10, 
    },
    settingsSection: {
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionIcon: {
        fontSize: 24,
        marginRight: 15,
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    chevron: {
        fontSize: 18,
        color: '#888',
    },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#FF6B6B',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SettingsScreen;

