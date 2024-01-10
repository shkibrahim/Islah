import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-paper';

const UserCard = props => {
  return (
    <View style={styles.card_container}>
      <View style={styles.img_container}>
        <Image source={{uri: props.user.url}} style={styles.img} />
      </View>
      <View style={styles.content_container}>
        <Text style={styles.user_name}>{props.user.name}</Text>
        <Text style={styles.user_category}>{props.user.catergory}</Text>
        <Text style={styles.user_location}>{props.user.location}</Text>
      </View>
      {/* Add the arrow icon button */}

      <View style={styles.arrow_container}>
        <Icon source="arrow-right" size={22} color="#000" />
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card_container: {
    height: 90,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    objectFit: 'contain',
  },
  img_container: {
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: 60,
  },
  content_container: {
    flex: 1,
    padding: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  user_name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  user_category: {
    fontSize: 12,
    color: '#666',
  },
  user_location: {
    fontSize: 12,
    color: '#666',
  },
  arrow_container: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});
