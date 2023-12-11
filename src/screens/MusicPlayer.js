import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const audioFiles = [
  { title: 'Dil Nu', file: require('./../../assets/dilnu.mp3') },
  { title: 'Mocking Bird', file: require('./../../assets/2.mp3') },
  { title: 'Hona Tha Pyaar', file: require('./../../assets/3.mp3') },
  // Add more audio files as needed
];

const MusicPlayer = ({ onLogout }) => {
  const [sound, setSound] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isReplay, setIsReplay] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      console.log('Loading Sound');
      const { sound: newSound } = await Audio.Sound.createAsync(audioFiles[currentIndex].file);
      setSound(newSound);

      if (isPlaying) {
        console.log('Playing Sound');
        await newSound.playAsync();
      }
    };

    loadSound();

    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.stopAsync();
        sound.unloadAsync();
        setIsPlaying(false);
      }
    };
  }, [currentIndex]);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      console.log('Sound not loaded yet');
    }
  };

  const togglePlayback = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!status.isPlaying);
    }
  };

  const playNext = () => {
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * audioFiles.length);
    } else {
      nextIndex = currentIndex < audioFiles.length - 1 ? currentIndex + 1 : 0;
    }
    setCurrentIndex(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : audioFiles.length - 1;
    setCurrentIndex(prevIndex);
  };

  const handleLogout = () => {
    if (sound) {
      sound.stopAsync();
      sound.unloadAsync();
    }
    setIsPlaying(false);
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.trackTitle}>{audioFiles[currentIndex].title}</Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton1} onPress={handleLogout}>
          <Entypo name="shuffle" size={30} color={isShuffle ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={playPrevious}>
          <AntDesign name="banckward" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={togglePlayback}>
          {isPlaying ? (
            <AntDesign name="pausecircle" size={40} color="black" />
          ) : (
            <AntDesign name="play" size={40} color="black" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={playNext}>
          <AntDesign name="forward" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton1} onPress={() => setIsReplay(!isReplay)}>
          <MaterialIcons name="replay" size={30} color={isReplay ? 'blue' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  artwork: {
    width: 500,
    height: 500,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    padding: 15,
  },
  controlButton1: {
    padding: 15,
    marginRight: 10,
  },
});

export default MusicPlayer;
