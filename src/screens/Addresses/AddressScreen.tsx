import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, setSelectedAddressIndex } from "../../store/slices/addressSlice";
import Toast from "react-native-toast-message";

const AddressesScreen = ({navigation}) => {
  const [address, setAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });
  const dispatch = useDispatch();
  const { addresses, selectedAddressIndex } = useSelector((state) => state?.addresses);


  const isFormValid = () => {
    return address.addressLine && address.city && address.state && address.pincode;
  };

  const handleAddAddress = () => {
    if (
      address.addressLine &&
      address.city &&
      address.state &&
      address.pincode
    ) {
      dispatch(addAddress(address));
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Address Added!',
        text2: 'Your address has been added successfully.',
        visibilityTime: 3000,
        autoHide: true,
      });
      setAddress({
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      });
    } else {
      console.log("Please fill all fields.");
      Toast.show({
        type: 'fail',
        position: 'top',
        text1: 'Something went wrong!',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Address Line"
          value={address.addressLine}
          placeholderTextColor="black"
          onChangeText={(text) =>
            setAddress((prev) => ({ ...prev, addressLine: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={address.city}
          placeholderTextColor="black"
          onChangeText={(text) =>
            setAddress((prev) => ({ ...prev, city: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          placeholderTextColor="black"
          value={address.state}
          onChangeText={(text) =>
            setAddress((prev) => ({ ...prev, state: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="black"
          keyboardType="numeric"
          value={address.pincode}
          onChangeText={(text) =>
            setAddress((prev) => ({ ...prev, pincode: text }))
          }
        />
        <TouchableOpacity onPress={handleAddAddress} 
        style={[styles.addAddress, isFormValid() ? {} : { backgroundColor: '#ccc' }]}
        disabled={!isFormValid()}
        ><Text style={{ color: isFormValid() ? '#fff' : '#666' }}>{'Add Address'}</Text></TouchableOpacity>
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.card,
              selectedAddressIndex === index && styles.selectedCard,
            ]}
          >
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => dispatch(setSelectedAddressIndex(index))}
            >
              <View
                style={[
                  styles.radioInner,
                  selectedAddressIndex === index && styles.radioSelected,
                ]}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.text}>{item.addressLine}</Text>
              <Text style={styles.text}>
                {item.city}, {item.state} - {item.pincode}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noAddressText}>{"No addresses added yet."}</Text>
        }
      />
       <TouchableOpacity
        onPress={() =>{
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Order Placed!',
            text2: 'Your order has been successfully placed.',
            visibilityTime: 3000,
            autoHide: true,
          });
          navigation.navigate('OrderConformation')}
        }
        style={styles.submitButton}
      >
        <Text style={styles.submitText}>{"Place Order"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  selectedCard: {
    borderColor: "#4caf50",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  radioSelected: {
    backgroundColor: "#4caf50",
  },
  text: {
    fontSize: 16,
  },
  noAddressText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
  addAddress: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center', 
    justifyContent: 'center',
    margin: 10,               
    shadowColor: '#000',   
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,        
    shadowRadius: 4,          
    elevation: 3,          
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddressesScreen;