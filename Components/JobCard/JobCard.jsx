import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import { myTheme } from '../../theme';
import IsEditContainer from '../IsEditContainer/IsEditContainer';

const JobCard = ({
  title,
  jobProfile,
  experience,
  location,
  salary,
  contactNumber,
  concernPersonname,
  isEdit,
  id,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Title: <Text style={styles.content}>{title}</Text>
        </Text>

        <Text style={styles.heading}>
          Salary: <Text style={styles.content}>{salary}</Text>
        </Text>

        <Text style={styles.heading}>
          Job Profile: <Text style={styles.content}>{jobProfile}</Text>
        </Text>

        <Text style={styles.heading}>
          Experience: <Text style={styles.content}>{experience}</Text>
        </Text>

        <Text style={styles.heading}>
          Location: <Text style={styles.content}>{location}</Text>
        </Text>

        <Text style={styles.heading}>
          Concern Contact: <Text style={styles.content}>{contactNumber}</Text>
        </Text>

        <Text style={styles.heading}>
          Concern Person Name:{' '}
          <Text style={styles.content}>{concernPersonname}</Text>
        </Text>
      </View>
     <IsEditContainer isEdit={isEdit} id={id} path='editJobForm' />

    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    fontWeight: 'normal', // Adjust the fontWeight as needed
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,

  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    elevation: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,

  },
});

export default JobCard;
