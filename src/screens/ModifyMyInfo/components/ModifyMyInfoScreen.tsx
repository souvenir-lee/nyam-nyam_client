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
  userImg: string | null;
  onPhotoModifyPress: () => void;
  onUsernameChange: (text: string) => void;
  onUnregisterSubmit: () => void;
};

export default function ModifyMyInfoScreen({
  navigation,
  username,
  email,
  userImg,
  onUsernameChange,
  onUnregisterSubmit,
  onPhotoModifyPress,
}: ModifyMyInfoScreenProps) {
  const avatar = userImg
    ? { uri: userImg }
    : require('@base/../assets/images/default_user_avatar.jpg');
  return (
    <Container>
      <MyPageUserInfo>
        <UserAvatarWrapper onPress={onPhotoModifyPress}>
          <UserAvatar source={avatar} />
          <UserAvatarBackground />
          <BackgroundText>사진 수정</BackgroundText>
        </UserAvatarWrapper>
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
        <MyPageUserRow isLast>
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
  padding: 0 30px;
`;

const MyPageUserInfo = styled.View`
  margin: 30px 0;
  align-items: center;
  justify-content: center;
`;

const UserAvatarWrapper = styled.TouchableOpacity`
  position: relative;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const UserAvatarBackground = styled.View`
  position: absolute;
  width: 130px;
  height: 130px;
  background-color: black;
  opacity: 0.4;
  border-radius: 5px;
`;
const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;
const BackgroundText = styled.Text`
  position: absolute;
  color: white;
  font-weight: bold;
  font-size: 20px;
  opacity: 0.9;
`;

const UserTextWrapper = styled.View``;

const UserAvatarModifyButton = styled.TouchableOpacity`
  margin-bottom: 20px;
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
  align-items: center;
  margin-bottom: ${(props) => (props.isLast ? '50px' : 0)};
`;

const RowTitle = styled.Text`
  font-size: 20px;
  margin-right: 30px;
  color: ${MINT_STRONG};
  font-weight: bold;
`;

const RowContent = styled.Text`
  font-size: 18px;
  color: ${MINT_STRONG};
`;

const RowInput = styled.TextInput`
  flex: 1;
  padding: 2%;
  background: white;
  border-bottom-width: 1px;
  border-bottom-color: ${MINT_STRONG};
  font-size: 18px;
  color: ${MINT_STRONG};
`;

const ModifyNavContainer = styled.View`
  padding: 40px;
`;
