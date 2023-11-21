import { Injectable, Signal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface, signInFormInterface, signUpFormInterface } from './user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUserSignal = signal<UserInterface | null | undefined>(undefined);
  // UserInterface = user logged in
  // null = user logged out
  // undefined = don't know yet

  signUpUser(user: signUpFormInterface) {
    return this.http.post<{user: UserInterface}>('https://api.realworld.io/api/users', {user: user});
  }

  signInUser(user: signInFormInterface) {
    return this.http.post<{user: UserInterface}>('https://api.realworld.io/api/users/login', {user: user});
  }

  getUser() {
    return this.http.get<{user: UserInterface}>('https://api.realworld.io/api/user');
  }

  logOutUser() {
    localStorage.removeItem('token');
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/sign-in');
  }
}
