import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyMenuListInfoScreen from '../components/MyMenuListInfoScreen';
import { RootState } from '@base/modules';
import { MyMenuListInfoProps } from '@base/types/Navigation/MyPageNavigation';
import { MyMenuItemType } from '@base/types/mypage';
import { SigninStoreData } from '@base/types/auth';

type MapMyStoreToArray = (menus: any) => MyMenuItemType[] | null;

export default function ({ navigation }: MyMenuListInfoProps) {
  const menus = useSelector((state: RootState) => state.mypage.menus);
  const stores = useSelector((state: RootState) => state.signin.store);
  const getCurrentStore = (stores: SigninStoreData[] | []) => {
    return stores.length > 0 && stores[0] ? stores[0] : null;
  };
  const [currentStore, setCurrentStore] = useState<SigninStoreData | null>(
    getCurrentStore(stores)
  );

  const mapMyStoresToArray = (menus: any) => {
    if (!menus) return null;

    const arr = [];
    for (const store in menus) {
      arr.push(store);
    }

    return arr;
  };

  const filterCurrentMenus = (
    menus: MyMenuItemType[] | [],
    storeId: string | number | null
  ) => {
    if (storeId && menus && menus.length === 0) return [];

    return menus.filter((menu: MyMenuItemType) => menu.storeId == storeId);
  };

  const handleStoreSelect = (id: string | number) => {
    if (stores.length === 0) return;

    setCurrentStore(stores[id]);
  };

  const handleDeletionPress = () => {};

  useEffect(() => {
    const fetchMyMenuList = () => {};

    fetchMyMenuList();
  }, []);

  return (
    <MyMenuListInfoScreen
      stores={mapMyStoresToArray(stores) as SigninStoreData[] | []}
      currentStore={currentStore}
      menus={filterCurrentMenus(menus, currentStore ? currentStore.id : null)}
      onDeletionPress={handleDeletionPress}
      onStoreSelect={handleStoreSelect}
    />
  );
}
