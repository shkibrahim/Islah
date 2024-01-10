import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BusinessCard from '../../../Components/BusinessCard/BusinessCard';
import BackButton from '../../../Components/BackButton/BackButton';

const BusinessListed = () => {
  const businessData = [
    // Add your business data here
    // Example:
    {
      id: '1',
      name: 'Business 1',
      description: 'Description 1',
      category: 'Category 1',
      contact: '+92361548795',
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
      contact: '+92361548795',
      weekdayFrom: 'Monday',
      weekdayTo: 'Sunday',
      from: '9:00 AM',
      to: '5:00 PM',
    },
  ];

  const renderItem = ({item}) => (
    <BusinessCard
      name={item.name}
      description={item.description}
      category={item.category}
      weekdayFrom={item.weekdayFrom}
      weekdayTo={item.weekdayTo}
      from={item.from}
      contact={item.contact}
      to={item.to}
    />
  );

  return (
    <View style={styles.container}>
      <BackButton label={'Business Details'} />
      <FlatList
        data={businessData}
        renderItem={renderItem}
        keyExtractor={item => item.id} // Assuming you have a unique identifier for each item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BusinessListed;
