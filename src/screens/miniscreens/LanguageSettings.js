import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import * as RNLocalize from 'react-native-localize';
import { useNavigation } from '@react-navigation/native';

const LanguageSettings = ({ setLanguage }) => {
  // const navigation = useNavigation();

   // const currentLanguageCode = RNLocalize.getLocales()[0].languageCode;

  const handleLanguageChange = (en) => {
    // Here, you can save the chosen language to storage (e.g., AsyncStorage)
    // For demonstration, we'll just set the language in state
   //  setLanguage(en);
 //  navigation.goBack(); // Navigate back after changing language
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Language</Text>

      <TouchableOpacity onPress={() => handleLanguageChange('en')}>
        <Text style={ styles.option}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLanguageChange('ko')}>
        <Text style={ styles.option}>Korean</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLanguageChange('es')}>
        <Text style={ styles.option}>Spanish</Text>
      </TouchableOpacity>

  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
  selectedOption: {
    fontSize: 18,
    marginVertical: 10,
    color: 'blue', // or any other color to indicate the selected language
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    marginVertical: 20,
    color: 'red', // or any other color
    textDecorationLine: 'underline',
  },
});

export default LanguageSettings;
