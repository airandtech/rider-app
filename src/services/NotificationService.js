import PushNotification from 'react-native-push-notification';

export default class NotificationService {
  //onNotificaitn is a function passed in that is to be called when a
  //notification is to be emitted.
  constructor(onNotification) {
    this.configure(onNotification);
    this.lastId = 0;
  }

  configure(onNotification) {
    PushNotification.configure({
      onNotification: onNotification,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
    });
  }

  //Appears right away
  localNotification(data) {
    this.lastId++;
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
    });
  }

  //Appears after a specified time. App does not have to be open.
  scheduleNotification() {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 30 * 1000), //30 seconds
      title: 'Scheduled Notification',
      message: 'My Notification Message',
      playSound: true,
      soundName: 'default',
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}
