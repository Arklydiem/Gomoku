import {Component, effect, inject, input, signal, untracked} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {finalize, forkJoin, of} from 'rxjs';

import {Icon} from '../../../components/icon/icon';
import {AuthService} from '../../../core/services/auth.service';
import {GameService} from '../../../core/services/game.service';
import {GameModel} from '../../../models/game.model';
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
	readonly createdGames = signal<GameModel[]>([]);
	readonly publicGames = signal<GameModel[]>([]);
	readonly spectateGames = signal<GameModel[]>([]);
	readonly loading = signal<boolean>(false);
	readonly actionLoading = signal<boolean>(false);
	readonly errorMessage = signal<string | null>(null);
	readonly createCardStates: Record<GameTypeEnum, CreateCardState> = {
		[GameTypeEnum.SOLO]: 'active',
		[GameTypeEnum.PLAYER_VS_PLAYER]: 'active',
		[GameTypeEnum.PLAYER_VS_AI]: 'disabled',
		[GameTypeEnum.AI_VS_AI]: 'disabled',
	};
	protected readonly GameTypeEnum = GameTypeEnum;
	private readonly router = inject(Router);
	private readonly gameService = inject(GameService);

	constructor() {
		effect(() => {
			const mode = this.mode();

			this.errorMessage.set(null);

			if (mode !== 'create') {
				untracked(() => this.loadGames(mode));
			}
		});
		this.createCardStates.PLAYER_VS_PLAYER = this.authService.isLoggedIn() ? 'active' : 'disabled';
		this.createCardStates.PLAYER_VS_AI = this.authService.isLoggedIn() ? 'active' : 'disabled';
		this.createCardStates.AI_VS_AI = this.authService.isLoggedIn() ? 'active' : 'disabled';
	}

	public isCreateCardDisabled(gameType: GameTypeEnum): boolean {
		return this.createCardStates[gameType] === 'disabled';
	}

	public updateGameId(event: Event): void {
		const input = event.target as HTMLInputElement;

		this.gameId.set(input.value);
		this.errorMessage.set(null);
	}

	public createGame(gameType: GameTypeEnum): void {
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

	public joinGameById(): void {
		const gameUuid = this.gameId().trim();

		if (!gameUuid) {
			this.errorMessage.set('Please enter a game UUID.');
			return;
		}

		this.joinGame(gameUuid);
	}

	public joinGame(gameUuid: string): void {
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

	public openPlayerGame(game: GameModel): void {
		void this.router.navigate(['/game', game.uuid]);
	}

	public spectateGame(game: GameModel): void {
		void this.router.navigate(['/game', game.uuid, 'spectate']);
	}

	public refreshGames(): void {
		this.loadGames(this.mode());
	}

	private loadGames(mode: GameHubMode): void {
		if (this.loading() || mode === 'create') {
			return;
		}

		this.loading.set(true);
		this.errorMessage.set(null);

		if (mode === 'join') {
			const createdGames$ = this.authService.isLoggedIn()
				? this.gameService.getGamesCreatedByMe()
				: of([] as GameModel[]);

			forkJoin({
				createdGames: createdGames$,
				publicGames: this.gameService.getPublicGames(),
			})
				.pipe(finalize(() => this.loading.set(false)))
				.subscribe({
					next: result => {
						const createdGameUuids = new Set(result.createdGames.map(game => game.uuid));

						this.createdGames.set(result.createdGames);
						this.publicGames.set(result.publicGames.filter(game => !createdGameUuids.has(game.uuid)));
					},
					error: error => {
						console.error('Failed to load join games:', error);
						this.createdGames.set([]);
						this.publicGames.set([]);
						this.errorMessage.set('Unable to load the games.');
					},
				});

			return;
		}

		this.gameService
			.getGames()
			.pipe(finalize(() => this.loading.set(false)))
			.subscribe({
				next: games => this.spectateGames.set(games),
				error: error => {
					console.error('Failed to load games:', error);
					this.spectateGames.set([]);
					this.errorMessage.set('Unable to load the games.');
				},
			});
	}
}
