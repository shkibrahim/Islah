import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Icon} from 'react-native-paper';
import {myTheme} from '../theme';

const CustomTextInput = props => {
  return (
    <View style={styles.text_input_container}>
      <TextInput
        value={props.value}
        secureTextEntry={props.secureText}
        onChange={e => {
          props.setError(false);
          props.onChange(e.nativeEvent.text);
        }}
        style={{
          borderWidth: 1,
          borderColor: props.error ? 'red' : myTheme.colors.primary,
          borderRadius: 8,
          backgroundColor: '#ddd',
          paddingHorizontal: 16,
          paddingVertical: 10,
          color: '#111',
            width: '100%',
          marginVertical: 4,
        }}
        placeholder={props.label}
        placeholderTextColor="#666"
        keyboardType={props.keyboarType === 'numeric' ? 'numeric' : 'default'}
      />
      {props.required && (
        <View style={styles.star_container}>
          <Icon source="star" size={8} color={props.error ? 'red' : '#666'} />
        </View>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: 4,
    backgroundColor: '#ddd',
    fontFamily: 'Roboto',
    fontSize: 14,
    position: 'relative',
  },
  star_container: {
    position: 'absolute',
    top: '46%',
    right: '3%',
  },
  text_input_container: {
    width: '100%',
    position: 'relative',
  },
});
