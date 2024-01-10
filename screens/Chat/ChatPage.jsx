import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {myTheme} from '../../theme';
import {useNavigation} from '@react-navigation/native';

const ChatPage = ({navigation}) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'User 1',
      category: 'Businsess',
      dp: 'https://picsum.photos/200/298',
    },
    {
      id: 2,
      name: 'User 2',
      category: 'Student',
      dp: 'https://picsum.photos/200/301',
    },
    {
      id: 3,
      name: 'User 3',
      category: 'Job Seeker',
      dp: 'https://picsum.photos/200/304',
    },
    {
      id: 4,
      name: 'Random ',
      category: 'Job Seeker',
      dp: 'https://picsum.photos/200/307',
    },
    {
      id: 5,
      name: 'User 1',
      category: 'Businsess',
      dp: 'https://picsum.photos/200/297',
    },
    {
      id: 6,
      name: 'User 2',
      category: 'Student',
      dp: 'https://picsum.photos/200/301',
    },
    {
      id: 7,
      name: 'User 3',
      category: 'Job Seeker',
      dp: 'https://picsum.photos/200/304',
    },
    {
      id: 8,
      name: 'Random ',
      category: 'Job Seeker',
      dp: 'https://picsum.photos/200/307',
    },
    // Add more users as needed
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Filter users based on the search term
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleUserClick = userId => {
    // Implement the logic for handling user clicks, e.g., navigate to a chat screen
    console.log(`User clicked: ${userId}`);
  };

  const handleSendRequest = userId => {
    // Implement the logic for sending a request to the person
    navigation.navigate('singleChat');
    console.log(`Request sent to user: ${userId}`);
  };

  const renderUserItem = ({item}) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Image source={{uri: item.dp}} style={styles.dp} />
        <View>
          <Text>{item.name}</Text>
          <Text>{item.category}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleSendRequest(item.id)}
        style={styles.sendButton}>
        <Text style={styles.btn_text}>Send Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users"
        placeholderTextColor={'#666'}
        onChangeText={text => setSearchTerm(text)}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderColor: myTheme.colors.primary,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 32,
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

export default ChatPage;
