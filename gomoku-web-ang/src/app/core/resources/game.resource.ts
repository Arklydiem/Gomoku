import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {GameModel} from '../../models/game.model';
import {GamesUuidsModel} from '../../models/games-uuids.model';
import {MoveModel} from '../../models/move.model';
import {ApiResource} from '../config/api-resource';

@Injectable({
	providedIn: 'root',
})
export class GameResource extends ApiResource {
	public getGames(): Observable<GamesUuidsModel> {
		return this.request<GamesUuidsModel>({
			method: 'GET',
			path: '/games',
		});
	}

	public getGamesCreatedByMe(): Observable<GameModel[]> {
		return this.request<GameModel[]>({
			method: 'GET',
			path: '/games/created-by-me',
		});
	}

	public getGamesByCreatorUuid(userUuid: string): Observable<GameModel[]> {
		return this.request<GameModel[]>(
			{
				method: 'GET',
				path: '/games/created-by/{userUuid}',
			},
			{userUuid},
		);
	}

	public getGame(gameUuid: string): Observable<GameModel> {
		return this.request<GameModel>(
			{
				method: 'GET',
				path: '/games/{gameUuid}',
			},
			{gameUuid},
		);
	}

	public createGame(gameType: string): Observable<GameModel> {
		return this.request<GameModel>(
			{
				method: 'POST',
				path: '/games',
			},
			undefined,
			null,
			{
				params: {
					gameType,
				},
			},
		);
	}

	public joinGame(gameUuid: string): Observable<GameModel> {
		return this.request<GameModel>(
			{
				method: 'POST',
				path: '/games/{gameUuid}/join',
			},
			{gameUuid},
			null,
		);
	}

	public startGame(gameUuid: string): Observable<GameModel> {
		return this.request<GameModel>(
			{
				method: 'POST',
				path: '/games/{gameUuid}/start',
			},
			{gameUuid},
			null,
		);
	}

	public createTurn(gameUuid: string, move: MoveModel): Observable<GameModel> {
		return this.request<GameModel>(
			{
				method: 'POST',
				path: '/games/{gameUuid}/turns',
			},
			{gameUuid},
			move,
		);
	}
}
