import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import COLORS from '../constants/colors';
import icons from '../constants/icons';

const DetailsScreen = ({ route, navigation }) => {
  const { place } = route.params; // Retrieve passed data (name and date)

  const handleBookNow = () => {
    const url =
      'https://www.expedia.com/?locale=en_US&siteid=1&semcid=US.B.GOOGLE.BT-c-EN.GT&semdtl=a118255096947.b1144603764834.g1kwd-12670071.e1c.m1Cj0KCQiA3sq6BhD2ARIsAJ8MRwXTijxpbr1Tc0SwuPEbzC9xSdvf3ktDLcLHMzP8_DQOGVym-pHzjHwaAgt1EALw_wcB.r144e19ae75cefa7a4feb373d0090094741f7e94c9077d61fe15e5a886a61ad68c.c1.j19016910.k1.d1720994781694.h1e.i1.l1.n1.o1.p1.q1.s1.t1.x1.f1.u1.v1.w1&gad_source=1&gclid=Cj0KCQiA3sq6BhD2ARIsAJ8MRwXTijxpbr1Tc0SwuPEbzC9xSdvf3ktDLcLHMzP8_DQOGVym-pHzjHwaAgt1EALw_wcB';
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text style={styles.placeDate}>Date: {place.date}</Text>
        <Text style={styles.description}>
          Explore the beauty of {place.name}. This destination is known for its rich history,
          stunning architecture, and vibrant culture. Plan your trip and make the most of your
          adventure!
        </Text>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 22,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  placeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  placeDate: {
    fontSize: 18,
    color: COLORS.grey,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    marginVertical: 20,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  bookButtonText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
