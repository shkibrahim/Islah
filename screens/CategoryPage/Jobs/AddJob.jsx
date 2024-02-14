import {ScrollView, StyleSheet, Text, View,Pressable,Keyboard,ActivityIndicator} from 'react-native';
import React, {useState,useEffect} from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomDropDown from '../../../Components/CustomDropDown';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomButton from '../../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const AddJob = ({navigation}) => {
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
  const [error,setError] = useState(false)
  const [isContactNumberEmpty, setIsContactNumberEmpty] = useState(false);
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
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardActive(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardActive(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
const [Loading,setLoading] = useState(false);
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
  const Register =async()=>{
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
    setLoading(true)
    console.log('agf')
    try {
          
     
   
      await firestore()
        .collection('Job')
        .doc(user)
        .collection('Jobs').doc()
      
        .set({
          JobProfile:jobProfile,
          Title:title,
          Experience:experience,
          Salary:salary,
          Location:location,
          ConcernPersonname:concernPersonname,
          ContactNumber:contactNumber,
       
          // ... (rest of the data)
        });
  
        setLoading(false);
        navigation.navigate('Categories')
    } catch (error) {
      setLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  
  
  
  
    
         
        }
        
  }
  return (
    <View style={{flex:1}}> 
    <ScrollView
      style={{
        flex: 1,
      }}>
      <BackButton label={'Add Job'} />
      <Text style={styles.heading}>Job Details</Text>

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

       
      </View>
      {error ? (
          <Text style={{color: 'red', marginTop: 4}}>
            All fields with * are mandatory
          </Text>
        ) : null}
          {isKeyboardActive ? (
                <Text style={{ height: 100}}></Text>
              ) : null}
    </ScrollView>
    <Pressable
  style={{
    borderRadius: 32,
    padding: 10,bottom:30,
    alignItems: "center",width:'90%',
    alignSelf:'center',
    justifyContent: "center",
    backgroundColor: "#197739",
  }}
  onPress={Register}
   // Disable the button while loading
>
  {Loading ? (
    <ActivityIndicator size="small" color="white" style={{ alignSelf: "center" }} />
  ) : (
    <Text style={{ color: "white", fontSize: 16 }}>Add Job</Text>
  )}
</Pressable>
    </View>
  );
};

export default AddJob;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
    textAlign: 'center',
    marginVertical: 20,
  },
  form_container: {
    marginHorizontal: 20,
  },
});
