
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {


    async componentDidMount() {
        setTimeout(() => {
            this.initPage();
        }, 3000);
    }

    initPage = () => {
        AsyncStorage.getItem('@isAuthenticated').then((value) => {
            console.warn(value);
            if (value === 'true') {
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Auth');
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/airand_logo.png')}
                    style={{ height: 55, width: 55, marginBottom: 10 }}
                />
                <Text style={[styles.title]}>AIRAND</Text>
                <Text style={[styles.title, { fontSize: 25 }]}>PILOT</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF0F6'
    },
    title: {
        fontSize: 35, textTransform: "uppercase", marginTop: 10
    }
});
