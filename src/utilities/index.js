import {AsyncStorage} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';

export const loginbaseUrl = () => {
  return 'http://3.10.80.41:9090/';
};

export const baseUrl = () => {
  return 'https://airandapi.azurewebsites.net/';
};

export const token = () => {
  return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJuYmYiOjE2MDMwNjMyMjgsImV4cCI6MTgyMzkwMTYyOCwiaWF0IjoxNjAzMDYzMjI4fQ.9qrRM-7ootxzJzP5GLynGCXwT01n95ZYHrD6_dXGjAw';
};
export const showTopNotification = (type, message) => {
  showMessage({
    message: message,
    type: type,
    duration: 5000,
    icon: type,
    position: 'top',
  });
};

// export const storeToken = async (selectedValue, email) => {
//   try {
//     await AsyncStorage.setItem('token', selectedValue);
//     await AsyncStorage.setItem('user_email', email);
//   } catch (error) {
//     console.warn('AsyncStorage error: ' + error.message);
//   }
// }

// export const getToken = async () => {
//   //await AsyncStorage.removeItem('token')
//   let token = await AsyncStorage.getItem('token')
//   let user_email = await AsyncStorage.getItem('user_email')
//   return {token, user_email}
// };

export const removeToken = async (selectedValue, email) => {
  try {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('hasOpened', 'true');
  } catch (error) {
    console.warn('AsyncStorage remove token error: ' + error.message);
  }
};

export const processResponse = (response) => {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then((res) => ({
    statusCode: res[0],
    data: res[1],
  }));
};

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const formatDate = (dateString) => {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('Do MMM YYYY');
};

export const getToken = async () => {
  let token = await AsyncStorage.getItem('@token')
  let bearerToken = `Bearer ${token}`;
  return bearerToken;
};
