import { ActionType } from 'typesafe-actions';
import axios, { AxiosError } from 'axios';
import { takeLatest, fork, call, put, select } from 'redux-saga/effects';
import {
  createPromiseSaga,
  handleAsyncActions,
  reducerUtils,
} from '@base/lib/asyncUtils';
import {
  dateToFormatStr,
  getUpdateSalesData,
  postSalesUploadData,
} from '@base/api/salesUpload';

const GET_SALES_UPLOAD = 'salesUpload/GET_SALES_UPLOAD' as const;
const GET_SALES_UPLOAD_SUCCESS = 'salesUpload/GET_SALES_UPLOAD_SUCCESS' as const;
const GET_SALES_UPLOAD_ERROR = 'salesUpload/GET_SALES_UPLOAD_ERROR' as const;
const UPDATE_CURRENT_DATA = 'salesUpload/UPDATE_CURRENT_DATA' as const;
const UPDATE_CURRENT_WEATHER = 'salesUpload/UPDATE_CURRENT_WEATHER' as const;
const SET_DATE = 'salesUpload/SET_DATE' as const;
const SET_STORE = 'salesUpload/SET_STORE' as const;
const CHANGE_DATE_NEXT = 'salesUpload/CHANGE_DATE_NEXT' as const;
const CHANGE_DATE_PREV = 'salesUpload/CHANGE_DATE_PREV';
const POST_SALES_UPLOAD = 'salesUpload/POST_SALES_UPLOAD' as const;
const POST_SALES_UPLOAD_SUCCESS = 'salesUpload/POST_SALES_UPLOAD_SUCCESS' as const;
const POST_SALES_UPLOAD_ERROR = 'salesUpload/POST_SALES_UPLOAD_ERROR' as const;
const SET_SHOW_CALENDAR = 'salesUpload/SET_SHOW_CALENDAR' as const;
const RESET_CURRENT_DATE_INFO = 'salesUpload/RESET_CURRENT_DATE_INFO' as const;
const CLEAR_DATA = 'salesUpload/CLEAR_DATA' as const;

export const setDate = (key, date) => ({
  type: SET_DATE,
  key,
  date,
});

export const setStore = (storeId) => ({
  type: SET_STORE,
  payload: storeId,
});

export const getSalesUpload = () => ({
  type: GET_SALES_UPLOAD,
});

export const getSalesUploadSuccess = (storeItems, initialData) => ({
  type: GET_SALES_UPLOAD_SUCCESS,
  payload: storeItems,
  initialData,
});

export const getSalesUploadFailure = (error: AxiosError) => ({
  type: GET_SALES_UPLOAD_ERROR,
  payload: error,
});

export const resetCurrentDateInfo = () => ({
  type: RESET_CURRENT_DATE_INFO,
});

export const updateCurrentData = (index, id, value) => ({
  type: UPDATE_CURRENT_DATA,
  index,
  id,
  value,
});

export const updateCurrentWeather = (weatherId) => ({
  type: UPDATE_CURRENT_WEATHER,
  payload: weatherId,
});

export const changeDateNext = () => ({
  type: CHANGE_DATE_NEXT,
});

export const changeDatePrev = () => ({
  type: CHANGE_DATE_PREV,
});

export const postSalesUpload = () => ({
  type: POST_SALES_UPLOAD,
});

export const postSalesUploadSuccess = () => ({
  type: POST_SALES_UPLOAD_SUCCESS,
});

export const postSalesUploadError = (error: AxiosError) => ({
  type: POST_SALES_UPLOAD_ERROR,
  payload: error,
});

export const setShowCalendar = (key, show) => ({
  type: SET_SHOW_CALENDAR,
  key: key,
  show: show,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});

const actions = {
  getSalesUpload,
  getSalesUploadSuccess,
  getSalesUploadFailure,
  updateCurrentData,
  updateCurrentWeather,
  setDate,
  setStore,
  changeDateNext,
  changeDatePrev,
  postSalesUpload,
  postSalesUploadSuccess,
  postSalesUploadError,
  setShowCalendar,
  resetCurrentDateInfo,
  clearData,
};

export const ActionsWithAuth = [GET_SALES_UPLOAD, POST_SALES_UPLOAD];

type SalesUploadAction = ActionType<typeof actions>;

function* getSalesUploadSaga(
  action: ActionType<typeof SalesUploadAction>,
  accessToken: string
) {
  const currentStore = yield select((state) => state.salesUpload.currentStore);
  try {
    const result = yield call(getUpdateSalesData, currentStore, accessToken);
    yield console.log('result', result);
    const initialData = [];
    result.forEach((item) => {
      initialData.push([item.productionId, 0]);
    });
    console.log('initialData', initialData);
    yield put({ type: GET_SALES_UPLOAD_SUCCESS, payload: result, initialData });
  } catch (error) {
    yield put({ type: GET_SALES_UPLOAD_ERROR, payload: error });
  }
}

function* postSalesUploadSaga(
  action: ActionType<typeof getPredictData>,
  accessToken: string
) {
  const {
    currentStore,
    currentWeather,
    currentDateIdx,
    currentDate,
    currentData,
    salesData,
  } = yield select((state) => state.salesUpload);
  const date = dateToFormatStr(currentDate);
  const data = salesData.data;
  data[currentDateIdx] = {
    weatherId: currentWeather,
    date,
    production: currentData,
  };
  try {
    yield call(postSalesUploadData, currentStore, data, accessToken);
    yield put(clearData());
    yield put({ type: POST_SALES_UPLOAD_SUCCESS });
  } catch (error) {
    yield put({ type: POST_SALES_UPLOAD_ERROR, payload: error });
  }
}

