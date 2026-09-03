import {GameModel} from '../../../models/game.model';

export type GameHubDialog =
  | 'create'
  | 'join'
  | 'spectate'
  | null;

export type GameAccessMode =
  | 'player'
  | 'spectator';

export interface GameHubSelection {
  game: GameModel;
  accessMode: GameAccessMode;
}
