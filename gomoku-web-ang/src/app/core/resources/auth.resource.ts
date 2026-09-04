import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiResource} from '../config/api-resource';
import {AuthResponseModel} from '../../models/auth/auth-response.model';
import {LoginRequestModel} from '../../models/auth/login-request.model';
import {RegisterRequestModel} from '../../models/auth/register-request.model';

@Injectable({
	providedIn: 'root',
})
export class AuthResource extends ApiResource {
	public register(request: RegisterRequestModel): Observable<AuthResponseModel> {
		return this.request<AuthResponseModel>(
			{
				method: 'POST',
				path: '/auth/register',
			},
			undefined,
			request,
		);
	}

	public login(request: LoginRequestModel): Observable<AuthResponseModel> {
		return this.request<AuthResponseModel>(
			{
				method: 'POST',
				path: '/auth/login',
			},
			undefined,
			request,
		);
	}
}
