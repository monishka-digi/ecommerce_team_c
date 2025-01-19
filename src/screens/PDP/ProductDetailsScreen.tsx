import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("qqqqqqqq", count);
    // dispatch(updateCart({ product, quantity: count }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={product.images}
        horizontal
        pagingEnabled
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.carouselImage, { width }]} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />

      {/* Product Details */}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{"Price: "}{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Additional Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>{"Rating: "}</Text> {product.rating}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>{"Warranty Information: "}</Text> {product.warrantyInformation}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>{"Shipping Information: "}</Text> {product.shippingInformation}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>{"Return Policy: "}</Text> {product.returnPolicy}
        </Text>
      </View>

       {/* Quantity Selector */}
       <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{count}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => setCount(prevCount => prevCount + 1)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>{"Add to Cart"}</Text>
      </TouchableOpacity>
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
