import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
    FlatList,
  } from 'react-native';
  import {Icon, Text} from 'react-native-paper';
  import React, {useState, useEffect} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import CustomButton from '../../Components/CustomButton';
  import CustomDropDown from '../../Components/CustomDropDown';
  import CustomTextInput from '../../Components/CustomTextInput';
  import BackButton from '../../Components/BackButton/BackButton';
  import Map from '../../Components/Map/Map';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
  const Report = () => {
    const [user, setuser] = useState();
    const [message, setMessage] = useState('');
    const [Reason,setreason]= useState('')
const [ReportCategory,setReportCategory] = useState('')
const [selectedImage, setSelectedImage] = useState(null);
    const [subject, setSubject] = useState('');
    const [Loading, setLoading] = useState();
    const [isLoading, setIsLoading] = useState();
    const [ismessageEmpty, setIsmessageEmpty] = useState(false);
    const [Contact, setContact] = useState([]);
    const [Disabler, setDisabler] = useState(false);
    const main = '#197739'
const [selectedImage1, setSelectedImage1] = useState(null);
const [ActiveReports,setActiveReports]=useState()
    const navigation = useNavigation();
    useEffect(() => {
      getEmailFromStorage();
  
      fetchdata();
      // getProfile();
      // getName();
    }, []);
    const getEmailFromStorage = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userName');
        setuser(storedEmail);
      } catch (error) {
        console.error('Error getting email from AsyncStorage:', error);
      }
    };
  

  
    const fetchdata = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('Report')
          .get();
        
        const data = querySnapshot.docs.map(doc => doc.data()); // Extract data from each document
    
        // Check if data is defined and not empty
        if (data.length > 0) {
          console.log('asli data', data);
          const myat = (data.filter(item => item?.User === user) && data.filter(item => item?.Status === 'Active')); // Filter data based on the user
          console.log('why by ', myat);
          setActiveReports(myat);
        } else {
          console.log('No documents found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Ensure loading state is updated regardless of success or error
      }
    };
    
    const Submit = async () => {
        
      if (Reason == '' || ReportCategory == '' || selectedImage == null  ) {
        Alert.alert('Please Complete Information');
      }
  
      if (Reason != '' && ReportCategory != '' && selectedImage !=null) {
        setLoading(true);
        const reference = storage().ref(selectedImage1.assets[0].fileName);
        const pathToFile = selectedImage;
        await reference.putFile(pathToFile);
        const url = await reference.getDownloadURL();
      
        setDisabler(true);
        await firestore()
          .collection('Report')
          .doc()
  
          .set({
            Reason: Reason,
            ReportCategory: ReportCategory,
            User :user,
            Screenshot: url,
            Status:"Active"
            // ... (rest of the data)
          });

        setLoading(false);
        Alert.alert('Report Submitted')
        setDisabler(false);
         await fetchdata()
        // navigation.navigate('home')
      }
    };
    const subjects = ['Subject', 'Enquiry', 'Feedback', 'Suggestion'];
    const ImageSelector = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
        };
    
        launchImageLibrary(options, response => {
          if (response.assets) {
            setSelectedImage(response.assets[0].uri);
            setSelectedImage1(response);
          }
        });
      };
      const Emptier =()=>{
        setSelectedImage(null),
        setSelectedImage1(null)
      }
    const renderItem = ({item,index}) => (
      <View
        style={{
          borderColor: 'gray',
          backgroundColor:"#ddd",
          borderWidth: 0.3,
          width: '90%',
          margin:12,
         
          alignItems:"center",
          alignSelf: 'center',
          padding: 12,
          borderRadius: 7,elevation:4
        }}>
        <Text style={styles.overhead}>{index+1}</Text>
  
  <View style={{flexDirection:"row",alignItems:"center",width:"100%",alignSelf:"center",justifyContent:"space-between"}}>
<View style ={{alignItems:"center"}}>

<Text style={{...styles.overhead,fontWeight:"bold"}}>Category</Text>
<Text style={{...styles.text, marginHorizontal: 12}}>
          {item.ReportCategory}
        </Text>
</View>

<View style ={{alignItems:"center"}}>

<Text style={{...styles.overhead,fontWeight:"bold"}}>Reason</Text>
<Text style={styles.overhead}>{item.Reason}</Text>
</View>
     
  

  </View>
     

      </View>
    );
    return (
      <ScrollView>
        <BackButton label="Report a Problem" />
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <View style={styles.contactus_form}>
            <Text style={styles.heading}>Reason for Report</Text>
  
            <CustomTextInput
              setError={setIsmessageEmpty}
              required={true}
              error={ismessageEmpty}
              value={Reason}
              multiline = {true}
              onChange={setreason}
              label="Reason"
            />
              <Text style={styles.heading}>Report Category</Text>
            <CustomTextInput
              setError={setIsmessageEmpty}
              required={true}
              error={ismessageEmpty}
              value={ReportCategory}
              onChange={setReportCategory}
              label="Category such as POST , PERSON , CONTENT"
            />
            
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={styles.heading}>Screenshot</Text>
{selectedImage!=null && <TouchableOpacity
onPress={Emptier}
 style={{marginLeft:12, alignItems:"center", justifyContent:"center", borderRadius:5,flexDirection:"row",borderColor:main,borderWidth:0.7,padding:4,width:100,}}>


<Text style={{color:main,marginRight:5,fontSize:10}}>Image Selected</Text>
<MaterialIcons name="close" size={14} color={main} />

</TouchableOpacity>}


                
              </View>
         
              <TouchableOpacity
onPress={ImageSelector}
// onPress={BusinessSelector}
style={{padding:12,borderWidth:1,width:"90%",borderColor:'gray',marginTop:20,marginLeft:20,borderRadius:7,alignItems:"center",justifyContent:"center"}}>
  <Text style={{color:main}}>Select Image *</Text>
 
</TouchableOpacity>
          </View>
     
        </View>
        <TouchableOpacity
          disabled={Disabler}
          activeOpacity={0.6}
          style={styles.create_post_btn}
          onPress={Submit}>
          {Loading ? (
            <ActivityIndicator
              size="small"
              color="white"
              style={{alignSelf: 'center'}}
            />
          ) : (
            <Text style={{color: 'white', fontSize: 18}}>Submit</Text>
          )}
        </TouchableOpacity>

        <Text style={{...styles.heading,margin:12,color:"green",fontWeight:"bold"}}>Active Reports:</Text>

        <FlatList
          data={ActiveReports}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()}
        /> 
        
{/*   
  <Text style={{color:"black", fontSize:17,fontWeight:'bold',marginHorizontal:12}}> You can also Contact us at:</Text>
        <FlatList
          data={[Contact]}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()}
        /> */}
      </ScrollView>
    );
  };
  
  export default Report;
  
  const styles = StyleSheet.create({
    heading: {
      flex: 0.1,
      fontSize: 18,
      textAlign: 'left',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      color: 'green',
      marginVertical: 8,
    },
  
    container: {
      flex: 1,
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 12,
      marginHorizontal: 12,
      borderWidth: 0.8,
      borderColor: 'gray',
      opacity: 2,
      shadowRadius: 3,
      alignSelf: 'center',
      marginBottom: 16,
    },
    heading: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'normal',
    },
    text: {
      color: 'black',
    },
    overhead: {
      color: 'black',
      fontSize: 14,

    },
    map_container: {
      height: 200,
      backgroundColor: 'gray',
      marginVertical: 8,
    },
    contactus_form: {
      flex: 0.6,
    },
    create_post_btn: {
      marginTop: 50,
      padding: 14,
      borderRadius: 12,
      width: '70%',marginBottom:30,
      alignSelf: 'center',
      // marginHorizontal: 16,
      
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  