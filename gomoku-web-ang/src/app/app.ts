import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {Header} from './components/header/header';
import {Toast} from './components/toast/toast';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, Header, Toast],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
}
