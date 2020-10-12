
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native';

export default function OtpScreen({ navigation }) {

    return (

        <View style={styles.container}>
            <Image
                source={require('../../assets/images/airand_logo.png')}
                style={{ height: 55, width: 55, marginBottom: 10 }}
            />
            <Text style={[styles.title]}>AIRAND</Text>
            <Text style={[styles.title, { fontSize: 25 }]}>PILOT</Text>
            <Text style={[styles.title, { fontSize: 25 }]}>Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="OTP"
                    placeholderTextColor="#707070"
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity onPress={()=> {navigation.navigate('App')}} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF0F6'
    },
    title: {
        fontSize: 35, marginTop: 7
    },
    inputContainer:{
        flexDirection: "row",
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
        paddingVertical:0,
        width: '80%'
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#07223D',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 25
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18
    }
});
