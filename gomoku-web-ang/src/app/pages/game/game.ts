import {
  Component,
  signal,
} from '@angular/core';

import {GameHub} from './game-hub/game-hub';

import {
  GameAccessMode,
  GameHubSelection,
} from './game-hub/game-hub.types';

import {GameModel} from '../../models/game.model';

@Component({
  selector: 'app-game',
  imports: [
    GameHub,
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {

  readonly selectedGame =
    signal<GameModel | null>(null);

  readonly accessMode =
    signal<GameAccessMode | null>(null);

  openGame(
    selection: GameHubSelection,
  ): void {
    this.selectedGame.set(
      selection.game
    );

    this.accessMode.set(
      selection.accessMode
    );
  }

  closeGame(): void {
    this.selectedGame.set(null);
    this.accessMode.set(null);
  }
}
