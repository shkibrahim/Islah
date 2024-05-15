

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SideBar = () => {
  const navigation = useNavigation();

  const menuItems = [
    { label: 'About Us', screen: 'AboutUs' },
    { label: 'Advertise with Us', screen: 'Advertise' },
    { label: 'Terms and Conditions', screen: 'TermsAndConditions' },
    { label: 'Events & Gallery', screen: 'EventsGallery' },
    { label: 'Associates', screen: 'Associates' },
    { label: 'Membership Card Download', screen: 'MembershipCard' },
    { label: 'Contact Us', screen: 'ContactUs' },
    { label: 'Report a Problem', screen: 'Report' },

  ];

  const handleMenuItemPress = (screen) => {
    navigation.navigate(screen);
  };


  const Logout =()=>{
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.img} source={require('../../assets/images/logo.png')} />
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => handleMenuItemPress(item.screen)}
        >
          <Text style={styles.menuItemText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
      {/* <TouchableOpacity
        style={styles.menuItem}
        onPress={Logout}
      >
        <Text style={styles.menuItemText}>Log Out</Text>
      </TouchableOpacity> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Adjust background color as needed
    elevation: 80,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: .4,
    borderBottomColor: '#ddd', // Adjust border color as needed
  },
  menuItemText: {
    fontSize: 16,
    color: '#666', // Adjust text color as needed
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export default SideBar;
