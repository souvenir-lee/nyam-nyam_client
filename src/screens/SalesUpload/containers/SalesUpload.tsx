import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import SalesUploadScreen from '../components/SalesUploadScreen';
import useForm from '@base/hooks/useForm';
import {
  setDate,
  setStore,
  getSalesUpload,
  postSalesUpload,
  clearData,
  changeDateNext,
  changeDatePrev,
  setShowCalendar,
  updateCurrentData,
  updateCurrentWeather,
} from '@base/modules/salesUpload';
import { convertStoreObjToArray } from '@base/api/utils';
import { SalesUploadNavProps } from '@base/types/Navigation/MainNavigation';

export default function SalesUploadContainer({
  navigation,
}: SalesUploadNavProps) {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.signin);
  const {
    currentDate,
    currentData,
    currentWeather,
    currentStore,
    startDate,
    endDate,
    showCalendar,
  } = useSelector((state) => state.salesUpload);
  const {
    loading: itemsLoading,
    error: itemsError,
    data: storeItems,
  } = useSelector((state) => state.salesUpload.storeItems);
  const {
    loading: uploadLoading,
    error: uploadError,
    data: uploadData,
  } = useSelector((state) => state.salesUpload.salesData);
  const [isUploading, setIsUploading] = useState(false);

  const today = useMemo(() => new Date(), []);
  const storeArray = useMemo(() => convertStoreObjToArray(store), [store]);

  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
  }, []);

  useEffect(() => {
    if (!uploadLoading && uploadData.data.length !== 0) {
      Alert.alert('업로드에 성공했습니다.');
    } else if (uploadError) {
      Alert.alert('업로드에 실패했습니다.');
    }
  }, [uploadLoading, uploadError]);

  const handleStoreChange = (storeId) => {
    if (storeId !== null) {
      dispatch(setStore(Number(storeId)));
      dispatch(getSalesUpload());
    }
  };

  const handleDateChange = (key, date) => {
    if (key === 'startDate') {
      dispatch(setShowCalendar(0, false));
    } else {
      dispatch(setShowCalendar(1, false));
    }
    dispatch(setDate(key, date));
  };

  const handleWeatherChange = (weatherId) => {
    dispatch(updateCurrentWeather(weatherId));
  };

  const handleQuantityChange = (index, id, value) => {
    dispatch(updateCurrentData(index, id, value));
  };

  const handleNextPress = (isLast) => {
    if (currentWeather === 0) {
      Alert.alert('날씨를 입력해야 합니다.');
    } else {
      if (isLast) {
        dispatch(postSalesUpload());
      } else {
        dispatch(changeDateNext());
      }
    }
  };

  const handlePrevPress = () => {
    if (currentDate === startDate) {
      Alert.alert('가장 처음 일자입니다.');
    } else {
      dispatch(changeDatePrev());
    }
  };

  const handleShowCalendar = (key) => {
    dispatch(setShowCalendar(key, true));
  };

  return (
    <>
      <SalesUploadScreen
        storeArray={storeArray}
        today={today}
        startDate={startDate}
        endDate={endDate}
        store={store}
        currentDate={currentDate}
        currentData={currentData}
        currentStore={currentStore}
        weather={currentWeather}
        storeItems={storeItems}
        handleWeatherChange={handleWeatherChange}
        handleStoreChange={handleStoreChange}
        handleShowCalendar={handleShowCalendar}
        handleDateChange={handleDateChange}
        handlePrevPress={handlePrevPress}
        handleNextPress={handleNextPress}
        handleQuantityChange={handleQuantityChange}
      />
      {showCalendar[0] ? (
        <DateTimePicker
          display="calendar"
          mode="date"
          value={today}
          maximumDate={today}
          onChange={(e, selectedDate) =>
            handleDateChange('startDate', selectedDate)
          }
        />
      ) : null}
      {showCalendar[1] ? (
        <DateTimePicker
          display="calendar"
          mode="date"
          value={today}
          minimumDate={startDate}
          maximumDate={today}
          onChange={(e, selectedDate) =>
            handleDateChange('endDate', selectedDate)
          }
        />
      ) : null}
    </>
  );
}
