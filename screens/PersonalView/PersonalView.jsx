import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,Linking,
  FlatList,
  TouchableOpacity,
  Image,Share,
  StyleSheet,
} from 'react-native';
import {myTheme} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { SafeAreaView } from 'react-native-safe-area-context';

const PersonalView = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState();
  const {Data} = route.params;
  console.log('my id is',Data.id)
const [PostData,setPostData]= useState()
  console.log('userkadata', Data);





   const getpostdata = async()=>{
    console.log('posts data coming');
    try {
      const querySnapshot = await firestore().collectionGroup('Posts').get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        console.log('all posts',data)
const mypost =  await data?.find(data => data?.Userid === Data?.id);
console.log('my posts are',mypost)

if (mypost!=undefined){
  setPostData([mypost])

}
        // setPostData(data);
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  //

  const ShareBtn = async (item) => {
    Share.share({
      message: `Profile Name: ${item.Name}\n Category: ${item.Profession} \n Location: ${item.Address}  `,
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


  const Facebook = async (item) => {
    // Define a function to validate URL
    const isValidURL = (url) => {
      // Regular expression for URL validation
      const urlRegex = new RegExp(
        '^(https?:\\/\\/)?' + // Protocol
        '(([\\da-z.-]+)\\.([a-z.]{2,6}))' + // Domain name and extension
        '(\\:[0-9]{1,5})?' + // Port
        '(\\/.*)?' // Path
      );
      return urlRegex.test(url);
    };
  
    try {
      // Check if item.Facebook is a valid URL
      if (isValidURL(item.Facebook)) {
        // If valid, open the link using Linking.openURL
        await Linking.openURL(item.Facebook);
        console.log('Facebook link opened successfully.');
      } else {
        console.log('Invalid Facebook link:', item.Facebook);
      }
    } catch (error) {
      console.error('Error opening Facebook link:', error);
    }
  };

  const Instagram = async (item) => {
    // Define a function to validate URL
    const isValidURL = (url) => {
      // Regular expression for URL validation
      const urlRegex = new RegExp(
        '^(https?:\\/\\/)?' + // Protocol
        '(([\\da-z.-]+)\\.([a-z.]{2,6}))' + // Domain name and extension
        '(\\:[0-9]{1,5})?' + // Port
        '(\\/.*)?' // Path
      );
      return urlRegex.test(url);
    };
  
    try {
      // Check if item.Facebook is a valid URL
      if (isValidURL(item.Instagram)) {
        // If valid, open the link using Linking.openURL
        await Linking.openURL(item.Instagram);
        console.log('Instagram link opened successfully.');
      } else {
        console.log('Invalid Instagram link:', item.Instagram);
      }
    } catch (error) {
      console.error('Error opening Instagram link:', error);
    }
  };

  const Linkedin = async (item) => {
    // Define a function to validate URL
    const isValidURL = (url) => {
      // Regular expression for URL validation
      const urlRegex = new RegExp(
        '^(https?:\\/\\/)?' + // Protocol
        '(([\\da-z.-]+)\\.([a-z.]{2,6}))' + // Domain name and extension
        '(\\:[0-9]{1,5})?' + // Port
        '(\\/.*)?' // Path
      );
      return urlRegex.test(url);
    };
  
    try {
      // Check if item.Facebook is a valid URL
      if (isValidURL(item.Linkedin)) {
        // If valid, open the link using Linking.openURL
        await Linking.openURL(item.Linkedin);
        console.log('Linkedin link opened successfully.');
      } else {
        console.log('Invalid Linkedin link:', item.Linkedin);
      }
    } catch (error) {
      console.error('Error opening Linkedin link:', error);
    }
  };

  const Twitter = async (item) => {
    // Define a function to validate URL
    const isValidURL = (url) => {
      // Regular expression for URL validation
      const urlRegex = new RegExp(
        '^(https?:\\/\\/)?' + // Protocol
        '(([\\da-z.-]+)\\.([a-z.]{2,6}))' + // Domain name and extension
        '(\\:[0-9]{1,5})?' + // Port
        '(\\/.*)?' // Path
      );
      return urlRegex.test(url);
    };
  
    try {
      // Check if item.Facebook is a valid URL
      if (isValidURL(item.Twitter)) {
        // If valid, open the link using Linking.openURL
        await Linking.openURL(item.Twitter);
        console.log('Twitter link opened successfully.');
      } else {
        console.log('Invalid Twitter link:', item.Twitter);
      }
    } catch (error) {
      console.error('Error opening Twitter link:', error);
    }
  };


  const renderItempost = ({item,index}) => (
    <View style={{ backgroundColor: '#eee',
    padding: 5,
    width:"100%",alignSelf:"center",
    margin: 12,borderColor:'black',borderWidth:1,
    borderRadius: 5,}}>

  
      <Text style={{color: 'gray', margin: 12, width: '95%'}}>
        POST {index+1}
   </Text>

      <Text style={{color: 'black', margin: 12, width: '95%'}}>
        {' '}
        {item?.Content}
      </Text>

    
    </View>
  );


  const renderItem1 = ({item}) => (
    <View
      style={{
        borderRadius: 15,
        // borderWidth: 0.5,
        // backgroundColor: '#ddd',
        // borderColor: '#ddd',
        // height: 60,
        margin: 12,
        padding: 12,
      }}
      onPress={() => navigation.navigate('News')}>
         <View style={styles.img_container}>
      
          <Image source={{uri: item.Profile}} style={styles.img} />
      
      </View>
      <View style={{flexDirection:'row',alignItems:"center",alignSelf:"center"}}>
      <Text style={styles.title}>{item.Name}</Text>
      <Text style={styles.title}> {item.Surname}</Text>
      </View>
      <Text style={{...styles.text, alignSelf:"center"}}>
      {item.Profession}
      </Text>
      <Text style={{...styles.text, alignSelf:"center"}}>
      {item.City}
      </Text>





      <Text style={styles.title2}>About Me</Text>

{/* {item.Bio!='' &&      <Text style={{...styles.text, alignSelf:"center"}}>
      {item.Bio}
      </Text>  } */}

      {item.AboutMe!='' &&      <Text style={{...styles.text,}}>
      {item.AboutMe}
      </Text>  }


      <Text style={{...styles.text,fontSize:17}}>Posts:   {PostData?.length ?? 0}</Text>

  


  <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between",margin:20}}>

<TouchableOpacity

onPress={()=>ShareBtn(item)}
>
<MaterialIcons name="share" size={23} color={'black'} />
</TouchableOpacity>

<TouchableOpacity onPress={()=>Facebook(item)}>
<MaterialIcons name="facebook" size={23} color={'black'} />
</TouchableOpacity>

<TouchableOpacity onPress={()=>Twitter(item)}>
<MaterialIcons name="twitter" size={23} color={'black'} />
</TouchableOpacity>

<TouchableOpacity onPress={()=>Instagram(item)}>
<MaterialIcons name="instagram" size={23} color={'black'} />
</TouchableOpacity>

<TouchableOpacity onPress={()=>Linkedin(item)}>
<MaterialIcons name="linkedin" size={23} color={'black'} />
</TouchableOpacity>

<TouchableOpacity onPress={()=>Chater(item)}>
<MaterialIcons name="chat" size={23} color={'black'} />
</TouchableOpacity>
  </View>

  <Text style={styles.title2}>Recent Posts</Text>

<View>
  {PostData && PostData.length > 0 && PostData !== undefined ? (
    <FlatList
      data={PostData}
      renderItem={renderItempost}
      keyExtractor={item => item?.id?.toString()}
    />
  ) : (
    <Text style={{color:'green',alignSelf:"center",marginVertical:30}}>No posts.</Text>
  )}
</View>

      <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Father Name</Text>
      <Text style={styles.text}>{item.FatherName}</Text>
      </View>


      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Mother Name</Text>

     <Text style={styles.text}>
  {item.MotherName ? item.MotherName : '-'}
</Text>

      </View>

     </View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Grand Father Name(Dada)</Text>
      <Text style={styles.text}>{item.GrandFatherName}</Text>
      </View>


      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Grand Father Name(Nana)</Text>

     <Text style={styles.text}>
 {item.Nana}
</Text>

      </View>

     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Gender</Text>
      <Text style={styles.text}>{item.Gender}</Text>
      </View>


      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Date of Birth</Text>

     <Text style={styles.text}>
 {item.Dob}
</Text>

      </View>

     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Marital Status:</Text>
      <Text style={styles.text}>{item.MaritalStatus}</Text>
      </View>


      {item.MaritalStatus !== 'unmarried' && (
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Partner Name</Text>
<Text style={styles.text}>
{item.PartnerName ? item.PartnerName : '-'}
</Text>

  </View>
)}


     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Country</Text>
      <Text style={styles.text}>{item.Country}</Text>
      </View>


     
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>State</Text>
<Text style={styles.text}>
{item.State}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>City</Text>
      <Text style={styles.text}>{item.City}</Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>District</Text>
<Text style={styles.text}>
{item.District}
</Text>

  </View>



     </View>

     
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Address</Text>
      <Text style={styles.text}>
      {item.Address ? item.Address : '-'}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Postal Code</Text>
<Text style={styles.text}>
{item.PostalCode}
</Text>

  </View>



     </View>
     

     <Text style={styles.title}>Further Details</Text>
     {item.Category === 'jobseeker' && (
     <View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>About me</Text>
      <Text style={styles.text}>
      {item.AboutMe}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Educational Qualification</Text>
<Text style={styles.text}>
{item.Education}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Profession</Text>
      <Text style={styles.text}>
      {item.Profession}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Skills</Text>
<Text style={styles.text}>
{item.Skills}
</Text>

  </View>



     </View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Salary Expectation</Text>
      <Text style={styles.text}>
      {item.Salary}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Joining Details</Text>
<Text style={styles.text}>
{item.Join}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Experience</Text>
      <Text style={styles.text}>
      {item.Experience}
      </Text>
      </View>

      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Last Company Info</Text>
      <Text style={styles.text}>
      {item.LastCompanyName}
      </Text>
      </View>


    
  



     </View>
     </View>
     )}



{item.Category === 'business' && (
     <View>
 <Text style={{color:"red",alignSelf:"center"}}>(Data is available on Business Listed)</Text>
     </View>
     )}



{item.Category === 'student' && (
     <View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Degree</Text>
      <Text style={styles.text}>
      {item.Degree}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Degree Year</Text>
<Text style={styles.text}>
{item.Degreeyear}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Board</Text>
      <Text style={styles.text}>
      {item.Board}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Medium</Text>
<Text style={styles.text}>
{item.Medium}
</Text>

  </View>



     </View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>School/College Name</Text>
      <Text style={styles.text}>
      {item.SchoolName}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Achievements</Text>
<Text style={styles.text}>
{item.Achievement? item.Achievement: '-' }
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',alignSelf:"centeras"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Ambition</Text>
      <Text style={styles.text}>
      {item.Ambition}
      </Text>
      </View>


    
  



     </View>
     </View>
     )}

{item.Category === 'other' && (
     <View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>About Me</Text>
      <Text style={styles.text}>
      {item.AboutMe}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Educational Qualification</Text>
<Text style={styles.text}>
{item.Education}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Profession</Text>
      <Text style={styles.text}>
      {item.Profession}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>School/College Name</Text>
<Text style={styles.text}>
{item.SchoolName}
</Text>

  </View>



     </View>


     </View>
     )}
    </View>
  );


  const [UserProfile,setUserProfile] = useState()
  const UserDataGetter =async()=>{
    const mydata = await AsyncStorage.getItem('UserData')
    const userData = JSON.parse(mydata);
    console.log('my data ',(userData.Profile))
    setUserProfile(userData.Profile)
  }

  console.log('my profile is',UserProfile)

  useEffect (()=>{
    getpostdata()
    UserDataGetter()
  },[Data])

  const Chater =(item)=>{
    navigation.navigate('singleChat',{
      id:item.id,
      Profile:item.Profile,
      Name:item.Name,
      UserProfile:UserProfile,
    })
      }
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center', marginTop: 300}}
        />
      ) : (
        <View style={{flex:1}}> 

          <TouchableOpacity onPress={()=>navigation.goBack()} style={{margin:12}}>
<MaterialIcons name="arrow-left" size={23} color={'black'} />
            
          </TouchableOpacity>

          <FlatList
            data={[Data]}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  head:{
   fontSize: 13,
        color: 'black',alignSelf:"center",
      
        fontWeight:'bold',
        textAlign: 'justify',
        // flexBasis : "68%",
        justifyContent: 'center',
        alignItems: 'center'
  },
  img_container: {
    alignSelf:"center",alignItems:"center",justifyContent:"center",
    width: 160,
    height: 180,
    overflow: 'hidden',
    borderRadius: 160,
  },
  text:{
color:"black",marginBottom:12
  },
  title: {
    fontSize: 28,
    color: 'black',
    // marginVertical:12,
    fontWeight:'bold',
    alignSelf:"center",
    textAlign: 'justify',
    // flexBasis : "68%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  title2: {
    fontSize: 23,
    color: 'black',
    // marginVertical:12,
    fontWeight:'bold',
    textAlign: 'justify',
    // flexBasis : "68%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 160,alignSelf:"center",borderRadius:160,
    height: 160
    // resizeMode: 'contain',
  },
  searchInput: {
    margin: 16,
    borderColor: myTheme.colors.primary,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 32,
    color: 'black',
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

export default PersonalView;
