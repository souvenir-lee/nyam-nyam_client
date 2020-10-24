import React from 'react';
import { RootState } from '@base/modules';
import { ItemDetailProps } from '@base/types/Navigation/ItemDetail';
import ItemDetailScreen from '../components/ItemDetailScreen';

// 매출 예측 페이지, 시그니처 페이지, 검색 페이지
export default function ItemDetailContainer({ navigation }: ItemDetailProps) {
  return <ItemDetailScreen navigation={navigation} />;
}
