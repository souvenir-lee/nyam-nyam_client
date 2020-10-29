import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SalesPredictScreen from '../components/SalesPredictScreen';
import {
  getPredictData,
  changeStore,
  changeDate,
} from '@base/modules/salesPredict';
import { SalesPredictProps } from '@base/types/Navigation/SalesPredictNavigation';
import { initialize } from '@base/modules/salesPredict';
import { RootState } from '@base/modules';

function convertStoreObjToArray(store) {
  if (!store) {
    return [];
  }
  const storeIds = Object.getOwnPropertyNames(store);
  const storeLists = [];
  storeIds.forEach((storeId, index) => {
    storeLists.push(store[storeId]);
  });
  return storeLists;
}

export default function SalesPredictContainer({
  navigation,
}: SalesPredictProps) {
  console.log('sales predict page rendering');
  const { store, isSignin } = useSelector((state) => state.signin);
  const {
    currentDate: date,
    currentStoreId: storeId,
    weather,
    predictData,
  } = useSelector((state) => state.salesPredict);
  const dispatch = useDispatch();

  const {
    loading: weatherLoading,
    error: weatherError,
    data: weatherData,
  } = weather;

  const {
    loading: predictLoading,
    error: predictError,
    data: predict,
  } = predictData;

  const currentWeatherData =
    storeId !== null && !weatherLoading && weatherData[storeId]
      ? date
        ? weatherData[storeId].daily[date]
        : weatherData[storeId].current
      : null;

  const currentData =
    storeId !== null && !predictLoading && predict[storeId]
      ? predict[storeId][date]
      : null;

  const storeArray = convertStoreObjToArray(store);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  useEffect(() => {
    if (weatherError) {
      Alert.alert('날씨 정보를 가져오는데 실패했습니다.');
    }
  }, [weatherError]);

  useEffect(() => {
    if (predictError) {
      Alert.alert('매출 예측 정보를 가져오는데 실패했습니다.');
    }
  }, [predictError]);

  const onDateChange = (date) => {
    dispatch(changeDate(date, storeId));
  };
  const onStoreChange = (storeId) => {
    console.log('onStoreChange', storeId);
    dispatch(changeStore(storeId));
  };
  if (!isSignin) {
    return null;
  }

  console.log('weatherLoading', weatherLoading);
  console.log('storeArray', storeArray);
  return weatherLoading || !storeArray.length ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  ) : (
    <SalesPredictScreen
      navigation={navigation}
      weatherData={currentWeatherData}
      predictData={currentData}
      storeId={storeId}
      storeArray={storeArray}
      onDateChange={onDateChange}
      onStoreChange={onStoreChange}
      date={date}
    />
  );
  return null;
}
