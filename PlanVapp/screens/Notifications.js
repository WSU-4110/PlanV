import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';

export default function Notifications() {
    const [allNotifications, setAllNotifications] = useState(false);
    const [flightNotifications, setFlightNotifications] = useState(false);
    const [hotelNotifications, setHotelNotifications] = useState(false);
    const [bookingChanges, setBookingChanges] = useState(false);

    return (
        <ScrollView>
        <View style={styles.container}>
            {/* Cute Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Notification Center 🔔</Text>
                <Text style={styles.subtitle}>Stay informed!</Text>
            </View>

            {/* Notification Settings */}
            <View style={styles.settingsContainer}>
                {/* All Notifications */}
                <View style={styles.option}>
                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>💎 All Notifications</Text>
                        <Text style={styles.optionDescription}>Get updates on everything</Text>
                    </View>
                    <Switch
                        value={allNotifications}
                        onValueChange={(value) => setAllNotifications(value)}
                        trackColor={{ false: '#E0E0E0', true: '#FF69B4' }}
                        thumbColor={allNotifications ? '#FFFFFF' : '#f4f3f4'}
                    />
                </View>

                {/* Flight Notifications */}
                <View style={styles.option}>
                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>✈️ Flight Updates</Text>
                        <Text style={styles.optionDescription}>Stay updated on your travels</Text>
                    </View>
                    <Switch
                        value={flightNotifications}
                        onValueChange={(value) => setFlightNotifications(value)}
                        trackColor={{ false: '#E0E0E0', true: '#4ECDC4' }}
                        thumbColor={flightNotifications ? '#FFFFFF' : '#f4f3f4'}
                    />
                </View>

                {/* Hotel Notifications */}
                <View style={styles.option}>
                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>🏨 Hotel Alerts</Text>
                        <Text style={styles.optionDescription}>Never miss a booking detail</Text>
                    </View>
                    <Switch
                        value={hotelNotifications}
                        onValueChange={(value) => setHotelNotifications(value)}
                        trackColor={{ false: '#E0E0E0', true: '#5D3FD3' }}
                        thumbColor={hotelNotifications ? '#FFFFFF' : '#f4f3f4'}
                    />
                </View>

                {/* Changes in Booking Notifications */}
                <View style={styles.option}>
                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>🔄 Booking Changes</Text>
                        <Text style={styles.optionDescription}>Get instant change notifications</Text>
                    </View>
                    <Switch
                        value={bookingChanges}
                        onValueChange={(value) => setBookingChanges(value)}
                        trackColor={{ false: '#E0E0E0', true: '#FF6B6B' }}
                        thumbColor={bookingChanges ? '#FFFFFF' : '#f4f3f4'}
                    />
                </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d0eefe', 
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    illustration: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#7A7A7A',
        marginBottom: 20,
        textAlign: 'center',
    },
    settingsContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 20,
        elevation: 5,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    optionText: {
        flexDirection: 'column',
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    optionDescription: {
        fontSize: 14,
        color: '#7A7A7A',
    },
    saveButton: {
        backgroundColor: '#2599fa',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
