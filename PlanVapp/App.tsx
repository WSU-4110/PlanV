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
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from "react-redux";
import store from './store';
import { ModalPortal } from "react-native-modals";
import icons from "./constants/icons";
import Weather from './screens/Weather';
import Payment from './screens/Payment';
import FirstScreen from './components/FirstScreen';
import { useNavigation } from '@react-navigation/native';
import Maps from './screens/Maps';
import Notifications from './screens/Notifications';
import Contact from './screens/Contact';
import Account from './screens/Account';




import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { applyActionCode, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth stack for login, create account, and forgot password
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{
        headerShown: false
        }}/>
      
      <Stack.Screen name="Login" component={LoginPage} options={{
        headerShown: false
        }}/>
      <Stack.Screen name="CreateAccount" component={CreateAccountPage} options={{
        headerShown: false
      }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} options={{
        headerShown: false }} />
      <Stack.Screen name="Maps" component={Maps} options={{
      headerShown: false }}/>
      
    </Stack.Navigator>
  );
}

// Booking stack for booking screens
function BookingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InitialBooking" component={InitialBooking} options={{
        headerShown: false }} />
      <Stack.Screen name="FlightFilters" component={FlightFilters} options={{
      headerShown: false }}/>
      <Stack.Screen name="HotelFilters" component={HotelFilters} options={{
      headerShown: false }}/>
      <Stack.Screen name="CarFilters" component={CarFilters} options={{
      headerShown: false }}/>
    </Stack.Navigator>
  );
}

// Settings stack with Payment and Documents screens
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} options={{
      headerShown: false }}/>
      <Stack.Screen name="Payment" component={Payment} options={{
      headerShown: false }}/> 
      <Stack.Screen name="Account" component={Account} options={{
      headerShown: false }}/>
      <Stack.Screen name="Documents" component={Documents} options={{
      headerShown: false }}/>
      <Stack.Screen name="Notifications" component={Notifications} options={{
      headerShown: false }}/>
      <Stack.Screen name="Contact" component={Contact} options={{
      headerShown: false }}/>
    </Stack.Navigator>
  );
}

// Main tabs for Home, Booking, and Settings
function MainAppTabs() {
    const navigation = useNavigation();
  
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerLeft: route.name === "Booking" ? (
            <Button
              title="Back"
              onPress={() => navigation.goBack()}
              color="blue"
            />
          ) : null,
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="HomePage" component={HomeStack} />
        <Tab.Screen
          name="Booking"
          component={BookingStack}
          options={{
            headerTitle: "Booking",
            headerLeft: () => (
              <Button
                title="Back"
                onPress={() => navigation.goBack()}
                color="blue"
              />
            ),
          }}
        />
        <Tab.Screen name="Weather" component={Weather} />
        <Tab.Screen name="Settings" component={SettingsStack} />
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
