import { inject, Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, finalize, map, Observable, retry, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  baseUri: string = 'http://localhost:42301';
  constructor(
    private http: HttpClient,
    entityName: String,
  ) {
    super();
    this.baseUri = `${this.baseUri}/${entityName.toLowerCase()}`;
  }
  readController() {
    return this.baseUri;
  }
  // ---------- GET ----------
  onGet<TResponse>(action: string = '', params?: Record<string, any>): Observable<TResponse> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<TResponse>(`${this.baseUri}/${action}`, {
      params: httpParams,
    });
  }

  // ---------- POST ----------
  onPost<TRequest, TResponse>(action: string, body: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.baseUri}/${action}`, body);
  }

  // ---------- PUT ----------
  onPut<TRequest, TResponse>(
    action: string,
    id: number,
    body: TRequest | IBaseCommand,
  ): Observable<TResponse> {
    action = action.length > 0 ? `/${action}/${id}` : `/${id}`;
    return this.http.put<TResponse>(`${this.baseUri}${action}`, body);
  }

  // ---------- DELETE ----------
  // OnDelete<TResponse>(action: string, params?: Record<string, any>): Observable<TResponse> {
  OnDelete<TResponse>(action: string, id: number): Observable<TResponse> {
    let httpParams = new HttpParams();

    // if (params) {
    //   Object.keys(params).forEach((key) => {
    //     httpParams = httpParams.append(key, params[key]);
    //   });
    // }
    action = action.length > 0 ? `/${action}` : `/${id}`;
    return this.http.delete<TResponse>(`${this.baseUri}${action}`, {
      params: httpParams,
    });
  }
}
