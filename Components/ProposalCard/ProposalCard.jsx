import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import IsEditContainer from '../IsEditContainer/IsEditContainer';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const ProposalCard = ({
  catergory,
  businessDetails,
  location,
  investment,
  Name,
  ROI,
  guaranter1,
  guaranter2,guaranter3,
  USER,
  isEdit
}) => {
  const renderGuarantor = ({ item }) => (
    <Text style={styles.guarantorText}>{item}</Text>
  );

  const navigation =useNavigation()
console.log('MY USER IS',USER)
  const Deleter = async () => {
    console.log('deleting');
    try {
      await firestore()
        .collection('BusinessProposal')
        .doc(USER)
        .delete();
      console.log('Document successfully deleted');
      navigation.navigate('Categories')
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  
  return (
    <Card style={styles.card}>
         <Card.Title title={Name} titleStyle={styles.cardTitle2} />
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
        <Text style={styles.detailText}>{guaranter1}</Text>
        <Text style={styles.detailText}>{guaranter2}</Text>

        <Text style={styles.detailText}>{guaranter3}</Text>

    


        {/* <FlatList
          data={guarantors}
          renderItem={renderGuarantor}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </Card.Content>


      <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-evenly",margin:20}}>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('editProposalForm',{id :USER

        })}
        style={{paddingHorizontal:29,paddingVertical:12, elevation:4,backgroundColor:"white",borderRadius:8}}>
          <Text style={{color:"black"}}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=>Deleter()}
        style={{paddingHorizontal:26,paddingVertical:12, elevation:4,backgroundColor:"white",borderRadius:8}}>
          <Text style={{color:"black"}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
      {/* {isEdit && (
        <IsEditContainer  path={'editProposalForm'}  isEdit={true} />
      )} */}
      
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
    fontSize: 16,color:'black'
  },
  cardTitle2: {
    fontWeight: 'bold',
    fontSize: 22,color:'black'
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
