import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ResourceActionConfig {
  path: string;
  method: HttpMethod;
}

export interface ResourceRequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  context?: HttpContext;
  withCredentials?: boolean;
  reportProgress?: boolean;
}
