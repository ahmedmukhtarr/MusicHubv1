import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { updateProfile } from '../../API/Api';

const EditProfile = ({route}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {userId, userName} = route.params;
  const [newUsername, setNewUsername] = useState(userName);
  

  const handleUpdateProfile = () => {
    // Validate new username, new password, and confirm password
    if (!newUsername && !newPassword && !confirmPassword) {
      Alert.alert('Error', 'Please fill in at least one field to update');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // TODO: Implement your profile update logic here
    try {
      const res = updateProfile(userId, newUsername, newPassword, confirmPassword);
      console.log(res);
      Alert.alert('Success', 'Profile update successful');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>New Username:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setNewUsername}
        value={newUsername}
        autoCapitalize="none"
      />

      <Text>New Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry
      />

      <Text>Confirm Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

export default EditProfile;
