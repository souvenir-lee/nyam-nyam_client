import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Navigation from './navigation';

export default function App() {
  const [loaded] = useFonts({
    BMHANNA: require('../assets/fonts/BMHANNAPro.ttf'),
  });

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  useEffect(() => {
    if (!loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return loaded ? <Navigation /> : null;
}
