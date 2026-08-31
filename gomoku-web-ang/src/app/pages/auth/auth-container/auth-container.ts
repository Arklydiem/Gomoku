import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-container',
  standalone: true,
  templateUrl: './auth-container.html',
  styleUrl: './auth-container.scss'
})
export class AuthContainer {

  @Input({ required: true })
  title!: string;

  @Input()
  subtitle?: string;
}
