// LibraryScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Library= ({ navigation }) => {
  // Dummy library data (replace it with your actual library data)
  const libraryData = [
  
    // Add more audio files as needed
  ];

  const renderSongItem = ({ item }) => (
    <TouchableOpacity
  style={styles.songItem}
  onPress={() => navigation.navigate('MusicPlayer', { song: item })}
>
  <Text>{item.title}</Text>
</TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={libraryData}
        keyExtractor={(item) => item.id}
        renderItem={renderSongItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Library;
