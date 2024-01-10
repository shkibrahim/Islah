import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { myTheme } from '../../theme';

const StudentListCard = ({ studentData }) => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
       <View style={{
          alignItems : "center",
          justifyContent : "center",
        
       }}>
       <Image source={require('../../assets/images/user.png')} style={{ width: 50, height: 50 }} />
        <Title style={{color : myTheme.colors.primary , fontWeight : "bold"}}>{item.name}</Title>
       </View>
     <View>
     <Paragraph>Degree: {item.degree}</Paragraph>
        <Paragraph>Year: {item.year}</Paragraph>
        <Paragraph>Board: {item.board}</Paragraph>
        <Paragraph>School: {item.schoolName}</Paragraph>
        <Paragraph>Medium: {item.medium}</Paragraph>
        <Paragraph>Achievement: {item.achievement}</Paragraph>
        <Paragraph>Ambition: {item.ambition}</Paragraph>
     </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={studentData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
