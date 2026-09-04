import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Icon} from '../../components/icon/icon';
import {AuthService} from '../../core/services/auth.service';

@Component({
	selector: 'app-home',
	imports: [Icon],
	templateUrl: './home.html',
	styleUrl: './home.scss',
})
export class Home {
	readonly authService = inject(AuthService);
	private readonly router = inject(Router);

	play = (): void => {
		void this.router.navigate(['/game/create']);
	};

	openCreate(): void {
		void this.router.navigate(['/game/create']);
	}

	openJoin(): void {
		void this.router.navigate(['/game/join']);
	}

	openSpectate(): void {
		void this.router.navigate(['/game/spectate']);
	}
}
