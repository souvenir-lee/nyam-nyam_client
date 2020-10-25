import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { MINT } from '@base/baseColors';
import ModifyMyInfoScreen from '../components/ModifyMyInfoScreen';
import { RootState } from '@base/modules';
import { ModifyMyInfoProps } from '@base/types/Navigation/MyPageNavigation';

export default function ModifyMyInfoContainer({
  navigation,
}: ModifyMyInfoProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => console.log('저장')}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: MINT }}>
            저장
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <ModifyMyInfoScreen navigation={navigation} />;
}
