import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {finalize} from 'rxjs';

import {GameService} from '../../../core/services/game.service';
import {BoardModel} from '../../../models/board.model';
import {GameModel} from '../../../models/game.model';
import {BOARD_SIZE} from '../../../shared/constants/game.constants';
import {StoneColorEnum} from '../../../shared/enums/stone-color.enum';
import {BoardPosition} from '../../../shared/types/board.types';
import {GameAccessMode} from '../game-hub/game-hub.types';
import {GameBoard} from './game-board/game-board';

@Component({
	selector: 'app-game-match',
	imports: [GameBoard],
	templateUrl: './game-match.html',
	styleUrl: './game-match.scss',
})
export class GameMatch {
	readonly gameUuid = input.required<string>();
	readonly accessMode = input.required<GameAccessMode>();
	readonly game = signal<GameModel | null>(null);
	readonly loading = signal<boolean>(true);
	readonly turnLoading = signal<boolean>(false);
	readonly errorMessage = signal<string | null>(null);
	readonly turnErrorMessage = signal<string | null>(null);
	readonly board = computed<BoardModel>(() => this.buildBoard(this.game()));
	readonly isSpectator = () => this.accessMode() === 'spectator';
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

	public play(position: BoardPosition): void {
		const game = this.game();

		if (!game || this.isSpectator() || this.turnLoading()) {
			return;
		}

		this.turnLoading.set(true);
		this.turnErrorMessage.set(null);

		this.gameService
			.createTurn(game.uuid, position)
			.pipe(finalize(() => this.turnLoading.set(false)))
			.subscribe({
				next: updatedGame => this.game.set(updatedGame),
				error: error => {
					console.error('Failed to play turn:', error);
					this.turnErrorMessage.set('Unable to play this turn.');
				},
			});
	}

	private buildBoard(game: GameModel | null): BoardModel {
		const grid: (StoneColorEnum | null)[][] = Array.from(
			{length: BOARD_SIZE},
			() => Array<StoneColorEnum | null>(BOARD_SIZE).fill(null),
		);

		if (!game) {
			return {grid};
		}

		for (const turn of game.turns) {
			if (!turn.playedMove) {
				continue;
			}

			const {x, y} = turn.playedMove;

			if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) {
				continue;
			}

			grid[y][x] = turn.color;
		}

		return {grid};
	}
}
