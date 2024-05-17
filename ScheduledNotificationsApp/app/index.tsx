import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
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
        body: 'vá para a Fateec Mauá',
        data: { data: 'geo:0,0?q="FATEC Maua"' },
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
