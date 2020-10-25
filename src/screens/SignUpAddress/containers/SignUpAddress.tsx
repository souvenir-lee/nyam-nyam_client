import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import useLocation from '@base/hooks/useLocation';
import { SignUpAddressProps } from '@base/types/Navigation/SignUpNavigation';
import { requestSignup, updateLocation, cleanUp } from '@base/modules/signup';
import rootReducer, { RootState } from '@base/modules';
import { SignupInfo } from '@base/types/auth';
import { ErrorMsg, ErrorText } from '@base/styles';
import Loading from '@base/components/loading';
import SignUpAddressScreen from '../components/SignUpAddressScreen';

export default function SignUpAddressContainer({
  navigation,
}: SignUpAddressProps) {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.signup.signupSuccess
  );
  const location = useLocation({ navigation });

  const handleRegisterButtonPress = () => {
    dispatch(requestSignup());
  };

  useEffect(() => {
    if (location) {
      const {
        coords: { longitude, latitude },
      } = location;
      dispatch(updateLocation({ x: longitude, y: latitude }));
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (!loading && data) {
      dispatch(cleanUp());
      navigation.goBack();
      navigation.goBack();
    } else if (error) {
      Alert.alert('회원가입에 실패했습니다.');
    }
  }, [loading, data, error]);
  return (
    <SignUpAddressScreen
      handleRegisterButtonPress={handleRegisterButtonPress}
    />
  );
}
