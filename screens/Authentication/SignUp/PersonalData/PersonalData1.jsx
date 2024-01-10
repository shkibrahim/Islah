import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import CustomTextInput from '../../../../Components/CustomTextInput';

import DatePicker from 'react-native-date-picker';
import CustomDropDown from '../../../../Components/CustomDropDown';

const {width} = Dimensions.get('window');

const PersonalData = React.memo(({ route ,props,navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [gender, setGender] = useState('');
  const [grandFatherName, setGrandFatherName] = useState('');
  const [grandFatherNameNana, setGrandFatherNameNana] = useState('');
  const [isGrandFatherNameEmpty, setIsGrandFatherNameEmpty] = useState(false);
  const [isGrandFatherNameNanaEmpty, setIsGrandFatherNameNanaEmpty] =
    useState(false);
  const [isFatherNameEmpty, setIsFatherNameEmpty] = useState(false);
  const [isMotherNameEmpty, setIsMotherNameEmpty] = useState(false);
  const [isSurnameEmpty, setIsSurnameEmpty] = useState(false);
  const [isnameEmpty, setIsnameEmpty] = useState(false);
  const [isGenderEmpty, setIsGenderEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  // set the date 1 jan and current year
  const [date, setDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [genderError, setGenderError] = useState(false);
  const [error, setError] = useState(false);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const signupHandler = () => {
    // setError(false)
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
    // else{
    // }

    navigation.navigate('personalData2', {
      surname:surname,
      name:name,
      fatherName:fatherName,
      motherName:motherName,
      grandFatherName:grandFatherName,
      grandFatherNameNana:grandFatherNameNana,
      gender:gender,
      dob:formattedDate
    
    })
      
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Title style={styles.heading}> Personal Details </Title>
        <Paragraph style={{marginBottom: 8}}>
          ( All fields with * are mandatory )
        </Paragraph>
        <CustomTextInput
          setError={setIsnameEmpty}
          required={true}
          error={isnameEmpty}
          value={name}
          onChange={setName}
          label="First name"
        />
        <CustomTextInput
          setError={setIsSurnameEmpty}
          required={false}
          error={isSurnameEmpty}
          value={surname}
          onChange={setSurname}
          label="Surname"
        />
        <CustomTextInput
          setError={setIsFatherNameEmpty}
          required={true}
          error={isFatherNameEmpty}
          value={fatherName}
          onChange={setFatherName}
          label="Father Name"
        />
        <CustomTextInput
          setError={setIsFatherNameEmpty}
          required={false}
          error={isMotherNameEmpty}
          value={motherName}
          onChange={setMotherName}
          label="Mother Name"
        />
        <CustomTextInput
          setError={setIsGrandFatherNameEmpty}
          required={true}
          error={isGrandFatherNameEmpty}
          value={grandFatherName}
          onChange={setGrandFatherName}
          label="Grand Father Name (Dada)"
        />
        <CustomTextInput
          setError={setIsGrandFatherNameNanaEmpty}
          required={false}
          error={isGrandFatherNameNanaEmpty}
          value={grandFatherNameNana}
          onChange={setGrandFatherNameNana}
          label="Grand Father Name (Nana)"
        />
        <View style={styles.b_b_container}>
          {/*  make input for Dob */}
          <TouchableOpacity
            style={{
              width: width / 2.3,
              marginBottom: 4,
              marginTop: 4,
              borderColor: 'green',
            }}
            onPress={() => {
              setOpen(true);
            }}>
            <TextInput
              style={{
                width: '100%',
                marginBottom: 4,
                marginTop: 4,
                borderColor: 'green',
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: '#ddd',
                padding: 12,
                fontSize: 16,
                color: '#444',
                textAlign: 'center',
              }}
              placeholder="Date of Birth"
              value={`DOB :  ${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`}
              editable={false}
            />
          </TouchableOpacity>
          <CustomDropDown
            width={width / 2.3}
            options={['Gender', 'Male', 'Female']}
            selectedOption={gender}
            setSelectedOption={setGender}
          />
        </View>

        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          maximumDate={new Date()}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {genderError ? (
          <Text
            style={{
              width: '100%',
              color: 'red',
            }}>
            {' '}
            Please choose gender
          </Text>
        ) : null}
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

export default PersonalData;

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
  b_b_container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
