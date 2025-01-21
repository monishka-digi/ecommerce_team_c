import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loggedInUser } from '../../store/asyncThunks';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      console.log('formData:', formData);
      const response = await dispatch(
        loggedInUser({ ...formData, expiresInMins: 30 })
      ).unwrap();
      console.log('Login Successful:', response);
      setIsLoading(false);
      navigation.replace('Home');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Login Successful!',
        text2: 'Welcome to DigiSprint Solutions.',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (err) {
      console.error('Login Failed:', err);
      setIsLoading(false);
      setError(err.message || 'Login failed. Please try again.');
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Failed',
        text2: err.message || 'Something went wrong.',
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !formData.username || !formData.password;

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="black"
          value={formData.username}
          onChangeText={(value) => handleChange('username', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          value={formData.password}
          secureTextEntry
          onChangeText={(value) => handleChange('password', value)}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            isButtonDisabled && styles.disabledButton,
          ]}
          onPress={handleLogin}
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{"Login"}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff', 
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777', 
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5', 
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#ccc', 
    borderWidth: 1,
    color: '#000', 
  },
  button: {
    backgroundColor: '#000', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red', 
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});


export default LoginScreen;
