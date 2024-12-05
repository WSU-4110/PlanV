import Geolocation from '@react-native-community/geolocation';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import 'react-native-get-random-values';

const Maps = () => {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [drivingTime, setDrivingTime] = useState(null);
    const [planeTime, setPlaneTime] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [firstField, setFirstField] = useState(""); // First field for current location
    const [secondField, setSecondField] = useState(""); // Second field for coordinates of the selected image
    const mapRef = useRef(null);
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCRz4XXO5F1RvKuDZbMeo9L7CjFPj_RJKc'; 

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                if (mapRef.current) {
                    mapRef.current.animateToRegion(
                        {
                            latitude,
                            longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        1000
                    );
                }
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    const handleImagePress = (imageLatitude, imageLongitude) => {
        // Set first field (current location)
        setFirstField(`Current Location: ${currentLocation.latitude}, ${currentLocation.longitude}`);

        // Set second field (coordinates of the selected image)
        setSecondField(`Selected Location: ${imageLatitude}, ${imageLongitude}`);

        // Update destination with the selected image coordinates
        setDestination({ latitude: imageLatitude, longitude: imageLongitude });

        // Move map to the selected location
        mapRef.current.animateToRegion({
            latitude: imageLatitude,
            longitude: imageLongitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }, 1000);
        
        getTravelTimes({ latitude: imageLatitude, longitude: imageLongitude });
    };

    const handleDestinationSelect = (data, details = null) => {
        if (details && details.geometry && details.geometry.location) {
            const newDestination = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            };
            setDestination(newDestination);
            mapRef.current.animateToRegion({
                ...newDestination,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
            getTravelTimes(newDestination);
        } else {
            console.error("Location details are undefined", details);
        }
    };

    const handleOriginSelect = (data, details = null) => {
        if (details && details.geometry && details.geometry.location) {
            const newOrigin = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            };
            setOrigin(newOrigin);
            mapRef.current.animateToRegion({
                ...newOrigin,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
            if (destination) {
                getTravelTimes(newOrigin);
            }
        } else {
            console.error("Location details are undefined", details);
        }
    };

    const getTravelTimes = (destination) => {
        if (!origin) {
            console.error('Origin not set');
            return;
        }

        const originStr = `${origin.latitude},${origin.longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;

        const drivingUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originStr}&destinations=${destinationStr}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`;

        fetch(drivingUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.rows && data.rows[0].elements[0].duration) {
                    setDrivingTime(data.rows[0].elements[0].duration.text);
                } else {
                    setDrivingTime("Cannot be found");
                }
            })
            .catch((error) => {
                console.error('Error fetching driving time', error);
                setDrivingTime("Cannot be found");
            });

        const planeTravelTime = calculatePlaneTime(origin, destination);
        setPlaneTime(planeTravelTime);
    };

    const calculatePlaneTime = (origin, destination) => {
        const toRadians = (degree) => degree * (Math.PI / 180);

        const lat1 = toRadians(origin.latitude);
        const lat2 = toRadians(destination.latitude);
        const deltaLat = toRadians(destination.latitude - origin.latitude);
        const deltaLon = toRadians(destination.longitude - origin.longitude);

        const R = 6371;
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        const planeSpeed = 900;
        const time = distance / planeSpeed;
        const hours = Math.floor(time);
        const minutes = Math.round((time - hours) * 60);
        return `${hours} hr ${minutes} min`;
    };

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
                    drivingTime !== "Cannot be found" ? (
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />
                    ) : (
                        <Polyline
                            coordinates={[origin, destination]}
                            strokeWidth={3}
                            strokeColor="blue"
                        />
                    )
                )}
            </MapView>

            {/* Origin Input */}
            <GooglePlacesAutocomplete
                placeholder="Enter your current location"
                fetchDetails={true}
                onPress={handleOriginSelect}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                styles={{
                    container: { position: 'absolute', top: 20, left: 10, right: 10, zIndex: 1 },
                    textInput: styles.textInput,
                    listView: {
                        zIndex: 2,
                        backgroundColor: 'white',
                        marginTop: 10,
                    },
                }}
            />

            <GooglePlacesAutocomplete
                placeholder="Enter destination"
                fetchDetails={true}
                onPress={handleDestinationSelect}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
                styles={{
                    container: { position: 'absolute', top: 90, left: 10, right: 10, zIndex: 1 },
                    textInput: styles.textInput,
                    listView: {
                        zIndex: 2,
                        backgroundColor: 'white',
                        marginTop: 10,
                    },
                }}
            />

            {drivingTime && (
                <View style={styles.travelTimeContainer}>
                    <Text style={styles.travelTimeText}>
                        Driving time: {drivingTime}
                    </Text>
                    <Text style={styles.travelTimeText}>
                        Plane travel time: {planeTime}
                    </Text>
                </View>
            )}

            {/* Directions Button */}
            {destination && (
                <TouchableOpacity
                    style={styles.directionsButton}
                    onPress={() => {
                        if (!origin) {
                            setOrigin({
                                latitude: 37.78825,
                                longitude: -122.4324,
                            });
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Get Directions</Text>
                </TouchableOpacity>
            )}

            {/* Images on Homepage */}
            <TouchableOpacity onPress={() => handleImagePress(37.78825, -122.4324)}>
                <Image source={require('./path/to/image1.jpg')} style={styles.image} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleImagePress(34.0522, -118.2437)}>
                <Image source={require('./path/to/image2.jpg')} style={styles.image} />
            </TouchableOpacity>

            {/* Display Fields */}
            <View style={styles.fieldsContainer}>
                <Text style={styles.fieldText}>{firstField}</Text>
                <Text style={styles.fieldText}>{secondField}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingLeft: 10,
        marginBottom: 10,
    },
    travelTimeContainer: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
    },
    travelTimeText: {
        color: 'white',
        fontSize: 16,
    },
    directionsButton: {
        position: 'absolute',
        bottom: 80,
        left: 10,
        right: 10,
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 20,
        marginLeft: 10,
        marginBottom: 10,
    },
    fieldsContainer: {
        position: 'absolute',
        top: 150,
        left: 10,
        right: 10,
    },
    fieldText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
    },
});

export default Maps;
