import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import CustomTextInput from '../../../../Components/CustomTextInput';

const OtherData = React.memo(({ route ,props,navigation}) => {
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

  const signupHandler = () => {
    setError(false);
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
          Next
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
