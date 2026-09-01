import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

import {Button} from '../../components/button/button';
import {Icon} from '../../components/icon/icon';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    Button,
    Icon,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private readonly router = inject(Router);

  readonly authService = inject(AuthService);

  play(): void {
    this.router.navigate(['/game']);
  }

  playAgainstAi(): void {
    this.router.navigate(['/game']);
  }

  playMultiplayer(): void {
    this.router.navigate(['/game']);
  }
}
