import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { getAllMerchandise, imageBaseUrl } from '../API/Api';

const MerchandiseScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [merchandise, setMerchandise] = useState([]);

  const addItemToCart = (item) => {
    setCart([...cart, item]);
    navigation.navigate('Cart', { cart: [...cart, item] });
  };

  const getAllMerchandiseApi = async () => {
    try {
      const response = await getAllMerchandise();
      setMerchandise(response);
    } catch (error) {
      console.error("Error fetching merchandise", error.response);
    }
  };

  useEffect(() => {
    getAllMerchandiseApi();
  }, []);

  const ProductCard = ({ product }) => (
    <View style={styles.productCard}>
      <Image
        style={{ width: '100%', height: 200 }}
        source={{
          uri: `${imageBaseUrl}${product?.image}`,
        }}
      />
      <Text style={styles.productName}>{`${product.title} $${product.price}`}</Text>
      <Text style={styles.productPrice}>Description: {product.description}</Text>
      <Text style={styles.productPrice}>{`Remaining: ${product.remainingItems}`}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addItemToCart(product)}
      >
        <Text style={styles.addToCartButtonText} >Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Product List</Text>
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate('Cart', { cart, setCart })}
      >
        <Text style={styles.viewCartButtonText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
      <FlatList
        data={merchandise}
        keyExtractor={(product) => product?._id?.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#E6E6FA",
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
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
  viewCartButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  viewCartButtonText: {
    color: '#fff',
  },
});

export default MerchandiseScreen;
