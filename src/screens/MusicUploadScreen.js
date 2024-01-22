import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import { uploadMusic } from '../API/Api';
import { getUserDetail } from '../API/storage';

const MusicUploadScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadMP3 = async () => {
    try {
      setIsLoading(true);

      let result = await DocumentPicker.getDocumentAsync({
        type: "audio/*" // all audio files
      });

      if (!result.canceled) {
        const fileUrl = result?.assets[0]?.uri;
        const fileType = result?.assets[0]?.mimeType;
        const fileName = result?.assets[0]?.name;
        const user = await getUserDetail();

        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('title', fileName);
        formData.append('file', {
          uri: fileUrl,
          name: fileName,
          type: fileType,
        });

        // Use Promise.all to await both the uploadMusic call and further processing
        await Promise.all([
          uploadMusic(formData).then(response => alert(response?.message)),
        ]);
      }
    } catch (error) {
      console.error('Error fetching or processing the file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="small" color="blue" />}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadMP3}>
        <MaterialCommunityIcons name="plus" size={24} color="blue" />
        <Text style={styles.uploadButtonText}>Upload MP3 File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    marginLeft: 5,
    fontSize: 18,
    color: 'blue',
  },
  uploadedSong: {
    backgroundColor: '#E6E6FA',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default MusicUploadScreen;
