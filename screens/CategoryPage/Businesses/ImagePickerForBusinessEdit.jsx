import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  PermissionsAndroid,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Avatar,
  Portal,
  Dialog,
  Text,
  Button as PaperButton,
  Title,
} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImagePickerForBusinessEdit = ({route, props, navigation}) => {
  const {
    BusinessName,
    BusinessCategory,
    BusinessDescription,
    BusinessContact,
    BusinessEducation,
    WorkingFrom,
    WorkingTo,
    Btimefrom,
    Btimeto,
    Bcountry,
    Bstate,
    Bcity,
    Barea,
    Baddress,
    Bpostalcode,
    Id,
    name,
    phone,
    Profile,
    user,
  } = route.params;
console.log( 'all data in image ',
 BusinessName,
    BusinessCategory,
    BusinessDescription,
    BusinessContact,
    BusinessEducation,
    WorkingFrom,
    WorkingTo,
    Btimefrom,
    Btimeto,
    Bcountry,
    Bstate,
    Bcity,
    Barea,
    Baddress,
    Bpostalcode,
    Id,
    name,
    phone,
    Profile,
    user,)
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState('');
  const [category, setCategory] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  const [Loading2, setLoading2] = useState(false);
  const [firstimgUrl, setFirstimgUrl] = useState(
    'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=',
  );
  const [secondimgUrl, setsecondimgUrl] = useState(
    'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=',
  );
  const [thirdimgUrl, setthirdimgUrl] = useState(
    'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=',
  );

  const [selectedImage1, setSelectedImage1] = useState(null);

  const [selectedImage2, setSelectedImage2] = useState(null);

  const [selectedImage3, setSelectedImage3] = useState(null);

  const uploadimage1 = async () => {
    try {
      const reference = storage().ref(selectedImage1.assets[0].fileName);
      const pathToFile = firstimgUrl;

      await reference.putFile(pathToFile);

      // Get the download URL using getDownloadURL() method
      const url1 = await reference.getDownloadURL();
      console.log('abhi');
      console.log(url1);
      setimg1(url1);
    } catch (error) {
      console.error('Error uploading image 1:', error);
      throw error;
    }
  };

  const uploadimage2 = async () => {
    try {
      const reference = storage().ref(selectedImage2.assets[0].fileName);
      const pathToFile = secondimgUrl;

      await reference.putFile(pathToFile);

      // Get the download URL using getDownloadURL() method
      const url2 = await reference.getDownloadURL();
      console.log('abhi');
      console.log(url2);
      setimg2(url2);
    } catch (error) {
      console.error('Error uploading image 2:', error);
      throw error;
    }
  };

  const uploadimage3 = async () => {
    try {
      const reference = storage().ref(selectedImage3.assets[0].fileName);
      const pathToFile = thirdimgUrl;

      await reference.putFile(pathToFile);

      // Get the download URL using getDownloadURL() method
      const url3 = await reference.getDownloadURL();
      console.log('abhi');
      console.log(url3);
      setimg3(url3);
    } catch (error) {
      console.error('Error uploading image 3:', error);
      throw error;
    }
  };

  const uploadimages = async () => {
    if (
      firstimgUrl !=
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=' &&
      secondimgUrl !=
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=' &&
      thirdimgUrl !=
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE='
    ) {
      setLoading2(true);
      await uploadimage1();
      await uploadimage2();
      await uploadimage3();

      setLoading2(false);
    } else {
      Alert.alert('Please Select Images');
    }
  };
  useEffect(() => {
    console.log('image is', img1);
    console.log('image is', img2);
    console.log('image is', img3);
    // Code that depends on img1
  }, [img1, img2, img3]);

  const [img1, setimg1] = useState('no');
  const [img2, setimg2] = useState('no');
  const [img3, setimg3] = useState('no');
  //   useEffect(() => {
  //     getEmailFromStorage();
  //   }, []);

  //   const getEmailFromStorage = async () => {
  //     try {
  //       const storedEmail = await AsyncStorage.getItem('userName');
  //       setuser(storedEmail);
  //     } catch (error) {
  //       console.error('Error getting email from AsyncStorage:', error);
  //     }
  //   };
  useEffect(() => {
    const getCategory = async () => {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
    };
    getCategory();
  }, []);

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
        response = await launchImageLibrary({
          mediaType: 'photo',
          cropping: true,
        });
      }

      if (response.assets && response.assets.length > 0) {
        if (currentImage === 'first') {
          setFirstimgUrl(response.assets[0].uri);
          setSelectedImage1(response);
        }
        if (currentImage === 'second') {
          setsecondimgUrl(response.assets[0].uri);
          setSelectedImage2(response);
        }
        if (currentImage === 'third') {
          setthirdimgUrl(response.assets[0].uri);
          setSelectedImage3(response);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onpressHandler = async () => {
    console.log('ading');
    // navigation.navigate('home')
    if (
      firstimgUrl ==
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=' &&
      secondimgUrl ==
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=' &&
      thirdimgUrl ==
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE='
    ) {
      Alert.alert('Please select Images to proceed');
    }

    if (img1 == 'no' || img2 == 'no' || img2 == 'no') {
      console.log('yha agya');
      Alert.alert('Please save Image first ');
    }

    if (
      firstimgUrl !=
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=' &&
      secondimgUrl !=
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=' &&
      thirdimgUrl !=
        'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=' &&
      img1 !== 'no' &&
      img2 !== 'no' &&
      img3 !== 'no'
    ) {
  

        try {
            // await uploadimage1();
            // await uploadimage2();
      
            // await uploadimage3();
            console.log('data transfering');
            await firestore()
              .collection('BusinessPerson')
              .doc(user).collection('Business').doc(Id)
      
              .update({
               
      category:category,
                BusinessName: BusinessName,
                BusinessCatergory: BusinessCategory,
                BusinessDescription: BusinessDescription,
                BusinesContact: BusinessContact,
                BusinessEducation: BusinessEducation,
                WorkingFrom: WorkingFrom,
                WorkingTo: WorkingTo,
                User:user,
                Bcountry: Bcountry,
                Bstate: Bstate,
                Bcity: Bcity,
                Barea: Barea,
                Bpostalcode: Bpostalcode,
                Baddress: Baddress,
                Btimefrom: Btimefrom,
                Btimeto: Btimeto,
                Bimage1: img1,
                Bimage2: img2,
                Bimage3: img3,
                phoneNumber:phone,
                Name:name,
                Profile:Profile
                // ... (rest of the data)
              });
      
            // setIsLoading(false);
            Alert.alert('Updated Successfully');
            navigation.replace('home');
          } catch (error) {
            // setIsLoading(false);
            console.log('Error addinfsf product:', error);
            // Handle any error that might occur during the process
          }
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.heading}> Business Details </Title>
      <View style={styles.imgs_container}>
        <TouchableOpacity
          onPress={() => {
            setCurrentImage('first');
            openImagePicker('gallery');
          }}>
          <Image
            source={{uri: firstimgUrl}}
            style={{width: 150, height: 150, margin: 4}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentImage('second');
            openImagePicker('gallery');
          }}>
          <Image
            source={{uri: secondimgUrl}}
            style={{width: 150, height: 150, margin: 4}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentImage('third');
            openImagePicker('gallery');
          }}>
          <Image
            source={{uri: thirdimgUrl}}
            style={{width: 150, height: 150, margin: 4}}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginBottom: 20,
          fontSize: 16,
          color: '#555',
          fontWeight: 'bold',
        }}>
        Upload your business related photos
      </Text>

      <Pressable
        style={{
          borderRadius: 32,
          padding: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#197739',
        }}
        onPress={uploadimages}
        disabled={Loading2} // Disable the button while loading
      >
        {Loading2 ? (
          <ActivityIndicator
            size="small"
            color="red"
            style={{alignSelf: 'center'}}
          />
        ) : (
          <Text style={{color: 'white', fontSize: 16}}>
            {Loading2 ? 'Saving' : 'Save Image'}
          </Text>
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
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomButton label="Next" onPress={onpressHandler} />
      </View>
    </View>
  );
};

export default ImagePickerForBusinessEdit;

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
    marginBottom: 32,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#197739',
  },
  btn_container: {
    flexDirection: 'row',
    gap: 8,
  },
  imgs_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
    justifyContent: 'center',
  },

  button: {
    marginVertical: 16,
    backgroundColor: '#197739',
  },
});
