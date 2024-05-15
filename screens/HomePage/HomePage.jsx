import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  DrawerLayoutAndroid,TouchableOpacity,
  Image,
  FlatList,TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopBar from '../../Components/TopBar/TopBar';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Dimensions} from 'react-native';
import auth from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {
  Button,
  IconButton,
  Searchbar,
  
  Icon,
  Portal,
  Modal,
} from 'react-native-paper';
import {myTheme} from '../../theme';
import FixedBanner from '../../Components/FixedBanner/FixedBanner';
import CarouselPage from '../../Components/Carousel/Carousel';
import UserCard from '../../Components/UserCard/UserCard';
import Carousel from 'react-native-reanimated-carousel';
import {useRoute, useNavigation} from '@react-navigation/native';
import Voice from '@react-native-community/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';
import Loader from '../../Components/loader/Loader';
import {loadUser} from '../../redux/reducers/authReducers';
import HomeModal from '../../Components/Modals/HomeModal';

const HomePage = ({route, navigation}) => {

  const [visible, setVisible] = React.useState(false);
  const [startupLoading, setStartupLoading] = useState(true);
  const width = Dimensions.get('window');
  // const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isListening, setIsListening] = useState(false);
  // console.log('filtereddata',filteredData)

  
  
  const [Data1, setData1] = useState([]);
  const [Data2, setData2] = useState([]);
  console.log('why are you',Data2)
  const [Data3, setData3] = useState([]);
  const [Data4, setData4] = useState([]);
  const [Banner, setBanner] = useState(['fsf']);
  const [isLoading, setIsLoading] = useState();
  const [StudentData, setStudentData] = useState([]);
  const [BusinessData, setBusinessData] = useState([]);
  const [IndividualData, setIndividualData] = useState([]);
  const [JobSeekerData, setJobSeekerData] = useState([]);
  const [AllData, setAllData] = useState([]);
const [EmptyData,setEmptyData] = useState([])

useEffect(() => {
  Voice.onSpeechResults = onSpeechResults;
  // return () => {
  //   Voice.destroy().then(Voice.removeAllListeners);
  // };
}, []);

const onSpeechResults = (e) => {
  setSearchQuery(e.value[0]);
};

const startVoiceSearch = async () => {
  try {
    if (Platform.OS === 'ios') {
      await Voice.requestAuthorization();
    }

    setIsListening(true);
    await Voice.start('en-US');
  } catch (error) {
    console.error('Voice recognition failed:', error);
  }
};

const stopVoiceSearch = async () => {
  try {
    setIsListening(false);
    await Voice.stop();
  } catch (error) {
    console.error('Error stopping voice recognition:', error);
  }
};

const funcat = async()=>{

  try {
    // const concatenatedData = await Promise.all([
    //   StudentData,
    //   IndividualData,
    //   BusinessData,
    //   JobSeekerData
    // ]);
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
const fetchalldata = async () => {
  console.log('student');
  try {
    const studentQuerySnapshot = await firestore().collection('StudentData').get();

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
    const businessQuerySnapshot = await firestore().collection('BusinessPerson').get();

    const databusiness = businessQuerySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (databusiness && Array.isArray(databusiness)) {
      setBusinessData(databusiness);
      console.log('my business data is ',databusiness)
    } else {
      console.log('No business documents found.');
    }
  } catch (error) {
    console.error('Error fetching business data:', error);
  }

  console.log('individual');
  try {
    const individualQuerySnapshot = await firestore().collection('OtherData').get();

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
    const jobseekerQuerySnapshot = await firestore().collection('JobSeekerData').get();

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

  const fetchBusiness = async () => {
    console.log('business');
    try {
      const querySnapshot = await firestore()
        .collection('BusinessPerson')
        .get();

      const databusiness = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (databusiness && Array.isArray(databusiness)) {
        setBusinessData(databusiness);
      

      
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    console.log('individual');
    try {
      const querySnapshot = await firestore().collection('OtherData').get();

      const dataindividual = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (dataindividual && Array.isArray(dataindividual)) {
        setIndividualData(dataindividual);
       
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }


    console.log('jobseeker');
    try {
      const querySnapshot = await firestore().collection('JobSeekerData').get();

      const datajobseeker = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (datajobseeker && Array.isArray(datajobseeker)) {
        setJobSeekerData(datajobseeker);
       
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const fetchIndividual = async () => {
    console.log('individual');
    try {
      const querySnapshot = await firestore().collection('OtherData').get();

      const dataindividual = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (dataindividual && Array.isArray(dataindividual)) {
        setIndividualData(dataindividual);
       
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }


    console.log('jobseeker');
    try {
      const querySnapshot = await firestore().collection('JobSeekerData').get();

      const datajobseeker = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (datajobseeker && Array.isArray(datajobseeker)) {
        setJobSeekerData(datajobseeker);
       
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchJobseeker = async () => {
    console.log('jobseeker');
    try {
      const querySnapshot = await firestore().collection('JobSeekerData').get();

      const datajobseeker = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (datajobseeker && Array.isArray(datajobseeker)) {
        setJobSeekerData(datajobseeker);
       
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchBanner = async () => {
    console.log('banner');
    try {
      const querySnapshot = await firestore().collection('FrontBanner').get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setBanner(data);
        console.log('ye ha image ka', data);

        // You can set other states here if needed
        // setData2(data);
        // setoriginalData(data);

        // console.log('Data1:', data); // Log the fetched data
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData1 = async () => {
    console.log('banner1');
    try {
      const querySnapshot = await firestore()
        .collection('SlidingBanner1')
        .get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setData1(data);
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData2 = async () => {
    console.log('banner2');
    try {
      const querySnapshot = await firestore()
        .collection('SlidingBanner2')
        .get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        // setLoading(false);
        setData2(data);

      
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData3 = async () => {
    console.log('banner3');
    try {
      const querySnapshot = await firestore()
        .collection('SlidingBanner3')
        .get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setData3(data);

        // You can set other states here if needed
        // setData2(data);
        // setoriginalData(data);

        // console.log('Data1:', data); // Log the fetched data
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const fetchData4 = async () => {
    console.log('banner4');
    try {
      const querySnapshot = await firestore()
        .collection('SlidingBanner4')
        .get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setData4(data);

        // You can set other states here if needed
        // setData2(data);
        // setoriginalData(data);

        // console.log('Data1:', data); // Log the fetched data
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

const [RideTypeModal, setRideTypeModal] = useState(false);
const RideTypeSelector = () => {
 

  setRideTypeModal(!RideTypeModal);
    console.log('Modal state is',RideTypeModal)
  }
const [emailVerified,setEmailVerified] = useState()

const [checker,setchecker] =useState(false)



useEffect(() => {
  const intervalId = setInterval(() => {
    const user = auth().currentUser;
    if (user && user.emailVerified == false) {
      user.reload().then(() => {
        console.log({'emailVerified is done': user.emailVerified});
      });
    }
  }, 5000); // Run every 5 seconds (5000 milliseconds)

  return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
}, []); 
useEffect (()=>{
 
  const myfun = async()=>{
    const user =auth().currentUser;
      user.reload().then(() => {
    console.log({'emailVerified is done': user.emailVerified})
  })
    console.log('chk if verified',user.emailVerified)
  setEmailVerified(user.emailVerified)
  if (user.emailVerified == true) {
    setchecker(true)
    setRideTypeModal(false)
  
  }
  if(user.emailVerified == false){
  console.log('not verified')
  await  user.sendEmailVerification();
   setRideTypeModal(true)
  }
    

  }
 
  myfun()
 

},[emailVerified])
  useEffect(() => {
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
    funcat()

  
  }, [StudentData, BusinessData, IndividualData, JobSeekerData]);


  useEffect(() => {
    setIsLoading(true);
    const funcData = async () => {
      try {
        await fetchBanner();
        await fetchData1();
        await fetchData2();
        await fetchData3();
        await fetchData4();
        await fetchalldata();
        // await fetchstudent();
        // await fetchBusiness();
        // await fetchIndividual();
        // await fetchJobseeker();
  
        // Call func() after fetchBusiness, fetchIndividual, and fetchJobseeker are fully executed
        // func();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    funcData();
  
  }, []);
  


  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

 
  useEffect(() => {
    const filterData = () => {
      const filtered = AllData.filter(item =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.PostalCode.toString().includes(searchQuery.toLowerCase())
      );
  
      setFilteredData(filtered);
    };
  
    filterData();
  }, [searchQuery, AllData]);
  const [index, setIndex] = useState(0);




  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 16,
    height: 300,
  };
  const onChangeSearch = query => setSearchQuery(query);
  const onMicPress = () => {
    // Handle microphone icon press (e.g., initiate voice search)
    console.log('Microphone pressed');
  };


  const renderItem = ({item}) => (
    <View style={styles.bg}>
      <Carousel
        loop
        width={410}
        autoPlay
        scrollAnimationDuration={2000}
        autoPlayInterval={5000}
        height={250}
        data={item.SlidingBannerList}
        renderItem={({item: imageURL}) => (
          <Image
            source={{uri: imageURL}}
            style={{width: '100%', height: '100%'}}
          />
        )}
        // sliderWidth={windowWidth}
      />
    </View>
  );


  const renderUserItem = ({item}) => (
    <TouchableOpacity
    // onPress={() => showModal(item)}
    onPress={() =>
      navigation.navigate('PersonalView', {
    Data:item
      })}
    activeOpacity={0.4}
      style={{
        height: 90,
        marginVertical: 4,
        marginHorizontal: 16,

        backgroundColor: '#fff',
        borderRadius: 16,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 4,
      }}>

      {/* <Text style={{ color: 'black', fontSize: 19,alignSelf:"center" }}>GOOD</Text> */}
      <View style={styles.img_container}>
        {item.Profile ? (
          <Image source={{uri: item.Profile}} style={styles.img} />
        ) : (
          <Text style={{color: 'black'}}></Text>
        )}
      </View>

      <View style={styles.content_container}>
        {/* <Text style={styles.user_name}>csff</Text> */}
        <Text style={styles.user_name}>{item.Name}</Text>

        {item.Category &&  <Text style={styles.user_category}>{item.Category}</Text>}
        
        <Text style={styles.user_location}>{item.location}</Text>
      </View>
      <View style={styles.arrow_container}>
        <Icon source="arrow-right" size={22} color="#000" />
      </View>
    </TouchableOpacity>
  );

  const renderCombinedItem = ({index, item}) => {
    // Check if the index is a multiple of 5, and render the carousel
    if ((index + 1) % 15 === 0) {
      const startIndex = index - 4;
      const endIndex = index;
      const carouselData = AllData.slice(startIndex, endIndex + 1);
      return (
        <View style={{marginBottom: 10}}>
          <FlatList
            data={searchQuery.length > 0 ? filteredData: AllData.slice(index - 14, index + 1)}
            keyExtractor={item => item.id.toString()}
            renderItem={renderUserItem}
            // horizontal
            // showsHorizontalScrollIndicator={false}
          />
          <Carousel
            data={dataForCarousel(index)}
            loop
            width={windowWidth}
            height={windowHeight / 4}
            autoPlay={true}
            autoPlayInterval={5000}
            scrollAnimationDuration={1000}
            onSnapToItem={index => setCurrentIndex(index)}
            renderItem={renderItem}
            sliderWidth={windowWidth}
          />
        </View>
      );
    } else {
      return null; // Return null for non-carousel items
    }
  };

  // Function to determine the data for the carousel based on the index
  const dataForCarousel = index => {
    // Example logic to determine data for each carousel
    const carouselDataOptions = [Data2, Data3, Data4];
    const selectedDataIndex =
      Math.floor(index / 5) % carouselDataOptions.length;

    return carouselDataOptions[selectedDataIndex];
  };

  const [currentIndex, setCurrentIndex] = React.useState(2);
  return (

    <SafeAreaView style={{flex:1}}>


           {RideTypeModal == true && 

       
<HomeModal  RideTypeModal ={RideTypeModal}/>
}

{RideTypeModal == false &&  checker == true &&   <View style={styles.container}>
      
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center',marginTop:300}}
        />
      ) : (
      <View style={{flex:1}}> 
      

      <TopBar navigation={navigation} />

    
 
      <View style={styles.search_container}>
      
        <TextInput
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search"
          placeholderTextColor='gray'
          outlineColor="#fff"
         
          underlineColor="#fff"
          activeOutlineColor="#fff"
          activeUnderlineColor="#fff"
          cursorColor="#000"
          style={{
            width: '84%',
            alignSelf:'center',
            borderRadius:13,
            color:'black',paddingHorizontal:12,
            height: 40,
            backgroundColor: '#fff',
          }}
        />
          <IconButton
        icon={isListening ? 'microphone-off' : 'microphone'}
        size={20}
        onPress={isListening ? stopVoiceSearch : startVoiceSearch}
        style={styles.micIcon}
      />
      </View>


      <Portal>
        <Modal
          contentContainerStyle={containerStyle}
          visible={visible}
          onDismiss={hideModal}>
         <View style={styles.filter_container}>
            {selectedItem && (
              <>
                {selectedItem.Profile ? (
                  <Image source={{ uri: selectedItem.Profile }} style={styles.img} />
                  
                ) : (
                  <Image source={{ uri: 'https://intentplanning.ca/wp-content/uploads/2019/01/sample-person.jpg' }} style={styles.img} />
                )}
                <Text style={{ color: 'black' ,alignSelf:"center",fontSize:20,fontWeight:"bold"}}>{selectedItem.Name}</Text>
<Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"300"}}>{selectedItem.Category}</Text>
<View style={{flexDirection:"row",alignItems:"center",alignSelf:"center", justifyContent:"space-evenly",width:"100%"}}>
  <View style={{alignItems:"center"}}>
  <Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"600"}}>Father Name</Text>
  <Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"300"}}>{selectedItem.FatherName}</Text>
  <View style={{alignItems:"center" ,marginVertical:5}}>
  <Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"600"}}>City</Text>
  <Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"300"}}>{selectedItem.City}</Text>
  </View>
  </View>

  <View style={{alignItems:"center"}}>
  <Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"600"}}>Grand Father Name</Text>
  <Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"300"}}>{selectedItem.GrandFatherName}</Text>
  <View style={{alignItems:"center", marginVertical:5}}>
  <Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"600"}}>Postal Code</Text>
  <Text style={{ color: 'black' ,alignSelf:"center",fontWeight:"300"}}>{selectedItem.PostalCode}</Text>
  </View>
  </View>

</View>


<View style={{flexDirection:"row",alignItems:"center",alignSelf:"center", justifyContent:"space-evenly",width:"100%"}}>
 



</View>
              </>
            )}


          </View>
        </Modal>
      </Portal>

      
        <View>
          <ScrollView
          style={{height:'85%'}}>

            <View
              style={{
                height: 60,
                width: 410,
                alignSelf:"center",
                backgroundColor: '#ddd',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
             
                {Banner[0].ImageUrl ? (
                  <Image
                    source={{uri: Banner[0].ImageUrl}}
                    style={{width:'100%',height:60}}
                  />
                ) : (
                  <Text
                    style={{color: 'gray', fontSize: 18, alignSelf: 'center',fontWeight:'300'}}>
                    {Banner[0]?.FixedT}
                  </Text>
                )}
           
            </View>
            {/* Carousel */}

            <View style={{flex:1}}>
              <View style={{}}>
                <Carousel
                  // loop
                  width={410}
                  height={250}
                  // autoPlay={true}
                  data={Data1}
                  // autoPlayInterval={5000}
                  // scrollAnimationDuration={1000}
                  // onSnapToItem={index => setCurrentIndex(index)}
                  renderItem={renderItem}
                  sliderWidth={410}
                />
              </View>
            </View>

            <View style={{}}>
             
            {AllData.length > 30 ? (
          
  <FlatList
  data={searchQuery.length > 0 ? filteredData : AllData}
    keyExtractor={item => item.id.toString()}
    renderItem={({ index, item }) =>
      renderCombinedItem({ index, item })
    }
  />
) : (
  <FlatList
  data={searchQuery.length > 0 ? filteredData : AllData}
  keyExtractor={item => item.id.toString()}
  renderItem={renderUserItem}
 
/>
)}

            </View>
          </ScrollView>
        </View>
     
      {/* <View style={{height:500}}> */}

      {/* </View> */}

      {/* <Text style={{color: 'black'}}>VSFSF</Text> */}
      </View>
       )}


    </View> }
  
    </SafeAreaView>

  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search_container: {
   justifyContent:'center',
    alignItems: 'center',
    backgroundColor: myTheme.colors.primary,
    paddingVertical: 8,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    marginRight: 8,
    position: 'absolute',
    right: 18,
  },
  users_container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filter_container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
  },

  card_container: {
    height: 90,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  img: {
    width: 100,alignSelf:"center",borderRadius:70,
    height: 100
    // resizeMode: 'contain',
  },
  img_container: {
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: 60,
  },
  content_container: {
    flex: 1,
    padding: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  user_name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  user_category: {
    fontSize: 12,
    color: '#666',
  },
  bg: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  user_location: {
    fontSize: 12,
    color: '#666',
  },
  arrow_container: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});
