import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TrendAllScreen from '../components/TrendAllScreen';
import { TrendAllProps } from '@base/types/Navigation/TrendNavigation';

export default function TrendAllContainer({ navigation }: TrendAllProps) {
  return <TrendAllScreen navigation={navigation} />;
}
