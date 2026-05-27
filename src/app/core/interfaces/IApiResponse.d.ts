interface IApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: HttpHeaders;
  success: boolean;
  message?: string;
}
