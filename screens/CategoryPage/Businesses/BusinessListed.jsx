import React, { useState,useEffect } from 'react';
import {FlatList, StyleSheet, View,Text,Image,ScrollView} from 'react-native';
import BusinessCard from '../../../Components/BusinessCard/BusinessCard';
import BackButton from '../../../Components/BackButton/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const BusinessListed = () => {
  const [Loading, setLoading] = useState();

  const [BusinessData, setBusinessData] = useState();
  useEffect(() => {



    fetchData();

  }, []);
    
  const fetchData = async () => {
    setLoading(true);

    console.log('fsf');
    try {
      const querySnapshot = await firestore().collectionGroup('Business').get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setLoading(false);
        setBusinessData(data);
        console.log(data);
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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


  const formatTime = (isoTimeString) => {
    const date = new Date(isoTimeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  const renderItem = ({item}) => (
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
            alignSelf:"center",
          }}>
          {item.BusinessName} ({item.BusinessCatergory})
        </Text>
<View style={{alignItems:"center"}}> 
<ScrollView horizontal>

<Image
          source={{uri: item.Bimage1}}
          style={styles.image}
        />

<Image
          source={{uri: item.Bimage2}}
          style={styles.image}
        />


<Image
          source={{uri: item.Bimage3}}
          style={styles.image}
        />
</ScrollView>
</View>
     

        <Text style={styles.overhead}>Location:</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
        
        <Text style={styles.text}>{item.Bpostalcode}</Text>
            <Text style={styles.text}>{item.Baddress}</Text>
            <Text style={styles.text}>{item.Barea}</Text>
            <Text style={styles.text}>{item.Bstate}</Text>
       <Text style={styles.heading}>{item.Bcity}</Text>
            <Text style={styles.text}>{item.Bcountry}</Text>
         
        </View>

        <Text style={styles.overhead}>Business Timings:</Text>
        <Text style={{...styles.text, alignSelf: 'center', margin: 12}}>
        {formatTime(item.Btimefrom)} to  {formatTime(item.Btimeto)}
        </Text>
        <Text style={styles.overhead}>Week Days:</Text>
        <Text style={{...styles.text, alignSelf: 'center', margin: 12}}>
        {item.WorkingTo} to {item.WorkingFrom}
        </Text>
        <Text style={styles.overhead}>Busness Description:</Text>
        <Text style={{...styles.text, marginHorizontal:12}}>{item.BusinessDescription}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton label={'Business Details'} />
    {BusinessData && (
        <FlatList
          data={BusinessData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    
      width: 300,
      height: 300,
      borderRadius: 12,marginHorizontal:12,borderWidth:0.8,borderColor:'gray',opacity:2,shadowRadius:3,
      alignSelf: 'center',
      marginBottom: 16,
    
  },
  heading:{
    fontSize:16,color:"black",fontWeight:'normal'
  },
  text:{
color:"black"
  },
  overhead:{
color:"black"
,fontSize:17,fontWeight:"bold"
  }
});

export default BusinessListed;
