import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { myTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';


const IsEditContainer = ({isEdit , path , id }) => {
  const navigation = useNavigation();

    const eidtButtonHanlder = (item) => {
        console.log(item.id);

        navigation.navigate(path , {id : id});
    }
    const deleteButtonHanlder = (item) => {
      console.log(item.id);
        console.log("Delete Button Pressed");
    }
  return (

      <View style={styles.btn_container}>
        <TouchableOpacity onPress={eidtButtonHanlder}  style={styles.btn}>
          <Text style={{textAlign: 'center', color: myTheme.colors.primary}}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteButtonHanlder} style={styles.btn}>
          <Text style={{textAlign: 'center', color: myTheme.colors.primary}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
  );
};

export default IsEditContainer;

const styles = StyleSheet.create({
    btn_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 16,
        borderTopColor: '#ccc',
        borderTopWidth: .5,
        paddingHorizontal : 4,
        paddingTop : 8,
        paddingBottom : 8,
    
      },
      btn: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        elevation: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    
      },
});
