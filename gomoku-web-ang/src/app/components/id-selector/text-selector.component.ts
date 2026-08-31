import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-text-selector',
  imports: [],
  templateUrl: './text-selector.html',
  styleUrl: './text-selector.scss',
})
export class TextSelector {

  @Input()
  label: string = '';

  @Input()
  value: string = '';

  @Input()
  width: number = 100;

  protected copied = signal(false);

  protected copiedPositionX = signal(0);
  protected copiedPositionY = signal(0);

  protected saveTextInClipboard(event: MouseEvent): void {

    if (!this.value) {
      return;
    }

    navigator.clipboard.writeText(this.value)
      .then(() => {

        const rect = (event.target as HTMLElement)
          .getBoundingClientRect();

        this.copiedPositionX.set(
          event.clientX - rect.left
        );

        this.copiedPositionY.set(
          event.clientY - rect.top
        );

        this.copied.set(true);

        setTimeout(() => {
          this.copied.set(false);
        }, 1200);

      })
      .catch(error => {
        console.error(
          'Failed to copy text:',
          error
        );
      });
  }
}
