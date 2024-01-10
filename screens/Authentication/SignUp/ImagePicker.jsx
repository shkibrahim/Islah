import React, {useEffect, useState} from 'react';
import {View, Button, PermissionsAndroid, StyleSheet} from 'react-native';
import {
  Avatar,
  Portal,
  Dialog,
  Text,
  Button as PaperButton,
} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImagePicker = ({ route,navigation }) => {
  const [avatarUri, setAvatarUri] = useState(
    'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState('');
  const [category, setCategory] = useState('');
  const {
    surname,name,fatherName,motherName,grandFatherName,grandFatherNameNana,gender,dob,maritalStatus,country,state,city,district,postalCode,Address,Street, email,password,nationality,phoneNumber
  }=route.params
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
        response = await launchImageLibrary({mediaType: 'photo'});
      }

      if (response.assets && response.assets.length > 0) {
        setAvatarUri(response.assets[0].uri);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onpressHandler = () => {


    if (category === 'student') {
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
  
      
      })





        // navigation.navigate('studentData1');
    }
    if (category === 'business') {
      navigation.navigate('businessData1', {
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
      nationality:indian,
      phoneNumber:phoneNumber
  
      
      })

        // navigation.navigate('businessData1');
    }
    if (category === 'jobseeker') {
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
      nationality:indian,
      phoneNumber:phoneNumber
  
      
      })
        // navigation.navigate('jobseekerData1');
    }
    if (category === 'other') {
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
      nationality:indian,
      phoneNumber:phoneNumber
  
      
      })
        // navigation.navigate('otherData1');
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={330}
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
        <CustomButton label="Next" onPress={onpressHandler} />
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
    backgroundColor: '#197739',
  },
});
