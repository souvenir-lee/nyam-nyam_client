import { StackScreenProps } from '@react-navigation/stack';

export type MyPageNavParamList = {
  MyPage: undefined;
  ModifyMyInfo: undefined;
  MyMenuListInfo: undefined;
  MyStoreListInfo: undefined;
  AddStore: undefined;
  AddMenu: undefined;
  ItemModify: undefined;
  ChangePassword: undefined;
};

export type MyPageProps = StackScreenProps<MyPageNavParamList, 'MyPage'>;
export type ModifyMyInfoProps = StackScreenProps<
  MyPageNavParamList,
  'ModifyMyInfo'
>;
export type MyMenuListInfoProps = StackScreenProps<
  MyPageNavParamList,
  'MyMenuListInfo'
>;
export type MyStoreListInfoProps = StackScreenProps<
  MyPageNavParamList,
  'MyStoreListInfo'
>;
export type AddStoreProps = StackScreenProps<MyPageNavParamList, 'AddStore'>;
export type AddMenuProps = StackScreenProps<MyPageNavParamList, 'AddMenu'>;
export type ItemModifyProps = StackScreenProps<
  MyPageNavParamList,
  'ItemModify'
>;
export type ChangePasswordProps = StackScreenProps<
  MyPageNavParamList,
  'ChangePassword'
>;
