import {Component, computed, input, output} from '@angular/core';

import {BoardModel} from '../../../../models/board.model';
import {StoneColorEnum} from '../../../../shared/enums/stone-color.enum';
import {BoardPosition} from '../../../../shared/types/board.types';

@Component({
	selector: 'app-game-board',
	imports: [],
	templateUrl: './game-board.html',
	styleUrl: './game-board.scss',
})
export class GameBoard {
	readonly board = input.required<BoardModel>();
	readonly disabled = input<boolean>(false);
	readonly positionSelected = output<BoardPosition>();
	readonly boardSize = computed<number>(() => this.board().grid.length);
	readonly positions = computed<BoardPosition[]>(() => {
		const size = this.boardSize();

		return Array.from({length: size * size}, (_, index) => ({
			row: Math.floor(index / size),
			column: index % size,
		}));
	});
	protected readonly StoneColorEnum = StoneColorEnum;

	public getStone(position: BoardPosition): StoneColorEnum | null {
		return this.board().grid[position.row]?.[position.column] ?? null;
	}

	public isOccupied(position: BoardPosition): boolean {
		return this.getStone(position) !== null;
	}

	public getPositionPercentage(value: number): number {
		return value / (this.boardSize() - 1) * 100;
	}

	public selectPosition(position: BoardPosition): void {
		if (this.disabled() || this.isOccupied(position)) {
			return;
		}

		this.positionSelected.emit(position);
	}
}
