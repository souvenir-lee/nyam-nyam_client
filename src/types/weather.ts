import { WeatherIcon } from '@base/components/WeatherIcon';

type Weather =
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Clear'
  | 'Clouds'
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Squall'
  | 'Tornado';

export type WeatherObject = {
  description: string;
  icon: WeatherIcon;
  id: number;
  main: Weather;
};

export type CurrentWeatherObject = {
  temp: number;
  weather: WeatherObject;
};

export type DailyWeatherObject = {
  temp: number;
  weather: WeatherObject;
};

export type WeatherAPIResults = {
  current: CurrentWeatherObject | null;
  daily: DailyWeatherObject[];
};
