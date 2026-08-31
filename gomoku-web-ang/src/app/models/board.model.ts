import {StoneColorEnum} from '../shared/enums/stone-color.enum';

export interface BoardModel {
  uuid: string;
  grid: (StoneColorEnum | null)[][];
}
