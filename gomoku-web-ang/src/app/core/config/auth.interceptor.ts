import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';

import {AuthService} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
	const token = inject(AuthService).getToken();

	if (!token
			|| request.url.includes('/auth/login')
			|| request.url.includes('/auth/register')) {
		return next(request);
	}

	return next(request.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`,
		},
	}));
};
