import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@base/modules';
import { getItemDetail } from '@base/modules/itemDetail';
import { ItemDetailProps } from '@base/types/Navigation/ItemDetail';
import ItemDetailScreen from '../components/ItemDetailScreen';

// 매출 예측 페이지, 시그니처 페이지, 검색 페이지
export default function ItemDetailContainer({
  navigation,
  route,
}: ItemDetailProps) {
  console.log(route);
  const { productionId } = route.params;
  const {
    itemInfo: { loading, data, error },
  } = useSelector((state) => state.itemDetail);
  const { user } = useSelector((state) => state.signin);
  const dispatch = useDispatch();
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    dispatch(getItemDetail(productionId));
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        Alert.alert('디저트 정보를 가져올 수 없습니다.');
        navigation.goBack();
      } else if (data) {
        if (data.userId === user.id) {
          setIsMine(true);
        } else {
          setIsMine(false);
        }
      }
    }
  }, [data, loading, error]);

  const handleModifyPress = () => {
    console.log('modify pressed');
    navigation.navigate('ItemModify', {
      productionId,
      storeId: data.storeId,
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return loading || !data ? null : (
    <ItemDetailScreen
      data={data.productionData}
      storeName={data.storeName}
      isMine={isMine}
      handleGoBack={handleGoBack}
      handleModifyPress={handleModifyPress}
    />
  );
}
