import { Coords } from './defaultTypes';
import { WeatherIcon } from '@base/components/WeatherIcon';

export type AddressObject = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type AddressAPIProps = { keyword: string; coords: Coords | null };
export type AddressAPIResult = AddressObject[];

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
