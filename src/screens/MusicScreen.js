import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MusicPlayer from './MusicPlayer';
import { getAllMusic } from '../API/Api';
import { useFocusEffect } from '@react-navigation/native';

const MusicScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleUploadMusic = () => {
    // Handle navigation to the music upload screen.
  };

  const handleLibrary = () => {
    // Handle navigation to the library screen.
  };

  const handlePlaylists = () => {
    // Handle navigation to the playlists screen.
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMusic();
        setTracks(response?.data);
        console.log("music data", response?.data);
      } catch (error) {
        console.error("Error fetching posts:", error.response);
      }
    }

    fetchData();
  }, [])
  
  // useFocusEffect(
  //   React.useCallback(() => {
  //   const fetchData = async () => {
  //     try {
  //       setRefreshing(true);
  //       const response = await getAllMusic();
  //       if(response?.success) {
  //         setRefreshing(false);
  //         setTracks(response?.data);
  //       }
  //     } catch (error) {
  //       setRefreshing(false);
  //       console.error("Error fetching posts:", error.response);
  //     }
  //   }

  //   fetchData();
  //   }, [])
  // );

  const audioFiles = [
    { title: 'Dil Nu', file: require('./../../assets/dilnu.mp3') },
    { title: 'Mocking Bird', file: require('./../../assets/2.mp3') },
    { title: 'Hona Tha Pyaar', file: require('./../../assets/3.mp3') },
    // Add more audio files as needed
  ];

  // Function to filter tracks based on search text
  const getFilteredTracks = () => {
    if (searchText.trim() === '') {
      return tracks; // If search text is empty, return all tracks
    } else {
      return tracks.filter(track => track.title.toLowerCase().includes(searchText.toLowerCase()));
    }
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search music"
        onChangeText={(text) => {
          // Handle search functionality here
          setSearchText(text);
        }}
      />

      {/* Three Touchable Containers */}
      <View 
        style={styles.touchableContainer}
      >
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('MusicUpload')}>
          <Text style={styles.touchableText}>Upload</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Library')}>
          <Text style={styles.touchableText}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Library')}>
          <Text style={styles.touchableText}>Library</Text>
        </TouchableOpacity> */}
      </View>

      {refreshing ? (
        <ActivityIndicator size="small" color="blue" />
       ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <MusicPlayer tracks={getFilteredTracks()} />
        </View>
       )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: "#E6E6FA",
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    marginTop: 10, 
  },
  touchable: {
    padding: 10,
    borderRadius: 10,
    width: '30%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#CBC3E3',
  },
  touchableText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});

export default MusicScreen;
