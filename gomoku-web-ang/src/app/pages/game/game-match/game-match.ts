import {
  Component,
  input,
} from '@angular/core';

import {GameModel} from '../../../models/game.model';
import {GameAccessMode} from '../game-hub/game-hub.types';

@Component({
  selector: 'app-game-match',
  imports: [],
  templateUrl: './game-match.html',
  styleUrl: './game-match.scss',
})
export class GameMatch {

  readonly game =
    input.required<GameModel>();

  readonly accessMode =
    input.required<GameAccessMode>();

  readonly isSpectator = () =>
    this.accessMode() === 'spectator';
}
