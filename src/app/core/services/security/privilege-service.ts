import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityApiService } from '../entity-api-service';

@Injectable({
  providedIn: 'root',
})
export class PrivilegeService extends EntityApiService {
  /**
   *
   */
  constructor(http: HttpClient) {
    super(http, 'Privilege');
  }
}
