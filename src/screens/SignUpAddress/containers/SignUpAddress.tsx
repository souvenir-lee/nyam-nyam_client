import React, { useState, useEffect } from 'react';

import SignUpAddressScreen from '../components/SignUpAddressScreen';
import useLocation from '@base/hooks/useLocation';
import { Props } from '@base/types/SignUpNavigation';

export default function SignUpAddressContainer({ navigation }: Props) {
  const location = useLocation({ navigation });
  const [coords, setCoords] = useState({ x: -1, y: -1 });

  useEffect(() => {
    if (location) {
      const {
        coords: { longitude, latitude },
      } = location;
      setCoords({ x: longitude, y: latitude });
    }
  }, [location]);

  return <SignUpAddressScreen coords={coords} />;
}
