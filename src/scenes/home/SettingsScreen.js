
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, BackHandler } from 'react-native';

export default class SettingsScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        BackHandler.exitApp();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF'
    },
    title: {
        fontSize: 35, textTransform: "uppercase", marginTop: 10
    }
});
