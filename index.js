/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

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



AppRegistry.registerComponent(appName, () => App);
