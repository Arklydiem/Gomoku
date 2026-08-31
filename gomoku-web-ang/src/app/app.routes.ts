import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Game } from './pages/game/game';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'game',
    component: Game,
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
