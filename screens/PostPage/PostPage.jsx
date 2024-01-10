import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {myTheme} from '../../theme';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import PostCard from '../../Components/PostCard/PostCard';
import {Button, Dialog, Portal} from 'react-native-paper';

const PostPage = () => {
  const [content, setContent] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isContentEmpty, setIsContentEmpty] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const onpressHanlder = () => {};
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: myTheme.colors.background,
      }}>
      {/* Main Page Heading */}
      <View
        style={{
          width: '100%',
          height: 50,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: myTheme.colors.primary,
            color: '#fff',
            textAlign: 'center',
            paddingBottom: 8,
          }}>
          Posts
        </Text>
      </View>

      <TouchableOpacity
        style={styles.create_post_btn}
        onPress={() => setIsDialogVisible(true)}>
        <Text>Create Post</Text>
      </TouchableOpacity>

      <Portal>
        <Dialog
          style={{
            backgroundColor: '#fff',
          }}
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>Post Details</Dialog.Title>
          <Dialog.Content
            style={{
              width: '100%',
              height: 250,
            }}>
            <TextInput
              multiline={true}
              numberOfLines={10}
              style={{
                height: 150,
                textAlignVertical: 'top',
                backgroundColor: '#ddd',
                marginTop: 8,
                width: '100%',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                borderColor: myTheme.colors.primary,
                borderWidth: 1,
              }}
              placeholder="Write post"
              value={content}
              onChangeText={setContent}
            />
            <Button
              onPress={() => {
                setIsDialogVisible(false);
              }}
              textColor="#333"
              style={styles.btn}>
              Create Post
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <PostCard
        title={'loreum ipsum'}
        content={'Description  '}
        key={'sdfsf'}
      />
      <PostCard
        title={'loreum ipsum'}
        content={'Description  '}
        key={'sdfsdf'}
      />
      <PostCard
        title={'loreum ipsum'}
        content={'Description  '}
        key={'sdffsdfsdf'}
      />
      <PostCard
        title={'loreum ipsum'}
        content={'Description  '}
        key={'sdsdffsdf'}
      />
    </ScrollView>
  );
};

export default PostPage;

const styles = StyleSheet.create({
  create_post_btn: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  btn: {
    marginHorizontal: 16,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
});
