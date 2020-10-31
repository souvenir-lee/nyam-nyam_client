import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useLocation from '@base/hooks/useLocation';
import AddStoreScreen from '../components/AddStoreScreen';
import { updateLocation } from '@base/modules/addStore';
import { AddStoreProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules';

export default function AddStoreContainer({ navigation }: AddStoreProps) {
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

  return <AddStoreScreen navigation={navigation} />;
}
