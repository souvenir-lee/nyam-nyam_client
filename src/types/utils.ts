export type AsyncState<T, E = any> = {
  data: T;
  loading: boolean;
  error: E;
};
