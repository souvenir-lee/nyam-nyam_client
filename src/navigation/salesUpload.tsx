import React from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearData } from '@base/modules/salesUpload';
import { MINT } from '@base/baseColors';
import SalesUpload from '@base/screens/SalesUpload';

const SalesUploadStack = createStackNavigator();

export default function SalesUploadStackNavigation({ navigation }) {
  const dispatch = useDispatch();
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
              onPress={() => {
                dispatch(clearData());
                navigation.goBack();
              }}
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
          headerRight: (props) => (
            <TouchableOpacity
              onPress={() => dispatch(clearData())}
              style={{ marginRight: 10 }}>
              <Text style={{ color: MINT, fontSize: 15, fontWeight: 'bold' }}>
                초기화
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </SalesUploadStack.Navigator>
  );
}
