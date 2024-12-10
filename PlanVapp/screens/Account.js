import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  ScrollView,
  Alert,
  FlatList 
} from 'react-native';
import { auth, firestore } from '../firebaseConfig';
import { 
  updateProfile, 
  updateEmail, 
  updatePassword,
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AccountScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    displayName: auth.currentUser?.displayName || 'Your Name',
    email: auth.currentUser?.email || '',
    phoneNumber: auth.currentUser?.phoneNumber || 'Not Entered'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [bookings, setBookings] = useState({
    flights: [],
    hotels: []
  });

  // Fetch bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        // Fetch flight bookings
        // const flightQuery = query(
        //   collection(firestore, 'bookings'), 
        //   where('userId', '==', currentUser.uid),
        //   where('type', '==', 'flight')
        // );
        // const flightSnapshot = await getDocs(flightQuery);
        // const flightBookings = flightSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));

        // Fetch hotel bookings
        // const hotelQuery = query(
        //   collection(firestore, 'bookings'), 
        //   where('userId', '==', currentUser.uid),
        //   where('type', '==', 'hotel')
        // );
        // const hotelSnapshot = await getDocs(hotelQuery);
        // const hotelBookings = hotelSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));

        // setBookings({
        //   flights: flightBookings,
        //   hotels: hotelBookings
        // });
            } catch (error) {
        console.error('Error fetching bookings:', error);
        Alert.alert('Error', 'Could not fetch bookings');
            }
          };

          fetchBookings();
        }, []);

  const handleUpdateProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Update display name
        await updateProfile(currentUser, {
          displayName: userData.displayName
        });

        // Update email if changed
        if (userData.email !== currentUser.email) {
          await updateEmail(currentUser, userData.email);
        }

        Alert.alert('Success', 'Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleChangePassword = async () => {
    // Validate password inputs
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Reauthenticate the user
        const credential = EmailAuthProvider.credential(
          currentUser.email, 
          passwordData.currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);

        // Change password after successful reauthentication
        await updatePassword(currentUser, passwordData.newPassword);
        
        Alert.alert('Success', 'Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      let errorMessage = 'An error occurred';
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage = 'Current password is incorrect';
          break;
        case 'auth/weak-password':
          errorMessage = 'New password is too weak';
          break;
        case 'auth/requires-recent-login':
          errorMessage = 'Please log out and log in again before changing password';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    }
  };

  const renderBookingItem = ({ item, type }) => (
    <View style={styles.bookingItem}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingType}>
          {type === 'flights' ? '✈️ Flight' : '🏨 Hotel'}
        </Text>
        <Text style={styles.bookingDate}>{item.date}</Text>
      </View>
      <View style={styles.bookingDetails}>
        <Text>{type === 'flights' 
          ? `From: ${item.from} To: ${item.to}` 
          : `${item.hotelName}, ${item.location}`}
        </Text>
        <Text style={styles.bookingStatus}>
          {item.status || 'Confirmed'}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Personal Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={userData.displayName}
              onChangeText={(text) => setUserData({...userData, displayName: text})}
              placeholder="Full Name"
            />
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => setUserData({...userData, email: text})}
              placeholder="Email"
              keyboardType="email-address"
            />
          </>
        ) : (
          <>
            <Text style={styles.detailText}>Name: {userData.displayName}</Text>
            <Text style={styles.detailText}>Email: {userData.email}</Text>
            <Text style={styles.detailText}>Phone: {userData.phoneNumber}</Text>
          </>
        )}
        
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
          </Text>
        </TouchableOpacity>
        
        {isEditing && (
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleUpdateProfile}
          >
            <Text style={styles.saveButtonText}>💾 Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bookings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 My Bookings</Text>
        
        {/* Flight Bookings */}
        {bookings.flights.length > 0 ? (
          <View>
            <Text style={styles.bookingTypeHeader}>✈️ Flight Bookings</Text>
            <FlatList
              data={bookings.flights}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderBookingItem({ item, type: 'flights' })}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <Text style={styles.noBookingsText}>No flight bookings found</Text>
        )}

        {/* Hotel Bookings */}
        {bookings.hotels.length > 0 ? (
          <View style={styles.hotelBookingsContainer}>
            <Text style={styles.bookingTypeHeader}>🏨 Hotel Bookings</Text>
            <FlatList
              data={bookings.hotels}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderBookingItem({ item, type: 'hotels' })}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <Text style={styles.noBookingsText}>No hotel bookings found</Text>
        )}
      </View>

      {/* Password Change Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔒 Change Password</Text>
        <TextInput
          style={styles.input}
          value={passwordData.currentPassword}
          onChangeText={(text) => setPasswordData({...passwordData, currentPassword: text})}
          placeholder="Current Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={passwordData.newPassword}
          onChangeText={(text) => setPasswordData({...passwordData, newPassword: text})}
          placeholder="New Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={passwordData.confirmPassword}
          onChangeText={(text) => setPasswordData({...passwordData, confirmPassword: text})}
          placeholder="Confirm New Password"
          secureTextEntry
        />
        <TouchableOpacity 
          style={styles.changePasswordButton} 
          onPress={handleChangePassword}
        >
          <Text style={styles.changePasswordText}>🔑 Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0eefe',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailText: {
    marginBottom: 5,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  changePasswordButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  changePasswordText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookingItem: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    width: 250,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookingType: {
    fontWeight: 'bold',
  },
  bookingDate: {
    color: '#666',
  },
  bookingDetails: {
    flexDirection: 'column',
  },
  bookingStatus: {
    color: 'green',
    marginTop: 5,
  },
  bookingTypeHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  noBookingsText: {
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  hotelBookingsContainer: {
    marginTop: 10,
  },
});

export default AccountScreen;
