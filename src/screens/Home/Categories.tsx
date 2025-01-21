import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/asyncThunks';

const Categories = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector((state) => state?.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCategoryClick = (categoryName) => {
    navigation.navigate('CategoriesProducts', { categoryName });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        index % 2 === 0 ? styles.alignLeft : styles.alignRight,
      ]}
      onPress={() => handleCategoryClick(item.slug)}
    >
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.mainContainer}>
      {/* Search Input Field */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Grid View */}
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item?.name} 
        contentContainerStyle={styles.container}
        numColumns={2}
        ListEmptyComponent={<Text style={styles.noResults}>{"No categories found."}</Text>}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  container: {
    paddingBottom: 16,
  },
  categoryContainer: {
    height: 60,
    flex: 1, 
    margin: 8,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#bbb',
    marginTop: 20,
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
    color: '#f00',
    fontSize: 16,
  },
  alignLeft: {
    alignSelf: 'flex-start', 
  },
  alignRight: {
    alignSelf: 'flex-end', 
  },
});

export default Categories;
