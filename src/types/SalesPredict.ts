import { AxiosError } from 'axios';
import { AsyncState } from './utils';
import { WeatherAPIResults } from './api';

export type SalesPredictState = {
  weather: AsyncState<WeatherAPIResults, AxiosError | null>;
};
