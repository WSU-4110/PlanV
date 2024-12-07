import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import COLORS from '../constants/colors';
import places from '../constants/places';
import icons from '../constants/icons';

const {width} = Dimensions.get('screen');

// Update COLORS to reflect the changes
COLORS.primary = '#FFC72C'; // Yellow
COLORS.text = '#000000'; // Black

const HomeScreen = ({navigation}) => {
  const categoryIcons = [
      <Image source={icons.airplane} style={{width: 40, height: 30}} />,
      <Image source={icons.map} style={{width: 40, height: 30}} />,
      <Image source={icons.cloud} style={{width: 40, height: 30}} />,
      <Image source={icons.user} style={{width: 40, height: 35}} />,
      <Image source={icons.bag} style={{width: 40, height: 35}}resizeMode="contain" />,

  ];

  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            style={style.iconContainer}
            onPress={() => {
              if (index === 0) {
                navigation.navigate('Booking'); // Navigate to InitialBooking if the airplane icon is clicked
              }
              if (index === 1) {
                navigation.navigate('Maps'); // Navigate to MapScreen if the map icon is clicked
              }
              if (index === 2) {
                navigation.navigate('Weather'); // Navigate to WeatherScreen if the cloud icon is clicked
              }
              if (index === 3) {
                navigation.navigate('Settings'); // Navigate to WeatherScreen if the cloud icon is clicked
              }
              if (index === 4) {
                navigation.navigate('Checkout'); // Navigate to WeatherScreen if the cloud icon is clicked
              }

            }}>
            {icon}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const [searchQuery, setSearchQuery] = useState('');
  const flatListRef = useRef(null);

  // Filter places based on search query
  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to the first matched item
  const scrollToSearch = () => {
    if (searchQuery.trim() && filteredPlaces.length > 0) {
      const index = places.findIndex(
        (place) =>
          place.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (index >= 0) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  };


  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', place)}>
        <ImageBackground style={style.cardImage} source={place.image}>
          <Text
            style={{
              color: COLORS.text,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
            <Image source={icons.MG} style={{width: 30, height: 30}} />
              <Text style={{marginLeft: 5, color: COLORS.text}}>
                {place.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            <Image source={icons.star} style={{color: '#FFFFFF' , width: 30, height: 30}} />
              <Text style={{marginLeft: 5, color: COLORS.text}}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({place}) => {
    return (
      <ImageBackground style={style.rmCardImage} source={place.image}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {place.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

              </View>

              <Text style={{color: '#FFFFFF', marginLeft: 5}}>
                {place.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            </View>
          </View>
          <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 16}}>
            {place.details}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  const [itinerary, setItinerary] = useState([
    { destination: 'Paris', date: '2024-06-12', key: '1' },
    { destination: 'Rome', date: '2024-06-15', key: '2' },
    { destination: 'Tokyo', date: '2024-07-01', key: '3' },
  ]);

  const [newDestination, setNewDestination] = useState('');
  const [newDate, setNewDate] = useState('');

  const addToItinerary = () => {
    if (newDestination.trim() && newDate.trim()) {
      setItinerary((prevItinerary) => [
        ...prevItinerary,
        {
          destination: newDestination,
          date: newDate,
          key: Math.random().toString(), // Generate a unique key
        },
      ]);
      setNewDestination('');
      setNewDate('');
    } else {
      alert('Please fill in both fields.');
    }
  };

  const deleteFromItinerary = (key) => {
    setItinerary((prevItinerary) => prevItinerary.filter((item) => item.key !== key));
  };
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Image source={icons.house} style={{ width: 40, height: 40 }} />
        <Image source={icons.notification} style={{ width: 60, height: 60 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}>
          <View style={{ flex: 1 }}>
            <Text style={style.headerTitle}>Explore the</Text>
            <Text style={style.headerTitle}>beautiful places</Text>
            <View style={style.inputContainer}>
              <Image source={icons.MG} style={{ width: 15, height: 15 }} />
              <TextInput
                style={style.searchInput}
                placeholder="Search Paris, Tokyo, or Pisa for different result"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity onPress={scrollToSearch} style={style.searchButton}>
                <Text style={{ color: COLORS.white }}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={style.sectionTitle}>Recommended Places</Text>
        <FlatList
          snapToInterval={width - 20}
          contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={filteredPlaces.length > 0 ? filteredPlaces : places}
          ref={flatListRef}
          
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <RecommendedCard place={item} />}
        />
        {/* Itinerary Section */}
        <Text style={style.sectionTitle}>Your Itinerary</Text>
        <FlatList
          contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
          data={itinerary}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={style.itineraryItem}>
              <Text style={style.itineraryText}>
                {item.destination} - {item.date}
              </Text>
              <View style={style.buttonContainer}>
                <TouchableOpacity
                  style={style.detailsButton}
                  onPress={() =>
                    navigation.navigate('DetailsScreen', {
                      place: { name: item.destination, date: item.date },
                    })
                  }>
                  <Text style={style.detailsButtonText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.deleteButton}
                  onPress={() => deleteFromItinerary(item.key)}>
                  <Text style={style.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={style.addContainer}>
          <TextInput
            placeholder="Enter destination"
            style={style.input}
            value={newDestination}
            onChangeText={setNewDestination}
          />
          <TextInput
            placeholder="Enter date (YYYY-MM-DD)"
            style={style.input}
            value={newDate}
            onChangeText={setNewDate}
          />
          <TouchableOpacity style={style.addButton} onPress={addToItinerary}>
            <Text style={style.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
  

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.text, // Changed to black text
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.text, // Changed to black text
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  icon: {
    width: 30,
    height: 50,
    tintColor: 'black',
},
itineraryContainer: {
  marginHorizontal: 20,
  marginBottom: 20,
  padding: 15,
  backgroundColor: COLORS.white,
  borderRadius: 10,
  elevation: 5,
},
  itineraryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
  },
  itineraryText: {
    fontSize: 16,
    color: COLORS.text,
  },
  detailsButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: COLORS.white,
    fontSize: 14,
  },
  addContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  input: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});


export default HomeScreen;
