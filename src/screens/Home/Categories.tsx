import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCategories} from '../../store/asyncThunks';
import {NavigationProp} from '@react-navigation/native';
import {AppDispatch, RootState} from '../../store';
import {TEXTS} from '../../constants/textConstant';

type CategoriesProps = {
  navigation: NavigationProp<any>;
};

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Categories: React.FC<CategoriesProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState('');
  const {categories, loading, error} = useSelector(
    (state: RootState) => state?.categories,
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const filteredCategories = categories.filter((item: Category) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleCategoryClick = (categorySlug: string) => {
    navigation.navigate('CategoriesProducts', {categorySlug});
  };

  const renderItem = ({item, index}: {item: Category; index: number}) => (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        index % 2 === 0 ? styles.alignLeft : styles.alignRight,
      ]}
      onPress={() => handleCategoryClick(item.slug)}>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00796b" style={styles.loader} />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {TEXTS.ERROR}
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={TEXTS.SEARCH_PLACEHOLDER}
        placeholderTextColor="black"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={item => item?.name}
        contentContainerStyle={styles.container}
        numColumns={2}
        ListEmptyComponent={
          <Text style={styles.noResults}>{TEXTS.NO_CATEGORIES_FOUND}</Text>
        }
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
    shadowOffset: {width: 0, height: 2},
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
