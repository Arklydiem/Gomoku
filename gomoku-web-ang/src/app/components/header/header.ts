import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../core/services/auth.service';
import {BurgerMenu} from './burger-menu/burger-menu';
import {Icon} from '../icon/icon';
import {NavButton} from '../nav-button/nav-button';

@Component({
	selector: 'app-header',
	imports: [NavButton, BurgerMenu, Icon],
	templateUrl: './header.html',
	styleUrl: './header.scss',
	standalone: true,
})
export class Header implements OnInit {
	currentPage: string = '/home';
	isBurgerMenuOpen: boolean = false;
	private readonly router = inject(Router);

	constructor(public readonly authService: AuthService) {
	}

	ngOnInit(): void {
		this.router.events.subscribe(() => this.updateActivePage());
	}

	changePage(page: string): void {
		this.router.navigate([page]).then(() => console.debug('Route to:', page));
	}

	toggleBurgerMenu(): void {
		this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
	}

	closeBurgerMenu(): void {
		this.isBurgerMenuOpen = false;
	}

	private updateActivePage(): void {
		this.currentPage = this.router.url;
	}
}
