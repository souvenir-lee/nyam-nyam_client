import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SignUpAddressScreen from '../components/SignUpAddressScreen';
import useLocation from '@base/hooks/useLocation';
import { SignUpAddressProps } from '@base/types/Navigation/SignUpNavigation';
import { requestSignup, updateLocation } from '@base/modules/signup';
import { RootState } from '@base/modules';
import { SignupInfo } from '@base/types/auth';
import { ErrorMsg, ErrorText } from '@base/styles';
import Loading from '@base/components/loading';
import { ActivityIndicator } from 'react-native'


export default function SignUpAddressContainer({ navigation }: SignUpAddressProps) {
  const dispatch = useDispatch();
  const { email, password, username } = useSelector((state: RootState) => (
    state.signup.userFields))
  const { errMsg, loading } = useSelector((state: RootState) => state.signup);
  const location = useLocation({ navigation });

  const handleRegisterButtonPress = () => {
    const signupInfo: SignupInfo = {
      email,
      password,
      userName: username,
      ...fakeData
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
  console.log('loading: ', loading, 'err Msg:', errMsg);
  return (
    <>
      {loading ? 
        <Loading />
        : 
      <>
        {
          errMsg ? (
            <ErrorMsg>
              <ErrorText>{errMsg}</ErrorText>
            </ErrorMsg>
          ) : null
        }
        <SignUpAddressScreen 
          handleRegisterButtonPress={handleRegisterButtonPress}
        />
      </>
    }     
       
    </>
  )
}

const fakeData = { 
  longitude: 126.993606, 
  latitude: 37.588227, 
  storeName: 'test store',
  storeAddress: 'test address'
};