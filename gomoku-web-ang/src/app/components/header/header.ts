import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavButton} from '../nav-button/nav-button';
import {AuthService} from '../../core/services/auth.service';
import {BurgerMenu} from './burger-menu/burger-menu';
import {Icon} from '../icon/icon';

@Component({
  selector: 'app-header',
  imports: [NavButton, BurgerMenu, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header implements OnInit{

  private readonly router = inject(Router);
  currentPage: string = '/home';

  isBurgerMenuOpen: boolean = false;

  constructor(
    public readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.updateActivePage();
    });
  }

  private updateActivePage(): void {
    this.currentPage = this.router.url;
  }

  changePage(page: string): void {
    this.router.navigate([page]).then(() => {
      console.debug('Route to:', page);
    });
  }

  toggleBurgerMenu(): void {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
  }

  closeBurgerMenu(): void {
    this.isBurgerMenuOpen = false;
  }

}
