import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { myTheme } from '../../theme'

const AuthorizedMemberCard = ({name , designation ,   image ,  message }) => {
  return (
    <View style={styles.card}>
        <View style={{
          flexBasis: '30%',
        }}>
            <Image source={require('../../assets/images/user.png')} style={{width: 80, height: 80, borderRadius: 40}} />
        </View>
        <View style={{
          flexBasis: '70%',
          paddingHorizontal: 10
        
        }}>
            <Text style={{fontSize: 20, fontWeight: '500' , color : myTheme.colors.primary}}>Name</Text>
            <Text style={{fontSize: 13 , fontWeight : 'bold' }}>Chairman</Text>
            <Text style={{fontSize: 14 , padding : 4 , textAlign : 'justify' , fontStyle : 'italic'}}>
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit"
            </Text>
        </View>
      
    </View>
  )
}

export default AuthorizedMemberCard

const styles = StyleSheet.create({
    card : {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        marginVertical: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})