import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
Notifications.addNotificationResponseReceivedListener((response) => {
  
  const uri = response.notification.request.content.data.uri;
  console.log('Received notification with uri:', uri);
  if (uri) {
    Linking.openURL(uri).catch((err) => console.error('An error occurred', err));
  }
});


export default function Index() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    
    if (status !== 'granted') {
      alert('You need to enable permissions in settings.');
      return;
    }
  }

  
  async function schedulePushNotification(date:Date) {
    await Notifications.scheduleNotificationAsync({ 
      content: {
        title: "está na hora de sair",
        body: 'vá para a Fatec Mauár',
        data: { uri: 'geo:0,0?q=FATEC Maua' },
      },
      trigger: date,
    });
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to the notification scheduler app!</Text>
      <Button
        title="Schedule a Notification"
        onPress={() => schedulePushNotification(new Date(Date.now() + 10000))} // Schedules for 10 seconds later
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
  },
});
