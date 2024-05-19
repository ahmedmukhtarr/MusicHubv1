import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { sendComplaint } from '../../API/Api'; // Import the API functions
import { getUserDetail } from '../../API/storage';

const CustomerServiceScreen = () => {
  const [complaintInput, setComplaintInput] = useState('');

  const handleComplaintSubmit = async () => {
    try {
      const user = await getUserDetail();
      if(complaintInput && user) {
        const response = await sendComplaint(complaintInput, user?._id);
        console.log("response complaint", response);
      }
    } catch (error) {
      console.log("error", error.response.data.message);
      
    }
    Alert.alert('Complaint Submitted');
  };


  return (
    <View style={styles.container}>

      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter your complaint"
          value={complaintInput}
          onChangeText={(text) => {
            console.log(text);
            setComplaintInput(text);
          }}
        />
        <Button title="Submit Complaint" onPress={handleComplaintSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: "#E6E6FA",
  },
  section: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CustomerServiceScreen;
