import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Paragraph,
  Text,
  Title,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import CustomButton from '../../../Components/CustomButton';
import CustomTextInput from '../../../Components/CustomTextInput';
import {login} from '../../../redux/reducers/authReducers';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from '@reduxjs/toolkit';
import Loader from '../../../Components/loader/Loader';
import { useNavigation } from '@react-navigation/native';
import {clearError} from '../../../redux/slice/authSlice';

const SignIn = ({route,   }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);
  const {err, loading, isAuthenticated} = useSelector(state => state.auth);
const navigation = useNavigation()
  console.log(
    `error ->`,
    err,
    'loading ->',
    loading,
    'isAuthenticated ->',
    isAuthenticated,
  );

  useEffect(() => {
    if (isAuthenticated) {
        navigation.navigate('home');
    }
    if (err) {
      Alert.alert('Error', err);
      dispatch(clearError());
    }
  }, [isAuthenticated, err, dispatch]);

  const dispatch = useDispatch();
  const loginHandler = () => {
    if (username === '' || password === '') {
      setError(true);
    } else {
      setError(false);
      // dispatch(login(username, password));
        navigation.navigate('home')
    }
  };

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Title style={styles.brandName}>Islah Committee</Title>
          <Title style={styles.heading}>Welcome Back</Title>
          <Paragraph style={{marginBottom: 8}}>Sign in to continue</Paragraph>
          {/* input Fields */}
          <CustomTextInput
            setError={setIsUsernameEmpty}
            required={false}
            error={isUsernameEmpty}
            value={username}
            onChange={setUsername}
            label="Username"
          />
          <TextInput
            underlineColor="#000"
            activeOutlineColor="#197739"
            placeholderTextColor="#666"
            textColor="#000"
            selectionColor="green"
            outlineColor="#197739"
            style={styles.input}
            outlineStyle={{borderRadius: 8}}
            cursorColor="green"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            mode="outlined"
            right={
              <TextInput.Icon
                size={20}
                color="#666"
                icon={hidePassword ? 'eye-off' : 'eye'}
                onPress={() => setHidePassword(!hidePassword)}
              />
            }
            error={isPasswordEmpty}
          />

          {/* Showing error  */}

          {error && (
            <Text style={{marginTop: 8, color: 'red', marginBottom: 8}}>
              Please enter Username and password
            </Text>
          )}

          {/* Sign In button */}

          <CustomButton
            label="Sign In"
            onPress={() => {
              loginHandler();
            }}
          />

          <Text>
            Don't have an account?
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('beforesignup');
              }}>
              <Text
                style={{color: '#197739', marginLeft: 4, fontWeight: 'bold'}}>
                {' '}
                Sign Up
              </Text>
            </TouchableOpacity>
          </Text>
          <TouchableOpacity
            style={{
              paddingTop: 8,
            }}
            onPress={() => {
                navigation.navigate('forgotPassword');
            }}>
            <Text style={{color: '#197739', marginLeft: 4}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#197739',
  },
  brandName: {
    marginBottom: 72,
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: 'Roboto',
    color: '#197739',
    padding: 8,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 8,
    objectFit: 'cover',
  },
  input: {
    width: '100%',
    marginBottom: 4,
    backgroundColor: '#ddd',
    fontFamily: 'Roboto',
    fontSize: 14,
    position: 'relative',
    borderRadius: 20,
  },
  // input: {
  //     width: '100%',
  //     borderColor: "green",
  //     backgroundColor: "#ddd",
  //     marginVertical: 8,
  // },
  button: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#197739',
  },
});
