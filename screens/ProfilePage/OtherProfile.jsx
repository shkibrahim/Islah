import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, IconButton} from 'react-native-paper';
import {myTheme} from '../../theme';

const UserProfile = () => {
  //   const { userId, fullName, role, location, qualification, bio, postCount, commentCount, posts } = route.params;
  const userId = 1;
  const fullName = 'John Doe';
  const role = 'Software Engineer';
  const location = 'London, UK';
  const qualification = 'BSc Computer Science';
  const bio =
    'I am a software engineer with 5 years of experience in building web applications.';
  const postCount = 5;
  const commentCount = 10;
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      content: 'This is the first post',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'This is the second post',
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'This is the third post',
    },
    {
      id: 4,
      title: 'Post 4',
      content: 'This is the fourth post',
    },
    {
      id: 5,
      title: 'Post 5',
      content: 'This is the fifth post',
    },
  ];

  const navigation = useNavigation();

  const renderPostItem = () => (
    <View style={styles.postItem}>
      <Text>{'Title'}</Text>
      <Text>{'Count'}</Text>
    </View>
  );

  const handleComment = () => {
    // Implement comment functionality
    console.log('Commenting on the profile');
  };

  const handleShareProfile = () => {
    // Implement share profile functionality
    console.log('Sharing the profile');
  };

  const handleSendMessage = () => {
    // Implement send message functionality
    console.log('Sending a message');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <Image
            source={require('../../assets/images/user.png')}
            style={styles.profileImage}
          />
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.role}>{role}</Text>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.qualification}>{qualification}</Text>
        </View>
        <Text style={styles.bio_heading}>About Me</Text>
        <Text style={styles.bio}>{bio}</Text>

        <View style={styles.statsContainer}>
          <Text>{`Posts: ${postCount}`}</Text>
          <Text>{`Comments: ${commentCount}`}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8,
          }}>
          <TouchableOpacity onPress={handleShareProfile} style={styles.button}>
            <Icon source="share" size={20} />
            <Text style={{
              fontSize : 12
            }}>Share</Text>
          </TouchableOpacity>

          <View style={styles.social_icons_container}>

            {/* Add social icons here  */}

            <IconButton
            icon='facebook'
            size={22}
            color={myTheme.colors.primary}
            onPress={() => console.log('Pressed')}
            />
            <IconButton
            icon='twitter'
            size={22}
            color={myTheme.colors.primary}
            onPress={() => console.log('Pressed')}
            />
            <IconButton
            icon='instagram'
            size={22}
            color={myTheme.colors.primary}
            onPress={() => console.log('Pressed')}
            />
            <IconButton
            icon='linkedin'
            size={22}
            color={myTheme.colors.primary}
            onPress={() => console.log('Pressed')}
            />


          </View>

          <TouchableOpacity onPress={handleSendMessage} style={styles.button}>
            <Icon source="message" size={18} />
            <Text style={{
              fontSize : 12
            }}>Message</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recent Posts</Text>

        {/* Posts  */}

        {posts.map(item => (
          <View style={styles.postItem} key={item.id}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        ))}

        {/* <View style={{height : 500}}>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPostItem}
            />
            </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  fullName: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  role: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    marginBottom: 8,
  },
  qualification: {
    fontSize: 14,
    marginBottom: 8,
  },
  bio_heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 8,
  },
  social_icons_container : {
    flexDirection : 'row',
    justifyContent : 'center',
    width : '50%',
    alignItems : 'center'
  }
});

export default UserProfile;
