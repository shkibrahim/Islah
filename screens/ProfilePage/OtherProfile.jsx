import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,Alert,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {Icon, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {myTheme} from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfile = ({navigation}) => {
  const [PostData,setPostData] = useState([])
  // console.log('bla',PostData)


  

  const [Looker,setlooker] = useState(null)
  const [StudentData, setStudentData] = useState([]);
  const [BusinessData, setBusinessData] = useState([]);
  const [IndividualData, setIndividualData] = useState([]);
  const [JobSeekerData, setJobSeekerData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [Name, setName] = useState('');
  const [ProfessionCategory, setProfessionCategory] = useState();
  const [Address, setAddress] = useState('');
  const [Gender, setGender] = useState('');
  const [Bio, setBio] = useState(' My Bio');
  const [Category, setCategory] = useState();
  const [FatherName,setFatherName] = useState()
  const [MotherName,setMotherName] = useState()
  const[Nana,setNana] = useState()
  const[DOB,setDOB] = useState()
  const [Dada,setDada] = useState()
  const[MaritalStatus,setMaritalStatus] = useState()
  const[Country,setCountry] = useState()
  const[State,setState] = useState()
  const[District,setDistrict] = useState()
  const[PostalCode,setPostalCode] = useState()
  const [City,setCity] = useState()
const [Facebook,setFacebook] = useState(null)
const [Instagram,setInstagram] = useState(null)
const [Linkedin,setLinkedin] = useState(null)
const [Twitter,setTwitter]= useState(null)

// Student states

const [Degree,setDegree] = useState()
const [Degreeyear,setDegreeyear] = useState()
const [Achievements,setAchievements] = useState()
const [Ambition,setAmbition] = useState()
const [Board,setBoard] = useState()
const [Medium,setMedium] = useState()
const [SchoolName,setSchoolName] = useState()



// JOBSEEKER STATES
const [LastCompanyInfo,setLastCompanyInfo] = useState()
const [EducationalQualification,setEducationalQualification] = useState()
const [Profession,setProfession] = useState()
const [Skills,setSkills]= useState()
const [SalaryExpectations,setSalaryExpectations] = useState()
const [JoiningDetails,setJoiningDetails] = useState()
const [Experience,setExperience] = useState()


  // console.log('my category is ',Category)
  const [selectedImage, setselectedImage] = useState(null);
  const [Data, setData] = useState();
  const [user, setuser] = useState();
  // console.log('my user',user)
  const [IsLoading, setIsLoading] = useState(true);
  const [inputEditable, setinputEditable] = useState(false);
  const [ButtonText, setButtonText] = useState('Update Profile');
  const [selectedImage1, setSelectedImage1] = useState(
    'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png',
  );
  const [Loading, setLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [StartLoading, setStartLoading] = useState(true);
  const [BtnDisabling, setBtnDisabling] = useState(false);
const [Logoutview,setLogoutview] = useState(false)
const LogoutviewShower =()=>{
  setLogoutview(!Logoutview)
}

const Logout = ()=>{
  AsyncStorage.removeItem('username')
  AsyncStorage.removeItem('UserData')

  navigation.navigate('signin')
}
  useEffect(() => {
    getpostdata()
    // getCategory()
    getEmailFromStorage();
    checklooker();
  }, [StudentData, BusinessData, JobSeekerData, IndividualData]);
  const checklooker =async()=>{
    try {
      const look = await AsyncStorage.getItem('Looker');
      setlooker(look);
    } catch (error) {
      console.error('Error getting looker from AsyncStorage:', error);
    }
  }
  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);

      console.log('user name is',storedEmail)
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };


  const getpostdata = async()=>{
    console.log('posts data coming');
    try {
      const querySnapshot = await firestore().collectionGroup('Posts').get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setIsLoading(false);
const mypost =  await data?.find(data => data?.Userid === user);
console.log('my posts are',mypost)

if (mypost!=undefined){
  setPostData([mypost])

}
        // setPostData(data);
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  // console.log('USER KA DATA', Data);
  const funcat = async () => {
    console.log('concatting starts');
    try {
      const concatenatedData = await StudentData.concat(
        IndividualData,
        BusinessData,
        JobSeekerData,
      );
      setAllData(concatenatedData);
      if (concatenatedData.length > 0) {
        // console.log('Concat func ke andr ', concatenatedData);

        // console.log('concatenated data',concatenatedData  )
      }

      // setAllData(concatenatedData.flat()); // flat() to flatten the array of arrays
      setIsLoading(false);
    } catch (error) {
      console.error('Error concatenating data:', error);
    }
  };

  const fetchalldata = async () => {
    console.log('student');
    try {
      const studentQuerySnapshot = await firestore()
        .collection('StudentData')
        .get();

      const datastudent = studentQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (datastudent && Array.isArray(datastudent)) {
        setStudentData(datastudent);
      } else {
        console.log('No student documents found.');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }

    console.log('business');
    try {
      const businessQuerySnapshot = await firestore()
        .collection('BusinessPerson')
        .get();

      const databusiness = businessQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (databusiness && Array.isArray(databusiness)) {
        setBusinessData(databusiness);
        // console.log('my business data is ', databusiness);
      } else {
        console.log('No business documents found.');
      }
    } catch (error) {
      console.error('Error fetching business data:', error);
    }

    console.log('individual');
    try {
      const individualQuerySnapshot = await firestore()
        .collection('OtherData')
        .get();

      const dataindividual = individualQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (dataindividual && Array.isArray(dataindividual)) {
        setIndividualData(dataindividual);
      } else {
        console.log('No individual documents found.');
      }
    } catch (error) {
      console.error('Error fetching individual data:', error);
    }

    console.log('jobseeker');
    try {
      const jobseekerQuerySnapshot = await firestore()
        .collection('JobSeekerData')
        .get();

      const datajobseeker = jobseekerQuerySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (datajobseeker && Array.isArray(datajobseeker)) {
        setJobSeekerData(datajobseeker);
      } else {
        console.log('No jobseeker documents found.');
      }
    } catch (error) {
      console.error('Error fetching jobseeker data:', error);
    }

    // Wait for all asynchronous operations to complete
    // await funcat()
  };

  useEffect(() => {
    // console.log('concating')
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
    funcat();
  }, [StudentData, BusinessData, IndividualData, JobSeekerData]);

  useEffect(() => {
    setIsLoading(true);
    const funcData = async () => {
      try {
        await getEmailFromStorage();
        await fetchalldata();
        // await  funcat();
        await myDatafetch();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    funcData();
  }, []);

  useEffect(() => {
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes

    if (AllData) {
      myDatafetch();
    }
  }, [AllData,StudentData,]);

  const myDatafetch = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
      console.log(storedEmail);
      // console.log('Sara Data', AllData);
const data =await AsyncStorage.getItem('UserData')
setStartLoading(false)
console.log('user data iv',data)
const newdata= JSON.parse(data)
      // const mydata = await AllData.find(data => data.id === user);
      setData(newdata);



      setFatherName(newdata.FatherName)
      setMotherName(newdata.MotherName)
      setDada(newdata.GrandFatherName)
      setNana(newdata.Nana)
      setGender(newdata.Gender)
      setDOB(newdata.Dob)
      setMaritalStatus(newdata.MaritalStatus)
      setAddress(newdata.Address)
      setDistrict(newdata.District)
      setCity(newdata.City)
      setState(newdata.State)
      setCountry(newdata.Country)
      setPostalCode(newdata.PostalCode)
      setBio(newdata?.AboutMe)
      setFacebook(newdata?.Facebook)
      setInstagram(newdata?.Instagram)
      setLinkedin(newdata?.Linkedin)
      setTwitter(newdata?.Twitter)
      if (newdata.Category =='student'){

        setSchoolName(newdata.SchoolName)
        setDegree(newdata.Degree)
        setDegreeyear(newdata.Degreeyear)
        setBoard(newdata.Board)
        setMedium(newdata.Medium)
        setAchievements(newdata.Achievement)
        setAmbition(newdata.Ambition)
      }

      if (newdata.Category =='other'){

        setSchoolName(newdata.SchoolName)
        setDegree(newdata.Degree)
        setDegreeyear(newdata.Degreeyear)
        setBoard(newdata.Board)
        setMedium(newdata.Medium)
        setAchievements(newdata.Achievement)
        setAmbition(newdata.Ambition)
      }

      if (newdata.Category =='jobseeker'){

        setEducationalQualification(newdata.Education)
        setProfession(newdata.Profession)
        setSkills(newdata.Skills)
        setSalaryExpectations(newdata.Salary)
        setJoiningDetails(newdata.Join)
        setExperience(newdata.Experience)
        setLastCompanyInfo(newdata.LastCompanyName)
      }
      // console.log('profile data is ', mydata);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };

  const Update = async () => {
    if (ButtonText == 'Update Profile') {
      setButtonText('Save');
      setinputEditable(true);
      Alert.alert('Now you can edit Profile');
    }

    if (ButtonText == 'Save') {
      setLoading(true);
      setinputEditable(false);
      // await ImageUpload()
      await DataUpdate();

      setButtonText('Update Profile');

      setBtnDisabling(false);

      // alert('Now you can edit Profile')
    }
  };

  const ImageUpload = async () => {
    const reference = storage().ref(selectedImage1.assets[0].fileName);
    const pathToFile = selectedImage;

    await reference.putFile(pathToFile);

    const url = await storage()
      .ref(selectedImage1.assets[0].fileName)
      .getDownloadURL();
    setSelectedImageUrl(url);
  };

  // const getCategory = async () => {
  //   try {
  //     await AsyncStorage.setItem('category', Category);
  //   } catch (error) {
  //     console.error('Error getting category from AsyncStorage:', error);
  //   }
  // };

  const ProfilePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        setselectedImage(response.assets[0].uri);
        setSelectedImage1(response);
      }
    });
  };

  useEffect(() => {
    DataMerging();
    // getCategory();
    // }
  }, [Data]);

  const DataMerging = async () => {
    console.log('Data Merging');
    setProfessionCategory(Data?.Profession);
    setAddress(Data?.City);
    setName(Data?.Name);
    setCategory(Data?.Category);
    setGender(Data?.Gender);
    // if (Data[0].Pimage.length>2){
    setselectedImage(Data?.Profile);
    console.log('iske andr');

    // setAddress(Data.Address);
    setName(Data?.Name);
    setGender(Data?.Gender);
    setBio(Data?.Bio);
    // if (Data[0].Pimage.length>2){
    // setselectedImage(Data?.Profile);

    // setStartLoading(false);
  };


  const[UpdatedData,setUpdatedData] = useState({
    Name: Name,
    FatherName: FatherName,
    GrandFatherName: Dada,
    MotherName: MotherName,
    Nana: Nana,
    Gender: Gender,
    DOB: DOB,
    MaritalStatus: MaritalStatus,
    Country: Country,
    State: State,
    City: City,
    District: District,
    PostalCode: PostalCode,
    Address: Address,
    Category: Category,
    AboutMe: Bio,
    Facebook:Facebook,
    Instagram:Instagram,
    Linkedin:Linkedin,
    Twitter:Twitter,

  })

  const DataUpdate = async () => {
    console.log('data fetching starts ');

    setBtnDisabling(true);
    if (Category === 'business' && selectedImage != Data.Profile) {


      try {
        const reference = storage().ref(selectedImage1.assets[0].fileName);
        const pathToFile = selectedImage;

        await reference.putFile(pathToFile);

        const url = await storage()
          .ref(selectedImage1.assets[0].fileName)
          .getDownloadURL();
        setSelectedImageUrl(url);

        await AsyncStorage.setItem('Profile', url);
        await AsyncStorage.setItem('Name', Name);
        await firestore()
          .collection('BusinessPerson')
          .doc(user)

          .update({
            Name: Name,
            Profile: url,
            Address: Address,
            AboutMe: Bio,
            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,

            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,


            // ... (rest of the data)
          });
if (Looker!== null){
  await firestore()
  .collection('Matrimonial')
  .doc(user)

  .update({
    Name: Name,

    Profile: url,
    Profession: ProfessionCategory,
    Address: Address,
    AboutMe: Bio,
    FatherName: FatherName,
    GrandFatherName: Dada,
    MotherName: MotherName,
    Nana: Nana,
    Gender: Gender,
    Dob: DOB,
    MaritalStatus: MaritalStatus,
    Country: Country,
    State: State,
    City: City,
    District: District,
    PostalCode: PostalCode,
    Address: Address,
    Facebook:Facebook,
    Instagram:Instagram,
    Linkedin:Linkedin,
    Twitter:Twitter,

    // ... (rest of the data)
  });
}
       

        await firestore()
          .collection('BusinessPerson')
          .doc(user)
          .collection('Posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              firestore()
                .collection('BusinessPerson')
                .doc(user)
                .collection('Posts')
                .doc(doc.id)
                .update({
                  Name: Name,
                  Profile: url,
                  Profession: ProfessionCategory,
                  Address: Address,
                  AboutMe: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
        setLoading(false);




        // async function
        const jsonData = JSON.stringify(UpdatedData);
        await AsyncStorage.setItem('UserData', jsonData);
        Alert.alert('Data updated');
     
     
     
      } catch (error) {
        setLoading(false);

        console.error('Error updating data:', error);
      }
    }

    if (Category === 'business' && selectedImage === Data.Profile) {
      setLoading(true);
      try {
     

        await AsyncStorage.setItem('Name', Name);
        await firestore()
          .collection('BusinessPerson')
          .doc(user)

          .update({
            Name: Name,

            // Profession: ProfessionCategory,
            Address: Address,
            AboutMe: Bio,
            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,
            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,
            // ... (rest of the data)
          });
          if (Looker!== null){
            await firestore()
            .collection('Matrimonial')
            .doc(user)
          
            .update({
              Name: Name,
          
            
              Profession: ProfessionCategory,
              Address: Address,
              AboutMe: Bio,
              FatherName: FatherName,
              GrandFatherName: Dada,
              MotherName: MotherName,
              Nana: Nana,
              Gender: Gender,
              Dob: DOB,
              MaritalStatus: MaritalStatus,
              Country: Country,
              State: State,
              City: City,
              District: District,
              PostalCode: PostalCode,
              Address: Address,
              Facebook:Facebook,
              Instagram:Instagram,
              Linkedin:Linkedin,
              Twitter:Twitter,
              // ... (rest of the data)
            });
          }
        await firestore()
          .collection('BusinessPerson')
          .doc(user)
          .collection('Posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              firestore()
                .collection('BusinessPerson')
                .doc(user)
                .collection('Posts')
                .doc(doc.id)
                .update({
                  Name: Name,
                  // Profile: url,
                  Profession: ProfessionCategory,
                  Address: Address,
                  AboutMe: Bio,
             
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
          const jsonData = JSON.stringify(UpdatedData);
          await AsyncStorage.setItem('UserData', jsonData);
        Alert.alert('Data updated');
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Error updating data:', error);
      }
    }

    if (Category == 'jobseeker' && selectedImage != Data.Profile) {
      try {
        const reference = storage().ref(selectedImage1.assets[0].fileName);
        const pathToFile = selectedImage;

        await reference.putFile(pathToFile);

        const url = await storage()
          .ref(selectedImage1.assets[0].fileName)
          .getDownloadURL();
        setSelectedImageUrl(url);
        await AsyncStorage.setItem('Name', Name);
        await AsyncStorage.setItem('Profile', url);
        await firestore()
          .collection('JobSeekerData')
          .doc(user)

          .update({
            Name: Name,

            Profile: url,
            Profession: ProfessionCategory,
            Address: Address,
            AboutMe: Bio,

            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,
            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,

            Education: EducationalQualification,
            Profession: Profession,
            Skills: Skills,
            Salary: Salary,
            Join: JoiningDetails,
            Experience: Experience,
            LastCompanyName: LastCompanyInfo,
            // ... (rest of the data)
          });

          if (Looker!==null){
            await firestore()
            .collection('Matrimonial')
            .doc(user)
          
            .update({
              Name: Name,
          
              Profile: url,
              Profession: ProfessionCategory,
              Address: Address,
              AboutMe: Bio,
              FatherName: FatherName,
              GrandFatherName: Dada,
              MotherName: MotherName,
              Nana: Nana,
              Gender: Gender,
              Dob: DOB,
              MaritalStatus: MaritalStatus,
              Country: Country,
              State: State,
              City: City,
              District: District,
              PostalCode: PostalCode,
              Address: Address,
              Facebook:Facebook,
              Instagram:Instagram,
              Linkedin:Linkedin,
              Twitter:Twitter,
  
              Education: EducationalQualification,
              Profession: Profession,
              Skills: Skills,
              Salary: Salary,
              Join: JoiningDetails,
              Experience: Experience,
              LastCompanyName: LastCompanyInfo,
              // ... (rest of the data)
            });
          }
        await firestore()
          .collection('JobSeekerData')
          .doc(user)
          .collection('Posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              firestore()
                .collection('JobSeekerData')
                .doc(user)
                .collection('Posts')
                .doc(doc.id)
                .update({
                  Name: Name,
                  Profile: url,
                  Profession: ProfessionCategory,
                  Address: Address,
                  AboutMe: Bio,
                
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            setLoading(false);

            console.error('Error updating documents:', error);
          });
          const jsonData = JSON.stringify(UpdatedData);
          await AsyncStorage.setItem('UserData', jsonData);
        Alert.alert('Data updated');
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Error updating data:', error);
      }
    }

    if (Category == 'jobseeker' && selectedImage == Data.Profile) {
      try {
        // const reference = storage().ref(selectedImage1.assets[0].fileName);
        // const pathToFile = selectedImage;

        // await reference.putFile(pathToFile);

        // const url = await storage()
        //   .ref(selectedImage1.assets[0].fileName)
        //   .getDownloadURL();
        await AsyncStorage.setItem('Name', Name);
        // setSelectedImageUrl(url);
        await firestore()
          .collection('JobSeekerData')
          .doc(user)

          .update({
            Name: Name,

            Profession: ProfessionCategory,
            Address: Address,
            AboutMe: Bio,
            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,
            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,

            Education: EducationalQualification,
            Profession: Profession,
            Skills: Skills,
            Salary: Salary,
            Join: JoiningDetails,
            Experience: Experience,
            LastCompanyName: LastCompanyInfo,
            // ... (rest of the data)
          });

          if (Looker !==null){
            await firestore()
            .collection('Matrimonial')
            .doc(user)
          
            .update({
              Name: Name,
          
             
              Profession: ProfessionCategory,
              Address: Address,
              AboutMe: Bio,
              FatherName: FatherName,
              GrandFatherName: Dada,
              MotherName: MotherName,
              Nana: Nana,
              Gender: Gender,
              Dob: DOB,
              MaritalStatus: MaritalStatus,
              Country: Country,
              State: State,
              City: City,
              District: District,
              PostalCode: PostalCode,
              Address: Address,
              Facebook:Facebook,
              Instagram:Instagram,
              Linkedin:Linkedin,
              Twitter:Twitter,
  
              Education: EducationalQualification,
              Profession: Profession,
              Skills: Skills,
              Salary: Salary,
              Join: JoiningDetails,
              Experience: Experience,
              LastCompanyName: LastCompanyInfo,
              // ... (rest of the data)
            });
          }
        await firestore()
          .collection('JobSeekerData')
          .doc(user)
          .collection('Posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              firestore()
                .collection('JobSeekerData')
                .doc(user)
                .collection('Posts')
                .doc(doc.id)
                .update({
                  Name: Name,
                  // Profile: url,
                  Profession: ProfessionCategory,
                  Address: Address,
                  AboutMe: Bio,
                 
      
      
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
          const jsonData = JSON.stringify(UpdatedData);
          await AsyncStorage.setItem('UserData', jsonData);
        Alert.alert('Data updated');
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Error updating data:', error);
      }
    }

    if (Category == 'student' && selectedImage != Data.Profile) {
      try {
        const reference = storage().ref(selectedImage1.assets[0].fileName);
        const pathToFile = selectedImage;

        await reference.putFile(pathToFile);

        const url = await storage()
          .ref(selectedImage1.assets[0].fileName)
          .getDownloadURL();
        setSelectedImageUrl(url);
        await AsyncStorage.setItem('Profile', url);
        await AsyncStorage.setItem('Name', Name);

        await firestore()
          .collection('StudentData')
          .doc(user)

          .update({
            Name: Name,

            Profile: url,
            Profession: ProfessionCategory,
            Address: Address,
            AboutMe: Bio,

            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,
            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,
            
Degree:Degree,
Degreeyear:Degreeyear,
Board:Board,
Medium:Medium,
SchoolName:SchoolName,
Ambition:Ambition,
Achievement:Achievements,


            // ... (rest of the data)
          });
          if (Looker!==null){
            await firestore()
            .collection('Matrimonial')
            .doc(user)
          
            .update({
              Name: Name,
          
              Profile: url,
              Profession: ProfessionCategory,
              Address: Address,
              AboutMe: Bio,
              FatherName: FatherName,
              GrandFatherName: Dada,
              MotherName: MotherName,
              Nana: Nana,
              Gender: Gender,
              Dob: DOB,
              MaritalStatus: MaritalStatus,
              Country: Country,
              State: State,
              City: City,
              District: District,
              PostalCode: PostalCode,
              Address: Address,
              Facebook:Facebook,
              Instagram:Instagram,
              Linkedin:Linkedin,
              Twitter:Twitter,
              
  Degree:Degree,
  Degreeyear:Degreeyear,
  Board:Board,
  Medium:Medium,
  SchoolName:SchoolName,
  Ambition:Ambition,
  Achievement:Achievements,
              // ... (rest of the data)
            });
          }

        await firestore()
          .collection('StudentData')
          .doc(user)
          .collection('Posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              firestore()
                .collection('StudentData')
                .doc(user)
                .collection('Posts')
                .doc(doc.id)
                .update({
                  Name: Name,
                  Profile: url,
                  Profession: ProfessionCategory,
                  Address: Address,
                  AboutMe: Bio,
                  FatherName: FatherName,
                  GrandFatherName: Dada,
                  MotherName: MotherName,
                  Nana: Nana,
                  Gender: Gender,
                  Dob: DOB,
                  MaritalStatus: MaritalStatus,
                  Country: Country,
                  State: State,
                  City: City,
                  District: District,
                  PostalCode: PostalCode,
                  Address: Address,
                  Facebook:Facebook,
                  Instagram:Instagram,
                  Linkedin:Linkedin,
                  Twitter:Twitter,
                  
      Degree:Degree,
      Degreeyear:Degreeyear,
      Board:Board,
      Medium:Medium,
      SchoolName:SchoolName,
      Ambition:Ambition,
      Achievement:Achievements,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
          const jsonData = JSON.stringify(UpdatedData);
          await AsyncStorage.setItem('UserData', jsonData);
        Alert.alert('Data updated');
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Error updating data:', error);
      }
    }

    if (Category == 'student' && selectedImage == Data.Profile) {
      try {
        // const reference = storage().ref(selectedImage1.assets[0].fileName);
        // const pathToFile = selectedImage;

        // await reference.putFile(pathToFile);

        // const url = await storage()
        //   .ref(selectedImage1.assets[0].fileName)
        //   .getDownloadURL();
        // setSelectedImageUrl(url);
        await AsyncStorage.setItem('Name', Name);
        await firestore()
          .collection('StudentData')
          .doc(user)

          .update({
            Name: Name,

            Profession: ProfessionCategory,
            Address: Address,
            AboutMe: Bio,
            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,
            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,
            
Degree:Degree,
Degreeyear:Degreeyear,
Board:Board,
Medium:Medium,
SchoolName:SchoolName,
Ambition:Ambition,
Achievement:Achievements,
            // ... (rest of the data)
          });

          if (Looker!==null){
            await firestore()
            .collection('Matrimonial')
            .doc(user)
          
            .update({
              Name: Name,
          
             
              Profession: ProfessionCategory,
              Address: Address,
              AboutMe: Bio,
              FatherName: FatherName,
              GrandFatherName: Dada,
              MotherName: MotherName,
              Nana: Nana,
              Gender: Gender,
              Dob: DOB,
              MaritalStatus: MaritalStatus,
              Country: Country,
              State: State,
              City: City,
              District: District,
              PostalCode: PostalCode,
              Address: Address,
  
              
  Degree:Degree,
  Degreeyear:Degreeyear,
  Board:Board,
  Medium:Medium,
  SchoolName:SchoolName,
  Ambition:Ambition,
  Achievement:Achievements,
              // ... (rest of the data)
            });
          }
        await firestore()
          .collection('StudentData')
          .doc(user)
          .collection('Posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              firestore()
                .collection('StudentData')
                .doc(user)
                .collection('Posts')
                .doc(doc.id)
                .update({
                  Name: Name,
                  // Profile: url,
                  Profession: ProfessionCategory,
                  Address: Address,
                  AboutMe: Bio,
                  
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
          const jsonData = JSON.stringify(UpdatedData);
          await AsyncStorage.setItem('UserData', jsonData);
        Alert.alert('Data updated');
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Error updating data:', error);
      }
    }

    if (Category == 'other' && selectedImage != Data.Profile) {
      try {
        const reference = storage().ref(selectedImage.assets[0].fileName);
        const pathToFile = selectedImage;

        await reference.putFile(pathToFile);

        const url = await storage()
          .ref(selectedImage1.assets[0].fileName)
          .getDownloadURL();
        setSelectedImageUrl(url);
        await AsyncStorage.setItem('Name', Name);
        await AsyncStorage.setItem('Profile', url);
        await firestore()
          .collection('OtherData')
          .doc(user)

          .update({
            Name: Name,

            Profile: url,
            Profession: ProfessionCategory,
            Address: Address,
            AboutMe: Bio,

            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,
            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,
            Education:EducationalQualification,
            SchoolName:SchoolName,
        
            // ... (rest of the data)
          });
          if (Looker!==null){
            await firestore()
            .collection('Matrimonial')
            .doc(user)
          
            .update({
              Name: Name,
          
              Profile: url,
              Profession: ProfessionCategory,
              Address: Address,
              AboutMe: Bio,
              
            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,
            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,
            Education:EducationalQualification,
            SchoolName:SchoolName,
              // ... (rest of the data)
            });
          }

        await firestore()
          .collection('OtherData')
          .doc(user)
          .collection('Posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              firestore()
                .collection('OtherData')
                .doc(user)
                .collection('Posts')
                .doc(doc.id)
                .update({
                  Name: Name,
                  Profile: url,
                  Profession: ProfessionCategory,
                  Address: Address,
                  AboutMe: Bio,
    
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
          const jsonData = JSON.stringify(UpdatedData);
          await AsyncStorage.setItem('UserData', jsonData);
        Alert.alert('Data updated');
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Error updating data:', error);
      }
    }

    if (Category == 'other' && selectedImage == Data.Profile) {
      try {
        //     const reference = storage().ref(selectedImage.assets[0].fileName);
        // const pathToFile = selectedImage;

        // await reference.putFile(pathToFile);

        // const url = await storage()
        //   .ref(selectedImage1.assets[0].fileName)
        //   .getDownloadURL();
        // setSelectedImageUrl(url);
        await AsyncStorage.setItem('Name', Name);
        await firestore()
          .collection('OtherData')
          .doc(user)

          .update({
            Name: Name,

            Profession: ProfessionCategory,
            Address: Address,
            AboutMe: Bio,
            
            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,
            Facebook:Facebook,
            Instagram:Instagram,
            Linkedin:Linkedin,
            Twitter:Twitter,
            Education:EducationalQualification,
            SchoolName:SchoolName,
            // ... (rest of the data)
          });

          if (Looker!== null){
            await firestore()
            .collection('Matrimonial')
            .doc(user)
          
            .update({
              Name: Name,
          
              
              Profession: ProfessionCategory,
              Address: Address,
              AboutMe: Bio,
              
            FatherName: FatherName,
            GrandFatherName: Dada,
            MotherName: MotherName,
            Nana: Nana,
            Gender: Gender,
            Dob: DOB,
            MaritalStatus: MaritalStatus,
            Country: Country,
            State: State,
            City: City,
            District: District,
            PostalCode: PostalCode,
            Address: Address,

            Education:EducationalQualification,
            SchoolName:SchoolName,
              // ... (rest of the data)
            });
          }
        await firestore()
          .collection('OtherData')
          .doc(user)
          .collection('Posts')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              firestore()
                .collection('OtherData')
                .doc(user)
                .collection('Posts')
                .doc(doc.id)
                .update({
                  Name: Name,
                  // Profile: url,
                  Profession: ProfessionCategory,
                  Address: Address,
                  AboutMe: Bio,
                  
            
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
          const jsonData = JSON.stringify(UpdatedData);
          await AsyncStorage.setItem('UserData', jsonData);
        Alert.alert('Data updated');
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Error updating data:', error);
      }
    }
    
  };



  const ShareBtn = async () => {
    Share.share({
      message: `Hey I am using Islah  \n  Profile Name: ${Name}\n Category: ${ProfessionCategory} \n Location: ${Address} \n About me: ${Bio} `,
    })
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log(`Shared via ${result.activityType}`);
          } else {
            console.log('Shared successfully');
          }
        } else if (result.action === Share.dismissedAction) {
          console.log('Share dismissed');
        }
      })
      .catch(error => {
        console.error('Error sharing:', error.message);
      });
  };
  const [selectedItem, setSelectedItem] = useState(null);

  const [RideTypeModal, setRideTypeModal] = useState(false);
  const RideTypeSelector = () => {
setRideTypeModal(!RideTypeModal)
    // setContent(item.Content);
  
  };

  const [Content,setContent] = useState(null)
  const UpdatePost = (item)=>{
    setSelectedItem(item)
console.log('my id is', item.id)
console.log('go for this',item.Content)
setContent(item.Content)
setRideTypeModal(!RideTypeModal);
// Alert.alert('Now you can edit your posts')

  }

  const PostUpdater = async(item)=>{


    if (Category == 'student'){


      try {
        // Reference the specific document in the Posts collection group
        const documentRef = firestore().collection('StudentData') // Main collection name that contains 'Posts'
          .doc(user) // The document ID of the user you want to update
          .collection('Posts') // The 'Posts' subcollection
          .doc(item.id); // The document ID of the specific post you want to update
    
        // Use the update() method to modify the data
        await documentRef.update({
          Content:Content, // Assuming item has a Content property
        });
        console.log('Post data updated successfully.');
      } catch (error) {
        console.error('Error updating post data:', error);
      }
    }
 

    if (Category == 'jobseeker'){


      try {
        // Reference the specific document in the Posts collection group
        const documentRef = firestore().collection('JobSeekerData') // Main collection name that contains 'Posts'
          .doc(user) // The document ID of the user you want to update
          .collection('Posts') // The 'Posts' subcollection
          .doc(item.id); // The document ID of the specific post you want to update
    
        // Use the update() method to modify the data
        await documentRef.update({
          Content:Content, // Assuming item has a Content property
        });
        console.log('Post data updated successfully.');
      } catch (error) {
        console.error('Error updating post data:', error);
      }
    }



    if (Category == 'business'){


      try {
        // Reference the specific document in the Posts collection group
        const documentRef = firestore().collection('BusinessData') // Main collection name that contains 'Posts'
          .doc(user) // The document ID of the user you want to update
          .collection('Posts') // The 'Posts' subcollection
          .doc(item.id); // The document ID of the specific post you want to update
    
        // Use the update() method to modify the data
        await documentRef.update({
          Content:Content, // Assuming item has a Content property
        });
        console.log('Post data updated successfully.');
      } catch (error) {
        console.error('Error updating post data:', error);
      }
    }


    if (Category == 'other'){


      try {
        // Reference the specific document in the Posts collection group
        const documentRef = firestore().collection('OtherData') // Main collection name that contains 'Posts'
          .doc(user) // The document ID of the user you want to update
          .collection('Posts') // The 'Posts' subcollection
          .doc(item.id); // The document ID of the specific post you want to update
    
        // Use the update() method to modify the data
        await documentRef.update({
          Content:Content, // Assuming item has a Content property
        });
        console.log('Post data updated successfully.');
      } catch (error) {
        console.error('Error updating post data:', error);
      }
    }



  }
  const renderItem = ({item,index}) => (
    <View style={{ backgroundColor: '#eee',
    padding: 5,
    margin: 12,borderColor:'black',borderWidth:1,
    borderRadius: 5,}}>

      <TouchableOpacity 
      onPress={()=>UpdatePost(item)}
      style={{alignSelf:"flex-end",borderRadius:30,height:30,width:30,backgroundColor:"white",alignItems:"center",justifyContent:"center"}}>
      <MaterialIcons name="pencil" size={20} color={'green'} />

      </TouchableOpacity>
      <Text style={{color: 'gray', margin: 12, width: '95%'}}>
        POST {index+1}
   </Text>

      <Text style={{color: 'black', margin: 12, width: '95%'}}>
        {' '}
        {item?.Content}
      </Text>

    
    </View>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: '#fff',
      }}>



        <ScrollView>
      {StartLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center', marginTop: 350}}
        />
      ) : (
        <View style={styles.container}>


<Modal
        isVisible={RideTypeModal}
        onBackdropPress={RideTypeSelector}
        backdropColor="rgba(0, 0, 0, 0.5)" // Transparent black background color
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={{backgroundColor: 'white', paddingHorizontal:20,borderRadius:8,paddingVertical:20}}>

          <TouchableOpacity 
          onPress={RideTypeSelector}
          style={{borderRadius:25,width:25,height:25,backgroundColor:"red",alignItems:"center",justifyContent:"center",alignSelf:"flex-end"}}>
          <MaterialIcons name="close" size={18} color={'white'} />

          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 15,
              fontWeight:"bold",marginBottom:5
            }}>
         Content:
          </Text>

          <TextInput
              // editable={inputEditable}
              style={styles.content}
              multiline={true}
              placeholderTextColor="lightgray"
              value={Content}
              // keyboardType="Numeric"
              onChangeText={setContent}

              // secureTextEntry={true}
            />
       


       <TouchableOpacity 
       onPress={()=>PostUpdater(selectedItem)}
       style={{backgroundColor:"green",borderRadius:12,height:50,width:"80%",alignSelf:"center",alignItems:"center",justifyContent:"center",marginTop:45}}>

        <Text style={{color:"white",fontSize:16}}>Update</Text>
       </TouchableOpacity>
        </View>
      </Modal>
<View style={{alignSelf:"flex-end",margin:12,position:"absolute",right:12}}>
<TouchableOpacity 
              onPress={LogoutviewShower}
              style={{}}>
              <MaterialIcons name="dots-vertical" size={28} color={'darkgray'} />
              </TouchableOpacity>
              </View>
          {Logoutview &&    <TouchableOpacity 
          onPress={Logout}
              activeOpacity={0.6}
              style={{paddingHorizontal:(10),paddingVertical:5,position:"absolute",right:42,backgroundColor:"green",alignItems:"center",elevation:5,borderRadius:7,top:40}}>
<Text style={{color:"white",fontFamily:"Montserrat-Regular",fontSize:12}}>
Sign out 
  

  
  </Text>
              </TouchableOpacity>}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
            <Image source={{uri: selectedImage}} style={styles.profileImage} />
            <TouchableOpacity
              disabled={!inputEditable}
              onPress={ProfilePicker}
              activeOpacity={0.7}
              style={{
                borderRadius: 29,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1d6b34',
                position: 'absolute',
                right: 127,
              }}>
              <Text style={{color: 'white', fontSize: 20}}>+</Text>
            </TouchableOpacity>

            <TextInput
              editable={inputEditable}
              style={[styles.fullName, {}]}
              placeholderTextColor="lightgray"
              value={Name}
              // keyboardType="Numeric"
              onChangeText={setName}

              // secureTextEntry={true}
            />
            <TextInput
              editable={inputEditable}
              style={styles.role}
              placeholderTextColor="lightgray"
              value={ProfessionCategory}
              // keyboardType="Numeric"
              onChangeText={setProfessionCategory}
              placeholder="Role"
              // secureTextEntry={true}
            />
            <TextInput
              editable={inputEditable}
              style={styles.location}
              placeholderTextColor="lightgray"
              value={Address}
              // keyboardType="Numeric"
              onChangeText={setAddress}
              placeholder="City"
              // secureTextEntry={true}
            />
            {/* <Text style={styles.qualification}>{qualification}</Text> */}
          </View>
          <Text style={styles.bio_heading}>About Me</Text>
          <TextInput
            editable={inputEditable}
            style={styles.bio}
            placeholderTextColor="grey"
            value={Bio}
            multiline={true}
            maxLength={150}
            // keyboardType="Numeric"
            onChangeText={setBio}
            placeholder=" Your Bio"
            // secureTextEntry={true}
          />

<View style={{flexDirection:"row",alignItems:"center",marginBottom:12}}>
          <Text style={{color:"darkgray",fontSize:16}}>
            Posts: 
          </Text>
          <Text style={{color: "darkgray", fontSize: 16}}>
  {PostData?.length ?? 0}
</Text>

</View>

<Text style={styles.bio_heading}>Recent Posts</Text>

<View>
  {PostData && PostData.length > 0 && PostData !== undefined ? (
    <FlatList
      data={PostData}
      renderItem={renderItem}
      keyExtractor={item => item?.id?.toString()}
    />
  ) : (
    <Text style={{color:'green',alignSelf:"center",marginVertical:30}}>No posts from you yet.</Text>
  )}
</View>


<Text style={styles.bio_heading}>Personal Info</Text>
<View>

  <Text style={{color:"black",marginBottom:5}}>
    Father Name
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={FatherName}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setFatherName}
            placeholder="Father Name"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
    Mother Name
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={MotherName}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setMotherName}
            placeholder="Mother Name"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
   Grand Father Name(Dada)
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Dada}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setDada}
            placeholder=" Grand Father Name(Dada)"
            // secureTextEntry={true}
          />
            <Text style={{color:"black",marginBottom:5}}>
            Grand Father Name(Nana)
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Nana}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setNana}
            placeholder="Grand Father Name(Nana)"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
            Gender
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Gender}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setGender}
            placeholder="Gender"
            // secureTextEntry={true}
          />
                  <Text style={{color:"black",marginBottom:5}}>
       Date of Birth
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={DOB}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setDOB}
            placeholder="Date of Birth"
            // secureTextEntry={true}
          />
                  <Text style={{color:"black",marginBottom:5}}>
            Marital Status
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={MaritalStatus}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setMaritalStatus}
            placeholder="Marital Status"
            // secureTextEntry={true}
          />


<Text style={{color:"black",marginBottom:5}}>
           Facebook
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Facebook}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setFacebook}
            placeholder="Facebook url"
            // secureTextEntry={true}
          />


<Text style={{color:"black",marginBottom:5}}>
           Instagram
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Instagram}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setInstagram}
            placeholder="Instagram url"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
           Twitter
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Twitter}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setTwitter}
            placeholder="Twitter url"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
           Linkedin
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Linkedin}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setLinkedin}
            placeholder="Linkedin url"
            // secureTextEntry={true}
          />
          <Text style={styles.bio_heading}>Location</Text>

