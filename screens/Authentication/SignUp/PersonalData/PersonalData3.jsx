import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Paragraph, RadioButton, Text, Title} from 'react-native-paper';
import CustomTextInput from '../../../../Components/CustomTextInput';

const PersonalData3 = React.memo(({ route ,props,navigation}) => {
  const {
    surname,name,fatherName,motherName,grandFatherName,grandFatherNameNana,gender,dob,maritalStatus,country,state,city,district,postalCode,Address,Street
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
  const [error, setError] = React.useState(false);

  const signupHandler = () => {
    setError(false);
    // if (name === '') {
    //     setIsnameEmpty(true)
    //     setError(true)
    // } if (fatherName === '') {
    //     setIsFatherNameEmpty(true)
    //     setError(true)
    // } if (grandFatherName === '') {
    //     setIsGrandFatherNameEmpty(true)
    //     setError(true)
    // } if (gender === '') {
    //     setGenderError(true)
    // }

    navigation.navigate('imagepickerpage', {
      surname:surname,
      name:name,
      fatherName:fatherName,
      motherName:motherName,
      grandFatherName:grandFatherName,
      grandFatherNameNana:grandFatherNameNana,
      gender:gender,
      dob:dob,
      
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
    phoneNumber:phoneNumber

    
    })
  
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
          label="User Name"
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
        {error ? (
          <Text style={{color: 'red', marginTop: 4}}>
            Please fill * mandatory fields
          </Text>
        ) : null}
        <Button mode="contained" style={styles.button} onPress={signupHandler}>
          Next
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default PersonalData3;

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
