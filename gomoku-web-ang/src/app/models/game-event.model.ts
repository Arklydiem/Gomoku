import {GameEventTypeEnum} from '../shared/enums/game-event-type.enum';
import {GameModel} from './game.model';

export interface GameEventModel {
	type: GameEventTypeEnum;
	game: GameModel;
}
