import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Button, ListItem } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileDetails } from '../API/Api';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  // User data state
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
  // Navigation to Edit Profile Screen
  

  const listeningHistory = [
    {
      media: 'Song 1',
      category: 'Music',
    },
    {
      media: 'Podcast Episode 1',
      category: 'Podcast',
    },
  ];

  const purchaseHistory = [
    {
      merchandise: 'Product 1',
      orderedDate: '2023-01-15',
      orderHistory: 'Order 12345',
    },
    {
      merchandise: 'Product 2',
      orderedDate: '2023-02-20',
      orderHistory: 'Order 67890',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoTitle}>User Information</Text>
          <Text style={styles.userInfoText}>Name: {user?.name}</Text>
          <Text style={styles.userInfoText}>Email: {user?.email}</Text>
        </View>
        <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile', {
          userId:user?._id,
          userName:user?.name
        })} buttonStyle={styles.editButton} />
      </Card>
{/* 
      <Card>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Listening History</Text>
          {listeningHistory.map((item, index) => (
            <ListItem
              key={index}
              title={item.media}
              subtitle={`Category: ${item.category}`}
              bottomDivider
            />
          ))}
        </View>
      </Card>

      <Card>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Purchase History</Text>
          {purchaseHistory.map((item, index) => (
            <ListItem
              key={index}
              title={item.merchandise}
              subtitle={`Order Date: ${item.orderedDate}, Order History: ${item.orderHistory}`}
              bottomDivider
            />
          ))}
        </View>
      </Card> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
