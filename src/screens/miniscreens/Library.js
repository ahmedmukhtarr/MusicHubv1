import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getAllMusic } from '../../API/Api'; // Import the API function to fetch all music
import MusicPlayer from '../MusicPlayer';
import { AuthContext } from '../../API/AuthContext';
import { getUserDetail } from '../../API/storage';

const Library = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const getUserData = async () => {
    const user = await getUserDetail();
    console.log("sjsjjj", user?._id);
    setCurrentUser(user?._id);
  }

  useEffect(() => {
    getUserData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRefreshing(true);
        const response = await getAllMusic(); // Call the API function to fetch all music
        setRefreshing(false);
        console.log("userId", currentUser);
        console.log("response?.data", response?.data);
        const filteredData = response?.data.filter(item => item.user.id === currentUser);
        setTracks(filteredData);
      } catch (error) {
        console.error('Error fetching music:', error);
        setRefreshing(false);
      }
    };

    if(currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const getFilteredTracks = () => {
    if (searchText.trim() === '') {
      return tracks;
    } else {
      return tracks.filter(track => track.title.toLowerCase().includes(searchText.toLowerCase()));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search music"
        onChangeText={(text) => setSearchText(text)}
      />

      {refreshing ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <MusicPlayer tracks={getFilteredTracks()} heading={"My Library"} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
});

export default Library;
