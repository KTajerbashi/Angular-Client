import { Injectable } from '@angular/core';
import { EntityApiService } from '../entity-api-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends EntityApiService {
  /**
   *
   */
  constructor(http: HttpClient) {
    super(http, 'Group');
  }
}
