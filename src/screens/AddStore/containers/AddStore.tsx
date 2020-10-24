import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddStoreScreen from '../components/AddStoreScreen';
import { AddStoreProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules';

export default function AddStoreContainer({ navigation }: AddStoreProps) {
  return <AddStoreScreen navigation={navigation} />;
}
