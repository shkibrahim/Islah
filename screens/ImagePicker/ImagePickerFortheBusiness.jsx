import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  PermissionsAndroid,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Avatar,
  Portal,
  Dialog,
  Text,
  Button as PaperButton,
  Title,
} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImagePickerFortheBusiness =({  props,navigation}) => {

  const [firstimgUrl, setFirstimgUrl] = useState(
    'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  );
  const [secondimgUrl, setsecondimgUrl] = useState(
    'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  );
  const [thirdimgUrl, setthirdimgUrl] = useState(
    'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  );

  const [avatarUri, setAvatarUri] = useState(
    'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  );
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState('');
  const [category, setCategory] = useState('');
  const [currentImage, setCurrentImage] = useState('');

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
        if (currentImage === 'first') {
          setFirstimgUrl(response.assets[0].uri);
        }if( currentImage === "second"){
          setsecondimgUrl(response.assets[0].uri);
        }if(currentImage === "third"){
          setthirdimgUrl(response.assets[0].uri);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onpressHandler = () => {
    props.navigation.navigate('home')
  
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
      <Text style={{marginBottom: 20 , fontSize : 16 , color : "#555", fontWeight : "bold"}}>Upload your business related photos</Text>
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

export default ImagePickerFortheBusiness;

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
    color: "#197739"

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
