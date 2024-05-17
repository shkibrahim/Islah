import { StyleSheet, Text, View ,Alert,Image,Button,TouchableOpacity,Dimensions,ScrollView} from 'react-native'
import React, { useState ,useEffect,useRef} from 'react'
import ViewShot from 'react-native-view-shot';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import BackButton from '../../Components/BackButton/BackButton';
const MemberShipCard = ({navigation}) => {
  const [user,setuser] = useState()
const [Front,setFront]= useState(true)
const [Back,setBack] = useState(false)
const [ButtonText,setButtonText] = useState('Save Front Card')
const [Name,setName] = useState('Loading...')
const [ID,setID] = useState('Loading...')
const [FatherName,setFatherName] = useState('Loading...')
const [City,setCity] = useState('')
const [State,setState] = useState('')
const [PostalCode,setPostalCode] = useState('')
const [Address,setAddress] = useState('Loading...')
const [Street,setStreet] = useState('')
const [District,setDistrict] = useState('')
const [Mob,setMob] = useState('Loading...')
const [Gender,setGender] = useState('')
const [Loading,setLoading] = useState()
const [Profile,setProfile] = useState('')
const [StudentData, setStudentData] = useState([]);
const [BusinessData, setBusinessData] = useState([]);
const [IndividualData, setIndividualData] = useState([]);
const [JobSeekerData, setJobSeekerData] = useState([]);
const [AllData, setAllData] = useState([]);
const [Data, setData] = useState();
const { width1 } = Dimensions.get('window');
  const viewShotRef = useRef(null);

    useEffect(() => {
    // getCategory()
    getEmailFromStorage();
    getuserdata()
  }, );

  // useEffect(() => {
  //   // setIsLoading(true);
  //   const funcData = async () => {
  //     try {
  //       await getEmailFromStorage();
  //       await fetchalldata();
  //       // await  funcat();
  //       await myDatafetch();
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   funcData();
  // }, []);
  // useEffect(() => {
  //   // console.log('concating')
  //   // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
  //   funcat();
  // }, [StudentData, BusinessData, IndividualData, JobSeekerData]);
  // useEffect(() => {
  //   // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes

  //   if (AllData) {
  //     myDatafetch();
  //   }
  // }, [AllData]);
  // useEffect(() => {
  //   DataMerging();
   
  //   // }
  // }, [Data]);

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };

  const getuserdata = async () => {
    try {
      const data = await AsyncStorage.getItem('UserData');
      const parsed = JSON.parse(data)
      setData(parsed);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
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
  }
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
        console.log('Concat func ke andr ', concatenatedData);

        // console.log('concatenated data',concatenatedData  )
      }

      // setAllData(concatenatedData.flat()); // flat() to flatten the array of arrays
   
    } catch (error) {
      console.error('Error concatenating data:', error);
    }
  };



  const DataMerging = async () => {
    console.log('Data Merging');
    setName(Data.Name);
    setAddress(Data.Address);
 
   
    setGender(Data.Gender);
    setID(Data.userID)
   


    setAddress(Data.Address);
    setName(Data.Name);
    setGender(Data.Gender);
    setFatherName(Data.FatherName);
  
    setProfile(Data.Profile);
    setPostalCode(Data.PostalCode)
    setCity(Data.City)
    setStreet(Data.Street)
    setState(Data.State)
    setMob(Data.phoneNumber)

    setLoading(false);
  };

  const myDatafetch = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
      console.log(storedEmail);
      console.log('Sara Data', AllData);

      const mydata = await AllData.find(data => data.id === user);
      setData(mydata);

      console.log('profile data is ', mydata);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };

  const captureScreenshotfront = async () => {
    try {
      if (viewShotRef.current) {
        // Capture the screenshot
        const uri = await viewShotRef.current.capture();

        console.log('Screenshot captured:', uri);

        // Save the captured screenshot to the device's storage
        const fileName = 'capturedScreenshot.jpg';
        const filePath = RNFS.DocumentDirectoryPath + '/' + fileName;

        await RNFS.moveFile(uri, filePath);
        console.log('Screenshot saved to:', filePath);

        // Save the image to the mobile gallery
        await CameraRoll.saveAsset(filePath, 'photo');
        console.log('Image saved to gallery');
        Alert.alert('Image Saved to Gallery')
      }
    } catch (error) {
      console.error('Error capturing or saving to gallery:', error);
    }
  };
  const captureScreenshotBack = async () => {
    try {
      if (viewShotRef.current) {
        // Capture the screenshot
        const uri = await viewShotRef.current.capture();

        console.log('Screenshot captured:', uri);

        // Save the captured screenshot to the device's storage
        const fileName = 'capturedScreenshot.jpg';
        const filePath = RNFS.DocumentDirectoryPath + '/' + fileName;

        await RNFS.moveFile(uri, filePath);
        console.log('Screenshot saved to:', filePath);

        // Save the image to the mobile gallery
        await CameraRoll.saveAsset(filePath, 'photo');
        Alert.alert('Image Saved to Gallery')
        console.log('Image saved to gallery');
      }
    } catch (error) {
      console.error('Error capturing or saving to gallery:', error);
    }
  };







  const SelectFront=async()=>{
    setButtonText('Save Front Card')
setFront(true)

setBack(false)
  }

  
  const SelectBack=async()=>{
    setFront(false)
    setBack(true)
    setButtonText('Save Back Card')
      }
  return (
    <SafeAreaView style={{flex:1,height:"100%",}}>
      <BackButton label="Membership Card" />

         {/* <TouchableOpacity 
          onPress={()=>navigation.goBack()}
          style={{borderRadius:25,width:25,height:25,alignItems:"center",justifyContent:"center",alignSelf:"flex-start",margin:10}}>
          <MaterialIcons name="arrow-left" size={25} color={'black'} />

          </TouchableOpacity> */}
      <ScrollView>
    <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginBottom: 12,marginTop:40
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={SelectFront}
          style={styles.selector}>
          <Text style={styles.text}>Front Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={SelectBack}
          style={styles.selector}>
          <Text style={styles.text}>Back Card</Text>
        </TouchableOpacity>
      </View>


{Front && (
         <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1.0 }}>
        {/* Your component content */}

        <View style={{...styles.card,width:'100%',alignSelf:"center",marginTop:150}}>
          <View style={styles.line}>
            <Text style={{color:'#eb5903'}}>F</Text>
          </View>

          <View style={styles.line2}>
          <Text style={{color:'red'}}>F</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center',paddingHorizontal:9,paddingVertical:5,justifyContent:"space-between"}}>
              <Image
          source={require("../../assets/images/logo.png")}
          style={{ height:80,width:80}}
        />

        <Text style={{color:"#1d6b34" ,fontFamily:"Roboto-Bold",fontSize:22}}>ISLAH COMMITTEE</Text>
        <Image
          source={require("../../assets/images/wbc.png")}
          style={{ height:80,width:80}}
        />
          </View>

          <View style={styles.line3}>
          <Text style={{color:'#1d6b34'}}>F</Text>
          </View>
          <View style={styles.line4}>
            <Text style={{color:'#215705'}}>F</Text>
          </View>


<View style={{flexDirection:"row", alignItems:"center",paddingHorizontal:12,paddingVertical:1}}>
<View style={{height:110,width:105,borderRadius:12,borderColor:"#0a4b25",borderWidth:3,overflow:"hidden",alignItems:"center",justifyContent:"center"}}>
<Image source={{ uri: Data?.Profile }} style={{ width: 105, height: 110 }} />
</View>

<View style={{marginLeft:9}}> 

<View style={{flexDirection:"row", alignItems:"center",width:"95%"}}>
<Text style={{...styles.main,}}>{Data?.Name} {Data?.FatherName} {Data?.Surname}</Text>


</View>
  <Text style={styles.main}>ID NO : {Data?.userID}</Text>

  <View style={{flexDirection:"row", alignItems:"center",width:'95%'}}>
  <Text style={styles.sub}>{Data?.FatherName} {Data?.GrandFatherName} {Data?.Surname}</Text>


</View>
  <Text style={styles.sub}>{Data?.City}</Text>
  <View style={{flexDirection:"row",alignItems:"center"}}>
  <Text style={styles.sub}>{Data?.District}</Text>
  <Text style={styles.sub}> - </Text>
  <Text style={styles.sub}>{Data?.PostalCode}</Text>
  </View>
</View>

</View>


  <View style={styles.rounder}>
  
    <Text style={styles.address}>{Data?.Address}  , {Data?.District} - {Data?.PostalCode}. Mob: {Data?.phoneNumber} </Text>
 
  </View>

  <View style={{alignItems:"center",marginLeft:4,marginVertical:5,position:"absolute",bottom:0,right:4}}>
  <Image
          source={require("../../assets/images/sign.png")}
          style={{ height:40,width:60}}
        />
<Text style={{fontFamily:"Roboto-Bold",color:"#1d6b34",fontSize:10}}>Irfan Ismail Qureshi</Text>
<Text style={{fontFamily:"Roboto-Bold",color:"#1d6b34",fontSize:9}}>(Issuing Authority)</Text>
  </View>
</View>
     
        {/* <Image source={{ uri: 'https://example.com/image.jpg' }} style={{ width: 200, height: 200 }} /> */}
        {/* Add other components you want to include in the screenshot */}
      </ViewShot>
      )}


