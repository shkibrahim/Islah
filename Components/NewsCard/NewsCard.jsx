import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const NewsCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Title of the news Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptatum 
      </Text>

      <Image
        width={100}
        height={100}
        style={styles.img_container}
        source={require('../../assets/images/slider_1.jpg')}
      />
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical : 2,
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    backgroundColor : "#fff",
    borderColor: '#ddd',
    marginHorizontal: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    
  },
  title: {
    fontSize: 14,
    color: '#444',
    textAlign: 'justify',
    flexBasis : "68%",
    justifyContent : "center",
    alignItems : "center"
  },
  img_container: {
    width: 80,
    height: 80,
  },
});
