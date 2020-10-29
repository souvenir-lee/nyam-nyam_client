import { StackScreenProps } from '@react-navigation/stack';

export type TrendSignatureParamList = {
  TrendSignature: undefined;
  TrendMore: undefined;
  ItemDetailNav: undefined;
};

export type TrendSignatureProps = StackScreenProps<
  TrendSignatureParamList,
  'TrendSignature'
>;

export type TrendMoreProps = StackScreenProps<
  TrendSignatureParamList,
  'TrendMore'
>;

export type ItemDetailNavProps = StackScreenProps<
  TrendSignatureParamList,
  'ItemDetailNav'
>;
