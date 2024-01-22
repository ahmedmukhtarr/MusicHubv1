import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/API/AuthContext';
import StackNavigation from './src/navigations/StackNavigation';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';



const App = () => {


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <AuthProvider>
          <StackNavigation />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff"
  }
});
