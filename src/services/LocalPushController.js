import PushNotification from 'react-native-push-notification';


// PushNotification.configure({
//     // (required) Called when a remote or local notification is opened or received
//     onNotification: function (notification) {
//         console.log('LOCAL NOTIFICATION ==>', notification)
//     },
//     popInitialNotification: true,
//     requestPermissions: true
// })


export const LocalNotification = (data) => {
    PushNotification.localNotification({
        autoCancel: true,
        bigText:
            `New dispatch request from ${data.address}. Pick up location is ${data.distance} away. Duration is about ${data.time} ride`,
        subText: 'Rider notification',
        title: 'Dispatch Request',
        message: `New dispatch request from ${data.address}. Expand to see more`,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        //actions: '["Yes", "No"]'
    })
}