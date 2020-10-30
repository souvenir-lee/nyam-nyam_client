import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyStoreListInfoScreen from '../components/MyStoreListInfoScreen';
import { RootState } from '@base/modules';
import { MyStoreListInfoProps } from '@base/types/Navigation/MyPageNavigation';
import { getMyStoreList } from '@base/api/mypage';
import { Alert } from 'react-native';
import { initialize } from '@base/modules/salesPredict';
import { initializeError, deleteMyStoreItem } from '@base/modules/mypage';

type isRenderingFirstState = {
  isRenderingFirst: boolean;
  setIsRenderingFirst: (val: boolean) => void;
}

export default function MyStoreListInfoContainer({
  navigation,
}: MyStoreListInfoProps) {
  const store = useSelector((state: RootState) => state.signin.store);
  const error = useSelector((state: RootState) => state.mypage.error);
  const [isRenderingFirst, setIsRenderingFirst] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handlStoreItemDeletionPress = (id: number|string) => {
    dispatch(deleteMyStoreItem(id));
  };

  const handlAddStoreNavigatePress = () => {
    navigation.navigate('AddStore');
  };

  useEffect(() => {
    const getMyStoreList = () => {
      dispatch(getMyStoreList());
    };
    if(!store){
      getMyStoreList();
    }
  }, [store])

  useEffect(() => {
    const removePreviousError = () => {
      dispatch(initializeError());
      setIsRenderingFirst(false);
    };

    removePreviousError();
  }, []);

  useEffect(() => {
    const displayError = () => {
      if(!isRenderingFirst && error){
        Alert.alert(error);
      }
    };

    displayError();
  }, [error]);


  return <MyStoreListInfoScreen 
    navigation={navigation} 
    store={store}
    onStoreItemDeletionPress={handlStoreItemDeletionPress}
    onAddStoreNavigatePress={handlAddStoreNavigatePress}
  />;
}
