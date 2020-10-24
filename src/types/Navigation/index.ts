import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Initial: {
    name: string;
  };
  SignIn: {
    title: string;
    signInType: 'customer' | 'store';
  };
  SignUpNav: undefined;
  MainNav: undefined;
};

export type InitialProps = StackScreenProps<RootStackParamList, 'Initial'>;

export type SignInProps = StackScreenProps<RootStackParamList, 'SignIn'>;
