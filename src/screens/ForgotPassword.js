import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
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
    Alert.alert('Success', 'Password reset successful');
  };

  return (
    <ImageBackground
    source={require('./../../assets/images/background.jpg')}
    style={{  flex: 1,
      resizeMode: 'cover', // or 'stretch' as per your preference
      justifyContent: 'center',}}
    blurRadius={5}
  >
    <View style={{ padding: 20}}>
      <Text style={{color: 'white'}}>Email:</Text>
      <TextInput
    
        style={{ height: 40, borderColor: 'white', borderWidth: 1, marginBottom: 10, borderRadius: 10}}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={{color: 'white'}}>New Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'white', borderWidth: 1, marginBottom: 10, borderRadius: 10 }}
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry
      />

      <Text style={{color: 'white'}}>Confirm Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'white', borderWidth: 1, marginBottom: 10, borderRadius: 10 }}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={{padding: 10, borderColor: 'white',borderRadius: 10,  alignItems: 'center', backgroundColor: '#DA70D6'}} onPress={handleResetPassword}>
            <Text style={{color:'white'}}>Reset Password</Text>
          </TouchableOpacity>
    </View>
    </ImageBackground>
  );

};

export default ForgotPasswordScreen;
