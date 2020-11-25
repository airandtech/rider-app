
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, BackHandler, Alert } from 'react-native';
import OrderTile from '../../components/OrderTile';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl, getToken, processResponse, showTopNotification, token } from '../../utilities';
import messaging from '@react-native-firebase/messaging';

export default class DeliveriesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "completed",
            completedOrders: [],
            ordersInProgress: [],
            pendingOrders: [],
            orderList: [],
            completed: { borderBottomColor: 'red' },
            inProgress: { borderBottomColor: 'transparent' },
            pending: { borderBottomColor: 'transparent' },
            requestorEmail: "",
            doNavigate: true
 
        };
    }

    async componentDidMount() {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: false,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
            url: 'https://airandapi.azurewebsites.net/api/location/driver/update',
            httpHeaders: {
                'Authorization': await getToken()
            },
            // customize post properties
            postTemplate: {
                latitude: '@latitude',
                longitude: '@longitude'
            }
        });

        BackgroundGeolocation.on('location', (location) => {
            // handle your locations here
            // to perform long running operation on iOS
            // you need to create background task

            BackgroundGeolocation.startTask(taskKey => {
                console.warn(`latitude: ${location.latitude}, longitude: ${location.longitude}`)
                this.sendLocation(location)
                // execute long running task
                // eg. ajax post location
                // IMPORTANT: task has to be ended by endTask
                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('stationary', (stationaryLocation) => {
            // handle stationary locations here
            Actions.sendLocation(stationaryLocation);
        });

        BackgroundGeolocation.on('error', (error) => {
            console.warn('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.on('start', () => {
            console.warn('[INFO] BackgroundGeolocation service has been started');
        });

        BackgroundGeolocation.on('stop', () => {
            console.warn('[INFO] BackgroundGeolocation service has been stopped');
        });

        BackgroundGeolocation.on('authorization', (status) => {
            console.warn('[INFO] BackgroundGeolocation authorization status: ' + status);
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                // we need to set delay or otherwise console.warn may not be shown
                setTimeout(() =>
                    console.warn('App requires location tracking permission', 'Would you like to open app settings?', [
                        { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
                        { text: 'No', onPress: () => console.warn('No Pressed'), style: 'cancel' }
                    ]), 1000);
            }
        });

        BackgroundGeolocation.on('background', () => {
            console.warn('[INFO] App is in background');
        });

        BackgroundGeolocation.on('foreground', () => {
            console.warn('[INFO] App is in foreground');
        });

        BackgroundGeolocation.on('abort_requested', () => {
            console.warn('[INFO] Server responded with 285 Updates Not Required');

            // Here we can decide whether we want stop the updates or not.
            // If you've configured the server to return 285, then it means the server does not require further update.
            // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
            // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
        });

        BackgroundGeolocation.on('http_authorization', () => {
            console.warn('[INFO] App needs to authorize the http requests');
        });

        BackgroundGeolocation.checkStatus(status => {
            console.warn('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.warn('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.warn('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });

        // you can also just start without checking for status
        // BackgroundGeolocation.start();


        this.checkPermission();

        this.createNotificationListeners();

        await this.getOrders();

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    async requestPermission() {
        const authorizationStatus = await messaging().requestPermission();
        console.warn(`==> authorizationStatus: ${authorizationStatus}`)
        if (authorizationStatus) {
            console.warn('Permission status:', authorizationStatus);
            if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
                console.warn('User has notification permissions enabled.');
                this.getToken();
            } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
                console.warn('User has provisional notification permissions.');
            } else {
                console.warn('User has notification permissions disabled');
            }
        } else {
            console.warn('permission rejected');
        }
    }

    async checkPermission() {

        const enabled = await messaging().hasPermission();
        console.warn(`checkPermission: ${enabled}`)
        // If Premission granted proceed towards token fetch
        if (enabled) {
            console.warn(`==> about to get token`)
            this.getToken();
        } else {
            console.warn(`==> requesting permission`)
            // If permission hasn’t been granted to our app, request user in requestPermission method. 
            this.requestPermission();
        }
    }

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.warn(`==> getting token`)
        if (!fcmToken) {
            console.warn(`==> fcmToken is not available`)
            // Register the device with FCM
            await messaging().registerDeviceForRemoteMessages();

            // Get the token
            const token = await messaging().getToken();
            console.warn(`==> getToken returned: ${token}`)
            if (token) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', token);
                await this._saveDeviceToken(token);
            }

            // Save the token
            await _saveDeviceToken(token);
        }
        console.warn(`==> fcmToken is available`)
    }

    async _saveDeviceToken(fcmToken) {
        console.warn(`===> users/save-token/${fcmToken}`)
        fetch(baseUrl() + 'users/save-token/' + fcmToken, {
            method: 'get',
            headers: {
                'Content-Type': "application/json",
                'Authorization': await getToken()
            },
        }).then(processResponse)
            .then(res => {
                if (res.statusCode === 200 && res.data.status) {
                    showTopNotification("success", "Token Saved")
                } else {
                    this.setState({ loading: false })
                    showTopNotification("danger", res.data.message)
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                showTopNotification("danger", error.message)
            });
    }

    async sendLocation(location) {
        fetch(baseUrl() + '/api/location/driver/update', {
            method: 'post',
            headers: {
                "Authorization": await getToken(),
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ 'latitude': location.latitude, 'longitude': location.longitude })
        }).then(function (response) {
            console.warn(response);
        }).then(function (data) {
            console.warn(data)
        });
    }

    getOrders = async () => {
        let bearer = await getToken()
        //  let bearer = (async () => {  await AsyncStorage.setItem('@isAuthenticated', 'true')  })();
        console.warn(`bearer ==> ${bearer}`)
        fetch(baseUrl() + 'api/dispatch/orders/fetch', {
            method: 'get',
            headers: {
                "Authorization": await getToken(),
                'Content-Type': "application/json"
            },
        }).then(processResponse)
            .then(res => {
                if (res.statusCode === 200 && res.data.status) {
                    showTopNotification("success", "Orders Updated!!!")
                    this.setState({ completedOrders: res.data.data.completed, pendingOrders: res.data.data.pending, ordersInProgress: res.data.data.inProgress })
                } else {
                    this.setState({ loading: false })
                    showTopNotification("danger", res.data.message)
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                showTopNotification("danger", error.message)
            });
    }

    onOrderAction = () => {
        this.getOrders() // do stuff
    }

    componentWillUnmount() {
        // unregister all event listeners
        // BackgroundGeolocation.removeAllListeners();
    }

    _handleTabClick(type) {

        this.setState({ tab: type })
        if (type === 'completed') {
            this.setState({
                completed: { borderBottomColor: 'red' }, inProgress: { borderBottomColor: 'transparent' }, pending: { borderBottomColor: 'transparent' },
                orderList: ["", ""]
            })
        }
        if (type === 'inProgress') {
            this.setState({
                completed: { borderBottomColor: 'transparent' }, inProgress: { borderBottomColor: 'red' }, pending: { borderBottomColor: 'transparent' },
                orderList: ["", "", ""]
            })
        }
        if (type === 'pending') {
            this.setState({
                completed: { borderBottomColor: 'transparent' }, inProgress: { borderBottomColor: 'transparent' }, pending: { borderBottomColor: 'red' },
                orderList: [""]
            })
        }
    }

    handleBackButton() {
        BackHandler.exitApp();
    }

    async createNotificationListeners() {
        messaging().onMessage(this.onMessageReceived);
        //.bind(this);
        messaging().setBackgroundMessageHandler(this.onMessageReceived);
    }

    onMessageReceived = (message) => {
        this.props.navigation.navigate('IncomingRequest', { data: message.data })
    }

    sd = () => {
        // this.props.navigation.navigate('IncomingOrderX', { data: message.data })
    }

    render() {
        let body
        if (this.state.tab === 'completed') {
            body = <View>
                <FlatList
                    style={{ paddingBottom: 5 }}
                    data={this.state.completedOrders}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 2, }}>
                            <OrderTile parentOrderAction={this.onOrderAction}  navigation={this.props.navigation} tabType={this.state.tab} dataItem={item}/>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        }
        if (this.state.tab === 'inProgress') {
            body = <View>
                <FlatList
                    style={{ paddingBottom: 5 }}
                    data={this.state.ordersInProgress}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 2, }}>
                            <OrderTile parentOrderAction={this.onOrderAction} navigation={this.props.navigation} tabType={this.state.tab} dataItem={item}/>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        }
        if (this.state.tab === 'pending') {
            body = <View>
                <FlatList
                    style={{ paddingBottom: 5 }}
                    data={this.state.pendingOrders}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 2, }}>
                            <OrderTile parentOrderAction={this.onOrderAction}  navigation={this.props.navigation} tabType={this.state.tab} dataItem={item} />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={[{ borderBottomWidth: 4, paddingVertical: 20, paddingHorizontal: 20 }, this.state.completed]} onPress={() => this._handleTabClick('completed')}><Text style={styles.headerText}>Completed</Text></TouchableOpacity>
                    <TouchableOpacity style={[{ borderBottomWidth: 4, paddingVertical: 20, paddingHorizontal: 20 }, this.state.inProgress]} onPress={() => this._handleTabClick('inProgress')}><Text style={styles.headerText}>In Progress</Text></TouchableOpacity>
                    <TouchableOpacity style={[{ borderBottomWidth: 4, paddingVertical: 20, paddingHorizontal: 20 }, this.state.pending]} onPress={() => this._handleTabClick('pending')}><Text style={styles.headerText}>Pending</Text></TouchableOpacity>
                </View>
                {body}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#FFF'
    },
    title: {
        fontSize: 35, textTransform: "uppercase", marginTop: 10
    },
    header: {
        backgroundColor: '#07223D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        color: '#FFF',
        fontFamily: 'Montserrat-Bold',
        fontSize: 18
    }
}); 
