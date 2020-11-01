import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native'

import MyMenuListInfoScreen from '../components/MyMenuListInfoScreen';
import { RootState } from '@base/modules';
import { MyMenuListInfoProps } from '@base/types/Navigation/MyPageNavigation';
import { MyMenuItemType } from '@base/types/mypage';
import { SigninStoreData } from '@base/types/auth';
import { getMyMenuList, deleteMyMenuItem } from '@base/modules/mypage';
type MapMyStoreToArray = (menus: any) => MyMenuItemType[] | null;

export default function({
  navigation,
}: MyMenuListInfoProps) {
  const mapMyStoresToArray = (menus: any) => {
    if(!menus) return null;
  
    let arr = [];
    for(let storeId in menus){
      arr.push(menus[storeId]);
    }
  
    return arr;
  };
  const filterCurrentMenus = (menus: MyMenuItemType[] | [], storeId: string | number | null) => {
    if(!storeId || !menus || menus.length === 0) return [];

    return menus.filter((menu: MyMenuItemType) => menu.storeId == storeId);
  };
  const getCurrentStore = (stores: SigninStoreData[] | []) => {
    if(stores){
      for(let storeId in stores) return stores[storeId];
    } else {
      return null;
    }
  };

  let menus = useSelector((state: RootState) => state.mypage.menus);
  let stores = useSelector((state: RootState) => state.signin.store);
  const [currentStore, setCurrentStore] = useState<any>(getCurrentStore(stores))
  const dispatch = useDispatch();

  let filteredMenus = filterCurrentMenus(menus, currentStore ? currentStore.id : null);
  let storesArr = mapMyStoresToArray(stores);

  console.log('current store1: ', currentStore);

  const handleMenuItemDetailPress = () => {
    console.log('navigate to ItemModify');
    navigation.navigate('ItemModify');
  };

  const handleAddMenuPress = () => {
    console.log('navigate to AddMenu');
    navigation.navigate('AddMenu');

  }

  const handleDeletionPress = (storeId: number | string, productionId: number | string) => {
    Alert.alert(
      "메뉴 삭제",
      "해당 메뉴를 정말 삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "확인", onPress: () => {
          console.log('dispatch delete my menu item');
          dispatch(deleteMyMenuItem(storeId, productionId));
        } }
      ],
      { cancelable: false }
    );
  };

  const fetchMyMenusByStoreId = (storeId: string | number) => {
    const finded = menus.find((menu: MyMenuItemType) => {
      return menu.storeId == storeId;
    });
    console.log('fetch my menu');
    if(!finded){
      dispatch(getMyMenuList(storeId));
    }
  };

  const handleStoreSelect = (id: string | number) => {
    setCurrentStore(stores[id]);
    console.log('selected id, store:', id, currentStore);
    fetchMyMenusByStoreId(id);
  };  

  useEffect(() => {
    console.log('stores:', stores, 'current store:', currentStore);
    if(currentStore){
      fetchMyMenusByStoreId(currentStore.id);
    }
  }, []);

  return (
    <MyMenuListInfoScreen
      navigation={navigation}
      stores={storesArr}
      currentStore={currentStore}
      menus={filteredMenus}
      //onMenuItemDetailPress={handleMenuItemDetailPress}
      //onMenuAddMenuPress={handleAddMenuPress}
      onDeletionPress={handleDeletionPress}
      onStoreSelect={handleStoreSelect}
    />
  );
}
