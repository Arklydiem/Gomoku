import {Component, effect, inject, input, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {finalize} from 'rxjs';

import {Icon} from '../../../components/icon/icon';
import {AuthService} from '../../../core/services/auth.service';
import {GameService} from '../../../core/services/game.service';
import {GameModel} from '../../../models/game.model';
import {GameStatusEnum} from '../../../shared/enums/game-status.enum';
import {GameTypeEnum} from '../../../shared/enums/game-type.enum';
import {EnumFormatPipe} from '../../../shared/pipes/eum-format.pipe';
import {CreateCardState, GameHubMode} from './game-hub.types';

@Component({
	selector: 'app-game-hub',
	imports: [Icon, RouterLink, EnumFormatPipe],
	templateUrl: './game-hub.html',
	styleUrl: './game-hub.scss',
})
export class GameHub {
	readonly authService = inject(AuthService);
	readonly mode = input.required<GameHubMode>();
	readonly gameId = signal<string>('');
	readonly games = signal<GameModel[]>([]);
	readonly loading = signal<boolean>(false);
	readonly actionLoading = signal<boolean>(false);
	readonly errorMessage = signal<string | null>(null);
	readonly createCardStates: Record<GameTypeEnum, CreateCardState> = {
		[GameTypeEnum.SOLO]: 'active',
		[GameTypeEnum.PLAYER_VS_PLAYER]: 'disabled',
		[GameTypeEnum.PLAYER_VS_AI]: 'disabled',
		[GameTypeEnum.AI_VS_AI]: 'disabled',
	};
	protected readonly GameTypeEnum = GameTypeEnum;
	private readonly router = inject(Router);
	private readonly gameService = inject(GameService);
	private readonly gamesLoaded = signal<boolean>(false);

	constructor() {
		effect(() => {
			const mode = this.mode();

			this.errorMessage.set(null);

			if (mode !== 'create' && !this.gamesLoaded()) {
				this.loadGames();
			}
		});
	}

	isCreateCardDisabled(gameType: GameTypeEnum): boolean {
		return this.createCardStates[gameType] === 'disabled';
	}

	updateGameId(event: Event): void {
		const input = event.target as HTMLInputElement;

		this.gameId.set(input.value);
		this.errorMessage.set(null);
	}

	createGame(gameType: GameTypeEnum): void {
		if (this.actionLoading() || this.isCreateCardDisabled(gameType)) {
			return;
		}

		this.actionLoading.set(true);
		this.errorMessage.set(null);

		this.gameService
			.createGame(gameType)
			.pipe(finalize(() => this.actionLoading.set(false)))
			.subscribe({
				next: game => this.openPlayerGame(game),
				error: error => {
					console.error('Failed to create game:', error);
					this.errorMessage.set('Unable to create the game.');
				},
			});
	}

	joinGameById(): void {
		const gameUuid = this.gameId().trim();

		if (!gameUuid) {
			this.errorMessage.set('Please enter a game UUID.');
			return;
		}

		this.joinGame(gameUuid);
	}

	joinGame(gameUuid: string): void {
		if (this.actionLoading()) {
			return;
		}

		this.actionLoading.set(true);
		this.errorMessage.set(null);

		this.gameService
			.joinGame(gameUuid)
			.pipe(finalize(() => this.actionLoading.set(false)))
			.subscribe({
				next: game => this.openPlayerGame(game),
				error: error => {
					console.error('Failed to join game:', error);
					this.errorMessage.set('Unable to join this game.');
				},
			});
	}

	openPlayerGame(game: GameModel): void {
		void this.router.navigate(['/game', game.uuid]);
	}

	spectateGame(game: GameModel): void {
		void this.router.navigate(['/game', game.uuid, 'spectate']);
	}

	refreshGames(): void {
		this.gamesLoaded.set(false);
		this.loadGames();
	}

	private loadGames(): void {
		if (this.loading() || !this.authService.isLoggedIn()) {
			return;
		}

		this.loading.set(true);
		this.errorMessage.set(null);

		this.gameService
			.getGamesCreatedByMe()
			.subscribe({
				next: games => this.games.set(games),
				error: error => {
					console.error('Failed to load games:', error);
					this.games.set([]);
					this.errorMessage.set('Unable to load the games.');
				},
			});

		this.gamesLoaded.set(true);
		this.loading.set(false);
	}

	private isJoinable(game: GameModel): boolean {
		return game.status === GameStatusEnum.CREATED || game.status === GameStatusEnum.WAITING;
	}
}
