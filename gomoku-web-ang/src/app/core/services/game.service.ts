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

	public getGames(): Observable<GameModel[]> {
		return this.gameResource.getGames();
	}

	public getPublicGames(): Observable<GameModel[]> {
		return this.gameResource.getPublicGames();
	}

	public getGamesCreatedByMe(): Observable<GameModel[]> {
		return this.gameResource.getGamesCreatedByMe();
	}

	public getGamesByCreatorUuid(userUuid: string): Observable<GameModel[]> {
		return this.gameResource.getGamesByCreatorUuid(userUuid);
	}

	public getGame(gameId: string): Observable<GameModel> {
		return this.gameResource.getGame(gameId);
	}

	public createGame(gameType: string): Observable<GameModel> {
		return this.gameResource.createGame(gameType);
	}

	public joinGame(gameId: string): Observable<GameModel> {
		return this.gameResource.joinGame(gameId);
	}

	public updateVisibility(gameId: string, publicGame: boolean): Observable<GameModel> {
		return this.gameResource.updateVisibility(gameId, publicGame);
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
