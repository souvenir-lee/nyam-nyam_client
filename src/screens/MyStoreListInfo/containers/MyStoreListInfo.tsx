import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyStoreListInfoScreen from '../components/MyStoreListInfoScreen';
import { RootState } from '@base/modules';
import { MyStoreListInfoProps } from '@base/types/Navigation/MyPageNavigation';

export default function MyStoreListInfoContainer({
  navigation,
}: MyStoreListInfoProps) {
  return <MyStoreListInfoScreen navigation={navigation} />;
}
