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
import messaging from '@react-native-firebase/messaging';

const ChatPage = ({navigation}) => {
  useEffect(() => {
   

    getEmailFromStorage();
    // UserProfileSetting();
    // getProfile();
    // getName();
  }, [users]);
  // useEffect(() => {
  //   // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
    
  // }, []);
  const [isLoading, setIsLoading] = useState();
  const [StudentData, setStudentData] = useState([]);
  const [BusinessData, setBusinessData] = useState([]);
  const [IndividualData, setIndividualData] = useState([]);
  const [JobSeekerData, setJobSeekerData] = useState([]);
const [user,setuser] =useState();

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
      console.log('email is',storedEmail)
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };
  const [users, setUsers] = useState([

    // Add more users as needed
  ]);


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData1, setFilteredData] = useState([]);
  const [index, setIndex] = useState(0);
const [UserProfile,setUserProfile] = useState()


  console.log(UserProfile)
  useEffect(() => {
 
    const filterData = () => {
      const filtered = users.filter(item =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      // console.log('filter dat ',filteredData1)
    };

    filterData();
  }, [users, searchQuery]);
  const funcat = async () => {
    try {
      const concatenatedData = await StudentData.concat(
        IndividualData,
        BusinessData,
        JobSeekerData,
      );
      setUsers(concatenatedData);
      
      if (concatenatedData.length > 0) {
        console.log('me andr');
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
        console.log('my business data is ', databusiness);
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

  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
  
    // This effect will run whenever StudentData, BusinessData, IndividualData, or JobSeekerData changes
    funcat();

  }, [StudentData, BusinessData, IndividualData, JobSeekerData]);




  useEffect(() => {
    setIsLoading(true);
    
    const funcData = async () => {
      try {
        await fetchalldata();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    funcData();
  }, []);







  useEffect(() => {
     if (users) {
      UserProfileSetting()
     }
   
  },[users]);
  // useEffect(() => {
  //   // Filter users based on the search term
  //   const filtered = users.filter(user =>
  //     user.Name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );
  //   setFilteredUsers(filtered);
  // }, [searchTerm, users]);

  const UserProfileSetting =async()=>{
    
    const mydata =  await users.find((data)=> data.id === user);
    console.log('sender data is ' , mydata)
  
    const profileuser =  await mydata.Profile
    console.log(profileuser)
    setUserProfile(profileuser)
 
  }
  const handleUserClick = userId => {
    // Implement the logic for handling user clicks, e.g., navigate to a chat screen
    console.log(`User clicked: ${userId}`);
  };

  const handleSendRequest = userId => {
    // Implement the logic for sending a request to the person
    navigation.navigate('singleChat');
    console.log(`Request sent to user: ${userId}`);
  };

  const renderUserItem = ({item}) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Image source={{uri: item.Profile}} style={styles.dp} />
        <View>
          <Text style={{color:"black",fontWeight:'bold'}}>{item.Name}</Text>
          <Text style={{color:"black",fontWeight:'300'}}>{item.Category}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('singleChat' ,{
          id:item.id,
          Profile:item.Profile,
          Name:item.Name,
          UserProfile:UserProfile,
        })}
        style={styles.sendButton}>
        <Text style={styles.btn_text}>Send Request</Text>
      </TouchableOpacity>
    </View>
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search users"
        placeholderTextColor={'#666'}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <View style={{height:"90%"}}> 
      <FlatList
        data={filteredData1}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserItem}
      />
      </View>
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

export default ChatPage;
