
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, BackHandler, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        BackHandler.exitApp();
    }
    
    render(){
    return (
        <View style={styles.container}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>Home</Text>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('IncomingRequest', { data: "message.dataaaa" })}>
                <Text>Go to Incoming Requests</Text>
            </TouchableOpacity> */}
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: '#FFF'
    },
    title: {
        fontSize: 35, textTransform: "uppercase", marginTop: 10
    }
});
