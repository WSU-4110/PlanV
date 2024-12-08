import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import Header from '../../components/Header';
import { debounce } from 'lodash';
import icons from '../../constants/icons';

const InitialBooking = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [sourceAirportCode, setSourceAirportCode] = useState('BOM');
    const [destinationAirportCode, setDestinationAirportCode] = useState('DEL');
    const [date, setDate] = useState('2024-12-25');
    const [classOfService, setClassOfService] = useState('ECONOMY');
    const [itineraryType, setItineraryType] = useState('ONE_WAY');
    const [numAdults, setNumAdults] = useState(1); // Fixed type issue (use numbers instead of strings)
    const [numSeniors, setNumSeniors] = useState(0);
    const [numChildren, setNumChildren] = useState(0);
    const [sortOrder, setSortOrder] = useState('ML_BEST_VALUE');
    const [error, setError] = useState(null);
    const [editable, setEditable] = useState(false);
    const [query, setQuery] = useState('London');
    const [locationResults, setLocationResults] = useState([]);
    const [geoId, setGeoId] = useState('');
    const [checkIn, setCheckIn] = useState('2024-12-20');
    const [checkOut, setCheckOut] = useState('2024-12-25');
    const [hotels, setHotels] = useState([]);
    const [Hotelerror, setHotelError] = useState(null);
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [destSuggestions, setDestSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = '2be7bd6ff7msh1f5a6e2d3d965fbp194a76jsn635d94fd8c1a';

    const fetchFlightInfo = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=${sourceAirportCode}&destinationAirportCode=${destinationAirportCode}&date=${date}&itineraryType=${itineraryType}&sortOrder=${sortOrder}&numAdults=${numAdults}&numSeniors=${numSeniors}&classOfService=${classOfService}&pageNumber=1&nearby=yes&nonstop=yes&currencyCode=USD&region=USA`,
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
                        'x-rapidapi-key': API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await response.json();
            if (response.ok && data?.data?.flights) {
                // Ensure navigation works properly with data passed as parameter
                navigation.navigate('FlightFilters', { flightData: data.data.flights });
                setError(null);
            } else {
                setError('No flights found or API response error.');
            }
        } catch (err) {
            setError('Failed to fetch flight data.');
        }
        finally {
            setLoading(false); // Hide loading after the fetch is complete
        }
    };

    const fetchAirportSuggestions = async (query, setSuggestions) => {
        if (!query.trim()) return; // Prevent empty queries from triggering API calls
        try {
            const response = await fetch(`https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
                    'x-rapidapi-key': API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok && data?.data) {
                setSuggestions(data.data);
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            console.error('Failed to fetch airport suggestions:', err);
            setSuggestions([]);
        }
    };

    const debouncedSourceFetch = debounce((query) => fetchAirportSuggestions(query, setSourceSuggestions), 500);
    const debouncedDestFetch = debounce((query) => fetchAirportSuggestions(query, setDestSuggestions), 500);

    const fetchLocation = async () => {
      try {
          const response = await fetch(`https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${query}`, {
              method: 'GET',
              headers: {
                  'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
                  'x-rapidapi-key': API_KEY,
                  'Content-Type': 'application/json',
              },
          });

          const data = await response.json();
          if (response.ok && data?.data?.length > 0) {
              setLocationResults(data.data);
              setHotelError(null);
          } else {
              setHotelError('No locations found.');
              setLocationResults([]);
              setHotels([]);
          }
      } catch (err) {
          setHotelError('Failed to fetch location data.');
          setLocationResults([]);
          setHotels([]);
      }
  };

  const fetchHotel = async () => {
    setLoading(true);
      try {
          const response = await fetch(`https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=${geoId}&checkIn=${checkIn}&checkOut=${checkOut}&pageNumber=1&currencyCode=USD`, {
              method: 'GET',
              headers: {
                  'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
                  'x-rapidapi-key': API_KEY,
                  'Content-Type': 'application/json',
              },
          });

          const data = await response.json();
          
          if (response.ok && data?.data?.data?.length > 0) {
              setHotels(data.data.data);
              setHotelError(null);
          } else {
              setHotelError('No hotels found for the selected location.');
              setHotels([]);
          }
      } catch (err) {
          setHotelError('Failed to fetch hotel data.');
          setHotels([]);
      }
      finally {
        setLoading(false); // Hide loading after the fetch is complete
    }
  };

  useEffect(() => {
      fetchLocation();
  }, [query]);

  useEffect(() => {
      if (geoId) {
          fetchHotel();
      }
  }, [geoId]);

  const handleSearch = () => {
    if (geoId) {
        fetchHotel();
    }
};

  const navigateToResults = () => {
    // Navigate to SearchResults screen with hotels data as params
    navigation.navigate('HotelFilters', { hotels });
};


    const handleSelection = (option) => {
        setSelectedOption(option);
};


    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Header handleSelection={handleSelection} />
          <View style={styles.messageContainer}>
          {loading && <Text style={styles.loadingText}>Loading...</Text>} 
              {selectedOption === 'Flight' && (
                  <>
                      <Text style={styles.title}>Flight Search</Text>
                      <TextInput
                          style={styles.input}
                          placeholder="Source Airport"
                          value={sourceAirportCode}
                          onChangeText={(text) => {
                            setSourceAirportCode(text);
                            debouncedSourceFetch(text); // Use debounced fetch
                        }}
                      />
                      <FlatList
                      data={sourceSuggestions}

                      keyExtractor={(item) => item.code}
                      renderItem={({ item }) => (
                      <TouchableOpacity
                      style={styles.locationItem}
                      onPress={() => {
                        setSourceAirportCode(item.code); // Update the input with the full name and code
                        setSourceSuggestions([]); // Close the suggestions list
                        }}
                        >
                            <Text>{item.name} ({item.code})</Text>
                            </TouchableOpacity>
                        )}
                        />
                        
                      <TextInput
                      data={sourceSuggestions}
                          style={styles.input}
                          placeholder="Destination Airport"
                          value={destinationAirportCode}
                          onChangeText={(text) => {
                            setDestinationAirportCode(text);
                            debouncedDestFetch(text); // Use debounced fetch
                        }}
                        />
                        <FlatList
                        data={destSuggestions}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => (
                        <TouchableOpacity
                        style={styles.locationItem}
                        onPress={() => {
                            setDestinationAirportCode(item.code); // Update the input with the full name and code
                            setDestSuggestions([]); // Close the suggestions list
                            }}
                            >
                                <Text>{item.name} ({item.code})</Text>
                                </TouchableOpacity>
                                )}
                                />

                      <TextInput
                          style={styles.input}
                          placeholder="Date (YYYY-MM-DD)"
                          value={date}
                          onChangeText={setDate}
                      />
                      <TouchableOpacity
                          onPress={() => setEditable(!editable)}
                          style={styles.input}
                      >
                          <Image 
                          source={icons.person}
                          style={{ width: 20, height: 35 }}
                          resizeMode="contain"
                          />
                          <TextInput
                              editable={false}
                              placeholderTextColor="red"
                              placeholder={` ${numSeniors} seniors • ${numAdults} adults • ${numChildren} children`}
                              style={styles.inputOne}
                          />
                      </TouchableOpacity>
  
                      {/* Show selectors only if editable is true */}
                      {editable && (
                          <ScrollView style={styles.selectorsContainer}>
                              {[
                                  { label: 'Adults', count: numAdults, setCount: setNumAdults },
                                  { label: 'Seniors', count: numSeniors, setCount: setNumSeniors },
                                  
                              ].map(({ label, count, setCount }, index) => (
                                  <View key={index} style={styles.selector}>
                                      <Text style={styles.label}>{label}</Text>
                                      <View style={styles.counterContainer}>
                                          <TouchableOpacity
                                              onPress={() => setCount(Math.max(0, count - 1))}
                                              style={styles.counterButton}
                                          >
                                              <Text style={styles.counterText}>-</Text>
                                          </TouchableOpacity>
                                          <Text style={styles.countText}>{count}</Text>
                                          <TouchableOpacity
                                              onPress={() => setCount(count + 1)}
                                              style={styles.counterButton}
                                          >
                                              <Text style={styles.counterText}>+</Text>
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              ))}
                          </ScrollView>
                      )}
                      <TouchableOpacity style={styles.button} onPress={fetchFlightInfo}>
                          <Text style={styles.buttonText}>Search Flights</Text>
                      </TouchableOpacity>
                  </>
              )}
              {error && <Text style={styles.error}>{error}</Text>}
              {!selectedOption && <Text style={styles.messageText}>Please select an option and use the filters already input as they have been tested and work</Text>}
              {selectedOption === 'Hotel' && (
                  <>
                      <Text style={styles.Hoteltitle}>Hotel Search</Text>
  
                      <TextInput
                          style={styles.Hotelinput}
                          placeholder="Search for hotels in..."
                          value={query}
                          onChangeText={(text) => setQuery(text)}
                          placeholderTextColor="#888"
                      />
  
                      {locationResults.length > 0 && (
                          <FlatList
                              data={locationResults}
                              keyExtractor={(item) => item.geoId.toString()}
                              renderItem={({ item }) => (
                                  <TouchableOpacity
                                      style={styles.HotellocationItem}
                                      onPress={() => {
                                          setGeoId(item.geoId);
                                          setQuery(item.title.replace(/<[^>]+>/g, ''));
                                          setLocationResults([]);
                                      }}
                                  >
                                      <Text>{item.title.replace(/<[^>]+>/g, '')} - {item.secondaryText}</Text>
                                  </TouchableOpacity>
                              )}
                          />
                      )}
  
                      <TextInput
                          style={styles.Hotelinput}
                          placeholder="Check-in Date"
                          value={checkIn}
                          onChangeText={(text) => setCheckIn(text)}
                          placeholderTextColor="#888"
                      />
                      <TextInput
                          style={styles.Hotelinput}
                          placeholder="Check-out Date"
                          value={checkOut}
                          onChangeText={(text) => setCheckOut(text)}
                          placeholderTextColor="#888"
                      />
                      
                      <TouchableOpacity style={styles.Hotelbutton} onPress={handleSearch}>
                          <Text style={styles.HotelbuttonText}>Search</Text>
                      </TouchableOpacity>
  
                      {hotels.length > 0 && (
                          <TouchableOpacity style={styles.Hotelbutton} onPress={navigateToResults}>
                              <Text style={styles.HotelbuttonText}>Go to Results</Text>
                          </TouchableOpacity>
                      )}
                {Hotelerror && <Text style={styles.Hotelerror}>{Hotelerror}</Text>}
                    </>
                )}
  
          </View>
      </ScrollView>
  );
};
  

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 18 },
    error: { color: 'red', marginVertical: 10 },
    messageContainer: {
        margin: 20,
        borderColor: '#FFC72C',
        borderWidth: 3,
        borderRadius: 6,
        padding: 15,
    },
    selectorsContainer: { marginVertical: 20 },
    inputOne: { flex: 1 },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    label: { fontSize: 16, fontWeight: '500' },
    counterContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    counterButton: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderColor: '#BEBEBE',
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: { fontSize: 20, fontWeight: '600' },
    countText: { fontSize: 18, fontWeight: '500', paddingHorizontal: 6 },
    Hoteltitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  Hotelinput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      fontSize: 16,
  },
  Hotelbutton: {
      backgroundColor: '#007bff',
      padding: 10,
      alignItems: 'center',
      marginTop: 20,
  },
  HotelbuttonText: {
      color: '#fff',
      fontSize: 18,
  },
  HotellocationItem: {
      padding: 10,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
  },
  Hotelerror: {
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
loadingText: {
    fontSize: 18,
    color: '#FF0000',
},
});


export default InitialBooking;
