/* eslint-disable no-case-declarations */
import { takeEvery } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { AxiosError } from 'axios';

import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getOpenWeather } from '@base/api';
import { SalesPredictState } from '@base/types/SalesPredict';
import { Coords } from '@base/types/defaultTypes';

const GET_WEATHER = 'salesPredict/GET_WEATHER' as const;
const GET_WEATHER_SUCCESS = 'salesPredict/GET_WEATHER_SUCCESS' as const;
const GET_WEATHER_ERROR = 'salesPredict/GET_WEATHER_ERROR' as const;

export const getWeather = (info: Coords) => ({
  type: GET_WEATHER,
  payload: info,
});

export const getWeatherSuccess = (data: SalesPredictState) => ({
  type: GET_WEATHER_SUCCESS,
  payload: data,
});

export const getWeatherFailure = (error: AxiosError) => ({
  type: GET_WEATHER_ERROR,
  payload: error,
});

const getWeatherSaga = createPromiseSaga(GET_WEATHER, getOpenWeather);

export function* salesPredictSaga() {
  yield takeEvery(GET_WEATHER, getWeatherSaga);
}

const actions = {
  getWeather,
  getWeatherSuccess,
  getWeatherFailure,
};


type SalesPredictAction = ActionType<typeof actions>;

const initialState = {
  weather: reducerUtils.initial({ current: null, daily: [] }),
};

export default function salesPredict(
  state: SalesPredictState = initialState,
  action: SalesPredictAction
): SalesPredictState {
  switch (action.type) {
    case GET_WEATHER:
    case GET_WEATHER_SUCCESS:
    case GET_WEATHER_ERROR:
      return handleAsyncActions<SalesPredictState>(
        GET_WEATHER,
        'weather',
        initialState,
        true
      )(state, action);
    default:
      return state;
  }
}
