import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import {Icon, Searchbar, Modal, Portal} from 'react-native-paper';
import CustomDropDown from '../../../Components/CustomDropDown';
import StudentListCard from '../../../Components/StudentCard/StudentCard';
import {myTheme} from '../../../theme';
import firestore from '@react-native-firebase/firestore';

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [college, setCollege] = useState('');
  const [studyingIn, setStudyingIn] = useState('');
const [studentsData,setstudentsData] = useState()
  const fetchData = async () => {
    // setLoading(true)
  
    console.log('fsf')
    try {
      const querySnapshot = await firestore()
        .collection('StudentData')
        .get();
  
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        // setLoading(false);
        setstudentsData(data)
        console.log(data)
     
  
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {



    fetchData();
  }, []);
  const filteredStudents = studentsData?.filter(student =>
    student.Name.toLowerCase().includes(searchQuery.toLowerCase()),
  );


  const filter =studentsData?.filter(student =>
   ( student.Gender.toLowerCase() == (gender.toLowerCase()) || gender.toLowerCase() == 'gender' )  &&   student.PostalCode.includes(postalCode) &&   student.SchoolName.toLowerCase().includes(schoolName.toLowerCase()) &&  student.Degreeyear.includes(studyingIn)  && student.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const male = studentsData?.filter(student =>
    student.Gender.toLowerCase() == ('male'.toLowerCase()),
  );


  
  const female = studentsData?.filter(student =>
    student.Gender.toLowerCase() == ('female'.toLowerCase()),
  );
  const postalcode = studentsData?.filter(student =>
    student.PostalCode.includes(postalCode),
  );

  console.log('my students',filteredStudents)

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButton label="Students" />
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingVertical: 8,
        }}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Icon source="filter" size={30} color="green" />
        </TouchableOpacity>
        <Searchbar
          placeholder="Search"
          onChangeText={query => setSearchQuery(query)}
          value={searchQuery}
          style={{
            backgroundColor: '#f0f0f0',
            width: '90%',
            marginLeft: 16,
          }}
        />
      </View>
      <View style={styles.student_list_container}>
        <StudentListCard studentData={filter} />
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View
            style={{backgroundColor: '#fff', padding: 16, marginHorizontal: 8 , borderRadius : 16}}>
            <CustomDropDown
              options={['Gender', 'Male', 'Female']}
              selectedOption={gender}
              setSelectedOption={setGender}
            />
            <TextInput
              label="Name"
              style={styles.input}
              
              mode="outlined"
              placeholder="Postal Code"
              value={postalCode}
              onChangeText={text => setPostalCode(text)}
              placeholderTextColor={'#666'}
              keyboardType="numeric"
            />
            <TextInput
              label="Name"
              style={styles.input}
              mode="outlined"
              placeholder="School Name"
              value={schoolName}
              onChangeText={text => setSchoolName(text)}
              placeholderTextColor={'#666'}
            />
            <TextInput
              label="Name"
              style={styles.input}
              mode="outlined"
              placeholder="College"
              value={college}
              onChangeText={text => setCollege(text)}
              placeholderTextColor={'#666'}
            />
            <TextInput
              label="Name"
              style={styles.input}
              mode="outlined"
              placeholder="Academic year"
              value={studyingIn}
              onChangeText={text => setStudyingIn(text)}
              placeholderTextColor={'#666'}
              keyboardType="numeric"
            />

            {/* Add Filter Button */}

            <TouchableOpacity 
            onPress={()=> setVisible(false)}
            style={styles.filter_btn}>
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
    </View>
  );
};

export default Students;

const styles = StyleSheet.create({
  student_list_container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#ddd',
    marginVertical: 8,
    color:"black",
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
});
