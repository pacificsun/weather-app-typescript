import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherInfo = ({ currentWeather }) => {
  const {
    name,
    weather: [details],
    main: { temp },
  } = currentWeather;
  const { description, icon, main } = details;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text>{temp}</Text>
      <Text>{description}</Text>
      <Text>{main}</Text>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});
