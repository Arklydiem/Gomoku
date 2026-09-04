import {Component, EventEmitter, Input, Output} from '@angular/core';

import {AuthService} from '../../../core/services/auth.service';
import {NavButton} from '../../nav-button/nav-button';

@Component({
	selector: 'app-burger-menu',
	imports: [NavButton],
	templateUrl: './burger-menu.html',
	styleUrl: './burger-menu.scss',
})
export class BurgerMenu {
	private authService: AuthService;

	@Input()
	open: boolean = false;

	@Output()
	closed = new EventEmitter<void>();

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	logoutAndClose(): void {
		this.authService.logout();
		this.close();
	}

	close(): void {
		this.closed.emit();
	}
}
