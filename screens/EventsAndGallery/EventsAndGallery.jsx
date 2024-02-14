import { StyleSheet, Text, View ,Image,ActivityIndicator,FlatList} from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import firestore from '@react-native-firebase/firestore';
import BackButton from '../../Components/BackButton/BackButton';
const EventsAndGallery = ({navigation}) => {
  const [EventData1,setEventData1] = useState([])
  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [currentIndex, setCurrentIndex] = useState(1);
const [Loading,setLoading] = useState()
const [Data2,setData2] = useState()
const [datacoming,setdatacoming] = useState()
useEffect(() => {
  // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
  fetchData1()


}, []);

const fetchData1 = async () => {
  console.log('CarouselGallery');
  try {
    setLoading(true)
    const querySnapshot = await firestore()
      .collection('EventsandGallery')
      .get();

    const data = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Check if data.docs is defined before mapping
    if (data && Array.isArray(data)) {
      setEventData1(data);
      setdatacoming(true)
      
      console.log('image ka data',data)
      setLoading(false)
    } else {
      console.log('No documents found.');
      setLoading(false)
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false)
  }
};

const renderItem = ({item}) => (
  <View style={styles.bg}>
    <InnerCarousel data={item.EventsandGallery} />
  </View>
);

// const renderItem3 =({item: imageURL}) => (
//   <View style={styles.bg}>
//      <Image
//         source={{uri: imageURL}}
//         style={{width: '100%', height: '33%', resizeMode: "cover"}}
//       />
//   </View>
// );

const InnerCarousel = ({data}) => (
  <Carousel
  
    width={windowWidth - 10}
    height={windowHeight}
    data={data}
    autoPlay
    autoPlayInterval={5000}
       scrollAnimationDuration={1500}
    renderItem={({item: imageURL}) => (
      <Image
        source={{uri: imageURL}}
        style={{width: '100%', height: '33%', resizeMode: "cover"}}
      />
    )}
    sliderWidth={windowWidth}
  />
);

const renderItem2 = ({ item: imageURL }) => (
  <View style={{ borderRadius:12,backgroundColor:"white",width:'47%',margin:5,alignSelf:"center"}}>
  <Image
    style={{
      width:"100%",
      // 50% of the container's width
      height: 200, // Fixed height of 200 units
      borderRadius: 10,
      resizeMode: 'stretch', // Ensure the image covers the specified dimensions
    }}
    source={{ uri: imageURL }} // Assuming imageURL is the URI of the image
  />
  </View>
);


  return (
    <SafeAreaView style={{height:"100%",flex:1}}>
       {Loading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center',marginTop:300}}
        />
      ) : (
      <View>
         <BackButton label={'Events and Gallery'} />


         <Carousel
   
    width={windowWidth}
    height={windowHeight / 3}
    // autoPlay={true}
    data={EventData1}
    // autoPlayInterval={5000}
    // scrollAnimationDuration={1000}
    renderItem={renderItem}
    sliderWidth={windowWidth}
  />



<View style={{height:500,padding:12}}>
{datacoming && (
<FlatList
      data={EventData1[0].BottomImages}
      numColumns={2}
      renderItem={renderItem2}
      // keyExtractor={(item) => item.id.toString()}
     
  
      // onRefresh={fetchData1}
     
    />
    )}

</View>
                </View>
                   )}
    </SafeAreaView>
  )
}

export default EventsAndGallery

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'transparent',
    marginBottom:5,
    overflow: 'hidden',
    alignItems:"center",alignSelf:'center',borderRadius:12
  },
})