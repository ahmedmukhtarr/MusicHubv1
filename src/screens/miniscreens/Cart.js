import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CartScreen = ({ route, navigation }) => {
  const { cart, setCart } = route.params;

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const removeItemFromCart = (item) => {
    const updatedCart = cart.filter((product) => product._id !== item._id);
    setCart(updatedCart);
    navigation.setParams({ cart: updatedCart }); // Update the cart in navigation params
  };

  useEffect(() => {
    navigation.setParams({ cart });
  }, [cart]);

  const handleContinueToPayment = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(product) => product._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <TouchableOpacity onPress={() => removeItemFromCart(item)}>
                <FontAwesome name="minus-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      )}
      <Text style={styles.totalAmount}>Total Amount: ${calculateTotalAmount()}</Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinueToPayment}
      >
        <Text style={styles.continueButtonText}>Continue to Payment</Text>
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
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  emptyCart: {
    fontSize: 16,
    marginBottom: 16,
  },
  totalAmount: {
    fontSize: 18,
    marginTop: 16,
  },
  continueButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
