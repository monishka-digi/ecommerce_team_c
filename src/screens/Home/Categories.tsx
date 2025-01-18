import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Fashion' },
  { id: 3, name: 'Groceries' },
  { id: 4, name: 'Books' },
  { id: 5, name: 'Furniture' },
  { id: 6, name: 'Toys' },
  { id: 7, name: 'Sports' },
  { id: 8, name: 'Beauty' },
];

const Categories = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredData = categories.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filteredData);
  };

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

  return (
    <View style={styles.mainContainer}>
      {/* Search Input Field */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Grid View */}
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.noResults}>{"No categories found."}</Text>
        }
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
});

export default Categories;
