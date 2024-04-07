import {
  StyleSheet,
  Text,
  Touchable,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Chip} from 'react-native-paper';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.setItem('user', JSON.stringify({name: 'sagar'}));

const BeforeSignUp = ({ route,props ,navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>I am...</Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={async () => {
          await AsyncStorage.setItem('category', 'student');
            navigation.navigate('personalData');
        }}>
        <View style={styles.card_container}>
          <View>
            <Text style={styles.card_heading}>Student</Text>
            <Text style={styles.desc}>
              A student is an individual enrolled in an educational institution,
              seeking knowledge and skills through formal learning.
            </Text>
          </View>
          <View
            style={{
              height: 50,
              width: 50,
            }}>
            <Image
              width={40}
              style={styles.image}
              source={require('../../assets/images/logo.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={async () => {
          await AsyncStorage.setItem('category', 'business');

            navigation.navigate('personalData');
        }}>
        <View style={styles.card_container}>
          <View>
            <Text style={styles.card_heading}>
              Business Owner / Professional
            </Text>
            <Text style={styles.desc}>
              Business refers to commercial, financial, and organizational
              activities aimed at producing goods or services for profit
            </Text>
          </View>
          <View
            style={{
              height: 50,
              position:"absolute",
              right:10,
              width: 50,
            }}>
            <Image
              width={40}
              style={styles.image}
              source={require('../../assets/images/logo.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={async () => {
          await AsyncStorage.setItem('category', 'jobseeker');
            navigation.navigate('personalData');
        }}>
        <View style={styles.card_container}>
          <View>
            <Text style={styles.card_heading}>Job Seeker</Text>
            <Text style={styles.desc}>
              A job seeker is an individual actively searching for employment
              opportunities and seeking to secure a job or career position.
            </Text>
          </View>
          <View
            style={{
              height: 50,
              width: 50,
            }}>
            <Image
              width={40}
              style={styles.image}
              source={require('../../assets/images/logo.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={async () => {
          await AsyncStorage.setItem('category', 'other');
            navigation.navigate('personalData');
        }}>
        <View style={styles.card_container}>
          <View>
            <Text style={styles.card_heading}>Individual / other</Text>
            <Text style={styles.desc}>
              Person like Senior Citizen, Retired, Joining as a community member
              or for matrimonial purpose etc.
            </Text>
          </View>
          <View
            style={{
              height: 50,
              width: 50,
            }}>
            <Image
              width={40}
              style={styles.image}
              source={require('../../assets/images/logo.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BeforeSignUp;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 4,
    backgroundColor: 'white',
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
    paddingBottom: 8,
    marginLeft: 24,
  },
  card_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
  card_heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  desc: {
    fontSize: 14,
    color: 'gray',
    width: 220,
    textAlign: 'justify',
    fontVariant: 'small-caps',
    paddingVertical: 8,
  },
});
