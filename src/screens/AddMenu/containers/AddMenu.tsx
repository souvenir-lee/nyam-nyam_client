import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddMenuScreen from '../components/AddMenuScreen';
import { AddMenuProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules';

export default function AddMenuContainer({ navigation }: AddMenuProps) {
  return <AddMenuScreen navigation={navigation} />;
}
