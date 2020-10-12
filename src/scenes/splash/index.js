
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Auth');
        }, 3000);
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/airand_logo.png')}
                style={{ height: 55, width: 55, marginBottom: 10 }}
            />
            <Text style={[styles.title]}>AIRAND</Text>
            <Text style={[styles.title, {fontSize: 25}]}>PILOT</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF0F6'
    },
    title: {
        fontSize: 35, textTransform: "uppercase", marginTop: 10
    }
});
