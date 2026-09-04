import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {GameModel} from '../../models/game.model';
import {BoardPosition} from '../../shared/types/board.types';
import {GameResource} from '../resources/game.resource';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	private readonly gameResource = inject(GameResource);

	public getGames() {
		return this.gameResource.getGames();
	}

	public getGamesCreatedByMe() {
		return this.gameResource.getGamesCreatedByMe();
	}

	public getGamesByCreatorUuid(userUuid: string) {
		return this.gameResource.getGamesByCreatorUuid(userUuid);
	}

	public getGame(gameId: string) {
		return this.gameResource.getGame(gameId);
	}

	public createGame(gameType: string): Observable<GameModel> {
		return this.gameResource.createGame(gameType);
	}

	public joinGame(gameId: string) {
		return this.gameResource.joinGame(gameId);
	}

	public startGame(gameId: string): Observable<GameModel> {
		return this.gameResource.startGame(gameId);
	}

	public createTurn(gameUuid: string, position: BoardPosition): Observable<GameModel> {
		return this.gameResource.createTurn(gameUuid, {
			x: position.column,
			y: position.row,
		});
	}
}
