import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from '@react-navigation/native';
import * as Font from 'expo-font';

import Navigation from './navigation';

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);
    Font.loadAsync({ BMHANNA: require('../assets/fonts/BMHANNAPro.ttf') });
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);
  return <Navigation />;
}
