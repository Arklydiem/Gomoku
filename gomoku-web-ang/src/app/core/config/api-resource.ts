import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {ResourceActionConfig, ResourceRequestOptions} from './resource-action.config';
import {ResourceHelper} from './resource-helper';

export abstract class ApiResource {
	protected readonly http = inject(HttpClient);

	protected request<T>(action: ResourceActionConfig, pathParams?: Record<string,string | number>, body?: unknown, options?: ResourceRequestOptions): Observable<T> {
		const url = ResourceHelper.buildUrl(environment.apiUrl, action.path, pathParams);

		return this.http.request<T>(action.method, url, {
			body,
			...options,
		});
	}
}
