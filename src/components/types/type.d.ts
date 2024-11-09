export interface LEC<T> {
  loading: boolean;
  error?: string;
  data?: T;
}
export type Location = [number, number];
