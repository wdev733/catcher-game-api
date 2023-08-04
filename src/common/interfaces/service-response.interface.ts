export interface IServiceResponse<T> {
  success: boolean;
  error?: Error;
  result?: T;
}
