import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntityApiService extends ApiService {
    constructor(http: HttpClient, entityName: String) {
    super(http, entityName);
  }
}
