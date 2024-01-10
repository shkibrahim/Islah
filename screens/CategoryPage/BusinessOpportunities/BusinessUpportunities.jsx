import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ProposalCard from '../../../Components/ProposalCard/ProposalCard';
import BackButton from '../../../Components/BackButton/BackButton';

const BusinessUpportunities = () => {
  const businessProposals = [
    {
      catergory: 'Agriculture',
      businessDetails: 'I want to start a poultry farm',
      location: 'Lagos',
      investment: '500,000',
      ROI: '10%',
      guarantors: [
        'John Doe , +9213245767',
        'Jane Doe , +9213245767',
        'John Smith , +9213245767',
      ],
    },
    {
      catergory: 'Agriculture',
      businessDetails: 'I want to start a poultry farm',
      location: 'Lagos',
      investment: '500,000',
      ROI: '10%',
      guarantors: [
        'John Doe , +9213245767',
        'Jane Doe , +9213245767',
        'John Smith , +9213245767',
      ],
    },
    {
      catergory: 'Agriculture',
      businessDetails: 'I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm',
      location: 'Lagos',
      investment: '500,000',
      ROI: '10%',
      guarantors: [
        'John Doe , +9213245767',
        'Jane Doe , +9213245767',
        'John Smith , +9213245767',
      ],
    },
  ];

  const renderProposal = ({ item }) => <ProposalCard {...item} />;

  return (
    <View style={{ flex: 1 }}>
      <BackButton label={'Proposals'} />
      <FlatList
        data={businessProposals}
        renderItem={renderProposal}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default BusinessUpportunities;

const styles = StyleSheet.create({});