{Back && (
         <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        {/* Your component content */}

        <View style={{...styles.card,width:'100%',alignSelf:"center",marginTop:150,}}>
          <View style={styles.line}>
            <Text style={{color:'#eb5903'}}>F</Text>
          </View>

          <View style={styles.line2}>
          <Text style={{color:'red'}}>F</Text>
          </View>
          <View style={{flexDirection:"row",alignItems:'center',paddingHorizontal:9,paddingVertical:5,justifyContent:"space-between"}}>
              <Image
          source={require("../../assets/images/logo.png")}
          style={{ height:80,width:80}}
        />

        <Text style={{color:"#1d6b34" ,fontFamily:"Roboto-Bold",fontSize:22}}>ISLAH COMMITTEE</Text>
        <Image
          source={require("../../assets/images/wbc.png")}
          style={{ height:80,width:80}}
        />
          </View>

          <View style={styles.line3}>
          <Text style={{color:'#1d6b34'}}></Text>
          </View>
          <View style={styles.line4}>
            <Text style={{color:'#215705'}}></Text>
          </View>

<View style={{backgroundColor:"#fffbd6",height:"100%"}}>
<View style={{width:"80%",alignItems:"center",justifyContent:"center",alignSelf:'center'}}>

<View style={{alignSelf:"center", alignItems:"center", justifyContent:"center", backgroundColor:"#460000", paddingHorizontal:16,paddingVertical:2,borderRadius:18,marginVertical:7}}>
  <Text style={{...styles.main,color:'white',fontSize:12 }}>: VISION :</Text>
</View>
<Text style={{...styles.main,fontSize:10,alignSelf:"center" }}>An Effort to Unite the Community - Unity paves way for Reform…</Text>

<View style={{alignSelf:"center", alignItems:"center", justifyContent:"center", backgroundColor:"#460000", paddingHorizontal:16,paddingVertical:2,borderRadius:18,marginVertical:7}}>
  <Text style={{...styles.main,color:'white',fontSize:12 }}>: MISSION :</Text>
</View>
<View style={{alignSelf:"center",paddingHorizontal:18,width:'100%'}}>
<Text style={{...styles.main,fontSize:10, }}>• To provide common platform to explore member's unique 
 qualities and make it evident which can benefit his/her own 
 family and community at large. </Text>
 <Text style={{...styles.main,fontSize:10,}}>• Optimum Realization and Utilization of the resources 
 of the community for the benefit of the community members</Text>
 </View>

</View>
</View>






<View style={{backgroundColor:"#1d6b34",width:'100%', position:"absolute",bottom:0,alignItems:"center", justifyContent:"center", paddingVertical:2}}>
<Text style={{...styles.main,fontSize:10,color:'white'}}>1 - B, Mohammedi House, St. Martin's Road, Bandra West, Mumbai - 400 050.</Text>
</View>
 
</View>
     
        {/* <Image source={{ uri: 'https://example.com/image.jpg' }} style={{ width: 200, height: 200 }} /> */}
        {/* Add other components you want to include in the screenshot */}
      </ViewShot>
      )}


