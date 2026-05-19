import {PlayerTypeEnum} from '../shared/enums/player-type.enum';
import {StoneColorEnum} from '../shared/enums/stone-color.enum';

export class PlayerModel {
  uuid: string;
  name: string;
  type: PlayerTypeEnum;
  color: StoneColorEnum;

  constructor(uuid: string,
              name: string,
              type: PlayerTypeEnum,
              color: StoneColorEnum) {
    this.uuid = uuid;
    this.name = name;
    this.type = type;
    this.color = color;
  }
}
