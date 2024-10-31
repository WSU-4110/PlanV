import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null); 
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); 
  const [backgroundColor, setBackgroundColor] = useState('#F0F0F0'); 

  const API_KEY = 'e1fcf1f73f2c067c1e69c87dc6650ce4'; 

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
        // this line of code changes the color of background.
        setBackgroundColor(getBackgroundColor(data.weather[0].main)); 
      } else {
        setError(data.message);
        setWeatherData(null);
        setAirQuality(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      setWeatherData(null);
      setAirQuality(null);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();
      setAirQuality(data.list[0].main.aqi);
    } catch (err) {
      console.error('Failed to fetch air quality data.');
    }
  };

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  const getFlavorText = (condition) => {
    switch (condition) {
      case 'Clear':
        return "It's a clear sky day! Perfect for outdoor activities.";
      case 'Rain':
        return "Rainy day vibes. Time to cozy up or grab an umbrella!";
      case 'Clouds':
        return "Cloudy skies ahead. Not too bright, not too gloomy.";
      case 'Snow':
        return "Snowflakes are falling. Winter wonderland mode activated!";
      case 'Drizzle':
        return "A light drizzle to keep things cool.";
      case 'Thunderstorm':
        return "Storm's brewing! Best to stay indoors.";
      case 'Mist':
      case 'Fog':
        return "The mist is thick, creating an air of mystery.";
      case 'Haze':
        return "Hazy views, but life goes on.";
      default:
        return "Interesting weather today. Enjoy it!";
    }
  };

  const getAirQualityDescription = (aqi) => {
    if (!aqi) return 'Air quality data unavailable.';
    switch (aqi) {
      case 1:
        return 'Air quality is excellent.';
      case 2:
        return 'Air quality is good.';
      case 3:
        return 'Air quality is satisfactory.';
      case 4:
        return 'Air quality is poor.';
      case 5:
        return 'Air quality is very poor.';
      default:
        return 'Air quality data cannot be fetched.';
    }
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
      case 'Mist':
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
      <Text style={styles.title}></Text>

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

      {weatherData && (
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
            {getAirQualityDescription(airQuality)}
          </Text>

          <Text style={styles.flavorText}>
            {getFlavorText(weatherData.weather[0].main)}
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
  title: {
    fontSize: 26, // Slightly larger font for the title
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Helvetica',
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
    fontFamily: 'Arial',
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
    fontFamily: 'Arial',
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
    fontFamily: 'Helvetica',
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontFamily: 'Arial',
  },
  temperature: {
    fontSize: 48, 
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  feelsLike: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Arial',
  },
  details: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Arial',
  },
  time: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Arial',
  },
  airQuality: {
    fontSize: 18,
    marginTop: 10,
    fontStyle: 'italic',
    fontFamily: 'Arial',
  },
  flavorText: {
    fontSize: 18,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  error: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Arial',
  },
});

export default Weather;
