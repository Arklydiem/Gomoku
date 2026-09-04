import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
	selector: 'app-game',
	imports: [RouterOutlet],
	templateUrl: './game.html',
	styleUrl: './game.scss',
})
export class Game {}
