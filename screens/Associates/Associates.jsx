import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Card} from 'react-native-paper';
import BackButton from '../../Components/BackButton/BackButton';
import {myTheme} from '../../theme';
import firestore from '@react-native-firebase/firestore';

const Associates = () => {
  useEffect(() => {
    if (!AssociatesData) {
      fetchdata(); // Assuming you've defined fetchAllData to fetch all data
    }
  }, [AssociatesData]); // Adding AssociatesData as a dependency ensures the effect runs only when AssociatesData changes
  
  const [AssociatesData, setAssociatesData] = useState();
  const [isLoading, setIsLoading] = useState();
  const fetchdata = async () => {
    console.log('me fetch ho rha')
    setIsLoading(true);
    try {
      const querySnapshot = await firestore()
        .collectionGroup('Associates')
        .get();
  
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setIsLoading(false);
  console.log(data)
        setAssociatesData(data);
      
  
        // You can set other states here if needed
        // setData2(data);
        // setoriginalData(data);
  
        // console.log('Data1:', data); // Log the fetched data
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
          
            style={{
              resizeMode: 'cover',
              width: '100%',
              height: 200,
              borderRadius: 10,
            }}
            height={200}
            source={{uri: item.Image}}
          />
          <View style={{padding: 10}}>
            <Text style={styles.name}>{item.AssociateName}</Text>
            <Text style={styles.category}>{item.Category}</Text>
            <Text style={styles.text}>{item.Description}</Text>
            <Text style={styles.address}>{item.Address}</Text>
            <View style={{marginTop: 4}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.personName}>{item.PersonName1}</Text>
                <Text style={styles.personNumber}>{item.PersonContact1}</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.personName}>{item.PersonName2}</Text>
                <Text style={styles.personNumber}>{item.PersonContact2}</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.personName}>{item.PersonName3}</Text>
                <Text style={styles.personNumber}>{item.PersonContact3}</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="white"
          style={{alignSelf: 'center'}}
        />
      ) : (
        <View>
          <BackButton label={'Associates'} />

          <FlatList
            data={AssociatesData}
            renderItem={renderNGO}
            // keyExtractor={item => item._id}
          />
        </View>
      )}
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
    color: '#808080',
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
