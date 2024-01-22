import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const MusicPlayer = ({ onLogout, tracks }) => {
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
        await sound.stopAsync(); // Stop the current sound before loading a new one
        sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(tracks[currentIndex].file);
      setSound(newSound);

      const status = await newSound.getStatusAsync();
      setTotalDuration(status.durationMillis);

      if (isPlaying) {
        await newSound.playAsync();
      }

      // Set playback status update only if sound is defined
      if (newSound) {
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
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
  }, [currentIndex, isReplay]);

  

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
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };
  

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <View>
        <Text style={styles.listHeading}>Music List</Text>
        <FlatList
          data={tracks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.listContainer} onPress={() => setCurrentIndex(index)}>
              <Text>{item?.title}</Text>
              <View style={styles.lineStyle}></View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.trackTitle}>{tracks[currentIndex]?.title}</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton1} onPress={() => setIsShuffle(!isShuffle)}>
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
    backgroundColor: '#CBC3E3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  listHeading: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    marginBottom: 5
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
  listContainer: {
    flex: 1,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%'
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    marginTop:15,
  }
});

export default MusicPlayer;
