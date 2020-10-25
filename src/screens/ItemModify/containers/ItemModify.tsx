import React from 'react';
import { RootState } from '@base/modules';

import ItemModifyScreen from '../components/ItemModifyScreen';
import { ItemModifyProps as PropsFromItemDetail } from '@base/types/Navigation/ItemDetail';
import { ItemModifyProps as PropsFromMyPage } from '@base/types/Navigation/MyPageNavigation';

export default function ItemModifyContainer({
  navigation,
}: PropsFromItemDetail | PropsFromMyPage) {
  return <ItemModifyScreen navigation={navigation} />;
}
