import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyMenuListInfoScreen from '../components/MyMenuListInfoScreen';
import { RootState } from '@base/modules';
import { MyMenuListInfoProps } from '@base/types/Navigation/MyPageNavigation';

export default function MyMenuListInfoContainer({
  navigation,
}: MyMenuListInfoProps) {
  return <MyMenuListInfoScreen navigation={navigation} />;
}
