import { inject, Injectable } from '@angular/core';
import { MockUserDataService } from './mock-user-data-service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected database = inject(MockUserDataService);
  constructor() {
  }
}
