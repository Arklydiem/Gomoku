import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {GameModel} from '../../models/game.model';
import {MoveModel} from '../../models/move.model';
import {ApiResource} from '../config/api-resource';

@Injectable({
	providedIn: 'root',
})
export class GameResource extends ApiResource {
	public getGames(): Observable<GameModel[]> {
		return this.request<GameModel[]>({
			method: 'GET',
			path: '/games',
		});
	}

	public getPublicGames(): Observable<GameModel[]> {
		return this.request<GameModel[]>({
			method: 'GET',
			path: '/games/public',
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

	public updateVisibility(gameUuid: string, publicGame: boolean): Observable<GameModel> {
		return this.request<GameModel>(
			{
				method: 'PATCH',
				path: '/games/{gameUuid}/visibility',
			},
			{gameUuid},
			{publicGame},
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
