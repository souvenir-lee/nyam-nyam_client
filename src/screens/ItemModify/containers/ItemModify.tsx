import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@base/modules';
import { getItemDetail } from '@base/modules/itemDetail';
import ItemModifyScreen from '../components/ItemModifyScreen';

// 매출 예측 페이지, 시그니처 페이지, 검색 페이지
export default function ItemModifyContainer({ navigation, route }) {
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
        if (data.userId === user) {
          setIsMine(true);
        } else {
          setIsMine(false);
        }
      }
    }
  }, [data, loading, error]);

  const handleModifyPress = () => {
    navigation.navigate('ItemModify', {
      productionId: data.id,
    });
  };

  return loading ? null : (
    <ItemModifyScreen
      data={data}
      isMine={isMine}
      handleModifyPress={handleModifyPress}
    />
  );
}
