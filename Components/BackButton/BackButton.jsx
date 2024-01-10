import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import { myTheme } from '../../theme';

const BackButton = ({ label }) => {
  const navigation = useNavigation();

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderWidth : .8,
      borderColor : '#ddd',
      backgroundColor : '#fff'

    }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon source="arrow-left" size={30} color="green" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 4 }}>Back</Text>
        </View>
      </TouchableOpacity>
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
        color : myTheme.colors.primary

      }}>
        {label}
      </Text>

    </View>
  )
}

export default BackButton
