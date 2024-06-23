import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileDetails } from '../API/Api';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const user = await AsyncStorage.getItem("userdata");
        const userData = JSON.parse(user);
        try {
          const data = await profileDetails(userData?._id);
          setUser(data.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      fetchData();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>Music Hub</Text>
      <Text style={styles.welcomeText}>Welcome to your personal space</Text>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoTitle}>User Information</Text>
          <Text style={styles.userInfoText}>Name: {user?.name}</Text>
          <Text style={styles.userInfoText}>Email: {user?.email}</Text>
        </View>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile', { userId: user?._id, userName: user?.name })}
          buttonStyle={styles.editButton}
          titleStyle={styles.editButtonTitle}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.87,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
    paddingHorizontal: 28,
  
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6600FF',
    textShadowColor: '#DA70D6',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#DA70D6',
  },
  cardContainer: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  userInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6600FF',
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#6600FF',
    borderRadius: 10,
    marginTop: 20,
  },
  editButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default ProfileScreen;
