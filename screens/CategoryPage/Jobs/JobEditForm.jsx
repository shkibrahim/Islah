import {ScrollView, StyleSheet, Text, View,Alert,ActivityIndicator} from 'react-native';
import React, {useState,useEffect} from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomDropDown from '../../../Components/CustomDropDown';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomButton from '../../../Components/CustomButton';
import {Button, Paragraph} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const JobEditForm = ({route,navigation}) => {
  const {Jobid} = route.params;
  console.log(Jobid)
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

  const [user,setuser] = useState()
  const [title, setTitle] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [jobProfile, setJobProfile] = useState('');
  const [isJobProfileEmpty, setIsJobProfileEmpty] = useState(false);
  const [concernPersonname, setConcernPersonname] = useState('');
  const [isConcernPersonnameEmpty, setIsConcernPersonnameEmpty] =
    useState(false);
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [isSalaryEmpty, setIsSalaryEmpty] = useState(false);
  const [isLocationEmpty, setIsLocationEmpty] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [isContactNumberEmpty, setIsContactNumberEmpty] = useState(false);
const [Loader,setLoader] = useState()
const [error,setError] = useState()

  useEffect(() => {
    console.log('svsv');

    // Check for non-empty fields and update error state
    if (
      jobProfile !== '' &&
      title !== '' &&
      concernPersonname !== '' &&
     
      location !== '' &&
      salary !== '' &&
      contactNumber !== '' &&
      experience !== ''
     
      
    ) {
      setError(false);
    }

    else {
      setError(true);
    }
  }, [error, experience, title, jobProfile, contactNumber,salary,location,concernPersonname]); // Include all relevant dependencies



  const options = [
    'Select Experience',
    'Fresher',
    '1 Month',
    '2 Months',
    '3 Months',
    '4 Months',
    'More than 4 Month',
  ];

  const [experience, setExperience] = useState(options[0]);


  const Updater =async()=>{
    if ( jobProfile== '') {
      setIsJobProfileEmpty(true)
        setError(true)
  }
  
  if (title == '') {
    setIsTitleEmpty(true)
      setError(true)
  }
  
  if (experience == 'Select Experience') {
    // setIsOffersDetailsEmpty(true)
      setError(true)
  }
  
  
  if (salary == '') {
    setIsSalaryEmpty(true)
      setError(true)
  }
  
  
  if (location == '') {
    setIsLocationEmpty(true)
      setError(true)
  }
  
  if (concernPersonname == '') {
    setIsConcernPersonnameEmpty(true)
      setError(true)
  }
  
  if (contactNumber == '') {
    setIsContactNumberEmpty(true)
      setError(true)
  }
  
  if (error == false ) {
    setLoader(true)
    console.log('agf')
    try {
          
     
   
      await firestore()
        .collection('Job')
        .doc(user)
        .collection('Jobs').doc(Jobid)
      
        .update({
          JobProfile:jobProfile,
          Title:title,
          Experience:experience,
          Salary:salary,
          Location:location,
          ConcernPersonname:concernPersonname,
          ContactNumber:contactNumber,
       
          // ... (rest of the data)
        });
  
        setLoader(false);
        Alert.alert('Job updated')
        navigation.navigate('Categories')
    } catch (error) {
      setLoader(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  
  
  
  
    
         
        }
        
  }
  return (

    <SafeAreaView style={{flex:1,height:'100%'}}>
      {Loader ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center',marginTop:300}}
        />
      ) : (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <BackButton label={'Jobs'} />
      <Text style={styles.heading}>Edit Job</Text>

      <View style={styles.form_container}>
        <CustomTextInput
          setError={setIsTitleEmpty}
          required={true}
          error={isTitleEmpty}
          value={title}
          onChange={setTitle}
          label="Job Title"
        />
        <CustomTextInput
          setError={setIsJobProfileEmpty}
          required={true}
          error={isJobProfileEmpty}
          value={jobProfile}
          onChange={setJobProfile}
          label="Job Profile"
        />
        <CustomDropDown
          options={options}
          selectedOption={experience}
          setSelectedOption={setExperience}
          label="Experience"
        />
        <CustomTextInput
          setError={setIsSalaryEmpty}
          required={true}
          error={isSalaryEmpty}
          value={salary}
          onChange={setSalary}
          label="Salary offered"
        />
        <CustomTextInput
          setError={setIsLocationEmpty}
          required={true}
          error={isLocationEmpty}
          value={location}
          onChange={setLocation}
          label="Location"
        />
        <CustomTextInput
          setError={setIsConcernPersonnameEmpty}
          required={true}
          error={isConcernPersonnameEmpty}
          value={concernPersonname}
          onChange={setConcernPersonname}
          label="Concern Person Name"
        />
        <CustomTextInput
          setError={setIsContactNumberEmpty}
          required={true}
          error={isContactNumberEmpty}
          value={contactNumber}
          onChange={setContactNumber}
          label="Contact Number"
        />

<Button mode="contained" style={styles.button} 
          onPress={Updater}>
            Save
          </Button>
      </View>
    </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default JobEditForm;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#197739',
  },
  heading: {
    fontSize: 20,
    alignSelf:"center",
    fontWeight: 'bold',
    textAlign: 'center',
    color:"green",
    marginVertical: 20,
  },
  form_container: {
    marginHorizontal: 20,
  },
});
