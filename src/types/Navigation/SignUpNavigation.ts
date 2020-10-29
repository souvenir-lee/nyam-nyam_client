import { StackScreenProps } from '@react-navigation/stack';

export type SignUpParamList = {
  SignUp: undefined;
  SignUpAddress: undefined;
};

export type SignUpProps = StackScreenProps<SignUpParamList, 'SignUp'>;

export type SignUpAddressProps = StackScreenProps<
  SignUpParamList,
  'SignUpAddress'
>;
