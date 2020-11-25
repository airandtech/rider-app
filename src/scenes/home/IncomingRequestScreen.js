import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Vibration,
} from 'react-native';
import { Icon } from 'react-native-elements';
import RNSwipeVerify from 'react-native-swipe-verify';
import OrderTile from '../../components/OrderTile';
import { getToken, processResponse, showTopNotification } from '../../utilities';

const { width } = Dimensions.get('window');
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS
];

export default class IncomingRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.route.params.data,
            // data: {},
            isUnlocked: false,
            isUploaded: false,
        };
    }

    componentDidMount() {
        Vibration.vibrate(PATTERN, true)
    }

    playSound = () => {
        // Import the react-native-sound module
        var Sound = require('react-native-sound');

        // Load the sound file 'whoosh.mp3' from the app bundle
        // See notes below about preloading sounds within initialization code below.
        var whoosh = new Sound('chip.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.warn('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.warn('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.warn('successfully finished playing');
                } else {
                    console.warn('playback failed due to audio decoding errors');
                }
            });
        });

    }


    acceptRequest = async (location) => {
        Vibration.cancel()
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
                    this.swipeVerify2.reset()
                    this.props.navigation.navigate('App');
                } else if (res.statusCode === 500) {
                    this.setState({ loading: false });
                    console.warn(`Email: ${this.state.data.requestorEmail}`)
                    showTopNotification('danger', 'Oops!!! Something went wrong');
                    this.swipeVerify2.reset()
                } else {
                    this.setState({ loading: false });
                    showTopNotification('danger', res.data.message);
                    this.swipeVerify2.reset()
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                showTopNotification('danger', error.message);
            });
    }

    render() {
        const { isUnlocked, isUploaded } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.topLayer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('App')}
                        style={styles.declineButton}>
                        <Icon active name="cross" size={30} color={'#FFF'} type="entypo" />
                        <Text style={{ fontSize: 25, color: '#FFF', fontFamily: 'Montserrat-Regular' }}>Decline</Text>
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
                </View>
                <RNSwipeVerify
                    ref={(ref) => (this.swipeVerify2 = ref)}
                    width={width - 50}
                    buttonSize={60}
                    buttonColor="#0ED91B"
                    backgroundColor="#0ED91B"
                    textColor="#FFF"
                    borderRadius={0}
                    okButton={{ visible: true, duration: 400 }}
                    onVerified={() => {
                        this.setState({ isUploaded: true });
                        this.acceptRequest();
                    }}
                    icon={
                        isUnlocked ? <View ><Icon name='double-arrow' size={25} color={'#FFF'} type='material-icons' /></View> : <View ><Icon name='double-arrow' size={25} color={'#FFF'} type='material-icons' /></View>

                    }
                >
                    <Text style={{ color: '#FFF', fontSize: 20, fontFamily: 'Montserrat-Regular' }}>ACCEPT</Text>
                </RNSwipeVerify>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0ED91B',
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
        fontFamily: 'Montserrat-Bold'
    },
});
