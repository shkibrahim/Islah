import React from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import MatrimonialCard from '../../../Components/MatrimonialCard/MatrimonialCard';
import BackButton from '../../../Components/BackButton/BackButton';

const LookingForGroom = () => {
  const matrimonialData = [
    {
      address: 'Address 1',
      country: 'Country 1',
      dob: 'Date of Birth 1',
      fatherName: 'Father Name 1',
      maritalStatus: 'Marital Status 1',
      motherName: 'Mother Name 1',
      fullName: 'Full Name 1',
      gender: 'Male',
      grandFatherName: 'Grandfather Name 1',
      grandFatherNameNana: 'Grandfather Name Nana 1',
      parentNumbers: ['1234567890', '0987654321'],
      postalCode: 'Postal Code 1',
      state: 'State 1',
    },
    {
      address: 'Address 2',
      country: 'Country 2',
      dob: 'Date of Birth 2',
      fatherName: 'Father Name 2',
      maritalStatus: 'Marital Status 2',
      motherName: 'Mother Name 2',
      fullName: 'Full Name 2',
      gender: 'Male',
      grandFatherName: 'Grandfather Name 2',
      grandFatherNameNana: 'Grandfather Name Nana 2',
      parentNumbers: ['2234567890', '0987654321'],
      postalCode: 'Postal Code 2',
      state: 'State 2',
    },
  ];

  const renderMatrimonialCard = ({item}) => <MatrimonialCard {...item} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <BackButton label={'Grooms'} />
      <FlatList
        data={matrimonialData}
        renderItem={renderMatrimonialCard}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LookingForGroom;

const styles = StyleSheet.create({});
