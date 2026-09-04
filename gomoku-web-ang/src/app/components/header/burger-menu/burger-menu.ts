import {Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import {AuthService} from '../../../core/services/auth.service';
import {NavButton} from '../../nav-button/nav-button';

@Component({
	selector: 'app-burger-menu',
	imports: [NavButton],
	templateUrl: './burger-menu.html',
	styleUrl: './burger-menu.scss',
})
export class BurgerMenu {
	readonly authService = inject(AuthService);
	@Input()
	open: boolean = false;
	@Output()
	closed = new EventEmitter<void>();
	private readonly router = inject(Router);
	currentPage: string = this.router.url;
	private readonly destroyRef = inject(DestroyRef);

	constructor() {
		this.router.events
			.pipe(
				filter((event): event is NavigationEnd => event instanceof NavigationEnd),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(event => this.currentPage = event.urlAfterRedirects);
	}

	changePage(page: string): void {
		this.close();

		void this.router.navigate([page]);
	}

	logoutAndClose(): void {
		this.authService.logout();
		this.close();
	}

	close(): void {
		this.closed.emit();
	}
}
