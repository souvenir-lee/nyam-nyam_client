import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { requestSigninWithToken } from '@base/modules/signin';

import Navigation from './navigation';

export default function App() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setHidden(true);
    Font.loadAsync({ BMHANNA: require('../assets/fonts/BMHANNAPro.ttf') });
    dispatch(requestSigninWithToken());
    return () => {
      StatusBar.setHidden(false);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  return loading ? null : <Navigation />;
}
