import React from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import places from '../constants/places';
import icons from '../constants/icons';

const { width } = Dimensions.get('screen');

// Update COLORS to reflect the changes
COLORS.primary = '#FFC72C'; // Yellow
COLORS.text = '#000000'; // Black

const HomeScreen = ({ navigation }) => {
  const categoryIcons = [
      <Image source={icons.airplane} style={{ width: 40, height: 30 }} />,
      <Image source={icons.map} style={{ width: 40, height: 30 }} />,
      <Image source={icons.cloud} style={{ width: 40, height: 30 }} />,
      <Image source={icons.user} style={{ width: 40, height: 35 }} />,
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
                navigation.navigate('InitialBooking'); // Navigate to InitialBooking if the airplane icon is clicked
              }
              if (index === 1) {
                navigation.navigate('Maps'); // Navigate to MapScreen if the map icon is clicked
              }
              if (index === 2) {
                navigation.navigate('Weather'); // Navigate to WeatherScreen if the cloud icon is clicked
              }
              if (index === 3) {
                navigation.navigate('Settings'); // Navigate to Settings if the user icon is clicked
              }
            }}>
            {icon}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Maps', { place })}>
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
            <View style={{ flexDirection: 'row' }}>
              <Icon name="place" size={20} color={COLORS.text} />
              <Text style={{ marginLeft: 5, color: COLORS.text }}>
                {place.location}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="star" size={20} color={COLORS.text} />
              <Text style={{ marginLeft: 5, color: COLORS.text }}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({ place }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Maps', { place })}>
        <ImageBackground style={style.rmCardImage} source={place.image}>
          <Text
            style={{
              color: COLORS.text,
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
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="place" size={22} color={COLORS.text} />
                <Text style={{ color: COLORS.text, marginLeft: 5 }}>
                  {place.location}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="star" size={22} color={COLORS.text} />
                <Text style={{ color: COLORS.text, marginLeft: 5 }}>5.0</Text>
              </View>
            </View>
            <Text style={{ color: COLORS.text, fontSize: 13 }}>
              {place.details}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Icon name="sort" size={28} color={COLORS.white} />
        <Text style={style.headerText}>Explore</Text>
        <Icon name="person" size={28} color={COLORS.white} />
      </View>

      <ScrollView>
        <View style={style.searchContainer}>
          <TextInput
            style={style.searchInput}
            placeholder="Search for a destination"
          />
        </View>

        <ListCategories />
        <Text style={style.sectionTitle}>Top Destinations</Text>

        <FlatList
          data={places}
          renderItem={({ item }) => <Card place={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.topDestinationContainer}
        />
        <Text style={style.sectionTitle}>Recommended</Text>

        <FlatList
          data={places}
          renderItem={({ item }) => <RecommendedCard place={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.recommendedContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: COLORS.primary,
    height: 100,
  },
  headerText: {
    fontSize: 30,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: COLORS.lightGray,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  topDestinationContainer: {
    paddingLeft: 20,
  },
  recommendedContainer: {
    paddingLeft: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cardImage: {
    width: width * 0.7,
    height: 200,
    borderRadius: 15,
    marginRight: 20,
    padding: 20,
    justifyContent: 'flex-end',
  },
  rmCardImage: {
    width: width * 0.85,
    height: 230,
    borderRadius: 15,
    marginRight: 20,
    padding: 20,
    justifyContent: 'flex-end',
  },
});

export default HomeScreen;
