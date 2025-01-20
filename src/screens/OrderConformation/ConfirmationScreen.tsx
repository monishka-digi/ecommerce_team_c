import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../../store/slices/cartSlice';

const ConfirmationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state) => state?.cart);
  const { addresses, selectedAddressIndex } = useSelector((state) => state?.addresses);
  const selectedAddress = addresses[selectedAddressIndex] || {};
  
  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.quantity * item.price, 0)?.toFixed(2);
  };

  const handleClearCart = () => {
    dispatch(resetCart());
    navigation.navigate("Home")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{"Order Confirmation"}</Text>

      <View style={styles.addressContainer}>
        <Text style={styles.addressHeader}>{"Delivery Address"}</Text>
        <Text style={styles.addressText}>{selectedAddress?.addressLine}</Text>
        <Text style={styles.addressText}>
          {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}
        </Text>
      </View>

      <Text style={styles.orderItemsHeader}>{"Place Order Items"}</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>{item?.title}</Text>
              <Text style={styles.qty}>{"Qty:"} {item?.quantity}</Text>
              <Text style={styles.qty}> {item?.total}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{"Total: "} {calculateTotal()}</Text>
      </View>

      <Text style={styles.thankYouText}>{"Thank you for your purchase!"}</Text>

      <TouchableOpacity style={styles.button} onPress={handleClearCart}>
        <Text style={styles.buttonText}>{"Back to Home"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addressContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addressHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  qty: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  thankYouText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItemsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
});

export default ConfirmationScreen;
