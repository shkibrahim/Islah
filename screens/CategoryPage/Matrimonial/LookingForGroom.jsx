import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView,Image} from 'react-native';
import MatrimonialCard from '../../../Components/MatrimonialCard/MatrimonialCard';
import BackButton from '../../../Components/BackButton/BackButton';
import firestore from '@react-native-firebase/firestore';
const LookingForGroom = () => {
  const [Loading, setLoading] = useState();

  const [MatrimonialData, setMatrimonialData] = useState();

  const [GroomData, setGroomData] = useState();
  const fetchData = async () => {
    setLoading(true);

    console.log('fsf');
    try {
      const querySnapshot = await firestore()
        .collectionGroup('Matrimonial')
        .get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setLoading(false);
        setMatrimonialData(data);
        console.log('All',data);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (MatrimonialData) {
      getBrideData();
    }
  }, [MatrimonialData]);

  const [gender, setgender] = useState('male');
  const getBrideData = async () => {
    const maleData = MatrimonialData.filter(data => data.Gender === "male");

    setGroomData(maleData);
    console.log('The groom data is', maleData);
  };



  const renderItem1 = ({item}) => (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 10,
        elevation: 2,
        marginHorizontal: 16,
        marginVertical: 6,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 12,
          }}>
          {item.Name}
        </Text>

        <Image
          source={{uri: item.Profile}}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            alignSelf: 'center',
            marginBottom: 16,
          }}
        />

        <Text style={styles.overhead}>Marital Status:</Text>
        <Text style={{...styles.text, alignSelf: 'center', margin: 12}}>
          {item.maritalStatus}
        </Text>
        <Text style={styles.overhead}>Grandfather Name:</Text>
        <Text style={{...styles.text, alignSelf: 'center', margin: 12}}>
          {item.grandFatherName}
        </Text>
        <Text style={styles.overhead}>Grandfather Name(Nana):</Text>
        <Text style={{...styles.text, alignSelf: 'center', margin: 12}}>
          {item.grandFatherNanaName}
        </Text>

        <Text style={styles.overhead}>Contact:</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.heading}>Father</Text>
            <Text style={styles.text}>{item.parentContactNumberFather}</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={styles.heading}>Brother</Text>
            <Text style={styles.text}>{item.parentContactNumberBrother}</Text>
          </View>
        </View>
      </View>
    </View>
  );


  const matrimonialData = [
    {
      address: 'Address 1',
      country: 'Country 1',
      dob: 'Date of Birth 1',
      fatherName: 'Father Name 1',
      maritalStatus: 'Marital Status 1',
      motherName: 'Mother Name 1',
      fullName: 'Full Name 1',
      gender: 'Male',
      grandFatherName: 'Grandfather Name 1',
      grandFatherNameNana: 'Grandfather Name Nana 1',
      parentNumbers: ['1234567890', '0987654321'],
      postalCode: 'Postal Code 1',
      state: 'State 1',
    },
    {
      address: 'Address 2',
      country: 'Country 2',
      dob: 'Date of Birth 2',
      fatherName: 'Father Name 2',
      maritalStatus: 'Marital Status 2',
      motherName: 'Mother Name 2',
      fullName: 'Full Name 2',
      gender: 'Male',
      grandFatherName: 'Grandfather Name 2',
      grandFatherNameNana: 'Grandfather Name Nana 2',
      parentNumbers: ['2234567890', '0987654321'],
      postalCode: 'Postal Code 2',
      state: 'State 2',
    },
  ];

  const renderMatrimonialCard = ({item}) => <MatrimonialCard {...item} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <BackButton label={'Grooms'} />
      {GroomData && (
        <FlatList
          data={GroomData}
          renderItem={renderItem1}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default LookingForGroom;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'normal',
  },
  text: {
    color: 'black',
  },
  overhead: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
