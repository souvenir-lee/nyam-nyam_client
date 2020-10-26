import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import SalesPredictScreen from '../components/SalesPredictScreen';
import useLocation from '@base/hooks/useLocation';
import { SalesPredictProps } from '@base/types/Navigation/SalesPredictNavigation';
import { getWeather } from '@base/modules/salesPredict';
import { RootState } from '@base/modules';

export default function SalesPredictContainer({
  navigation,
}: SalesPredictProps) {
  const { loading, data } = useSelector(
    (state: RootState) => state.salesPredict.weather
  );
  const dispatch = useDispatch();
  // 테스트로 현재 위치 기반 좌표를 잡았으나, 이후에는 서버로부터 불러온 가게의 위치에 해당하는
  // 위치를 기반으로 날씨를 가져올 것이다.
  const location = useLocation({ navigation });
  const [date, setDate] = useState(0);
  const currentWeatherData =
    !loading && data ? (date ? data.daily[date] : data.current) : null;

  useEffect(() => {
    const initWeather = async () => {
      if (location) {
        const {
          coords: { longitude, latitude },
        } = location;
        dispatch(getWeather({ x: latitude, y: longitude }));
      }
    };
    console.log('dispatch get weather');
    initWeather();
  }, [location, dispatch]);

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <SalesPredictScreen
      navigation={navigation}
      data={currentWeatherData}
      date={date}
      setDate={setDate}
    />
  );
}
