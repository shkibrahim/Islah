import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid, StyleSheet,TouchableOpacity, Pressable} from 'react-native';
import {
  Avatar,
  Portal,ActivityIndicator,
  Dialog,
  Text,Button,
  Button as PaperButton,
} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import PushNotification from 'react-native-push-notification';


const ImagePicker = ({ route,navigation }) => {
const [token,settoken] = useState()
useEffect(() => {
  getdevicetoken()
}, []);

const getdevicetoken = async()=>{

  try {
    const Token = await AsyncStorage.getItem('Token');
    settoken(Token);
    console.log('my category is', Token )
  } catch (error) {
    console.error('Error getting category from AsyncStorage:', error);
  }
}
  const [Loading, setLoading] = useState(false);
  const [Loading2, setLoading2] = useState(false);
  const [avatarUri, setAvatarUri] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhmTe4FGFtGAgbIwVBxoD3FmED3E5EE99UGPItI0xnQ&s',
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState('');

  const {
    surname,name,fatherName,motherName,grandFatherName,grandFatherNameNana,gender,dob,maritalStatus,country,state,city,district,postalCode,Address,Street, email,partnerName,password,nationality,phoneNumber
  }=route.params


  const [category, setCategory] = useState('');
  useEffect(() => {
    const getCategory = async () => {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
    };
    getCategory();
  }, [avatarUri]);

  const openImagePicker = sourceType => {
    setSelectedSourceType(sourceType);
    setDialogVisible(true);
  };

  const closeImagePicker = () => {
    setDialogVisible(false);
  };

  const handleImageSelection = async () => {
    try {
      closeImagePicker();
      let response;
      if (selectedSourceType === 'camera') {
        response = await launchCamera({mediaType: 'photo'});
      } else if (selectedSourceType === 'gallery') {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
        };
        response = await launchImageLibrary(options);
      }

      if (response.assets) {
        setAvatarUri(response.assets[0].uri);
        setSelectedImage1(response)
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);

  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const [user,setuser] = useState()
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


  const tokenlist = async()=>{
    try {
      // await uploadimage1();
      // await uploadimage2();

      // await uploadimage3();
      console.log('data transfering');
      await firestore()
          .collection('Tokens')
          .doc()
        
        .set({
         
          Token:token,
      
    

        
        });

      
      navigation.replace('businessData1');
    } catch (error) {
      // setIsLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  }
  const fetchdata = async () => {
    try {
      // await uploadimage1();
      // await uploadimage2();

      // await uploadimage3();
      console.log('data transfering');
      await firestore()
          .collection('BusinessPerson')
          .doc(user)
          // .collection('Businesses')
          // .doc()
        .set({
          // Profile: Pimage,
          // Name: name,
          // FatherName: fatherName,
          // GrandFatherName: grandFatherName,
          // MotherName: motherName,
          // Nana:grandFatherNameNana,
          // Surname:surname,
          // Gender :gender,
          // Dob: dob,
          // MaritalStatus: maritalStatus,
          // Country: country,
          // State: state,
          // City: city,
          // District: district,
          // PostalCode: postalCode,
          // Address: Address,
          // Street: Street,
          // Email: email,
          // Nationality: nationality,
          // PhoneNumber: phoneNumber,
          // PartnerName: partnerName,

          Surname: surname,
          Name: name,
          FatherName: fatherName,
          MotherName: motherName,
          GrandFatherName: grandFatherName,
          GrandFatherNameNana: grandFatherNameNana,
          Gender: gender,
          Dob: dob,
          PartnerName: partnerName,
          MaritalStatus: maritalStatus,
          Country: country,
          State: state,
          City: city,
          District: district,
          PostalCode: postalCode,
          Address: Address,
          Street: Street,
          Profile: selectedImageUrl,
          email: email,
          Token:token,
          nationality: nationality,
          partnerName: partnerName,
          phoneNumber: phoneNumber,
Category:category,
Bio:''
          // BusinessName: BusinessName,
          // BusinessCatergory: BusinessCatergory,
          // BusinessDescription: BusinessDescription,
          // BusinesContact: BusinesContact,
          // BusinessEducation: BusinessEducation,
          // WorkingFrom: WorkingFrom,
          // WorkingTo: WorkingTo,

    

          // ... (rest of the data)
        });

      // setIsLoading(false);
      // alert('Product Added Successfully');
      navigation.replace('businessData1');
    } catch (error) {
      // setIsLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  };
  const uploadtofbStorage = async () => {
    setLoading2(true)
    const reference = storage().ref(selectedImage1.assets[0].fileName);
    const pathToFile = avatarUri;
    
    await reference.putFile(pathToFile);
    
    // Get the download URL using getDownloadURL() method
    const url = await reference.getDownloadURL();
    setSelectedImageUrl(url);
    setLoading2(false)
  };

  
  

  const onpressHandler =  async() => {
    
if (avatarUri == 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhmTe4FGFtGAgbIwVBxoD3FmED3E5EE99UGPItI0xnQ&s' ){
  alert('Select an Image')
}


if (avatarUri !== 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhmTe4FGFtGAgbIwVBxoD3FmED3E5EE99UGPItI0xnQ&s'){
  console.log('daal diya')

  // await uploadtofbStorage()
}


if (
  selectedImageUrl == ''
)
{
  alert('Please save Image first ')
}

    if (category === 'student' &&  avatarUri !== 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhmTe4FGFtGAgbIwVBxoD3FmED3E5EE99UGPItI0xnQ&s'
     && selectedImageUrl!='') {
      setLoading(true)

     await AsyncStorage.setItem('Profile', selectedImageUrl);
      navigation.navigate('studentData1', {
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
      district:district,
      postalCode:postalCode,
      Address:Address,
      Street:Street,
  
      email:email,
      password:password,
      nationality:nationality,
      phoneNumber:phoneNumber
  ,Image:selectedImageUrl,
  partnerName:partnerName
      
      })


    


        // navigation.navigate('studentData1');
    }
    if (category === 'business'  &&  avatarUri !== 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhmTe4FGFtGAgbIwVBxoD3FmED3E5EE99UGPItI0xnQ&s' 
    && selectedImageUrl!='') {
     await  AsyncStorage.setItem('Profile', selectedImageUrl);
console.log('geg')
    
        // await AsyncStorage.setItem('userName', userName);
        console.log('transfering data from data');
        //       navigation.navigate('imagePcikerForBusiness', {
        //         surname:surname,
        //         name:name,
        //         fatherName:fatherName,
        //         motherName:motherName,
        //         grandFatherName:grandFatherName,
        //         grandFatherNameNana:grandFatherNameNana,
        //         gender:gender,
        //         dob:dob,
        //         partnerName:partnerName,
        //         maritalStatus:maritalStatus,
        //         country:country,
        //         state:state,
        //        city:city,
        //       district:district,
        //       postalCode:postalCode,
        //       Address:Address,
        //       Street:Street,
        //   PImage:Image,
        //       email:email,
        //       password:password,
        //       nationality:nationality,
        //       partnerName:partnerName,
        //       phoneNumber:phoneNumber,
  
        //       BusinessName:BusinessName,
        //   BusinessCatergory:BusinessCatergory,
        //   BusinessDescription:BusinessDescription,
        //   BusinesContact:BusinesContact,
        //   BusinessEducation:BusinessEducation,
        //   WorkingFrom:WorkingFrom,
        //   WorkingTo:WorkingTo,
  
        //   Bcountry:Bcountry,
        //   Bstate:Bstate,
        //   Bcity:Bcity,
        //   Barea:area,
        //   Bpostalcode:Bpostalcode,
        //   Baddress:Baddress,
        //   Btimefrom:stringBtimefrom,
        // Btimeto:stringBtimeto
  
        //       })
        await fetchdata();
      await tokenlist();
        setLoading(false) 

    // navigation.navigate('businessData1', {
    //     surname:surname,
    //     name:name,
    //     fatherName:fatherName,
    //     motherName:motherName,
    //     grandFatherName:grandFatherName,
    //     grandFatherNameNana:grandFatherNameNana,
    //     gender:gender,
    //     dob:dob,
        
    //     maritalStatus:maritalStatus,
    //     country:country,
    //     state:state,
    //     city:city,
    //   district:district,
    //   postalCode:postalCode,
    //   Address:Address,
    //   Street:Street,
  
    //   email:email,
    //   password:password,
    //   nationality:nationality,
    //   phoneNumber:phoneNumber
    //   ,Image:selectedImageUrl,
    //   partnerName:partnerName
      
    //   })

        // navigation.navigate('businessData1');
    }
    if (category === 'jobseeker' &&  avatarUri !== 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhmTe4FGFtGAgbIwVBxoD3FmED3E5EE99UGPItI0xnQ&s' 
    && selectedImageUrl!='') {
      setLoading(false) 
      await AsyncStorage.setItem('Profile', selectedImageUrl);
    navigation.navigate('jobseekerData1', {
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
      district:district,
      postalCode:postalCode,
      Address:Address,
      Street:Street,
  
      email:email,
      password:password,
      nationality:nationality,
      phoneNumber:phoneNumber
      ,Image:selectedImageUrl,
      partnerName:partnerName
      
      })
        // navigation.navigate('jobseekerData1');
    }
    if (category === 'other' &&  avatarUri !== 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhmTe4FGFtGAgbIwVBxoD3FmED3E5EE99UGPItI0xnQ&s') {
      setLoading(false)  
    await  AsyncStorage.setItem('Profile', selectedImageUrl);
    navigation.navigate('otherData1', {
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
      district:district,
      postalCode:postalCode,
      Address:Address,
      Street:Street,
  
      email:email,
      password:password,
      nationality:nationality,
      phoneNumber:phoneNumber
      ,Image:selectedImageUrl,
      partnerName:partnerName
      
      })
        // navigation.navigate('otherData1');
    }
    setLoading(false)
  };

  return (
    <View style={styles.container}>
       
      <Avatar.Image
        size={250}
        source={{
          uri: avatarUri,
        }}
        style={{marginBottom: 20}}
        key={avatarUri}
      />


      <Text style={{marginBottom: 20}}>Select your profile picture</Text>
      <View style={styles.btn_container}>
        <PaperButton
          style={styles.button}
          mode="contained"
          onPress={() => openImagePicker('gallery')}>
          Gallery
        </PaperButton>
        <PaperButton
          style={styles.button}
          mode="contained"
          onPress={() => openImagePicker('camera')}>
          Camera
        </PaperButton>
      </View>

      <Pressable
  style={{
    borderRadius: 32,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#197739",
  }}
  onPress={uploadtofbStorage}
  disabled={Loading2} // Disable the button while loading
>
  {Loading2 ? (
    <ActivityIndicator size="small" color="red" style={{ alignSelf: "center" }} />
  ) : (
    <Text style={{ color: "white", fontSize: 16 }}>{Loading2 ? "Saving" : "Save Image"}</Text>
  )}
</Pressable>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeImagePicker}>
          <Dialog.Title>Select Image Source</Dialog.Title>
          <Dialog.Content>
            <Text>Select the source for your image:</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={handleImageSelection}>OK</PaperButton>
            <PaperButton onPress={closeImagePicker}>Cancel</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
       <Pressable  style={{    marginVertical: 16,
    borderRadius:16,padding:9,
    alignItems:"center",justifyContent:'center',
    backgroundColor: '#197739',}} onPress={onpressHandler}>
  {Loading ? (
    <ActivityIndicator size="small" color="white" style={{ alignSelf:'center',}} />
  ) : (
    <Text style={{ color: 'white', fontSize: 16 }}>Next</Text>
  )}
</Pressable>

      </View>
   
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
  },
  btn_container: {
    flexDirection: 'row',
    gap: 8,
  },

  button: {
    marginVertical: 16,
    // borderRadius:16,padding:9,
    // alignItems:"center",justifyContent:'center',
    backgroundColor: '#197739',
  },
});
