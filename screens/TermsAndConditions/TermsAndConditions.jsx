import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore';
import BackButton from '../../Components/BackButton/BackButton';
const TermsAndConditions = () => {

const [Terms,setTerms] = useState()
const [Loading,setLoading] = useState()


useEffect(() => {


  fetchdata();
  // getProfile();
  // getName();
}, []);
const fetchdata = async () => {
  setLoading(true)
  const querySnapshot = await firestore()
    .collection('TermsandConditions')
    .doc('Admin') // Fixed the indentation and moved .doc(user) to the correct position
    .get();

  const data = querySnapshot.data(); // Use querySnapshot.data() to get the document data directly
  try {
    // Check if data is defined
    if (data) {
      console.log('asli data', data);
      setLoading(false)
      setTerms(data);
      console.log(' getch data is', data);
    } else {
      setLoading(false)
      console.log('No document found yar.');
    }
  } catch (error) {
    setLoading(false)
    console.error('Error fetching data:', error);
  }
};
  const renderItem = ({item}) => (
    <View
      style={{
        borderColor: 'gray',
        backgroundColor:"#ddd",
        borderWidth: 0.3,
        width: '90%',
      
        margin:12,
        alignSelf: 'center',
        padding: 12,
        borderRadius: 12,
      }}>
      <Text style={styles.overhead}>Terms and Conditions:</Text>

      <Text style={{...styles.text, marginHorizontal: 5}}>
        {item.Terms}
      </Text>

    

    </View>
  );
  return (
    <SafeAreaView style={{flex:1}}>
 <View style={{flex:1}}> 
 <BackButton label="Terms and Conditions" />

 {Terms && (
 <FlatList
        data={[Terms]}
        renderItem={renderItem}
    
      />
      )}
    </View>


    </SafeAreaView>
   
  )
}

export default TermsAndConditions

const styles = StyleSheet.create({
  overhead: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
  },
})