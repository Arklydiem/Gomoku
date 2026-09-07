import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import {ActivatedRouteSnapshot, provideRouter, withComponentInputBinding, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {authInterceptor} from './core/config/auth.interceptor';

function getPageOrder(snapshot: ActivatedRouteSnapshot): number | null {
	let route: ActivatedRouteSnapshot | null = snapshot;

	while (route) {
		const pageOrder = route.data['pageOrder'];

		if (typeof pageOrder === 'number') {
			return pageOrder;
		}

		route = route.firstChild;
	}

	return null;
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideHttpClient(withInterceptors([authInterceptor])),

		provideRouter(
			routes,

			withComponentInputBinding(),

			withViewTransitions({
				skipInitialTransition: true,

				onViewTransitionCreated: ({transition, from, to}) => {
					const fromOrder = getPageOrder(from);

					const toOrder = getPageOrder(to);

					if (fromOrder === null || toOrder === null || fromOrder === toOrder) {
						transition.skipTransition();

						return;
					}

					transition.types.add(toOrder > fromOrder ? 'forward' : 'backward');
				},
			}),
		),
	],
};
