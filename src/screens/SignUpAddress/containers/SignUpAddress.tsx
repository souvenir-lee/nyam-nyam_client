import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SignUpAddressScreen from '../components/SignUpAddressScreen';
import useLocation from '@base/hooks/useLocation';
import { clearAddressdata } from '@base/modules/signup';
import { SignUpAddressProps } from '@base/types/Navigation/SignUpNavigation';
import { requestSignup, updateLocation } from '@base/modules/signup';
import { RootState } from '@base/modules';
import { SignupInfo } from '@base/types/auth';
import { ErrorMsg, ErrorText } from '@base/styles';
import Loading from '@base/components/loading';

export default function SignUpAddressContainer({
  navigation,
}: SignUpAddressProps) {
  const dispatch = useDispatch();
  const { email, password, username } = useSelector(
    (state: RootState) => state.signup.userFields
  );
  const { picked_address } = useSelector((state: RootState) => state.signup);
  const { errMsg, loading } = useSelector((state: RootState) => state.signup);
  const location = useLocation({ navigation });

  const handleRegisterButtonPress = () => {
    if (Object.keys(picked_address.data).length === 0) {
      Alert.alert('가게를 하나 이상 등록해야 합니다.');
      return;
    }
    const signupInfo: SignupInfo = {
      email,
      password,
      username,
    };
    dispatch(requestSignup(signupInfo));
  };

  useEffect(() => {
    if (location) {
      const {
        coords: { longitude, latitude },
      } = location;
      if (location) {
        dispatch(updateLocation({ x: longitude, y: latitude }));
      }
    }
  }, [location, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearAddressdata());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {errMsg ? (
            <ErrorMsg>
              <ErrorText>{errMsg}</ErrorText>
            </ErrorMsg>
          ) : null}
          <SignUpAddressScreen
            handleRegisterButtonPress={handleRegisterButtonPress}
          />
        </>
      )}
    </>
  );
}
