import { useState, useCallback } from 'react';

function useForm(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const onDelete = useCallback((name) => {
    setForm((form) => {
      delete form[name];
      return form;
    });
  }, []);
  const initialize = useCallback((initialValue) => setForm(initialValue), []);
  return [form, onChange, onDelete, initialize];
}

export default useForm;
