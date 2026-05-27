import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntityApiService } from '../../../core/services/entity-api-service';
import { UserService } from '../../../core/services/security/user-service';

@Component({
  selector: 'app-services',
  imports: [FormsModule, CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  userService = inject(UserService);
  model = signal<IUserDTO>(<IUserDTO>{});

  datasource = signal<IUserDTO[]>([]);
  isEditing = signal<boolean>(false);
  selectedUserId = signal<number>(0);

  constructor() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.userService.onGet<IUserDTO[]>().subscribe({
      next: (res) => {
        console.log('Users loaded:', res);
        this.datasource.set(res);
      },
      error: (err) => {
        console.error('Error loading users:', err);
        alert('Failed to load users');
      },
    });
  }

  public onGet() {
    this.loadAllUsers();
  }

  public onGetById() {
    const userId = prompt('Enter User ID:');
    if (userId && !isNaN(Number(userId))) {
      this.userService.onGet<IUserDTO>('', { id: Number(userId) }).subscribe({
        next: (res) => {
          console.log('User found:', res);
          this.model.set(res);
          alert(`User found: ${res.firstName} ${res.lastName}`);
        },
        error: (err) => {
          console.error('Error finding user:', err);
          alert('User not found');
        },
      });
    }
  }

  public onPost() {
    if (!this.validateForm()) return;

    const command: IUserCreateCommand = {
      firstName: this.model().firstName,
      lastName: this.model().lastName,
      email: this.model().email,
      phone: this.model().phone,
      mobile: this.model().mobile,
      nationalCode: this.model().nationalCode,
      imageId: this.model().imageId || 10,
      signId: this.model().signId || 11,
      id: 0,
      entityId: null,
    };

    this.userService.onPost<IUserCreateCommand, IUserDTO>('', command).subscribe({
      next: (res) => {
        console.log('User created:', res);
        alert('User created successfully');
        this.loadAllUsers();
        this.clearForm();
      },
      error: (err) => {
        console.error('Error creating user:', err);
        alert('Failed to create user');
      },
    });
  }

  public onPut() {
    if (!this.validateForm()) return;

    if (this.model().id === 0) {
      alert('Please select a user to update');
      return;
    }

    const command: IUserUpdateCommand = {
      firstName: this.model().firstName,
      lastName: this.model().lastName,
      email: this.model().email,
      phone: this.model().phone,
      mobile: this.model().mobile,
      nationalCode: this.model().nationalCode,
      imageId: this.model().imageId,
      signId: this.model().signId,
      id: this.model().id,
      entityId: this.model().entityId || '',
    };

    this.userService.onPut<IUserUpdateCommand, IUserDTO>('', command.id, command).subscribe({
      next: (res) => {
        console.log('User updated:', res);
        alert('User updated successfully');
        this.loadAllUsers();
        this.clearForm();
        this.isEditing.set(false);
      },
      error: (err) => {
        console.error('Error updating user:', err);
        alert('Failed to update user');
      },
    });
  }

  public onDelete() {
    if (this.model().id === 0) {
      alert('Please select a user to delete');
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete user ${this.model().firstName} ${this.model().lastName}?`,
      )
    ) {
      const command: IUserDeleteCommand = {
        id: this.model().id,
        entityId: this.model().entityId || null,
      };

      this.userService.OnDelete<boolean>('', command.id).subscribe({
        next: (res) => {
          console.log('User deleted:', res);
          alert('User deleted successfully');
          this.loadAllUsers();
          this.clearForm();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user');
        },
      });
    }
  }

  editUser(user: IUserDTO) {
    this.model.set({ ...user });
    this.isEditing.set(true);
    this.selectedUserId.set(user.id);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      const command: IUserDeleteCommand = {
        id: userId,
        entityId: null,
      };

      this.userService.OnDelete<boolean>('', command.id).subscribe({
        next: (res) => {
          console.log('User deleted:', res);
          alert('User deleted successfully');
          this.loadAllUsers();
          if (this.model().id === userId) {
            this.clearForm();
          }
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user');
        },
      });
    }
  }

  saveUser() {
    if (this.isEditing()) {
      this.onPut();
    } else {
      this.onPost();
    }
  }

  clearForm() {
    this.model.set(<IUserDTO>{});
    this.isEditing.set(false);
    this.selectedUserId.set(0);
  }

  validateForm(): boolean {
    const currentModel = this.model();
    if (
      !currentModel.firstName ||
      !currentModel.lastName ||
      !currentModel.email ||
      !currentModel.mobile ||
      !currentModel.nationalCode
    ) {
      alert('Please fill all required fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentModel.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    return true;
  }
}
