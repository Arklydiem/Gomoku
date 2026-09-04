import {StoneColorEnum} from '../shared/enums/stone-color.enum';

export interface BoardModel {
	grid: (StoneColorEnum | null)[][];
}
