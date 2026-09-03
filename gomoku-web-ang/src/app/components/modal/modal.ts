import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {Icon} from '../icon/icon';

@Component({
  selector: 'app-modal',
  imports: [
    Icon,
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  eyebrow: string = '';

  @Input()
  title: string = '';

  @Input()
  description: string = '';

  @Input()
  closeOnBackdrop: boolean = true;


  /*
   * Dialog dimensions
   */

  @Input()
  dialogMinWidth: string = '0';

  @Input()
  dialogMaxWidth: string = '560px';

  @Input()
  dialogMinHeight: string = '0';

  @Input()
  dialogMaxHeight: string = 'calc(100vh - 3rem)';


  /*
   * Disabled by default because dropdowns/selectors
   * must be able to overflow outside the dialog.
   */
  @Input()
  scrollable: boolean = false;


  @Output()
  closed =
    new EventEmitter<void>();


  @ViewChild('modalDialog')
  private modalDialog?: ElementRef<HTMLElement>;


  private previousBodyOverflow: string = '';

  private previousActiveElement:
    HTMLElement | null = null;


  constructor(
    @Inject(DOCUMENT)
    private readonly document: Document,
  ) {}


  ngOnInit(): void {

    this.previousBodyOverflow =
      this.document.body.style.overflow;

    this.previousActiveElement =
      this.document.activeElement as HTMLElement | null;

    this.document.body.style.overflow =
      'hidden';
  }


  ngAfterViewInit(): void {
    this.modalDialog?.nativeElement.focus();
  }


  ngOnDestroy(): void {

    this.document.body.style.overflow =
      this.previousBodyOverflow;

    this.previousActiveElement?.focus();
  }


  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.close();
  }


  onBackdropMouseDown(
    event: MouseEvent,
  ): void {

    if (!this.closeOnBackdrop) {
      return;
    }

    if (
      event.target !==
      event.currentTarget
    ) {
      return;
    }

    this.close();
  }


  close(): void {
    this.closed.emit();
  }
}
