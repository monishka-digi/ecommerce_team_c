import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CategoriesProduct = ({ route }) => {
  const { name } = route?.params; 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{"Category: "}{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoriesProduct;