<Text style={{color:"black",marginBottom:5}}>
          Address
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Address}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setAddress}
            placeholder="Address"
            // secureTextEntry={true}
          />


<Text style={{color:"black",marginBottom:5}}>
          District
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={District}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setDistrict}
            placeholder="District"
            // secureTextEntry={true}
          />



                  <Text style={{color:"black",marginBottom:5}}>
          City
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={City}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setCity}
            placeholder="City"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
          State
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={State}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setState}
            placeholder="State"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
          Postal Code
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={PostalCode}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setPostalCode}
            placeholder="Postal Code"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
         Country
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Country}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setCountry}
            placeholder="Country"
            // secureTextEntry={true}
          />

{/* <Text style={{color:"red"}}>{Data?.Category}</Text> */}

{Data?.Category == 'student' && 

<View>
<Text style={styles.bio_heading}>Other</Text>

<Text style={{color:"black",marginBottom:5}}>
          School Name
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={SchoolName}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setSchoolName}
            placeholder="  School Name"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
          Degree
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Degree}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setDegree}
            placeholder="Degree"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
          Degree Year
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Degreeyear}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setDegreeyear}
            placeholder="State"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
          Board
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Board}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setBoard}
            placeholder="Board"
            // secureTextEntry={true}
          />


<Text style={{color:"black",marginBottom:5}}>
          Medium
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Medium}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setMedium}
            placeholder="Medium"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
          Achievements
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Achievements}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setAchievements}
            placeholder="Achievements"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
          Ambition
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Ambition}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setAmbition}
            placeholder="Ambition"
            // secureTextEntry={true}
          />


  </View>
}


