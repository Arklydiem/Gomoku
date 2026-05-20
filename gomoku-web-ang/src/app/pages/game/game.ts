import {Component, OnDestroy, OnInit} from '@angular/core';
import {Button} from '../../components/button/button';
import {Icon} from '../../components/icon/icon';
import {TitleCasePipe} from '@angular/common';
import {Selector} from '../../components/selector/selector';
import {GameTypeEnum} from '../../shared/enums/game-type.enum';
import {GameService} from '../../core/services/game.service';
import {GameModel} from '../../models/game.model';

type DisplayMode = 'menu' | 'create' | 'join' | 'play' | 'spectate';

@Component({
  selector: 'app-game',
  imports: [
    Button,
    Icon,
    TitleCasePipe,
    Selector,
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit, OnDestroy {

  displayMode: DisplayMode = 'menu';

  gameTypes: string[] =  Object.values(GameTypeEnum)
  selectedGameType: string = this.gameTypes[0];

  protected gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {
  }

  createGame = (): void => {
    if (this.displayMode !== 'create') {
      this.displayMode = 'create';
      return;
    }

    this.gameService.createGame().subscribe({
      next: (data: GameModel) => {
        console.log('Game created successfully:', data);
        this.displayMode = 'play';
      },
      error: (error) => {
        console.error('Failed to create game:', error);
      },
      complete: () => {
        console.log('Game creation completed');
      }
    });
  };

  joinGame = (): void => {
    this.displayMode = 'join';
  };

  spectateGame = (): void => {
    this.displayMode = 'spectate';
  };

  ngOnDestroy(): void {
  }

}
