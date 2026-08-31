import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {RegisterRequestModel} from '../../../models/auth/register-request.model';
import {AuthContainer} from '../auth-container/auth-container';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthContainer
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected loading = false;
  protected error?: string;

  protected readonly form = this.formBuilder.nonNullable.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(320)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]
    },
    {
      validators: Register.passwordMatchValidator
    }
  );

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const request: RegisterRequestModel = {
      username: value.username,
      email: value.email,
      password: value.password
    };

    this.loading = true;
    this.error = undefined;

    this.authService.register(request).subscribe({
      next: () => {
        this.router.navigate(['/game']);
      },
      error: () => {
        this.error = 'Unable to create account.';
        this.loading = false;
      }
    });
  }

  private static passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password: string | null = control.get('password')?.value ?? null;
    const confirmPassword: string | null = control.get('confirmPassword')?.value ?? null;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }
}
