import { StyleSheet, Text, View ,Alert,ActivityIndicator,FlatList,TouchableOpacity,TextInput} from 'react-native'
import React, { useState,useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { myTheme } from '../../../theme';
import BackButton from '../../../Components/BackButton/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Card,} from 'react-native-paper';
const EditDetails = ({navigation}) => {
const [BtnText,setBtnText] = useState('Edit')
  const [data,setdata] = useState()
  const [user,setuser]= useState()
  const [GrandFatherNanaName,setGrandFatherNanaName] = useState();
const[Bronum,setBronum] = useState();
const [Dadnum,setDadnum] = useState();
const[maritalStatus,setmaritalStatus] = useState()
const [inputEditable,setinputEditable] = useState(false)
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
  const [Loader,setLoader] = useState()


  useEffect(() => {
    DataMerging();

    // }
  }, [data]);

  const DataMerging = async () => {
    console.log('Data Merging');
    setGrandFatherNanaName(data.grandFatherNanaName);
    setBronum(data.parentContactNumberBrother);
    setDadnum(data.parentContactNumberFather);
    setmaritalStatus(data.maritalStatus);
   
    console.log('iske andr');


  };

  const Database = firestore().collection('Matrimonial').doc(user)
  const fetchData = async () => {
    setLoader(true);
    console.log('Fetching data...');
    
    try {
      const documentSnapshot = await firestore().collection('Matrimonial').doc(user).get();
  
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        if (data) {
          setLoader(false);
          setdata(data);
          console.log(data);
        } else {
          setLoader(false);
          console.log('No data found.');
        }
      } else {
        setLoader(false);
        console.log('Document does not exist.');
      }
    } catch (error) {
      setLoader(false);
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    
  
    fetchData();
  }, [user]);
   
const Deleter =async(item)=>{
  setLoader(true)
console.log('Deleting')
console.log(item.id)

try {
await firestore().collection('Matrimonial').doc(user).delete();
console.log('Document successfully deleted!');
fetchData()
setdata('')

setLoader(false)
Alert.alert('Offer Deleted')
navigation.navigate('Categories')
} catch (error) {
setLoader(false)
console.error('Error deleting document:', error);
}

}


const Editor = async (item)=>{
  if (BtnText=='Edit'){
setBtnText('Update')

setinputEditable(true)
Alert.alert('You can edit your details now')
  }
if (BtnText == 'Update'){
          
    try{
   
  await firestore()
  .collection('Matrimonial')
  .doc(user)


  .update({
    grandFatherNanaName:GrandFatherNanaName,
    parentContactNumberBrother:Bronum,
    parentContactNumberFather:Dadnum,
    maritalStatus:maritalStatus,
   
 
    // ... (rest of the data)
  });

  setLoader(false);
  Alert.alert('Details updated')
  navigation.navigate('Categories')
} catch (error) {
setLoader(false);
console.log('Error addinfsf product:', error);
// Handle any error that might occur during the process
}
}
}

  const renderItem = ({item}) => (
    <Card style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          GrandFather (Nana):
          
          </Text>
           <TextInput   editable={inputEditable}  value={GrandFatherNanaName} 
          onChangeText={setGrandFatherNanaName} style={styles.content}/>
      

        <Text style={styles.heading}>
         Father Number: 
        </Text>

        <TextInput   editable={inputEditable} value={Dadnum} 
          onChangeText={setDadnum} style={styles.content}/>
        <Text style={styles.heading}>
          Brother Number: 
        </Text>

        <TextInput   editable={inputEditable} value={Bronum} 
          onChangeText={setBronum} style={styles.content}/>

        <Text style={styles.heading}>
          Marital Status: 
        </Text>

        <TextInput   editable={inputEditable} value={maritalStatus} 
          onChangeText={setmaritalStatus} style={styles.content}/>
     
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity onPress={()=>Editor(item)}  style={styles.btn}>
          <Text style={{textAlign: 'center', color: myTheme.colors.primary}}>
          {BtnText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Deleter(item)} style={styles.btn}>
          <Text style={{textAlign: 'center', color: myTheme.colors.primary}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>

    </Card>
  );

  return (
    <SafeAreaView style={{height:"100%",flex:1}}>
      
    <View>
    <BackButton label={'Edit my Details'} />
    {data && (
        <FlatList
          data={[data]}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
    </SafeAreaView>
  )
}

export default EditDetails

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,color:"black"
  },
  content: {
    fontSize: 16,
    fontWeight: 'normal'
    ,color:'black', // Adjust the fontWeight as needed
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,

  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    elevation: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,

  },
})