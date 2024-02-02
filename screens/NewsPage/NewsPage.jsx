import { StyleSheet, Text, View ,FlatList,Image,ActivityIndicator} from 'react-native'
import React, { useState ,useEffect} from 'react';
import BackButton from '../../Components/BackButton/BackButton'
import NewsCard from '../../Components/NewsCard/NewsCard'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
import { myTheme } from '../../theme';
const NewsPage = () => {







  const[Loading,setLoading] = useState(false)
  const [NewsData, setNewsData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore().collection('News').get();
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
  
        console.log('Fetched data:', data);
  
        setLoading(false);
        setNewsData(data);
  
        // Set up real-time listener for changes
        const unsubscribe = firestore().collection('News').onSnapshot(snapshot => {
          // Trigger a notification when there's a change
          // sendNotification();
          console.log('fwf')
        });
  
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    const sendNotification = async (message) => {

      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: 'title',
        message: 'message',
      });
      // try {
      //   await messaging().requestPermission();
      //   const token = await messaging().getToken();
  
      //   await messaging().sendMessage({
      //     to: token,
      //     notification: {
      //       title: 'Notification Title',
      //       body: message,
      //     },
      //   });
      // } catch (error) {
      //   console.error('Error sending notification:', error);
      // }
    };
  
    fetchData();
  }, []);
  console.log('andr wala', NewsData)

  const main = '#197739';


  const renderItem1 = ({item}) => (
    <View style={{borderRadius:15,   borderWidth: 0.5,
      backgroundColor : "#fff",
      borderColor: '#ddd',height:100,margin:12,padding:12}}>
    <Text style={styles.title}>
     {item.News}
    </Text>

 
  </View>





  );
  return (
    <View>
      <BackButton label={'News'} />
      {Loading ? (
              <ActivityIndicator
                size="large"
                color= '#197739'
                style={{
                
                  alignSelf:"center",
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
      <View style={{}}>
        <FlatList
          data={NewsData}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
        />
      </View>
           )} 


 
    </View>
  )
}

export default NewsPage

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
  category: {
    fontSize: 16,
    color: '#555',
    // marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
    color: 'black',
  },

  container: {
    height: 100,
    marginVertical : 2,
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    backgroundColor : "#fff",
    borderColor: '#ddd',
    marginHorizontal: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    
  },
  title: {
    fontSize: 14,
    color: '#444',
    textAlign: 'justify',
    flexBasis : "68%",
    justifyContent : "center",
    alignItems : "center"
  },
  img_container: {
    width: 80,
    height: 80,
  },
})