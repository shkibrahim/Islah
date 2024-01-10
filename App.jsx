import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Main from './Main'
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { myTheme } from './theme';
import store from './redux/store';

const App = () => {
  enableScreens();
  return (
    <Provider store={store}>
      <PaperProvider theme={myTheme}>
        <Main />
      </PaperProvider>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})