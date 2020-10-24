import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChangePasswordScreen from '../components/ChangePasswordScreen';
import { ChangePasswordProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules';

export default function ChangePasswordContainer({
  navigation,
}: ChangePasswordProps) {
  return <ChangePasswordScreen navigation={navigation} />;
}
