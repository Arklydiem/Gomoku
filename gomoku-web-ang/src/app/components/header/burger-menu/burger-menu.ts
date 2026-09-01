import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  imports: [],
  templateUrl: './burger-menu.html',
  styleUrl: './burger-menu.scss',
})
export class BurgerMenu {

  @Input()
  open: boolean = false;

  @Output()
  closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
