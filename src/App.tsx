import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigation/SignUp';
export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);

    return () => StatusBar.setHidden(false);
  }, []);
  return <Navigation />;
}
