
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function DeliveriesScreen({ navigation }) {


    return (
        <View style={styles.container}>
             <Text>You have no pending orders now</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF'
    },
    title: {
        fontSize: 35, textTransform: "uppercase", marginTop: 10
    }
});
