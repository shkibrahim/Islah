import 'react-native-gesture-handler';
import { StyleSheet, Text, View ,LogBox,Alert} from 'react-native'
import React ,{useEffect, useState} from 'react'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreLogs([{level: 'error'}]);
LogBox.ignoreAllLogs();
import Main from './Main'
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myTheme } from './theme';
import messaging from '@react-native-firebase/messaging';
import store from './redux/store';
import { PermissionsAndroid, Platform } from "react-native";
import PushNotification from 'react-native-push-notification';
const App = () => {
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };
    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      hasAndroidPermission()
    // Alert.alert( JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    getdevicetoken()

  }, []);
  
  
  const [token,settoken] = useState()
  const getdevicetoken= async()=>{
  
    let a =await messaging().getToken()
  settoken(a);
  console.log('my token',a)

  await AsyncStorage.setItem('Token', a);
  
  }


  // const SavingToken = async()=>{
   
  //   await AsyncStorage.setItem('Token', token);
  // }

  // useEffect(() => {
  //   SavingToken()

  // }, [token]);
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await firestore().collection('News').get();
  //       const data = querySnapshot.docs.map(doc => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));

  //       console.log('Fetched data:', data);

  //       // Set up real-time listener for changes
  //       const unsubscribe = firestore().collection('News').onSnapshot(snapshot => {
  //         // Trigger a notification when there's a change
  //         sendNotification('New data available!');
  //       });

  //       // Clean up the listener when the component unmounts
  //       return () => unsubscribe();
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
      
  //     }
  //   };

  //   const sendNotification = async (message) => {
  //     try {
  //       await messaging().requestPermission();
  //       const token = await messaging().getToken();

  //       await messaging().sendMessage({
  //         to: token,
  //         notification: {
  //           title: 'Notification Title',
  //           body: message,
  //         },
  //       });
  //     } catch (error) {
  //       console.error('Error sending notification:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); 



  // const showLocalNotification = (title, message) => {
  //   PushNotification.localNotification({
  //     channelId: 'default-channel-id',
  //     title: 'title',
  //     message: 'message',
  //   });
  // };
  enableScreens();

  return (
    <Provider store={store}>
      <PaperProvider theme={myTheme}>
        <Main />
      </PaperProvider>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})