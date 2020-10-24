import { StackScreenProps } from '@react-navigation/stack';

export type ItemDetailParamList = {
  ItemDetail: undefined;
  ItemModify: undefined;
};

export type ItemDetailProps = StackScreenProps<
  ItemDetailParamList,
  'ItemDetail'
>;
export type ItemModifyProps = StackScreenProps<
  ItemDetailParamList,
  'ItemModify'
>;
