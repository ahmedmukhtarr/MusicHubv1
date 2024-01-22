import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";
import { Login, Register, resetPassword as apiResetPassword} from "./Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usertoken, setUserToken] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [IsLoadings, setIsLoadings] = useState(false);
  const [userId, setUserId] = useState("");
  const [signInError, setSignInError] = useState(null);
  const [userData, setUserData] = useState(null);

  //Login Api
  const Loginuser = async (email, password) => {
    const Data = { email, password };
    setIsLoadings(true);
    await Login(Data)
      .then(async (res) => {
        await AsyncStorage.setItem("token", JSON.stringify(res.data?.token));
        await AsyncStorage.setItem("userdata",  JSON.stringify(res.data?._doc));
        console.log(res.data);
        setUserToken(res.data?.token);
        alert("Logging In");
      })
      .catch((e) => {
        if (e.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          alert(e.response.data.message);
        }
      });
  };

  // Registered
  const Registered = async (name, email, createPassword, Confirmpassword) => {
    
    const Data = {
      name: name,
      email: email,
      password: createPassword,
      confirmPassword: Confirmpassword,
    };
    setIsLoadings(true);
    await Register(Data)
    .then(async (res) => {
      await AsyncStorage.setItem("token", res.data?.token);
      alert("User Registered");
      setIsLoadings(false);
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        alert(error.response.data.message);
      }
    });

  };

  // LogOut
  const Logout = async () => {
    await AsyncStorage.removeItem("token");
    setUserToken(null);
    setUserId(null);
  };
 
  const resetPassword = async (resetToken, newPassword, confirmPassword) => {
    try {
      // Get the authentication token from your context or wherever it's stored
      const authToken = await getAuthToken();

      // Call the resetPassword function from your API, passing the authentication token
      const response = await apiResetPassword(resetToken, newPassword, confirmPassword, authToken);

      // Display a success message or navigate to another screen
      alert('Success', response.message);
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Error', 'Failed to reset password. Please try again.');
    }
  };
  return (
    <AuthContext.Provider
      value={{
        userId,
        usertoken,
        profileImage,
        Loginuser,
        Registered,
        Logout,
        IsLoadings,
        signInError,
        userData,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
