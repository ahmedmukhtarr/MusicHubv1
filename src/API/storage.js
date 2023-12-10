import AsyncStorage from "@react-native-async-storage/async-storage";

// Add a function to set the Authorization header
export const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw error;
    }
  };

  // Add a function to set the Authorization header
export const getUserDetail = async () => {
    try {
      const user = await AsyncStorage.getItem("userdata");
      return JSON.parse(user);
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  };