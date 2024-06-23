import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { submitPaymentDetails } from '..//../API/Api'; // Ensure the correct path
import { AuthContext } from '../../API/AuthContext';
import { getUserDetail } from '../../API/storage';

const PaymentScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD(Cash On Delivery)'); // Default payment method
  const { setCartGlobal, cartGlobal } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState('');

  const getUserData = async () => {
    const user = await getUserDetail();
    setCurrentUser(user?._id);
  }

  useEffect(() => {
    getUserData();
  }, [])

  const handlePayment = async () => {
    const paymentDetails = {
      userId: currentUser,
      name,
      phoneNumber,
      address,
      paymentMethod,
      cartItems: cartGlobal, // Include cart items
    };
  
    try {
      const response = await submitPaymentDetails(paymentDetails);
      console.log('Payment successful!', response);
      Alert.alert('Payment Successful', 'Your payment has been processed successfully.');
      // Navigate to the next screen or reset the form
    } catch (error) {
      console.error('Payment failed:', error);
      Alert.alert('Payment Failed', 'There was an issue processing your payment. Please try again.');
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.paymentMethod}>Payment Method: {paymentMethod}</Text>
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={handlePayment}
      >
        <Text style={styles.paymentButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E6E6FA",
  },
  heading: {
    fontSize: 30,
    marginBottom: 16,
    fontWeight: 'bold',
    color:"#DA70D6",
    textShadowColor: 'pink',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentMethod: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 12,
  },
  paymentButton: {
    backgroundColor: "#DA70D6",
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
