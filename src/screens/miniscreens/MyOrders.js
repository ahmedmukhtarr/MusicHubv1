import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getAllPaymentDetails } from '../../API/Api';
import { AuthContext } from '../../API/AuthContext';
import { getUserDetail } from '../../API/storage';

const MyOrders = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [currentUser, setCurrentUser] = useState('');

    const getUserData = async () => {
      const user = await getUserDetail();
      setCurrentUser(user?._id);
    }
  
    useEffect(() => {
      getUserData();
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await getAllPaymentDetails(currentUser);
            console.log(response);
            setOrders(response);
        } catch (error) {
            console.error("Error fetching orders:", error);
            if (error.response) {
                console.error("Error details:", error.response.data);
            } else {
                console.error("Error message:", error.message);
            }
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const OrderCard = ({ order }) => (
        <View style={styles.orderCard}>
            <Text style={styles.itemName}>Order By: {order.name}</Text>
            <Text style={styles.itemDescription}>Address: {order.address}</Text>
            <Text style={styles.orderDetails}>Payment Method: {order.paymentMethod}</Text>
            <Text style={styles.orderDetails}>Status: {order.status}</Text>
            <Text style={styles.heading}>Cart Items</Text>
            <FlatList
                data={order?.cartItems}
                keyExtractor={(cart) => (cart?.id ? cart.id.toString() : Math.random().toString())}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Text style={styles.itemPrice}>Rs.{item.price}</Text>
                  </View>
                )}
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading1}>My Orders</Text>
            <FlatList
                data={orders}
                keyExtractor={(order) => (order?.id ? order.id.toString() : Math.random().toString())}
                renderItem={({ item }) => <OrderCard order={item} />}
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
    heading1: {
        fontSize: 30,
        marginBottom: 16,
        fontWeight: 'bold',
        color:"#DA70D6",
        textShadowColor: 'pink',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },
    heading: {
      fontSize: 24,
      marginBottom: 16,
      fontWeight: 'bold',
      color:"#DA70D6",

  },
    orderCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 16,
        color: 'black',
    },
    orderDetails: {
        fontSize: 16,
        color: 'black',
    },
    viewDetailsButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    viewDetailsButtonText: {
        color: '#fff',
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: "#DA70D6",
      padding: 16,
      marginBottom: 8,
      borderRadius: 8,
      
    },
    itemName: {
      fontSize: 16,
      color:'white',
    },
    itemPrice: {
      fontSize: 16,
      color: 'white',
    },
    emptyCart: {
      fontSize: 16,
      marginBottom: 16,
    },
});

export default MyOrders;
