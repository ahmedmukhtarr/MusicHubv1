import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button, ActivityIndicator } from 'react-native';
import MusicPlayer from './MusicPlayer';
import { getAllMusic, uploadMusic } from '../API/Api';
import { getUserDetail } from '../API/storage';
import * as DocumentPicker from 'expo-document-picker';

const MusicScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUploadUrl, setImageUploadUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMusic();
        setTracks(response?.data);
        console.log("music data", response?.data);
      } catch (error) {
        console.error("Error fetching posts:", error.response);
      }
    };

    fetchData();
  }, []);

  const handleUploadMusic = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*"
      });

      if (!result.canceled) {
        setImageUploadUrl(result.assets[0])
      }
    } catch (error) {
      console.error('Error uploading music:', error);
    }
  };

    const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
        const fileUrl = imageUploadUrl?.uri;
        const fileType = imageUploadUrl?.mimeType;
        const fileName = imageUploadUrl?.name;
        const user = await getUserDetail();

        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('title', fileName);
        formData.append('language', language);
        formData.append('genre', genre);
        formData.append('file', {
          uri: fileUrl,
          name: fileName,
          type: fileType,
        });

        await uploadMusic(formData);
        setRefreshing(true);
        setIsModalVisible(false);
        const response = await getAllMusic();
        setTracks(response?.data);
        console.log("music data", response?.data);
    } catch (error) {
      setRefreshing(false);
      console.error('Error uploading music:', error);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  const openUploadModal = () => {
    setIsModalVisible(true);
  };

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
        placeholderTextColor={"#DA70D6"}
        onChangeText={(text) => {
          setSearchText(text);
        }}
      />

      <View style={styles.touchableContainer}>
        <TouchableOpacity style={styles.touchable} onPress={openUploadModal}>
          <Text style={styles.touchableText}>Upload</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Language"
              value={language}
              onChangeText={setLanguage}
            />
            <TextInput
              style={styles.input}
              placeholder="Genre"
              value={genre}
              onChangeText={setGenre}
            />
            <TouchableOpacity style={styles.submitmodal} onPress={(handleUploadMusic)}><Text>Upload File</Text></TouchableOpacity>
            <Text style={{ color: 'red' }}>Selected Song: {imageUploadUrl?.name}</Text>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={styles.submitmodal} onPress={(handleFormSubmit)}><Text>Submit</Text></TouchableOpacity>
              <TouchableOpacity style={styles.cancelmodal}  onPress={() => setIsModalVisible(false)}><Text>Cancel</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isLoading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <MusicPlayer tracks={getFilteredTracks()} searchText={searchText} heading={"Music List"} />
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
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    marginLeft:10,
    
  }
});

export default MusicScreen;
