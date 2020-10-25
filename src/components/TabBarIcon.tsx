import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const ACTIVE_COLOR = 'black';
const INACTIVE_COLOR = '#ecf0f1';

type TabBarIconProps = {
  name: string;
  focused: boolean;
  isCommunity?: boolean;
};

function TabBarIcon({ name, focused, isCommunity }: TabBarIconProps) {
  if (isCommunity) {
    return (
      <MaterialCommunityIcons
        size={26}
        name={name}
        color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
      />
    );
  } else {
    return (
      <MaterialIcons
        size={26}
        name={name}
        color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
      />
    );
  }
}

export default TabBarIcon;
