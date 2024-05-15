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
  
    const fetchdata = async () => {
      const querySnapshot = await firestore()
        .collection('Contact')
        .doc('Admin') // Fixed the indentation and moved .doc(user) to the correct position
        .get();
  
      const data = querySnapshot.data(); // Use querySnapshot.data() to get the document data directly
      try {
        // Check if data is defined
        if (data) {
          console.log('asli data', data);
          setIsLoading(false);
          setContact(data);
          console.log(' getch data is', data);
        } else {
          console.log('No document found yar.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
            Screenshot: url
            // ... (rest of the data)
          });

        setLoading(false);
        Alert.alert('Report Submitted')
        setDisabler(false);
        navigation.navigate('home')
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
    const renderItem = ({item}) => (
      <View
        style={{
          borderColor: 'gray',
          backgroundColor:"#ddd",
          borderWidth: 0.3,
          width: '90%',
          margin:12,
          alignSelf: 'center',
          padding: 12,
          borderRadius: 12,
        }}>
        <Text style={styles.overhead}>Email:</Text>
  
        <Text style={{...styles.text, marginHorizontal: 12}}>
          {item.AdminEmail}
        </Text>
  
        <Text style={styles.overhead}>Mobile Contact:</Text>
  
  <Text style={{...styles.text, marginHorizontal: 12}}>
    {item.AdminPhone1}
  </Text>
  <Text style={{...styles.text, marginHorizontal: 12}}>
    {item.AdminPhone2}
  </Text>
  <Text style={{...styles.text, marginHorizontal: 12}}>
    {item.AdminPhone3}
  </Text>
  
  <Text style={styles.overhead}>Address:</Text>
  
  <Text style={{...styles.text, marginHorizontal: 12}}>
    1-B,Muhammadi House,St. Martin's Road,Bandra West,Mumbai -400 050.
  </Text>
  
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
      fontSize: 17,
      fontWeight: 'bold',
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
  