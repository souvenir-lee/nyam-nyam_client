import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type MainTabParamList = {
  SalesPredictNav: undefined;
  TrendNav: undefined;
  SalesUploadNav: undefined;
  MyPageNav: undefined;
};

export type SalesPredictNavProps = MaterialTopTabScreenProps<
  MainTabParamList,
  'SalesPredictNav'
>;
export type TrendNavProps = MaterialTopTabScreenProps<
  MainTabParamList,
  'TrendNav'
>;
export type SalesUploadNavProps = MaterialTopTabScreenProps<
  MainTabParamList,
  'SalesUploadNav'
>;
export type MyPageNavProps = MaterialTopTabScreenProps<
  MainTabParamList,
  'MyPageNav'
>;
