import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigation } from "./TabNavigation";
import MusicUploadScreen from "../screens/MusicUploadScreen";
import Library from "../screens/miniscreens/Library";
import PlaylistScreen from "../screens/miniscreens/PlaylistScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { AuthContext } from "../API/AuthContext";
import MusicPlayer from "../screens/MusicPlayer";
import NotificationSettings from "../screens/miniscreens/NotificationSettings";
import AppInfoScreen from "../screens/miniscreens/AppInfo";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { usertoken } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{ headerShown: false }}
    >
      {usertoken ? (
        <>
            <Stack.Screen name="Home" component={TabNavigation} />
            <Stack.Screen name="MusicUpload" component={MusicUploadScreen} />
            <Stack.Screen name="Library" component={Library} />
            <Stack.Screen name="Playlist" component={PlaylistScreen} />
            <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
            <Stack.Screen name="AppInfoScreen" component={AppInfoScreen} />

            </>
      ) : (
        <>
         
          <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;