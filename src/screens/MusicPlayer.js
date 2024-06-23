import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { imageBaseUrl, saveRecentSearch } from '../API/Api';
import { getUserDetail } from '../API/storage';


const MusicPlayer = ({ onLogout, tracks, searchText, heading }) => {
  const [sound, setSound] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
 
  useEffect(() => {
    const loadSound = async () => {
      if (sound) {
        // Stop and unload the current sound if it exists
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    
      const fullUrl = `${imageBaseUrl}${tracks[currentIndex]?.file}`;
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: fullUrl },
        { shouldPlay: isPlaying, position: currentTime } // Start playback from stored position
      );
    
      setSound(newSound);
    
      if (status.isLoaded) {
        setTotalDuration(status.durationMillis);
    
        // Set playback status update only if sound is defined and loaded
        if (newSound) {
          newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }
      } else {
        console.error('Failed to load sound');
      }
    };
    
  
    const onPlaybackStatusUpdate = (status) => {
      if (status.didJustFinish && isReplay) {
        // Replay is enabled, reset the sound to the beginning and play again
        sound.replayAsync();
      }
  
      setCurrentTime(status.positionMillis);
    };
  
    loadSound();
  
    // Clean up function to stop and unload the sound when component unmounts
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, [imageBaseUrl, currentIndex]);
  

  

  const togglePlayback = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        // Store the current playback position
        setCurrentTime(status.positionMillis);
      } else {
        // Resume playback from the stored position
        await sound.playAsync();
      }
      setIsPlaying(!status.isPlaying);
    }
  };
  

  const playNext = async () => {
    if (sound) {
      await sound.stopAsync();  // Stop the current sound
    }
  
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    }
  
    setCurrentIndex(nextIndex);
    setIsPlaying(true); // Set isPlaying to true for the new sound
  };
  
  const playPrevious = async () => {
    if (sound) {
      await sound.stopAsync();  // Stop the current sound
    }
  
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(true); // Set isPlaying to true for the new sound
  };
  
  const handleLogout = () => {
    if (sound) {
      sound.stopAsync();
      sound.unloadAsync();
    }
    setIsPlaying(false);
    onLogout();
  };

  const onSliderValueChange = (value) => {
    setCurrentTime(value);
  };

  const onSlidingComplete = async (value) => {
    console.log(value);
    if (sound) {
      await sound.setPositionAsync(value);
      setCurrentTime(value); // Set the current time after seeking
    }
  };  
  

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  
  const handleUploadRecentSearches = async (item, index) => {
    if (searchText.trim() === '') {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(index);
      console.log(item);
      try {
        await saveRecentSearch(item);
        console.log('Recent search saved successfully');
      } catch (error) {
        console.error('Error saving recent search:', error);
      }
    }
  };

  return (
    <>
      <View>
        <Text style={styles.listHeading}>{heading}</Text>
        <FlatList
          data={tracks}
          keyExtractor={(item, index) => index.toString()}
          style={{ maxHeight: "90%" }}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.listContainer} onPress={() => {
              handleUploadRecentSearches(item, index);
            }}>
              <Text style={styles.title}>{item?.title}</Text>
              {item.user && <Text style={styles.uploadedBy}>Artist: {item.user.name}</Text>}
              <View style={styles.lineStyle}></View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.trackTitle}>{tracks[currentIndex]?.title}</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton1} onPress={() => setIsShuffle(!isShuffle)}>
            <Entypo name="shuffle" size={30} color={isShuffle ? 'purple' : 'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={playPrevious}>
            <AntDesign name="banckward" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={togglePlayback}>
            {isPlaying ? (
              <AntDesign name="pausecircle" size={60} color="white" />
            ) : (
              <AntDesign name="play" size={60} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={playNext}>
            <AntDesign name="forward" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton2} onPress={() => setIsReplay(!isReplay)}>
            <MaterialIcons name="replay" size={30} color={isReplay ? 'purple' : 'white'} />
          </TouchableOpacity>
        </View>

        <Text>
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </Text>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={totalDuration}
          value={currentTime}
          onValueChange={onSliderValueChange}
          onSlidingComplete={onSlidingComplete}
          disabled={!sound}
          thumbTintColor='white'
          maximumTrackTintColor='white'
          
        />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0, // Place it at the exact bottom of the screen
    left: 0, // Align it to the left
    right: 0, // Align it to the right
    backgroundColor: "#DA70D6",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listHeading: {
    color:"#DA70D6",
    textShadowColor: 'pink',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    fontSize: 32,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
  },
  artwork: {
    width: 500,
    height: 500,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: "white",
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
    marginLeft: 20,
  },
  controlButton2: {
    padding: 15,
    marginRight: 10,
   
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:"#DA70D6",
    marginTop:15,
  },
  uploadedBy:{
    fontSize: 13,
    color: 'grey',
  },
  title:{
    fontSize: 14,
    color: "#6600FF",
  }
});

export default MusicPlayer;
