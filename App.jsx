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

import PushNotification from 'react-native-push-notification';
const App = () => {


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {

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