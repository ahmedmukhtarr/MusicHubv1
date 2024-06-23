import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button, ActivityIndicator } from 'react-native';
import MusicPlayer from './MusicPlayer';
import { getAllMusic, getAllRecentSearches, uploadMusic } from '../API/Api';
import { getUserDetail } from '../API/storage';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const Recommend = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [recents, setRecents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUploadUrl, setImageUploadUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

  const getUserData = async () => {
    const user = await getUserDetail();
    console.log("sjsjjj", user?._id);
    setCurrentUser(user?._id);
  }

  useFocusEffect(
    useCallback(() => {
      const getUserData = async () => {
        const user = await getUserDetail();
        console.log(user._id);
        setCurrentUser(user._id);
      };

      getUserData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
    const fetchData = async () => {
      try {
        const recentSearchesResponse = await getAllRecentSearches();
        const topRecentSearches = recentSearchesResponse.slice(0, 5);
        console.log(topRecentSearches, 'topRecentSearches');

        if (recentSearchesResponse.length > 0) {
            const topGenre = recentSearchesResponse[0].genre;
          console.log(topGenre, 'topGenre');

          // Use a Set to track unique titles
          const uniqueTitles = new Set();
          const filteredSearches = [];

          recentSearchesResponse.forEach(search => {
            if (search.genre === topGenre && !uniqueTitles.has(search.title)) {
              uniqueTitles.add(search.title);
              filteredSearches.push(search);
            }
          });

          console.log(filteredSearches.map(item => item.genre), 'filteredSearches');
            
            setRecents(filteredSearches);
        }

        const url = `http://127.0.0.1:8000/api/searchhistory/recommend/?user_id=${currentUser}`;        
        const recommendedResponse = await axios.get(url);
        console.log(recommendedResponse, 'recommendedResponse');
        setRecents(recommendedResponse);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchData();
}, [])
);

  const getFilteredTracks = () => {
    if (searchText.trim() === '') {
      return recents;
    } else {
      return recents.filter(track => track.title.toLowerCase().includes(searchText.toLowerCase()));
    }
  };

  return (
    <View style={styles.container}>

      {isLoading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <MusicPlayer tracks={getFilteredTracks()} searchText={searchText} heading={"Discover your music taste"} />
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
    backgroundColor: "#F5FEFD",
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderWidth: 3,
    borderColor: "#DA70D6",
    borderRadius: 8,
    padding: 10,
    color: 'red',
    
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
    backgroundColor: "#DA70D6",
  },
  touchableText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#DA70D6',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitmodal:{
    padding: 10,
    borderRadius: 10,
    width: '30%',
    backgroundColor: "#DA70D6",
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
  },
  cancelmodal:{
    padding: 10,
    borderRadius: 10,
    width: '30%',
    backgroundColor: "#DA70D6",
    marginTop:10,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
  }
});

export default Recommend;
