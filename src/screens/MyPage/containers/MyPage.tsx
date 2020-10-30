import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MyPageScreen from '../components/MyPageScreen';
import { MyPageProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules'
import { getMyInfo } from '@base/modules/mypage';
import { signout } from '@base/modules/signin';

export default function MyPageContainer({ navigation }: MyPageProps) {
  const { store, production, upload } = useSelector((state: RootState) => state.mypage);
  const { username, email } = useSelector((state: RootState) => (
    state.signin.user ? state.signin.user : { username: '', email: ''}));
  let myPageInfo = {
    username: username ||'',
    email:  email || '',
    store: store || 0,
    production: production || 0,
    upload: upload || 0
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
  }, []);


  return <MyPageScreen 
    navigation={navigation} 
    myPageInfo={myPageInfo}
    handleSignoutButtonPress={handleSignoutButtonPress}
  />;
}
