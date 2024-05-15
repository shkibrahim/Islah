import React,{useEffect,useState} from 'react';
import {FlatList, StyleSheet, View,Text,Image,TouchableOpacity,ScrollView, Alert} from 'react-native';
import BusinessCard from '../../../Components/BusinessCard/BusinessCard';
import BackButton from '../../../Components/BackButton/BackButton';
import {Icon} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myTheme } from '../../../theme';
const EditBusinessDetails = ({navigation}) => {
  const [businessData,setbusinessData] = useState()
  const [name,setname]=useState()
  const [Profile,setProfile] =useState()
  const [phone,setphone] =useState()

  const [user,setuser]=useState()
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    getEmailFromStorage();
    getuserdata()
  }, []);

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      console.log('my user id is',storedEmail)
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };
  const getuserdata =async()=>{
const a = await AsyncStorage.getItem('UserData')
console.log('data is', a)
const parsed = JSON.parse(a)
setname(parsed.Name)
setphone(parsed.PhoneNumber)
setProfile(parsed.Profile)

  }

  useEffect(() => {



    fetchData();

  }, [user]);
    
  const fetchData = async () => {
    setLoading(true);

    console.log('fsf');
    try {
      const querySnapshot = await firestore().collection('BusinessPerson').doc(user).collection('Business').get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setLoading(false);
        setbusinessData(data);
        console.log('MY DATA',data);
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



const Delete =async(item)=>{
  try {
    // Replace 'your-collection' with your actual collection name
    // Replace 'your-document-id' with the ID of the document you want to delete
    await firestore().collection('BusinessPerson').doc(user).collection('Business').doc(item.id).delete();
    console.log('Document successfully deleted!');
    // Optionally show a success message to the user
    Alert.alert('Success', 'Document successfully deleted!');
    await fetchData()

  } catch (error) {
    console.error('Error removing document: ', error);
    // Optionally show an error message to the user
    Alert.alert('Error', 'Failed to delete document. Please try again later.');
  }
}

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
          width:"50%"
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
            onPress={() => navigation.navigate('businessListed',{
              item:item
            })}>
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
              // onPress={()=>handleOpenDialPad(item)}
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
              // onPress={()=>handleChat(item)}
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
              // onPress={()=>handleOpenWhatsApp(item)}
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

      <View></View>

<View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:20,margin:16}}>
{/* <Text style={{color:"black"}}>{item.id}</Text> */}
<TouchableOpacity
onPress={()=>navigation.navigate('editBusinessDetailsForm',{
  Id:item.id,
  name:name,
  Profile:Profile,
  phone:phone,
  user:user
})}
 style={{paddingHorizontal:25,elevation:4,backgroundColor:"white",paddingVertical:10,borderRadius:4}}>
  <Text style={{color:"black"}}>Edit</Text>
</TouchableOpacity>


<TouchableOpacity 
onPress={()=>Delete(item)}
style={{paddingHorizontal:25,elevation:4,backgroundColor:"white",paddingVertical:10,borderRadius:4}}>
  <Text style={{color:"black"}}>Delete</Text>
</TouchableOpacity>
</View>
      {/* {isEdit && <IsEditContainer path="editBusinessDetailsForm" id={id} />} */}
    </View>
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

export default EditBusinessDetails;
