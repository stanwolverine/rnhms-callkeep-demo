// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('FCM Message handled in the background!', JSON.stringify(remoteMessage, null, 2));
});
