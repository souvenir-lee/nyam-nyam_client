import { StackScreenProps } from '@react-navigation/stack';

export type SearchNavParamList = {
  Search: undefined;
  ItemDetailNav: undefined;
};

export type SearchProps = StackScreenProps<SearchNavParamList, 'Search'>;

export type ItemDetailNavProps = StackScreenProps<
  SearchNavParamList,
  'ItemDetailNav'
>;
