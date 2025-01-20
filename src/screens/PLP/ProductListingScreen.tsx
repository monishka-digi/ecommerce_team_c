import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, searchProducts } from '../../store/asyncThunks';

const ProductListingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state?.products);
  const { products } = useSelector((state) => state?.products?.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setquery] = useState('');

    useEffect(() => {
      const handler = setTimeout(() => {
        setquery(searchQuery);
      }, 300);
      return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
      if (query?.length >= 3) {
        dispatch(searchProducts(query)); 
      } else if (query.length === 0) {
        dispatch(fetchProducts()); 
      }
    }, [query, dispatch]);

    if (loading) {
      return <ActivityIndicator size="large" color="#00796b" style={styles.loader} />;
    }
  
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{"Error: "}{error}</Text>
        </View>
      );
    }


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('PDP', { product: item })}
      >
      <Image source={{ uri: item?.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.productTitle}>{item?.title}</Text>
      <Text style={styles.productPrice}>{"Price: "}{item?.price}</Text>
      <Text style={styles.productDescription}>{item?.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} 
        numColumns={2} 
        ListEmptyComponent={<Text style={styles.noResults}>{"No categories found."}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  thumbnail: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default ProductListingScreen;
