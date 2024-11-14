import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(0);
  const [airQuality, setAirQuality] = useState('');
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [time, setTime] = useState(new Date());

  const API_KEY = 'e1fcf1f73f2c067c1e69c87dc6650ce4';

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
      } else {
        setError(data.message);
        setWeatherData(0);
        setAirQuality('');
      }
    } catch (err) {
      setError('Contact us for this error. Could not fetch weather.');
      setWeatherData(0); 
      setAirQuality('');
    }
    setCity('');
  };

  const fetchAirQuality = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    const aqi = data.list[0].main.aqi;
    const aqiLabel = getAqiLabel(aqi);
    setAirQuality(aqiLabel);
  };

  const getAqiLabel = (aqi) => {
    switch (aqi) {
      case 1: return 'Good';
      case 2: return 'Fair';
      case 3: return 'Moderate';
      case 4: return 'Poor';
      case 5: return 'Very Poor';
      default: return 'Unknown';
    }
  };
  
  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  const getBackgroundImage = () => {
    if (weatherData !== 0) {
      const condition = weatherData.weather[0].main.toLowerCase();
      switch (condition) {
        case 'clouds': return require('../assets/clouds.jpg');
        case 'fog': return require('../assets/foggy.jpg');
        case 'rain': return require('../assets/rainy.jpg');
        case 'snow': return require('../assets/snowy.jpg');
        case 'thunderstorm': return require('../assets/stormy.jpg');
        default: return require('../assets/clouds.jpg');
      }
    }
    return require('../assets/clouds.jpg');
  };

  return (
    <ImageBackground
      source={getBackgroundImage()}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#888"
        />

        {city.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={fetchWeather}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        {weatherData !== 0 && (
          <View style={styles.weatherContent}>
            <Text style={styles.city}>{weatherData.name}</Text>
            <Text style={styles.description}>
              {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
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

            <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
            <Text style={styles.details}>Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Text style={styles.time}>Current Time: {time.toLocaleTimeString()}</Text>
            <Text style={styles.airQuality}>Air Quality: {airQuality}</Text>
            <Text style={styles.details}>
              Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </Text>
            <Text style={styles.details}>
              Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.9,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 45,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Gotham',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Gotham',
  },
  weatherContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    borderRadius: 12,
  },
  city: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'Gotham',
  },
  description: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555',
    fontFamily: 'Gotham',
  },
  temperature: {
    fontSize: 32,
    marginVertical: 10,
    color: '#333',
    fontFamily: 'Gotham',
  },
  feelsLike: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Gotham',
  },
  details: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Gotham',
  },
  time: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Gotham',
  },
  airQuality: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    fontFamily: 'Gotham',
  },
});

export default Weather;
