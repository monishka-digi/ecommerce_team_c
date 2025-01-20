import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AddressesScreen = () => {
  const [address, setAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const handleAddAddress = () => {
    if (
      address.addressLine &&
      address.city &&
      address.state &&
      address.pincode
    ) {
      setAddresses([...addresses, address]);
      setAddress({
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      });
    } else {
      alert("Please fill all fields.");
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
          onChangeText={(text) =>
            setAddress((prev) => ({ ...prev, addressLine: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={address.city}
          onChangeText={(text) =>
            setAddress((prev) => ({ ...prev, city: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={address.state}
          onChangeText={(text) =>
            setAddress((prev) => ({ ...prev, state: text }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          keyboardType="numeric"
          value={address.pincode}
          onChangeText={(text) =>
            setAddress((prev) => ({ ...prev, pincode: text }))
          }
        />
        <Button title="Add Address" onPress={handleAddAddress} />
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
              onPress={() => setSelectedAddressIndex(index)}
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
          <Text style={styles.noAddressText}>No addresses added yet.</Text>
        }
      />
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
});

export default AddressesScreen;
