import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MyMenuListInfoScreen from '../components/MyMenuListInfoScreen';
import  { MyMenuItemType } from '../components/MyMenuItem';
import { RootState } from '@base/modules';
import { MyMenuListInfoProps } from '@base/types/Navigation/MyPageNavigation';

type MapMyStoreToArray = (menus: any) => MyMenuItemType[] | null;

export default function({
  navigation,
}: MyMenuListInfoProps) {
  let menus = useSelector((state: RootState) => {});
  
  const mapMyStoresToArray = (menus: any) => {
    if(!menus) return null;

    let arr = [];
    for(let store in menus){
      arr.push(store);
    }

    return arr;
  };

  return (
    null
    //<MyMenuListInfoScreen
    //  //menus={mapMyStoresToArray(menus) as MyMenuItem[] | null}  
    ///>
  ) 
}

