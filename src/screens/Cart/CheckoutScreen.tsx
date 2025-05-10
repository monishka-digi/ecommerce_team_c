import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {CART_SCREEN_TEXT} from '../../constants/textConstant';

type CartProps = {
  navigation: NavigationProp<any>;
};

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  total: number;
}

const CartScreen: React.FC<CartProps> = ({navigation}) => {
  const {cartItems} = useSelector((state: RootState) => state?.cart);

  const renderItem = ({item}: {item: CartItem}) => (
    <TouchableOpacity
      style={styles.cartItem}
      onPress={() => navigation.navigate('PDP', {product: item})}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>
          {CART_SCREEN_TEXT.priceLabel} {item.price.toFixed(2)}
        </Text>
        <Text style={styles.quantity}>
          {CART_SCREEN_TEXT.quantityLabel}
          {item.quantity}
        </Text>
        <Text style={styles.total}>
          {CART_SCREEN_TEXT.totalLabel} {item.total.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{CART_SCREEN_TEXT.header}</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>{CART_SCREEN_TEXT.emptyCart}</Text>
      )}
      {cartItems?.length > 0 && (
        <TouchableOpacity
          style={styles.payNowButton}
          onPress={() => navigation.navigate('Addresses')}>
          <Text style={styles.payNowText}>{CART_SCREEN_TEXT.payNowButton}</Text>
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
