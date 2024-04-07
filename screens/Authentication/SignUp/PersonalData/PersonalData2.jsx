import React, {useEffect} from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Icon, Paragraph, Text, Title} from 'react-native-paper';
import {myTheme} from '../../../../theme';

import CustomDropDown from '../../../../Components/CustomDropDown';
import CustomTextInput from '../../../../Components/CustomTextInput';

const {height} = Dimensions.get('window');

const PersonalData2 = React.memo(({route, props, navigation}) => {
  const {
    surname,
    name,
    fatherName,
    motherName,
    grandFatherName,
    grandFatherNameNana,
    gender,
    dob,
  } = route.params;

  const [addressLine1, setAddressLine1] = React.useState('');
  const [addressLine2, setAddressLine2] = React.useState('');
  const [state, setState] = React.useState('');
  const [isstateEmpty, setIsstateEmpty] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [isCityEmpty, setIsCityEmpty] = React.useState(false);
  const [addressLine3, setAddressLine3] = React.useState('');
  const [isAddressLine1Empty, setIsAddressLine1Empty] = React.useState(false);
  const [isAddressLine2Empty, setIsAddressLine2Empty] = React.useState(false);
  const [isAddressLine3Empty, setIsAddressLine3Empty] = React.useState(false);
  const [ismaritalStatusEmpty, setIsmaritalStatusEmpty] = React.useState(true);
  const [partnerName, setpartnerName] = React.useState('');
  const [HusbandName, setHusbandName] = React.useState('');
  const [isHusbandNameEmpty, setIsHusbandNameEmpty] = React.useState(false);
  const [ispartnerNameEmpty, setIspartnerNameEmpty] = React.useState(false);
  const [maritalStatus, setmaritalStatus] = React.useState('None');

  const [country, setCountry] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [isPostelcodeEmpty, setIsPostelCodeEmpty] = React.useState(false);
  const [isCountryEmpty, setIsCountryEmpty] = React.useState(false);
  const [error, setError] = React.useState(true);
  const maritalOptions = [
    'Marital Status',
    'Married',
    'Unmarried',
    'Widow',
    'Divorced',
  ];

  useEffect(() => {
    console.log(gender);
  
    // Check for non-empty fields and update error state
    if (
      country !== '' &&
      state !== '' &&
      city !== '' &&
      addressLine1 !== '' &&
      postalCode !== '' &&
      (maritalStatus !== 'marital status' || ( maritalStatus === 'widow' && HusbandName !== ''))
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, [error, country, state, city, addressLine1, postalCode, maritalStatus, HusbandName]); // Include all relevant dependencies
  
  const signupHandler = async () => {
    // setError(false);

    if (maritalStatus === 'marital status'){
      // setIsmaritalStatusEmpty(true)
      setError(true)
    }

    if (maritalStatus === 'widow' && HusbandName ===''){
      setIsHusbandNameEmpty(true)
     
      setError(true)
    }
    if (country === '') {
      setIsCountryEmpty(true);
      setError(true);
    }

    if (state === '') {
      setIsstateEmpty(true);
      setError(true);
    }
    if (city === '') {
      setIsCityEmpty(true);
      setError(true);
    }
    if (addressLine1 === '') {
      setIsAddressLine1Empty(true);
      setError(true);
    }

    // if (addressLine2 === '') {
    //   setIsAddressLine2Empty(true);
    //   setError(true);
    // }
    if (postalCode === '') {
      setIsPostelCodeEmpty(true);
      setError(true);
    }

    if (addressLine3 === '') {
      setAddressLine3(true);
      setError(true);
    }
    if (error == false) {
      navigation.navigate('personalData3', {
        surname: surname,
        name: name,
        fatherName: fatherName,
        motherName: motherName,
        grandFatherName: grandFatherName,
        grandFatherNameNana: grandFatherNameNana,
        gender: gender,
        dob: dob,
HusbandName:HusbandName,
        maritalStatus: maritalStatus,
        country: country,
        state: state,
        city: city,
        district: addressLine1,
        postalCode: postalCode,
        Address: addressLine2,
        Street: addressLine3,
        partnerName:partnerName
      });
    }
  };

  const handleCountryChange = text => {
    setCountry(text);
    setIsCountryEmpty(text.trim() === '');
  };

  const handlestateChange = text => {
    setState(text);
    setIsstateEmpty(text.trim() === '');
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Title style={styles.heading}> Personal Details </Title>
          <Paragraph style={{marginBottom: 8}}>
            ( All fields with * are mandatory )
          </Paragraph>

          {/* Dropdown menu for marital status */}

          <CustomDropDown
            options={maritalOptions}
            setSelectedOption={setmaritalStatus}
            selectedOption={maritalStatus}
          />
          {maritalStatus === 'married' ? (
            <CustomTextInput
              setError={setIspartnerNameEmpty}
              required={true}
              error={ispartnerNameEmpty}
              value={partnerName}
              onChange={setpartnerName}
              label="Partner name"
            />
          ) : null}

{maritalStatus === 'widow' ? (
            <CustomTextInput
              setError={setIsHusbandNameEmpty}
              required={true}
              error={isHusbandNameEmpty}
              value={HusbandName}
              onChange={setHusbandName}
              label="Husband name"
            />
          ) : null}
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'row',
              marginVertical: 4,
            }}>
            <View
              style={{
                width: '48%',
                borderWidth: 1,
                borderColor:
                  error && isCountryEmpty ? 'red' : myTheme.colors.primary,
                borderRadius: 8,
                backgroundColor: '#ddd',
              }}>
              <TextInput
                placeholder="Country"
                // mode="outlined"
                value={country}
                style={{
                  color:'black',
                  borderRadius: 8,
                  backgroundColor: '#ddd',
                  paddingHorizontal: 16,
                }}
                // error={isCountryEmpty}
                placeholderTextColor="#666"
                onChangeText={handleCountryChange}
              />
              {/* {country === '' && ( */}
              <View style={styles.star_container}>
                <Icon
                  source="star"
                  size={8}
                  color={isCountryEmpty ? 'red' : '#666'}
                />
              </View>
            </View>
            {/* )} */}

            <View
              style={{
                width: '48%',
                borderWidth: 1,
                borderColor:
                  error && isstateEmpty ? 'red' : myTheme.colors.primary,
                borderRadius: 8,
                backgroundColor: '#ddd',
              }}>
              <TextInput
                // label="State"
                placeholder="State"
                placeholderTextColor="#666"
                // mode="outlined"
                value={state}
                // underlineColor="red"
                style={{
                  borderRadius: 8,
                  backgroundColor: '#ddd',
                  paddingHorizontal: 16,
                  color: 'black',
                }}
                onChangeText={handlestateChange}
              />

              <View style={styles.star_container}>
                <Icon
                  source="star"
                  size={8}
                  color={isstateEmpty ? 'red' : '#666'}
                />
              </View>
            </View>
          </View>

          <CustomTextInput
            setError={setIsCityEmpty}
            required={true}
            error={isCityEmpty}
            value={city}
            onChange={setCity}
            label="City / Village name"
          />
          <CustomTextInput
            setError={setIsAddressLine1Empty}
            required={true}
            error={isAddressLine1Empty}
            value={addressLine1}
            onChange={setAddressLine1}
            label="District / Area name"
          />
          <CustomTextInput
            setError={setIsPostelCodeEmpty}
            keyboarType="numeric"
            required={true}
            error={isPostelcodeEmpty}
            value={postalCode}
            onChange={setPostalCode}
            label="Postal code"
          />
          <CustomTextInput
            setError={setIsAddressLine2Empty}
            required={false}
            error={isAddressLine2Empty}
            value={addressLine2}
            onChange={setAddressLine2}
            label="Room No., Floor No., Building Name, etc."
          />
          <CustomTextInput
            setError={setIsAddressLine3Empty}
            required={false}
            error={isAddressLine3Empty}
            value={addressLine3}
            onChange={setAddressLine3}
            label="Street Name / Chawl Name "
          />
          {error ? (
            <Text style={{color: 'red', marginTop: 4}}>
              Please fill * mandatory fields
            </Text>
          ) : null}
          <Button
            mode="contained"
            style={styles.button}
            onPress={signupHandler}>
            Next
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
});

export default PersonalData2;

const styles = StyleSheet.create({
  container: {
    height: height,
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
  button: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#197739',
  },
  input: {
    width: '98%',
    marginBottom: 4,
    backgroundColor: '#ddd',
    fontFamily: 'Roboto',
    fontSize: 14,
    position: 'relative',
  },
  star_container: {
    position: 'absolute',
    top: '40%',
    right: '8%',
  },
  text_input_container: {
    // width: '50%',

    width: '48%',
    // position: 'relative',
  },
});
