import { Injectable, inject } from '@angular/core';

import { GameResource } from '../resources/game.resource';
import {Observable} from 'rxjs';
import {GameModel} from '../../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly gameResource = inject(GameResource);

  public getGames() {
    return this.gameResource.getGames();
  }

  public getGame(gameId: string) {
    return this.gameResource.getGame(gameId);
  }

  public createGame(): Observable<GameModel> {
    return this.gameResource.createGame();
  }

  public joinGame(gameId: string) {
    return this.gameResource.joinGame(gameId);
  }
}
