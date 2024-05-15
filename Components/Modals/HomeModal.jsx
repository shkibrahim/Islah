import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeModal = ({ RideTypeModal }) => { // Destructure the props object to access RideTypeModal
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log('modal properties are', RideTypeModal);
    const myfun = async()=>{
        const a = await AsyncStorage.getItem('userName')
        console.log('what is',a)
        setUserName(a);
    }
    myfun()
    // Set userName state with RideTypeModal value
  }, [RideTypeModal]); // Watch for changes in RideTypeModal

  return (
    <Modal
      isVisible={RideTypeModal}
      backdropColor="rgba(0, 0, 0, 0.5)"
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View style={{  backgroundColor:"white",paddingHorizontal: 20, borderRadius: 8, paddingVertical: 20 ,borderRadius:7}}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{ borderRadius: 25, width: 25, height: 25, alignItems: "center", justifyContent: "center", alignSelf: "flex-end" }}>
            <MaterialIcons name="close" size={18} color={'transparent'} />
          </TouchableOpacity>
          <Text style={{ color: "black", fontSize: 17, fontWeight: "800" }}>
            Email verification
          </Text>
          <TouchableOpacity
           
            style={{ borderRadius: 25, width: 25, height: 25, alignItems: "center", justifyContent: "center", alignSelf: "flex-end" }}>
            {/* <MaterialIcons name="close" size={18} color={'black'} /> */}
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 12 ,color:'black'}}>
          Email has been sent to your email address (<Text style={{ color: 'red' }}>{userName}</Text>). Please verify your email to proceed.
        </Text>
      </View>
    </Modal>
  );
};

export default HomeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 14,
    color: '#444',
    textAlign: 'justify',
    flexBasis: "68%",
    justifyContent: "center",
    alignItems: "center"
  },
  img_container: {
    width: 80,
    height: 80,
  },
});
