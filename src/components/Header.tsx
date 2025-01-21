import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Header = ({ navigation }) => {
  const {cartItems} = useSelector((state) => state?.cart);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{"DigiSprint"}</Text>
      <View style={styles.rightTools}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.logoutText}>{"Logout"}</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.cartIcon}>🛒{ cartItems?.length >= 1 && cartItems?.length}</Text>
      </TouchableOpacity> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#1e81b0'
  },
  rightTools: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cartIcon: {
    fontSize: 25,
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 25,
  },
});

export default Header;
