import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GameModel } from '../../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameResource {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/games`;

  public getGames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  public getGame(gameId: string): Observable<GameModel> {
    return this.http.get<GameModel>(`${this.apiUrl}/${gameId}`);
  }

  public createGame(): Observable<GameModel> {
    return this.http.post<GameModel>(
      this.apiUrl,
      {},
      {
        params: {
          gameType: 'PLAYER_VS_PLAYER'
        }
      }
    );
  }

  public joinGame(gameId: string): Observable<GameModel> {
    return this.http.post<GameModel>(
      `${this.apiUrl}/${gameId}/join`,
      {}
    );
  }
}
