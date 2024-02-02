import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,ActivityIndicator,
  TouchableWithoutFeedback,TouchableOpacity,
  View,
} from 'react-native';
import {Button, Paragraph, RadioButton, Text, Title} from 'react-native-paper';
import CustomTextInput from '../../../../Components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PersonalData3 = React.memo(({ route ,props,navigation}) => {
const [Loading,setLoading] = useState(false)


  const {
    surname,name,fatherName,motherName,grandFatherName,grandFatherNameNana,gender,dob,maritalStatus,country,state,city,district,postalCode,Address,Street,partnerName
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
  

  


  // useEffect(() => {
  //   console.log('svsv');
  // console.log('2',maritalStatus)
  //   // Check for non-empty fields and update error state
  //   if (wrongpassword == true) {
  //     setError(true);
  //   }
  // }, [error, userName, phoneNumber, password, confirmPassword,wrongpassword]); // Include all relevant dependencies
  

  
  const main = '#197739';
  
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
      setLoading(true)
setwrongpassword(false)
      await AsyncStorage.setItem('userName', userName);
console.log('agf')

 await auth()
.createUserWithEmailAndPassword(userName, password)
.then(() => {
  console.log('account registered')
  setLoading(false)
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

  email:email,
  password:password,
  nationality:indian,
  partnerName:partnerName,
  phoneNumber:phoneNumber

  
  })

})
.catch(error => {
  if (error.code === 'auth/email-already-in-use') {
    
    setLoading(false)
   alert('That email address is already in use!');
  }
  if (error.code === 'auth/invalid-email') {
   alert('That email address is invalid!');
   setLoading(false)
  } 

  if (error.code === 'auth/weak-password')
  {
    setLoading(false)
    alert('Weak Password');
  }
  setLoading(false)
  console.error(error);
});




    }
    
  
  };

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
        />
        <CustomTextInput
          setError={setIsConfirmPasswordEmpty}
          required={true}
          error={isConfirmPasswordEmpty}
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
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
