import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View} from 'react-native';
import {myTheme} from '../theme';

const CustomDropDown = ({
  options,
  selectedOption,
  setSelectedOption,
  width,
}) => {
  return (
    <View
      style={{
        borderColor:  myTheme.colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 6,
        backgroundColor: '#ddd',
        width: width || '100%',
      }}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}>
        {options.map((option, index) => (
          <Picker.Item
            style={{
              color: 'black',
              fontSize: 15,borderRadius:8,
             
            }}
            key={index}
            label={option}
            value={option.toLocaleLowerCase()}
          />
        ))}
      </Picker>
    </View>
  );
};

export default CustomDropDown;
