import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import HomePage from './screens/HomePage';
import Settings from './screens/Settings';
import InitialBooking from './screens/Booking/InitialBooking';
import HotelFilters from './screens/Booking/HotelFilters';
import CarFilters from './screens/Booking/CarFilters';
import FlightFilters from './screens/Booking/FlightFilters';
import PaymentScreen from './screens/Payment';  // Import PaymentScreen
import DocumentsScreen from './screens/Documents'; // Import DocumentsScreen
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from "react-redux";
import store from './store';
import { ModalPortal } from "react-native-modals";

import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth stack for login, create account, and forgot password
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage} options={{
        title:' ',
        headerTintColor: 'blue,'
        }}/>
      <Stack.Screen name="CreateAccount" component={CreateAccountPage} options={{
        title:' ',
        headerTintColor: 'blue,'
      }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} options={{
        title:' ',
        headerTintColor: 'blue,'
      }}/>
    </Stack.Navigator>
  );
}

// Booking stack for booking screens
function BookingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InitialBooking" component={InitialBooking} />
      <Stack.Screen name="FlightFilters" component={FlightFilters} />
      <Stack.Screen name="HotelFilters" component={HotelFilters} />
      <Stack.Screen name="CarFilters" component={CarFilters} />
    </Stack.Navigator>
  );
}

// Settings stack with Payment and Documents screens
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Documents" component={DocumentsScreen} />
    </Stack.Navigator>
  );
}

// Main tabs for Home, Booking, and Settings
function MainAppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Booking" component={BookingStack} />
      <Tab.Screen name="Settings" component={SettingsStack} /> {/* Wrapped Settings in a stack */}
    </Tab.Navigator>
  );
}

// Main App component
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);  
      } else {
        setIsLoggedIn(false); 
      }
      setLoading(false);  
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <View style={styles.loadingScreen}><Text>Loading...</Text></View>;
  }

  return (
    <Provider store={store}> 
      <SafeAreaProvider>
        <NavigationContainer>
          <View style={[backgroundStyle, { flex: 1 }]}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            {isLoggedIn ? <MainAppTabs /> : <AuthStack />}
            <ModalPortal />
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
