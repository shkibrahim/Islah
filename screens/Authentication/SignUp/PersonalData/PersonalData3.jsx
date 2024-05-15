import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,ActivityIndicator,
  TouchableWithoutFeedback,TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Button, Paragraph, RadioButton, Text, Title} from 'react-native-paper';
import CustomTextInput from '../../../../Components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
const PersonalData3 = React.memo(({ route ,props,navigation}) => {
const [Loading,setLoading] = useState(false)
const [RideTypeModal, setRideTypeModal] = useState(false);
const RideTypeSelector = (item) => {
  setselectedItem(item)
  setRideTypeModal(!RideTypeModal);
};


  const {
    surname,name,fatherName,HusbandName,motherName,grandFatherName,grandFatherNameNana,gender,dob,maritalStatus,country,state,city,district,postalCode,Address,Street,partnerName
  }=route.params

  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [userName, setUsername] = React.useState('');
  const [isUsernameEmpty, setIsUsernameEmpty] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isphoneNumberempty, setisphoneNumberempty] = React.useState(false);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] =
    React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordEmpty, setIsPasswordEmpty] = React.useState(false);
  const [indian, setIndian] = React.useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = React.useState(false);
  const [error, setError] = React.useState();
const[wrongpassword,setwrongpassword] = useState(false);
  useEffect(() => {
    console.log('svsv');
  console.log(maritalStatus)
    // Check for non-empty fields and update error state
    if (userName !== '' && phoneNumber !== '' && password !== '' && confirmPassword !== '' && password.length > 6   ) {
      setError(false);
      setIsUsernameEmpty(false)
    }
    else {
      setError(true);
    }
  }, [error, userName, phoneNumber, password, confirmPassword,wrongpassword]); // Include all relevant dependencies
  

  const [VerifiedLoader,setVerifiedLoader] = useState(false)

useEffect(()=>{
  const unsubscribe = auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      if (user.emailVerified) {
        setVerifiedLoader(true)
        // Email is verified
       navigation.navigate('imagepickerpage', {
    surname:surname,
    
    name:name,
    fatherName:fatherName,
    motherName:motherName,
    grandFatherName:grandFatherName,
    grandFatherNameNana:grandFatherNameNana,
    gender:gender,
    dob:dob,
    partnerName:partnerName,
    maritalStatus:maritalStatus,
    country:country,
    state:state,
    city:city,
  district:district,
  postalCode:postalCode,
  Address:Address,
  Street:Street,
userID:generatedID,
HusbandName:HusbandName,
  email:email,
  password:password,
  nationality:indian,
  partnerName:partnerName,
  phoneNumber:phoneNumber

  
  })

      } else {
        // Email is not verified
        console.log('Email is not verified');
      }
    } else {
      // No user is signed in
      console.log('No user signed in');
    }
  });
  
  // Clean up the listener when the component unmounts
  unsubscribe();
},[])
  // useEffect(() => {
  //   console.log('svsv');
  // console.log('2',maritalStatus)
  //   // Check for non-empty fields and update error state
  //   if (wrongpassword == true) {
  //     setError(true);
  //   }
  // }, [error, userName, phoneNumber, password, confirmPassword,wrongpassword]); // Include all relevant dependencies
  

  
  const main = '#197739';
  
  

  const sendEmailVerification = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        await user.sendEmailVerification();
        console.log('Email verification sent');
      } catch (error) {
        console.error('Error sending email verification:', error);
      }
    } else {
      console.error('No user found');
    }
  };
  const signupHandler = async() => {
 
    if (password != confirmPassword ){
      setwrongpassword(true)
      setError(true)
    }

    if (userName === '' || userName) {
      setIsUsernameEmpty(true)
        setError(true)
    } if (phoneNumber === '') {
      setisphoneNumberempty(true)
        setError(true)
    }if (password === '' || password.length < 6) {
      setIsPasswordEmpty(true);
      setError(true);
  }
  if (confirmPassword === '') {
        setIsConfirmPasswordEmpty(true)
        setError(true)
    }

      if (error == false && (password === confirmPassword)) {
        setLoading(true);
        setwrongpassword(false);

        await AsyncStorage.setItem('userName', userName);
        console.log('agf');

        try {
            await auth().createUserWithEmailAndPassword(userName, password);
            await sendEmailVerification();
            console.log('account registered');
            setLoading(false);

            navigation.navigate('imagepickerpage', {
                surname: surname,
                name: name,
                fatherName: fatherName,
                motherName: motherName,
                grandFatherName: grandFatherName,
                grandFatherNameNana: grandFatherNameNana,
                gender: gender,
                dob: dob,
                partnerName: partnerName,
                maritalStatus: maritalStatus,
                country: country,
                state: state,
                city: city,
                district: district,
                postalCode: postalCode,
                Address: Address,
                Street: Street,
                userID: generatedID,
                HusbandName: HusbandName,
                email: email,
                password: password,
                nationality: indian,
                partnerName: partnerName,
                phoneNumber: phoneNumber
            });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Sign up Fail','That email address has already been used!');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('That email address is invalid!');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Weak Password');
            } else {
                console.error(error);
            }
            setLoading(false);
        }




    }
    
  
  };


  const generateRandomLetters = (length) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters.charAt(randomIndex);
    }
    return result;
  };
  
  const generateRandomDigits = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };
  
  const generateID = () => {
    const randomLetters = generateRandomLetters(3);
    const fourthLetter = gender === 'male' ? 'M' : 'F';
    const fifthLetter = userName.charAt(0).toUpperCase();
    const sixthLetter = fatherName.charAt(0).toUpperCase();
    const randomDigits = generateRandomDigits(4);
  
    const id = `${randomLetters}${fourthLetter}${fifthLetter}${sixthLetter}${randomDigits}`;
  
    return id;
  };
  
  // Example usage
  const generatedID = generateID();
  console.log('Generated ID:', generatedID);
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Title style={styles.heading}> Account Details </Title>
        <Paragraph style={{marginBottom: 8}}>
          ( All fields with * are mandatory )
        </Paragraph>

        {/* Dropdown menu for Martial status */}

        <CustomTextInput
          setError={setIsUsernameEmpty}
          placeholder="Username should unique eg. name2023@"
          required={true}
          error={isUsernameEmpty}
          value={userName}
          onChange={setUsername}
          label="User Name (must be an email address)"
        />
        <CustomTextInput
          setError={setIsPasswordEmpty}
          required={true}
          error={isPasswordEmpty}
          value={password}
          onChange={setPassword}
          label="Password"
          secureText={true}
        />
        <CustomTextInput
          setError={setIsConfirmPasswordEmpty}
          required={true}
          error={isConfirmPasswordEmpty}
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
          secureText={true}
        />

        {/* Radio buttons for currently living in */}

        <Paragraph style={styles.label}> Currently living in </Paragraph>
        <View style={styles.radio_btn}>
          <Text>India</Text>
          <RadioButton
            color="green"
            value="India"
            status={indian === true ? 'checked' : 'unchecked'}
            onPress={() => setIndian(true)}
          />
          <Text>Abroad</Text>
          <RadioButton
            color="green"
            value="second"
            status={indian === false ? 'checked' : 'unchecked'}
            onPress={() => setIndian(false)}
          />
        </View>
        {indian === false ? (
          <>
            <CustomTextInput
              setError={setIsEmailEmpty}
              required={true}
              error={isEmailEmpty}
              value={email}
              onChange={setEmail}
              label="Email"
            />
          </>
        ) : (
          <>
            <CustomTextInput
              keyboarType="numeric"
              placeholder="Try to use your own number"
              setError={setisphoneNumberempty}
              required={true}
              error={isphoneNumberempty}
              value={phoneNumber}
              onChange={setPhoneNumber}
              label="Phone Number"
            />
          </>
        )}


