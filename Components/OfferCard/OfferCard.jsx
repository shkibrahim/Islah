import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {myTheme} from '../../theme';
import {Icon} from 'react-native-paper';
import IsEditContainer from '../IsEditContainer/IsEditContainer';

const OfferCard = ({
  title,
  category,
  offerDetails,
  dateFrom,
  dateTo,
  timeFrom,
  timeTo,
  city,
  area,
  postalCode,
  contact,
  isEdit
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // navigation.navigate("offers");
  };

  return (
    <View style={{
      borderWidth: .5,
      borderColor: '#ddd',
      borderRadius: 10,
      elevation: 2,
      marginHorizontal: 16,
      marginVertical: 6,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 12,
    }}>
      <View style={styles.cardContainer} onPress={handlePress}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.detail}>{offerDetails}</Text>
          {/* Offer date start to end */}
          <Text style={styles.detail}>{`Valid: ${dateFrom} - ${dateTo}`}</Text>
          {/* offer timings */}
          <Text
            style={styles.detail}>{`Timings: ${timeFrom}  -  ${timeTo}`}</Text>
          <Text style={styles.detail}>
            Location :{' '}
            <Text style={styles.detail}>
              {city} {area} {postalCode}{' '}
            </Text>
          </Text>
          <Text style={styles.detail}>{`Contact: ${contact}`}</Text>
        </View>
      </View>
        <View>{isEdit ? <IsEditContainer path={'offerEditForm'} id={"id"} /> : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: myTheme.colors.primary,
  },
  category: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
    color: '#333',
  },
});

export default memo(OfferCard);
