import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { MINT } from '@base/baseColors';
import ModifyMyInfoScreen from '../components/ModifyMyInfoScreen';
import { RootState } from '@base/modules';
import { requestUnregister, saveMyInfo, uploadMyPhoto } from '@base/modules/mypage';
import { ModifyMyInfoProps } from '@base/types/Navigation/MyPageNavigation';

export default function ModifyMyInfoContainer({
  navigation,
}: ModifyMyInfoProps) {
  const { user } = useSelector((state: RootState) => state.signin);
  const username = useSelector((state: RootState) => state.signin.user 
    ? state.signin.user.username : '');
  const { email, userImg } = user ? user : { email: '', userImg: null };
  const [ _username, setUsername ] = useState(username)
  const dispatch = useDispatch();

  const handleUsernameChange = (text: string) => {
    console.log('username:', _username, username);

    setUsername(text);
  };
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
    setUsername((state:any) => {
      dispatch(saveMyInfo(state));
      return state;
    });
  };

  const handlePhotoModifyPress = async () => {
    if(Platform.OS !== 'web'){
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if(status === 'granted'){
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowEditing: true,
          aspect: [4, 3],
          quality: 1
        });

        console.log('picked photo:', result);

        if(!result.cancelled){
          const { type, uri } = result;
          dispatch(uploadMyPhoto(type as 'image', uri))
        }
      } else {
        Alert.alert('사진 라이브러리에 접근이 거부되었습니다.');
      }
    }
  }

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
    userImg={userImg}
    username={_username}
    email={email}
    onPhotoModifyPress={handlePhotoModifyPress}
    onUsernameChange={handleUsernameChange}
    onUnregisterSubmit={handleUnregisterSubmit}
  />;
}
