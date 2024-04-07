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
import {Dimensions} from 'react-native';

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

const HomePage = ({route, navigation}) => {

  const [visible, setVisible] = React.useState(false);
  const [startupLoading, setStartupLoading] = useState(true);
  const width = Dimensions.get('window');
  // const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isListening, setIsListening] = useState(false);
  console.log('filtereddata',filteredData)

  
  
  const [Data1, setData1] = useState([]);
  const [Data2, setData2] = useState([]);
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
  return () => {
    Voice.destroy().then(Voice.removeAllListeners);
  };
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


  useEffect(() => {
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
    funcat()

  
  }, [StudentData, BusinessData, IndividualData, JobSeekerData]);

  const func =async()=>{
    console.log('me agya hu')
    const concatenatedData = JobSeekerData.concat(
      BusinessData,
      IndividualData,
      StudentData,
   
    );

    
    setAllData(concatenatedData);
    setIsLoading(false);

  }
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
  
  // console.log('my data is', AllData);
  
  // console.log('all data ', AllData);

  // useEffect(() => {
  //   // dispatch(loadUser())

  // func()
  // }, []);

  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // useEffect(() => {
  //   const filterData = () => {
  //     console.log('filtering')
  //     const filtered = AllData.filter(item =>
  //       item.Name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredData(filtered);
  //   };
  
  //   filterData();

  // }, [searchQuery, AllData]);
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


  const showModal = (item) => {
    setSelectedItem(item);
    setVisible(true);
  };

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

  // const data1 = [
  //   {
  //     id: 1,

  //     image:
  //       'data:image/jpeg;base64,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',
  //   },
  //   {
  //     id: 2,

  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQQKrovVPskzUe8AnVELsw2WRxN3sAJ_ZU2i-A9KCXA&s',
  //   },
  //   {
  //     id: 3,

  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQQKrovVPskzUe8AnVELsw2WRxN3sAJ_ZU2i-A9KCXA&s',
  //   },
  // ];

  // const data2 = [
  //   {
  //     id: 1,

  //     image:
  //       'https://images.unsplash.com/photo-1557858310-9052820906f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWR2ZXJ0aXNlbWVudHxlbnwwfHwwfHx8MA%3D%3D',
  //   },
  //   {
  //     id: 2,

  //     image:
  //       'https://images.unsplash.com/photo-1502434101797-234727574898?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFkdmVydGlzZW1lbnR8ZW58MHx8MHx8fDA%3D',
  //   },
  //   {
  //     id: 3,

  //     image:
  //       'https://images.unsplash.com/photo-1546142711-1e28c0540deb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFkdmVydGlzZW1lbnR8ZW58MHx8MHx8fDA%3D',
  //   },
  // ];

  // const data3 = [
  //   {
  //     id: 1,

  //     image:
  //       'https://media.istockphoto.com/id/1348247165/photo/build-your-brand-symbol-businessman-turns-wooden-cubes-and-changes-the-word-build-to-brand.webp?b=1&s=170667a&w=0&k=20&c=8VcGolUfmQRrNgMjW1DrMdpmILWDgXEK0y3g73wXN7g=',
  //   },
  //   {
  //     id: 2,

  //     image:
  //       'https://images.unsplash.com/photo-1557458491-86ffcaa94cef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGFkdmVydGlzZW1lbnR8ZW58MHx8MHx8fDA%3D',
  //   },
  //   {
  //     id: 3,

  //     image:
  //       'https://images.unsplash.com/photo-1546142711-1e28c0540deb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFkdmVydGlzZW1lbnR8ZW58MHx8MHx8fDA%3D',
  //   },
  // ];
  const renderItem = ({item}) => (
    <View style={styles.bg}>
      <Carousel
        loop
        width={windowWidth}
        autoPlay
        scrollAnimationDuration={2000}
        autoPlayInterval={5000}
        height={windowHeight / 3.5}
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

  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     name: 'User 1',
  //     category: 'Businsess',
  //     Profile: 'https://picsum.photos/200/298',
  //   },
  //   {
  //     id: 2,
  //     name: 'User 2',
  //     category: 'Student',
  //     Profile: 'https://picsum.photos/200/301',
  //   },
  //   {
  //     id: 3,
  //     name: 'User 3',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/304',
  //   },
  //   {
  //     id: 4,
  //     name: 'Random ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },
  //   {
  //     id: 5,
  //     name: 'User 1',
  //     category: 'Businsess',
  //     Profile: 'https://picsum.photos/200/297',
  //   },
  //   {
  //     id: 6,
  //     name: 'User 2',
  //     category: 'Student',
  //     Profile: 'https://picsum.photos/200/301',
  //   },
  //   {
  //     id: 7,
  //     name: 'User 3',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/304',
  //   },
  //   {
  //     id: 8,
  //     name: 'Random ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },

  //   {
  //     id: 9,
  //     name: 'Random ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },

  //   {
  //     id: 10,
  //     name: 'Random ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },

  //   {
  //     id: 11,
  //     name: 'blue ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },

  //   {
  //     id: 12,
  //     name: 'blue ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },

  //   {
  //     id: 13,
  //     name: 'blue ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },

  //   {
  //     id: 14,
  //     name: 'blue ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },

  //   {
  //     id: 15,
  //     name: 'blue ',
  //     category: 'Job Seeker',
  //     Profile: 'https://picsum.photos/200/307',
  //   },
  //   // Add more users as needed
  // ]);

  // const [data, setData] = useState(users
  // );

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
    <View style={styles.container}>
      {/* Top Bar */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center',marginTop:300}}
        />
      ) : (
      <View style={{flex:1}}> 
      <TopBar navigation={navigation} />

      {/* SearchBar */}

      <View style={styles.search_container}>
        {/* <IconButton
          icon="filter-outline"
          iconColor="#fff"
          size={20}
          onPress={() => showModal()}
        /> */}
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
          {/* <TouchableOpacity onPress={isListening ? stopVoiceSearch : startVoiceSearch}> */}
          <IconButton
        icon={isListening ? 'microphone-off' : 'microphone'}
        size={20}
        onPress={isListening ? stopVoiceSearch : startVoiceSearch}
        style={styles.micIcon}
      />
        {/* </TouchableOpacity> */}
      </View>

      {/* Model */}

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
                {/* other modal content using selectedItem */}
              </>
            )}


          </View>
        </Modal>
      </Portal>

      {/* Fixed Banner */}
      
        <View>
          <ScrollView
          style={{height:'85%'}}>
            {/* <FixedBanner /> */}

            <View
              style={{
                height: 60,
                width: '100%',
                backgroundColor: '#ddd',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
             
                {Banner[0].ImageUrl ? (
                  <Image
                    source={{uri: Banner[0].ImageUrl}}
                    style={{width:windowWidth,height:60}}
                  />
                ) : (
                  <Text
                    style={{color: 'gray', fontSize: 18, alignSelf: 'center',fontWeight:'300'}}>
                    {Banner[0].FixedT}
                  </Text>
                )}
           
            </View>
            {/* Carousel */}

            <View style={{}}>
              <View style={{}}>
                <Carousel
                  // loop
                  width={windowWidth}
                  height={windowHeight / 4}
                  // autoPlay={true}
                  data={Data1}
                  // autoPlayInterval={5000}
                  // scrollAnimationDuration={1000}
                  // onSnapToItem={index => setCurrentIndex(index)}
                  renderItem={renderItem}
                  sliderWidth={windowWidth}
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
    </View>
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
