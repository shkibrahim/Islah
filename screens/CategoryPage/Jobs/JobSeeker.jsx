import {
  StyleSheet,
  View,
  FlatList,
  Touchable,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import JobCard from '../../../Components/JobCard/JobCard';
import BackButton from '../../../Components/BackButton/BackButton';
import {Icon, Modal, Portal, Searchbar, Text} from 'react-native-paper';
import {myTheme} from '../../../theme';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomDropDown from '../../../Components/CustomDropDown';
import firestore from '@react-native-firebase/firestore';
const JobSeeker = () => {
  const [postalCode, setPostalCode] = useState('');
  const [isPostalCodeEmpty, setIsPostalCodeEmpty] = useState(false);
  const [slaryMin, setSalaryMin] = useState('');
  const [isSalaryMinEmpty, setIsSalaryMinEmpty] = useState(false);
  const [salaryMax, setSalaryMax] = useState('');
  const [isSalaryMaxEmpty, setIsSalaryMaxEmpty] = useState(false);
  const [experience, setExperience] = useState('');
  const [isExperienceEmpty, setIsExperienceEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);



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
    <JobCard
      title={item.title}
      jobProfile={item.jobProfile}
      experience={item.experience}
      location={item.location}
      salary={item.salary}
      contactNumber={item.contactNumber}
      concernPersonname={item.concernPersonname}
    />
  );

  return (
    <View style={styles.container}>
      <BackButton label={'Jobs'} />

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 10,
          marginVertical: 6,
        }}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}>
          <Icon source="filter" size={30} color={myTheme.colors.primary} />
        </TouchableOpacity>
        <Searchbar
          placeholder="Search Jobs"
          onChangeText={query => setSearchQuery(query)}
          value={searchQuery}
          style={{borderRadius: 32, width: '87%', backgroundColor: '#ddd'}}
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
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});

export default JobSeeker;
