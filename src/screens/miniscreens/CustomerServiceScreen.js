import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { sendComplaint } from '../../API/Api'; // Import the API functions
import { getUserDetail } from '../../API/storage';

const CustomerServiceScreen = () => {
  const [complaintInput, setComplaintInput] = useState('');

  const handleComplaintSubmit = async () => {
    try {
      const user = await getUserDetail();
      if (complaintInput && user) {
        const response = await sendComplaint(complaintInput, user?._id);
        console.log("response complaint", response);
        Alert.alert('Complaint Submitted', 'Thank you for your feedback!');
        setComplaintInput(''); // Clear the input field after submission
      }
    } catch (error) {
      console.log("error", error.response.data.message);
      Alert.alert('Submission Failed', 'Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer Service</Text>
      <Text style={styles.subtitle}>Feel free to contact us with any issues or feedback.</Text>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter your query"
          value={complaintInput}
          onChangeText={setComplaintInput}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleComplaintSubmit}>
          <Text style={styles.buttonText}>Submit Query</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.contactInfo}>For urgent assistance, contact us at:</Text>
      <Text style={styles.contactDetails}>Email: support@musichub.com</Text>
      <Text style={styles.contactDetails}>Phone: +992 343 5496013</Text>
      <Text style={styles.helpText}>Stuck somewhere? Need help? We're here to assist you!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#E6E6FA",
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6600FF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6600FF',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: '#6600FF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#6600FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DA70D6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#6600FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 16,
    color: '#6600FF',
    textAlign: 'center',
    marginVertical: 10,
  },
  contactDetails: {
    fontSize: 14,
    color: '#6600FF',
    textAlign: 'center',
    marginBottom: 5,
  },
  helpText: {
    fontSize: 14,
    color: '#6600FF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CustomerServiceScreen;
