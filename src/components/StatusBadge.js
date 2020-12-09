import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
} from 'react-native';


export default class StatusBadge extends Component { 
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        const status = this.props.status
        if(status === 0){
            return(
                <View style={{backgroundColor: '#F72514', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20, marginTop: 10}}>
                    <Text style={{color: "#FFF", fontFamily: 'Montserrat-Medium', fontSize: 12}}>Unpaid</Text>
                </View>
            );
        }
        if(status === 1){
            return(
                <View style={{backgroundColor: '#0ED91B', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20, marginTop: 10}}>
                    <Text style={{color: "#FFF", fontFamily: 'Montserrat-Medium', fontSize: 12}}>Paid</Text>
                </View>
            );
        }
    }
}