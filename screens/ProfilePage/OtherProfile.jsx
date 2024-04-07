import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
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

import {Icon, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {myTheme} from '../../theme';

const UserProfile = ({navigation}) => {
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
  console.log('my category is ',Category)
  const [selectedImage, setselectedImage] = useState(null);
  const [Data, setData] = useState();
  const [user, setuser] = useState();
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
  navigation.navigate('signin')
}
  useEffect(() => {
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
  }, [AllData]);

  const myDatafetch = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
      console.log(storedEmail);
      // console.log('Sara Data', AllData);

      const mydata = await AllData.find(data => data.id === user);
      setData(mydata);

      // console.log('profile data is ', mydata);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };

  const Update = async () => {
    if (ButtonText == 'Update Profile') {
      setButtonText('Save');
      setinputEditable(true);
      alert('Now you can edit Profile');
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
    setProfessionCategory(Data.Profession);
    setAddress(Data.City);
    setName(Data.Name);
    setCategory(Data.Category);
    setGender(Data.Gender);
    setBio(Data.Bio);
    // if (Data[0].Pimage.length>2){
    setselectedImage(Data.Profile);
    console.log('iske andr');

    setAddress(Data.Address);
    setName(Data.Name);
    setGender(Data.Gender);
    setBio(Data.Bio);
    // if (Data[0].Pimage.length>2){
    setselectedImage(Data.Profile);

    setStartLoading(false);
  };

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
            // Profession: ProfessionCategory,
            Address: Address,
            Bio: Bio,
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
    Bio: Bio,
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
                  Bio: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
        setLoading(false);

        alert('Data updated');
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
            Bio: Bio,
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
              Bio: Bio,
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
                  Bio: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
        alert('Data updated');
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
            Bio: Bio,
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
              Bio: Bio,
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
                  Bio: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            setLoading(false);

            console.error('Error updating documents:', error);
          });
        alert('Data updated');
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
            Bio: Bio,
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
              Bio: Bio,
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
                  Bio: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
        alert('Data updated');
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
            Bio: Bio,
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
              Bio: Bio,
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
                  Bio: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
        alert('Data updated');
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
            Bio: Bio,
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
              Bio: Bio,
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
                  Bio: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
        alert('Data updated');
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
            Bio: Bio,
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
              Bio: Bio,
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
                  Bio: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
        alert('Data updated');
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
            Bio: Bio,
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
              Bio: Bio,
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
                  Bio: Bio,
                  // ... (rest of the data)
                });
            });
          })
          .catch(error => {
            console.error('Error updating documents:', error);
          });
        alert('Data updated');
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
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: '#fff',
      }}>
      {StartLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center', marginTop: 350}}
        />
      ) : (
        <View style={styles.container}>

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

          <View
            style={{
              height: 1,
              width: '120%',
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              marginTop: 100,
            }}>
            <Text></Text>
          </View>

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
                width: '40%',
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
                width: '40%',
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
    </View>
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
  role: {
    fontSize: 15,
    color: 'black',
    marginBottom: -17,
  },
  location: {
    fontSize: 14,
    marginBottom: -17,

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
