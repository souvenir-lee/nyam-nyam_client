import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Initial: undefined;
  Signin: {
    title: string;
  };
  Signup: undefined;
};

export type MainStackParamList = {
  Main: undefined;
};

export type SignupParamList = {
  Signup: undefined;
  SignUpAddress: undefined;
};

export type InitialProps = StackScreenProps<RootStackParamList, 'Initial'>;

export type SigninProps = StackScreenProps<RootStackParamList, 'Signin'>;

export type SignupProps = StackScreenProps<SignupParamList, 'Signup'>;

export type SignupAddressProps = StackScreenProps<
  SignupParamList,
  'SignUpAddress'
>;
