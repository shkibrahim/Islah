import React, {useState, useEffect} from 'react';
import {
  View,
  Text,ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {myTheme} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const Notification = ({navigation}) => {

  const [isLoading, setIsLoading] = useState();

  


  const[Loading,setLoading] = useState(false)
  const [NewsData, setNewsData] = useState();
const [ChatData,setChatData]=useState([])
console.log('my news',NewsData)



useEffect(() => {
  const fetchData = async () => {
    try {
      const user = await AsyncStorage.getItem('userName');
      // console.log('my data is',JSON.parse(data))
    
    // const newdata= JSON.parse(data)
    // const user = newdata?.id
      // const notifStr = await AsyncStorage.getItem('notifications');
      // const notif = JSON.parse(notifStr);
      // notif?.forEach(item => {
      //   console.log('collapseKey:', item.notification?.title ?? 'Not found');
      // });
    
      const notificationDocs = await firestore().collection('Notification').doc(String(user)).collection(String(user)).get();
      console.log('main docs', notificationDocs)
      const firestoreNotification = notificationDocs.docs.map(doc => doc.data());
      console.log('data is in data',firestoreNotification)
      const mydat =(firestoreNotification[0]?.notification)
      // const pard = JSON.parse(mydat)
      const str = JSON.stringify(mydat)
      console.log('myda',mydat)
      setNewsData(firestoreNotification);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, []);
  console.log('andr wala',NewsData)

  const main = '#197739';

const Directing =async(item)=>{
if (item.notification[0]?.notification?.title == 'Islah' || !item.notification[0]?.notification?.title){
  navigation.navigate('News')

}

if (item.notification[0]?.notification?.title != 'Islah' &&  item.notification[0]?.notification?.title){
  navigation.navigate('singleChat',{
 id : item.notification[0].data?.id,
 Profile:item.notification[0].data?.Profile,
 Name: item.notification[0].data?.Name,
  })

}
}
  const renderItem1 = ({item}) => (
    <TouchableOpacity style={{borderRadius:15,   borderWidth: 0.5,
      backgroundColor : "green",
      borderColor: '#ddd',margin:12,padding:12}}onPress={() => Directing(item)}>
    <Text style={styles.title}
    
>
  {/* {JSON.stringify(item)} */}
   {item.notification[0]?.notification?.title ?  item.notification[0]?.notification?.title : 'Islah'}
    </Text>
    <Text style={{color:"white"}}>
{item.notification[0]?.notification?.body ?  item.notification[0]?.notification?.body : 'has a news for you'}
{/* {JSON.stringify(item.notification[0]?.notification?.title)} */}
    </Text>

 
  </TouchableOpacity>





  );
  return (
    <View style={styles.container}>
       {isLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center',marginTop:300}}
        />
      ) : (
      <View>
        {NewsData?.length>0 &&       <FlatList
          data={NewsData}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
        />
}
{NewsData == undefined || NewsData.length==0 &&       
<View>
  <Text style={{color:"red",alignSelf:"center",marginTop:200,fontSize:18}}>No notifications yet.</Text>
  </View>
}
      {/* <View style={{height:"90%"}}> 
      <FlatList
        data={filteredData1}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserItem}
      />
      </View> */}
      </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  title: {
    fontSize: 14,
    color: 'white',
    textAlign: 'justify',
    // flexBasis : "68%",
    justifyContent : "center",
    alignItems : "center"
  },
  searchInput: {
    margin: 16,
    borderColor: myTheme.colors.primary,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 32,
    color:"black",
    backgroundColor: '#ddd',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dp: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  sendButton: {
    padding: 8,
    backgroundColor: myTheme.colors.primary,
    borderRadius: 8,
  },
  btn_text: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Notification;
