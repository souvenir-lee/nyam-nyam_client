import React from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { SearchNavParamList } from '../types/Navigation/SearchNavigation';
import { MINT } from '@base/baseColors';
import SearchHeader from '@base/components/SearchHeader';
import Search from '@base/screens/Search';
import ItemDetail from './ItemDetail';

const SearchStack = createStackNavigator<SearchNavParamList>();

export default function SearchStackNavigation() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '',
          headerBackTitleVisible: false,
          headerRight: () => <SearchHeader />,
          headerLeftContainerStyle: {
            width: 50,
          },
          headerRightContainerStyle: {
            width: '90%',
          },
        }}
      />
      <SearchStack.Screen name="ItemDetailNav" component={ItemDetail} />
    </SearchStack.Navigator>
  );
}