<TouchableOpacity
       
        activeOpacity={0.6}
        style={styles.create_post_btn}
        onPress={Front ? captureScreenshotfront : captureScreenshotBack}
        >
        
          <Text style={{color: 'white', fontSize: 18}}>{ButtonText}</Text>
      
      </TouchableOpacity>
</ScrollView>
    </SafeAreaView>
  )
}

export default MemberShipCard

const styles = StyleSheet.create({
  card:{
    height:300,
    alignSelf:"center",
    overflow:"hidden",
    
  
    backgroundColor:"white"
  },
  create_post_btn: {
    marginTop: 50,
    padding: 14,
    borderRadius: 12,
    width: '70%',marginBottom:30,
    alignSelf: 'center',
    // marginHorizontal: 16,
    
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:"#1d6b34",fontWeight:"bold"
  },
  selector:{
    backgroundColor: 'lightgray',
    borderRadius: 12,
    borderWidth: 1,
    height: 50,
    width: 140,
    borderColor: '#1d6b34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rounder:{borderWidth:2,alignItems:'center',borderColor:'#0a4b25',
borderRadius:6,bottom:0,position:"absolute",
width:"76%",paddingHorizontal:12,marginLeft:-5,paddingVertical:5

  },
  line:{
    backgroundColor:"#eb5903", height:5,width:'100%'
  },
  address:{
    fontFamily:"Roboto-Regular",fontSize:11.6,color:"black",fontWeight:"800"
  }
  ,
  line2:{
    backgroundColor:"red", height:1,width:'100%',marginTop:2
  },
  main:{
    fontFamily:"Roboto-Bold",fontSize:17,fontWeight:"bold",color:"black",
  },
  sub:{
    fontFamily:"Roboto-Regular",fontSize:15,color:"black",
  },
  line3:{
    backgroundColor:"#1d6b34", height:1,width:'100%',marginTop:2
  },
  line4:{
    backgroundColor:"#215705", height:5,width:'100%',marginTop:2
  },
})

