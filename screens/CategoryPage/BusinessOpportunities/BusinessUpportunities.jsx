import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, FlatList,ActivityIndicator } from 'react-native';
import ProposalCard from '../../../Components/ProposalCard/ProposalCard';
import BackButton from '../../../Components/BackButton/BackButton';
import { Card } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
const BusinessUpportunities = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [BusinessData,setBusinessData] = useState();
  const fetchData = async () => {
   
    console.log('posts data coming')
    try {
      const querySnapshot = await firestore()
        .collectionGroup('BusinessOppurtunities')
        .get();
  
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setIsLoading(false);
  
     
        setBusinessData(data);
  
  
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

  // const renderProposal = ({ item }) => <ProposalCard {...item} />;


  const renderItem = ({ item }) => (
    <Card style={styles.card}>
    <Card.Title title={item.BusinessName} titleStyle={styles.cardTitle} />
    <Card.Content>
      <Text style={styles.heading}>Business Details:</Text>
      <Text style={styles.detailText}>{item.BusinessDetails}</Text>
      <Text style={styles.heading}>Location:</Text>
      <Text style={styles.detailText}>{item.Location}</Text>
      <Text style={styles.heading}>Investment:</Text>
      <Text style={styles.detailText}>Rs.{item.Investment}</Text>
      <Text style={styles.heading}>Return on Investment:</Text>
      <Text style={styles.detailText}>{item.Return}</Text>
      <Text style={styles.guarantorTitle}>Guarantors:</Text>
      <View style={{flexDirection:"row", alignItems:"center"}}>
      <Text style={styles.guarantorText}>{item.Guarantar1}</Text>
      <Text style={styles.guarantorText}>{item.GuarantarContact1}</Text>
      </View>

      <View style={{flexDirection:"row", alignItems:"center"}}>
      <Text style={styles.guarantorText}>{item.Guarantar2}</Text>
      <Text style={styles.guarantorText}>{item.GuarantarContact2}</Text>
      </View>
      

      <View style={{flexDirection:"row", alignItems:"center"}}>
      <Text style={styles.guarantorText}>{item.Guarantar3}</Text>
      <Text style={styles.guarantorText}>{item.GuarantarContact3}</Text>
      </View>
      {/* <FlatList
        data={guarantors}
        renderItem={renderGuarantor}
        keyExtractor={(item, index) => index.toString()}
      /> */}
    </Card.Content>
    {/* {isEdit && (
      <IsEditContainer  path={'editProposalForm'}  isEdit={true} />
    )} */}
    
  </Card>
  );
  return (
    <View style={{ flex: 1 }}>
      <BackButton label={'Oppurtunities'} />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center',marginTop:200}}
        />
      ) : (
      <FlatList
        data={BusinessData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      )}
    </View>
  );
};

export default BusinessUpportunities;

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
