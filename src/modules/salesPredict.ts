/* eslint-disable no-case-declarations */
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { AxiosError } from 'axios';

import {
  createPromiseSaga,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from '@base/lib/asyncUtils';
import { getOpenWeather } from '@base/api/weather';
import { getPredictDataOfWeather } from '@base/api/predict';
import { SalesPredictState } from '@base/types/SalesPredict';
import { Coords } from '@base/types/defaultTypes';
import { WeatherAPIResults } from '@base/types/weather';
import { PredictDataAPIResults } from '@base/types/predict';

const INITIALIZE = 'salesPredict/INITIALIZE' as const;
const INITIALIZE_COMPLETE = 'salesPredict/INITIALIZE_COMPLETE' as const;
const DATA_CACHED = 'salesPredict/DATA_CACHED' as const;
const GET_WEATHER = 'salesPredict/GET_WEATHER' as const;
const GET_WEATHER_SUCCESS = 'salesPredict/GET_WEATHER_SUCCESS' as const;
const GET_WEATHER_ERROR = 'salesPredict/GET_WEATHER_ERROR' as const;
const GET_PREDICT_DATA = 'salesPredict/GET_PREDICT_DATA' as const;
const GET_PREDICT_DATA_SUCCESS = 'salesPredict/GET_PREDICT_DATA_SUCCESS' as const;
const GET_PREDICT_DATA_ERROR = 'salesPredict/GET_PREDICT_DATA_ERROR' as const;
const CHANGE_STORE = 'salesPredict/CHANGE_STORE' as const;
const CHANGE_STORE_COMPLETE = 'salesPredict/CHANGE_STORE_COMPLETE' as const;
const CHANGE_DATE = 'salesPredict/CHANGE_DATE' as const;

export const initialize = () => ({
  type: INITIALIZE,
});

export const initializeComplete = (storeId) => ({
  type: INITIALIZE_COMPLETE,
  payload: Number(storeId),
});

export const dataCached = (key) => ({
  type: DATA_CACHED,
  payload: key,
});

export const getWeather = () => ({
  type: GET_WEATHER,
});

export const getWeatherSuccess = (data: WeatherAPIResults) => ({
  type: GET_WEATHER_SUCCESS,
  payload: data,
});

export const getWeatherFailure = (error: AxiosError) => ({
  type: GET_WEATHER_ERROR,
  payload: error,
});

export const getPredictData = (day: number) => ({
  type: GET_PREDICT_DATA,
  payload: Number(day),
});

export const getPredictDataSuccess = (data: PredictDataAPIResults) => ({
  type: GET_PREDICT_DATA_SUCCESS,
  payload: data,
});

export const getPredictDataFailure = (error: AxiosError) => ({
  type: GET_PREDICT_DATA_ERROR,
  payload: error,
});

export const changeStore = (storeId) => ({
  type: CHANGE_STORE,
  payload: Number(storeId),
});

export const changeStoreComplete = (storeId) => ({
  type: CHANGE_STORE_COMPLETE,
  payload: Number(storeId),
});

export const changeDate = (date, storeId) => ({
  type: CHANGE_DATE,
  date: Number(date),
  storeId: Number(storeId),
});

// 현재 저장되어 있는 모든 정보를 지우고,
// 가장 첫 번째 가게의 날씨 및 매출 예측 정보를 저장한다.
function* initializeSaga(action: ActionType<typeof initialize>) {
  const { store } = yield select((state) => state.signin);
  const storeIds = Object.getOwnPropertyNames(store);
  yield put({ type: INITIALIZE_COMPLETE, payload: storeIds[0] });
  yield put({ type: GET_WEATHER });
}

// 현재 선택된 가게의 날씨 정보를 가져온 후
// 날씨에 해당하는 매출 예측 정보를 저장한다.
// 날씨 API는 오늘, 내일, 모레에 대한 날씨를 한꺼번에 가져온다.
// 해당 가게에 대한 날씨 정보가 있다면 다시 가져오지 않는다.

function* getWeatherSaga(action: ActionType<typeof getWeather>) {
  const { weather, currentStoreId, currentDate } = yield select(
    (state) => state.salesPredict
  );
  const { store } = yield select((state) => state.signin);
  try {
    const currentStoreWeather = weather[currentStoreId]; // {current: {}, daily: []} | undefined
    const currentStore = store[currentStoreId];
    // 이미 날씨 정보가 있다면
    if (currentStoreWeather) {
      yield put({
        type: DATA_CACHED,
        payload: 'weather',
      });
      yield put({
        type: GET_PREDICT_DATA,
        date: currentDate,
        store: currentStoreId,
      });
    } else {
      // 날씨 정보가 없다면 API로부터 얻어온다
      const coord = { x: currentStore.latitude, y: currentStore.longitude };
      const payload = yield call(getOpenWeather, coord);
      yield put({ type: GET_WEATHER_SUCCESS, payload, meta: currentStoreId });
      yield put({
        type: GET_PREDICT_DATA,
        date: currentDate,
        store: currentStoreId,
      });
    }
  } catch (e) {
    yield put({
      type: GET_WEATHER_ERROR,
      error: true,
      payload: e,
      meta: currentStoreId,
    });
  }
}

// 해당 가게의 해당 날짜에 대한 정보가 있다면 다시 가져오지 않는다.

function* getPredictDataSaga(
  action: ActionType<typeof getPredictData>,
  accessToken: string
) {
  const { date, store } = action;
  try {
    const { weather, predictData } = yield select(
      (state) => state.salesPredict
    );
    const currentWeather = date
      ? weather.data[store].daily[date].weather.main
      : weather.data[store].current.weather.main;

    const currentPredictData = predictData.data[store];

    if (currentPredictData && currentPredictData[date]) {
      yield put({
        type: DATA_CACHED,
        payload: 'predictData',
      });
    } else {
      const payload = yield call(getPredictDataOfWeather, {
        currentWeather,
        store,
        accessToken,
      });
      yield put({ type: GET_PREDICT_DATA_SUCCESS, payload, date, store });
    }
  } catch (error) {
    yield put({ type: GET_PREDICT_DATA_ERROR, payload: error });
  }
}

function* changeDateSaga(action: ActionType<typeof getPredictData>) {
  const { date, storeId } = action;
  yield put({
    type: GET_PREDICT_DATA,
    date,
    store: storeId,
  });
}

function* changeStoreSaga(action) {
  const store = action.payload;
  yield put({
    type: CHANGE_STORE_COMPLETE,
    payload: store,
  });
  yield put({
    type: GET_WEATHER,
  });
}

export function* salesPredictWithAuthSaga(
  action: ActionsWithAuth,
  accessToken: string
) {
  console.log(accessToken);
  switch (action.type) {
    case GET_PREDICT_DATA:
      return yield fork(getPredictDataSaga, action, accessToken);
  }
}

export function* salesPredictSaga() {
  yield takeLatest(INITIALIZE, initializeSaga);
  yield takeLatest(GET_WEATHER, getWeatherSaga);
  yield takeLatest(CHANGE_STORE, changeStoreSaga);
  yield takeLatest(CHANGE_DATE, changeDateSaga);
}

const actions = {
  initialize,
  getWeather,
  getWeatherSuccess,
  getWeatherFailure,
  getPredictData,
  getPredictDataSuccess,
  getPredictDataFailure,
};

type SalesPredictAction = ActionType<typeof actions>;

export const ActionsWithAuth = [GET_PREDICT_DATA];

const initialState = {
  // weather
  /*
  loading: false,
  error: null
  data: {
    store 아이디: {
      current: null,
      daily: []
    },
    store 아이디: ...
  }
  */
  weather: reducerUtils.initial({}),

  // predictData
  /*
  loading: false,
  error: null
  data: {
    store 아이디: [
      [0일차 매출 예측 정보],
      [1일차 매출 예측 정보],
      [2일차 매출 예측 정보]
    ],
    store 아이디: ...
  }
  */
  predictData: reducerUtils.initial({}),
  // 현재 선택된 가게
  currentStoreId: null,
  // 현재 선택된 날짜
  currentDate: 0,
};

export default function salesPredict(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return initialState;
    case INITIALIZE_COMPLETE:
      return {
        ...state,
        currentStoreId: Number(action.payload),
        currentDate: 0,
      };
    case DATA_CACHED:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          loading: false,
          error: null,
        },
      };
    case GET_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: true,
          error: null,
        },
      };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        weather: {
          loading: false,
          error: null,
          data: {
            ...state.weather.data,
            [action.meta]: action.payload,
          },
        },
      };
    case GET_WEATHER_ERROR:
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: false,
          error: action.payload,
        },
      };
    case GET_PREDICT_DATA:
      return {
        ...state,
        predictData: {
          ...state.predictData,
          loading: true,
          error: null,
        },
      };
    case GET_PREDICT_DATA_SUCCESS:
      let curPredictData = state.predictData.data[action.store];
      if (!curPredictData) {
        curPredictData = [];
      }
      curPredictData[action.date] = action.payload;
      return {
        ...state,
        predictData: {
          ...state.predictData,
          loading: false,
          error: null,
          data: {
            ...state.predictData.data,
            [action.store]: curPredictData,
          },
        },
      };
    case GET_PREDICT_DATA_ERROR:
      return {
        ...state,
        predictData: {
          ...state.predictData,
          loading: false,
          error: action.payload,
        },
      };
    case CHANGE_DATE:
      return {
        ...state,
        currentDate: Number(action.date),
      };
    case CHANGE_STORE:
      return {
        ...state,
        currentStore: Number(action.payload),
      };
    case CHANGE_STORE_COMPLETE:
      return {
        ...state,
        currentStoreId: Number(action.payload),
      };
    default:
      return state;
  }
}
