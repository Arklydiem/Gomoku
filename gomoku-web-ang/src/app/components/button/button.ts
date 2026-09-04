import {Component, Input} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

@Component({
	selector: 'app-button',
	imports: [],
	templateUrl: './button.html',
	styleUrl: './button.scss',
})
export class Button {
	@Input()
	methodToCall: (() => void) | undefined;

	@Input()
	minWidth: number = 160;

	@Input()
	variant: ButtonVariant = 'primary';

	execMethod(): void {
		this.methodToCall?.();
	}
}
