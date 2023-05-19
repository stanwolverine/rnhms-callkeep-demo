import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { requestNotifications } from 'react-native-permissions';

export const FCMSetup = ({ children }) => {
  // This effect handles Firebase Cloud Messaging permissions
  useEffect(() => {
    async function requestUserPermission() {
      // Handle permission on IOS
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        console.log(`Authorization status = ${authStatus} ; Is Enabled? = ${enabled}`);
      }
      // Handle permission on Android
      else if (Platform.OS === 'android') {
       const result = await requestNotifications([]);
       console.log('Authorization status:', result);
      }
    }

    requestUserPermission();
  }, []);

  // Registers FCM forground listener
  useEffect(() => {
    // Get FCM Token
    messaging().getToken().then(token => console.log('FCM Token -> ', token));

    // Register subscription to handle FCM Message in Foreground state
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message handled in Foreground -> ', JSON.stringify(remoteMessage, null, 2));
    });

    return unsubscribe;
  }, []);

  return children;
};
