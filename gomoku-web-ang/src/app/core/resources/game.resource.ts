import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiResource} from '../config/api-resource';
import {GameModel} from '../../models/game.model';
import {GamesUuidsModel} from '../../models/games-uuids.model';

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
					gameType: gameType,
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
}
