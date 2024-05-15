import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {myTheme} from '../theme';

const CustomButton = ({label , onPress}) => {

  return (
    <View>
      <Button mode="contained" style={styles.button} onPress={onPress}>
        {label}
      </Button>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 320,
    marginVertical: 16,
    alignSelf:"center",
    backgroundColor: myTheme.colors.primary,
  },
});
