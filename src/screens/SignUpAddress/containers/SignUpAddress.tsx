import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SignUpAddressScreen from '../components/SignUpAddressScreen';
import useLocation from '@base/hooks/useLocation';
import { SignUpAddressProps } from '@base/types/Navigation/SignUpNavigation';
import { updateLocation } from '@base/modules/signUp';

export default function SignUpAddressContainer({
  navigation,
}: SignUpAddressProps) {
  const dispatch = useDispatch();
  const location = useLocation({ navigation });

  useEffect(() => {
    if (location) {
      const {
        coords: { longitude, latitude },
      } = location;
      dispatch(updateLocation({ x: longitude, y: latitude }));
    }
  }, [location, dispatch]);

  return <SignUpAddressScreen />;
}
