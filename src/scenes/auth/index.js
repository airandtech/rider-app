import React, { Component } from 'react';
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
import { baseUrl, processResponse, showTopNotification } from '../../utilities';

export default class VerificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            loading: false,
        };
    }
    _verifyPhone() {
        if (this.state.phone.length < 10) {
            // this.props.navigation.navigate('OTP', {phone: '09023431867'})
            showTopNotification('info', 'Phone number must be at least 10 digits');
            return;
        }
        this.setState({ loading: true });
        console.warn(`url: ${baseUrl()}users/check-phone/${this.state.phone}`);
        fetch(baseUrl() + 'users/check-phone/' + this.state.phone, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(processResponse)
            .then((res) => {
                if (res.statusCode === 200 && res.data.status) {
                    this.props.navigation.navigate('OTP', { phone: this.state.phone });
                } else if (res.statusCode === 500) {
                    this.setState({ loading: false });
                    showTopNotification('danger', 'Oops!!! Something went wrong');
                } else {
                    this.setState({ loading: false });
                    showTopNotification('danger', res.data.message);
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                showTopNotification('danger', error.message);
            });
    }

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
        else buttonContent = <Text style={styles.buttonText}>Continue</Text>;
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/airand_logo.png')}
                    style={{ height: 55, width: 55, marginBottom: 10 }}
                />
                <Text style={[styles.title]}>AIRAND</Text>
                <Text style={[styles.title, { fontSize: 25 }]}>PILOT</Text>
                <Text style={[styles.title, { fontSize: 25 }]}>Verification</Text>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 16, color: '#707070', alignSelf: 'center' }}>
                        +234
          </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile Number"
                        placeholderTextColor="#707070"
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            this.setState({ phone: text });
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this._verifyPhone()}
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
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#07223D',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
});
