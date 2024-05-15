import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {myTheme} from '../../theme';
import {Icon} from 'react-native-paper';
import IsEditContainer from '../IsEditContainer/IsEditContainer';
import {useNavigation} from '@react-navigation/native';

const BusinessCard = ({
  isEdit,
  name,
  description,
  category,
  contact,
  weekdayFrom,
  weekdayTo,
  from,
  to,
  id,
}) => {
  const handleOpenWhatsApp = () => {
    const phoneNumber = '+923042336109'; // Replace with the recipient's phone number
    const message = 'Hello! I would like to chat with you.'; // Replace with your desired message

    // Use the `Linking` module to open WhatsApp with the predefined message
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${message}`);
  };

  const phoneNumber = '+923042336109'; // Replace with the desired phone number

  const handleOpenDialPad = () => {
    // Use the `Linking` module to open the dial pad with the specified phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleChat = () => {
    console.log('Chat');
  };

  const navigation = useNavigation();

  return (
    <View
      style={{
        borderRadius: 10,
        shadowColor: '#000',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 4,
      }}>
      <View style={styles.card_container}>
        <View
          style={{
            flexBasis: '35%',
            height: 116,
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            source={require('../../assets/images/slider_1.jpg')}
          />
        </View>
        <View
          style={{
            flexBasis: '65%',
            paddingLeft: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('singleBusinessDetails')}>
            <Text style={styles.card_name}>{name}</Text>
          </TouchableOpacity>
          <Text style={styles.card_category}>Category: {category}</Text>
          <Text style={styles.card_description}>
            Description: {description.slice(0, 20)}
          </Text>
          <Text style={styles.card_category}>
            Weekdays: {weekdayFrom} - {weekdayTo}
          </Text>
          <Text style={styles.card_category}>
            Timings: {from} - {to}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}>
            <TouchableOpacity
              onPress={handleOpenDialPad}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: myTheme.colors.background,
                borderColor: myTheme.colors.primary,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 8,
                paddingVertical: 4,
                marginTop: 5,
                width: 64,
              }}>
              <Icon source="phone" size={14} color="#000" />
              <Text style={{color: '#000', fontSize: 11}}> Phone </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleChat}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: myTheme.colors.background,
                borderColor: myTheme.colors.primary,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 8,
                paddingVertical: 4,
                marginTop: 5,
                width: 64,
              }}>
              <Icon source="chat" size={14} color="#000" />
              <Text style={{color: '#000', fontSize: 11}}> Chat </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOpenWhatsApp}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: myTheme.colors.background,
                borderColor: myTheme.colors.primary,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 8,
                paddingVertical: 4,
                marginTop: 5,
                width: 60,
                gap: 5,
              }}>
              <Icon source="whatsapp" size={14} color="#000" />
              <Text style={{color: '#000', fontSize: 11}}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isEdit && <IsEditContainer path="editBusinessDetailsForm" id={id} />}
    </View>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  card_container: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card_name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: myTheme.colors.primary,
  },
  card_description: {
    color:"black",
    fontSize: 13,
  },
  card_category: {
    color:"black",
    fontSize: 13,
  },
});
