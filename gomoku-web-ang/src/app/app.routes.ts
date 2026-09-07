import {Routes} from '@angular/router';

import {Login} from './pages/auth/login/login';
import {Register} from './pages/auth/register/register';
import {GameHub} from './pages/game/game-hub/game-hub';
import {GameLayout} from './pages/game/game-layout/game-layout';
import {GameRoom} from './pages/game/game-room/game-room';
import {Home} from './pages/home/home';

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
		component: GameLayout,
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
				component: GameRoom,
				data: {
					accessMode: 'spectator',
				},
			},
			{
				path: ':gameUuid',
				component: GameRoom,
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
