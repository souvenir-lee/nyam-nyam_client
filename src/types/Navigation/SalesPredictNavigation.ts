import { StackScreenProps } from '@react-navigation/stack';

// TODO: 상품 수정 페이지에 대한 Navigation 추가

export type SalesPredictStackParamList = {
  SalesPredict: undefined;
  ItemDetailNav: undefined;
};

export type SalesPredictProps = StackScreenProps<
  SalesPredictStackParamList,
  'SalesPredict'
>;

export type ItemDetailNavProps = StackScreenProps<
  SalesPredictStackParamList,
  'ItemDetailNav'
>;
