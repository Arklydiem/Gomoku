import {Routes} from '@angular/router';

import {Home} from './pages/home/home';
import {Game} from './pages/game/game';
import {Login} from './pages/auth/login/login';
import {Register} from './pages/auth/register/register';

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
  },

  /*
  {
    path: 'scoreboard',
    component: Scoreboard,
    data: {
      pageOrder: 2,
    },
  },
  */

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
