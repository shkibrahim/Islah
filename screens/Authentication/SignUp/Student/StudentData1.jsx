import React, {useState,useEffect} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import CustomDropDown from '../../../../Components/CustomDropDown';
import CustomTextInput from '../../../../Components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
const StudentData1 = React.memo(({ route ,props,navigation}) => {


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
  const [error, setError] = React.useState();
  const [degree, setDegree] = useState('');
  const [board, setBoard] = useState('');
  const [isBoardEmpty, setIsBoardEmpty] = useState(false);
  
  const [isDegreeEmpty, setIsDegreeEmpty] = useState(false);
  const [isYearEmpty, setIsYearEmpty] = useState(false);
  const [isSchoolEmpty, setIsSchoolEmpty] = useState(false);
  const [year, setYear] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [medium, setMedium] = useState('medium');
  const [isMeduiumEmpty, setIsmediumEmpty] = useState(false);
  const [achievement, setAchievement] = useState('');
  const [isAchieveMentEmpty, setisAchieveMentEmpty] = useState(false);
  const [ambition, setAmbition] = useState('');
  const [isAmbitionEmpty, setisAmbitionEmpty] = useState(false);
  const {
    Image,surname,name,userID,fatherName,Status,motherName,HusbandName,grandFatherName,grandFatherNameNana,gender,dob,maritalStatus,country,state,city,district,postalCode,Address,Street, email,password,nationality,phoneNumber,partnerName
  }=route.params
  const meduims = ['Medium', 'English', 'Urdu', 'Hindi', 'Marathi', 'Other'];
  const[Data,setData] = useState({
    userID:userID,
    Profile: Image,
    Name: name,
    FatherName: fatherName,
    GrandFatherName: grandFatherName,
    MotherName: motherName,
    Nana:grandFatherNameNana,
    HusbandName:HusbandName,
    Surname:surname,
    Gender :gender,
    Dob: dob,
    Token:token,
    Status:Status,
    MaritalStatus: maritalStatus,
    Country: country,
    State: state,
    City: city,
    District: district,
    PostalCode: postalCode,
    Address: Address,
    Street: Street,
    Email: email,
    Nationality: nationality,
    PhoneNumber: phoneNumber,
    PartnerName: partnerName,
Category:category,


Degree:degree,
Degreeyear:year,
Board:board,
Medium:medium,
SchoolName:schoolName,
Ambition:ambition,
Achievement:achievement,
Profession:'',
Bio:'',
Facebook:'',
Instagram:'',
Linkedin:'',
Twitter:'',
  })


  const updater = ()=>{
    setData({
      Profile: Image,
      Name: name,
      FatherName: fatherName,
      GrandFatherName: grandFatherName,
      MotherName: motherName,
      Nana: grandFatherNameNana,
      Gender: gender,
      Dob: dob,
      MaritalStatus: maritalStatus,
      HusbandName:HusbandName,
      Country: country,
      State: state,
      surname: surname,
      Token: token,
      City: city,
      District: district,
      Status: Status,
      PostalCode: postalCode,
      Address: Address,
      Street: Street,
      Email: email,
      Nationality: nationality,
      PhoneNumber: phoneNumber,
      PartnerName: partnerName,
      Category: category,
      userID: userID,
      Bio: '',
Degree:degree,
Degreeyear:year,
Board:board,
Medium:medium,
SchoolName:schoolName,
Ambition:ambition,
Achievement:achievement,
      Facebook:'',
      Instagram:'',
      Linkedin:'',
      Twitter:'',
    })
    }
    
    useEffect(()=>{
      updater()
    },[achievement,ambition,degree,year,board,Image,medium,schoolName,name,fatherName,grandFatherName,motherName,grandFatherNameNana,gender,dob,maritalStatus,HusbandName,country,state,surname,token,city,district,Status,postalCode,Address,Street,email,nationality,userID,category,partnerName,phoneNumber])
  const [category, setCategory] = useState();
  useEffect(() => {
    const getCategory = async () => {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
    };
    getCategory();

   
  }, []);
const [user,setuser] = useState()
  
  useEffect(() => {
    getEmailFromStorage();
    console.log('ehi',Image)
  }, []);

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };

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

      
      // navigation.replace('Home');
    } catch (error) {
      // setIsLoading(false);
      console.log('Error adding token:', error);
      // Handle any error that might occur during the process
    }
  }
  

  useEffect(() => {
    // Reset error state
    setError(false);
  
    // Check for non-empty fields and update error state
    if (degree !== '' && year !== '' && board !== '' && schoolName !== '' && ambition !== '' && medium !== 'medium') {
      setIsmediumEmpty(false);
    } else {
      setError(true);
    }
  }, [degree, year, board, schoolName, ambition, medium]);
