import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-paper';

const PostCard = ({title, content}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleAddComment = comment => {
    console.log(comment);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userProfile}>
        <Image
          style={styles.userProfileImage}
          source={require('../../assets/images/user.png')}
        />
        <Text style={styles.userProfileName}>User Name</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.commentButton} onPress={handleLike}>
          <Text style={styles.buttonText}>
            <Icon source="thumb-up-outline" size={16} /> {likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleAddComment('A new comment')}>
          <Text style={styles.commentButtonText}>
            <Icon source="comment-outline" size={16} /> Comment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleAddComment('A new comment')}>
          <Text style={styles.commentButtonText}>
            <Icon source="share" size={16} /> Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal : 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#000',
  },
  commentsContainer: {
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'justify',
  },
  commentButton: {
    padding: 8,
  },
  commentButtonText: {
    color: '#333',
  },
  userProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userProfileName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PostCard;
