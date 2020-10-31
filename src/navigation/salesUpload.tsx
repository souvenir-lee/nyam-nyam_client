import React from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { MINT } from '@base/baseColors';
import SalesUpload from '@base/screens/SalesUpload';

const SalesUploadStack = createStackNavigator();

export default function SalesUploadStackNavigation() {
  return (
    <SalesUploadStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 0,
        },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <SalesUploadStack.Screen
        name="SalesUpload"
        component={SalesUpload}
        options={{
          headerShown: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor={MINT}
              pressColorAndroid={MINT}
            />
          ),
          headerTitle: '내역 업로드',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            width: 50,
          },
          headerTitleStyle: {
            color: MINT,
            fontSize: 22,
            fontFamily: 'BMHANNA',
          },
        }}
      />
    </SalesUploadStack.Navigator>
  );
}
