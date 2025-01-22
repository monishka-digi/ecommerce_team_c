import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {loggedInUser} from '../../store/asyncThunks';
import Toast from 'react-native-toast-message';
import ToastMessages from '../../constants/toastMessages';
import {AppDispatch} from '../../store';
import Texts from '../../constants/textConstant';

type FormData = {
  username: string;
  password: string;
};

type LoginScreenProps = {
  navigation: {
    replace: (route: string) => void;
  };
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const isButtonDisabled = !formData.username || !formData.password;

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({...formData, [name]: value});
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await dispatch(loggedInUser({...formData, expiresInMins: 30})).unwrap();
      setIsLoading(false);
      navigation.replace('Home');
      Toast.show(ToastMessages.LOGIN_SUCCESS);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || Texts.LOGIN_FAILURE_MESSAGE);
      Toast.show(ToastMessages.LOGIN_FAILURE(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{Texts.WELCOME_BACK}</Text>
        <Text style={styles.subtitle}>{Texts.LOGIN_TO_CONTINUE}</Text>

        <TextInput
          style={styles.input}
          placeholder={Texts.USERNAME_PLACEHOLDER}
          placeholderTextColor="black"
          value={formData.username}
          onChangeText={value => handleChange('username', value)}
        />

        <TextInput
          style={styles.input}
          placeholder={Texts.PASSWORD_PLACEHOLDER}
          placeholderTextColor="black"
          value={formData.password}
          secureTextEntry
          onChangeText={value => handleChange('password', value)}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isButtonDisabled || isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{Texts.LOGIN_BUTTON}</Text>
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
    shadowOffset: {width: 0, height: 4},
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
