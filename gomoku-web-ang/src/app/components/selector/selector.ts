import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Icon } from '../icon/icon';
import {EnumFormatPipe} from '../../shared/pipes/eum-format.pipe';

@Component({
  selector: 'app-selector',
  imports: [
    Icon,
    EnumFormatPipe
  ],
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
})
export class Selector {

  @Input()
  label: string = '';

  @Input()
  choices: string[] = [];

  @Input()
  selected: string = '';

  @Output()
  selectedChange = new EventEmitter<string>();

  protected dropdownOpened = false;

  protected toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  protected select(choice: string): void {
    this.selected = choice;
    this.selectedChange.emit(choice);
    this.dropdownOpened = false;
  }
}
