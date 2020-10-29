import { StackScreenProps } from '@react-navigation/stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
// TODO: 상품 수정 페이지에 대한 Navigation 추가

export type TrendStackParamList = {
  TrendTab: undefined;
  SearchNav: undefined;
};

export type TrendTabParamList = {
  TrendAll: undefined;
  TrendSignatureNav: undefined;
};

export type TrendProps = StackScreenProps<TrendStackParamList, 'TrendTab'>;
export type SearchProps = StackScreenProps<TrendStackParamList, 'SearchNav'>;

export type TrendAllProps = MaterialTopTabScreenProps<
  TrendTabParamList,
  'TrendAll'
>;
export type TrendSignatureNavParamList = MaterialTopTabScreenProps<
  TrendTabParamList,
  'TrendSignatureNav'
>;
