import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MyPageScreen from '../components/MyPageScreen';
import { MyPageProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules'
import { getMyInfo } from '@base/modules/mypage';
import { signout } from '@base/modules/signin';

export default function MyPageContainer({ navigation }: MyPageProps) {
  const myInfo = useSelector((state: RootState) => state.myInfo);
  const { user } = useSelector((state: RootState) => state.signin);
  let myPageInfo = {
    username: user ? user.username: '',
    email: user ? user.email : '',
    store: 0,
    production: 0,
    uploadSales: 0
  };
  const dispatch = useDispatch();

  const handleSignoutButtonPress = () => {
    dispatch(signout());
  };

  useEffect(() => {
    const fetchMyInfoData = () => {
      dispatch(getMyInfo());
    }

    fetchMyInfoData();
  }, [user]);


  return <MyPageScreen 
    navigation={navigation} 
    myPageInfo={myPageInfo}
    handleSignoutButtonPress={handleSignoutButtonPress}
  />;
}
