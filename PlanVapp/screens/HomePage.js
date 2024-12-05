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
                navigation.navigate('Settings'); // Navigate to WeatherScreen if the cloud icon is clicked
              }
              
            }}>
            {icon}
          </TouchableOpacity>
        ))}
      </View>
    );
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
              <Icon name="place" size={20} color={COLORS.text} />
              <Text style={{marginLeft: 5, color: COLORS.text}}>
                {place.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={20} color={COLORS.text} />
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
          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="place" size={22} color={COLORS.text} />
              <Text style={{color: COLORS.text, marginLeft: 5}}>
                {place.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={22} color={COLORS.text} />
              <Text style={{color: COLORS.text, marginLeft: 5}}>5.0</Text>
            </View>
          </View>
          <Text style={{color: COLORS.text, fontSize: 13}}>
            {place.details}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Icon name="sort" size={28} color={COLORS.white} />
        <Icon name="notifications-none" size={28} color={COLORS.white} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={style.headerTitle}>Explore the</Text>
            <Text style={style.headerTitle}>beautiful places</Text>
            <View style={style.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                placeholder="Search place"
                style={{color: COLORS.grey}}
              />
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={style.sectionTitle}>Places</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({item}) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={places}
            renderItem={({item}) => <RecommendedCard place={item} />}
          />
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
    height: 60,
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
});
export default HomeScreen;
