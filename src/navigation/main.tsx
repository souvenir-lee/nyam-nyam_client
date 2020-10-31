import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import salesPredict from './salesPredict';
import trend from './trend';
import salesUpload from './salesUpload';
import myPage from './myPage';
import TabBarIcon from '@base/components/TabBarIcon';
import { MainTabParamList } from '@base/types/Navigation/MainNavigation';
import { MINT_STRONG } from '@base/baseColors';

type tabBarIconProps = {
  focused: boolean;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigation = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    console.log(routeName);
    if (routeName === 'ItemDetailNav') {
      return false;
    }

    return true;
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: MINT_STRONG,
        labelStyle: {
          fontSize: 13,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="SalesPredictNav"
        component={salesPredict}
        options={({ route }) => ({
          title: '매출 예측',
          tabBarIcon: ({ focused }: tabBarIconProps) => (
            <TabBarIcon focused={focused} name={'chart-bar'} isCommunity />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      {/* <Tab.Screen
        name="TrendNav"
        component={trend}
        options={{
          title: '트렌드',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={'trending-up'} isCommunity />
          ),
        }}
      /> */}
      <Tab.Screen
        name="SalesUploadNav"
        component={salesUpload}
        options={{
          title: '내역 업로드',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={'upload'} isCommunity />
          ),
        }}
      />
      <Tab.Screen
        name="MyPageNav"
        component={myPage}
        options={{
          title: '마이페이지',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={'person'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
