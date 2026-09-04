import {Injectable, signal} from '@angular/core';
import {Observable, tap} from 'rxjs';

import {AuthResource} from '../resources/auth.resource';
import {AuthResponseModel} from '../../models/auth/auth-response.model';
import {LoginRequestModel} from '../../models/auth/login-request.model';
import {RegisterRequestModel} from '../../models/auth/register-request.model';
import {UserModel} from '../../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	readonly user = signal<UserModel | null>(null);
	private readonly TOKEN_KEY = 'accessToken';
	readonly isLoggedIn = signal(!!localStorage.getItem(this.TOKEN_KEY));

	constructor(private readonly authResource: AuthResource) {
	}

	public login(request: LoginRequestModel): Observable<AuthResponseModel> {
		return this.authResource.login(request).pipe(tap(response => this.authenticate(response)));
	}

	public register(request: RegisterRequestModel): Observable<AuthResponseModel> {
		return this.authResource.register(request).pipe(tap(response => this.authenticate(response)));
	}

	public logout(): void {
		localStorage.removeItem(this.TOKEN_KEY);

		this.user.set(null);
		this.isLoggedIn.set(false);
	}

	public getToken(): string | null {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	public getUserUuid(): string {
		const user = this.user();

		if (!user) {
			return '';
		}
		
		console.log(user);

		return user.uuid;
	}

	private authenticate(response: AuthResponseModel): void {
		localStorage.setItem(this.TOKEN_KEY, response.accessToken);

		this.user.set(response.user);
		this.isLoggedIn.set(true);
	}
}
