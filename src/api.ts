import axios from 'axios';
import { AddressAPIProps, AddressAPIResult } from '@base/types/api';
import { WeatherAPIResults } from '@base/types/api';
import { Coords } from '@base/types/defaultTypes';
import { WEATHER_API_KEY } from './config';

export const getStoreByKeyword = async ({
  keyword,
  coords,
}: AddressAPIProps): Promise<AddressAPIResult> => {
  try {
    if (!coords) {
      throw new Error('no coord provided');
    }
    const cafeResults = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword
      )}&x=${coords.x}&y=${coords.y}`,
      {
        headers: {
          Authorization: 'KakaoAK 00bb9e39dfdc4d620c37f49660ac625a',
        },
      }
    );

    return cafeResults.data.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOpenWeather = async ({
  x,
  y,
}: Coords): Promise<WeatherAPIResults> => {
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
