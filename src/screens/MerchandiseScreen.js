import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MerchandiseScreen = () => {
  const [cart, setCart] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
  });

  const addItemToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeItemFromCart = (item) => {
    const updatedCart = cart.filter((product) => product.id !== item.id);
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', price: 14.99 },
    // Add more products here
  ];

  const concerts = [
    {
      id: 1,
      name: 'Concert 1',
      price: 100.55,
      availableTickets: 5,
      seatNumber: 'A-101',
      time: '7:00 PM',
      location: 'Music Hall, City Name',
    },
    {
      id: 2,
      name: 'Concert 2',
      price: 150.99,
      availableTickets: 0,
      seatNumber: 'B-202',
      time: '8:00 PM',
      location: 'Arena, City Name',
    },
    {
      id: 3,
      name: 'Concert 3',
      price: 175.99,
      availableTickets: 10,
      seatNumber: 'C-303',
      time: '7:30 PM',
      location: 'Stadium, City Name',
    },
    // Add more concerts here
  ];

  const ShoppingCart = () => {
    const calculateTotalAmount = () => {
      return cart.reduce((total, item) => total + item.price, 0);
    };

    const clearCart = () => {
      setCart([]);
    };

    const confirmOrder = () => {
      // Your confirmation logic here
    };

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.cartIcon}>
        <FontAwesome name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.cartItemCount}>{cart.length}</Text>
        <Text style={styles.heading}>Customer Details</Text>
        <Text style={styles.heading}>Shopping Cart</Text>

        {cart.length > 0 ? (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItemFromCart(item)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyCart}>Your cart is empty.</Text>
        )}
        <Text style={styles.customerDetails}>Customer Details:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={customerDetails.name}
          onChangeText={(text) => setCustomerDetails({ ...customerDetails, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={customerDetails.email}
          onChangeText={(text) => setCustomerDetails({ ...customerDetails, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={customerDetails.phone}
          onChangeText={(text) => setCustomerDetails({ ...customerDetails, phone: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={customerDetails.address}
          onChangeText={(text) => setCustomerDetails({ ...customerDetails, address: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={customerDetails.postalCode}
          onChangeText={(text) => setCustomerDetails({ ...customerDetails, postalCode: text })}
        />
        <Text style={styles.totalAmount}>Total Amount: ${calculateTotalAmount()}</Text>
        <TouchableOpacity
          style={styles.clearCartButton}
          onPress={clearCart}
          disabled={cart.length === 0}
        >
          <Text style={styles.clearCartButtonText}>Clear Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmOrderButton}
          onPress={confirmOrder}
          disabled={cart.length === 0}
        >
          <Text style={styles.confirmOrderButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const ProductCard = ({ product }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addItemToCart(product)}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Product List</Text>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
      <Text style={styles.heading}>Concert Tickets</Text>
      <FlatList
        data={concerts}
        keyExtractor={(concert) => concert.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
      <ShoppingCart />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  cartIcon: {
    alignItems: 'center',
    padding: 16,
  },
  cartItemCount: {
    fontSize: 20,
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
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
  },
  emptyCart: {
    fontSize: 16,
    marginBottom: 16,
  },
  customerDetails: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  totalAmount: {
    fontSize: 18,
    marginTop: 16,
  },
  clearCartButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearCartButtonText: {
    color: '#fff',
  },
  confirmOrderButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmOrderButtonText: {
    color: '#fff',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
  },
});

export default MerchandiseScreen;