{Data?.Category == 'jobseeker' && 

<View>
<Text style={styles.bio_heading}>Other</Text>

<Text style={{color:"black",marginBottom:5}}>
         Educational Qualification
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={EducationalQualification}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setEducationalQualification}
            placeholder="Educational Qualification"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
          Profession
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Profession}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setProfession}
            placeholder="Profession"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
         Skills
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Skills}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setSkills}
            placeholder="Skills"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
        Salary Expectation
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={SalaryExpectations}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setSalaryExpectations}
            placeholder="Salary Expectation"
            // secureTextEntry={true}
          />


<Text style={{color:"black",marginBottom:5}}>
          Joining Details
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={JoiningDetails}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setJoiningDetails}
            placeholder="Joining Details"
            // secureTextEntry={true}
          />

<Text style={{color:"black",marginBottom:5}}>
          Experience
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Experience}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setExperience}
            placeholder="Experience"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
          Last Company Info
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={LastCompanyInfo}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setLastCompanyInfo}
            placeholder="Last Company Info"
            // secureTextEntry={true}
          />


  </View>
}


{Data?.Category == 'other' && 

<View>
<Text style={styles.bio_heading}>Other</Text>

<Text style={{color:"black",marginBottom:5}}>
         Educational Qualification
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={EducationalQualification}
            // multiline={true}
            // keyboardType="Numeric"
            onChangeText={setEducationalQualification}
            placeholder="Educational Qualification"
            // secureTextEntry={true}
          />
          <Text style={{color:"black",marginBottom:5}}>
          Profession
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Profession}
            onChangeText={setProfession}
            placeholder="Profession"
          />
         
         <Text style={{color:"black",marginBottom:5}}>
          School/College Name
  </Text>
  <TextInput
            editable={inputEditable}
            style={styles.bio2}
            placeholderTextColor="grey"
            value={Profession}
            onChangeText={setProfession}
            placeholder="Profession"
          />
  </View>
}


  </View>
          {/* <View
            style={{
              height: 1,
              width: '120%',
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              marginTop: 100,
            }}>
            <Text></Text>
          </View> */}

          {/* <View style={styles.statsContainer}>
          <Text>{`Posts: ${postCount}`}</Text>
          <Text>{`Comments: ${commentCount}`}</Text>
        </View> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: 130,
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                borderRadius: 8,
                padding: 16,
                alignItems: 'center',
                width: 150,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#1d6b34',
              }}
              onPress={ShareBtn}
              // Disable the button while loading
            >
              {/* {Loading ? ( */}
              {/* <ActivityIndicator size="small" color="white" style={{ alignSelf: "center" }} /> */}
              {/* ) : ( */}
              <Text style={{color: 'white', fontSize: 17}}>Share Profile</Text>
              {/* )} */}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                borderRadius: 8,
                padding: 16,
                alignItems: 'center',
                width: 150,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#1d6b34',
              }}
              disabled={BtnDisabling}
              onPress={Update}
              // Disable the button while loading
            >
              {Loading ? (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <Text style={{color: 'white', fontSize: 17}}>{ButtonText}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 16,
  },
  fullName: {
    fontSize: 30,
    color: 'green',
    marginBottom: -17,
    fontWeight: 'bold',
    alignSelf: 'center',
  },


  content:{
    borderWidth:0.7,
    borderColor:'green',
    textAlign:'left',
    color:"black",
    borderRadius:5


  },
  role: {
    fontSize: 15,
    color: 'black',
    marginBottom: -17,
  },
  location: {
    fontSize: 14,
    // marginBottom: -17,

    color: 'black',
  },
  qualification: {
    fontSize: 14,
    color: 'black',
  },
  bio_heading: {
    fontSize: 20,
    fontWeight: 'bold',

    color: 'black',
  },
  bio: {
    fontSize: 14,
    marginBottom: 16,
    color: 'black',
  },
  bio2: {
    fontSize: 14,
    borderColor:"gray",borderWidth:1,
    marginBottom: 10,
    color: 'black',
    borderRadius:14,paddingHorizontal:12,paddingVertical:12

  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: 'black',
  },
  postItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 8,
    color: 'black',
  },
  social_icons_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    alignItems: 'center',
  },
});

export default UserProfile;
