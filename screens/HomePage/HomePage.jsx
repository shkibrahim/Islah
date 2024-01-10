import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  DrawerLayoutAndroid,Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopBar from '../../Components/TopBar/TopBar';
import {
  Button,
  IconButton,
  Searchbar,
  TextInput,
  Portal,
  Modal,
} from 'react-native-paper';
import {myTheme} from '../../theme';
import FixedBanner from '../../Components/FixedBanner/FixedBanner';
import CarouselPage from '../../Components/Carousel/Carousel';
import UserCard from '../../Components/UserCard/UserCard';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../Components/loader/Loader';
import {loadUser} from '../../redux/reducers/authReducers';

const HomePage = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [startupLoading, setStartupLoading] = useState(true);
  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loadUser())

    setTimeout(() => {
      setStartupLoading(false);
    }, 2000);
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 16,
    height: 300,
  };
  const onChangeSearch = query => setSearchQuery(query);
  const onMicPress = () => {
    // Handle microphone icon press (e.g., initiate voice search)
    console.log('Microphone pressed');
  };

  const data = [
    {
      id: 1,
      title: 'First Item',
      text: 'First Item Text',
      
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQQKrovVPskzUe8AnVELsw2WRxN3sAJ_ZU2i-A9KCXA&s',
    },
    {
      id: 2,
      title: 'Second Item',
      text: 'Second Item Text',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQQKrovVPskzUe8AnVELsw2WRxN3sAJ_ZU2i-A9KCXA&s',
    },
    {
      id: 3,
      title: 'Third Item',
      text: 'Third Item Text',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdQQKrovVPskzUe8AnVELsw2WRxN3sAJ_ZU2i-A9KCXA&s',
    },
  ];

  const renderItem = ({ item }) => (
 
    <View style={{backgroundColor:'red'}}>
    
      <Text>{item.title}</Text>
      <Text>{item.text}</Text>
      <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
    </View>
  );

  return startupLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      {/* Top Bar */}

      <TopBar navigation={props.navigation} />

      {/* SearchBar */}

      <View style={styles.search_container}>
        <IconButton
          icon="filter-outline"
          iconColor="#fff"
          size={20}
          onPress={() => showModal()}
        />
        <TextInput
          placeholder="Search"
          outlineColor="#fff"
          underlineColor="#fff"
          activeOutlineColor="#fff"
          activeUnderlineColor="#fff"
          cursorColor="#000"
          style={{
            width: '84%',
            height: 40,
            backgroundColor: '#fff',
          }}
        />
        <IconButton
          icon="microphone"
          size={20}
          onPress={onMicPress}
          style={styles.micIcon}
        />
      </View>

      {/* Model */}

      <Portal>
        <Modal
          contentContainerStyle={containerStyle}
          visible={visible}
          onDismiss={hideModal}>
          <View style={styles.filter_container}></View>
        </Modal>
      </Portal>

      {/* Fixed Banner */}

      <ScrollView>
        {/* <FixedBanner /> */}

        <View style={{
      height: 60,
      width: "100%",
      backgroundColor: "#ddd",
      justifyContent: "center",
      alignItems: "center",
      overflow:'hidden'
    }}>
     
        <Image  style={{
          resizeMode:'center',height:50,
        }}source={require('../../assets/images/logo.png')} />
     
      
    </View>
        {/* Carousel */}

        <CarouselPage 
        data={data} 
        // renderItem={renderItem}
        indicatorshows={true} autoPlay={true} />

        {/* User Cards */}

        <View
          style={{
            marginTop: 16,
          }}>
          <UserCard
            user={{
              name: 'Abdul Rehman',
              catergory: 'Business',
              location: 'Lahore',
              url: 'https://media.istockphoto.com/id/1356118511/photo/smart-city-and-abstract-dot-point-connect-with-gradient-line.jpg?s=612x612&w=0&k=20&c=GJldTyxDEt0GodKxGONHz9PrN9QcQQAGKONUM0vBvYc=',
            }}
          />
          <UserCard
            user={{
              name: 'Abdul Rehman',
              catergory: 'Business',
              location: 'Islamabad',
              url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtC7K9n9pw9z8HVmI-o0DghbHvBZDcwEbowKw5ViO2Rw&s',
            }}
          />
          <UserCard
            user={{
              name: 'Abdul Rehman',
              catergory: 'Business',
              location: 'Rawalpindi',
              url: 'https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=600',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: myTheme.colors.primary,
    paddingVertical: 8,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    marginRight: 8,
    position: 'absolute',
    right: 8,
  },
  users_container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filter_container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});
