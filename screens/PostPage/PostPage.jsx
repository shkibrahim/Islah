import {
  ScrollView,
  StyleSheet,
  Share,
  Text,
  Dimensions,
  Pressable,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {myTheme} from '../../theme';
import CustomTextInput from '../../Components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../Components/CustomButton';
import PostCard from '../../Components/PostCard/PostCard';
import {Button, Dialog, Portal} from 'react-native-paper';
import {BottomSheetModal, BottomSheetModalProvider,} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const PostPage = ({navigation}) => {
  const flatListRef = useRef(null);
  const currentTime = new Date();
 

  // Get the current hour, minute
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();;

// Format the time as desired
const amPM = hours >= 12 ? 'PM' : 'AM';

// Convert hours to 12-hour format
hours = hours % 12 || 12;

// Format the time
const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${amPM}`;

// Output the current time
console.log("Current time:", formattedTime);
// Output the current time
console.log("Current time:", formattedTime);
  const bottomSheetRef = useRef(null);
  const [Category1,setCategory1] = useState()
  const [StudentData, setStudentData] = useState([]);
  const [BusinessData, setBusinessData] = useState([]);
  const [IndividualData, setIndividualData] = useState([]);
  const [JobSeekerData, setJobSeekerData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const snapPoints = ['60%', '70%'];
  
  const [RideTypeModal, setRideTypeModal] = useState(false);
  const RideTypeSelector = () => {
setRideTypeModal(!RideTypeModal)
    // setContent(item.Content);
  
  };

  const bottomSheetModalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const funcat = async () => {
    console.log('concatting starts');
    try {
      const concatenatedData = await StudentData.concat(
        IndividualData,
        BusinessData,
        JobSeekerData,
      );
      setAllData(concatenatedData);
      if (concatenatedData.length > 0) {
        // console.log('Concat func ke andr ', concatenatedData);
        // console.log('concatenated data',concatenatedData  )
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error concatenating data:', error);
    }
  };
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
        // console.log('my business data is ', databusiness);
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
    funcat();
  }, [StudentData, BusinessData, IndividualData, JobSeekerData]);

  useEffect(() => {
    const funcData = async () => {
      try {
        await getEmailFromStorage();
        await fetchalldata();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    funcData();
  }, []);

  useEffect(() => {
    if (AllData) {
      myDatafetch1();
    }
  }, [AllData]);

  const handlePresentModal = async (item) => {
     await myDatafetch(item)
    setRideTypeModal(!RideTypeModal)
    setSelectedItem(item);
    console.log('my item is', item.Comments);
  };
  const [content, setContent] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [user, setuser] = useState();
  const [Data, setData] = useState();
  const [StartLoading, setStartLoading] = useState(true);
  const [Category, setCategory] = useState();
  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email1 from AsyncStorage:', error);
    }
  };

  // useEffect(() => {
  //   // getCategory();
  getEmailFromStorage();
  //   // myDatafetch();
  //   // getProfile();
  //   // getName();
  // }, []);
  useEffect(() => {
    fetchuserdata();
  }, [content]);
  const getCategory = async () => {
    try {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
      console.log('my category is', category);
    } catch (error) {
      console.error('Error getting category from AsyncStorage:', error);
    }
  };
  const [Name, setName] = useState();
  const [Profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const fetchuserdata = async () => {
    console.log('user data fetching starts now');
    if (Category === 'business') {
      try {
        const querySnapshot = await firestore()
          .collection('BusinessPerson')
          .doc(user) // Fixed the indentation and moved .doc(user) to the correct position
          .get();

        const data = querySnapshot.data(); // Use querySnapshot.data() to get the document data directly

        // Check if data is defined
        if (data) {
          console.log('asli data', data);
          setStartLoading(false);
          setData(data);
          console.log(' getch data is', data);
        } else {
          console.log('No document found yar.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (Category == 'jobseeker') {
      try {
        const querySnapshot = await firestore()
          .collection('JobSeekerData')
          .doc(user) // Fixed the indentation and moved .doc(user) to the correct position
          .get();

        const data = querySnapshot.data(); // Use querySnapshot.data() to get the document data directly

        // Check if data is defined
        if (data) {
          setStartLoading(false);
          setData(data);
        } else {
          console.log('No document found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (Category == 'student') {
      try {
        const querySnapshot = await firestore()
          .collection('StudentData')
          .doc(user) // Fixed the indentation and moved .doc(user) to the correct position
          .get();

        const data = querySnapshot.data(); // Use querySnapshot.data() to get the document data directly

        // Check if data is defined
        if (data) {
          setStartLoading(false);
          setData(data);
        } else {
          console.log('No document found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (Category == 'other') {
      try {
        const querySnapshot = await firestore()
          .collection('OtherData')
          .doc(user) // Fixed the indentation and moved .doc(user) to the correct position
          .get();

        const data = querySnapshot.data(); // Use querySnapshot.data() to get the document data directly

        // Check if data is defined
        if (data) {
          setStartLoading(false);
          setData(data);
        } else {
          console.log('No document found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  const fetchData = async () => {
    console.log('posts data coming');
    try {
      const querySnapshot = await firestore().collectionGroup('Posts').get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setIsLoading(false);

        setPostData(data);
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    
    }, [Comment]),
    );
  const Register = async () => {
    if (content == '') {
      setclr({bgclr: 'red'});
      setError(true);
    }
    if (content !== '') {
      if (Category1 === 'business') {
        setLoading(true);
        await firestore()
          .collection('BusinessPerson')
          .doc(user)
          .collection('Posts')
          .doc()
          .set({
            Content: content,
            Profile: Profile,
            Userid: user,
            Time:formattedTime,
            Name: Name,
            Comments: CommentList,
            Category:Category1
          });
        setIsLoading(false);
      }
      if (Category1 == 'jobseeker') {
        setLoading(true);
        await firestore()
          .collection('JobSeekerData')
          .doc(user)
          .collection('Posts')
          .doc()

          .set({
            Content: content,
            Userid: user,
            Time:formattedTime,
            Profile: Profile,
            Name: Name,
            Comments: CommentList,
            // ... (rest of the data)
          });
        setIsLoading(false);
      }

      if (Category1 == 'student') {
        setLoading(true);
        await firestore()
          .collection('StudentData')
          .doc(user)
          .collection('Posts')
          .doc()

          .set({
            Profile: Profile,
            Name: Name,
            Content: content,
            Userid: user,

            Time:formattedTime,
            Comments: CommentList,
            // ... (rest of the data)
          });
        setIsLoading(false);
      }

      if (Category == 'other') {
        setLoading(true);
        await firestore()
          .collection('OtherData')
          .doc(user)
          .collection('Posts')
          .doc()

          .set({
            Content: content,
            Profile: Profile,
            Name: Name,
            Comments: CommentList,
            Time:formattedTime,
            // ... (rest of the data)
          });
        setIsLoading(false);
      }
      setLoading(false);
      console.log('end of process');
      // try {

      // //   await firestore()
      // // .collection('UserPoster')
      // // .doc(user)
      // // .collection('Posts')
      // // .doc()

      // //     .set({

      // //       Content:content,

      // //       Profile:Profile,
      // //       Name:Name,
      // //       Comments:Comment
      // //       // ... (rest of the data)
      // //     });

      //     setLoading(false);
      // } catch (error) {
      //   setLoading(false);

      //   console.log('Error addinfsf product:', error);
      //   // Handle any error that might occur during the process
      // }
      await fetchData();
      setContent('');
      setIsDialogVisible(false);
    }
  };

 



  const [clr, setclr] = useState({bgclr: myTheme.colors.primary});
  const [error, setError] = useState();
  const [CommentList, setCommentList] = useState([]);

  useEffect(() => {
    setError(false);

    // Check for non-empty fields and update error state
    if (content != '') {
      // console.log('sfgs');
      setError(false);
      setclr({bgclr: 'green'});
    } else {
      // console.log('nhi');
      setError(true);
    }
  }, [content, error]); // Include all relevant dependencies

  useEffect(() => {
    if (Comment && Comment.trim() === '') {
      setCommentDisabler(true);
      console.log('trim');
    }
  }, [Comment, CommentDisabler]); // Include all relevant dependencies

  const [Loading, setLoading] = useState(false);

  const [PostData, setPostData] = useState([]);

  const Sharebtn = async item => {
    Share.share({
      message: `  Post By: ${item.Name}\n Post: ${item.Content}`,
    })
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log(`Shared via ${result.activityType}`);
          } else {
            console.log('Shared successfully');
          }
        } else if (result.action === Share.dismissedAction) {
          console.log('Share dismissed');
        }
      })
      .catch(error => {
        console.error('Error sharing:', error.message);
      });
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: "space-between",
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginRight: 12,
            borderRadius: 60,
          }}>
          <Image source={{uri: item.Profile}} style={{width: 50, height: 50}} />
        </View>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:270}}>
        <Text style={{color: myTheme.colors.primary, fontWeight: 'bold'}}>
          {item.Name}
        </Text>

        <Text style={{color: 'gray', fontWeight: 'normal',fontSize:10}}>
          {item.Time}
        </Text>
        </View>
        
        
      </View>
      <Text style={{color: 'black', margin: 12, width: '95%'}}>
        {' '}
        {item.Content}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => handlePresentModal(item)}
          style={{
            borderRadius: 5,
            paddingHorizontal: 16,
            paddingVertical: 7,
            backgroundColor: 'lightgray',
            margin: 12,
          }}>
          <Text style={{color: myTheme.colors.primary}}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Sharebtn(item)}
          style={{
            borderRadius: 5,
            paddingHorizontal: 16,
            paddingVertical: 7,
            backgroundColor: 'lightgray',
            margin: 12,
          }}>
          <Text style={{color: myTheme.colors.primary}}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const [selectedItem, setSelectedItem] = useState();

  const [CommentDisabler, setCommentDisabler] = useState(true);
  const myDatafetch1 = async () => {
    console.log('datafetch ke andr');
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
      console.log('email is', storedEmail);

      const meradata = await AllData.find(data => data.id === storedEmail);

      setData(meradata);
      setProfile(meradata.Profile);
      setName(meradata.Name);
      setCategory1(meradata.Category);
console.log('yehi to ha',meradata.Category)
      // console.log('profile data is ', mydata);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  }


  const myDatafetch = async (item) => {
    console.log('datafetch ke andr');
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
      console.log('email is', storedEmail);
      console.log('Sara Data', AllData);
console.log('post wale ki id', item.Userid)
      const mydata = await AllData.find(data => data.id === item.Userid);
      const meradata = await AllData.find(data => data.id === storedEmail);

      setData(mydata);
      setProfile(meradata.Profile);
      setName(meradata.Name);
      
      setCategory(mydata.Category);
console.log('yehi to ha',mydata.Category)
      // console.log('profile data is ', mydata);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };

  console.log('select hua WA COMMENT KA DATA', selectedItem);
  const UpdateComments = async (item) => {
    console.log('comments');
    if (Comment && Comment.trim() === '') {
      setCommentDisabler(true);
      console.log('trmmig');
    }

    if (Comment && Comment.trim() !== '') {

      const updatedComments = [...selectedItem.Comments];

      // Add the new comment to the list
      updatedComments.push({
        Profile: Profile,
        Name: Name,
        text: Comment,
      });
    
      // Update the comment list
      
      setCommentList(updatedComments);
      console.log('list',CommentList)
      // const particularpost = await PostData.find(data => data.id === item.id);
      // console.log('respected post is',particularpost)
      // setCommentList(particularpost.Comments)
      // // setCommentDisabler(false);
      // const newComment = {
      //   Profile: Profile,
      //   Name: Name,
      //   // Assuming you want to store the comment text and other relevant data
      //   text: Comment,
      //   // Add other properties as needed
      // };

      // // Update CommentList with the new comment
      // setCommentList(prevComments => [...prevComments, newComment]);
// console.log(CommentList)
      // Reset the comment input

      if (Category === 'business') {
        setLoading(true);
        await firestore()
          .collection('BusinessPerson')
          .doc(item.Userid)
          .collection('Posts')
          .doc(item.id)

          .update({
            Comments: updatedComments,
            // ... (rest of the data)
          });
        // setIsLoading(false);
      }
      if (Category == 'jobseeker') {
        setLoading(true);
        await firestore()
          .collection('JobSeekerData')
          .doc(item.Userid)
          .collection('Posts')
          .doc(item.id)

          .update({
            Comments: updatedComments,
            // ... (rest of the data)
          });
        // setIsLoading(false);
      }

      if (Category == 'student') {
        console.log('saa',item)
        console.log('ba',selectedItem)
        setLoading(true);
        await firestore()
          .collection('StudentData')
          .doc(selectedItem.Userid)
          .collection('Posts')
          .doc(item.id)

          .update({
            Comments: updatedComments,
            // ... (rest of the data)
          });


        // setIsLoading(false);
      }

      if (Category == 'other') {
        setLoading(true);
        await firestore()
          .collection('OtherData')
          .doc(item.Userid)
          .collection('Posts')
          .doc(item.id)

          .update({
            Comments: updatedComments,
            // ... (rest of the data)
          });
        setIsLoading(false);
      }
      await fetchData();
      setComment('');
      // bottomSheetRef.current?.close();
      // setIsOpen(false);
      // console.log(CommentList)

      // if (content !== '') {
      //   if (Category === 'business') {
      //     setLoading(true);
      //     await firestore()
      //       .collection('BusinessPerson')
      //       .doc(user)
      //       .collection('Posts')
      //       .doc()

      //       .update({
      //         Content: content,
      //         Profile: Profile,
      //         Name: Name,
      //         Comments: CommentList,
      //         // ... (rest of the data)
      //       });
      //     setIsLoading(false);
      //   }

      //   if (Category == 'jobseeker') {
      //     setLoading(true);
      //     await firestore()
      //       .collection('JobSeekerData')
      //       .doc(user)
      //       .collection('Posts')
      //       .doc()

      //       .set({
      //         Content: content,
      //         Profile: Profile,
      //         Name: Name,
      //         Comments: Comment,
      //         // ... (rest of the data)
      //       });
      //     setIsLoading(false);
      //   }

      //   if (Category == 'student') {
      //     setLoading(true);
      //     await firestore()
      //       .collection('StudentData')
      //       .doc(user)
      //       .collection('Posts')
      //       .doc()

      //       .set({
      //         Profile: Profile,
      //         Name: Name,
      //         Content: content,

      //         Comments: Comment,
      //         // ... (rest of the data)
      //       });
      //     setIsLoading(false);
      //   }

      //   if (Category == 'other') {
      //     setLoading(true);
      //     await firestore()
      //       .collection('OtherData')
      //       .doc(user)
      //       .collection('Posts')
      //       .doc()

      //       .set({
      //         Content: content,
      //         Profile: Profile,
      //         Name: Name,
      //         Comments: Comment,
      //         // ... (rest of the data)
      //       });
      //     setIsLoading(false);
      //   }
      //   setLoading(false);
      //   console.log('end of process');
      //   // try {

      //   // //   await firestore()
      //   // // .collection('UserPoster')
      //   // // .doc(user)
      //   // // .collection('Posts')
      //   // // .doc()

      //   // //     .set({

      //   // //       Content:content,

      //   // //       Profile:Profile,
      //   // //       Name:Name,
      //   // //       Comments:Comment
      //   // //       // ... (rest of the data)
      //   // //     });

      //   //     setLoading(false);
      //   // } catch (error) {
      //   //   setLoading(false);

      //   //   console.log('Error addinfsf product:', error);
      //   //   // Handle any error that might occur during the process
      //   // }

      //   setComment('');
      // }
    }
  };

  // console.log(CommentList)
  const renderCard = ({item}) => (
    <View style={{ backgroundColor: 'lightgray',borderRadius:20,padding:12,alignSelf:"center",marginVertical:6,width:'100%'}}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: "space-between",
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginRight: 12,
            borderRadius: 60,
          }}>
          <Image source={{uri: item.Profile}} style={{width: 50, height: 50}} />
        </View>

        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: myTheme.colors.primary, fontWeight: 'bold'}}>
            {item.Name}
          </Text>
          <Text style={{color: 'black', }}>
            {item.text}
          </Text>
        </View>
      </View>
    </View>
  );

  const [Comment, setComment] = useState();
  return (
    <GestureHandlerRootView style={{flex: 1, height: '100%'}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: myTheme.colors.background,
        }}>
        {/* Main Page Heading */}
        <View
          style={{
            width: '100%',
            height: 50,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              backgroundColor: myTheme.colors.primary,
              color: '#fff',
              textAlign: 'center',
              paddingBottom: 8,
            }}>
            Posts
          </Text>
        </View>

        <TouchableOpacity
          style={styles.create_post_btn}
          onPress={() => setIsDialogVisible(true)}>
          <Text style={{color:myTheme.colors.primary,fontWeight:"bold"}}>Create Post</Text>
        </TouchableOpacity>

        <Portal>
          <Dialog
            style={{
              backgroundColor: '#fff',
            }}
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>Post Details</Dialog.Title>
            <Dialog.Content
              style={{
                width: '100%',
                height: 250,
              }}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                style={{
                  height: 150,
                  textAlignVertical: 'top',
                  backgroundColor: '#ddd',
                  marginTop: 8,
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  color: 'black',
                  borderRadius: 8,
                  borderColor: myTheme.colors.primary,
                  borderWidth: 1,
                }}
                placeholder="Write post"
                value={content}
                placeholderTextColor="gray"
                onChangeText={setContent}
              />
              <Pressable
                style={{
                  borderRadius: 8,
                  padding: 8,
                  bottom: -10,
                  alignItems: 'center',
                  width: '30%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: clr.bgclr,
                }}
                // disabled ={true}
                onPress={Register}
                // Disable the button while loading
              >
                {Loading ? (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{alignSelf: 'center'}}
                  />
                ) : (
                  <Text style={{color: 'white', fontSize: 16}}>Post</Text>
                )}
              </Pressable>
            </Dialog.Content>
          </Dialog>
        </Portal>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="red"
            style={{alignSelf: 'center'}}
          />
        ) : (
          <FlatList
            data={PostData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </ScrollView>


      <Modal
        isVisible={RideTypeModal}
        onBackdropPress={RideTypeSelector}
        backdropColor="rgba(0, 0, 0, 0.5)" // Transparent black background color
        animationIn="slideInUp"
        animationOut="slideOutDown">
       <View style={{ flex: 1, alignItems: 'center',backgroundColor: 'white',  padding: 10,borderRadius:12,height:500}}>
    <View style={{ backgroundColor: 'white', padding: 10 ,flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
    <MaterialIcons name="close" size={18} color={'transparent'} />

        <Text style={{ color: 'black' }}>Comments</Text>
        <TouchableOpacity onPress={()=>setRideTypeModal(!RideTypeModal)}>
        <MaterialIcons name="close" size={18} color={'black'} />

        </TouchableOpacity>
        
      </View>

      <View style={{ flex: 1, width: '100%' ,height:'100%'}}>
        <FlatList style={{height:'100%'}}
          data={selectedItem ? selectedItem.Comments : []}
          renderItem={renderCard}
          showsVerticalScrollIndicator={true}
          ref={flatListRef}
          // other props
          // onScroll={(event) => {
          //   const offsetY = event.nativeEvent.contentOffset.y;
          //   if (offsetY === 0) {
          //     bottomSheetModalRef.current?.dismiss();
          //   }
          // }}
        />
      </View>

      <View style={{ backgroundColor: 'white', paddingBottom: 20 }}>
        <TextInput
          multiline={true}
          style={{
            height: 45,
            backgroundColor: 'lightgray',
            // margin: 14,
            width: 330,
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: 'black',
            borderRadius: 20,
            borderColor: myTheme.colors.primary,
            borderWidth: 1,
          }}
          placeholder="Add Comment"
          value={Comment}
          placeholderTextColor="gray"
          onChangeText={setComment}
        />

        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginHorizontal: 14 }}
          onPress={() => UpdateComments(selectedItem)}
        >
          <Text style={{ color: myTheme.colors.primary }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
      </Modal>
      <BottomSheetModalProvider>
  <BottomSheetModal
    ref={bottomSheetModalRef}
    index={1}
    snapPoints={snapPoints}
    item={selectedItem}
    backgroundStyle={{
      borderRadius: 20,
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor:"green",borderWidth:1,
      flex: 1,
    }}
    
    gestureEnabled={false}
    // onDismiss={() => setIsOpen(false)}
  >
    <View style={{ flex: 1, alignItems: 'center' }}>
    <View style={{ backgroundColor: 'white', padding: 10 }}>
        <Text style={{ color: 'black' }}>Comments</Text>
      </View>

      <View style={{ flex: 1, width: '100%' ,height:'100%'}}>
        <FlatList style={{height:'100%'}}
          data={selectedItem ? selectedItem.Comments : []}
          renderItem={renderCard}
          showsVerticalScrollIndicator={true}
          ref={flatListRef}
          // other props
          // onScroll={(event) => {
          //   const offsetY = event.nativeEvent.contentOffset.y;
          //   if (offsetY === 0) {
          //     bottomSheetModalRef.current?.dismiss();
          //   }
          // }}
        />
      </View>

      <View style={{ backgroundColor: 'white', paddingBottom: 20 }}>
        <TextInput
          multiline={true}
          style={{
            height: 45,
            backgroundColor: 'lightgray',
            margin: 14,
            width: windowWidth - 10,
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: 'black',
            borderRadius: 20,
            borderColor: myTheme.colors.primary,
            borderWidth: 1,
          }}
          placeholder="Add Comment"
          value={Comment}
          placeholderTextColor="gray"
          onChangeText={setComment}
        />

        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginHorizontal: 14 }}
          onPress={() => UpdateComments(selectedItem)}
        >
          <Text style={{ color: myTheme.colors.primary }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  </BottomSheetModal>
</BottomSheetModalProvider>

    </GestureHandlerRootView>
  );
};

export default PostPage;

const styles = StyleSheet.create({
  create_post_btn: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  card: {
    backgroundColor: '#ddd',
    padding: 5,
    margin: 12,
    borderRadius: 16,
  },
  btn: {
    marginHorizontal: 16,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
});
