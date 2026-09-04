import {Routes} from '@angular/router';

import {Home} from './pages/home/home';

import {Login} from './pages/auth/login/login';
import {Register} from './pages/auth/register/register';

import {Game} from './pages/game/game';
import {GameHub} from './pages/game/game-hub/game-hub';
import {GameMatch} from './pages/game/game-match/game-match';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},

	{
		path: 'home',
		component: Home,
		data: {
			pageOrder: 0,
		},
	},

	{
		path: 'game',
		component: Game,
		data: {
			pageOrder: 1,
		},

		children: [
			{
				path: '',
				redirectTo: 'create',
				pathMatch: 'full',
			},

			{
				path: ':mode',
				component: GameHub,

				canMatch: [(_route, segments) => segments.length === 1 && ['create', 'join', 'spectate'].includes(segments[0]?.path ?? '')],
			},

			{
				path: ':gameUuid/spectate',
				component: GameMatch,

				data: {
					accessMode: 'spectator',
				},
			},

			{
				path: ':gameUuid',
				component: GameMatch,

				data: {
					accessMode: 'player',
				},
			},
		],
	},

	{
		path: 'auth',

		children: [
			{
				path: 'login',
				component: Login,
			},

			{
				path: 'register',
				component: Register,
			},
		],
	},

	{
		path: '**',
		redirectTo: 'home',
	},
];
