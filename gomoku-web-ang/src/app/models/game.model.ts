import {StoneColorEnum} from '../shared/enums/stone-color.enum';
import {GameStatusEnum} from '../shared/enums/game-status.enum';
import {GameTypeEnum} from '../shared/enums/game-type.enum';
import {BoardModel} from './board.model';
import {PlayerModel} from './player.model';

export class GameModel {
  uuid: string;
  board: BoardModel;
  players: PlayerModel[]
  currentTurn: StoneColorEnum;
  status: GameStatusEnum
  blackCaptures: number;
  whiteCaptures: number;
  gameType: GameTypeEnum;

  constructor(uuid: string, board: BoardModel,
              players: PlayerModel[],
              currentTurn: StoneColorEnum,
              status: GameStatusEnum,
              blackCaptures: number,
              whiteCaptures: number,
              gameType: GameTypeEnum) {
    this.uuid = uuid;
    this.board = board;
    this.players = players;
    this.currentTurn = currentTurn;
    this.status = status;
    this.blackCaptures = blackCaptures;
    this.whiteCaptures = whiteCaptures;
    this.gameType = gameType;
  }
}
