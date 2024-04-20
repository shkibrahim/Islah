import { StyleSheet, Text, View ,FlatList,Image,ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { useState ,useEffect} from 'react';
import BackButton from '../../Components/BackButton/BackButton'
import NewsCard from '../../Components/NewsCard/NewsCard'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import { myTheme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { set } from 'date-fns';
const NewsPage = () => {
  const [RideTypeModal, setRideTypeModal] = useState(false);
  const [selectedItem,setselectedItem]= useState(null)
  const RideTypeSelector = (item) => {
    setselectedItem(item)
    setRideTypeModal(!RideTypeModal);
  };






  const[Loading,setLoading] = useState(false)
  const [NewsData, setNewsData] = useState([]);
const [EducationData,setEducationData] = useState()
const[BusinessData,setBusinessData] = useState()
const [WorldData,setWorldData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore().collection('News').get();
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
  
        console.log('Fetched data:', data);
        setNewsData(data);
        const Educationdata =  data?.find(data => data?.NewsCategory === 'Education');
        setEducationData(Educationdata)
        const Worlddata =  data?.find(data => data?.NewsCategory === 'World');
        setWorldData(Worlddata)
        const Businessdata =  data?.find(data => data?.NewsCategory === 'Business');
        setBusinessData(Businessdata)


        setLoading(false);



    
  
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

const [selectedImage,setselectedImage] = useState('https://firebasestorage.googleapis.com/v0/b/islah-8f61c.appspot.com/o/1000202110.jpg?alt=media&token=9d0ee881-1d43-4bb5-8c28-1440d7d5a69b')
  const renderItem1 = ({item}) => (
    <TouchableOpacity
    disabled={true}
    activeOpacity={0.6}
    // onPress={RideTypeSelector}
     style={{borderRadius:15,   borderWidth: 0.5,
      backgroundColor : "#fff",flexDirection:"row",alignItems:"center",justifyContent:"space-between",
      borderColor: '#ddd',height:100,margin:12,padding:12}}>
    <Text style={styles.title}>
     {item.News}
    </Text>


<View style={{height:'100%',width:75,borderRadius:4,alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
<Image source={{uri: selectedImage}} style={{width:'100%',height:"100%"}} />

</View>
 
  </TouchableOpacity>





  );


  const [ViewAll,setViewAll] = useState(true)
  const [ViewEducation,setViewEducation] = useState(false)
  const [ViewWorld,setViewWorld] = useState(false)
  const [ViewBusiness,setViewBusiness] = useState(false)

  const AllViewer =()=>{
    setViewWorld(false)
    setViewEducation(false)
    setViewBusiness(false)
    setViewAll(true)
  }

  const EducationViewer =()=>{
    setViewEducation(true)
    setViewWorld(false)

    setViewBusiness(false)

    setViewAll(false)
  }
  const WorldViewer =()=>{
    setViewWorld(true)
    setViewEducation(false)
    setViewBusiness(false)
    setViewAll(false)
  }

  const BusinessViewer =()=>{
    setViewBusiness(true)
    setViewWorld(false)
    setViewEducation(false)
    setViewAll(false)
  }
  return (
    <SafeAreaView style={{flex:1}}>
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
              {/* <Modal
        isVisible={RideTypeModal}
        onBackdropPress={RideTypeSelector}
        backdropColor="rgba(0, 0, 0, 0.5)" // Transparent black background color
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={{ backgroundColor: 'white', paddingHorizontal: 20,borderRadius:8 ,paddingVertical:20}}>
        
        <TouchableOpacity 
          onPress={()=>RideTypeSelector}
          style={{borderRadius:25,width:25,height:25,backgroundColor:"red",alignItems:"center",justifyContent:"center",alignSelf:"flex-end"}}>
          <MaterialIcons name="close" size={18} color={'white'} />

          </TouchableOpacity>


          <View style={{height:200,width:200,borderRadius:4,alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
<Image source={{uri: selectedItem?.NewsImage}} style={{width:'100%',height:"100%"}} />

</View>

        </View>
      </Modal> */}


      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",marginTop:12,backgroundColor:"white",padding:12,width:'100%'}}>
        <TouchableOpacity onPress={AllViewer}>
          <Text style={{color:'green',fontSize:16}}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={EducationViewer}>
          <Text style={{color:'green',fontSize:16}}>
            Education
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={BusinessViewer}>
          <Text style={{color:'green',fontSize:16}}>
            Business
          </Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={WorldViewer}>
          <Text style={{color:'green',fontSize:16}}>
            World
          </Text>
        </TouchableOpacity>
      </View>

      {ViewAll && <View>
        <FlatList
          data={NewsData}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
        />


        </View>}
    

        {ViewBusiness && <View>
        <FlatList
          data={BusinessData}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
        />


        </View>}
        

        {ViewEducation && <View>
        <FlatList
          data={EducationData}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
        />


        </View>}

        {ViewWorld && <View>
        <FlatList
          data={WorldData}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
        />


        </View>}
      </View>
           )} 


 
    </SafeAreaView>
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