import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useSelector } from 'react-redux';

const CartScreen = ({navigation}) => {
  const {cartItems} = useSelector(state => state?.cart);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.cartItem}
    onPress={() => navigation.navigate('PDP', {product: item})}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{"Price: "} {item.price.toFixed(2)}</Text>
        <Text style={styles.quantity}>{"Quantity: "} {item.quantity}</Text>
        <Text style={styles.total}>{'Total: '} {item.total.toFixed(2)}</Text>
      </View>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{"Your Cart"}</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>{"Your cart is empty."}</Text>
      )}
      {cartItems?.length > 0 && (
        <TouchableOpacity style={styles.payNowButton} onPress={() =>  navigation.navigate('Addresses')}>
          <Text style={styles.payNowText}>{"Pay Now"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 32,
  },
  payNowButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  payNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
