import { useState, useCallback } from 'react';

function useForm(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useForm;
