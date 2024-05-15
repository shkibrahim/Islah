import React, { useState,useEffect } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { myTheme } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const StudentListCard = ({studentData}) => {

  // const filteredStudents = studentsData.filter(student =>
  //   student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  const [Loading,setLoading] = useState()
  const fetchData = async () => {
    setLoading(true)
  
    console.log('fsf')
    try {
      const querySnapshot = await firestore()
        .collection('StudentData')
        .get();
  
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setLoading(false);
        setData(data)
        console.log(data)
     
  
        // You can set other states here if needed
        // setData2(data);
        // setoriginalData(data);
  
        // console.log('Data1:', data); // Log the fetched data
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {



    fetchData();
  }, []);
    

  const [Data,setData] = useState();
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
       <View style={{
         alignItems:"center",
          justifyContent : "center",
          overflow:"hidden",
        width:'60%'
        
       }}>
<Image source={{ uri: item.Profile }} style={{ width: 80, height: 80,  borderRadius:60, }} />

<Title style={{color : myTheme.colors.primary , fontWeight : "bold",fontSize:18}}>{item.Name}</Title>
       </View>
      
     <View style={{width:'30%'}}>
     <Paragraph>Degree: {item.Degree}</Paragraph>
        <Paragraph>Year: {item.Degreeyear}</Paragraph>
        <Paragraph>Board: {item.Board}</Paragraph>
        <Paragraph>School:</Paragraph>
        <Paragraph>{item.SchoolName}</Paragraph>
        <Paragraph>Medium: {item.Medium}</Paragraph>
        <Paragraph>Achievement:</Paragraph>
        <Paragraph>{item.Achievement}</Paragraph>
        <Paragraph>Ambition:</Paragraph>
        <Paragraph>{item.Ambition}</Paragraph>
     </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>

        <View style={styles.student_list_container}>
        {/* <StudentListCard studentData={Data} /> */}
      </View>
      <FlatList
        data={studentData}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal : 16,
    marginVertical : 8,
    borderRadius: 16,

  },
});

export default StudentListCard;
