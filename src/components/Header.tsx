import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {Texts} from '../constants/textConstant';

type HeaderProps = {
  navigation: NavigationProp<any>;
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
  const {cartItems} = useSelector((state: RootState) => state?.cart);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{Texts.TITLE}</Text>
      <View style={styles.rightTools}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.logoutText}>{Texts.LOGOUT}</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.cartIcon}>{Texts.CART_ICON}{ cartItems?.length >= 1 && cartItems?.length}</Text>
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
