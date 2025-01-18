import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/asyncThunks';

const Categories = () => {
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
    Alert.alert('Category Selected', `You clicked on ${categoryName}`);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        index % 2 === 0 ? styles.alignLeft : styles.alignRight,
      ]}
      onPress={() => handleCategoryClick(item.name)}
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
        ListEmptyComponent={<Text style={styles.noResults}>{"No categories found."}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  container: {
    paddingBottom: 16,
  },
  categoryContainer: {
    width: '48%',
    marginVertical: 10,
    padding: 16,
    backgroundColor: '#e0f7fa',
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
    color: '#00796b',
    textAlign: 'center',
  },
  alignLeft: {
    alignSelf: 'flex-start',
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
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
    color: 'red',
    fontSize: 16,
  },
});

export default Categories;
