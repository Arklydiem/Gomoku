import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavButton} from '../../nav-button/nav-button';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-burger-menu',
  imports: [
    NavButton
  ],
  templateUrl: './burger-menu.html',
  styleUrl: './burger-menu.scss',
})
export class BurgerMenu {

  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Input()
  open: boolean = false;

  @Output()
  closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
