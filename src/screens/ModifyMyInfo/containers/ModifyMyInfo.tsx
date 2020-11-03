import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import { MINT } from '@base/baseColors';
import ModifyMyInfoScreen from '../components/ModifyMyInfoScreen';
import { RootState } from '@base/modules';
import {
  requestUnregister,
  saveMyInfo,
  uploadMyPhoto,
  changeUsername,
} from '@base/modules/mypage';
import { ModifyMyInfoProps } from '@base/types/Navigation/MyPageNavigation';

export default function ModifyMyInfoContainer({
  navigation,
}: ModifyMyInfoProps) {
  const { user } = useSelector((state: RootState) => state.signin);
  const { username } = useSelector((state: RootState) => state.mypage);
  const { email, userImg } = user ? user : { email: '', userImg: null };
  const dispatch = useDispatch();

  const handleUsernameChange = (text: string) => {
    dispatch(changeUsername(text));
  };
  const handleUnregisterRequestPress = () => {
    dispatch(requestUnregister());
  };
  const handleUnregisterSubmit = () => {
    Alert.alert('회원탈퇴', '정말 회원을 탈퇴 하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      { text: '확인', onPress: handleUnregisterRequestPress },
    ]);
  };

  const handlePhotoModifyPress = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log('picked photo:', result);

        if (!result.cancelled) {
          const { type, uri } = result;
          dispatch(uploadMyPhoto(type as 'image', uri));
        }
      } else {
        Alert.alert('사진 라이브러리에 접근이 거부되었습니다.');
      }
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            dispatch(saveMyInfo());
            Alert.alert('닉네임이 변경되었습니다.');
            navigation.goBack();
          }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: MINT }}>
            저장
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ModifyMyInfoScreen
      navigation={navigation}
      userImg={userImg}
      username={username}
      email={email}
      onPhotoModifyPress={handlePhotoModifyPress}
      onUsernameChange={handleUsernameChange}
      onUnregisterSubmit={handleUnregisterSubmit}
    />
  );
}
