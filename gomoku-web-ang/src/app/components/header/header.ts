import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavButton } from '../nav-button/nav-button';

@Component({
  selector: 'app-header',
  imports: [NavButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {

  private readonly router = inject(Router);

  changePage(page: string): void {
    this.router.navigate([page]).then(() => {
      console.debug('Route to:', page);
    });
  }
}
