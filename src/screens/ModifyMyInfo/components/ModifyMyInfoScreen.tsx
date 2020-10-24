import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';

import { MINT, MINT_RGBA_LINE, MINT_STRONG } from '@base/baseColors';
import { ModifyMyInfoProps } from '@base/types/Navigation/MyPageNavigation';

type ModifyMyInfoScreenProps = {
  navigation: ModifyMyInfoProps['navigation'];
};

export default function ModifyMyInfoScreen({
  navigation,
}: ModifyMyInfoScreenProps) {
  return (
    <Container>
      <MyPageUserInfo>
        <UserAvatar
          source={require('@base/../assets/images/default_user_avatar.jpg')}
        />
        <UserTextWrapper>
          <UserNameText>이혁원</UserNameText>
          <UserInfoText>사장님</UserInfoText>
        </UserTextWrapper>
      </MyPageUserInfo>
      <MyPageUserForm>
        <MyPageUserRow>
          <RowTitle>이메일</RowTitle>
          <RowContent>hw3053919@gmail.com</RowContent>
        </MyPageUserRow>
        <MyPageUserRow>
          <RowTitle>닉네임</RowTitle>
          <RowInput
            value="이혁원"
            onChangeText={(text: string) => console.log(text)}
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
          onPress={() => console.log('회원탈퇴')}
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

const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const UserTextWrapper = styled.View``;

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
