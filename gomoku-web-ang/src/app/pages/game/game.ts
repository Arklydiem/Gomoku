import {Component, signal, WritableSignal} from '@angular/core';
import {TitleCasePipe} from '@angular/common';

import {Button} from '../../components/button/button';
import {Icon} from '../../components/icon/icon';
import {Selector} from '../../components/selector/selector';
import {TextSelector} from '../../components/id-selector/text-selector.component';

import {GameService} from '../../core/services/game.service';

import {GameModel} from '../../models/game.model';

import {GameTypeEnum} from '../../shared/enums/game-type.enum';
import {GameStatusEnum} from '../../shared/enums/game-status.enum';


type DisplayMode =
  | 'menu'
  | 'create'
  | 'join'
  | 'play'
  | 'spectate';


@Component({
  selector: 'app-game',
  imports: [
    Button,
    Icon,
    TitleCasePipe,
    Selector,
    TextSelector,
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {

  readonly gameTypes: string[] =
    Object.values(GameTypeEnum);

  readonly displayMode: WritableSignal<DisplayMode> =
    signal<DisplayMode>('menu');

  readonly selectedGameType: WritableSignal<string> =
    signal<string>(this.gameTypes[0]);

  readonly game =
    signal<GameModel | null>(null);


  constructor(
    protected readonly gameService: GameService
  ) {}


  openCreate = (): void => {
    this.displayMode.set('create');
  };


  openJoin = (): void => {
    this.displayMode.set('join');
  };


  openSpectate = (): void => {
    this.displayMode.set('spectate');
  };


  backToMenu = (): void => {
    this.displayMode.set('menu');
  };


  createGame = (): void => {

    this.gameService
      .createGame(this.selectedGameType())
      .subscribe({
        next: (data: GameModel) => {

          console.log(
            'Game created successfully:',
            data
          );

          this.game.set(data);

          this.displayMode.set('play');
        },

        error: (error) => {

          console.error(
            'Failed to create game:',
            error
          );
        },
      });
  };


  startGame = (): void => {

    const uuid =
      this.game()?.uuid;

    if (!uuid) {
      return;
    }

    this.gameService
      .startGame(uuid)
      .subscribe({
        next: (data: GameModel) => {

          console.log(
            'Game started successfully:',
            data
          );

          this.game.set(data);
        },

        error: (error) => {

          console.error(
            'Failed to start game:',
            error
          );
        },
      });
  };


  get getGameStatus(): GameStatusEnum {
    return (
      this.game()?.status ??
      GameStatusEnum.UNKNOWN
    );
  }


  get getGameId(): string {
    return this.game()?.uuid ?? '';
  }


  protected readonly GameStatusEnum =
    GameStatusEnum;
}
