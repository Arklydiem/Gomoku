import {GameStatusEnum} from '../shared/enums/game-status.enum';
import {GameTypeEnum} from '../shared/enums/game-type.enum';
import {StoneColorEnum} from '../shared/enums/stone-color.enum';
import {GameTurnModel} from './game-turn.model';
import {PlayerModel} from './player.model';

export interface GameModel {
	uuid: string;
	createdByUserUuid: string | null;
	players: PlayerModel[];
	turns: GameTurnModel[];
	currentTurn: StoneColorEnum | null;
	status: GameStatusEnum;
	blackCaptures: number;
	whiteCaptures: number;
	gameType: GameTypeEnum;
}
