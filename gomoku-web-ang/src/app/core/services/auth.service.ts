import {Injectable, signal} from '@angular/core';
import {Observable, tap} from 'rxjs';

import {AuthResponseModel} from '../../models/auth/auth-response.model';
import {LoginRequestModel} from '../../models/auth/login-request.model';
import {RegisterRequestModel} from '../../models/auth/register-request.model';
import {UserModel} from '../../models/user.model';
import {AuthResource} from '../resources/auth.resource';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly TOKEN_KEY = 'accessToken';
	private readonly USER_KEY = 'user';

	readonly user = signal<UserModel | null>(this.getStoredUser());
	readonly isLoggedIn = signal<boolean>(!!localStorage.getItem(this.TOKEN_KEY));

	constructor(private readonly authResource: AuthResource) {}

	public login(request: LoginRequestModel): Observable<AuthResponseModel> {
		return this.authResource.login(request).pipe(tap(response => this.authenticate(response)));
	}

	public register(request: RegisterRequestModel): Observable<AuthResponseModel> {
		return this.authResource.register(request).pipe(tap(response => this.authenticate(response)));
	}

	public logout(): void {
		localStorage.removeItem(this.TOKEN_KEY);
		localStorage.removeItem(this.USER_KEY);

		this.user.set(null);
		this.isLoggedIn.set(false);
	}

	public getToken(): string | null {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	public getUserUuid(): string {
		return this.user()?.uuid ?? '';
	}

	private authenticate(response: AuthResponseModel): void {
		localStorage.setItem(this.TOKEN_KEY, response.accessToken);
		localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));

		this.user.set(response.user);
		this.isLoggedIn.set(true);
	}

	private getStoredUser(): UserModel | null {
		const storedUser = localStorage.getItem(this.USER_KEY);

		if (!storedUser) {
			return null;
		}

		try {
			return JSON.parse(storedUser) as UserModel;
		} catch {
			localStorage.removeItem(this.USER_KEY);
			return null;
		}
	}
}
