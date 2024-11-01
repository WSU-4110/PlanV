import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

class Observer {
  constructor(fweather) {
    this.fweather = fweather;
  }

  update(data) {
    this.fweather(data);
  }
}

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(0);
  const [airQuality, setAirQuality] = useState(0); 
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#F0F0F0');

  const API_KEY = 'e1fcf1f73f2c067c1e69c87dc6650ce4';
  
  function alertFlightDelay(data) {
    const condition = data.weather[0].main;
    const description = data.weather[0].description;
  
    if (condition === 'Snow' || description.includes('heavy rain') || description.includes('moderate rain')) {
      Alert.alert(
        'Flight Alert',
        'Due to current weather conditions (snow or rain), flights might be delayed.',
        [{ text: 'OK' }]
      );
    }
  }

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError(null);
        fetchAirQuality(data.coord.lat, data.coord.lon);
        setBackgroundColor(getBackgroundColor(data.weather[0].main));


        const observer = new Observer(alertFlightDelay);
        observer.update(data);
      } else {
        setError(data.message);
        setWeatherData(0);
        setAirQuality(0);
      }
    } catch (err) {
      setError('Contact us for this error. Could not fetch weather.');
      setWeatherData(0); 
      setAirQuality(0);
    }
  };

  const fetchAirQuality = async function(lat, lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    setAirQuality(data.list[0].main.aqi);
  };
  
  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  const getBackgroundColor = (condition) => {
    switch (condition) {
      case 'Clear':
        return '#87CEEB';
      case 'Rain':
        return '#ADD8E6';
      case 'Clouds':
        return '#D3D3D3';
      case 'Snow':
        return '#F0F8FF';
      case 'Drizzle':
        return '#B0C4DE';
      case 'Thunderstorm':
        return '#778899';
      case 'Fog':
        return '#C0C0C0';
      case 'Haze':
        return '#F5F5DC';
      default:
        return '#F0F0F0';
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {weatherData !== 0 && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Text style={styles.description}>
            {weatherData.weather[0].description}
          </Text>

          <TouchableOpacity onPress={toggleTemperature}>
            <Text style={styles.temperature}>
              {isCelsius
                ? `${Math.round(weatherData.main.temp)}°C`
                : `${Math.round((weatherData.main.temp * 9) / 5 + 32)}°F`}
            </Text>
          </TouchableOpacity>

          <Text style={styles.feelsLike}>
            Feels Like: {isCelsius
              ? `${Math.round(weatherData.main.feels_like)}°C`
              : `${Math.round((weatherData.main.feels_like * 9) / 5 + 32)}°F`}
          </Text>

          <Text style={styles.details}>
            Humidity: {weatherData.main.humidity}%
          </Text>
          <Text style={styles.details}>
            Wind Speed: {weatherData.wind.speed} m/s
          </Text>

          <Text style={styles.time}>
            Current Time: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
          </Text>

          <Text style={styles.airQuality}>
            Air Quality: {airQuality}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 45,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginVertical: 5,
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  feelsLike: {
    fontSize: 18,
    color: '#777',
  },
  details: {
    fontSize: 16,
    color: '#777',
  },
  time: {
    fontSize: 16,
    color: '#777',
  },
  airQuality: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});

export default Weather;
