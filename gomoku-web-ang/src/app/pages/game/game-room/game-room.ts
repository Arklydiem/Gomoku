import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {finalize} from 'rxjs';

import {AuthService} from '../../../core/services/auth.service';
import {GameService} from '../../../core/services/game.service';
import {GameWebSocketService} from '../../../core/services/game-web-socket.service';
import {BoardModel} from '../../../models/board.model';
import {GameModel} from '../../../models/game.model';
import {PlayerModel} from '../../../models/player.model';
import {BOARD_SIZE} from '../../../shared/constants/game.constants';
import {GameStatusEnum} from '../../../shared/enums/game-status.enum';
import {StoneColorEnum} from '../../../shared/enums/stone-color.enum';
import {EnumFormatPipe} from '../../../shared/pipes/eum-format.pipe';
import {BoardPosition} from '../../../shared/types/board.types';
import {GameBoard} from '../game-board/game-board';
import {GameAccessMode} from '../../../shared/types/game-access-mode.type';
import {GameLobby} from '../game-lobby/game-lobby';

@Component({
	selector: 'app-game-room',
	imports: [GameBoard, GameLobby, EnumFormatPipe],
	templateUrl: './game-room.html',
	styleUrl: './game-room.scss',
})
export class GameRoom {
	readonly gameUuid = input.required<string>();
	readonly accessMode = input.required<GameAccessMode>();
	readonly game = signal<GameModel | null>(null);
	readonly loading = signal<boolean>(true);
	readonly actionLoading = signal<boolean>(false);
	readonly turnLoading = signal<boolean>(false);
	readonly errorMessage = signal<string | null>(null);
	readonly actionErrorMessage = signal<string | null>(null);
	readonly turnErrorMessage = signal<string | null>(null);
	readonly board = computed<BoardModel>(() => this.buildBoard(this.game()));
	readonly isSpectator = computed<boolean>(() => this.accessMode() === 'spectator');
	readonly isCreator = computed<boolean>(() => {
		const game = this.game();

		if (!game || this.isSpectator()) {
			return false;
		}

		if (game.createdByUserUuid === null) {
			return !this.authService.isLoggedIn();
		}

		return game.createdByUserUuid === this.authService.user()?.uuid;
	});
	readonly isLobbyVisible = computed<boolean>(() => {
		const status = this.game()?.status;

		return status === GameStatusEnum.CREATED
			|| status === GameStatusEnum.WAITING
			|| status === GameStatusEnum.READY;
	});
	readonly isBoardVisible = computed<boolean>(() => {
		const status = this.game()?.status;

		return status === GameStatusEnum.IN_PROGRESS
			|| status === GameStatusEnum.BLACK_TO_MOVE
			|| status === GameStatusEnum.WHITE_TO_MOVE
			|| status === GameStatusEnum.BLACK_WINS
			|| status === GameStatusEnum.WHITE_WINS
			|| status === GameStatusEnum.DRAW;
	});
	readonly blackPlayer = computed<PlayerModel | null>(() => this.getPlayer(StoneColorEnum.BLACK));
	readonly whitePlayer = computed<PlayerModel | null>(() => this.getPlayer(StoneColorEnum.WHITE));
	protected readonly GameStatusEnum = GameStatusEnum;
	private readonly authService = inject(AuthService);
	private readonly gameService = inject(GameService);
	private readonly gameWebSocketService = inject(GameWebSocketService);

	constructor() {
		effect(onCleanup => {
			const gameUuid = this.gameUuid();

			this.loading.set(true);
			this.errorMessage.set(null);

			const gameSubscription = this.gameService.getGame(gameUuid).subscribe({
				next: game => {
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

			const socketSubscription = this.gameWebSocketService.connect(gameUuid).subscribe({
				next: event => this.game.set(event.game),
				error: error => console.warn('Game WebSocket disconnected:', error),
			});

			onCleanup(() => {
				gameSubscription.unsubscribe();
				socketSubscription.unsubscribe();
			});
		});
	}

	public changeVisibility(publicGame: boolean): void {
		const game = this.game();

		if (!game || this.actionLoading()) {
			return;
		}

		this.actionLoading.set(true);
		this.actionErrorMessage.set(null);

		this.gameService
			.updateVisibility(game.uuid, publicGame)
			.pipe(finalize(() => this.actionLoading.set(false)))
			.subscribe({
				next: updatedGame => this.game.set(updatedGame),
				error: error => {
					console.error('Failed to update room visibility:', error);
					this.actionErrorMessage.set('Unable to update the room visibility.');
				},
			});
	}

	public startGame(): void {
		const game = this.game();

		if (!game || this.actionLoading()) {
			return;
		}

		this.actionLoading.set(true);
		this.actionErrorMessage.set(null);

		this.gameService
			.startGame(game.uuid)
			.pipe(finalize(() => this.actionLoading.set(false)))
			.subscribe({
				next: updatedGame => this.game.set(updatedGame),
				error: error => {
					console.error('Failed to start game:', error);
					this.actionErrorMessage.set('Unable to start the game.');
				},
			});
	}

	public play(position: BoardPosition): void {
		const game = this.game();

		if (!game
				|| this.isSpectator()
				|| game.status !== GameStatusEnum.IN_PROGRESS
				|| this.turnLoading()) {
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

	private getPlayer(color: StoneColorEnum): PlayerModel | null {
		return this.game()?.players.find(player => player.color === color) ?? null;
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
