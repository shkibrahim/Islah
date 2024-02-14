import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import BackButton from '../../Components/BackButton/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import CustomDropDown from '../../Components/CustomDropDown';
const AdvertiseWithUs = ({navigation}) => {


  const [user, setuser] = useState();
  const subjects = [
    'Select Banner Type',
    'Auto Sliding Banner',
    'Fixed Banner',
  ];

  const page = ['Select Ad Page', 'Home (default)'];
  const [BannerType, setBannerType] = useState('');
  const [AdPage, setAdPage] = useState('');
  const [Purpose, setPurpose] = useState('');
  const [StudentData, setStudentData] = useState([]);
  const [BusinessData, setBusinessData] = useState([]);
  const [IndividualData, setIndividualData] = useState([]);
  const [JobSeekerData, setJobSeekerData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [Data, setData] = useState();
  const [Name,setName] = useState()
  const [Mob,setMob] = useState()
const [Loading,setLoading] = useState()

  useEffect(() => {
    // getCategory()
    getEmailFromStorage();
  }, []);

  useEffect(() => {
    // setIsLoading(true);
    fetchalldata()
  }, [user]);
  useEffect(() => {
    // console.log('concating')
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
    funcat();
  }, [StudentData, BusinessData, IndividualData, JobSeekerData]);
  useEffect(() => {
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes

    if (AllData) {
      myDatafetch();
      console.log('calling my data')
    }
  }, [AllData,]);
  useEffect(() => {
  
      DataMerging();
    
 
   
    // }
  }, [Data]);
  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };
  const fetchalldata = async () => {
    console.log('student');
    try {
      const studentQuerySnapshot = await firestore()
        .collection('StudentData')
        .get();

      const datastudent = studentQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (datastudent && Array.isArray(datastudent)) {
        setStudentData(datastudent);
      } else {
        console.log('No student documents found.');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }

    console.log('business');
    try {
      const businessQuerySnapshot = await firestore()
        .collection('BusinessPerson')
        .get();

      const databusiness = businessQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (databusiness && Array.isArray(databusiness)) {
        setBusinessData(databusiness);
        // console.log('my business data is ', databusiness);
      } else {
        console.log('No business documents found.');
      }
    } catch (error) {
      console.error('Error fetching business data:', error);
    }

    console.log('individual');
    try {
      const individualQuerySnapshot = await firestore()
        .collection('OtherData')
        .get();

      const dataindividual = individualQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (dataindividual && Array.isArray(dataindividual)) {
        setIndividualData(dataindividual);
      } else {
        console.log('No individual documents found.');
      }
    } catch (error) {
      console.error('Error fetching individual data:', error);
    }

    console.log('jobseeker');
    try {
      const jobseekerQuerySnapshot = await firestore()
        .collection('JobSeekerData')
        .get();

      const datajobseeker = jobseekerQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (datajobseeker && Array.isArray(datajobseeker)) {
        setJobSeekerData(datajobseeker);
      } else {
        console.log('No jobseeker documents found.');
      }
    } catch (error) {
      console.error('Error fetching jobseeker data:', error);
    }

    // Wait for all asynchronous operations to complete
    // await funcat()
  }
  const funcat = async () => {
    console.log('concatting starts');
    try {
      const concatenatedData = await StudentData.concat(
        IndividualData,
        BusinessData,
        JobSeekerData,
      );
      setAllData(concatenatedData);
      if (concatenatedData.length > 0) {
        console.log('Concat func ke andr ', concatenatedData);

        // console.log('concatenated data',concatenatedData  )
      }

      // setAllData(concatenatedData.flat()); // flat() to flatten the array of arrays
   
    } catch (error) {
      console.error('Error concatenating data:', error);
    }
  };



  const DataMerging = async () => {


    console.log('Data Merging');
    setName(Data.Name);

    setMob(Data.PhoneNumber)


  };

  const myDatafetch = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
      console.log(storedEmail);
      console.log('Sara Data', AllData);

      const mydata = await AllData.find(data => data.id === user);
      setData(mydata);

      console.log('profile data is ', mydata);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };
  const Register = async () => {
    if (BannerType == 'select banner type' || AdPage == 'select ad page') {
      console.log('ff');
      Alert.alert('Please fulfill the document to proceed');
    }

    if (BannerType !== 'select banner type' && AdPage !== 'select ad page') {
      console.log('good');
      setLoading(true)
     

      await firestore()
        .collection('AdvertiseWithUs')
        .doc(user)

        .set({
          BannerType: BannerType,
          AdPage: AdPage,
          Purpose: Purpose,
          Name:Name,
          Mob:Mob,
          user:user
          // ... (rest of the data)
        });

        setLoading(false)
        Alert.alert('Submitted')
        navigation.navigate('Home')
     
    }
  };
  return (
    <SafeAreaView style={{height: '100%', flex: 1}}>
      <View>
        <BackButton label="Advertise With Us" />
        <View
          style={{
            backgroundColor: 'lightgray',
            margin: 10,
            borderRadius: 12,
            borderWidth: 0.7,
            borderColor: 'green',
            padding: 10,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Banner Add Type
          </Text>
          <CustomDropDown
            options={subjects}
            selectedOption={BannerType}
            setSelectedOption={setBannerType}
          />

          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Advertise on Page
          </Text>
          <CustomDropDown
            options={page}
            selectedOption={AdPage}
            setSelectedOption={setAdPage}
          />

          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Purpose (optional)
          </Text>

          <TextInput
            value={Purpose}
            onChangeText={setPurpose}
            style={{
              color: 'black',
              borderColor: 'green',
              borderRadius: 9,
              borderWidth: 1,
              marginVertical: 7,
              backgroundColor: '#ddd',
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 12,
              borderRadius: 12,
              paddingVertical: 6,
            }}
            onPress={Register}
            activeOpacity={0.6}>
            <Text style={{color: 'white', fontSize: 17}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdvertiseWithUs;

const styles = StyleSheet.create({
  heading: {
    flex: 0.1,
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 8,
  },

  container: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginHorizontal: 12,
    borderWidth: 0.8,
    borderColor: 'gray',
    opacity: 2,
    shadowRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
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
  map_container: {
    height: 200,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  contactus_form: {
    flex: 0.6,
  },
  create_post_btn: {
    marginTop: 50,
    padding: 14,
    borderRadius: 12,
    width: '70%',
    marginBottom: 30,
    alignSelf: 'center',
    // marginHorizontal: 16,

    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
