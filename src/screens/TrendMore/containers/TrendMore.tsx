import React from 'react';
import { TrendMoreProps } from '@base/types/Navigation/TrendSignatureNavigation';
import TrendMoreScreen from '../components/TrendMoreScreen';

export default function TrendMoreContainer({ navigation }: TrendMoreProps) {
  return <TrendMoreScreen navigation={navigation} />;
}
