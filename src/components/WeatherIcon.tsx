import React from 'react';
import { Fontisto } from '@expo/vector-icons';

export const apiIconToWeatherIcon = {
  '01d': 'day-sunny',
  '01n': 'night-clear',
  '02d': 'day-cloudy',
  '02n': 'night-alt-cloudy',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'rains',
  '09n': 'rains',
  '10d': 'day-rain',
  '10n': 'night-alt-rain',
  '11d': 'lightnings',
  '11n': 'lightnings',
  '13d': 'snows',
  '13n': 'snows',
  '50d': 'fog',
  '50n': 'fog',
};

export type WeatherIcon = keyof typeof apiIconToWeatherIcon;

export type WeatherIconProps = {
  icon: WeatherIcon;
};

function WeatherIcon({ icon }: WeatherIconProps) {
  const currentIcon = apiIconToWeatherIcon[icon];
  return <Fontisto size={130} name={currentIcon} />;
}

export default WeatherIcon;
