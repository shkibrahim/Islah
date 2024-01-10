import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const FixedBanner = () => {

const [isimage , setIsImage ] = useState(false)



  return (
    <View style={{
      height: 60,
      width: "100%",
      backgroundColor: "#ddd",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {isimage ? (
        <Image source={require('../../assets/images/logo.png')} />
      ) : (
        <Text>FixedBanner</Text>
      )}
    </View>
  )
}

export default FixedBanner

const styles = StyleSheet.create({})