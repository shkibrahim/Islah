import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BackButton from '../../../Components/BackButton/BackButton';
import OfferCard from '../../../Components/OfferCard/OfferCard';

const Offers = () => {
  const offersData = [
    {
      id: '1',
      title: 'Offer Title 1',
      category: 'Category 1',
      offerDetails: 'Offer Details 1',
      dateFrom: '12/12/2021',
      dateTo: '12/18/2021',
      timeFrom: '12:00 PM',
      timeTo: '5:00 PM',
      city: 'City 1',
      area: 'Area 1',
      postalCode: '12345',
      contact: '03001234567',
    },
    {
      id: '2',
      title: 'Offer Title 1',
      category: 'Category 1',
      offerDetails: 'Offer Details 1',
      dateFrom: '12/12/2021',
      dateTo: '12/18/2021',
      timeFrom: '12:00 PM',
      timeTo: '5:00 PM',
      city: 'City 1',
      area: 'Area 1',
      postalCode: '12345',
      contact: '03001234567',
    },
    {
      id: '3',
      title: 'Offer Title 1',
      category: 'Category 1',
      offerDetails: 'Offer Details 1',
      dateFrom: '12/12/2021',
      dateTo: '12/18/2021',
      timeFrom: '12:00 PM',
      timeTo: '5:00 PM',
      city: 'City 1',
      area: 'Area 1',
      postalCode: '12345',
      contact: '03001234567',
    },
    {
      id: '4',
      title: 'Offer Title 1',
      category: 'Category 1',
      offerDetails: 'Offer Details 1',
      dateFrom: '12/12/2021',
      dateTo: '12/18/2021',
      timeFrom: '12:00 PM',
      timeTo: '5:00 PM',
      city: 'City 1',
      area: 'Area 1',
      postalCode: '12345',
      contact: '03001234567',
    },
    // Add more offer data objects as needed
  ];

  const renderItem = ({item}) => (
    <OfferCard
      title={item.title}
      category={item.category}
      offerDetails={item.offerDetails}
      dateFrom={item.dateFrom}
      dateTo={item.dateTo}
      timeFrom={item.timeFrom}
      timeTo={item.timeTo}
      city={item.city}
      area={item.area}
      postalCode={item.postalCode}
      contact={item.contact}
      isEdit={false}
    />
  );

  return (
    <View style={styles.container}>
      <BackButton label="Offers" />
      <View style={{flex: 1, paddingHorizontal: 4, paddingVertical: 4}}>
        <FlatList
          data={offersData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Offers;
