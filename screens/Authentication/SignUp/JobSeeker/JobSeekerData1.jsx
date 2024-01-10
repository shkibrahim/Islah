import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import CustomDropDown from '../../../../Components/CustomDropDown';
import CustomTextInput from '../../../../Components/CustomTextInput';

const {height} = Dimensions.get('window');

const JobSeekerData1 = React.memo(({route ,props,navigation}) => {
  const [error, setError] = React.useState(false);
  const [isEducationEmpty, setIsEducationEmpty] = useState(false);
  const [education, setEducation] = useState('');

  // experince dropdown

  const experieceList = [
    'Fresher',
    '1 year',
    '2 year',
    '3 year',
    '4 year',
    'More than 5',
  ];

  // experince

  const [experience, setExperience] = useState(experieceList[0]);
  const [isAboutMeEmpty, setIsAboutMeEmpty] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const [isProfessionEmpty, setIsProfessionEmpty] = useState(false);
  const [profession, setProfession] = useState('');
  const [isSkillsEmpty, setIsSkillsEmpty] = useState(false);
  const [skills, setSkills] = useState('');
  const [isSalaryEmpty, setIsSalaryEmpty] = useState(false);
  const [salary, setSalary] = useState('');
  const [isJoinEmpty, setIsJoinEmpty] = useState(false);
  const [join, setJoin] = useState('');
  const [isLastCompanyEmpty, setIsLastCompanyEmpty] = useState(false);
  const [lastCompanyName, setLastCompanyName] = useState('');

  const onpressHandler = () => {
    setError(false);
      navigation.navigate('home');
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Title style={styles.heading}>Job Seeker</Title>
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
            required={true}
            error={isEducationEmpty}
            value={education}
            onChange={setEducation}
            placeholder="Class 1 -9, SSC, HSC, Graduation, other"
            label="Educational qualification"
          />
          <CustomTextInput
            setError={setIsProfessionEmpty}
            required={true}
            error={isProfessionEmpty}
            value={profession}
            onChange={setProfession}
            label="Profession"
          />
          <CustomTextInput
            setError={setIsSkillsEmpty}
            placeholder="eg. Dart,Javascript,Typescript"
            required={true}
            error={isSkillsEmpty}
            value={skills}
            onChange={setSkills}
            label="Skills"
          />
          <CustomTextInput
            setError={setIsSalaryEmpty}
            keyboarType="numeric"
            required={true}
            error={isSalaryEmpty}
            value={salary}
            onChange={setSalary}
            label="Salary expectation"
          />
          <CustomTextInput
            setError={setIsJoinEmpty}
            required={true}
            error={isJoinEmpty}
            value={join}
            onChange={setJoin}
            label="Joining Details"
            placeholder="Immediately or 15 Days etc."
          />

          <CustomDropDown
            options={experieceList}
            selectedOption={experience}
            setSelectedOption={setExperience}
          />
          {experience !== 'Fresher' ? (
            <CustomTextInput
              placeholder="Company Name and your role in company"
              setError={setIsLastCompanyEmpty}
              required={true}
              error={isLastCompanyEmpty}
              value={lastCompanyName}
              onChange={setLastCompanyName}
              label="Last company name details"
            />
          ) : null}
          {error ? (
            <Text style={{color: 'red', marginTop: 4}}>
              All fields with * are mandatory
            </Text>
          ) : null}
          <Button
            mode="contained"
            style={styles.button}
            onPress={onpressHandler}>
            Next
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
});

export default JobSeekerData1;

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
