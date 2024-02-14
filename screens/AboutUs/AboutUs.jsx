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

const AboutUs = () => {

  
  const navigation = useNavigation();
const [AboutUs,setAboutus] = useState();
const renderItem = ({ item }) => (
  <View style={styles.card}>
  <View style={{
    flexBasis: '30%',
  }}>
      <Image source={require('../../assets/images/user.png')} style={{width: 80, height: 80, borderRadius: 40}} />
  </View>
  <View style={{
    flexBasis: '70%',
    paddingHorizontal: 10
  
  }}>
      <Text style={{fontSize: 20, fontWeight: '500' , color : myTheme.colors.primary}}>Name</Text>
      <Text style={{fontSize: 13 , fontWeight : 'bold' ,color:"black"}}>Chairman</Text>
      <Text style={{fontSize: 14 , padding : 4 , textAlign : 'justify' , fontStyle : 'italic',color:'black'}}>
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit"
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
              " Our mission is to Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla quam velit,"
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
        data={AboutUs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
          <AuthorizedMemberCard />
          <AuthorizedMemberCard />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card : {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
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
