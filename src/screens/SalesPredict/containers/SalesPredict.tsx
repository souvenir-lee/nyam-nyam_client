import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SalesPredictScreen from '../components/SalesPredictScreen';
import useLocation from '@base/hooks/useLocation';
import { SalesPredictProps } from '@base/types/Navigation/SalesPredictNavigation';
import { getWeather } from '@base/modules/salesPredict';
import { RootState } from '@base/modules';

export default function SalesPredictContainer({
  navigation,
}: SalesPredictProps) {
  const {
    loading: weatherLoading,
    data: weatherData,
    error: weatherError,
  } = useSelector((state: RootState) => state.salesPredict.weather);
  const predictData = useSelector(
    (state: RootState) => state.salesPredict.predictData
  );
  const dispatch = useDispatch();
  // 테스트로 현재 위치 기반 좌표를 잡았으나, 이후에는 서버로부터 불러온 가게의 위치에 해당하는
  // 위치를 기반으로 날씨를 가져올 것이다.
  const location = useLocation({ navigation });
  const [date, setDate] = useState(0);
  const currentWeatherData =
    !weatherLoading && weatherData
      ? date
        ? weatherData.daily[date]
        : weatherData.current
      : null;
  const currentPredictData =
    predictData && predictData.data[date] ? predictData.data[date] : null;

  useEffect(() => {
    const initWeather = async () => {
      if (location) {
        const {
          coords: { longitude, latitude },
        } = location;
        dispatch(getWeather({ x: latitude, y: longitude }));
      }
    };

    initWeather();
  }, [location, dispatch]);

  useEffect(() => {
    if (weatherError) {
      Alert.alert('날씨 정보를 가져오는데 실패했습니다.');
    }
  }, [weatherError]);

  useEffect(() => {
    if (predictData && predictData[date] && predictData[date].error) {
      Alert.alert('매출 예측 정보를 가져오는데 실패했습니다.');
    }
  }, [predictData, date]);

  return weatherLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <SalesPredictScreen
      navigation={navigation}
      weatherData={currentWeatherData}
      predictData={currentPredictData}
      date={date}
      setDate={setDate}
    />
  );
}
