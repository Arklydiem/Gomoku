import {Injectable, signal} from '@angular/core';

export type ToastType = 'error' | 'success' | 'info';

export interface ToastMessage {
	message: string;
	type: ToastType;
}

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	readonly toast = signal<ToastMessage | null>(null);

	private timeout?: ReturnType<typeof setTimeout>;

	public show(message: string, type: ToastType = 'info'): void {
		this.toast.set({
			message,
			type,
		});

		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		this.timeout = setTimeout(() => this.hide(), 3500);
	}

	public error(message: string): void {
		this.show(message, 'error');
	}

	public success(message: string): void {
		this.show(message, 'success');
	}

	public hide(): void {
		this.toast.set(null);
	}
}
