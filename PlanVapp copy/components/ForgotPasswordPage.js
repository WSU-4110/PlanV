import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { auth } from '../firebaseConfig'; // Ensure to import your Firebase configuration
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the Firebase function

const ForgotPasswordPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    if (email) {
      setLoading(true); // Start loading state
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert('Success', `Instructions sent to ${email}`);
          setEmail(''); // Reset email state
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          Alert.alert('Error', 'Failed to send password reset email. Please check your email address.');
        })
        .finally(() => {
          setLoading(false); // Reset loading state
        });
    } else {
      Alert.alert('Error', 'Please enter a valid email address.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }]}>
      <Text style={[styles.title, { color: isDarkMode ? Colors.white : Colors.black }]}>
        Forgot Password
      </Text>
      <Text style={[styles.label, { color: isDarkMode ? Colors.light : Colors.dark }]}>
        Enter your email address to receive password reset instructions.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Send Instructions</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ForgotPasswordPage;
