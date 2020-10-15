import { StackNavigationProp } from '@react-navigation/stack';

export type SignUpStackParamList = {
  SignUpAddress: undefined;
};

export type NavigationProps = StackNavigationProp<
  SignUpStackParamList,
  'SignUpAddress'
>;

export type Props = {
  navigation: NavigationProps;
};
