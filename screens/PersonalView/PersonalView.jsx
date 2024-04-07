import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {myTheme} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const PersonalView = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState();
  const {Data} = route.params;

  console.log('userkadata', Data);

  const renderItem1 = ({item}) => (
    <View
      style={{
        borderRadius: 15,
        // borderWidth: 0.5,
        // backgroundColor: '#ddd',
        // borderColor: '#ddd',
        // height: 60,
        margin: 12,
        padding: 12,
      }}
      onPress={() => navigation.navigate('News')}>
         <View style={styles.img_container}>
      
          <Image source={{uri: item.Profile}} style={styles.img} />
      
      </View>
      <View style={{flexDirection:'row',alignItems:"center",alignSelf:"center"}}>
      <Text style={styles.title}>{item.Name}</Text>
      <Text style={styles.title}> {item.Surname}</Text>
      </View>
      <Text style={{...styles.text, alignSelf:"center"}}>
      {item.Category}
      </Text>
      <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Father Name</Text>
      <Text style={styles.text}>{item.FatherName}</Text>
      </View>


      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Mother Name</Text>

     <Text style={styles.text}>
  {item.MotherName ? item.MotherName : '-'}
</Text>

      </View>

     </View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Grand Father Name(Dada)</Text>
      <Text style={styles.text}>{item.GrandFatherName}</Text>
      </View>


      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Grand Father Name(Nana)</Text>

     <Text style={styles.text}>
 {item.Nana}
</Text>

      </View>

     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Gender</Text>
      <Text style={styles.text}>{item.Gender}</Text>
      </View>


      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}> Date of Birth</Text>

     <Text style={styles.text}>
 {item.Dob}
</Text>

      </View>

     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Marital Status:</Text>
      <Text style={styles.text}>{item.MaritalStatus}</Text>
      </View>


      {item.MaritalStatus !== 'unmarried' && (
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Partner Name</Text>
<Text style={styles.text}>
{item.PartnerName ? item.PartnerName : '-'}
</Text>

  </View>
)}


     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Country</Text>
      <Text style={styles.text}>{item.Country}</Text>
      </View>


     
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>State</Text>
<Text style={styles.text}>
{item.State}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>City</Text>
      <Text style={styles.text}>{item.City}</Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>District</Text>
<Text style={styles.text}>
{item.District}
</Text>

  </View>



     </View>

     
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Address</Text>
      <Text style={styles.text}>
      {item.Address ? item.Address : '-'}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Postal Code</Text>
<Text style={styles.text}>
{item.PostalCode}
</Text>

  </View>



     </View>
     

     <Text style={styles.title}> Further Details</Text>
     {item.Category === 'jobseeker' && (
     <View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>About me</Text>
      <Text style={styles.text}>
      {item.AboutMe}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Educational Qualification</Text>
<Text style={styles.text}>
{item.Education}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Profession</Text>
      <Text style={styles.text}>
      {item.Profession}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Skills</Text>
<Text style={styles.text}>
{item.Skills}
</Text>

  </View>



     </View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Salary Expectation</Text>
      <Text style={styles.text}>
      {item.Salary}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Joining Details</Text>
<Text style={styles.text}>
{item.Join}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Experience</Text>
      <Text style={styles.text}>
      {item.Experience}
      </Text>
      </View>

      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Last Company Info</Text>
      <Text style={styles.text}>
      {item.LastCompanyName}
      </Text>
      </View>


    
  



     </View>
     </View>
     )}



{item.Category === 'business' && (
     <View>
 <Text style={{color:"red",alignSelf:"center"}}>(Data is available on Business Listed)</Text>
     </View>
     )}



{item.Category === 'student' && (
     <View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Degree</Text>
      <Text style={styles.text}>
      {item.Degree}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Degree Year</Text>
<Text style={styles.text}>
{item.Degreeyear}
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Board</Text>
      <Text style={styles.text}>
      {item.Board}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Medium</Text>
<Text style={styles.text}>
{item.Medium}
</Text>

  </View>



     </View>
     <View style={{flexDirection:'row',alignItems:"center",width:'100%',justifyContent:"space-between"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>School/College Name</Text>
      <Text style={styles.text}>
      {item.SchoolName}
      </Text>
      </View>


    
  <View style={{ alignItems: "center" }}>
    <Text style={styles.head}>Achievements</Text>
<Text style={styles.text}>
{item.Achievement? item.Achievement: '-' }
</Text>

  </View>



     </View>

     <View style={{flexDirection:'row',alignItems:"center",width:'100%',alignSelf:"centeras"}}>
      <View style={{alignItems:"center"}}> 
      <Text style={styles.head}>Ambition</Text>
      <Text style={styles.text}>
      {item.Ambition}
      </Text>
      </View>


    
  



     </View>
     </View>
     )}

    </View>
  );
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={{alignSelf: 'center', marginTop: 300}}
        />
      ) : (
        <View>
          <FlatList
            data={[Data]}
            renderItem={renderItem1}
            keyExtractor={item => item.id}
          />

          {/* <View style={{height:"90%"}}> 
      <FlatList
        data={filteredData1}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserItem}
      />
      </View> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  head:{
   fontSize: 13,
        color: 'black',alignSelf:"center",
      
        fontWeight:'bold',
        textAlign: 'justify',
        // flexBasis : "68%",
        justifyContent: 'center',
        alignItems: 'center'
  },
  img_container: {
    alignSelf:"center",alignItems:"center",justifyContent:"center",
    width: 160,
    height: 180,
    overflow: 'hidden',
    borderRadius: 160,
  },
  text:{
color:"black",marginBottom:12
  },
  title: {
    fontSize: 28,
    color: 'black',alignSelf:"center",
    // marginVertical:12,
    fontWeight:'bold',
    textAlign: 'justify',
    // flexBasis : "68%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 160,alignSelf:"center",borderRadius:160,
    height: 160
    // resizeMode: 'contain',
  },
  searchInput: {
    margin: 16,
    borderColor: myTheme.colors.primary,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 32,
    color: 'black',
    backgroundColor: '#ddd',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dp: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  sendButton: {
    padding: 8,
    backgroundColor: myTheme.colors.primary,
    borderRadius: 8,
  },
  btn_text: {
    color: '#fff',
    fontSize: 12,
  },
});

export default PersonalView;
