import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';

import { MINT, MINT_RGBA_LINE, MINT_STRONG } from '@base/baseColors';
import { ModifyMyInfoProps } from '@base/types/Navigation/MyPageNavigation';

type ModifyMyInfoScreenProps = {
  navigation: ModifyMyInfoProps['navigation'];
  username: string;
  email: string;
  avatar: string | null;
  onPhotoModifyPress: () => void;
  onUsernameChange: (text: string) => void;
  onUnregisterSubmit: () => void;
};

export default function ModifyMyInfoScreen({
  navigation, username, email, avatar, onUsernameChange, onUnregisterSubmit, onPhotoModifyPress
}: ModifyMyInfoScreenProps) {
  const avatarImg = { uri: avatar } || require('@base/../assets/images/default_user_avatar.jpg')
  return (
    <Container>
      <MyPageUserInfo>
         <UserAvatar
            source={avatarImg}
          />
          <UserAvatarModifyButton>
            <ButtonText
              onPress={onPhotoModifyPress}
            >
              사진 수정
            </ButtonText>
          </UserAvatarModifyButton>
        <UserTextWrapper>
          <UserNameText>{username}</UserNameText>
          <UserInfoText>사장님</UserInfoText>
        </UserTextWrapper>
      </MyPageUserInfo>
      <MyPageUserForm>
        <MyPageUserRow>
          <RowTitle>이메일</RowTitle>
          <RowContent>{email}</RowContent>
        </MyPageUserRow>
        <MyPageUserRow>
          <RowTitle>닉네임</RowTitle>
          <RowInput
            defaultValue={username}
            onChangeText={onUsernameChange}
            onSubmitEditing={() => console.log('submit')}
          />
        </MyPageUserRow>
        <Button
          title="비밀번호 변경"
          type="outline"
          containerStyle={{ marginBottom: 20 }}
          titleStyle={{ color: MINT_STRONG, fontSize: 20, fontWeight: 'bold' }}
          buttonStyle={{ borderColor: MINT, borderWidth: 2 }}
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <Button
          title="회원탈퇴"
          type="outline"
          titleStyle={{ color: MINT_STRONG, fontSize: 20, fontWeight: 'bold' }}
          containerStyle={{ marginBottom: 20 }}
          buttonStyle={{ borderColor: MINT, borderWidth: 2 }}
          onPress={onUnregisterSubmit}
        />
      </MyPageUserForm>
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: white;
`;

const MyPageUserInfo = styled.View`
  margin: 30px 0;
  align-items: center;
  justify-content: center;
`;

const UserAvatarWrapper = styled.View`
`;

const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const UserTextWrapper = styled.View``;

const UserAvatarModifyButton = styled.TouchableOpacity`
  margin-bottom:20px;
`;

const ButtonText = styled.Text`
  color: blue;
`;

const UserNameText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  font-family: 'BMHANNA';
  color: ${MINT_STRONG};
  text-align: center;
`;

const UserInfoText = styled.Text`
  font-size: 15px;
  font-family: 'BMHANNA';
  color: ${MINT};
  text-align: center;
`;

const MyPageUserForm = styled.View`
  flex: 1;
`;

const MyPageUserRow = styled.View`
  flex-direction: row;
  padding: 0 30px;
  align-items: center;
`;

const RowTitle = styled.Text`
  margin-right: 30px;
`;

const RowContent = styled.Text``;

const RowInput = styled.TextInput`
  flex: 1;
  padding: 3%;
  background: white;
  border-bottom-width: 1px;
  border-bottom-color: black;
  font-size: 15px;
`;

const ModifyNavContainer = styled.View`
  padding: 40px;
`;
