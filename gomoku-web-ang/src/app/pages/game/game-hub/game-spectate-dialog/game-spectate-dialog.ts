import {
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';

import {Button} from '../../../../components/button/button';
import {Icon} from '../../../../components/icon/icon';
import {Modal} from '../../../../components/modal/modal';

import {GameService} from '../../../../core/services/game.service';

import {GameModel} from '../../../../models/game.model';

@Component({
  selector: 'app-game-spectate-dialog',
  imports: [
    Button,
    Icon,
    Modal,
  ],
  templateUrl: './game-spectate-dialog.html',
  styleUrl: './game-spectate-dialog.scss',
})
export class GameSpectateDialog {

  @Output()
  closed = new EventEmitter<void>();

  @Output()
  gameLoaded = new EventEmitter<GameModel>();

  readonly gameId =
    signal<string>('');

  readonly loading =
    signal<boolean>(false);

  readonly errorMessage =
    signal<string | null>(null);

  constructor(
    private readonly gameService: GameService,
  ) {}

  close = (): void => {
    if (this.loading()) {
      return;
    }

    this.closed.emit();
  };

  updateGameId(event: Event): void {
    const input =
      event.target as HTMLInputElement;

    this.gameId.set(input.value);
    this.errorMessage.set(null);
  }

  spectateGame = (): void => {
    const gameId =
      this.getValidatedGameId();

    if (!gameId || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.gameService
      .getGame(gameId)
      .subscribe({
        next: (game: GameModel) => {
          this.loading.set(false);
          this.gameLoaded.emit(game);
        },
        error: (error) => {
          console.error(
            'Failed to load game:',
            error,
          );

          this.loading.set(false);
          this.errorMessage.set(
            'Unable to find this game.',
          );
        },
      });
  };

  private getValidatedGameId(): string | null {
    const gameId =
      this.gameId().trim();

    if (!gameId) {
      this.errorMessage.set(
        'Please enter a game ID.',
      );

      return null;
    }

    return gameId;
  }
}
