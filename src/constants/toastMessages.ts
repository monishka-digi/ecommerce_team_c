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
    }) as ToastMessage,

    ADDRESS_ADDED: {
      type: 'success',
      position: 'top',
      text1: 'Address Added!',
      text2: 'Your address has been added successfully.',
      visibilityTime: 3000,
      autoHide: true,
    } as ToastMessage,
  
    ADDRESS_ERROR: {
      type: 'error',
      position: 'top',
      text1: 'Something went wrong!',
      text2: 'Please try again.',
      visibilityTime: 3000,
      autoHide: true,
    } as ToastMessage,

    ORDER_PLACED: {
      type: 'success',
      position: 'top',
      text1: 'Order Placed!',
      text2: 'Your order has been successfully placed.',
      visibilityTime: 3000,
      autoHide: true,
    } as ToastMessage,
  };
  
  export default ToastMessages;
  