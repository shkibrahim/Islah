import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import CustomDropDown from '../../../../Components/CustomDropDown';
import CustomTextInput from '../../../../Components/CustomTextInput';

const StudentData1 = React.memo(({ route ,props,navigation}) => {
  const [error, setError] = React.useState(false);
  const [degree, setDegree] = useState('');
  const [board, setBoard] = useState('');
  const [isBoardEmpty, setIsBoardEmpty] = useState(false);
  const [isDegreeEmpty, setIsDegreeEmpty] = useState(false);
  const [isYearEmpty, setIsYearEmpty] = useState(false);
  const [isSchoolEmpty, setIsSchoolEmpty] = useState(false);
  const [year, setYear] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [medium, setMedium] = useState('');
  const [isMeduiumEmpty, setIsmediumEmpty] = useState(false);
  const [achievement, setAchievement] = useState('');
  const [isAchieveMentEmpty, setisAchieveMentEmpty] = useState(false);
  const [ambition, setAmbition] = useState('');
  const [isAmbitionEmpty, setisAmbitionEmpty] = useState(false);

  const meduims = ['Medium', 'English', 'Urdu', 'Hindi', 'Marathi', 'Other'];

  const signupHandler = () => {
  
    setError(false);
      navigation.navigate('home');
    
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
          error={isAchieveMentEmpty}
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
