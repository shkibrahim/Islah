import React, { useState,useEffect } from 'react';
import {FlatList, StyleSheet, View,Image,TouchableOpacity,Text} from 'react-native';
import BusinessCard from '../../../Components/BusinessCard/BusinessCard';
import BackButton from '../../../Components/BackButton/BackButton';
import { myTheme } from '../../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Icon} from 'react-native-paper';

const SingleBusinessDetailPage = () => {
  // const businessData = [
  //   // Add your business data here
  //   // Example:
  //   {
  //     id: '1',
  //     name: 'Business 1',
  //     description: 'Description 1',
  //     category: 'Category 1',
  //     contact: '+92361548795',
  //     weekdayFrom: 'Monday',
  //     weekdayTo: 'Friday',
  //     from: '9:00 AM',
  //     to: '5:00 PM',
  //   },
  //   {
  //     id: '2',
  //     name: 'Business 2',
  //     description: 'Description 2',
  //     category: 'Category 2',
  //     contact: '+92361548795',
  //     weekdayFrom: 'Monday',
  //     weekdayTo: 'Sunday',
  //     from: '9:00 AM',
  //     to: '5:00 PM',
  //   },
  // ];
  const [Loading, setLoading] = useState();

  const [BusinessData, setBusinessData] = useState([]);
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
        console.log('Business data is',data);
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleOpenWhatsApp = () => {
    const phoneNumber = '+923042336109'; // Replace with the recipient's phone number
    const message = 'Hello! I would like to chat with you.'; // Replace with your desired message

    // Use the `Linking` module to open WhatsApp with the predefined message
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${message}`);
  };

  const phoneNumber = '+923042336109'; // Replace with the desired phone number

  const handleOpenDialPad = (item) => {
    // Use the `Linking` module to open the dial pad with the specified phone number
    // Linking.openURL(`tel:${item.phoneNumber}`);
        Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleChat = () => {
    console.log('Chat');
  };

  const renderItem = ({item}) => (
    <View
      style={{
        borderRadius: 10,
        shadowColor: '#000',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 4,
      }}>
      <View style={styles.card_container}>
        <View
          style={{
            flexBasis: '35%',
            height: 116,
          }}>
{item.Bimage1 && (
  <Image
    style={{
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    }}
    source={{uri: item.Bimage1}}
  />
)}


        </View>
        <View
          style={{
            flexBasis: '65%',
            paddingLeft: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('singleBusinessDetails')}>
            <Text style={styles.card_name}>{item.BusinessName}</Text>
          </TouchableOpacity>
          <Text style={styles.card_category}>Category: {item.category}</Text>
          {/* <Text style={styles.card_description}>
            Description: {item.Description.slice(0, 20)}
          </Text> */}
          <Text style={styles.card_category}>
            Weekdays: {item.WorkingFrom} - {item.WorkingTo}
          </Text>
          <Text style={styles.card_category}>
            Timings: {item.Btimefrom} - {item.Btimeto}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}>
            <TouchableOpacity
              onPress={()=>handleOpenDialPad(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: myTheme.colors.background,
                borderColor: myTheme.colors.primary,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 8,
                paddingVertical: 4,
                marginTop: 5,
                width: 64,
              }}>
              <Icon source="phone" size={14} color="#000" />
              <Text style={{color: '#000', fontSize: 11}}> Phone </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>handleChat(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: myTheme.colors.background,
                borderColor: myTheme.colors.primary,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 8,
                paddingVertical: 4,
                marginTop: 5,
                width: 64,
              }}>
              <Icon source="chat" size={14} color="#000" />
              <Text style={{color: '#000', fontSize: 11}}> Chat </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>handleOpenWhatsApp(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: myTheme.colors.background,
                borderColor: myTheme.colors.primary,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 8,
                paddingVertical: 4,
                marginTop: 5,
                width: 60,
                gap: 5,
              }}>
              <Icon source="whatsapp" size={14} color="#000" />
              <Text style={{color: '#000', fontSize: 11}}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* {isEdit && <IsEditContainer path="editBusinessDetailsForm" id={id} />} */}
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton label={'Business Details'} />
      <FlatList
        data={BusinessData}
        renderItem={renderItem}
        // keyExtractor={item => item.id} // Assuming you have a unique identifier for each item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card_container: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card_name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: myTheme.colors.primary,
  },
  card_description: {
    fontSize: 13,
  },
  card_category: {
    fontSize: 13,color:"black"
  },
});

export default SingleBusinessDetailPage;
