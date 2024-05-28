import React, {useState,useEffect} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import CustomTextInput from '../../../../Components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
const OtherData = React.memo(({ route ,props,navigation}) => {


  const [token,settoken] = useState()
useEffect(() => {
  getdevicetoken()
}, []);


const getdevicetoken = async()=>{

  try {
    const Token = await AsyncStorage.getItem('Token');
    settoken(Token);
    console.log('my category is', Token )
  } catch (error) {
    console.error('Error getting category from AsyncStorage:', error);
  }
}
  const {
    Image,surname,name,Status,fatherName,userID,motherName,HusbandName,grandFatherName,grandFatherNameNana,gender,dob,maritalStatus,country,state,city,district,postalCode,Address,Street, email,password,nationality,phoneNumber,partnerName
  }=route.params
  const [error, setError] = React.useState(false);
  const [isSchoolEmpty, setIsSchoolEmpty] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [isEducationEmpty, setIsEducationEmpty] = useState(false);
  const [education, setEducation] = useState('');
  const [isSchoolNameEmpty, setIsSchoolNameEmpty] = useState(false);
  const [isCollegeNameEmpty, setIsCollegeNameEmpty] = useState(false);
  const [collegeName, setCollegeName] = useState('');
  const [isAboutMeEmpty, setIsAboutMeEmpty] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const [isProfessionEmpty, setIsProfessionEmpty] = useState(false);
  const [profession, setProfession] = useState('');
  const[Data,setData] = useState({
    userID:userID,
    Profile: Image,
    Name: name,
    FatherName: fatherName,HusbandName:HusbandName,
    GrandFatherName: grandFatherName,
    MotherName: motherName,
    Nana:grandFatherNameNana,
    Surname:surname,
    Gender :gender,
    Dob: dob,
    MaritalStatus: maritalStatus,
    Country: country,
    State: state,
    City: city,
    Token:token,
    Status:Status,
    District: district,
    PostalCode: postalCode,
    Address: Address,
    Street: Street,
    Email: email,
    Nationality: nationality,
    PhoneNumber: phoneNumber,
    PartnerName: partnerName,
AboutMe:aboutMe,
Education:education,
SchoolName:schoolName,
CollegeName:collegeName,Bio:'',
Profession:profession,
Category:category,
Facebook:'',
Instagram:'',
Linkedin:'',
Twitter:'',

  })

  const update = ()=>{
    setData({
      userID:userID,
    Profile: Image,
    Name: name,
    FatherName: fatherName,HusbandName:HusbandName,
    GrandFatherName: grandFatherName,
    MotherName: motherName,
    Nana:grandFatherNameNana,
    Surname:surname,
    Gender :gender,
    Dob: dob,
    MaritalStatus: maritalStatus,
    Country: country,
    State: state,
    City: city,
    Token:token,
    Status:Status,
    District: district,
    PostalCode: postalCode,
    Address: Address,
    Street: Street,
    Email: email,
    Nationality: nationality,
    PhoneNumber: phoneNumber,
    PartnerName: partnerName,
AboutMe:aboutMe,
Education:education,
SchoolName:schoolName,
CollegeName:collegeName,Bio:'',
Profession:profession,
Category:category,
Facebook:'',
Instagram:'',
Linkedin:'',
Twitter:'',
    })
  }



  useEffect(()=>{
    update()
  },
  [schoolName,name,fatherName,HusbandName,grandFatherName,motherName,grandFatherNameNana,surname,gender,dob,maritalStatus,country,userID,Image,category,profession,collegeName,education,aboutMe,partnerName,phoneNumber,nationality,email,Street,Address,postalCode,district,Status,token,city,state])
  const tokenlist = async()=>{
    try {
      // await uploadimage1();
      // await uploadimage2();

      // await uploadimage3();
      console.log('data transfering');
      await firestore()
          .collection('Tokens')
          .doc()
        
        .set({
         
          Token:token,
      
    

        
        });

      
     
    } catch (error) {
      // setIsLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  }

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
  const [category, setCategory] = useState('');
  useEffect(() => {
    const getCategory = async () => {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
    };
    getCategory();
  }, []);









  const signupHandler =async() => {
    if (aboutMe === '') {
      setIsAboutMeEmpty(true);
      setError(true);
    }


   if (error == false){
    try {
        
   
 
      await firestore()
        .collection('OtherData')
        .doc(user)
        // .collection('EventData')
        // .doc()
        .set({
          userID:userID,
          Profile: Image,
          Name: name,
          FatherName: fatherName,HusbandName:HusbandName,
          GrandFatherName: grandFatherName,
          MotherName: motherName,
          Nana:grandFatherNameNana,
          Surname:surname,
          Gender :gender,
          Dob: dob,
          MaritalStatus: maritalStatus,
          Country: country,
          State: state,
          City: city,
          Token:token,
          Status:Status,
          District: district,
          PostalCode: postalCode,
          Address: Address,
          Street: Street,
          Email: email,
          Nationality: nationality,
          PhoneNumber: phoneNumber,
          PartnerName: partnerName,
  AboutMe:aboutMe,
  Education:education,
  SchoolName:schoolName,
  CollegeName:collegeName,Bio:'',
  Profession:profession,
  Category:category,
  Facebook:'',
Instagram:'',
Linkedin:'',
Twitter:'',
  
  
  // Degree:degree,
  // Degreeyear:year,
  // Board:board,
  // Medium:medium,
  // SchoolName:schoolName,
  // Ambition:ambition,
 
          // ... (rest of the data)
        });
  await tokenlist();
  const jsonData = JSON.stringify(Data);
  await AsyncStorage.setItem('UserData', jsonData);
      // setIsLoading(false);
      // alert('Product Added Successfully');
      navigation.replace('home');
    } catch (error) {
      // setIsLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }






   }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Title style={styles.heading}>Individual / Other</Title>
        <Paragraph style={{marginBottom: 8}}>
          ( All fields with * are mandatory )
        </Paragraph>

        <CustomTextInput
          setError={setIsAboutMeEmpty}
          required={true}
          error={isAboutMeEmpty}
          value={aboutMe}
          onChange={setAboutMe}
          label="About me"
        />
        <CustomTextInput
          setError={setIsEducationEmpty}
          required={false}
          error={isEducationEmpty}
          value={education}
          onChange={setEducation}
          placeholder="Class 1 -9, SSC, HSC, Graduation, other"
          label="Educational Qualification"
        />
        <CustomTextInput
          setError={setIsSchoolNameEmpty}
          required={false}
          error={isSchoolEmpty}
          value={schoolName}
          onChange={setSchoolName}
          label="School name"
        />
        <CustomTextInput
          setError={setIsCollegeNameEmpty}
          required={false}
          error={isCollegeNameEmpty}
          value={collegeName}
          onChange={setCollegeName}
          label="College name"
        />
        <CustomTextInput
          setError={setIsProfessionEmpty}
          required={false}
          error={isProfessionEmpty}
          value={profession}
          onChange={setProfession}
          label="Profession"
        />

        {error ? (
          <Text style={{color: 'red', marginTop: 4}}>
            All fields with * are mandatory
          </Text>
        ) : null}

        <Button mode="contained" style={styles.button} onPress={signupHandler}>
          Sign up
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default OtherData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
  },
  heading: {
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#197739',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    objectFit: 'cover',
  },
  input: {
    width: '100%',
    marginBottom: 4,
    backgroundColor: '#ddd',
  },
  button: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#197739',
  },
});
