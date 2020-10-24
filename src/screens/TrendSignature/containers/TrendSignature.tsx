import React from 'react';

import TrendSignatureScreen from '../components/TrendSignatureScreen';
import { TrendSignatureProps } from '@base/types/Navigation/TrendSignatureNavigation';

export default function TrendSignatureContainer({
  navigation,
}: TrendSignatureProps) {
  return <TrendSignatureScreen navigation={navigation} />;
}
