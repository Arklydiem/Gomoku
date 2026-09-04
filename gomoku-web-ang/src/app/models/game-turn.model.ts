import {StoneColorEnum} from '../shared/enums/stone-color.enum';
import {MoveModel} from './move.model';

export interface GameTurnModel {
	uuid: string;
	turnNumber: number;
	playerUuid: string;
	color: StoneColorEnum;
	suggestedMove: MoveModel | null;
	playedMove: MoveModel | null;
	aiComputationTimeMs: number | null;
}
