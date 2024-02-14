import {StyleSheet, Text, View,Pressable,Keyboard,ActivityIndicator } from 'react-native';
import React, {useState,useEffect} from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomDropDown from '../../../Components/CustomDropDown';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomButton from '../../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const AddDetails = ({navigation}) => {
  const [StudentData, setStudentData] = useState([]);
  const [BusinessData, setBusinessData] = useState([]);
  const [IndividualData, setIndividualData] = useState([]);
  const [JobSeekerData, setJobSeekerData] = useState([]);
const [AllData,setAllData] = useState()

const [Name,setName] = useState()
const [Profile,setProfile] = useState()
const [Gender,setGender] = useState()
  const [grandFatherNanaName, setGrandFatherNanaName] = useState('');
  const [isGrandFatherNameEmpty, setIsGrandFatherNameEmpty] = useState(false);
  const [error,setError] = useState()
  const [parentContactNumberFather, setParentContactNumberFather] = useState('');
  const [isPCNFE, setIsPCNFE] = useState(false);
  // PCNF = Parent Contact Number Father empty
  const [parentContactNumberBrother, setParentContactNumberBrother] =
    useState('');
  const [isPCNBE, setIsPCNBE] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [looker,setlooker]= useState('i am looker')
const [Data,setData] = useState()
  const submitHandler = () => {
    console.log('submitHandler');
  };


  const [user,setuser] = useState()
  
  useEffect(() => {
    getEmailFromStorage();
    
  }, []);


  const funcat = async()=>{

   
    try {
      
       const concatenatedData =  await StudentData.concat(IndividualData, BusinessData, JobSeekerData);
      setAllData(concatenatedData);
      if (concatenatedData.length>0){
        console.log('concatting starts')
        // console.log('Concat func ke andr ', concatenatedData)
        
  // console.log('concatenated data',concatenatedData  )
  
      }
      
  
      // setAllData(concatenatedData.flat()); // flat() to flatten the array of arrays
     
    } catch (error) {
      console.error('Error concatenating data:', error);
    }
  }
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
  };
  
  useEffect(() => {
  
    
    // console.log('concating')
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
    funcat();
  
  
  }, [StudentData, BusinessData, IndividualData, JobSeekerData]);


  const myDatafetch = async()=>{


      // const storedEmail = await AsyncStorage.getItem('userName');
      // setuser(storedEmail);
      // console.log(storedEmail)
      // console.log('Sara Data',AllData)
   
      const mydata =  await AllData.find((data)=> data.id === user);
      const myProfile = mydata.Profile
      const myName = mydata.Name
      const myGender = mydata.Gender
      setGender(myGender)
      setName(myName)
      setProfile(myProfile)
      console.log('My name is' , myName)
      console.log('Profile link is', myProfile)
      
    setData(mydata)
  
      // console.log('profile data is ' , mydata)
  
  }
  
  useEffect(() => {
   
    const funcData = async () => {
      try {
        await getEmailFromStorage()
        await fetchalldata();
  // await  funcat();
 
  
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    funcData();
  }, []);
  useEffect(() => {
    if (AllData) {
      myDatafetch()
    }
  
 },[AllData]);
  
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


useEffect(() => {
  // Reset error state
  setError(false);

  // Check for non-empty fields and update error state
  if (grandFatherNanaName !== '' && parentContactNumberFather !== '' && parentContactNumberBrother !== '' && maritalStatus !== 'choose Marital Status' ) {
 setError(false)
  } else {
    setError(true);
  }
}, [grandFatherNanaName, parentContactNumberFather, parentContactNumberBrother, maritalStatus]);


  const Register =async()=>{
    if ( grandFatherNanaName== '') {
      setIsGrandFatherNameEmpty(true)
        setError(true)
  }
  
  if (parentContactNumberFather == '') {
    setIsPCNFE(true)
      setError(true)
  }
  
  if (parentContactNumberBrother == '') {
    setIsPCNBE(true)
      setError(true)
  }
  
  
  if (maritalStatus == 'choose marital status') {
    
      setError(true)
  }
  
  

  
  if (error == false ) {
    setLoading(true)
    console.log('agf')
    try {
          
     
      await AsyncStorage.setItem('Looker', looker);
      await firestore()
        .collection('Matrimonial')
        .doc(user)
      
        .set({
          grandFatherNanaName:grandFatherNanaName,
          parentContactNumberFather:parentContactNumberFather,
          parentContactNumberBrother:parentContactNumberBrother,
          maritalStatus:maritalStatus,
         Name:Name,
         Profile:Profile,
         Gender:Gender
       
          // ... (rest of the data)
        });
        navigation.navigate('Categories')
        setLoading(false);
       
    } catch (error) {
      setLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  
  
  
  
    
         
        }
        
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <BackButton label={'Add Details'} />
      <View style={styles.form_container}>
        <Text style={styles.heading}>Matrimonial Details</Text>
        <CustomTextInput
          setError={setIsGrandFatherNameEmpty}
          required={true}
          error={isGrandFatherNameEmpty}
          value={grandFatherNanaName}
          onChange={setGrandFatherNanaName}
          label="Grandfather Name ( Nana )"
        />
        <CustomTextInput
          setError={setIsPCNFE}
          required={true}
          error={isPCNFE}
          value={parentContactNumberFather}
          onChange={setParentContactNumberFather}
          label="Parent Contact Number Father"
        />
        <CustomTextInput
          setError={setIsPCNBE}
          required={true}
          error={isPCNBE}
          value={parentContactNumberBrother}
          onChange={setParentContactNumberBrother}
          label="Parent Contact Number Brother"
        />

        <CustomDropDown
          options={[
            'Choose Marital Status',
            'Single',
            'Married',
            'Divorced',
            'Widowed',
            'Engagement Called off',
          ]}
          selectedOption={maritalStatus}
          setSelectedOption={setMaritalStatus}
        />
       
      </View>
      {error ? (
          <Text style={{color: 'red', alignSelf:'center',position:'absolute',bottom:100}}>
            All fields with * are mandatory
          </Text>
        ) : null}
          {isKeyboardActive ? (
                <Text style={{ height: 100}}></Text>
              ) : null}
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
    <Text style={{ color: "white", fontSize: 16 }}>Add My Details</Text>
  )}
</Pressable>
    </View>
  );
};

export default AddDetails;

const styles = StyleSheet.create({
  form_container: {
    marginHorizontal: 20,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color:'black'
  },
});
