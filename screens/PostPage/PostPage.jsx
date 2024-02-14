import {
  ScrollView,
  StyleSheet,Share,
  Text,Pressable,FlatList,Image,
  TextInput,
  TouchableOpacity,ActivityIndicator,
  View,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {myTheme} from '../../theme';
import CustomTextInput from '../../Components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../Components/CustomButton';
import PostCard from '../../Components/PostCard/PostCard';
import {Button, Dialog, Portal} from 'react-native-paper';

const PostPage = (navigation) => {


  const [content, setContent] = useState('');

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isContentEmpty, setIsContentEmpty] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [user,setuser] = useState()
  const[Data,setData] = useState({})
  const [StartLoading,setStartLoading]= useState(true)
const [Category,setCategory] = useState()
useEffect(() => {
  
  getCategory();
  getEmailFromStorage();
  // getProfile();
  // getName();
}, []);
useEffect(() => {
 
 fetchuserdata();

  }, [content]);


useEffect(() => {
 
  console.log('mere andr data ha', Data)
  console.log('name or profile saving starts')

    console.log('iske andr')
  
  setName(Data.Name);

    setProfile(Data.Profile)

console.log(Name ,' and', Profile)
 

  }, [Data,content]);

  const getCategory = async () => {
    try {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
      console.log('my category is', category )
    } catch (error) {
      console.error('Error getting category from AsyncStorage:', error);
    }
  };








  const [Name,setName] = useState()
  const [Profile,setProfile] = useState()



  const [isLoading, setIsLoading] = useState(true);



 const fetchuserdata = async()=>{
 
console.log('user data fetching starts now')
  if (Category === 'business') {
    try {
      const querySnapshot = await firestore()
        .collection('BusinessPerson')
        .doc(user)  // Fixed the indentation and moved .doc(user) to the correct position
        .get();
  
      const data = querySnapshot.data();  // Use querySnapshot.data() to get the document data directly
  
      // Check if data is defined
      if (data) {
        console.log('asli data', data)
        setStartLoading(false);
        setData(data);
        console.log(' getch data is',data)
      } else {
        console.log('No document found yar.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
  
  }

  if (Category == 'jobseeker'){


    try {
      const querySnapshot = await firestore()
        .collection('JobSeekerData')
        .doc(user)  // Fixed the indentation and moved .doc(user) to the correct position
        .get();
  
      const data = querySnapshot.data();  // Use querySnapshot.data() to get the document data directly
  
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

  if (Category == 'student'){

    try {
      const querySnapshot = await firestore()
        .collection('StudentData')
        .doc(user)  // Fixed the indentation and moved .doc(user) to the correct position
        .get();
  
      const data = querySnapshot.data();  // Use querySnapshot.data() to get the document data directly
  
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

  if (Category == 'other'){


    try {
      const querySnapshot = await firestore()
        .collection('OtherData')
        .doc(user)  // Fixed the indentation and moved .doc(user) to the correct position
        .get();
  
      const data = querySnapshot.data();  // Use querySnapshot.data() to get the document data directly
  
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





 } 

  const fetchData = async () => {
   
    console.log('posts data coming')
    try {


      const querySnapshot = await firestore()
        .collectionGroup('Posts')
        .get();
  
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
  useEffect(() => {
  
  
  
    fetchData();
  }, [navigation]);
    
  const Register = async() => {

    if (content == '') {
     setclr({bgclr:'red'})
        setError(true)
    }
        if (content!=='' ) {

          if (Category === 'business') {
            setLoading(true)
            await firestore()
            .collection('BusinessPerson')
            .doc(user)
            .collection('Posts')
            .doc()
              
                .set({
                 
                  Content:content,
           Profile:Profile,
           Name:Name,
                  Comments:Comment
                  // ... (rest of the data)
                });
                setIsLoading(false);
          }

          if (Category == 'jobseeker'){
            setLoading(true)
            await firestore()
            .collection('JobSeekerData')
            .doc(user)
            .collection('Posts')
            .doc()
              
                .set({
                 
                  Content:content,
                  Profile:Profile,
                  Name:Name,
                  Comments:Comment
                  // ... (rest of the data)
                });
                setIsLoading(false);
          }


          if (Category == 'student'){
            setLoading(true)
            await firestore()
            .collection('StudentData')
            .doc(user)
            .collection('Posts')
            .doc()
              
                .set({
                  Profile:Profile,
                  Name:Name,
                  Content:content,
           
                  Comments:Comment
                  // ... (rest of the data)
                });
                setIsLoading(false);
          }


          if (Category == 'other') {
            setLoading(true)
            await firestore()
            .collection('OtherData')
            .doc(user)
            .collection('Posts')
            .doc()
              
                .set({
                 
                  Content:content,
                  Profile:Profile,
                  Name:Name,
                  Comments:Comment
                  // ... (rest of the data)
                });
                setIsLoading(false);
          }
          setLoading(false)
          console.log('end of process')
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
          setContent('')
          setIsDialogVisible(false)
        
        
        
        
          
               
              }
              
  


  };










  const getProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('Profile');
      setProfile(storedProfile);
    } catch (error) {
      console.error('Error getting profile from AsyncStorage:', error);
    }
  };


  const getName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('Name');
      setName(storedName);
      console.log(storedName)
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };


  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };



  const [clr,setclr] = useState({bgclr:myTheme.colors.primary});
const [error,setError] = useState();
const [Comment,setComment] =useState([])

useEffect(() => {
  setError(false);

  // Check for non-empty fields and update error state
  if (content!= '') {
  console.log('sfgs')
  setError(false)
  setclr({bgclr:'green'})
  } else {
    console.log('nhi')
    setError(true);
  }
}, [ content,error]); // Include all relevant dependencies

  
  const [Loading,setLoading] = useState(false);







const[PostData,setPostData] = useState([])

const Sharebtn= async(item)=>{
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
}


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View  style={{
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
      }}>
       <View style={{
          alignItems : "center",
          justifyContent : "center",
          overflow:"hidden",marginRight:12,
          borderRadius:60
        
       }}>
<Image source={{ uri: item.Profile }} style={{ width: 50, height: 50, }} />

     
       </View>
       <Text style={{color : myTheme.colors.primary , fontWeight : "bold"}}>{item.Name}</Text>
     <View>
     
    
     </View>
    
      </View>
      <Text style={{color:"black", margin:12,width:'95%'}}> {item.Content}</Text>


      <TouchableOpacity onPress={()=>Sharebtn(item)}
       style={{borderColor:'black',borderWidth:0.7,borderRadius:5,paddingHorizontal:16,alignSelf:"flex-end",paddingVertical:7,backgroundColor:myTheme.colors.primary,margin:12}}>
        <Text style={{color:"white"}}>Share</Text>
      </TouchableOpacity>
    </View>
  );
  return (
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
        <Text>Create Post</Text>
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
                color:'black',
                borderRadius: 8,
                borderColor: myTheme.colors.primary,
                borderWidth: 1,
              }}
              placeholder="Write post"
              value={content}
              placeholderTextColor='gray'
              onChangeText={setContent}
            />
               <Pressable
  style={{
    borderRadius: 8,
    padding: 8,bottom:-10,
    alignItems: "center",width:'30%',
    alignSelf:'center',
    justifyContent: "center",
    backgroundColor: clr.bgclr,
  }}
  onPress={Register}
   // Disable the button while loading
>
  {Loading ? (
    <ActivityIndicator size="small" color="white" style={{ alignSelf: "center" }} />
  ) : (
    <Text style={{ color: "white", fontSize: 16 }}>Post</Text>
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
        keyExtractor={(item) => item.id.toString()}
      />
      )}
    </ScrollView>
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
  padding:5,
  margin:12,
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
