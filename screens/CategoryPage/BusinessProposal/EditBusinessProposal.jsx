import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View, FlatList,TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import ProposalCard from '../../../Components/ProposalCard/ProposalCard';
import BackButton from '../../../Components/BackButton/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const EditBusinessProposal = ({navigation}) => {

const [businessProposals,setbusinessProposals]=useState()
const[loading,setLoading] = useState()
const [user,setuser] = useState()

useEffect (()=>{
 const myfunc = async()=>{

  const a =await AsyncStorage.getItem('userName')
  setuser (a)
  console.log('i am ',a)
 }
 myfunc()
},[])
useEffect(() => {



  fetchData();

}, [user]);
  
const fetchData = async () => {
  setLoading(true);

  console.log('fsf');
  try {
    const querySnapshot = await firestore().collection('BusinessProposal').doc(user).get();

    if (querySnapshot.exists) {
      const data = querySnapshot.data();
      setLoading(false);
      setbusinessProposals([data]);
      console.log('MY DATA', data);
    } else {
      console.log('No document found.');
      setLoading(false);

    }
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};




  // const businessProposals = [
  //   {
  //     _id: '1',
  //     catergory: 'Agriculture',
  //     businessDetails: 'I want to start a poultry farm',
  //     location: 'Lagos',
  //     investment: '500,000',
  //     ROI: '10%',
  //     guarantors: [
  //       'John Doe , +9213245767',
  //       'Jane Doe , +9213245767',
  //       'John Smith , +9213245767',
  //     ],
  //   },
  //   {
  //     _id: '2',

  //     catergory: 'Agriculture',
  //     businessDetails: 'I want to start a poultry farm',
  //     location: 'Lagos',
  //     investment: '500,000',
  //     ROI: '10%',
  //     guarantors: [
  //       'John Doe , +9213245767',
  //       'Jane Doe , +9213245767',
  //       'John Smith , +9213245767',
  //     ],
  //   },
  //   {
  //     _id: '3',
  //     catergory: 'Agriculture',
  //     businessDetails:
  //       'I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm I want to start a poultry farm',
  //     location: 'Lagos',
  //     investment: '500,000',
  //     ROI: '10%',
  //     guarantors: [
  //       'John Doe , +9213245767',
  //       'Jane Doe , +9213245767',
  //       'John Smith , +9213245767',
  //     ],
  //   },
  // ];

  const renderProposal = ({item}) => (

    <View>
      {/* <Text style={{color:"red"}}>{JSON.stringify(item)}</Text> */}
      


      <ProposalCard
      Name= {item.BusinessName}

      catergory={item.BusinessCategory}
      ROI={item.ReturnOnInvestment}
      isEdit={true}
      guarantors={item.guarantors}
      investment={item.InvestmentNeeded}
      location={item.Location}
      USER={user}
      businessDetails={item.BusinessDetails}
      guaranter1 = {item.GuarantorDetails1}
      guaranter2 = {item.GuarantorDetails2}
      guaranter3 = {item.GuarantorDetails3}
    />



    </View>
 

  );

  return (
    <View style={{flex: 1}}>
      <BackButton label={'Edit proposal'} />

      {loading ?<ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center',marginTop:200}}
        /> :    <FlatList
        data={businessProposals}
        renderItem={renderProposal}
        keyExtractor={(item, index) => index.toString()}
      />
         }
   
    </View>
  );
};

export default EditBusinessProposal;

const styles = StyleSheet.create({

  guarantorTitle: {
    fontWeight: 'bold',
    marginTop: 10,color:'black',
    marginBottom: 5,
  },
});
