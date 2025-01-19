import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Header = ({ navigation }) => {
  const {cartItems} = useSelector((state) => state?.cart);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{"DigiSprint Solutions"}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartIcon}>🛒{cartItems?.length}</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartIcon: {
    fontSize: 25,
  },
});

export default Header;
