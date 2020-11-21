import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';

const WEATHER_API_KEY = 'b062803a275ee4bc06537e95f676ab34';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const { status } = async Location.requestPermissionsAsync();
      if(status !== 'granted'){
        setErrorMessage("Access to location is needed to run the app");
        return;
      }
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
