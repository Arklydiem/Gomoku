import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-button',
  imports: [],
  templateUrl: './nav-button.html',
  styleUrl: './nav-button.scss',
})
export class NavButton {
  @Input()
  methodToCall!: () => void;

}
