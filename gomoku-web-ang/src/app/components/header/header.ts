import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NavButton } from '../nav-button/nav-button';

@Component({
  selector: 'app-header',
  imports: [NavButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header implements OnInit{

  private readonly router = inject(Router);
  currentPage: string = '/home';

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
}