{/* {wrongpassword && ( */}
  <Text style={{ color: wrongpassword ? 'red' : 'white', marginTop: 4 }}>
 Something wrong in password
  </Text>
{/* )} */}

       {error  ? (
  <Text style={{ color: 'red', marginTop: 4 }}>
    Please fill * mandatory fields
  </Text>
) : null}

<TouchableOpacity
  activeOpacity={0.6}
      style={{
        width: '90%',
        padding: 15,margin:30,
        alignItems: 'center',
        justifyContent: 'center',height:60,
        // position:'absolute',bottom:20,
        backgroundColor: main,
        borderRadius: 25,
        alignSelf: 'center',
      }}
      onPress={signupHandler}
    >
         {Loading ? (
              <ActivityIndicator
                size="small"
                color="white"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
      <Text style={styles.Login}>Next</Text>
      )}
    </TouchableOpacity>
  
      </View>
{/* <View>
<Modal
        isVisible={RideTypeModal}
        onBackdropPress={RideTypeSelector}
        backdropColor="rgba(0, 0, 0, 0.5)" // Transparent black background color
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={{ backgroundColor: 'white', paddingHorizontal: 20,borderRadius:8 ,paddingVertical:20}}>
        
        <TouchableOpacity 
          onPress={()=>RideTypeSelector}
          style={{borderRadius:25,width:25,height:25,backgroundColor:"red",alignItems:"center",justifyContent:"center",alignSelf:"flex-end"}}>
          <MaterialIcons name="close" size={18} color={'black'} />

          </TouchableOpacity>


    
        </View>
      </Modal>
</View> */}

    </TouchableWithoutFeedback>
  );
});

export default PersonalData3;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight:'bold',
    fontFamily: 'PT Serif Regular',
  fontSize:20
  },
  Login: {
    fontSize: 18,
    fontFamily: 'PT Serif Regular',
    color: 'white',
  },
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
    position:"absolute",bottom:20,
    backgroundColor: '#197739',
  },
  radio_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#197739',
    marginVertical: 8,
  },
});
