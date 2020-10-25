import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchScreen from '../components/SearchScreen';
import useInput from '@base/hooks/useInput';
import { SearchProps } from '@base/types/Navigation/SearchNavigation';

export default function SearchContainer({ navigation }: SearchProps) {
  const dispatch = useDispatch();

  const submit = () => {
    // 검색 제출 시 실제로 서버로부터 검색 결과 요청해 store에 저장하는 dispatch 실행
  };

  return <SearchScreen navigation={navigation} />;
}
