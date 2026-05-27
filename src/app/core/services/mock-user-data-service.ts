// mock-user-data.service.ts
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class MockUserDataService implements InMemoryDbService {
  createDb() {
    const users: IUserDTO[] = [
      {
        id: 1,
        entityId: '',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0101',
        mobile: '+1-555-123-4567',
        nationalCode: 'US-JD-19850101',
        imageId: 101,
        signId: 1001,
        role: 'Admin',
        createdAt: '2024-01-15',
        isActive: true,
      },
      {
        id: 2,
        entityId: '',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0102',
        mobile: '+1-555-234-5678',
        nationalCode: 'US-JS-19880220',
        imageId: 102,
        signId: 1002,
        role: 'User',
        createdAt: '2024-02-20',
        isActive: true,
      },
      {
        id: 3,
        entityId: '',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        phone: '+1-555-0103',
        mobile: '+1-555-345-6789',
        nationalCode: 'US-BJ-19900310',
        imageId: 103,
        signId: 1003,
        role: 'Manager',
        createdAt: '2024-03-10',
        isActive: true,
      },
      {
        id: 4,
        entityId: '',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@example.com',
        phone: '+1-555-0104',
        mobile: '+1-555-456-7890',
        nationalCode: 'US-SW-19950525',
        imageId: 104,
        signId: 1004,
        role: 'User',
        createdAt: '2024-04-05',
        isActive: true,
      },
      {
        id: 5,
        entityId: '',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@example.com',
        phone: '+1-555-0105',
        mobile: '+1-555-567-8901',
        nationalCode: 'US-MB-19871112',
        imageId: 105,
        signId: 1005,
        role: 'Supervisor',
        createdAt: '2024-05-18',
        isActive: true,
      },
    ];
    return { users };
  }
}

// // Example usage
// const db = createDb();
// console.log(db.users);

// // Convert to User model instances
// const userInstances = db.users.map(userData => new User(userData));
// console.log(userInstances[0].getFullName()); // "John Doe"
// console.log(userInstances[0].getContactInfo()); // "Email: john.doe@example.com, Mobile: +1-555-123-4567"
