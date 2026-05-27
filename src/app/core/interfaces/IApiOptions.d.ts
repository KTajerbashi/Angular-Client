interface IApiOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] };
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  observe?: 'body' | 'events' | 'response';
  reportProgress?: boolean;
  withCredentials?: boolean;
  retryCount?: number;
  timeoutMs?: number;
  showLoader?: boolean;
  showError?: boolean;
}