import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

class BgTracking extends Component {
    componentDidMount() {
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
            interval: 600000,
            fastestInterval: 300000,
            activitiesInterval: 600000,
            stopOnStillActivity: false,
            url: 'https://airandapi.azurewebsites.net/api/location/driver/update',
            httpHeaders: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJuYmYiOjE2MDI3MTMwMTIsImV4cCI6MTgyMzU1MTQxMiwiaWF0IjoxNjAyNzEzMDEyfQ.ihgESuAXOt-U67P6bqtb9HMAV79fVaoCWW8iXahg67w'
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


        setTimeout(() => {
            this.props.navigation.navigate('IncomingOrder');
        }, 15000);
    }

    sendLocation(location) {
        fetch('https://airandapi.azurewebsites.net/api/location/driver/update', {
            method: 'post',
            headers: {
                "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJuYmYiOjE2MDI3MTMwMTIsImV4cCI6MTgyMzU1MTQxMiwiaWF0IjoxNjAyNzEzMDEyfQ.ihgESuAXOt-U67P6bqtb9HMAV79fVaoCWW8iXahg67w',
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ 'latitude': location.latitude, 'longitude': location.longitude })
        }).then(function (response) {
            console.warn(response);
        }).then(function (data) {
            console.warn(data)
        });
    }

    componentWillUnmount() {
        // unregister all event listeners
        BackgroundGeolocation.removeAllListeners();
    }

    render() {
        return (

            <View>


                <Text>Location</Text>


            </View>

        )
    }
}

export default BgTracking;