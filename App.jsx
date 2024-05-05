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
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import store from './redux/store';
import PushNotification from 'react-native-push-notification';
const App = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [notificationpermission,setnotificationpermission] = useState(false)
  // async function hasAndroidPermission() {
  //   const getCheckPermissionPromise = () => {
  //     if (Platform.Version >= 33) {
  //       return Promise.all([
  //         PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
  //         PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
  //       ]).then(
  //         ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
  //           hasReadMediaImagesPermission && hasReadMediaVideoPermission,
  //       );
  //     } else {
  //       return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  //     }
  //   };
  //   const hasPermission = await getCheckPermissionPromise();
  //   if (hasPermission) {
  //     return true;
  //   }

  // }
  useEffect(() => {
    requestCameraPermission();
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = async()=>{
    try{
      const permission =
      Platform.OS === 'android' ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS : PERMISSIONS.IOS.POST_NOTIFICATIONS;
      const currentPermissionStatus = await check(permission);
  
      // Check if permission is granted already
      if (currentPermissionStatus === RESULTS.GRANTED) {
        setnotificationpermission(true);
        return;
      }
  
      // Permission not granted, request it
      const result = await request(permission);
  
      if (result === RESULTS.GRANTED) {
        setnotificationpermission(true);
      } else {
        await check(permission);
        setnotificationpermission(false);
        // Alert.alert(
        //   'Permission denied',
        //   'You need to grant camera permission to use this feature.',
        // );
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  }
  
  const requestCameraPermission = async () => {
    try {
      // Check platform
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA;

      // Check current permission status
      const currentPermissionStatus = await check(permission);

      // Check if permission is granted already
      if (currentPermissionStatus === RESULTS.GRANTED) {
        setCameraPermission(true);
        return;
      }

      // Permission not granted, request it
      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        setCameraPermission(true);
      } else {
        await check(permission);
        setCameraPermission(false);
        // Alert.alert(
        //   'Permission denied',
        //   'You need to grant camera permission to use this feature.',
        // );
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  messaging().setBackgroundMessageHandler(async remoteMessage => {

    const parsed =([remoteMessage])
  // console.log('parsed are',parsed)
      const updatedNotifications = [remoteMessage];
  
      console.log('updates are',updatedNotifications)
      await firestore().collection('Notification').doc(String(user)).collection('shk').doc().set({
        notification: parsed
      });
      
  
    console.log('Message handled in the background!', remoteMessage);
  
    let message_body = remoteMessage.data.body;
    let message_title = remoteMessage.data.title;
  
    PushNotification.localNotification({
      channelId: 'channel-id',
      title: message_title,
      message: message_body,
      playSound: true,
      soundName: 'default',
    });
  
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  });
  

  
//   const sendNotification = async (message) => {
// console.log('first')
//     PushNotification.localNotification({
//       channelId: 'default-channel-id',
//       title: 'Islah',
//       message: 'A new notification',
//     });
  

//   };


  // useEffect(() => {
  //   sendNotification()
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
  //         sendNotification();
  //         console.log('fwf')
  //       });
  
  //       // Clean up the listener when the component unmounts
  //       return () => unsubscribe();
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
      
  //     }
  //   };
  
  
  
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {

    
  //     // Store the notification in AsyncStorage
  //     try {
  //       console.log('message is',remoteMessage)


  //       const notifications = await AsyncStorage.getItem('notifications');
  //       const parsedNotifications = notifications ? JSON.parse(notifications) : [];
  //       const updatedNotifications = [...parsedNotifications, remoteMessage];
  //       await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  //       Alert.alert(remoteMessage, 'The notification has been saved to AsyncStorage.');
  //     } catch (error) {
  //       console.error('Error storing notification:', error);
  //       Alert.alert('Error', 'An error occurred while saving the notification.');
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  // const [UserName,setUserName] = useState()
const func = async()=>{
  const data = await AsyncStorage.getItem('UserData')
  // console.log('my data is',JSON.parse(data))

const newdata= JSON.parse(data)
const user = newdata?.id
console.log('user is',user)


messaging().setBackgroundMessageHandler(async remoteMessage => {
  const data = await AsyncStorage.getItem('UserData')
  console.log('my data is',data)

const newdata= JSON.parse(data)
const user = newdata?.id
  const parsed =([remoteMessage])
// console.log('parsed are',parsed)
    const updatedNotifications = [remoteMessage];

    console.log('updates are back',updatedNotifications)
    if (user){
      await firestore().collection('Notification').doc(String(user)).collection(user).doc().set({
        notification: parsed
      });
      
    }


  console.log('Message handled in the background!', remoteMessage);

  let message_body = remoteMessage.data.body;
  let message_title = remoteMessage.data.title;

  PushNotification.localNotification({
    channelId: 'channel-id',
    title: message_title,
    message: message_body,
    playSound: true,
    soundName: 'default',
  });

  PushNotification.configure({
    onNotification: function (notification) {
      console.log('LOCAL NOTIFICATION ==>', notification);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
});

 
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    const data = await AsyncStorage.getItem('UserData')
    console.log('my data is in foreground',data)
  
  const newdata= JSON.parse(data)
  const user = newdata?.id
    console.log('message is',remoteMessage)

  

    // const notificationDoc = await firestore().collection('Notification').doc(a).get();
    // const firestoreNotification = notificationDoc.data();

// const parsedNotifications = firestoreNotification!=undefined ? (firestoreNotification) : [];
// console.log('parsed are',parsedNotifications)
const parsed =([remoteMessage])
// console.log('parsed are',parsed)
    const updatedNotifications = [remoteMessage];

    console.log('updates are',updatedNotifications)
    await firestore().collection('Notification').doc(String(user)).collection(user).doc().set({
      notification: parsed
    });
    

    try {
      // Fetch the notification from Firestore
   
      // Store the notification in AsyncStorage
      // const notifications = await AsyncStorage.getItem('notifications');
      // const parsedNotifications = firestoreNotification ? (firestoreNotification) : [];
      // const updatedNotifications = [...parsedNotifications, remoteMessage];
      // console.log(parsedNotifications)
      // await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));

      // Update the notification collection in Firestore
    

      Alert.alert('Success', 'Notification received and stored.');
    } catch (error) {
      console.error('Error handling notification:', error);
      Alert.alert('Error', 'An error occurred while handling the notification.');
    }
  });

  return unsubscribe;
}

  useEffect(() => {

    func()
  }, []);
  useEffect(() => {
    // Request permission for receiving notifications
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();

    // Listen for incoming notifications when the app is in the foreground
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
    
      // Store the notification in AsyncStorage
      try {
        Alert.alert('You have a new notification')
        const notifications = await AsyncStorage.getItem('notifications');
        const parsedNotifications = notifications ? JSON.parse(notifications) : [];
        const updatedNotifications = [...parsedNotifications, remoteMessage];
        await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        console.log('new messagw')

      } catch (error) {
        console.error('Error storing notification:', error);
      }
    });

    // Listen for incoming notifications when the app is in the background or terminated
    const unsubscribeBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      // Store the notification in AsyncStorage
      try {
        console.log('new messagw')

        const notifications = await AsyncStorage.getItem('notifications');
        const parsedNotifications = notifications ? JSON.parse(notifications) : [];
        const updatedNotifications = [...parsedNotifications, remoteMessage];
        await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        console.log(remoteMessage)
      } catch (error) {
        console.error('Error storing notification:', error);
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
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