import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCartAPI} from '../../store/asyncThunks';
import {RootState} from '../../store';
import ToastMessages from '../../constants/toastMessages';
import Toast from 'react-native-toast-message';

interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  images: string[];
  rating: string;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
}
interface ProductDetailsProps {
  route: {
    params: {
      product: Product;
    };
  };
}
interface CartItem {
  id: string;
  quantity: number;
}

const ProductDetailsScreen: React.FC<ProductDetailsProps> = ({route}) => {
  const dispatch = useDispatch();
  const {product} = route?.params || {};
  const {user} = useSelector((state: RootState) => state?.user);
  const {cartItems} = useSelector((state: RootState) => state?.cart);
  const [count, setCount] = useState(1);
  const {width} = Dimensions.get('window');
  const isInCart = cartItems?.some(
    (item: CartItem) => item?.id === product?.id,
  );

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const handleAddToCart = (selectedProducts: Product) => {
    if (!user) return;
    const payload = {
      userId: user?.id,
      products: [
        {
          id: selectedProducts?.id,
          quantity: count,
        },
      ],
    };
    dispatch(addToCartAPI(payload)).unwrap();
    Toast.show(ToastMessages.PRODUCT_ADDED);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={product.images}
        horizontal
        pagingEnabled
        renderItem={({item}) => (
          <Image source={{uri: item}} style={[styles.carouselImage, {width}]} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>
        {'Price: '}
        {product.price}
      </Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>{'Rating: '}</Text> {product.rating}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>{'Warranty Information: '}</Text>{' '}
          {product.warrantyInformation}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>{'Shipping Information: '}</Text>{' '}
          {product.shippingInformation}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>{'Return Policy: '}</Text>{' '}
          {product.returnPolicy}
        </Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleDecrement}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{count}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setCount(prevCount => prevCount + 1)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {isInCart ? (
        <TouchableOpacity
          style={styles.removeFromCartButton}
          disabled={isInCart}>
          <Text style={styles.removeFromCartText}>{'Remove from Cart'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(product)}>
          <Text style={styles.addToCartText}>{'Add to Cart'}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  carouselImage: {
    width: 250,
    height: 250,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsContainer: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  detailItem: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  removeFromCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeFromCartButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  quantityButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
