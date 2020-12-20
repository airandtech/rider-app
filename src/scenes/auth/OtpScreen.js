import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ThemeConsumer} from 'react-native-elements';
import {baseUrl, processResponse, showTopNotification} from '../../utilities';
import AsyncStorage from '@react-native-community/async-storage';

export default class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      phone: props.route.params.phone,
    //   phone: '09023431867',
      loading: false,
    };
  }

  componentDidMount() {
    showTopNotification('info', 'OTP Sent to phone: ' + this.state.phone);
  }

  _verifyOTP() {
    if (this.state.otp.length < 6) {
      showTopNotification('info', 'OTP must be at least 6 digits');
      return;
    }
    this.setState({loading: true});
    fetch(baseUrl() + 'users/verify-phone/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone: this.state.phone, otp: this.state.otp}),
    })
      .then(processResponse)
      .then((res) => {

        if (res.statusCode === 200 && res.data.status) {
         
          this._authenticate();
        } else {
          this.setState({loading: false});
          showTopNotification('danger', res.data.message);
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        showTopNotification('danger', error.message);
      });
  }

  _authenticate = () => {
    this.setState({loading: true});
    fetch(baseUrl() + 'users/authenticate/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: this.state.phone, password: this.state.phone}),
    })
      .then(processResponse)
      .then((res) => {
        console.warn(`DATA==> ${JSON.stringify(res.data)}`);
        if (res.statusCode === 200) {
          (async () => {
            await AsyncStorage.setItem('@token', res.data.token);
            await AsyncStorage.setItem('@isAuthenticated', 'true');
          })();
          this.props.navigation.navigate('AppHome');
        } else {
          this.setState({loading: false});
          showTopNotification('danger', 'Oops!!! An error occurred');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        showTopNotification('danger', error.message);
      });
  };

  render() {
    let buttonContent;
    if (this.state.loading)
      buttonContent = (
        <ActivityIndicator
          size="large"
          animating={this.state.loading}
          color="#FFF"
        />
      );
    else buttonContent = <Text style={styles.buttonText}>Login</Text>;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/airand_logo.png')}
          style={{height: 65, width: 60, marginBottom: 10}}
        />
        <Text style={[styles.title, {fontFamily: 'JuliusSansOne-Regular'}]}>AIRAND</Text>
        <Text style={[styles.title, {fontSize: 25}]}>PILOT</Text>
        <Text style={[styles.title, {fontSize: 25}]}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            placeholderTextColor="#707070"
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({otp: text});
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => this._verifyOTP()}
          style={styles.button}>
          {buttonContent}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF0F6',
  },
  title: {
    fontSize: 35,
    marginTop: 7,
    fontFamily: 'Montserrat-Medium'
  },
  inputContainer: {
    flexDirection: 'row',
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: '#FFF',
    alignContent: 'center',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 0,
    width: '80%',
    fontFamily: 'Montserrat-Regular'
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#07223D',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium'
  },
});
