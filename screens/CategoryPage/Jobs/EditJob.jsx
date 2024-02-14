import {StyleSheet, View, FlatList,ActivityIndicator,TouchableOpacity,Alert} from 'react-native';
import React, { useState ,useEffect} from 'react';
import JobCard from '../../../Components/JobCard/JobCard';
import {Card} from 'react-native-paper';
import BackButton from '../../../Components/BackButton/BackButton';
import {Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { myTheme } from '../../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditJob = ({navigation}) => {
  const [data,setdata] = useState()
const [Loader,setLoader] = useState()
const [user,setuser] = useState()
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

  const Database = firestore().collection('Job').doc(user).collection('Jobs');
const getdata = async () => {
  setLoader(true)
  try {
    const querySnapshot = await Database.get(); // Remove the 'where' method

    const newData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    setdata(newData);
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
 


const Deleter =async(item)=>{
  setLoader(true)
console.log('Deleting')
console.log(item.id)

try {
await firestore().collection('Job').doc(user).collection('Jobs').doc(item.id).delete();
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
navigation.navigate('editJobForm',{
Jobid:item.id
})

}
  const renderItem = ({item}) => (
    <Card style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Title: <Text style={styles.content}>{item.Title}</Text>
        </Text>

        <Text style={styles.heading}>
          Salary: <Text style={styles.content}>{item.Salary}</Text>
        </Text>

        <Text style={styles.heading}>
          Job Profile: <Text style={styles.content}>{item.JobProfile}</Text>
        </Text>

        <Text style={styles.heading}>
          Experience: <Text style={styles.content}>{item.Experience}</Text>
        </Text>

        <Text style={styles.heading}>
          Location: <Text style={styles.content}>{item.Location}</Text>
        </Text>

        <Text style={styles.heading}>
          Concern Contact: <Text style={styles.content}>{item.ContactNumber}</Text>
        </Text>

        <Text style={styles.heading}>
          Concern Person Name:{' '}
          <Text style={styles.content}>{item.ConcernPersonname}</Text>
        </Text>
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity onPress={()=>Editor(item)}  style={styles.btn}>
          <Text style={{textAlign: 'center', color: myTheme.colors.primary}}>
            Edit
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
    <View style={styles.container}>
      <BackButton label={'Edit Job'} />
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});


export default EditJob;
