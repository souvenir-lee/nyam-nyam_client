import { useState, useCallback } from 'react';

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  // change
  const onChange = useCallback((next) => {
    setValue(next);
  }, []);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);
  return [value, onChange, reset];
}

export default useInput;
