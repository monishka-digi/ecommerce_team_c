import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const { width } = Dimensions.get('window');

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

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton}>
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
});

export default ProductDetailsScreen;
