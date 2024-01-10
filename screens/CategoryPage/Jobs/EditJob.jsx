import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import JobCard from '../../../Components/JobCard/JobCard';
import BackButton from '../../../Components/BackButton/BackButton';
import {Text} from 'react-native-paper';

const EditJob = () => {
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
      isEdit={true}
    />
  );

  return (
    <View style={styles.container}>
      <BackButton label={'Edit Job'} />
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>You have not posted any job</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditJob;
