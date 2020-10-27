import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MyPageScreen from '../components/MyPageScreen';
import { MyPageProps } from '@base/types/Navigation/MyPageNavigation';
import { RootState } from '@base/modules'
import { getMyInfo } from '@base/modules/mypage';

export default function MyPageContainer({ navigation }: MyPageProps) {
  const myInfo = useSelector((state: RootState) => state.myInfo);
  const user = useSelector((state: RootState) => state.signin.user);
  let myPageInfo = {
    username: '',
    email: '',
    store: 0,
    production: 0,
    uploadSales: 0
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);
  
  useEffect(() => {
    const updateMyPageData = () => {
      if(user){
        const { username, email } = user;
  
        myPageInfo = {
          ...myInfo,
          username,
          email
        };
      }
    }

    updateMyPageData();
  }, [user, myInfo]);

  return <MyPageScreen 
    navigation={navigation} 
    myPageInfo={myPageInfo}
  />;
}
