import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input()  methodToCall: (() => void) | undefined;
  @Input()  minWidth: number = 160;

  execMethod() {
    if (!this.methodToCall)
        return;
    this.methodToCall();
  }
}
