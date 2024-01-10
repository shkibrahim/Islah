import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { myTheme } from '../../theme'

const Loader = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        
    }}>
      <ActivityIndicator size="large" color={myTheme.colors.primary} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})