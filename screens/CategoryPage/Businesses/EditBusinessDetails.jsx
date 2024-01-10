import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BusinessCard from '../../../Components/BusinessCard/BusinessCard';
import BackButton from '../../../Components/BackButton/BackButton';

const EditBusinessDetails = () => {
  const businessData = [
    // Add your business data here
    // Example:
    {
      id: '1',
      name: 'Business 1',
      description: 'Description 1',
      category: 'Category 1',
      contact: '+923042336109',
      weekdayFrom: 'Monday',
      weekdayTo: 'Friday',
      from: '9:00 AM',
      to: '5:00 PM',
    },
    {
      id: '2',
      name: 'Business 2',
      description: 'Description 2',
      category: 'Category 2',
      contact: '+923232336109',
      weekdayFrom: 'Monday',
      weekdayTo: 'Sunday',
      from: '9:00 AM',
      to: '5:00 PM',
    },
  ];

  const renderItem = ({item}) => (
    <BusinessCard
      isEdit={true}
      name={item.name}
      description={item.description}
      category={item.category}
      weekdayFrom={item.weekdayFrom}
      weekdayTo={item.weekdayTo}
      from={item.from}
      to={item.to}
      contact={item.contact}
      id={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <BackButton label={'Edit Business Details'} />

      <FlatList
        data={businessData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditBusinessDetails;
