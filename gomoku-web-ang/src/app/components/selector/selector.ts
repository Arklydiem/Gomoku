import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-selector',
  imports: [],
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
})
export class Selector {

  @Input()
  label!: string;

  @Input()
  choices: string[] = [];

  @Input()
  selected!: string;

  @Output()
  selectedChange = new EventEmitter<string>();

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.selectedChange.emit(value);
  }
}
