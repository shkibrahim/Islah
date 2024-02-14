import {
  StyleSheet,
  View,
  FlatList,ScrollView,
  Touchable,
  TouchableOpacity,Image,
  Button,
  TextInput,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import JobCard from '../../../Components/JobCard/JobCard';
import BackButton from '../../../Components/BackButton/BackButton';
import {Icon, Modal, Portal, Searchbar, Text} from 'react-native-paper';
import {myTheme} from '../../../theme';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomDropDown from '../../../Components/CustomDropDown';
import firestore from '@react-native-firebase/firestore';
const JobSeeker = () => {
  const [postalCode, setPostalCode] = useState('');
  const [Loading, setLoading] = useState();
  const [isPostalCodeEmpty, setIsPostalCodeEmpty] = useState(false);
  const [slaryMin, setSalaryMin] = useState('');
  const [isSalaryMinEmpty, setIsSalaryMinEmpty] = useState(false);
  const [salaryMax, setSalaryMax] = useState('');
  const [isSalaryMaxEmpty, setIsSalaryMaxEmpty] = useState(false);
  const [experience, setExperience] = useState('');
  const [isExperienceEmpty, setIsExperienceEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);

  const [JobData, setJobData] = useState();
  useEffect(() => {



    fetchData();

  }, []);
    
  const fetchData = async () => {
    setLoading(true);

    console.log('fsf');
    try {
      const querySnapshot = await firestore().collectionGroup('Jobs').get();

      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setLoading(false);
        setJobData(data);
        console.log(data);
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const data = [
    {
      id: '1',
      title: 'Job Title',
      jobProfile: 'Job Profile',
      experience: '1 Month',
      location: 'Lasalgaon',
      salary: '10000',
      contactNumber: '+91 1234567890',
      concernPersonname: 'John Doe',
    },
    {
      id: '144',
      title: 'Job Title',
      jobProfile: 'Job Profile',
      experience: '1 Month',
      location: 'Lasalgaon',
      salary: '10000',
      contactNumber: '+91 1234567890',
      concernPersonname: 'John Doe',
    },
    {
      id: '2',
      title: 'Job Title',
      jobProfile: 'Job Profile',
      experience: '1 Month',
      location: 'Lasalgaon',
      salary: '10000',
      contactNumber: '+91 1234567890',
      concernPersonname: 'John Doe',
    },
    {
      id: '134',
      title: 'Job Title',
      jobProfile: 'Job Profile',
      experience: '1 Month',
      location: 'Lasalgaon',
      salary: '10000',
      contactNumber: '+91 1234567890',
      concernPersonname: 'John Doe',
    },
    // Add more job data as needed
  ];

  const renderItem = ({item}) => (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 10,
        elevation: 2,
        marginHorizontal: 16,
        marginVertical: 6,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 12,
            alignSelf:"center",
          }}>
          {item.Title} 
        </Text>

     

        <Text style={styles.overhead}>Job Profile:</Text>
   
        <Text style={{...styles.text, marginHorizontal:12}}>{item.JobProfile}</Text>
           
           
         
        

        <Text style={styles.overhead}>Experience Required:</Text>
        <Text style={{...styles.text, marginHorizontal:12}}>{item.Experience}</Text>
        <Text style={styles.overhead}>Concern Person Name:</Text>
        <Text style={{...styles.text, marginHorizontal:12}}>{item.ConcernPersonname}</Text>
      
        <Text style={styles.overhead}>Location:</Text>
        <Text style={{...styles.text, marginHorizontal:12}}>{item.Location}</Text>

        <Text style={styles.overhead}>Offering Salary:</Text>
        <Text style={{...styles.text, marginHorizontal:12}}>{item.Salary}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <BackButton label={'Jobs'} />

      <View
        style={{
         
          alignItems: 'center',
       
          marginHorizontal: 10,
          marginVertical: 6,
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}>
          <Icon source="filter" size={30} color={myTheme.colors.primary} />
        </TouchableOpacity> */}
        <Searchbar
          placeholder="Search Jobs"
          onChangeText={query => setSearchQuery(query)}
          value={searchQuery}
          style={{borderRadius: 22, width: '87%', backgroundColor: '#ddd',alignSelf:"center"}}
        />
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              marginHorizontal: 8,
              borderRadius: 16,
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 8,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#444',
                }}>
                Filter
              </Text>
            </View>
            <View>
              <TextInput
                label="Postal Code"
                style={styles.input}
                mode="outlined"
                placeholder="Postal Code"
                value={postalCode}
                onChangeText={text => setPostalCode(text)}
                placeholderTextColor={'#666'}
                keyboardType="numeric"
              />

              <CustomDropDown
                options={[
                  'Experience',
                  '1 Month',
                  '2 Month',
                  '3 Month',
                  '4 Month',
                  'More than 5 Months',
                ]}
                selectedOption={experience}
                setSelectedOption={setExperience}
              />

              {/* Salary range from and to */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextInput
                  label="Salary Min"
                  width="48%"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Salary Min"
                  value={slaryMin}
                  onChangeText={text => setSalaryMin(text)}
                  placeholderTextColor={'#666'}
                  keyboardType="numeric"
                />
                <TextInput
                  label="Salary Max"
                  width="48%"
                  style={styles.input}
                  mode="outlined"
                  placeholder="Salary Max"
                  value={salaryMax}
                  onChangeText={text => setSalaryMax(text)}
                  placeholderTextColor={'#666'}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.filter_btn}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#fff',
                }}>
                Filter
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>

      <FlatList
        data={JobData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  input: {
    backgroundColor: '#ddd',
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: myTheme.colors.primary,
    paddingHorizontal: 8,
  },
  filter_btn: {
    backgroundColor: myTheme.colors.primary,
    marginVertical: 8,
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  container: {
    flex: 1,
  },
  image:{
    
      width: 300,
      height: 300,
      borderRadius: 12,marginHorizontal:12,borderWidth:0.8,borderColor:'gray',opacity:2,shadowRadius:3,
      alignSelf: 'center',
      marginBottom: 16,
    
  },
  heading:{
    fontSize:16,color:"black",fontWeight:'normal'
  },
  text:{
color:"black"
  },
  overhead:{
color:"black"
,fontSize:17,fontWeight:"bold"
  }
});

export default JobSeeker;
