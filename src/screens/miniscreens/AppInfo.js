import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AppInfoScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MusicHub</Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      <Text style={styles.description}>
        MusicHub is a music player app that allows you to enjoy your favorite songs on the go.
        Explore a vast collection of music and create your playlists for a personalized listening experience.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Go Back" onPress={handleGoBack} />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  version: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AppInfoScreen;
