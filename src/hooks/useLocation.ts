import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { SignUpAddressProps } from '@base/types/Navigation/SignUpNavigation';
import { SalesPredictProps } from '@base/types/Navigation/SalesPredictNavigation';

export default function useLocation({ navigation }: any) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    const requestAndGetLocation = async () => {
      const isLocationActivated = await Location.hasServicesEnabledAsync();
      if (!isLocationActivated) {
        Alert.alert('가게 검색을 위해서는 위치 기능이 필요합니다.');
        navigation.goBack();
      }
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('가게 검색을 위해서는 위치 권한이 필요합니다.');
        navigation.goBack();
      }

      const curLocation = await Location.getCurrentPositionAsync({});
      console.log('current location', curLocation);
      setLocation(curLocation);
    };

    requestAndGetLocation();
  }, [navigation]);

  return location;
}
