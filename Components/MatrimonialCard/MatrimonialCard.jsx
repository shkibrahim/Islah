import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import IsEditContainer from '../IsEditContainer/IsEditContainer';

const MatrimonialCard = ({
  fullName,
  fatherName,
  motherName,
  grandFatherName,
  grandFatherNameNana,
  isEdit,
  dob,
  gender,
  parentNumbers,
  address,
  state,
  country,
  maritalStatus,
  postalCode,
}) => {
  const renderGuarantor = ({item}) => (
    <Text style={styles.listText}>{item}</Text>
  );

  return (
    <Card style={styles.card}>
      <Card.Title title={fullName} titleStyle={styles.cardTitle} />
      <Card.Content>
        <Text style={styles.heading}>Father Name:</Text>
        <Text style={styles.detailText}>{fatherName}</Text>
        <Text style={styles.heading}>Mother Name:</Text>
        <Text style={styles.detailText}>{motherName}</Text>
        <Text style={styles.heading}>Grandfather Name:</Text>
        <Text style={styles.detailText}>{grandFatherName}</Text>
        <Text style={styles.heading}>Date Of birth:</Text>
        <Text style={styles.detailText}>{dob}</Text>
        <Text style={styles.heading}>Gender:</Text>
        <Text style={styles.detailText}>{gender}</Text>
        <Text style={styles.heading}>Address:</Text>
        <Text style={styles.detailText}>{address}</Text>
        <Text style={styles.heading}>State:</Text>
        <Text style={styles.detailText}>{state}</Text>
        <Text style={styles.heading}>Country:</Text>
        <Text style={styles.detailText}>{country}</Text>
        <Text style={styles.heading}>Marital Status:</Text>
        <Text style={styles.detailText}>{maritalStatus}</Text>
        <Text style={styles.heading}>Postal Code: {postalCode}</Text>
        <Text style={styles.heading}>Grandfather Name (Nana):</Text>
        <Text style={styles.detailText}>{grandFatherNameNana}</Text>
        <Text style={styles.listTitle}>Parent Numbers:</Text>
        <FlatList
          data={parentNumbers}
          renderItem={renderGuarantor}
          keyExtractor={(item, index) => index.toString()}
        />
      </Card.Content>
      {isEdit && <IsEditContainer isEdit={true} />}
    </Card>
  );
};

export default MatrimonialCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailText: {
    marginBottom: 5,
  },
  listTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  listText: {
    marginLeft: 10,
  },
});
