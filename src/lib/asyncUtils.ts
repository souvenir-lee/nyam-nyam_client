import { call, put } from 'redux-saga/effects';
import { AsyncState } from '@base/types/utils';
import { AnyAction } from 'redux';
import { AxiosError } from 'axios';

type AnyState = { [key: string]: any };

export const reducerUtils = {
  initial: <T, E = AxiosError<any> | null>(
    initialData?: T
  ): AsyncState<T, E> => ({
    loading: true,
    data: initialData || null,
    error: null,
  }),
  loading: <T, E = AxiosError<any> | null>(
    prevState?: T
  ): AsyncState<T, E> => ({
    loading: true,
    data: prevState || null,
    error: null,
  }),
  success: <T, E = AxiosError<any> | null>(payload: T): AsyncState<T, E> => ({
    loading: false,
    data: payload,
    error: null,
  }),
  // 실패 상태
  error: <T, E = AxiosError<any> | null>(error: E): AsyncState<T, E> => ({
    loading: false,
    data: null,
    error: error,
  }),
};

type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

// 프로미스를 기다렸다가 결과를 디스패치하는 사가
export function createPromiseSaga<P1, P2>(
  type: string,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action: AnyAction) {
    try {
      console.log('action: ', action);
      // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch (e) {
      yield put({ type: ERROR, error: true, payload: e });
    }
  };
}

// 특정 id의 데이터를 조회하는 용도로 사용하는 사가
// API를 호출 할 때 파라미터는 action.payload를 넣고,
// id 값을 action.meta로 설정합니다.
export function createPromiseSagaById<P1, P2>(
  type: string,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action: AnyAction) {
    const id = action.meta;
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      yield put({ type: ERROR, error: e, meta: id });
    }
  };
}

export function handleAsyncActions<P extends AnyState>(
  type: string,
  key: string,
  initialData: any,
  keepData = false
) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state: P, action: AnyAction): P => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            loading: true,
            error: null,
            data: keepData ? state[key].data : initialData,
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            loading: false,
            error: null,
            data: action.payload,
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            loading: false,
            error: action.payload,
            data: null,
          },
        };
      default:
        return state;
    }
  };
}

export function handleAsyncActionsById<P extends AnyState>(
  type: string,
  key: string,
  initialData: any,
  keepData = false
) {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state: P, action: AnyAction): P => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            loading: true,
            error: null,
            data: {
              ...state[key].data,
              [id]: keepData
                ? state[key][id] && state[key][id].data
                : initialData,
            },
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            loading: false,
            error: null,
            data: {
              ...state[key].data,
              [id]: action.payload,
            },
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            loading: false,
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
}
