import React from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Button,
  Icon,
  Paragraph,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import CustomDropDown from '../../../../Components/CustomDropDown';
import CustomTextInput from '../../../../Components/CustomTextInput';

const {height} = Dimensions.get('window');

const PersonalData2 = React.memo(({ route ,props,navigation}) => {


  const {
    surname,name,fatherName,motherName,grandFatherName,grandFatherNameNana,gender,dob,
  }=route.params


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
  const [ismaritalStatusEmpty, setIsmaritalStatusEmpty] = React.useState(false);
  const [husbandName, setHusbandName] = React.useState('');
  const [isHusbandNameEmpty, setIsHusbandNameEmpty] = React.useState(false);
  const [maritalStatus, setmaritalStatus] = React.useState('');

  const [country, setCountry] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [isPostelcodeEmpty, setIsPostelCodeEmpty] = React.useState(false);
  const [isCountryEmpty, setIsCountryEmpty] = React.useState(false);
  const [error, setError] = React.useState(false);
  const maritalOptions = [
    'Marital Status',
    'Married',
    'Unmarried',
    'Widow',
    'Divorced',
  ];

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
    navigation.navigate('personalData3', {
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
    district:addressLine1,
    postalCode:postalCode,
    Address:addressLine2,
    Street:addressLine3

    
    })
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
              setError={setIsHusbandNameEmpty}
              required={true}
              error={isHusbandNameEmpty}
              value={husbandName}
              onChange={setHusbandName}
              label="Husband name"
            />
          ) : null}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={styles.text_input_container}>
              <TextInput
                label="Country"
                mode="outlined"
                value={country}
                underlineColor="#000"
                activeOutlineColor="#197739"
                placeholderTextColor="#666"
                textColor="#000"
                onChange={e => {
                  setCountry(e.nativeEvent.text);
                  setError(false);
                }}
                selectionColor="#fff"
                outlineColor="#197739"
                style={styles.input}
                outlineStyle={{borderRadius: 8}}
                cursorColor="green"
              />
              {country === '' && (
                <View style={styles.star_container}>
                  <Icon source="star" size={8} color={error ? 'red' : '#666'} />
                </View>
              )}
            </View>
            <View style={styles.text_input_container}>
              <TextInput
                label="State"
                mode="outlined"
                value={state}
                underlineColor="#000"
                activeOutlineColor="#197739"
                placeholderTextColor="#666"
                textColor="#000"
                onChange={e => {
                  setState(e.nativeEvent.text);
                  setError(false);
                }}
                selectionColor="#fff"
                outlineColor="#197739"
                style={styles.input}
                outlineStyle={{borderRadius: 8}}
                cursorColor="green"
              />
              {state === '' && (
                <View style={styles.star_container}>
                  <Icon source="star" size={8} color={error ? 'red' : '#666'} />
                </View>
              )}
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
    top: '46%',
    right: '8%',
  },
  text_input_container: {
    width: '50%',
    position: 'relative',
  },
});
