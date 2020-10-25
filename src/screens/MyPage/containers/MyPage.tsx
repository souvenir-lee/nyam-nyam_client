import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MyPageScreen from '../components/MyPageScreen';
import { MyPageProps } from '@base/types/Navigation/MyPageNavigation';

export default function MyPageContainer({ navigation }: MyPageProps) {
  return <MyPageScreen navigation={navigation} />;
}
