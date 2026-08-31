import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'accessToken';

  readonly isLoggedIn = signal(
    !!localStorage.getItem(this.TOKEN_KEY)
  );

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isLoggedIn.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn.set(false);
  }
}
