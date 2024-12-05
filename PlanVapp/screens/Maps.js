import Geolocation from '@react-native-community/geolocation';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import 'react-native-get-random-values';

const Maps = ({ route }) => {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [drivingTime, setDrivingTime] = useState(null);
    const [planeTime, setPlaneTime] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const mapRef = useRef(null);
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCRz4XXO5F1RvKuDZbMeo9L7CjFPj_RJKc';

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userLocation = { latitude, longitude };
                setCurrentLocation(userLocation);

                // Automatically set origin from user's location and destination from route params
                setOrigin(userLocation);
                if (route.params && route.params.destination) {
                    const destinationCoords = route.params.destination;
                    setDestination(destinationCoords);

                    // Animate to region
                    if (mapRef.current) {
                        mapRef.current.animateToRegion(
                            {
                                latitude: destinationCoords.latitude,
                                longitude: destinationCoords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            },
                            1000
                        );
                    }
                }
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, [route.params]);

    const calculatePlaneTime = (origin, destination) => {
        const toRadians = (degree) => degree * (Math.PI / 180);

        const lat1 = toRadians(origin.latitude);
        const lat2 = toRadians(destination.latitude);
        const deltaLat = toRadians(destination.latitude - origin.latitude);
        const deltaLon = toRadians(destination.longitude - origin.longitude);

        const R = 6371; // Radius of Earth in km
        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        const planeSpeed = 900; // in km/h
        const time = distance / planeSpeed;
        const hours = Math.floor(time);
        const minutes = Math.round((time - hours) * 60);
        return `${hours} hr ${minutes} min`;
    };

    useEffect(() => {
        if (origin && destination) {
            const planeTravelTime = calculatePlaneTime(origin, destination);
            setPlaneTime(planeTravelTime);
        }
    }, [origin, destination]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                    latitude: currentLocation ? currentLocation.latitude : 37.78825,
                    longitude: currentLocation ? currentLocation.longitude : -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {origin && <Marker coordinate={origin} />}
                {destination && <Marker coordinate={destination} />}
                {origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                )}
            </MapView>

            {planeTime && (
                <View style={styles.travelTimeContainer}>
                    <Text style={styles.travelTimeText}>
                        Plane travel time: {planeTime}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    travelTimeContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    travelTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Maps;
