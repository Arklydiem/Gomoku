import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {AuthService} from '../../../core/services/auth.service';
import {ToastService} from '../../../core/services/toast.service';
import {AuthContainer} from '../auth-container/auth-container';
import {finalize} from 'rxjs';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, AuthContainer],
	templateUrl: './login.html',
	styleUrl: './login.scss',
})
export class Login {
	protected readonly loading = signal<boolean>(false);
	private readonly formBuilder = inject(FormBuilder);
	protected readonly form = this.formBuilder.nonNullable.group({
		login: ['', Validators.required],
		password: ['', Validators.required],
	});
	private readonly authService = inject(AuthService);
	private readonly toastService = inject(ToastService);
	private readonly router = inject(Router);

	protected submit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.loading.set(true);

		this.authService.login(this.form.getRawValue())
			.pipe(
				finalize(() => this.loading.set(false)),
			)
			.subscribe({
				next: () => void this.router.navigate(['/game']),
				error: () => this.toastService.error('Invalid username, email or password.'),
			});
	}
}
