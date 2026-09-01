import { Component, Input } from '@angular/core';
import {IconType} from './icon-type';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {

  @Input()
  name!: IconType;

  @Input()
  size: number = 24;

  @Input()
  rotation: number = 0;

  @Input()
  spin: boolean = false;
}
