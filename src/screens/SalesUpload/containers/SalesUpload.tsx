import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SalesUploadScreen from '../components/SalesUploadScreen';
import { SalesUploadNavProps } from '@base/types/Navigation/MainNavigation';

export default function SalesUploadContainer({
  navigation,
}: SalesUploadNavProps) {
  return <SalesUploadScreen navigation={navigation} />;
}
