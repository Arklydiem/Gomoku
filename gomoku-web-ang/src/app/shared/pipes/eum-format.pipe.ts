import {Pipe, PipeTransform} from '@angular/core';

type EnumFormatMode = 'capitalize' | 'title';

@Pipe({
	name: 'enumFormat',
	standalone: true,
})
export class EnumFormatPipe implements PipeTransform {
	transform(value: string | null | undefined, mode: EnumFormatMode = 'capitalize'): string {
		if (!value) {
			return '';
		}

		const words = value.toLowerCase().split('_');

		if (mode === 'capitalize') {
			return words.map((word, index) => (index === 0 ? this.capitalize(word) : word)).join(' ');
		}

		return words.map(word => this.capitalize(word)).join(' ');
	}

	private capitalize(word: string): string {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
}
