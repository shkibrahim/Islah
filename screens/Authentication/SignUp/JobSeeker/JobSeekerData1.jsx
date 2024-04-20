import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import CustomDropDown from '../../../../Components/CustomDropDown';
import CustomTextInput from '../../../../Components/CustomTextInput';
import firestore from '@react-native-firebase/firestore';
const {height} = Dimensions.get('window');

const JobSeekerData1 = React.memo(({route, props, navigation}) => {
  const [token, settoken] = useState();
  useEffect(() => {
    getdevicetoken();
  }, []);

  const getdevicetoken = async () => {
    try {
      const Token = await AsyncStorage.getItem('Token');
      settoken(Token);
      console.log('my token is', Token);
    } catch (error) {
      console.error('Error getting category from AsyncStorage:', error);
    }
  };
  const {
    Image,
    surname,
    name,
    userID,
    Status,
    fatherName,
    motherName,
    HusbandName,
    grandFatherName,
    grandFatherNameNana,
    gender,
    dob,
    maritalStatus,
    country,
    state,
    city,
    district,
    postalCode,
    Address,
    Street,
    email,
    password,
    nationality,
    phoneNumber,
    partnerName,
  } = route.params;
  const [error, setError] = React.useState(false);
  const [isEducationEmpty, setIsEducationEmpty] = useState(false);
  const [education, setEducation] = useState('');
  const [category, setCategory] = useState();
  useEffect(() => {
    const getCategory = async () => {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
      console.log(category)
    };
    getCategory();
  }, []);
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
  const [user, setuser] = useState();

  useEffect(() => {
    getEmailFromStorage();
  }, []);

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };
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
const[Data,setData] = useState({
  Profile: Image,
  Name: name,
  FatherName: fatherName,
  GrandFatherName: grandFatherName,
  MotherName: motherName,
  Nana: grandFatherNameNana,
  Gender: gender,
  Dob: dob,
  MaritalStatus: maritalStatus,
  HusbandName:HusbandName,
  Country: country,
  State: state,
  surname: surname,
  Token: token,
  City: city,
  District: district,
  Status: Status,
  PostalCode: postalCode,
  Address: Address,
  Street: Street,
  Email: email,
  Nationality: nationality,
  PhoneNumber: phoneNumber,
  PartnerName: partnerName,
  Category: category,
  userID: userID,
  Bio: '',
  AboutMe: aboutMe,
  Education: education,
  Profession: profession,
  Skills: skills,
  Salary: salary,
  Join: join,
  Experience: experience,
  LastCompanyName: lastCompanyName,
})
  const tokenlist = async () => {
    try {
      // await uploadimage1();
      // await uploadimage2();

      // await uploadimage3();
      console.log('data transfering');
      await firestore()
        .collection('Tokens')
        .doc()

        .set({
          Token: token,
        });

      navigation.replace('businessData1');
    } catch (error) {
      // setIsLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  };

  useEffect(() => {
    setError(false);

    // Check for non-empty fields and update error state
    if (
      aboutMe !== '' &&
      education !== '' &&
      profession !== '' &&
      skills !== '' &&
      salary !== '' &&
      join !== '' &&
      lastCompanyName !== ''
    ) {
      console.log('sfgs');
    } else {
      setError(true);
    }
  }, [
    error,
    aboutMe,
    education,
    profession,
    skills,
    salary,
    join,
    lastCompanyName,
  ]); // Include all relevant dependencies

  const onpressHandler = async () => {
    console.log('agr', user);

    if (aboutMe === '') {
      setIsAboutMeEmpty(true);
      setError(true);
    }
    if (education === '') {
      setIsEducationEmpty(true);
      setError(true);
    }
    if (profession === '') {
      setIsProfessionEmpty(true);
      setError(true);
    }
    if (skills === '') {
      setIsSkillsEmpty(true);
      setError(true);
    }
    if (salary === '') {
      setIsSalaryEmpty(true);
      setError(true);
    }
    if (join === '') {
      setIsJoinEmpty(true);
      setError(true);
    }

    if (lastCompanyName === '') {
      setIsLastCompanyEmpty(true);
      setError(true);
    }

    if (error == false) {
      console.log('agf');
      try {
        await firestore()
          .collection('JobSeekerData')
          .doc(user)
          // .collection('EventData')
          // .doc()
          .set({
            Profile: Image,
            Name: name,
            FatherName: fatherName,
            GrandFatherName: grandFatherName,
            MotherName: motherName,
            Nana: grandFatherNameNana,
            Gender: gender,
            Dob: dob,
            MaritalStatus: maritalStatus,
            HusbandName:HusbandName,
            Country: country,
            State: state,
            surname: surname,
            Token: token,
            City: city,
            District: district,
            Status: Status,
            PostalCode: postalCode,
            Address: Address,
            Street: Street,
            Email: email,
            Nationality: nationality,
            PhoneNumber: phoneNumber,
            PartnerName: partnerName,
            Category: category,
            userID: userID,
            Bio: '',
            AboutMe: aboutMe,
            Education: education,
            Profession: profession,
            Skills: skills,
            Salary: salary,
            Join: join,
            Experience: experience,
            LastCompanyName: lastCompanyName,

            // ... (rest of the data)
          });
        await tokenlist();
        const jsonData = JSON.stringify(Data);
        await AsyncStorage.setItem('UserData', jsonData);
        // setIsLoading(false);
        // alert('Product Added Successfully');
        navigation.replace('home');
      } catch (error) {
        // setIsLoading(false);
        console.log('Error addinfsf product:', error);
        // Handle any error that might occur during the process
      }
    }
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
            Sign Up
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
