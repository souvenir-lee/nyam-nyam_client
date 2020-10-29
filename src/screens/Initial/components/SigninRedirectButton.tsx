import React from 'react';
import { Button } from 'react-native';

type SigninRedirectButtonProps = {
  title: string;
  handlePress: () => void;
};

export default function SigninRedirectButton({
  title,
  handlePress,
}: SigninRedirectButtonProps) {
  return <Button title={title} onPress={handlePress} />;
}
