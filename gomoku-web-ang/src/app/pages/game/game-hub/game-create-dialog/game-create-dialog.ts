import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';

import {Button} from '../../../../components/button/button';
import {Icon} from '../../../../components/icon/icon';
import {Modal} from '../../../../components/modal/modal';
import {Selector} from '../../../../components/selector/selector';

import {GameService} from '../../../../core/services/game.service';

import {GameModel} from '../../../../models/game.model';

import {GameTypeEnum} from '../../../../shared/enums/game-type.enum';

@Component({
  selector: 'app-game-create-dialog',
  imports: [
    Button,
    Icon,
    Modal,
    Selector,
  ],
  templateUrl: './game-create-dialog.html',
  styleUrl: './game-create-dialog.scss',
})
export class GameCreateDialog {

  @Output()
  closed = new EventEmitter<void>();

  @Output()
  gameCreated = new EventEmitter<GameModel>();

  readonly gameTypes: string[] =
    Object.values(GameTypeEnum);

  readonly selectedGameType: WritableSignal<string> =
    signal<string>(this.gameTypes[0]);

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

  createGame = (): void => {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.gameService
      .createGame(this.selectedGameType())
      .subscribe({
        next: (game: GameModel) => {
          this.loading.set(false);
          this.gameCreated.emit(game);
        },

        error: (error) => {
          console.error(
            'Failed to create game:',
            error,
          );

          this.loading.set(false);

          this.errorMessage.set(
            'Unable to create the game.',
          );
        },
      });
  };
}
