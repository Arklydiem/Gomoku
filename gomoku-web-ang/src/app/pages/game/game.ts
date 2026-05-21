import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {Button} from '../../components/button/button';
import {Icon} from '../../components/icon/icon';
import {TitleCasePipe} from '@angular/common';
import {Selector} from '../../components/selector/selector';
import {GameTypeEnum} from '../../shared/enums/game-type.enum';
import {GameService} from '../../core/services/game.service';
import {GameModel} from '../../models/game.model';
import {TextSelector} from '../../components/id-selector/text-selector.component';
import {GameStatusEnum} from '../../shared/enums/game-status.enum';

type DisplayMode = 'menu' | 'create' | 'join' | 'play' | 'spectate';

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
export class Game implements OnInit, OnDestroy {

  gameTypes: string[] =  Object.values(GameTypeEnum)

  displayMode: WritableSignal<DisplayMode> = signal<DisplayMode>('menu');
  selectedGameType: WritableSignal<string> = signal<string>(this.gameTypes[0]);
  game = signal<GameModel | null>(null);

  protected gameService: GameService;


  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
  }

  createGame = (): void => {
    if (this.displayMode() !== 'create') {
      this.displayMode.set('create');
      return;
    }

    this.gameService.createGame(this.selectedGameType()).subscribe({
      next: (data: GameModel) => {
        console.log('Game created successfully:', data);
        this.game.set(data);
        this.displayMode.set('play');
      },
      error: (error) => {
        console.error('Failed to create game:', error);
      },
    });
  };

  startGame = (): void => {
    const uuid: string | null = this.game()?.uuid ?? null;
    if (!uuid) {
      return;
    }

    this.gameService.startGame(uuid).subscribe({
      next: (data: GameModel) => {
        console.log('Game started successfully:', data);
        this.game.set(data);
      },
      error: (error) => {
        console.error('Failed to start game:', error);
      },
    });
  }

  joinGame = (): void => {
    this.displayMode.set('join');
  };

  spectateGame = (): void => {
    this.displayMode.set('spectate');
  };

  get getGameStatus(): GameStatusEnum {
    return this.game()?.status ?? GameStatusEnum.UNKNOWN;
  }

  get getGameId(): string {
    return this.game()?.uuid ?? '';
  }

  ngOnDestroy(): void {
  }

  protected readonly GameStatusEnum = GameStatusEnum;
}
