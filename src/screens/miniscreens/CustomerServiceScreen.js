import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CustomerServiceScreen = () => {
  const [helpInput, setHelpInput] = useState('');
  const [complaintInput, setComplaintInput] = useState('');

  const handleHelpSubmit = () => {
    // Handle help submission logic here
    console.log('Help Query:', helpInput);
    // You can implement further logic like sending the query to a server
  };

  const handleComplaintSubmit = () => {
    // Handle complaint submission logic here
    console.log('Complaint:', complaintInput);
    // You can implement further logic like sending the complaint to a server
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter your help query"
          value={helpInput}
          onChangeText={(text) => setHelpInput(text)}
        />
        <Button title="Submit Help" onPress={handleHelpSubmit} />
      </View>
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Enter your complaint"
          value={complaintInput}
          onChangeText={(text) => setComplaintInput(text)}
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

