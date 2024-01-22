import React, { useState,useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationSettings = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const toggleNotification = async () => {
    if (isNotificationEnabled) {
      // Disable Notifications logic
      await Notifications.cancelAllScheduledNotificationsAsync();
      setIsNotificationEnabled(false);
    } else {
      // Enable Notifications logic
      const trigger = new Date(Date.now() + 10 * 1000); // 10 seconds from now
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test Notification',
          body: 'This is a test notification.',
        },
        trigger,
      });
      setIsNotificationEnabled(true);
    }
  };
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const notificationReceivedListener = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
  
    return () => {
      notificationReceivedListener.remove();
    };
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notification Settings</Text>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={toggleNotification}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isNotificationEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#E6E6FA",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    
  },
  settingLabel: {
    fontSize: 18,
  },
});

export default NotificationSettings;
