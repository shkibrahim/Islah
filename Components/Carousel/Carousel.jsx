import * as React from 'react';
import { Dimensions, Text, View, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { myTheme } from '../../theme';

function CarouselPage({data , indicatorshows , autoPlay}) {
  const width = Dimensions.get('window').width ;
  const [currentIndex, setCurrentIndex] = React.useState(0);


  const renderItem = ({ item }) => (
    /* Your custom rendering logic for each item goes here */
    // Example:
    <View style={{ }}>
      {/* Content styling goes here */}
    
      <Image source={{ uri: item.image }} style={{ width:'100%',height:'100%' }} />
    </View>
  );
  const renderIndicator = () => {

    return (
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === currentIndex ? myTheme.colors.secondary : '#ccc', width: index === currentIndex ? 8 : 4, height: index === currentIndex ? 8 : 4 },
            ]}
          />

          
        ))}
      
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={autoPlay}
        data={data}
        autoPlayInterval={5000}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={renderItem}
        
      />
      {
        indicatorshows && renderIndicator()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  indicator: {
    borderRadius: 4,
    marginLeft: 5,
  },
  text: {
   color:'black'
  },
});

export default CarouselPage;
