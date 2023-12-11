import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../API/AuthContext';

const SignupScreen = () => {
  const { Registered } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [agreed, setAgreed] = useState(false);

  const toggleAgreement = () => {
    setAgreed(!agreed);
  };

  const handleSignup = async () => {
    if (!agreed) {
      alert('Please agree to the Terms and Conditions.');
      return;
    }

    if (userData.username.trim() === '') {
      alert('Please enter a username.');
      return;
    }
  
    if (!/^[A-Za-z]+$/.test(userData.username)) {
      alert('Username can only contain alphabetic characters.');
      return;
    }

    if (userData.email.trim() === '') {
      alert('Please enter an email address.');
      return;
    }

    if (!validateEmail(userData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (userData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      Registered(userData.username, userData.email, userData.password, userData.confirmPassword)
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <ImageBackground
      source={require('./../../assets/images/bg2.jpg')}
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="white"
            onChangeText={(text) => setUserData({ ...userData, username: text })}
          />
          <Feather name="user" size={20} color="white" marginRight={10} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            keyboardType="email-address"
          />
          <Feather name="at-sign" size={20} color="white" marginRight={10} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            onChangeText={(text) => setUserData({ ...userData, password: text })}
            secureTextEntry
          />
          <Feather name="unlock" size={20} color="white" marginRight={10} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="white"
            onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })}
            secureTextEntry
          />
          <Feather name="lock" size={20} color="white" marginRight={10} />
        </View>
        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleAgreement}>
          <View style={styles.checkbox}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>I agree with the Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.signupButton, !agreed && styles.disabledButton]}
          onPress={handleSignup}
          disabled={!agreed}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: '900',
    marginBottom: 20,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 300,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    
  },
  input: {
    flex: 1,
    color: 'white',
  },
  signupButton: {
    backgroundColor: 'white',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
  },
  checkboxText: {
    color: 'white',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default SignupScreen;
