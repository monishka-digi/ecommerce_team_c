type ToastMessage = {
    type: 'success' | 'error';
    position: 'top',
    text1: string;
    text2: string;
    visibilityTime: number;
    autoHide: boolean;
  };
  
  const ToastMessages = {
    LOGIN_SUCCESS: {
      type: 'success',
      position: 'top',
      text1: 'Login Successful!',
      text2: 'Welcome to DigiSprint Solutions.',
      visibilityTime: 5000,
      autoHide: true,
    } as ToastMessage,
  
    LOGIN_FAILURE: (errorMessage: string): ToastMessage => ({
      type: 'error',
      position: 'top',
      text1: 'Login Failed',
      text2: errorMessage || 'Something went wrong.',
      visibilityTime: 5000,
      autoHide: true,
    }),
  };
  
  export default ToastMessages;
  