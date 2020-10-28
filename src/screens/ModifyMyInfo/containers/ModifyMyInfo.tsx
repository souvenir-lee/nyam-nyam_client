import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { MINT } from '@base/baseColors';
import ModifyMyInfoScreen from '../components/ModifyMyInfoScreen';
import { RootState } from '@base/modules';
import { requestUnregister, saveMyInfo } from '@base/modules/mypage';
import { ModifyMyInfoProps } from '@base/types/Navigation/MyPageNavigation';

export default function ModifyMyInfoContainer({
  navigation,
}: ModifyMyInfoProps) {
  const { user } = useSelector((state: RootState) => state.signin);
  const { username, email } = user ? user : { username: '', email: '' };
  const [ _username, setUsername ] = useState(username)
  const dispatch = useDispatch();

  const handleUsernameChange = (text: string) => setUsername(text);
  const handleUnregisterRequestPress = () => {
    dispatch(requestUnregister());
  };
  const handleUnregisterSubmit = () => {
    Alert.alert(
      "회원탈퇴",
      "정말 회원을 탈퇴 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        { text: "확인", onPress: handleUnregisterRequestPress}
      ]
    )
  };
  const handleMyInfoSavePress = () => {
    dispatch(saveMyInfo({ username }))
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={handleMyInfoSavePress}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: MINT }}>
            저장
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <ModifyMyInfoScreen 
    navigation={navigation}
    username={_username}
    email={email}
    onUsernameChange={handleUsernameChange}
    onUnregisterSubmit={handleUnregisterSubmit}
  />;
}
