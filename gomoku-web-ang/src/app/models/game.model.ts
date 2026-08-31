import { StoneColorEnum } from '../shared/enums/stone-color.enum';
import { GameStatusEnum } from '../shared/enums/game-status.enum';
import { GameTypeEnum } from '../shared/enums/game-type.enum';
import { BoardModel } from './board.model';
import { PlayerModel } from './player.model';

export interface GameModel {
  uuid: string;
  board: BoardModel;
  players: PlayerModel[];
  currentTurn: StoneColorEnum;
  status: GameStatusEnum;
  blackCaptures: number;
  whiteCaptures: number;
  gameType: GameTypeEnum;
}
