import {Component, effect, inject, input, signal} from '@angular/core';

import {GameService} from '../../../core/services/game.service';
import {GameModel} from '../../../models/game.model';
import {GameAccessMode} from '../game-hub/game-hub.types';

@Component({
	selector: 'app-game-match',
	imports: [],
	templateUrl: './game-match.html',
	styleUrl: './game-match.scss',
})
export class GameMatch {
	readonly gameUuid = input.required<string>();
	readonly accessMode = input.required<GameAccessMode>();
	readonly game = signal<GameModel | null>;
	readonly loading = signal<boolean>(true);
	readonly errorMessage = signal<string | null>(null);
	private readonly gameService = inject(GameService);

	constructor() {
		effect(onCleanup => {
			const gameUuid = this.gameUuid();

			this.loading.set(true);
			this.errorMessage.set(null);

			const subscription = this.gameService.getGame(gameUuid).subscribe({
				next: (game: GameModel) => {
					this.game.set(game);
					this.loading.set(false);
				},
				error: error => {
					console.error('Failed to load game:', error);
					this.game.set(null);
					this.loading.set(false);
					this.errorMessage.set('Unable to load this game.');
				},
			});

			onCleanup(() => subscription.unsubscribe());
		});
	}

	readonly isSpectator = () => this.accessMode() === 'spectator';
}
