import React, { useState,useEffect } from 'react';
import {FlatList, StyleSheet, View,TextInput,Text, Pressable,ActivityIndicator,Alert} from 'react-native';
import BackButton from '../../../Components/BackButton/BackButton';

import OfferCard from '../../../Components/OfferCard/OfferCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myTheme } from '../../../theme';
const EditDeals = ({navigation}) => {
  const [user, setuser] = useState();

  useEffect(() => {
    getEmailFromStorage();
  }, []);
  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };
  const main = '#197739';
  const [yes,setyes] = useState(false)
  const [Title, setTitle] = useState('');
  const [OffersDetails, setOffersDetails] = useState('');
  const [Category, setCategory] = useState('');
  const [City, setCity] = useState('');
  const [Area, setArea] = useState('');
  const [PostalCode, setPostalCode] = useState('');
  const [ContactDetails, setContactDetails] = useState('');
  const [StartDate,setStartDate] = useState('')
  const [EndDate,setEndDate] = useState('')
  const [StartTime,setStartTime] = useState('')
  const [EndTime,setEndTime] = useState('')
const [Data,setData] = useState([])
const [Loader,setLoader] = useState()

const Database = firestore().collection('Offers').doc(user).collection('OffersIndividual');
const getdata = async () => {
  setLoader(true)
  try {
    const querySnapshot = await Database.get(); // Remove the 'where' method

    const newData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    setData(newData);
    setLoader(false)
    console.log(newData)
  } catch (error) {
    setLoader(false)
    console.error('Error fetching data:', error);
  }
};
useEffect(() => {
  

  getdata();
}, [user]);

  useEffect(() => {
    // fetchData()
    if(Data.length >0){
    setTitle(Data[0].Title);
    setOffersDetails(Data[0].OffersDetails);
    setCategory(Data[0].Category);
    setCity(Data[0].City);
    
    setArea(Data[0].Area);
    setPostalCode(Data[0].PostalCode);
    setContactDetails(Data[0].ContactDetails);
    setStartDate(Data[0].StartDate);

    setEndDate(Data[0].EndDate);
    setStartTime(Data[0].StartTime);
    setEndTime(Data[0].EndTime);
  
  }
  }, [Data]);
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



  const Deleter =async(item)=>{
    setLoader(true)
console.log('Deleting')
console.log(item.id)

try {
  await firestore().collection('Offers').doc(user).collection('OffersIndividual').doc(item.id).delete();
  console.log('Document successfully deleted!');
  getdata()
 
  setLoader(false)
  Alert.alert('Offer Deleted')
  
} catch (error) {
  setLoader(false)
  console.error('Error deleting document:', error);
}

  }


  const Editor = async (item)=>{
navigation.navigate('offerEditForm',{
  offerid:item.id
})
  
  }
  const renderItem = ({item}) => (
    <View style={{ borderWidth: .5,
      borderColor: '#ddd',
      borderRadius: 10,
      elevation: 2,
      marginHorizontal: 16,
      marginVertical: 6,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 12,}}>
    
    <View style={{flexDirection:"row",alignItems:"center",position:'absolute',right:12,top:5}}>
<Pressable style={{...styles.button,backgroundColor:main,}}
onPress={()=>Editor(item)}>
<MaterialIcons name="edit" size={12} color={'white'} />
           
</Pressable>

            
<Pressable style={{...styles.button,backgroundColor:main,}}
onPress={()=>Deleter(item)}>
<MaterialIcons name="delete" size={12} color={'white'} />
</Pressable>
    </View>
    <View>
              <TextInput 
               value={Title}
               editable= {yes}
               onChangeText={setTitle}
              style={styles.title}/>
              <TextInput 
               value={Category}
               editable= {yes}
               onChangeText={setCategory}
              style={styles.category}/>
              <Text style={{color:main, fontSize:17,fontWeight:'bold' ,alignSelf:'center', marginBottom:12}}> OFFER DETAILS</Text>
              <TextInput 
               value={OffersDetails}
               editable= {yes}
               multiline= {true}
               onChangeText={setOffersDetails}
              style={{fontSize: 12,textAlign:'left',textAlignVertical:'top',
                color: '#555',height:80,alignSelf:'center'
                ,width: '90%',borderRadius:10,margin:8
                , borderColor:'lightgray',borderWidth:0.7,}}/>
              {/* Offer date start to end */}
              <Text style={styles.detail}>Valid:</Text>
              <View style={{flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
            

              <TextInput 
                editable= {yes}
               value={StartDate}
               onChangeText={setStartDate}
              style={{fontSize: 12,
                color: '#555',height:40
                ,width:140,borderRadius:10,margin:8
                , borderColor:'lightgray',borderWidth:0.7}}/>


<Text style={styles.detail}> - </Text>
<TextInput 
               value={EndDate}
               editable= {yes}
               onChangeText={setEndDate}
              style={{fontSize: 12,
                color: '#555',height:40
                ,width:140,borderRadius:10,margin:8
                , borderColor:'lightgray',borderWidth:0.7}}/>
              </View>
              <Text style={styles.detail}>Location:</Text>
              <View style={{flexDirection:"row",alignItems:"center"}}>
            

              <TextInput 
               value={City}
               editable= {yes}
               onChangeText={setCity}
              style={styles.category}/>

<TextInput 
               value={Area}
               editable= {yes}
               onChangeText={setArea}
              style={styles.category}/>


<TextInput 
               value={PostalCode}
               editable= {yes}
               onChangeText={setPostalCode}
              style={styles.category}/>
              </View>
             
    
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={styles.detail}>Contact:</Text>

              <TextInput 
                editable= {yes}
               value={ContactDetails}
               onChangeText={setContactDetails}
              style={{    fontSize: 12,
                color: '#555',height:40
                ,width:180,borderRadius:10,margin:8
                , borderColor:'lightgray',borderBottomWidth:0.7,}}/>


              </View>
          
            </View>
    
    
    
    
    
     </View>
  );

  return (
    <View style={styles.container}>

{Loader ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center',marginTop:300}}
        />
      ) : (
      <View>
      <BackButton label="Edit deals" />
      <View>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      </View>
         )}
    </View>
  );
};

const styles = StyleSheet.create({

  button:{ height:25,width:25,borderRadius:20,marginRight:12,alignItems:"center", justifyContent:'center'}
  ,
  container: {
    flex: 1,height:"100%",
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    borderColor:'lightgray',borderBottomWidth:0.6,
    marginBottom: 5,
    color: myTheme.colors.primary,
  },
  category: {
    fontSize: 14,
    color: '#555',height:40
    ,width:100,borderRadius:10,margin:8
    , borderColor:'lightgray',borderWidth:0.7,
    // marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight:'bold',
    color: '#333',
  },
});

export default EditDeals;
