import { StyleSheet, Text, View ,FlatList,Image,ActivityIndicator, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState ,useEffect} from 'react';
import BackButton from '../../Components/BackButton/BackButton'
import NewsCard from '../../Components/NewsCard/NewsCard'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import { myTheme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { set } from 'date-fns';
const NewsDescription = ({navigation,route}) => {
const {item} = route.params
  return (
    <SafeAreaView style={{flex:1,padding:5,backgroundColor: 'white',}}>
<ScrollView>
<View style={{backgroundColor: 'white', padding:6}}>

<TouchableOpacity 
onPress={()=>navigation.goBack()}
style={{}}>
<MaterialIcons name="close" size={18} color={'black'} />

</TouchableOpacity>





</View>
    
<Text style={{color:"black",alignSelf:"center",fontSize:30,fontWeight:"bold",marginVertical:5}}>
    {item.Title}
</Text>

<View style={{height:350,width:'100%',overflow:'hidden',alignSelf:"center",borderRadius:10}}>
<Image source={{uri: item.NewsImage}} style={{width:'100%',height:"100%"}} />

</View>

<Text style={{color:"black",fontSize:20,fontWeight:"bold",width:"95%",marginVertical:5}}>
   Content:
</Text>
<Text style={{color:"black",fontSize:15,fontWeight:"normal",width:"95%",paddingHorizontal:12}}>
    {item.Description}
</Text>
</ScrollView>
    </SafeAreaView>
  )
}

export default NewsDescription

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
  category: {
    fontSize: 16,
    color: '#555',
    // marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
    color: 'black',
  },

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
})