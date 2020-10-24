import React from 'react';
import styled from 'styled-components/native';

import { ItemModifyProps as PropsFromItemDetail } from '@base/types/Navigation/ItemDetail';
import { ItemModifyProps as PropsFromMyPage } from '@base/types/Navigation/MyPageNavigation';

type MyMenuListInfoScreen = {
  navigation: PropsFromItemDetail['navigation'] | PropsFromMyPage['navigation'];
};

export default function MyMenuListInfoScreen({
  navigation,
}: MyMenuListInfoScreen) {
  return null;
}
