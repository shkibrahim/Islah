import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {myTheme} from '../../theme';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {Icon} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const SingleChatPage = ({props, navigation, route}) => {
  const [isLoading, setIsLoading] = useState();
  const [StudentData, setStudentData] = useState([]);
  const [BusinessData, setBusinessData] = useState([]);
  const [IndividualData, setIndividualData] = useState([]);
  const [JobSeekerData, setJobSeekerData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [SenderName,setSenderName] = useState();
  const [SenderMsg,setSendermsg]= useState()
  useEffect(() => {


    getEmailFromStorage();
    // getProfile();
    // getName();
  }, []);
  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };
  const [user, setuser] = useState();
  const {id, Name,Profile,UserProfile} = route.params;
  console.log(UserProfile)
  
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])
  useEffect(() => {

    // Create a reference to the Firestore collection using concatenated user IDs
    const chatId = [user,id].sort().join('_'); // Create a unique chat ID
    const messagesRef = firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('Messages')
      .orderBy('createdAt', 'desc');

    // Subscribe to the snapshot changes
    const unsubscribe = messagesRef.onSnapshot(snapshot => {
      const allMessages = snapshot.docs.map(doc => {
        return {...doc.data(), createdAt: new Date()};
      });

      // Update the state with the new messages
      setMessages(allMessages);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [user,id]);
  const [messages, setMessages] = useState([]);

  const onSend =  async (messageArray) => {
    const msg = await messageArray[0];
   await setSendermsg(msg)
    const chatId = [user,id].sort().join('_'); // Recreate the unique chat ID
    const Mymsg = {
      ...msg,
      senderId: user,
      avatar: Profile,
      recieverId: id,
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, Mymsg));

    // Set a unique document ID using the concatenated user IDs
    // const messageId = firestore().collection('Chats').doc(chatId).collection('Messages').doc().id;

   await  firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('Messages')
      .doc()
      .set({
        ...Mymsg,
        CreatedAt: firestore.FieldValue.serverTimestamp(),
      });
console.log(id)
const matchingData = AllData.find((data) => data.id === id);
const mydata = AllData.find((data)=> data.id === user);
console.log('sender data is ' , mydata)
const myName = mydata.Name;
const profileuser = mydata.Profile
console.log(profileuser)


setSenderName(myName)
if (matchingData) {
  const matchingToken = matchingData.Token;
  console.log('Token for matching id:', matchingToken);

  await  SendNotification(matchingToken)


}

  };



    



  const SendNotification = async (tokens) => {
    // Import axios at the beginning of your file
    const notificationPayload = {
      data: {},
      notification: {
        body: SenderMsg.text,
        title: SenderName,
      },
    };
  
    const data = JSON.stringify({
      ...notificationPayload,
      to: tokens,
    });
  
    const config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization:
          'key=AAAAwX1-1m8:APA91bH0tS2C1hcko9fEhgCCGFl6k4kEdLi2BrXJC2ZMyh5QAsO6Flr7QNhQe-QFmqSPGAEQuwFLwnHOsWjhtKlu8VuWAPCFAQXm9ulcymkwv2_-dEEZXDhXaf2uDxbtu_cZbNjBQDNl',
        'Content-Type': 'application/json',
      },
      data: data,
    };
  
    try {
      const response = await axios(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log('Error sending notification:', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const funcData = async () => {
      try {
        await fetchalldata();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    funcData();
  }, []);
  const funcat = async()=>{

    try {
      
      const concatenatedData = StudentData.concat(IndividualData, BusinessData, JobSeekerData);
      setAllData(concatenatedData);
      if (concatenatedData.length>0){
        console.log('me andr')
        
  // console.log('concatenated data',concatenatedData  )
  
      }
      
  
      // setAllData(concatenatedData.flat()); // flat() to flatten the array of arrays
      setIsLoading(false);
    } catch (error) {
      console.error('Error concatenating data:', error);
    }
  }
  // Data fetching for user id
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
        console.log('my business data is ', databusiness);
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
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
    funcat();

        
  
  }, [StudentData, BusinessData, IndividualData, JobSeekerData]);



  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: user,
           
            avatar: UserProfile,
            
          }}
          alwaysShowSend
          // textInputProps={{
          //   style: {

          //     color: 'black', // Set the text input color to black
          //   },

          // }}

          renderInputToolbar={props => {
            return (
              <InputToolbar
                {...props}
                containerStyle={{
                  color: 'black',
                  backgroundColor: '#1d6b34',
                  borderRadius: 22,
                  alignSelf: 'center',
                  margin: 8,
                }}></InputToolbar>
            );
          }}
          renderSend={props => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                }}>
                <Send {...props} containerStyle={{justifyContent: 'center'}}>
                  <View style={{marginRight: 10, marginBottom: 10}}>
                    <MaterialIcons name="send" size={28} color={'white'} />
                  </View>
                  {/* <Image source={require('./')} */}
                </Send>
              </View>
            );
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: 'green',
                  },
                  // left: {
                    
                  // },
                }}
              />
            );
          }}

          // textInputProps={{
          //   style: {
          //     color: 'black',

          //      // Set the text input color to black
          //   },
          // }}
        />
        {/* <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          inverted // to display messages from bottom to top
        /> */}

        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={text => setInputText(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Icon source="send" color={myTheme.colors.primary} size={20} />
          </TouchableOpacity>
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //  padding: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: myTheme.colors.secondary,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  messageText: {
    color: '#000',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SingleChatPage;
