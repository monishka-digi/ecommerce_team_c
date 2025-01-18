import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state?.user);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.image }} style={styles.profileImage} />
      <Text style={styles.name}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text style={styles.username}>@{user?.username}</Text>

      <View style={styles.details}>
        <Text style={styles.detailItem}>
          <Text style={styles.label}>{"Email: "}</Text>
          {user?.email}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.label}>{"Gender:"} </Text>
          {user?.gender}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  details: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  detailItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default Profile;
