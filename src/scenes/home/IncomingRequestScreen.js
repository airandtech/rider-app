import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import OrderTile from '../../components/OrderTile';
import { getToken, processResponse } from '../../utilities';

export default class IncomingRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.route.params.data,
        };
    }

    acceptRequest = async (location) => {
        //alert('mamam')
        fetch(`https://airandapi.azurewebsites.net/api/dispatch/accept/${this.state.data.requestorEmail}`, {
            method: 'get',
            headers: {
                "Authorization": await getToken(),
                'Content-Type': "application/json"
            },
        }).then(processResponse)
        .then((res) => {
            if (res.statusCode === 200 && res.data.status) {
                showTopNotification('success', 'Order Accepted');
                this.props.navigation.navigate('App');
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
        return (
            <View style={styles.container}>
                <View style={styles.topLayer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('App')}
                        style={styles.declineButton}>
                        <Icon active name="cross" size={30} color={'#FFF'} type="entypo" />
                        <Text style={{ fontSize: 25, color: '#FFF' }}>Decline</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomLayer}>
                    <View>
                        <View style={{ flexDirection: 'row', marginBottom: 25 }}>
                            <Text style={[styles.bottomText, { marginRight: 50 }]}>{this.state.data.time}</Text>
                            <Text style={styles.bottomText}>{this.state.data.distance}</Text>
                        </View>
                        <Text style={[styles.bottomText, { fontSize: 23 }]}>
                        {this.state.data.address}
                        </Text>
                        <Text style={[styles.bottomText, { marginTop: 10 }]}>
                            {this.state.data.requestorName}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            this.acceptRequest()
                        }}
                        style={{
                            flexDirection: 'row',
                            paddingTop: 30,
                            backgroundColor: '#0ED91B',
                            marginTop: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 20,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                active
                                name="double-arrow"
                                size={25}
                                color={'#FFF'}
                                type="material-icons"
                            />
                        </View>
                        <Text style={{ fontSize: 22, color: '#FFF' }}>ACCEPT</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                active
                                name="double-arrow"
                                size={25}
                                color={'#FFF'}
                                type="material-icons"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    topLayer: {
        flex: 4,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    bottomLayer: {
        flex: 3,
        backgroundColor: '#0ED91B',
        paddingHorizontal: 30,
        paddingTop: 30,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    declineButton: {
        flexDirection: 'row',
        backgroundColor: '#F72514',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 30,
    },
    bottomText: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: 'bold',
    },
});
