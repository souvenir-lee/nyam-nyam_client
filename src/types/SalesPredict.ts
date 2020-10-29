import { AxiosError } from 'axios';
import { AsyncState } from './utils';
import { WeatherAPIResults } from './weather';
import { PredictDataAPIResults } from './predict';

export type SalesPredictState = {
  weather: AsyncState<WeatherAPIResults, AxiosError | null>;
  predictData: AsyncState<PredictDataAPIResults[], AxiosError | null>;
};
