import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { getAllMerchandise, imageBaseUrl } from '../API/Api';
import { AuthContext } from '../API/AuthContext';

const MerchandiseScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const { setCartGlobal, cartGlobal } = useContext(AuthContext);
  const [merchandise, setMerchandise] = useState([]);

  const addItemToCart = (item) => {
    setCartGlobal([...cartGlobal, item]);
    navigation.navigate('Cart');
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
      <Text style={styles.productName}>{`${product.title}`}</Text>
      <Text style={styles.productPrice}>{`Rs.${product.price}`}</Text>
      <Text style={styles.productDetails}>Description: {product.description}</Text>
      <Text style={styles.productDetails}>{`Remaining: ${product.remainingItems}`}</Text>
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
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.viewCartButtonText}>View Cart ({cartGlobal.length})</Text>
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
    backgroundColor: "#F5FEFD",
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
  productCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 30,
    borderRadius: 8,
    borderColor:"#EFC9D0",
    borderWidth:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productName: {
    fontSize: 30,
    fontWeight: 'bold',
    color:"#6600FF",
  },
  productDetails: {
    fontSize: 16,
    color: 'green',
    marginTop:5,
  },
  productPrice: {
    fontSize: 16,
    color: "#6600FF",
    marginTop:5,
  },
  addToCartButton: {
    backgroundColor: "#DA70D6",
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop:15,
  },
  addToCartButtonText: {
    color: '#fff',
  },
  viewCartButton: {
    backgroundColor: "#DA70D6",
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
