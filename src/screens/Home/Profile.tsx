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
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#fff', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  name: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    letterSpacing: 0.5, 
  },
  username: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  details: {
    width: '100%',
    padding: 20, 
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginTop: 15, 
  },
  detailItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    lineHeight: 22, 
  },
  label: {
    fontWeight: 'bold',
    color: '#333', 
  },
});


export default Profile;
