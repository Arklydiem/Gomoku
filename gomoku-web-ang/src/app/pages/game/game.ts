import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type GameMode = 'play' | 'spectate';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit {

  private readonly route = inject(ActivatedRoute);

  mode!: GameMode;

  ngOnInit(): void {
    this.mode = this.route.snapshot.paramMap.get('mode') as GameMode;

    if (this.mode === 'play') {
      console.log('Mode play');
    }

    if (this.mode === 'spectate') {
      console.log('Mode spectate');
    }
  }
}
