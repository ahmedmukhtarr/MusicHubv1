import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { AuthContext } from '../API/AuthContext';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Loginuser } = useContext(AuthContext);
  // Assuming you have a function to fetch user data from your database



  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
  });

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setEmail(parsedData.email);
        setPassword(parsedData.password);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const handleLogin = () => {
    if (email === '' || password === '') {
      alert('Please enter both email and password.');
    } else {
      // checkStoredUserData();
      Loginuser(email, password);
    }
  };

  const checkStoredUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (email === parsedData.email && password === parsedData.password) {
          navigation.navigate('Home');
        } else {
          alert('Invalid email or password.');
        }
      } else {
        alert('No user data found. Please sign up first.');
      }
    } catch (error) {
      console.error('Error checking stored user data:', error);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetch(
        `https://graph.facebook.com/me?access_token=${authentication.accessToken}&fields=id,name,picture.type(large)`
      )
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [response]);

  const handleFacebookLogin = async () => {
    const result = await promptAsync();

    if (result.type !== 'success') {
      alert('Facebook login failed.');
    }
  };

  return (
    <ImageBackground
      source={require('./../../assets/images/background.jpg')}
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <EvilIcons name="user" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <EvilIcons name="lock" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <EvilIcons name="arrow-right" size={50} color="white" />
        </TouchableOpacity>
        <Text style={styles.loginWithText}>Login with:</Text>
        <View style={styles.socialButtonsContainer}>
         
          <TouchableOpacity style={styles.socialButton} disabled={!request} onPress={handleFacebookLogin}>
            <EvilIcons name="sc-facebook" size={30} color="white" />
          </TouchableOpacity>
          {/* Add buttons for Google and Twitter login here */}
        </View>
        <View style={styles.bottomLinksContainer}>
          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

  


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' as per your preference
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    color: 'white',
    marginBottom: 20,
    fontWeight: '900',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Background color with opacity
    width: 300,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
  },
  loginButton: {
   
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginWithText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  socialButton: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton2: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  socialButton3: {
    width: 55,
    height: 55,
    borderRadius: 35,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 20,
  },
  link: {
    flex: 1,
    alignItems: 'center',
  },
  linkText: {
   fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginRight: 20, 
  },
});

export default LoginScreen;