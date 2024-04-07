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
          sendNotification();
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
        title: 'Islah',
        message: 'A new notification',
      });
    
 
    };
  
    fetchData();
  }, []);
  console.log('andr wala', NewsData)

  const main = '#197739';


  const renderItem1 = ({item}) => (
    <TouchableOpacity style={{borderRadius:15,   borderWidth: 0.5,
      backgroundColor : "green",
      borderColor: '#ddd',height:60,margin:12,padding:12}}onPress={() => navigation.navigate('News')}>
    <Text style={styles.title}
    
>
    A NEW POST BY ISLAH...
    </Text>
    <Text style={{}}
   
>
   Click me to see more
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
       <FlatList
          data={NewsData}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
        />

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
