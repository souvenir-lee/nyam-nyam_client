import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SignUpAddressScreen from '../components/SignUpAddressScreen';
import useLocation from '@base/hooks/useLocation';
import { Props } from '@base/types/SignUpNavigation';
import { updateLocation } from '@base/modules/signup';

export default function SignUpAddressContainer({ navigation }: Props) {
  const dispatch = useDispatch();
  const location = useLocation({ navigation });

  useEffect(() => {
    if (location) {
      const {
        coords: { longitude, latitude },
      } = location;
      if (location) {
        dispatch(updateLocation({ x: longitude, y: latitude }));
      }
    }
  }, [location, dispatch]);

  return <SignUpAddressScreen />;
}
