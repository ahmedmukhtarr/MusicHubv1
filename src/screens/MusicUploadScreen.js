import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

const MusicUploadScreen = () => {
  const soundRef = useRef();

  const playAudio = async (mp3FileUrl) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: mp3FileUrl },
        { shouldPlay: true }
      );

      // Save the sound object to stop/pause later
      // You can store it in the state or a ref
      // For simplicity, I'm using a local variable here
      soundRef.current = sound;
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleUploadMP3 = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
      try {
        const fileUrl = result?.assets[0]?.uri;

        // Now you can use 'fileUrl' to play the audio
        console.log(fileUrl);

        // Further processing or uploading logic can be added here.
      } catch (error) {
        console.error('Error fetching or processing the file:', error);
      }
    }
  };

  useEffect(() => {
    playAudio("file:///data/user/0/host.exp.exponent/cache/DocumentPicker/f139ced7-fd39-4ecc-bd9a-03294fcee428.opus");
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadMP3}>
        <MaterialCommunityIcons name="plus" size={24} color="blue" />
        <Text style={styles.uploadButtonText}>Upload MP3 File</Text>
      </TouchableOpacity>
      {/* Add other components for music uploading here */}
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
});

export default MusicUploadScreen;