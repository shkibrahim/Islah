import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import ProposalCard from '../../../Components/ProposalCard/ProposalCard';
import BackButton from '../../../Components/BackButton/BackButton';

const EditBusinessProposal = () => {
  const businessProposals = [
    {
      _id: '1',
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
      _id: '2',

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
      _id: '3',
      catergory: 'Agriculture',
      businessDetails:
        'I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm',
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

  const renderProposal = ({item}) => (
    <ProposalCard
      catergory={item.catergory}
      ROI={item.ROI}
      isEdit={true}
      guarantors={item.guarantors}
      investment={item.investment}
      location={item.location}
      key={item._id}
      businessDetails={item.businessDetails}
    />
  );

  return (
    <View style={{flex: 1}}>
      <BackButton label={'Edit proposal'} />
      <FlatList
        data={businessProposals}
        renderItem={renderProposal}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default EditBusinessProposal;

const styles = StyleSheet.create({});
