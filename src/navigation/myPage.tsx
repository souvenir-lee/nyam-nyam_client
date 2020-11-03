import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderBackButton,
} from '@react-navigation/stack';

import MyPage from '@base/screens/MyPage';
import ModifyMyInfo from '@base/screens/ModifyMyInfo';
import MyMenuListInfo from '@base/screens/MyMenuListInfo';
import MyStoreListInfo from '@base/screens/MyStoreListInfo';
import AddStore from '@base/screens/AddStore';
import AddMenu from '@base/screens/AddMenu';
import ItemModify from '@base/screens/ItemModify';
import ChangePassword from '@base/screens/ChangePassword';
import { MINT, MINT_RGBA_LINE } from '@base/baseColors';
import { MyPageNavParamList } from '@base/types/Navigation/MyPageNavigation';

const MyPageStack = createStackNavigator<MyPageNavParamList>();

export default function MyPageNavigation() {
  return (
    <MyPageStack.Navigator
      screenOptions={{
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 0,
          height: 70,
        },
        headerStatusBarHeight: 0,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <MyPageStack.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
      <MyPageStack.Screen
        name="ModifyMyInfo"
        component={ModifyMyInfo}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '내 정보 수정',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: MINT,
            fontSize: 22,
            fontFamily: 'BMHANNA',
          },
          headerBackTitleVisible: false,
        }}
      />
      <MyPageStack.Screen
        name="MyMenuListInfo"
        component={MyMenuListInfo}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '',
        }}
      />
      <MyPageStack.Screen
        name="MyStoreListInfo"
        component={MyStoreListInfo}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '',
        }}
      />
      <MyPageStack.Screen
        name="AddStore"
        component={AddStore}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '내 가게 추가',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: MINT,
            fontSize: 22,
            fontFamily: 'BMHANNA',
          },
          headerBackTitleVisible: false,
        }}
      />
      <MyPageStack.Screen
        name="AddMenu"
        component={AddMenu}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '가게 추가',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: MINT,
            fontSize: 22,
            fontFamily: 'BMHANNA',
          },
          headerBackTitleVisible: false,
        }}
      />
      <MyPageStack.Screen
        name="ItemModify"
        component={ItemModify}
        options={{ headerShown: false }}
      />
      <MyPageStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
    </MyPageStack.Navigator>
  );
}
