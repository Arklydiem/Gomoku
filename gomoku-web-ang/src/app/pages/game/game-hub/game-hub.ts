import {
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';

import {Icon} from '../../../components/icon/icon';

import {GameModel} from '../../../models/game.model';

import {GameCreateDialog} from './game-create-dialog/game-create-dialog';
import {GameJoinDialog} from './game-join-dialog/game-join-dialog';
import {GameSpectateDialog} from './game-spectate-dialog/game-spectate-dialog';

import {
  GameAccessMode,
  GameHubDialog,
  GameHubSelection,
} from './game-hub.types';

@Component({
  selector: 'app-game-hub',
  imports: [
    Icon,
    GameCreateDialog,
    GameJoinDialog,
    GameSpectateDialog,
  ],
  templateUrl: './game-hub.html',
  styleUrl: './game-hub.scss',
})
export class GameHub {

  @Output()
  gameSelected =
    new EventEmitter<GameHubSelection>();

  readonly openedDialog =
    signal<GameHubDialog>(null);

  openCreate(): void {
    this.openedDialog.set('create');
  }

  openJoin(): void {
    this.openedDialog.set('join');
  }

  openSpectate(): void {
    this.openedDialog.set('spectate');
  }

  closeDialog(): void {
    this.openedDialog.set(null);
  }

  selectPlayerGame(game: GameModel): void {
    this.selectGame(game, 'player');
  }

  selectSpectatorGame(game: GameModel): void {
    this.selectGame(game, 'spectator');
  }

  private selectGame(
    game: GameModel,
    accessMode: GameAccessMode,
  ): void {
    this.closeDialog();

    this.gameSelected.emit({
      game,
      accessMode,
    });
  }
}
