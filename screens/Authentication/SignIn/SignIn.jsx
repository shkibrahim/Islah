import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Paragraph,
  Text,
  Title,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';

import CustomButton from '../../../Components/CustomButton';
import CustomTextInput from '../../../Components/CustomTextInput';
import {useFocusEffect} from '@react-navigation/native';

import {login} from '../../../redux/reducers/authReducers';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from '@reduxjs/toolkit';
import Loader from '../../../Components/loader/Loader';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {clearError} from '../../../redux/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtherData from '../SignUp/Other/OtherData';
import { set } from 'date-fns';
import { myTheme } from '../../../theme';
const SignIn = ({route,   }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [StudentData, setStudentData] = useState([]);
  const [BusinessData, setBusinessData] = useState([]);
  const [IndividualData, setIndividualData] = useState([]);
  const [JobSeekerData, setJobSeekerData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [myID,setmyID] = useState()
  const [error, setError] = useState(false);
  const {err, loading, isAuthenticated} = useSelector(state => state.auth);
  const[Data,setData] = useState()
  const [Category,setCategory] = useState('')
  const [Loader,setLoader]=useState(false)
  const [StartLoader,setStartLoader]= useState(false)
const navigation = useNavigation()

const [token,settoken] = useState()
useEffect(() => {
  getdevicetoken()
}, []);

const getdevicetoken= async()=>{
  
  let a =await messaging().getToken()
settoken(a);
console.log('my token',a)

await AsyncStorage.setItem('Token', a);

}


const tokenlist = async()=>{
  try {
   
    console.log('data transfering');
    await firestore()
        .collection('Tokens')
        .doc()
      
      .set({
       
        Token:token,
    
  

      
      });

    
   
  } catch (error) {

    console.log('Error addinfsf product:', error);
    // Handle any error that might occur during the process
  }
}




const fetchalldata = async () => {
  setStartLoader(true)
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
    // const concatenatedData = await StudentData.concat(
    //   IndividualData,
    //   BusinessData,
    //   JobSeekerData,)


    const user = await AsyncStorage.getItem('UserData')
if (user!=null && user!=undefined){
  navigation.replace('home')

}

    setStartLoader(false)





  } catch (error) {
    console.error('Error fetching jobseeker data:', error);
  }


};
const funcat = async () => {

  // setLoader(true)
  console.log('concatting starts');
  try {
    const concatenatedData = await StudentData.concat(
      IndividualData,
      BusinessData,
      JobSeekerData,
    );
    setAllData(concatenatedData);
    if (concatenatedData.length > 0) {
      console.log('overall funcats, ',concatenatedData)
      const mydata = await concatenatedData?.find(data => data?.id === username);
      const mycategory =mydata?.Category
      console.log('Concat func ke andr ', );
console.log('my user data',mydata)
if (mydata) {
  const jsonData = JSON.stringify(mydata);
  console.log('my data of login user is', mydata)
  await AsyncStorage.setItem('UserData', jsonData);
}

if (mycategory){
  await AsyncStorage.setItem('Category', mycategory)

}
if (mycategory === 'business') {
  try {
 
    await firestore()
      .collection('BusinessPerson')
      .doc(username)

      .update({
       Token:token
        // ... (rest of the data)
      });

  
  } catch (error) {
    console.error('Error updating business data:', error);
  }
}



if (mycategory == 'jobseeker' ) {
  try {
  
    await firestore()
      .collection('JobSeekerData')
      .doc(username)

      .update({
        Token: token,

       
        // ... (rest of the data)
      });

  
  } catch (error) {
    console.error('Error updating data:', error);
  }
}



if (mycategory == 'student') {
  console.log('first student')
  try {
    
    await firestore()
      .collection('StudentData')
      .doc(username)

      .update({
        Token: token,
      });
    
   
  } catch (error) {
    console.error('Error updating data:', error);
  }
}



if (mycategory == 'other' ) {
  try {

    await firestore()
      .collection('OtherData')
      .doc(username)

      .update({
        Token: token,

      
      });
   
 
     
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

if (mydata !=undefined){
  navigation.replace('home');

}
if (mydata ==undefined){
  Alert.alert('Your account not longer exists')

}

      // setLoader(false)r
      // console.log('concatenated data',concatenatedData  )
    }

    // setAllData(concatenatedData.flat()); // flat() to flatten the array of arrays

  } catch (error) {
    console.error('Error concatenating data:', error);
  }
};
const [isModalVisible, setModalVisible] = useState(false);
const [Loading,setLoading] = useState(false)
const [UserEmail, setUserEmail] = useState();
const Forgot =()=>{
  setModalVisible(!isModalVisible);

}

const SendEmail = async () => {
  console.log('gg'); // Assuming this is a debug log

  // Assuming UserEmail is defined somewhere in your code
  const email = UserEmail; // Use the email you want to send the reset password to

  if (!/^[\w\.-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email)) {
    // Assuming setEmailError is a function to set an error state
    // Make sure to handle the state accordingly in your code
    Alert.alert('Invalid Email format');
    return;
  }

  try {
    // Send password reset email using Firebase Authentication
    await auth().sendPasswordResetEmail(email);

    // Assuming you are using some kind of notification or alert mechanism
    Alert.alert( 'Password reset code sent to your email');
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      Alert.alert('Error', 'Invalid email address');
    } else if (error.code === 'auth/user-not-found') {
      Alert.alert('Error', 'Email address is not registered');
    } else {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  }

  setModalVisible(!isModalVisible)
};

useEffect(() => {
  // console.log('concating')
  // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
  fetchalldata();
}, []);



const DataUpdate = async () => {
  console.log('data merging starts ');

  console.log('ALL THE DATA IS',AllData)
  const mydata = await AllData?.find(data => data?.id === username);
  console.log('username is going in',username)
  console.log('my data is',mydata)
  setData(mydata);

  if (mydata) {
    // Convert the object to a JSON string
    const jsonData = JSON.stringify(mydata);

    // Save the JSON string to AsyncStorage
    await AsyncStorage.setItem('UserData', jsonData);
}

if (Data && Data.length>0){
  // const mycategory ='svs'
  console.log('category coming from be',mycategory)
  
  
  const id =mydata.id
  setmyID(id)
  setCategory(mycategory)
}

const mycategory =mydata?.Category
console.log('asli ha',mycategory)
// await AsyncStorage.setItem('Category', mycategory);

if (mycategory){
  await AsyncStorage.setItem('Category', mycategory)

}
  if (mycategory === 'business') {
    try {
   
      await firestore()
        .collection('BusinessPerson')
        .doc(username)

        .update({
         Token:token
          // ... (rest of the data)
        });

    
    } catch (error) {
      console.error('Error updating business data:', error);
    }
  }

 

  if (mycategory == 'jobseeker' ) {
    try {
    
      await firestore()
        .collection('JobSeekerData')
        .doc(username)

        .update({
          Token: token,

         
          // ... (rest of the data)
        });

    
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }



  if (mycategory == 'student') {
    console.log('first student')
    try {
      
      await firestore()
        .collection('StudentData')
        .doc(username)

        .update({
          Token: token,
        });
      
     
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  

  if (mycategory == 'other' ) {
    try {
  
      await firestore()
        .collection('OtherData')
        .doc(username)

        .update({
          Token: token,

        
        });
     
   
       
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }


  // navigation.replace('home');
};
  // console.log(
  //   `error ->`,
  //   err,
  //   'loading ->',
  //   loading,
  //   'isAuthenticated ->',
  //   isAuthenticated,
  // );

  // useEffect(() => {
  //   if (isAuthenticated) {
  //       navigation.navigate('home');
  //   }
  //   if (err) {
  //     Alert.alert('Error', err);
  //     dispatch(clearError());
  //   }
  // }, [isAuthenticated, err, dispatch]);

// const [Loader,setLoader] = useState(false)

  const loginHandler = async() => {

    if (username === '' || password === ''  ) {
      setError(true);
    } else {
      

      try {
        await auth()
          .signInWithEmailAndPassword(username, password);
          setLoader(true)
      await AsyncStorage.setItem('userName', username);
          await tokenlist()
          await funcat()
          // await DataUpdate()
   
        // Save email in AsyncStorage regardless of its value
    
  // setUsername('')
  setPassword('')

        // Navigate to the 'Map' screen
     
  
        console.log('User Stored Successfully');
        setLoader(false)
      } catch (error) {
       if (error.code === 'auth/invalid-credential') {
          Alert.alert('Invalid Credentials!');
        } else if (error.code === 'auth/invalid-login') {
          Alert.alert('Wrong Email or Password');
        } else {
          Alert.alert(error)
          console.error(error);
          setLoader(false)
        }

  
      }
    }
  };

  return (
    <View style={{flex:1}}>
{StartLoader ? (
  <View style={{alignSelf:"center",marginTop:300,justifyContent:"center",alignItems:"center"}}>
    <Image
      source={require('../../../assets/images/logo.png')}
      style={styles.logo2}
    />
<Text style={{color:'green',fontSize:18,fontWeight:"900",}}>WELCOME TO ISLAH</Text>

  </View>

): (
<View style={{flex:1}}>
{Loader ? (
  <View style={{alignSelf: 'center', marginTop: 350}}>
  <Text  style={{color:'green',marginBottom:10}}>Signing in</Text>
  <ActivityIndicator
    size="large"
    color="green"
    style={{}}
  />
  </View>
) : (
<ScrollView style={{
flex: 1,
backgroundColor: '#fff',
}}>
<TouchableWithoutFeedback
  onPress={() => {
    Keyboard.dismiss();
  }}>
  <View style={styles.container}>
    <Image
      source={require('../../../assets/images/logo.png')}
      style={styles.logo}
    />
    <Title style={styles.brandName}>Islah Committee</Title>
    <Title style={styles.heading}>Welcome Back</Title>
    <Paragraph style={{marginBottom: 8}}>Sign in to continue</Paragraph>
    {/* input Fields */}
    <CustomTextInput
      setError={setIsUsernameEmpty}
      required={false}
      error={isUsernameEmpty}
      value={username}
      onChange={setUsername}
      label="Username"
    />
    <TextInput
      underlineColor="#000"
      activeOutlineColor="#197739"
      placeholderTextColor="#666"
      textColor="#000"
      selectionColor="green"
      outlineColor="#197739"
      style={styles.input}
      outlineStyle={{borderRadius: 8}}
      cursorColor="green"
      label="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={hidePassword}
      mode="outlined"
      right={
        <TextInput.Icon
          size={20}
          color="#666"
          icon={hidePassword ? 'eye-off' : 'eye'}
          onPress={() => setHidePassword(!hidePassword)}
        />
      }
      error={isPasswordEmpty}
    />

    {/* Showing error  */}

    {error && (
      <Text style={{marginTop: 8, color: 'red', marginBottom: 8}}>
        Please enter Username and password
      </Text>
    )}

    {/* Sign In button */}

    <CustomButton
      label="Sign In"
      onPress={() => {
        loginHandler();
      }}
    />

    <Text>
      Don't have an account?
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('beforesignup');
        }}>
        <Text
          style={{color: '#197739', marginLeft: 4, fontWeight: 'bold'}}>
          {' '}
          Sign Up
        </Text>
      </TouchableOpacity>
    </Text>
    <TouchableOpacity
      style={{
        paddingTop: 8,
      }}
      onPress={Forgot}>
      <Text style={{color: '#197739', marginLeft: 4}}>
        Forgot Password?
      </Text>
    </TouchableOpacity>

    <Modal isVisible={isModalVisible}
  onBackButtonPress={() => setModalVisible(false)} // Close the modal on Android back button press
  onBackdropPress={() => setModalVisible(false)} >
        <View style={{padding:10, justifyContent: "center", alignItems: "center" ,backgroundColor:"white", borderRadius:12}}>
          <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between",width:'100%'}}>
          <MaterialIcons name="close" size={18} color={'transparent'} />
        
          <Text style={{color:"black",fontFamily:"PT Serif Bold",marginBottom:12}}>Enter Email</Text>
          <TouchableOpacity onPress={()=>setModalVisible(!isModalVisible)}>
          <MaterialIcons name="close" size={18} color={'black'} />

          </TouchableOpacity>

          </View>
          <TextInput
      underlineColor="#000"
      activeOutlineColor="#197739"
      placeholderTextColor="#666"
      textColor="#000"
      selectionColor="green"
      outlineColor="#197739"
      style={styles.input}
      outlineStyle={{borderRadius: 8}}
      cursorColor="green"
      label="Email"
      value={UserEmail}
      onChangeText={setUserEmail}
      mode="outlined"
      // right={
      //   <TextInput.Icon
      //     size={20}
      //     color="#666"
      //     icon={hidePassword ? 'eye-off' : 'eye'}
      //     onPress={() => setHidePassword(!hidePassword)}
      //   />
      // }
      error={isPasswordEmpty}
    />

      <TouchableOpacity
      activeOpacity={0.6}
        style={{ marginTop:3,backgroundColor: 'green', borderRadius: 12, justifyContent: "center", alignItems: "center", width: 75, height: 28, }}
        onPress={SendEmail}
      >
       {Loading ? (
            <ActivityIndicator
              size="small"
              color="white"
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            />
          ) : (
        <Text style={{ color: "white" }}>Send</Text>
        )}
      </TouchableOpacity>
        </View>
      </Modal>
  </View>
</TouchableWithoutFeedback>
</ScrollView>
)}
</View>
)}

      
  
    </View>
  );
};

export default SignIn;

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
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#197739',
  },
  brandName: {
    marginBottom: 72,
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: 'Roboto',
    color: '#197739',
    padding: 8,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 8,
    objectFit: 'cover',
  },
  logo2: {
    width: 150,
    height: 150,
    objectFit: 'cover',
  },
  input: {
    width: '100%',
    marginBottom: 4,
    backgroundColor: '#ddd',
    fontFamily: 'Roboto',
    fontSize: 14,
    position: 'relative',
    borderRadius: 20,
  },
  // input: {
  //     width: '100%',
  //     borderColor: "green",
  //     backgroundColor: "#ddd",
  //     marginVertical: 8,
  // },
  button: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#197739',
  },
});
