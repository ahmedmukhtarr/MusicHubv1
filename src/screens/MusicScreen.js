import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MusicPlayer from './MusicPlayer';

const MusicScreen = ({navigation}) => {
  const handleUploadMusic = () => {
    // Handle navigation to the music upload screen.
  };

  const handleLibrary = () => {
    // Handle navigation to the library screen.
  };

  const handlePlaylists = () => {
    // Handle navigation to the playlists screen.
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search music"
        onChangeText={(text) => {
          // Handle search functionality here
        }}
      />

      {/* Three Touchable Containers */}
      <View style={styles.touchableContainer}>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('MusicUpload')}>
          <Text style={styles.touchableText}>Upload Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Library')}>
          <Text style={styles.touchableText}>Library</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.touchable2} onPress={() => navigation.navigate('Playlist')}>
        <Text style={styles.touchableText}>Playlists</Text>
      </TouchableOpacity>

      <View>
      <MusicPlayer/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    
  },
  content: {
    flex: 1,
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 5,
    marginTop: 170, 
  },
  touchable: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '47%',
    height: '100%',
    alignItems: 'center',
  },
  touchable2: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '96%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    
  },
  
});

export default MusicScreen;
