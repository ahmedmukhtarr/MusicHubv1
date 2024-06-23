import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateProfile } from '../../API/Api';
import { getUserDetail } from '../../API/storage';

const EditProfile = ({ route }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userId, userName } = route.params;
  const [newUsername, setNewUsername] = useState(userName);
  const [currentUser, setCurrentUser] = useState('');

  const getUserData = async () => {
    const user = await getUserDetail();
    setCurrentUser(user?._id);
  }

  useEffect(() => {
    getUserData();
  }, [])

  const handleUpdateProfile = async () => {
    // Validate new username, new password, and confirm password
    if (!newUsername && !newPassword && !confirmPassword) {
      Alert.alert('Error', 'Please fill in at least one field to update');
      return;
    }
    console.log(newPassword);
    console.log(confirmPassword);

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Implement your profile update logic here
    try {

      const res = await updateProfile(currentUser, newUsername, newPassword, confirmPassword);

      console.log(res);
      Alert.alert('Success', 'Profile update successful');
    } catch (error) {
      Alert.alert(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <Text style={styles.label}>New Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewUsername}
        value={newUsername}
        autoCapitalize="none"
        placeholder="Enter new username"
      />

      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry
        placeholder="Enter new password"
      />

      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
        placeholder="Confirm new password"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E6E6FA',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6600FF',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#6600FF',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#6600FF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#6600FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#DA70D6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#6600FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
