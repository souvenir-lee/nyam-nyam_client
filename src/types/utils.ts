export type AsyncState<T, E> = {
  data: T | null;
  loading: boolean;
  error: E | null;
};
