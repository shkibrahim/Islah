import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import BackButton from '../../../Components/BackButton/BackButton';
import CarouselPage from '../../../Components/Carousel/Carousel';
import {myTheme} from '../../../theme';

const SingleBusinessDetailPage = () => {
  const business = {
    name: 'Business Name',
    description:
      'Business Description lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.  lorem   consectetur adipisicing elit. Quisquam, voluptatum.  lorem  consectetur adipisicing elit. Quisquam, voluptatum.  lorem   ',
    category: 'Business Category',
    education: 'Business Person Education',
    contact: 'Business Contact',
    weekdayFrom: 'Monday',
    weekdayTo: 'Friday',
    from: '9:00 AM',
    to: '5:00 PM',
    id: 'Business Id',
    state: 'State',
    city: 'City',
    area: '',
    postalCode: 'Postal Code',
    country: 'Country',
    timings: 'Business Timings',
    images: [
      {
        id: 1,
        title: 'First Item',
        text: 'First Item Text',
        image: 'https://picsum.photos/720/353',
      },
      {
        id: 2,
        title: 'Second Item',
        text: 'Second Item Text',
        image: 'https://picsum.photos/720/351',
      },
      {
        id: 3,
        title: 'Third Item',
        text: 'Third Item Text',
        image: 'https://picsum.photos/720/350',
      },
    ],
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <BackButton />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.businessName}>{business.name}</Text>
          <Text style={styles.businessCategory}>{business.category}</Text>
        </View>

        <CarouselPage
          data={business.images}
          indicatorshows={false}
          autoPlay={false}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.description}>{business.description}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Education:</Text>
            <Text style={styles.infoText}>{business.education}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Contact:</Text>
            <Text style={styles.infoText}>{business.contact}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoText}>
              {business.city}, {business.state}, {business.country},{' '}
              {business.postalCode}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Timings:</Text>
            <Text style={styles.infoText}>
              {business.weekdayFrom} - {business.weekdayTo}, {business.from} -{' '}
              {business.to}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: myTheme.colors.primary,
  },
  businessCategory: {
    fontSize: 14,
    color: 'gray',
  },
  businessImage: {
    height: 200,
    width: '100%',
    marginBottom: 16,
  },
  detailsContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#777',
    paddingVertical: 16,
  },
  infoContainer: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 8,
    color: myTheme.colors.primary,
  },
  infoText: {
    flex: 1,
    marginLeft: 56,
    fontSize: 15,
    marginVertical: 4,
  },
});

export default SingleBusinessDetailPage;
