import {PlayerTypeEnum} from '../shared/enums/player-type.enum';
import {StoneColorEnum} from '../shared/enums/stone-color.enum';

export interface PlayerModel {
	uuid: string;
	userUuid: string | null;
	name: string;
	type: PlayerTypeEnum;
	color: StoneColorEnum;
}