export function* salesUploadWithAuthSaga(
  action: ActionsWithAuth,
  accessToken: string
) {
  switch (action.type) {
    case GET_SALES_UPLOAD:
      return yield fork(getSalesUploadSaga, action, accessToken);
    case POST_SALES_UPLOAD:
      return yield fork(postSalesUploadSaga, action, accessToken);
  }
}

const initialState = {
  currentStore: null,
  currentDateIdx: 0,
  currentDate: null,
  startDate: null,
  endDate: null,
  /*
  currentData: [
    [상품 id, 상품 판매수량],
    [상품 id, 상품 판매수량],
  ]
  */
  initialData: [],
  currentData: [],
  currentWeather: 0,
  showCalendar: [false, false],
  /*
  storeItems: [
    {
        "storeId": 4,
        "productionId": 1,
        "production": {
            "productionName": "티라미수",
            "productionImg": ""
        }
    },
    {
        "storeId": 4,
        "productionId": 2,
        "production": {
            "productionName": "치즈케이크",
            "productionImg": ""
        }
    },
  ]
  */
  storeItems: reducerUtils.initial([]),
  /*
  salesData: 
    data: [
     {
        weather: "맑음",
        date: "2020-10-10 00:00:00",
        production: [
           [상품 id, 상품 판매수량],
           [상품 id, 상품 판매수량],
        ]
     },
     {
        weather: "흐림",
        date: "2020-10-11 00:00:00",
        production: [
           [상품 id, 상품 판매수량],
           [상품 id, 상품 판매수량],
        ]
     },
   ]
  */
  salesData: reducerUtils.initial([]),
};

export default function salesUpload(state = initialState, action) {
  switch (action.type) {
    case SET_DATE:
      if (action.key === 'startDate') {
        const currentDate = action.date;
        return {
          ...state,
          currentDate,
          [action.key]: action.date,
        };
      } else {
        return {
          ...state,
          [action.key]: action.date,
        };
      }
    case SET_STORE:
      return {
        ...state,
        currentStore: action.payload,
      };
    case CHANGE_DATE_NEXT:
      const nextDate = new Date(state.currentDate);
      console.log(state.currentDate.getDate());
      nextDate.setDate(state.currentDate.getDate() + 1);
      console.log(nextDate);
      const currentDate = state.currentDate;
      const currentDateIdx = state.currentDateIdx;
      const nextDateInfo = state.salesData[currentDateIdx + 1];
      const nextData = nextDateInfo
        ? nextDateInfo.production.slice(0)
        : state.initialData.slice(0);
      const nextWeather = nextDateInfo ? nextDateInfo.weather : 0;
      const updatedData = state.currentData.slice(0);
      console.log('current weather', state.currentWeather);
      const resultObj = {
        weatherId: state.currentWeather,
        date: dateToFormatStr(currentDate),
        production: updatedData,
      };
      const nextSalesData = state.salesData.data.slice(0);
      nextSalesData[currentDateIdx] = resultObj;
      console.log(nextSalesData);
      return {
        ...state,
        currentDateIdx: currentDateIdx + 1,
        currentDate: nextDate,
        salesData: {
          ...state.salesData,
          data: nextSalesData,
        },
        currentWeather: nextWeather,
        currentData: nextData,
      };
    case CHANGE_DATE_PREV:
      const prevDate = new Date();
      prevDate.setDate(state.currentDate.getDate() - 1);
      const prevDateIdx = state.currentDateIdx - 1;
      const prevDateInfo = state.salesData[prevDateIdx];
      const prevData = prevDateInfo.production.slice(0);
      const prevWeather = prevDateInfo.weather;
      return {
        ...state,
        currentDateIdx: prevDateIdx,
        currentDate: prevDate,
        currentWeather: prevWeather,
        currentData: prevData,
      };
    case GET_SALES_UPLOAD:
      return {
        ...state,
        storeItems: {
          loading: true,
          error: null,
          data: [],
        },
      };
    case GET_SALES_UPLOAD_SUCCESS:
      return {
        ...state,
        storeItems: {
          loading: false,
          error: null,
          data: action.payload,
        },
        initialData: action.initialData.slice(0),
        currentData: action.initialData.slice(0),
      };
    case GET_SALES_UPLOAD_ERROR:
      return {
        ...state,
        storeItems: {
          ...state.storeItems,
          loading: false,
          error: action.payload,
        },
      };
    case UPDATE_CURRENT_DATA:
      const { index, id, value } = action;
      const updatedCurrentData = state.currentData.slice(0);
      updatedCurrentData[index] = [id, value];
      console.log('after updated state', state);
      return {
        ...state,
        currentData: updatedCurrentData,
      };
    case UPDATE_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload,
      };
    case POST_SALES_UPLOAD:
      return {
        ...state,
        salesData: {
          ...state.salesData,
          loading: true,
          error: null,
        },
      };
    case POST_SALES_UPLOAD_SUCCESS:
      return {
        ...state,
        salesData: {
          loading: false,
          error: null,
          data: null,
        },
      };
    case POST_SALES_UPLOAD_ERROR:
      return {
        ...state,
        salesData: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case SET_SHOW_CALENDAR:
      const curShowCalendar = state.showCalendar;
      curShowCalendar[action.key] = action.show;
      return {
        ...state,
        showCalendar: curShowCalendar,
      };
    case RESET_CURRENT_DATE_INFO:
      return {
        ...state,
        currentData: [],
        currentWeather: 0,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}
