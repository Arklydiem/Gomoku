import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {AuthService} from '../../../core/services/auth.service';
import {AuthContainer} from '../auth-container/auth-container';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, AuthContainer],
	templateUrl: './login.html',
	styleUrl: './login.scss',
})
export class Login {
	private readonly formBuilder = inject(FormBuilder);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);

	protected loading = false;
	protected error?: string;

	protected readonly form = this.formBuilder.nonNullable.group({
		login: ['', Validators.required],
		password: ['', Validators.required],
	});

	protected submit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.loading = true;
		this.error = undefined;

		this.authService.login(this.form.getRawValue()).subscribe({
			next: () => void this.router.navigate(['/game']),
			error: () => {
				this.error = 'Invalid username, email or password.';
				this.loading = false;
			},
		});
	}
}
