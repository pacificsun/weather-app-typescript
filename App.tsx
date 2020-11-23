import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import * as Location from 'expo-location';
import { colors } from './constants/Colors';

import WeatherInfo from './components/WeatherInfo';

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
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      // console.log('location>>', location);
      const { latitude, longitude } = location.coords;

      const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl); // This gives json promise
      const result = await response.json();
      console.log('result>>', result);
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <WeatherInfo currentWeather={currentWeather} />
        <StatusBar style="auto" />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
