import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {Card} from 'react-native-paper';
import BackButton from '../../Components/BackButton/BackButton';
import {myTheme} from '../../theme';

const Associates = () => {
  const NGO = [
    {
      _id: '1',
      name: 'NGO 1',
      category: 'Category 1',
      description: 'Description 1',
      address: 'Address 1',
      contactPersons: [
        {
          name: 'John hin',
          number: '+9213456789',
        },
        {
          name: 'John hin',
          number: '+9213456789',
        },
        {
          name: 'John hin',
          number: '+9213456789',
        },
      ],
      image: 'https://picsum.photos/seed/picsum/400/400',
    },
    {
      _id: '1sdf',
      name: 'NGO 1',
      category: 'Category 1',
      description: 'Description 1',
      address: 'Address 1',
      contactPersons: [
        {
          name: 'John hin',
          number: '+9213456789',
        },
        {
          name: 'John hin',
          number: '+9213456789',
        },
        {
          name: 'John hin',
          number: '+9213456789',
        },
      ],
      image: 'https://picsum.photos/seed/picsum/400/400',
    },
    {
      _id: '1sddsfdff',
      name: 'NGO 1',
      category: 'Category 1',
      description: 'Description 1',
      address: 'Address 1',
      contactPersons: [
        {
          name: 'John hin',
          number: '+9213456789',
        },
        {
          name: 'John hin',
          number: '+9213456789',
        },
        {
          name: 'John hin',
          number: '+9213456789',
        },
      ],
      image: 'https://picsum.photos/seed/picsum/400/400',
    },
 
  ];

  const renderNGO = ({item}) => {
    return (
      <Card style={styles.mycard}>
        <View style={styles.cardView}>
          <Image
            width={'100%'}
            style={{
              resizeMode: 'cover',
              width: '100%',
              height: 200,
              borderRadius: 10,
            }}
            height={200}
            source={{uri: item.image}}
          />
          <View style={{padding: 10}}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <View style={{marginTop: 4}}>
              {item.contactPersons.map(item => {
                return (
                  <View key={item._id} style={{flexDirection: 'row'}}>
                    <Text style={styles.personName}>{item.name}</Text>
                    <Text style={styles.personNumber}>{item.number}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton label={'Associates'} />
      <FlatList
        data={NGO}
        renderItem={renderNGO}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default Associates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  mycard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  cardView: {
    flexDirection: 'column',
    padding: 8,
  },
  text: {
    fontSize: 16,
    color : '#808080',
    textAlign: 'justify', 
  },
  name: {
    fontSize: 23,
    fontWeight: 'bold',
    color: myTheme.colors.primary,
  },
  category: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#808080',
  },
  address: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#808080',
  },
  personName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#808080',
    marginRight: 10,
  },

  personNumber: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#808080',
  },
});
