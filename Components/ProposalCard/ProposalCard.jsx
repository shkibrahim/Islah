import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import IsEditContainer from '../IsEditContainer/IsEditContainer';

const ProposalCard = ({
  catergory,
  businessDetails,
  location,
  investment,
  ROI,
  guarantors,
  isEdit
}) => {
  const renderGuarantor = ({ item }) => (
    <Text style={styles.guarantorText}>{item}</Text>
  );

  return (
    <Card style={styles.card}>
      <Card.Title title={catergory} titleStyle={styles.cardTitle} />
      <Card.Content>
        <Text style={styles.heading}>Business Details:</Text>
        <Text style={styles.detailText}>{businessDetails}</Text>
        <Text style={styles.heading}>Location:</Text>
        <Text style={styles.detailText}>{location}</Text>
        <Text style={styles.heading}>Investment:</Text>
        <Text style={styles.detailText}>Rs.{investment}</Text>
        <Text style={styles.heading}>Return on Investment:</Text>
        <Text style={styles.detailText}>{ROI}</Text>
        <Text style={styles.guarantorTitle}>Guarantors:</Text>
        <FlatList
          data={guarantors}
          renderItem={renderGuarantor}
          keyExtractor={(item, index) => index.toString()}
        />
      </Card.Content>
      {isEdit && (
        <IsEditContainer  path={'editProposalForm'}  isEdit={true} />
      )}
      
    </Card>
  );
};

export default ProposalCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',

  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,color:'black'
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 10,color:'black'
  },
  detailText: {
    color:'black',
    marginBottom: 5,
  },
  guarantorTitle: {
    fontWeight: 'bold',
    marginTop: 10,color:'black',
    marginBottom: 5,
  },
  guarantorText: {
    marginLeft: 10,color:'black',
  },
});