const checked = async() => {
  if (degree == '') {
    setIsDegreeEmpty(true)
      setError(true)
  } if (year == '') {
    setIsYearEmpty(true)
      setError(true)
  } if (board == '') {
    setIsBoardEmpty(true)
      setError(true)
  }
  if (medium == 'medium') {
      setIsmediumEmpty(true)
      setError(true)
  }
  if (schoolName == '') {
    setIsSchoolEmpty(true)
    setError(true)
}
if (ambition == '') {
  setisAmbitionEmpty(true)
  setError(true)
}
}
  const signupHandler = async() => {
 
    await checked()

      if (error == false ) {
  console.log('agf')
  try {
        
   
 
    await firestore()
      .collection('StudentData')
      .doc(user)
      // .collection('EventData')
      // .doc()
      .set({
        userID:userID,
        Profile: Image,
        Name: name,
        FatherName: fatherName,
        GrandFatherName: grandFatherName,
        MotherName: motherName,
        Nana:grandFatherNameNana,
        HusbandName:HusbandName,
        Surname:surname,
        Gender :gender,
        Dob: dob,
        Token:token,
        Status:Status,
        MaritalStatus: maritalStatus,
        Country: country,
        State: state,
        City: city,
        District: district,
        PostalCode: postalCode,
        Address: Address,
        Street: Street,
        Email: email,
        Nationality: nationality,
        PhoneNumber: phoneNumber,
        PartnerName: partnerName,
Category:category,
Facebook:'',
Instagram:'',
Linkedin:'',
Twitter:'',

Degree:degree,
Degreeyear:year,
Board:board,
Medium:medium,
SchoolName:schoolName,
Ambition:ambition,
Achievement:achievement,
Profession:'',
Bio:''
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


















  
        // navigation.navigate('imagepickerpage', {
        //   surname:surname,
        //   name:name,
        //   fatherName:fatherName,
        //   motherName:motherName,
        //   grandFatherName:grandFatherName,
        //   grandFatherNameNana:grandFatherNameNana,
        //   gender:gender,
        //   dob:dob,
          
        //   maritalStatus:maritalStatus,
        //   country:country,
        //   state:state,
        //   city:city,
        // district:district,
        // postalCode:postalCode,
        // Address:Address,
        // Street:Street,
    
        // email:email,
        // password:password,
        // nationality:indian,
        // phoneNumber:phoneNumber
    
        
        // })
      }
      
    
    };
  









  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Title style={styles.heading}> Academic Details </Title>
        <Paragraph style={{marginBottom: 8}}>
          (All fields with * are mandatory )
        </Paragraph>
        <CustomTextInput
          setError={setIsDegreeEmpty}
          required={true}
          error={isDegreeEmpty}
          value={degree}
          onChange={setDegree}
          label="Studying In Class / Standard"
        />
        <CustomTextInput
          placeholder="Academic Year eg. 2023 – 2024"
          keyboarType="numeric"
          setError={setIsYearEmpty}
          required={true}
          error={isYearEmpty}
          value={year}
          onChange={setYear}
          label=" Academic Year eg. 2023 – 2024"
        />
        <CustomTextInput
          setError={setIsBoardEmpty}
          required={true}
          error={isBoardEmpty}
          value={board}
          onChange={setBoard}
          label="Board / Course"
        />
        {/* Dropdown menu for Meduim */}
        <CustomDropDown
          options={meduims}
          setSelectedOption={setMedium}
          selectedOption={medium}
        />
        {isMeduiumEmpty ? (
          <Text
            style={{
              color: 'red',
              width: '100%',
            }}>
            Meduim is mandatory
          </Text>
        ) : null}
        <CustomTextInput
          setError={setIsSchoolEmpty}
          required={true}
          error={isSchoolEmpty}
          value={schoolName}
          onChange={setSchoolName}
          label="School Name / College Name"
        />
        <CustomTextInput
          setError={setisAchieveMentEmpty}
          required={false}
          error={isAchieveMentEmpty}
          value={achievement}
          onChange={setAchievement}
          label="Achievements if any"
        />

        
        <CustomTextInput
          setError={setisAmbitionEmpty}
          required={true}
          error={isAmbitionEmpty}
          value={ambition}
          onChange={setAmbition}
          label="Ambition"
        />
        {error ? (
          <Text style={{color: 'red', marginTop: 4}}>
            All fields with * are mandatory
          </Text>
        ) : null}
        <Button mode="contained" style={styles.button} onPress={signupHandler}>
          Sign Up
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default StudentData1;

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
