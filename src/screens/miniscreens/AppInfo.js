import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
        Explore a vast collection of music and interact with the music community.
      </Text>
      <Text style={styles.developersTitle}>Developers:</Text>
      <Text style={styles.developer}>Ahmed Mukhtar</Text>
      <Text style={styles.developer}>Zara Irfan</Text>
      <Text style={styles.developer}>Maryam Rizwan</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
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
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6600FF',
    textShadowColor: '#DA70D6',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  version: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#DA70D6',
    lineHeight: 24,
    fontWeight:'bold',
  },
  developersTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6600FF',
    marginTop: 20,
    marginBottom: 10,
  },
  developer: {
    fontSize: 16,
    color: '#DA70D6',
    marginBottom: 5,
    fontWeight:'bold',
  },
  button: {
    backgroundColor: '#DA70D6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#6600FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppInfoScreen;
