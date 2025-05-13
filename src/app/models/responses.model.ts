export interface IResponse<T> {
  code: number;
  message: string;
  data?: T;
  error?: {
    code: number;
    errorMessage: string;
  };
}
