import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../API/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const { Logout } = useContext(AuthContext); 

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    // Call the Logout function from the AuthContext
    Logout();
    // You can also navigate to the login screen or perform any other actions here
    navigation.navigate('Login'); // For example, navigate to the login screen
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigateTo('ProfileScreen')}
      >
        <Text style={styles.settingText}>Profile</Text>
        <MaterialCommunityIcons name="account" style={styles.settingIcon} />
      </TouchableOpacity>
      
      {/* <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigateTo('NotificationSettings')}
      >
        <Text style={styles.settingText}>Notification Settings</Text>
        <FontAwesome name="bell" style={styles.settingIcon} />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigateTo('CustomerService')}
      >
        <Text style={styles.settingText}>Customer Service</Text>
        <FontAwesome name="headphones" style={styles.settingIcon} />
      </TouchableOpacity>
             <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigateTo('Library')}
            >
              <Text style={styles.settingText}>My Library</Text>
              <FontAwesome name="music" style={styles.settingIcon} />
            </TouchableOpacity> 
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigateTo('Orders')}
            >
              <Text style={styles.settingText}>My Orders</Text>
              <FontAwesome name="shopping-bag" style={styles.settingIcon} />
            </TouchableOpacity> 
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigateTo('AppInfoScreen')}
      >
        <Text style={styles.settingText}>App Info</Text>
        <FontAwesome name="info-circle" style={styles.settingIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
        <FontAwesome name="sign-out" style={styles.logoutIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FEFD",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"#DA70D6",
    textShadowColor: 'pink',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 15,
  },
  settingText: {
    fontSize: 16,
    color:"#6600FF",
  },
  settingIcon: {
    fontSize: 24,
    color:"#DA70D6",
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
  logoutIcon: {
    fontSize: 24,
    color: 'red',
  },
});

export default SettingsScreen;
