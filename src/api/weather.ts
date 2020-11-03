import axios from 'axios';
import { WeatherAPIResults } from '@base/types/weather';
import { Coords } from '@base/types/defaultTypes';
import { WEATHER_API_KEY } from '../config';

export const weatherToKorean = {
  Thunderstorm: '번개',
  Drizzle: '소나기',
  Squall: '소나기',
  Tornado: '태풍',
  Rain: '비',
  Snow: '눈',
  Clear: '맑음',
  Clouds: '구름',
  Fog: '안개',
  Mist: '안개',
  Smoke: '안개',
  Haze: '안개',
  Sand: '황사',
  Dust: '황사',
};

export const weatherList = [
  '번개',
  '소나기',
  '비',
  '눈',
  '황사',
  '안개',
  '태풍',
  '맑음',
  '구름',
];

export const getOpenWeather = async ({
  x,
  y,
}: Coords): Promise<WeatherAPIResults> => {
  console.log('x', x, 'y', y);
  const weatherResult = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${x}&lon=${y}&exclude=minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric`
  );

  const { current, daily: dailyArr } = weatherResult.data;
  const daily = dailyArr.map((day) => ({
    temp: day.temp.day,
    weather: day.weather[0],
  }));

  return {
    current: {
      temp: current.temp,
      weather: current.weather[0],
    },
    daily,
  };
};
