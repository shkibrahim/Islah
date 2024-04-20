import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../Components/BackButton/BackButton';
import AuthorizedMemberCard from '../../Components/AuthorizedMemberCard/AuthorizedMemberCard';
import firestore from '@react-native-firebase/firestore'
import { myTheme } from '../../theme';
const AboutUs = () => {

  
  const navigation = useNavigation();
const [AboutUs,setAboutus] = useState();
console.log(JSON.stringify(AboutUs))
const fetchData = async () => {
  console.log('fetching members');
  try {
    const querySnapshot = await firestore()
      .collection('AboutUs')
      .get();

    const data = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Check if data.docs is defined before mapping
    if (data && Array.isArray(data)) {
      setAboutus(data);
    } else {
      console.log('No documents found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


useEffect(()=>{
  fetchData()
},[])

const renderItem = ({ item }) => (
  <View style={styles.card}>
  <View style={{
    flexBasis: '30%',
  }}>


{/* <Text style={{color:'red'}}>{JSON.stringify(item)}</Text> */}
    <View style={{width:60,height:60,borderRadius:40,overflow:"hidden"}}>
    <Image
            source={{uri: item?.MemberImage}}
            style={{height: '100%', width: '100%',}}
            onError={error => console.error('Image Error: ', error)}
          />
    </View>
       
  </View>
  <View style={{
    flexBasis: '70%',
    paddingHorizontal: 10
  
  }}>
      <Text style={{fontSize: 20, fontWeight: '500' , color : myTheme.colors.primary}}>{item?.Name}</Text>
      <Text style={{fontSize: 13 , fontWeight : 'bold' ,color:"black"}}>{item?.Status}</Text>
      <Text style={{fontSize: 14 , padding : 4 , textAlign : 'justify' , fontStyle : 'italic',color:'black'}}>
    {item?.Description}
      </Text>
  </View>

</View>
);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButton label={'About Us'} />
      <ScrollView>
        <View style={styles.container}>
          {/* Vision Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vision</Text>
            <Text style={styles.sectionText}>
              "An Effort to Unite the Community - Unity paves way for Reform…"
            </Text>
          </View>
          {/* Mission Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mission</Text>
            <Text style={styles.sectionText}>
              " Our mission is to  To provide common platform to explore member's unique 
 quality and make it evident which can benefit his/her own ,
 Optimum Realization and Utilization of the resources 
 of the community for the benefit of the community members"
            </Text>
          </View>
        </View>
        {/* Founders Members Section */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#444',
            }}>
            Authorized Members
          </Text>
          <FlatList
        data={AboutUs[0]?.AboutUs}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id.toString()}
      />
          {/* <AuthorizedMemberCard />
          <AuthorizedMemberCard /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card : {
    width: '96%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf:"center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
},
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'justify',
  },
});

export default AboutUs;
