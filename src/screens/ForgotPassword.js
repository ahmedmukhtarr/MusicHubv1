import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { resetPassword } from '../API/Api';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Validate email, new password, and confirm password
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // TODO: Implement your password reset logic here
    try {
      const res = resetPassword(email, newPassword, confirmPassword);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // For demonstration purposes, show an alert indicating success
    // Alert.alert('Success', 'Password reset successful');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
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

      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ForgotPasswordScreen;
