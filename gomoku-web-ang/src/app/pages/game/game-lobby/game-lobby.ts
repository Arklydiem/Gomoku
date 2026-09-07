import {Component, computed, input, output, signal} from '@angular/core';

import {GameModel} from '../../../models/game.model';
import {PlayerModel} from '../../../models/player.model';
import {GameStatusEnum} from '../../../shared/enums/game-status.enum';
import {GameTypeEnum} from '../../../shared/enums/game-type.enum';
import {StoneColorEnum} from '../../../shared/enums/stone-color.enum';
import {EnumFormatPipe} from '../../../shared/pipes/eum-format.pipe';
import {GameAccessMode} from '../../../shared/types/game-access-mode.type';

@Component({
	selector: 'app-game-lobby',
	imports: [EnumFormatPipe],
	templateUrl: './game-lobby.html',
	styleUrl: './game-lobby.scss',
})
export class GameLobby {
	readonly game = input.required<GameModel>();
	readonly accessMode = input.required<GameAccessMode>();
	readonly isCreator = input<boolean>(false);
	readonly actionLoading = input<boolean>(false);
	readonly visibilityChanged = output<boolean>();
	readonly startRequested = output<void>();
	readonly copied = signal<boolean>(false);
	readonly canChangeVisibility = computed<boolean>(() => {
		const game = this.game();

		return this.isCreator()
			&& game.gameType === GameTypeEnum.PLAYER_VS_PLAYER
			&& (game.status === GameStatusEnum.WAITING || game.status === GameStatusEnum.READY);
	});
	readonly canStart = computed<boolean>(() => this.isCreator() && this.game().status === GameStatusEnum.READY);
	protected readonly StoneColorEnum = StoneColorEnum;
	protected readonly GameStatusEnum = GameStatusEnum;
	protected readonly GameTypeEnum = GameTypeEnum;

	public getPlayer(color: StoneColorEnum): PlayerModel | null {
		return this.game().players.find(player => player.color === color) ?? null;
	}

	public setVisibility(publicGame: boolean): void {
		if (!this.canChangeVisibility() || this.actionLoading() || this.game().publicGame === publicGame) {
			return;
		}

		this.visibilityChanged.emit(publicGame);
	}

	public startGame(): void {
		if (!this.canStart() || this.actionLoading()) {
			return;
		}

		this.startRequested.emit();
	}

	public async copyUuid(): Promise<void> {
		await navigator.clipboard.writeText(this.game().uuid);
		this.copied.set(true);

		setTimeout(() => this.copied.set(false), 1400);
	}
}
